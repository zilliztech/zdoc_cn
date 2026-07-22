'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

let subject = {}
try { subject = require('./restSidebarKeys') } catch {}

function category(content = '# Control Plane\n') {
  return `---\nslug: /restful/control-plane-v2\nsidebar_position: 1\n---\n\n${content}`
}

test('adds a deterministic path-based sidebar key to REST category landing pages', () => {
  assert.equal(typeof subject.upsertRestSidebarKey, 'function')
  const sourcePath = 'reference/api/restful/restful/v2/control-plane/control-plane.mdx'
  const output = subject.upsertRestSidebarKey(category(), sourcePath)

  assert.match(output, /\nsidebar_key: restful-v2-control-plane\n/)
  assert.equal(subject.restSidebarKey(sourcePath), 'restful-v2-control-plane')
})

test('does not add sidebar keys to REST endpoint documents', () => {
  assert.equal(typeof subject.upsertRestSidebarKey, 'function')
  const sourcePath = 'reference/api/restful/restful/v2/control-plane/list-clusters.mdx'
  assert.equal(subject.upsertRestSidebarKey(category('# List Clusters\n'), sourcePath), category('# List Clusters\n'))
})

test('normalizes and validates every generated REST category landing page', () => {
  assert.equal(typeof subject.normalizeRestSidebarKeys, 'function')
  assert.equal(typeof subject.validateRestSidebarKeys, 'function')
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-sidebar-keys-'))
  try {
    const one = path.join(root, 'reference/api/restful/restful/v2/control-plane/control-plane.mdx')
    const two = path.join(root, 'reference/api/restful/restful/v2/data-plane/data-plane.mdx')
    fs.mkdirSync(path.dirname(one), { recursive: true })
    fs.mkdirSync(path.dirname(two), { recursive: true })
    fs.writeFileSync(one, category('# Control Plane\n'))
    fs.writeFileSync(two, category('# Data Plane\n'))

    assert.throws(() => subject.validateRestSidebarKeys({ cwd: root }), /missing.*sidebar_key/i)
    assert.deepEqual(subject.normalizeRestSidebarKeys({ cwd: root }), { checked: 2, changed: 2 })
    assert.deepEqual(subject.validateRestSidebarKeys({ cwd: root }), { checked: 2, missing: [], invalid: [], duplicates: [] })
  } finally {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
