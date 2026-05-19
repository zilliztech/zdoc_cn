const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const specPath = path.join(__dirname, 'meta/openapi/20-volume-operations-v2.json')

function loadSpec() {
  return JSON.parse(fs.readFileSync(specPath, 'utf-8'))
}

function collectVolumeAuthorizationParams(spec) {
  const params = []
  for (const [route, methods] of Object.entries(spec.paths || {})) {
    if (!route.startsWith('/v2/volumes')) continue
    for (const [method, op] of Object.entries(methods || {})) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) continue
      for (const p of op.parameters || []) {
        if (p.name === 'Authorization' && p.in === 'header') {
          params.push({ route, method, param: p })
        }
      }
    }
  }
  return params
}

function testVolumeAuthorizationIsApiKeyOnly() {
  const spec = loadSpec()
  const authParams = collectVolumeAuthorizationParams(spec)

  assert.ok(authParams.length > 0)

  for (const { route, method, param } of authParams) {
    assert.equal(
      /username:password/.test(param.description || ''),
      false,
      `${method.toUpperCase()} ${route} Authorization description still mentions username:password`,
    )
    assert.equal(
      /username:password/.test(param?.['x-i18n']?.['zh-CN']?.description || ''),
      false,
      `${method.toUpperCase()} ${route} Authorization zh-CN description still mentions username:password`,
    )
  }
}

function testCreateVolumeHasZhCnExternalExample() {
  const spec = loadSpec()
  const examples = spec.paths['/v2/volumes/create']
    .post.requestBody.content['application/json'].examples

  const zhCnExternal = Object.values(examples).find(ex => (
    ex?.['x-target-lang'] === 'zh-CN'
    && ex?.value?.type === 'EXTERNAL'
    && ex?.value?.storageIntegrationId
    && ex?.value?.path
  ))

  assert.ok(zhCnExternal, 'Create Volume is missing zh-CN EXTERNAL request example')
  assert.equal(zhCnExternal.value.regionId, 'ali-cn-hangzhou')
  assert.match(
    zhCnExternal.value.storageIntegrationId,
    /^integ-/,
    'Create Volume zh-CN EXTERNAL example should use integ- prefixed storageIntegrationId',
  )
}

function testDescribeVolumeHasZhCnRegionExamples() {
  const spec = loadSpec()
  const examples = spec.paths['/v2/volumes/{VOLUME_NAME}']
    .get.responses['200'].content['application/json'].examples

  const zhCnSuccessExamples = Object.values(examples).filter(ex => (
    ex?.['x-target-response'] === 'OPTION 1'
    && ex?.['x-target-lang'] === 'zh-CN'
    && ex?.value?.data
  ))

  assert.ok(zhCnSuccessExamples.length >= 2, 'Describe Volume should have zh-CN managed and external success examples')

  for (const ex of zhCnSuccessExamples) {
    assert.equal(ex.value.data.regionId, 'ali-cn-hangzhou')
    if (ex.value.data.type === 'EXTERNAL') {
      assert.match(
        ex.value.data.storageIntegrationId,
        /^integ-/,
        'Describe Volume zh-CN EXTERNAL response example should use integ- prefixed storageIntegrationId',
      )
    }
  }
}

function run() {
  testVolumeAuthorizationIsApiKeyOnly()
  testCreateVolumeHasZhCnExternalExample()
  testDescribeVolumeHasZhCnRegionExamples()
  console.log('apifox volume CN issue fix tests passed')
}

run()
