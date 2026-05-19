const OSS = require('ali-oss')
const fs = require('node:fs')
const crypto = require('node:crypto')
const { XMLParser } = require('fast-xml-parser')

class OSSUploader {
  constructor(options) {
    this.options = options
    this.bucket = process.env.OSS_BUCKET
    this.prefix = process.env.OSS_PREFIX || ''
    this.publicBaseUrl = process.env.OSS_PUBLIC_BASE_URL || ''
    this.parser = new XMLParser()

    this.client = new OSS({
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      region: process.env.OSS_REGION,
      bucket: this.bucket,
      authorizationV4: true,
      endpoint: process.env.OSS_ENDPOINT,
    })
  }

  mergeSpecsByTargetAndVersion(specifications) {
    const targets = ['zilliz', 'milvus']
    const results = {}

    for (const target of targets) {
      results[target] = {}

      const filteredTags = (specifications.tags || []).filter(tag => {
        if (tag['x-include-target']) {
          return tag['x-include-target'].includes(target)
        }
        return true
      })

      const filteredPaths = {}
      for (const [pathUrl, methods] of Object.entries(specifications.paths || {})) {
        const filteredMethods = {}
        for (const [method, operation] of Object.entries(methods)) {
          if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue

          const tagObj = filteredTags.find(t => t.name === operation.tags?.[0])
          if (!tagObj) continue

          if (operation['x-include-target'] && !operation['x-include-target'].includes(target)) {
            continue
          }

          filteredMethods[method] = operation
        }
        if (Object.keys(filteredMethods).length > 0) {
          filteredPaths[pathUrl] = filteredMethods
        }
      }

      const versions = { v1: { tags: [], paths: {} }, v2: { tags: [], paths: {} } }
      for (const tag of filteredTags) {
        const version = tag.name.includes('(V2)') || tag.name.includes('v2') ? 'v2' : 'v1'
        versions[version].tags.push(tag)
      }

      for (const [pathUrl, methods] of Object.entries(filteredPaths)) {
        for (const [method, operation] of Object.entries(methods)) {
          const tagName = operation.tags?.[0]
          const tagObj = versions.v2.tags.find(t => t.name === tagName)
          const version = tagObj ? 'v2' : 'v1'
          if (!versions[version].paths[pathUrl]) {
            versions[version].paths[pathUrl] = {}
          }
          versions[version].paths[pathUrl][method] = operation
        }
      }

      for (const version of ['v1', 'v2']) {
        if (versions[version].tags.length > 0) {
          results[target][version] = {
            openapi: '3.0.1',
            info: specifications.info || { title: 'API', version: '1.0.0' },
            tags: versions[version].tags,
            paths: versions[version].paths,
          }
        }
      }
    }

    return results
  }

  localizeAndCleanSpec(spec, lang) {
    const clean = JSON.parse(JSON.stringify(spec))

    const localizeObj = (obj) => {
      if (!obj || typeof obj !== 'object') return obj

      if (Array.isArray(obj)) {
        return obj.map(item => localizeObj(item))
      }

      const result = {}
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('x-')) {
          if (lang === 'zh-CN' && key === 'x-i18n' && value && typeof value === 'object') {
            const zhContent = value['zh-CN']
            if (zhContent && typeof zhContent === 'object') {
              for (const [field, translated] of Object.entries(zhContent)) {
                if (result[field] !== undefined) {
                  result[field] = translated
                }
              }
            }
          }
          continue
        }

        result[key] = localizeObj(value)
      }
      return result
    }

    return localizeObj(clean)
  }

  objectUrl(key) {
    if (this.publicBaseUrl) {
      return `${this.publicBaseUrl.replace(/\/$/, '')}/${key}`
    }

    const endpoint = (process.env.OSS_ENDPOINT || '').replace(/^https?:\/\//, '')
    if (endpoint) {
      return `https://${this.bucket}.${endpoint}/${key}`
    }

    return key
  }

  async uploadIfChanged(key, content) {
    const ossKey = this.prefix ? `${this.prefix}/${key}` : key
    const md5 = crypto.createHash('md5').update(content).digest('hex')

    try {
      const response = await this.client.getObjectTagging(ossKey)
      const xml = this.parser.parse(response.res.data.toString('utf8'))
      const tagNode = xml?.Tagging?.TagSet?.Tag
      const tags = Array.isArray(tagNode) ? tagNode : (tagNode ? [tagNode] : [])
      const hashTag = tags.find(t => t.Key === 'hash')
      if (hashTag?.Value === md5) {
        console.log(`Skipping ${key} - unchanged`)
        return this.objectUrl(ossKey)
      }
    } catch (err) {
      if (err.code !== 'NoSuchKey') {
        throw err
      }
    }

    console.log(`Uploading ${key}...`)
    await this.client.put(ossKey, Buffer.from(content), {
      headers: {
        'Content-Type': 'application/json',
        'x-oss-object-acl': 'public-read',
        'x-oss-tagging': `hash=${md5}`,
        'x-oss-forbid-overwrite': 'false',
      },
    })

    return this.objectUrl(ossKey)
  }

  updateAboutPage(urls) {
    const aboutPath = 'reference/api/restful/restful/restful.md'
    if (!fs.existsSync(aboutPath)) {
      console.warn(`About page not found at ${aboutPath}`)
      return
    }

    let content = fs.readFileSync(aboutPath, 'utf-8')

    const downloadSection = `
## OpenAPI Specifications

Download the OpenAPI specifications:

${Object.entries(urls).map(([key, url]) => {
      const [target, version] = key.split('-')
      const label = target === 'zilliz' ? 'Zilliz Cloud' : 'Milvus'
      return `- [${label} ${version.toUpperCase()}](${url})`
    }).join('\n')}
`

    const marker = '<!-- openapi-downloads -->'
    if (content.includes(marker)) {
      const before = content.split(marker)[0]
      content = before + marker + downloadSection
    } else {
      content = content + '\n' + marker + downloadSection
    }

    fs.writeFileSync(aboutPath, content)
    console.log('Updated about page with download links')
  }

  async upload(specifications, lang) {
    if (!process.env.OSS_ACCESS_KEY_ID) {
      throw new Error('OSS_ACCESS_KEY_ID environment variable is required')
    }
    if (!process.env.OSS_ACCESS_KEY_SECRET) {
      throw new Error('OSS_ACCESS_KEY_SECRET environment variable is required')
    }
    if (!process.env.OSS_REGION) {
      throw new Error('OSS_REGION environment variable is required')
    }
    if (!this.bucket) {
      throw new Error('OSS_BUCKET environment variable is required')
    }

    const merged = this.mergeSpecsByTargetAndVersion(specifications)
    const urls = {}

    for (const [target, versions] of Object.entries(merged)) {
      for (const [version, spec] of Object.entries(versions)) {
        const cleaned = this.localizeAndCleanSpec(spec, lang)
        const content = JSON.stringify(cleaned, null, 2)
        const key = `openapi-${target}-${version}.json`
        urls[`${target}-${version}`] = await this.uploadIfChanged(key, content)
      }
    }

    this.updateAboutPage(urls)
    return urls
  }
}

module.exports = OSSUploader
