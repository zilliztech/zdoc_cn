const assert = require('node:assert/strict')
const Module = require('node:module')
const path = require('node:path')

function testPluginIndexDoesNotEagerlyRequireUploader() {
  const indexPath = path.join(__dirname, 'index.js')
  const originalLoad = Module._load

  Module._load = function (request, parent, isMain) {
    if (request === './s3Uploader' || request === './ossUploader') {
      throw new Error('UPLOADER_EAGER_LOAD')
    }
    return originalLoad.apply(this, arguments)
  }

  delete require.cache[indexPath]

  try {
    const pluginFactory = require(indexPath)
    assert.equal(typeof pluginFactory, 'function')
  } finally {
    Module._load = originalLoad
    delete require.cache[indexPath]
  }
}

function run() {
  testPluginIndexDoesNotEagerlyRequireUploader()
  console.log('apifox index loader tests passed')
}

run()
