#!/usr/bin/env node
'use strict'

const fs = require('node:fs/promises')
const path = require('node:path')
const { artifactId, validateGuidesTableArtifact } = require('./guides-table-artifact')
const { tableOutputPath } = require('./render-guides-table')

const GUIDE_OUTPUT_ROOTS = Object.freeze(['docs/tutorials', 'docs-byoc/tutorials'])

function snapshotPath(target) {
  return path.join(target, 'plugins/lark-docs/meta/snapshots/guides-uat-last-success.json')
}

function tableSlugFromRecord(record) {
  if (!record || typeof record !== 'object') return null
  const value = record.table_name || record.table_slug
  if (typeof value !== 'string') return null
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : null
}

async function staleOwnedPathsFromSnapshot(target, expectedOwnedPaths) {
  let snapshot
  try {
    snapshot = JSON.parse(await fs.readFile(snapshotPath(target), 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return []
    throw error
  }
  const records = Array.isArray(snapshot.navigation_records)
    ? snapshot.navigation_records
    : Array.isArray(snapshot.records)
      ? snapshot.records
      : []
  const stale = new Set()
  for (const record of records) {
    const slug = tableSlugFromRecord(record)
    if (!slug) continue
    for (const root of GUIDE_OUTPUT_ROOTS) {
      const ownedPath = `${root}/${slug}`
      if (!expectedOwnedPaths.has(ownedPath)) stale.add(ownedPath)
    }
  }
  return [...stale].sort()
}

async function restoreGuidesTableArtifacts({ matrix, artifactDirs, target, sourceArtifactSha256 = null }) {
  if (!Array.isArray(matrix) || !Array.isArray(artifactDirs)) throw new Error('matrix and artifactDirs must be arrays')
  const expected = new Map()
  const expectedOwnedPaths = new Set()
  for (const entry of matrix) {
    const id = artifactId(entry)
    if (expected.has(id)) throw new Error(`Duplicate Guides table matrix entry: ${id}`)
    expected.set(id, entry)
    expectedOwnedPaths.add(tableOutputPath(entry))
  }
  const artifacts = new Map()
  for (const directory of artifactDirs) {
    const manifest = await validateGuidesTableArtifact(directory)
    if (sourceArtifactSha256 && manifest.sourceArtifactSha256 !== sourceArtifactSha256) throw new Error(`Guides table source artifact mismatch: ${manifest.id}`)
    if (artifacts.has(manifest.id)) throw new Error(`Duplicate Guides table artifact: ${manifest.id}`)
    artifacts.set(manifest.id, { directory, manifest })
  }
  for (const id of expected.keys()) if (!artifacts.has(id)) throw new Error(`Missing Guides table artifact: ${id}`)
  for (const id of artifacts.keys()) if (!expected.has(id)) throw new Error(`Extra Guides table artifact: ${id}`)

  for (const ownedPath of await staleOwnedPathsFromSnapshot(target, expectedOwnedPaths)) {
    await fs.rm(path.join(target, ownedPath), { recursive: true, force: true })
  }

  const restored = []
  for (const [id, entry] of expected) {
    const { directory, manifest } = artifacts.get(id)
    await validateGuidesTableArtifact(directory, entry)
    await fs.rm(path.join(target, manifest.ownedPath), { recursive: true, force: true })
    for (const file of manifest.files) {
      const destination = path.join(target, file.path)
      await fs.mkdir(path.dirname(destination), { recursive: true })
      await fs.copyFile(path.join(directory, 'payload', file.path), destination)
    }
    restored.push(manifest)
  }
  return restored
}

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index], value = argv[index + 1]
    if (!flag?.startsWith('--') || value == null) throw new Error('Invalid arguments')
    args[flag.slice(2)] = value
  }
  return args
}

async function main(argv) {
  try {
    const args = parseArgs(argv)
    const matrix = JSON.parse(await fs.readFile(args['matrix-file'], 'utf8')).include || []
    const artifactDirs = (await fs.readdir(args['artifacts-root'], { withFileTypes: true }))
      .filter(entry => entry.isDirectory())
      .map(entry => path.join(args['artifacts-root'], entry.name, 'guides-table'))
    await restoreGuidesTableArtifacts({ matrix, artifactDirs, target: args.target, sourceArtifactSha256: args['source-artifact-sha256'] || null })
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}

if (require.main === module) main(process.argv.slice(2))

module.exports = { restoreGuidesTableArtifacts }
