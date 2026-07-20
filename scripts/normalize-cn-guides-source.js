#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const slugify = require('slugify')

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

function loadTableSlugMap(matrixFile) {
  if (!matrixFile) return new Map()
  const matrix = readJson(matrixFile)
  const entries = Array.isArray(matrix) ? matrix : matrix.include
  if (!Array.isArray(entries)) throw new Error('--matrix-file must contain an array or an object with include[]')
  const map = new Map()
  for (const entry of entries) {
    if (entry?.table_id && entry?.table_slug && !map.has(entry.table_id)) map.set(entry.table_id, entry.table_slug)
  }
  return map
}

function sourceCanResolveDocId(source) {
  return !!source?.slug
}

function plainValue(value) {
  if (value == null) return ''
  if (Array.isArray(value)) return value.map(plainValue).filter(Boolean).join(' ')
  if (typeof value === 'object') return plainValue(value.text || value.name || value.value || value.title || '')
  return String(value)
}

function strictSlug(value) {
  return slugify(String(value || ''), { lower: true, strict: true })
}

function tableLevelSlug(source, tableSlugMap) {
  const token = sourceToken(source)
  const tableId = source?.base_table_id || /^base:([^:]+)$/.exec(String(token || ''))?.[1] || null
  if (!tableId) return null
  if (String(token || '') !== `base:${tableId}`) return null
  return tableSlugMap.get(tableId) || null
}

function syntheticSlugForToken(token, source, tableSlugMap) {
  const tableSlug = tableLevelSlug(source, tableSlugMap)
  if (tableSlug) return tableSlug
  const raw = String(token || '')
    .split(':')
    .filter(Boolean)
    .pop() || 'item'
  const safe = strictSlug(raw) || raw.replace(/[^A-Za-z0-9_-]/g, '').toLowerCase()
  return `cn-${safe || 'item'}`
}

function navigationLabel(source) {
  return plainValue(source?.base_labels) || source?.title || source?.name || ''
}

function needsSyntheticSlug(source) {
  if (source?.slug) return false
  if (!(
    source?.base_placement_type ||
    source?.base_nav_link ||
    source?.base_nav_virtual
  )) return false
  if (source?.base_nav_ref || source?.base_placement_type === 'ref') return false
  return !strictSlug(navigationLabel(source))
}

function visitSources(value, callback) {
  if (!value || typeof value !== 'object') return
  callback(value)
  if (Array.isArray(value.children)) {
    for (const child of value.children) visitSources(child, callback)
  }
}

function normalizeCnGuidesSource(sourceDir, options = {}) {
  const tableSlugMap = loadTableSlugMap(options.matrixFile)
  const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json')).sort()
  const byToken = new Map()
  const documents = files.map(file => {
    const fullPath = path.join(sourceDir, file)
    const source = readJson(fullPath)
    visitSources(source, nested => {
      if (nested && typeof nested === 'object') nested.__source_file = file
      const token = sourceToken(nested)
      if (token && !byToken.has(token)) byToken.set(token, nested)
    })
    return { file, fullPath, source, changed: false }
  })

  const disabled = []
  const blockers = []
  const synthesizedSlugs = []
  for (const document of documents) {
    visitSources(document.source, source => {
      const tableSlug = tableLevelSlug(source, tableSlugMap)
      if (tableSlug && source.slug !== tableSlug) {
        const token = sourceToken(source)
        source.slug = tableSlug
        document.changed = true
        synthesizedSlugs.push({
          source_file: document.file,
          node_token: token,
          title: source.title || source.name || null,
          slug: source.slug,
        })
      } else if (needsSyntheticSlug(source)) {
        const token = sourceToken(source)
        source.slug = syntheticSlugForToken(token, source, tableSlugMap)
        document.changed = true
        synthesizedSlugs.push({
          source_file: document.file,
          node_token: token,
          title: source.title || source.name || null,
          slug: source.slug,
        })
      }

      if (!source.base_nav_ref) return
      const target = source.base_nav_ref_target_token ? byToken.get(source.base_nav_ref_target_token) : null
      if (!target) {
        blockers.push({
          source_file: document.file,
          node_token: source.node_token || source.origin_node_token || null,
          title: source.title || source.name || null,
          ref_target_token: source.base_nav_ref_target_token || null,
          reason: 'target-missing',
        })
        return
      }
      if (sourceCanResolveDocId(target)) return

      source.base_targets = [DISABLED_TARGET]
      source.base_status = source.base_status || 'Not Start Yet'
      document.changed = true
      disabled.push({
        source_file: document.file,
        node_token: source.node_token || source.origin_node_token || null,
        title: source.title || source.name || null,
        ref_target_token: source.base_nav_ref_target_token || null,
        target_title: target.title || target.name || null,
        target_source_file: target.__source_file || null,
        reason: 'empty-target',
      })
    })
  }

  for (const document of documents) {
    visitSources(document.source, source => {
      if (source && typeof source === 'object') delete source.__source_file
    })
    if (document.changed) writeJson(document.fullPath, document.source)
  }

  const snapshotPath = path.resolve(sourceDir, '../../reports/guides-source-snapshot-candidate.json')
  const snapshotSlugUpdates = []
  if (fs.existsSync(snapshotPath)) {
    const snapshot = readJson(snapshotPath)
    if (Array.isArray(snapshot.navigation_records)) {
      for (const record of snapshot.navigation_records) {
        if (record.table_id && tableSlugMap.has(record.table_id) && record.table_name !== tableSlugMap.get(record.table_id)) {
          record.table_name = tableSlugMap.get(record.table_id)
          snapshotSlugUpdates.push({
            record_id: record.record_id,
            title: record.title || null,
            table_id: record.table_id,
            table_name: record.table_name,
            reason: 'table-slug',
          })
        }
        if (record.slug) continue
        if (!['section', 'link'].includes(record.placement_type)) continue
        if (strictSlug(record.title || record.record_id)) continue
        record.slug = syntheticSlugForToken(record.record_id, record, tableSlugMap)
        snapshotSlugUpdates.push({
          record_id: record.record_id,
          title: record.title || null,
          slug: record.slug,
        })
      }
      if (snapshotSlugUpdates.length > 0) writeJson(snapshotPath, snapshot)
    }
  }

  return { generated_at: new Date().toISOString(), disabled, blockers, synthesizedSlugs, snapshotSlugUpdates }
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
  const result = normalizeCnGuidesSource(args['source-dir'], { matrixFile: args['matrix-file'] || null })
  const output = args.output || null
  if (output) {
    fs.mkdirSync(path.dirname(output), { recursive: true })
    writeJson(output, result)
  }
  if (result.blockers.length > 0) {
    throw new Error(`CN Guides refs have missing targets: ${result.blockers.map(item => item.title || item.node_token).join(', ')}`)
  }
  console.log(`Disabled ${result.disabled.length} empty CN Guides ref entries`)
  console.log(`Synthesized ${result.synthesizedSlugs.length} CN Guides navigation slug(s)`)
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
