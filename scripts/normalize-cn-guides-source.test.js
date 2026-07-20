'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const { normalizeCnGuidesSource } = require('./normalize-cn-guides-source')

function writeJson(root, file, value) {
  fs.writeFileSync(path.join(root, file), JSON.stringify(value, null, 2))
}

function readJson(root, file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
}

test('disables CN guide refs whose target cannot produce a sidebar doc id', () => {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cn-guides-source-'))
  writeJson(sourceDir, 'raw-target.json', { node_token: 'raw-target', title: 'Raw Target' })
  writeJson(sourceDir, 'valid-target.json', { node_token: 'valid-target', title: 'Valid Target', slug: 'valid-target' })
  writeJson(sourceDir, 'section.json', {
    node_token: 'section',
    children: [
      {
        node_token: 'ref-raw',
        title: 'Raw Ref',
        slug: 'raw-ref',
        base_nav_ref: true,
        base_nav_ref_target_token: 'raw-target',
        base_placement_type: 'ref',
        base_targets: [],
      },
      {
        node_token: 'ref-valid',
        title: 'Valid Ref',
        slug: 'valid-ref',
        base_nav_ref: true,
        base_nav_ref_target_token: 'valid-target',
        base_placement_type: 'ref',
        base_targets: [],
      },
      {
        node_token: 'ref-missing',
        title: 'Missing Ref',
        slug: 'missing-ref',
        base_nav_ref: true,
        base_nav_ref_target_token: null,
        base_placement_type: 'ref',
        base_targets: [],
      },
    ],
  })

  const result = normalizeCnGuidesSource(sourceDir)
  assert.deepEqual(result.disabled.map(item => item.node_token), ['ref-raw', 'ref-missing'])

  const section = readJson(sourceDir, 'section.json')
  assert.deepEqual(section.children[0].base_targets, ['__cn_invalid_ref__'])
  assert.equal(section.children[0].base_status, 'Not Start Yet')
  assert.deepEqual(section.children[1].base_targets, [])
  assert.equal(section.children[1].base_status, undefined)
  assert.deepEqual(section.children[2].base_targets, ['__cn_invalid_ref__'])
})
