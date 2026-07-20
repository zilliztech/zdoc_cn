#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')

const DISABLED_TARGET = '__cn_invalid_ref__'

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

function sourceToken(source) {
  return source?.node_token || source?.origin_node_token || source?.obj_token || source?.token || null
}

function sourceCanResolveDocId(source) {
  return !!source?.slug
}

function visitSources(value, callback) {
  if (!value || typeof value !== 'object') return
  callback(value)
  if (Array.isArray(value.children)) {
    for (const child of value.children) visitSources(child, callback)
  }
}

function normalizeCnGuidesSource(sourceDir) {
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json')).sort()
  const byToken = new Map()
  const documents = files.map(file => {
    const fullPath = path.join(sourceDir, file)
    const source = readJson(fullPath)
    visitSources(source, nested => {
      const token = sourceToken(nested)
      if (token && !byToken.has(token)) byToken.set(token, nested)
    })
    return { file, fullPath, source, changed: false }
  })

  const disabled = []
  for (const document of documents) {
    visitSources(document.source, source => {
      if (!source.base_nav_ref) return
      const target = source.base_nav_ref_target_token ? byToken.get(source.base_nav_ref_target_token) : null
      if (target && sourceCanResolveDocId(target)) return

      source.base_targets = [DISABLED_TARGET]
      source.base_status = source.base_status || 'Not Start Yet'
      document.changed = true
      disabled.push({
        source_file: document.file,
        node_token: source.node_token || source.origin_node_token || null,
        title: source.title || source.name || null,
        ref_target_token: source.base_nav_ref_target_token || null,
        reason: target ? 'target-has-no-sidebar-doc-id' : 'target-missing',
      })
    })
  }

  for (const document of documents) {
    if (document.changed) writeJson(document.fullPath, document.source)
  }

  return { disabled }
}

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index]
    const value = argv[index + 1]
    if (!flag?.startsWith('--') || value == null) throw new Error('Invalid arguments')
    args[flag.slice(2)] = value
  }
  return args
}

function main(argv) {
  const args = parseArgs(argv)
  if (!args['source-dir']) throw new Error('--source-dir is required')
  const result = normalizeCnGuidesSource(args['source-dir'])
  const output = args.output || null
  if (output) {
    fs.mkdirSync(path.dirname(output), { recursive: true })
    writeJson(output, result)
  }
  console.log(`Disabled ${result.disabled.length} invalid CN Guides ref entries`)
}

if (require.main === module) {
  try {
    main(process.argv.slice(2))
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}

module.exports = { normalizeCnGuidesSource }
