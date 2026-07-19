'use strict'

const assert = require('node:assert/strict')
const test = require('node:test')
const { buildGuidesTableMatrix } = require('../docs-workflow/guides-tables')

function snapshot(records) {
  return {
    schema_version: 3,
    manual: 'guides',
    navigation_records: records,
    table_digests: {},
  }
}

test('CN Guides matrix uses configured table-id slugs for translated table names', () => {
  const current = snapshot([
    { record_id: 'cn-ai-models', table_id: 'tblr7Zec2ReTfRmw', table_name: 'AI 模型', placement_type: 'canonical', progress: 'Draft', targets: ['zilliz.saas'] },
    { record_id: 'cn-get-started', table_id: 'tblsw6S3J0ekcgNB', table_name: '从这里开始', placement_type: 'canonical', progress: 'Draft', targets: ['zilliz.saas'] },
    { record_id: 'cn-tools', table_id: 'tblRaa3JnIhllHb9', table_name: '工具', placement_type: 'canonical', progress: 'Draft', targets: ['zilliz.paas'] },
  ])
  const matrix = buildGuidesTableMatrix({
    plan: { mode: 'incremental', affected_tables: ['tblr7Zec2ReTfRmw', 'tblsw6S3J0ekcgNB', 'tblRaa3JnIhllHb9'] },
    snapshot: current,
  })
  assert.deepEqual(matrix.map(item => [item.table_id, item.table_slug, item.target]).sort(), [
    ['tblr7Zec2ReTfRmw', 'ai-models', 'zilliz.saas'],
    ['tblsw6S3J0ekcgNB', 'get-started', 'zilliz.saas'],
    ['tblRaa3JnIhllHb9', 'tools', 'zilliz.paas'],
  ].sort())
})
