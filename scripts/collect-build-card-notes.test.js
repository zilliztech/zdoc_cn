'use strict'

const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')

const { cnGuidesEmptyRefsNote } = require('./collect-build-card-notes')

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

test('CN Guides empty refs are surfaced in card notes', () => {
  const previous = process.cwd()
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'card-notes-'))
  try {
    process.chdir(root)
    writeJson('plugins/lark-docs/meta/reports/cn-guides-ref-normalization.json', {
      generated_at: '2026-07-20T00:00:00.000Z',
      disabled: [
        {
          node_token: 'base:tbl:rec-empty',
          title: 'Hugging Face',
          ref_target_token: 'doc-empty',
          target_title: 'Hugging Face',
          reason: 'empty-target',
        },
      ],
      blockers: [],
    })

    const note = cnGuidesEmptyRefsNote()
    assert.match(note, /# CN Guides empty docs/)
    assert.match(note, /Skipped empty ref docs: 1/)
    assert.match(note, /Hugging Face -> Hugging Face/)
    assert.match(note, /cn-guides-ref-normalization\.json/)
  } finally {
    process.chdir(previous)
    fs.rmSync(root, { recursive: true, force: true })
  }
})
