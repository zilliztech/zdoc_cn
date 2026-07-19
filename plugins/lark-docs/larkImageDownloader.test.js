'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const LarkImageDownloader = require('./larkImageDownloader')

test('does not read Guides media manifest environment variables', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-media-manifest-'))
  const previousPath = process.env.GUIDES_MEDIA_MANIFEST
  const previousStrict = process.env.GUIDES_MEDIA_PREFETCH_REQUIRED
  process.env.GUIDES_MEDIA_MANIFEST = path.join(root, 'missing.json')
  process.env.GUIDES_MEDIA_PREFETCH_REQUIRED = 'true'
  const downloader = new LarkImageDownloader({}, root)
  try {
    assert.equal(typeof downloader.__prefetchedMedia, 'undefined')
  } finally {
    downloader.destroy()
    if (previousPath === undefined) delete process.env.GUIDES_MEDIA_MANIFEST
    else process.env.GUIDES_MEDIA_MANIFEST = previousPath
    if (previousStrict === undefined) delete process.env.GUIDES_MEDIA_PREFETCH_REQUIRED
    else process.env.GUIDES_MEDIA_PREFETCH_REQUIRED = previousStrict
  }
})

test('routes Figma API work through its dedicated limiter', async () => {
  assert.match(LarkImageDownloader.prototype.__fetchCaption.toString(), /__scheduleFigmaApi/)
  assert.match(LarkImageDownloader.prototype.__downloadIframe.toString(), /__scheduleFigmaApi/)
  const downloader = new LarkImageDownloader({}, os.tmpdir())
  let scheduled = 0
  downloader.figmaLimiter = {
    async schedule(task) {
      scheduled += 1
      return await task()
    },
  }
  try {
    const result = await downloader.__scheduleFigmaApi(async () => 'figma-response')
    assert.equal(result, 'figma-response')
    assert.equal(scheduled, 1)
  } finally {
    downloader.destroy()
  }
})

test('__uploadToS3 is a CN compatibility alias backed by Ali OSS', async () => {
  const downloader = new LarkImageDownloader({}, os.tmpdir())
  const calls = []
  downloader.client = {
    async getObjectTagging(key) {
      calls.push(['tag', key])
      const error = new Error('missing')
      error.code = 'NoSuchKey'
      throw error
    },
    async put(key, buffer, options) {
      calls.push(['put', key, buffer.toString('utf8'), options.headers['x-oss-object-acl'], options.headers['x-oss-tagging']])
    },
  }

  try {
    await downloader.__uploadToS3(Buffer.from('image'), 'doc/image.png')
  } finally {
    downloader.destroy()
  }

  assert.deepEqual(calls, [
    ['tag', 'doc/image.png'],
    ['put', 'doc/image.png', 'image', 'public-read', 'hash=78805a221a988e79ef3f42d7c5bfd418'],
  ])
})
