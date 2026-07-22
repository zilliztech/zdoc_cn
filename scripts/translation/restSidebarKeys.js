'use strict'

const fs = require('node:fs')
const path = require('node:path')

const REST_ROOT = 'reference/api/restful/restful'

function toPosix(value) {
  return value.split(path.sep).join('/')
}

function restSidebarKey(sourcePath) {
  const normalized = toPosix(path.normalize(sourcePath)).replace(/^\.\//, '')
  if (!normalized.startsWith(`${REST_ROOT}/`)) return null
  const relative = normalized.slice(REST_ROOT.length + 1)
  const extension = path.posix.extname(relative)
  if (extension !== '.md' && extension !== '.mdx') return null
  const basename = path.posix.basename(relative, extension)
  const directory = path.posix.dirname(relative)
  if (basename !== path.posix.basename(directory)) return null
  return ['restful', ...directory.split('/').filter(part => part && part !== '.')].join('-')
}

function upsertRestSidebarKey(content, sourcePath) {
  const expected = restSidebarKey(sourcePath)
  if (!expected) return content
  const match = String(content).match(/^(\uFEFF?---\r?\n)([\s\S]*?)(\r?\n---(?:\r?\n|$))/)
  if (!match) throw new Error(`REST category landing page has no YAML frontmatter: ${sourcePath}`)
  const newline = match[1].includes('\r\n') ? '\r\n' : '\n'
  const lines = match[2].split(/\r?\n/)
  const index = lines.findIndex(line => /^sidebar_key\s*:/.test(line))
  if (index === -1) lines.push(`sidebar_key: ${expected}`)
  else lines[index] = `sidebar_key: ${expected}`
  return `${match[1]}${lines.join(newline)}${match[3]}${String(content).slice(match[0].length)}`
}

function categoryFiles(cwd) {
  const root = path.join(cwd, ...REST_ROOT.split('/'))
  if (!fs.existsSync(root)) return []
  const files = []
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name)
      if (entry.isDirectory()) visit(absolute)
      else if (entry.isFile()) {
        const relative = toPosix(path.relative(cwd, absolute))
        if (restSidebarKey(relative)) files.push({ absolute, relative })
      }
    }
  }
  visit(root)
  return files.sort((left, right) => left.relative.localeCompare(right.relative))
}

function normalizeRestSidebarKeys({ cwd = process.cwd() } = {}) {
  const files = categoryFiles(cwd)
  let changed = 0
  for (const file of files) {
    const content = fs.readFileSync(file.absolute, 'utf8')
    const normalized = upsertRestSidebarKey(content, file.relative)
    if (normalized !== content) {
      fs.writeFileSync(file.absolute, normalized)
      changed += 1
    }
  }
  return { checked: files.length, changed }
}

function validateRestSidebarKeys({ cwd = process.cwd() } = {}) {
  const files = categoryFiles(cwd)
  const missing = []
  const invalid = []
  const duplicates = []
  const seen = new Map()
  for (const file of files) {
    const content = fs.readFileSync(file.absolute, 'utf8')
    const actual = content.match(/^sidebar_key\s*:\s*([^\s#]+).*$/m)?.[1]
    const expected = restSidebarKey(file.relative)
    if (!actual) missing.push(file.relative)
    else {
      if (actual !== expected) invalid.push(`${file.relative}: expected ${expected}, received ${actual}`)
      if (seen.has(actual)) duplicates.push(`${actual}: ${seen.get(actual)}, ${file.relative}`)
      else seen.set(actual, file.relative)
    }
  }
  const result = { checked: files.length, missing, invalid, duplicates }
  if (missing.length || invalid.length || duplicates.length) {
    const errors = []
    if (missing.length) errors.push(`missing sidebar_key:\n- ${missing.join('\n- ')}`)
    if (invalid.length) errors.push(`invalid sidebar_key:\n- ${invalid.join('\n- ')}`)
    if (duplicates.length) errors.push(`duplicate sidebar_key:\n- ${duplicates.join('\n- ')}`)
    throw new Error(`REST sidebar key validation failed:\n${errors.join('\n')}`)
  }
  return result
}

function main() {
  const command = process.argv[2]
  if (command === 'normalize') console.log(JSON.stringify(normalizeRestSidebarKeys()))
  else if (command === 'validate') console.log(JSON.stringify(validateRestSidebarKeys()))
  else throw new Error('Usage: node scripts/translation/restSidebarKeys.js <normalize|validate>')
}

if (require.main === module) {
  try { main() } catch (error) { console.error(error.message); process.exit(1) }
}

module.exports = { normalizeRestSidebarKeys, restSidebarKey, upsertRestSidebarKey, validateRestSidebarKeys }
