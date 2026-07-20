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

test('disables CN guide refs whose existing targets are empty and reports missing targets', () => {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cn-guides-source-'))
  writeJson(sourceDir, 'raw-target.json', { node_token: 'raw-target', title: 'Raw Target' })
  writeJson(sourceDir, 'empty-target.json', { node_token: 'empty-target', title: 'Empty Target' })
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
        node_token: 'ref-empty',
        title: 'Empty Target',
        slug: 'empty-target',
        base_nav_ref: true,
        base_nav_ref_target_token: 'empty-target',
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
  assert.deepEqual(result.disabled.map(item => item.node_token), ['ref-raw', 'ref-empty'])
  assert.deepEqual(result.disabled.map(item => item.reason), ['empty-target', 'empty-target'])
  assert.deepEqual(result.blockers.map(item => item.node_token), ['ref-missing'])

  const section = readJson(sourceDir, 'section.json')
  assert.deepEqual(section.children[0].base_targets, ['__cn_invalid_ref__'])
  assert.deepEqual(section.children[1].base_targets, ['__cn_invalid_ref__'])
  assert.equal(section.children[1].base_status, 'Not Start Yet')
  assert.deepEqual(section.children[2].base_targets, [])
  assert.deepEqual(section.children[3].base_targets, [])
})

test('synthesizes slugs for Chinese-only navigation entries and matching snapshot records', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'cn-guides-meta-'))
  const sourceDir = path.join(root, 'sources', 'guides')
  const reportsDir = path.join(root, 'reports')
  fs.mkdirSync(sourceDir, { recursive: true })
  fs.mkdirSync(reportsDir, { recursive: true })

  writeJson(sourceDir, 'nav.json', {
    node_token: 'root',
    children: [
      {
        node_token: 'base:tblExample',
        title: '中文表',
        slug: 'stale-table',
        base_table_id: 'tblExample',
        base_nav_virtual: true,
      },
      {
        node_token: 'base:tblExample:recChinese',
        title: '中文分组',
        base_placement_type: 'section',
        base_nav_virtual: true,
      },
      {
        node_token: 'base:tblExample:recEnglish',
        title: 'English Group',
        base_placement_type: 'section',
        base_nav_virtual: true,
      },
    ],
  })
  writeJson(reportsDir, 'guides-source-snapshot-candidate.json', {
    manual: 'guides',
    schema_version: 3,
    navigation_records: [
      { record_id: 'recChinese', table_id: 'tblExample', table_name: '中文表', placement_type: 'section', title: '中文分组' },
      { record_id: 'recEnglish', table_id: 'tblExample', table_name: '中文表', placement_type: 'section', title: 'English Group' },
    ],
  })
  writeJson(root, 'matrix.json', {
    include: [{ table_id: 'tblExample', table_slug: 'example-table' }],
  })

  const result = normalizeCnGuidesSource(sourceDir, { matrixFile: path.join(root, 'matrix.json') })
  assert.deepEqual(result.synthesizedSlugs.map(item => item.slug), ['example-table', 'cn-recchinese'])
  assert.equal(result.snapshotSlugUpdates.some(item => item.table_name === 'example-table'), true)
  assert.equal(result.snapshotSlugUpdates.some(item => item.slug === 'cn-recchinese'), true)

  const nav = readJson(sourceDir, 'nav.json')
  assert.equal(nav.children[0].slug, 'example-table')
  assert.equal(nav.children[1].slug, 'cn-recchinese')
  assert.equal(nav.children[2].slug, undefined)

  const snapshot = readJson(reportsDir, 'guides-source-snapshot-candidate.json')
  assert.equal(snapshot.navigation_records[0].table_name, 'example-table')
  assert.equal(snapshot.navigation_records[0].slug, 'cn-recchinese')
  assert.equal(snapshot.navigation_records[1].table_name, 'example-table')
  assert.equal(snapshot.navigation_records[1].slug, undefined)
})
