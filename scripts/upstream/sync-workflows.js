#!/usr/bin/env node

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DEFAULT_UPSTREAM = path.resolve(ROOT_DIR, '..', 'zdoc');

const COPIED_PATHS = [
  '.github/workflows/fetch-docs.yml',
  '.github/workflows/_assemble-guides.yml',
  '.github/workflows/_fetch-content-group.yml',
  '.github/workflows/_fetch-guides-sources.yml',
  '.github/workflows/_monitor-docs-progress.yml',
  '.github/workflows/_prepare-translation-batches.yml',
  '.github/workflows/_publish-content-group.yml',
  '.github/workflows/_publish-translation-batches.yml',
  '.github/workflows/_render-guides-table.yml',
  '.github/workflows/_translate-content-group.yml',
  '.github/workflows/_translate-publish-batch.yml',
  '.github/workflows/_verify-docs.yml',
  '.github/workflows/translate-codex.yml',
  'scripts/collect-build-card-notes.js',
  'scripts/docs-workflow',
  'scripts/update-lark-doc-snapshot.js',
  'scripts/update-sdk-reference-snapshots.sh',
];

const UPSTREAM_GUIDES_ROOT_TOKEN = 'Tg6mwbRGDitPQ3kLUQzc44I7nth';

function readGuidesRootToken(root) {
  const configPath = path.join(root, 'config', 'lark-docs.config.ts');
  const content = fs.readFileSync(configPath, 'utf8');
  const guidesBlock = content.match(/const\s+guides\s*:\s*Manual\s*=\s*\{[\s\S]*?\n\}/);
  const rootMatch = guidesBlock?.[0].match(/\broot:\s*['"]([^'"\r\n]+)['"]/);
  if (!rootMatch) throw new Error(`Unable to read guides root token from ${path.relative(root, configPath)}`);
  return rootMatch[1];
}

function parseArgs(argv) {
  const options = {
    mode: 'check',
    root: ROOT_DIR,
    upstream: DEFAULT_UPSTREAM,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--write') {
      options.mode = 'write';
    } else if (arg === '--check') {
      options.mode = 'check';
    } else if (arg === '--root') {
      index += 1;
      if (!argv[index]) throw new Error('--root requires a value');
      options.root = path.resolve(argv[index]);
    } else if (arg === '--upstream') {
      index += 1;
      if (!argv[index]) throw new Error('--upstream requires a value');
      options.upstream = path.resolve(argv[index]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function copyPath(from, to) {
  fs.rmSync(to, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true, dereference: false, preserveTimestamps: false });
}

function listFiles(root, relativePath = '') {
  const directory = path.join(root, relativePath);
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = path.posix.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFiles(root, child));
    } else if (entry.isFile()) {
      files.push(child);
    }
  }
  return files;
}

function writeText(root, relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function replaceAll(content, replacements) {
  let next = content;
  for (const [from, to] of replacements) {
    next = next.split(from).join(to);
  }
  return next;
}

function applyOssPatch(content) {
  let next = replaceAll(content, [
    ['AWS_ACCESS_KEY_ID', 'OSS_ACCESS_KEY_ID'],
    ['AWS_SECRET_ACCESS_KEY', 'OSS_ACCESS_KEY_SECRET'],
    ['AWS_BUCKET', 'OSS_BUCKET'],
    ['AWS_REGION', 'OSS_REGION'],
  ]);

  if (!next.includes('OSS_ENDPOINT: ${{ vars.OSS_ENDPOINT }}')) {
    next = next.replace(
      /(\n\s+OSS_REGION: \$\{\{ vars\.OSS_REGION \}\})/,
      '$1\n          OSS_ENDPOINT: ${{ vars.OSS_ENDPOINT }}',
    );
  }

  return next;
}

function applyCnGuidesFetchThrottlePatch(content) {
  if (/FEISHU_RETRY_ATTEMPTS:\s*['"]?9['"]?/.test(content)) return content;

  return content.replace(
    /(\n\s+FEISHU_HOST: \$\{\{ vars\.FEISHU_HOST \}\}\n)/,
    `$1          FEISHU_MAX_CONCURRENT: '1'
          FEISHU_MIN_TIME_MS: '1500'
          FEISHU_WIKI_NODE_MIN_TIME_MS: '1500'
          FEISHU_RETRY_ATTEMPTS: '9'
          FEISHU_RETRY_DELAY_MS: '5000'
          FEISHU_RATE_LIMIT_FALLBACK_MS: '120000'
`,
  );
}

function applyCnGuidesTableSlugPatch(content) {
  let next = content.replace("\nconst slugify = require('slugify')", '');
  if (!next.includes("const path = require('node:path')")) {
    next = next.replace(
      "const fs = require('node:fs')",
      "const fs = require('node:fs')\nconst path = require('node:path')",
    );
  }
  if (!next.includes('loadCnGuidesTableSlugOverrides')) {
    next = next.replace(
      "const TARGETS = ['zilliz.paas', 'zilliz.saas']",
      `function loadCnGuidesTableSlugOverrides() {
  const file = path.join(process.cwd(), 'config', 'guides-table-slugs.json')
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return {}
    throw error
  }
}

const TABLE_SLUG_OVERRIDES = loadCnGuidesTableSlugOverrides()
const TARGETS = ['zilliz.paas', 'zilliz.saas']`,
    );
  }
  if (!next.includes('function strictSlug(value)')) {
    const strictSlugFunction = `function strictSlug(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}`;
    if (next.includes('\nfunction currentOwnership(snapshot) {')) {
      next = next.replace(
        '\nfunction currentOwnership(snapshot) {',
        `\n${strictSlugFunction}\n\nfunction currentOwnership(snapshot) {`,
      );
    } else {
      next = next.replace('\nmodule.exports = {', `\n${strictSlugFunction}\n\nmodule.exports = {`);
    }
  }
  next = next.replace(
    "table_slug: slugify(tableName, { lower: true, strict: true }),",
    "table_slug: TABLE_SLUG_OVERRIDES[tableId] || strictSlug(tableName),",
  );
  next = next.replace(
    "table_slug: TABLE_SLUG_OVERRIDES[tableId] || slugify(tableName, { lower: true, strict: true }),",
    "table_slug: TABLE_SLUG_OVERRIDES[tableId] || strictSlug(tableName),",
  );
  return next.replace(
    'module.exports = { buildGuidesTableMatrix, normalizeTarget }',
    'module.exports = { buildGuidesTableMatrix, normalizeTarget, strictSlug }',
  );
}

function applyCnRenderGuidesTableSlugNormalizationPatch(content) {
  if (content.includes('normalizeRenderedTableOutput')) return content;

  let next = content.replace(
    '\nfunction renderGuidesTable(options) {',
    `
function hasFiles(directory) {
  let entries
  try { entries = fs.readdirSync(directory, { withFileTypes: true }) } catch (error) {
    if (error.code === 'ENOENT') return false
    throw error
  }
  for (const entry of entries) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory() && hasFiles(full)) return true
    if (entry.isFile()) return true
  }
  return false
}

function snapshotChildren(directory) {
  const snapshot = new Map()
  let entries
  try { entries = fs.readdirSync(directory, { withFileTypes: true }) } catch (error) {
    if (error.code === 'ENOENT') return snapshot
    throw error
  }
  for (const entry of entries) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory() || entry.isFile()) snapshot.set(entry.name, fs.statSync(full).mtimeMs)
  }
  return snapshot
}

function changedRootFiles(absoluteRoot, entries, beforeChildren) {
  return entries
    .filter(entry => entry.isFile())
    .filter(entry => {
      const beforeMtime = beforeChildren.get(entry.name)
      return beforeMtime == null || fs.statSync(path.join(absoluteRoot, entry.name)).mtimeMs > beforeMtime
    })
}

function normalizeRenderedTableOutput(workspace, outputPath, beforeChildren) {
  const absoluteOutput = path.join(workspace, outputPath)
  if (hasFiles(absoluteOutput)) return

  const relativeRoot = path.posix.dirname(outputPath)
  const expectedName = path.posix.basename(outputPath)
  const absoluteRoot = path.join(workspace, relativeRoot)
  let entries
  try { entries = fs.readdirSync(absoluteRoot, { withFileTypes: true }) } catch (error) {
    if (error.code === 'ENOENT') return
    throw error
  }

  const candidates = entries
    .filter(entry => entry.isDirectory() && entry.name !== expectedName)
    .filter(entry => {
      const full = path.join(absoluteRoot, entry.name)
      const beforeMtime = beforeChildren.get(entry.name)
      const changed = beforeMtime == null || fs.statSync(full).mtimeMs > beforeMtime
      return changed && hasFiles(full)
    })

  const rootFiles = changedRootFiles(absoluteRoot, entries, beforeChildren)
  if (candidates.length === 0 && rootFiles.length === 0) return

  fs.rmSync(absoluteOutput, { recursive: true, force: true })
  fs.mkdirSync(path.dirname(absoluteOutput), { recursive: true })
  if (candidates.length === 1 && rootFiles.length === 0) {
    fs.renameSync(path.join(absoluteRoot, candidates[0].name), absoluteOutput)
    return
  }

  fs.mkdirSync(absoluteOutput, { recursive: true })
  for (const entry of candidates) fs.renameSync(path.join(absoluteRoot, entry.name), path.join(absoluteOutput, entry.name))
  for (const entry of rootFiles) fs.renameSync(path.join(absoluteRoot, entry.name), path.join(absoluteOutput, entry.name))
}

function renderGuidesTable(options) {`,
  );
  next = next.replace(
    '  fs.rmSync(absoluteOutput, { recursive: true, force: true })\n  if (options.cleanup) return { outputPath, cleanup: true }',
    '  fs.rmSync(absoluteOutput, { recursive: true, force: true })\n  const beforeChildren = snapshotChildren(path.dirname(absoluteOutput))\n  if (options.cleanup) return { outputPath, cleanup: true }',
  );
  next = next.replace(
    '  if (result.status !== 0) throw new Error(`Guides table render failed with status ${result.status}`)\n  return { outputPath, cleanup: false }',
    '  if (result.status !== 0) throw new Error(`Guides table render failed with status ${result.status}`)\n  normalizeRenderedTableOutput(workspace, outputPath, beforeChildren)\n  return { outputPath, cleanup: false }',
  );
  return next;
}

function applyCnRenderGuidesTableSlugNormalizationTestPatch(content) {
  if (content.includes('localized renderer output')) return content;

  return content.replace(
    "\ntest('cleanup render removes the owned directory without invoking Docusaurus', () => {",
    `
test('table render normalizes localized renderer output into the configured table slug directory', () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'render-guides-table-'))
  const expected = path.join(workspace, 'docs/tutorials/ai-models')
  const localized = path.join(workspace, 'docs/tutorials/ai')
  const other = path.join(workspace, 'docs/tutorials/management')
  fs.mkdirSync(expected, { recursive: true })
  fs.writeFileSync(path.join(expected, 'stale.md'), 'stale')
  fs.mkdirSync(other, { recursive: true })
  fs.writeFileSync(path.join(other, 'keep.md'), 'keep')

  const spawnSync = () => {
    fs.mkdirSync(localized, { recursive: true })
    fs.writeFileSync(path.join(localized, 'integrate-with-model-providers.md'), 'canonical')
    return { status: 0 }
  }

  const result = renderGuidesTable({
    workspace, table_id: 'tbl-ai', table_name: 'AI 模型', table_slug: 'ai-models', target: 'zilliz.saas', cleanup: false, spawnSync,
  })

  assert.equal(result.outputPath, 'docs/tutorials/ai-models')
  assert.equal(fs.existsSync(path.join(expected, 'stale.md')), false)
  assert.equal(fs.readFileSync(path.join(expected, 'integrate-with-model-providers.md'), 'utf8'), 'canonical')
  assert.equal(fs.existsSync(localized), false)
  assert.equal(fs.readFileSync(path.join(other, 'keep.md'), 'utf8'), 'keep')
})

test('table render normalizes root-level output when localized table slug is empty', () => {
  const workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'render-guides-table-'))
  const root = path.join(workspace, 'docs-byoc/tutorials')
  const expected = path.join(root, 'client-libraries')
  const other = path.join(root, 'management')
  fs.mkdirSync(expected, { recursive: true })
  fs.writeFileSync(path.join(expected, 'stale.md'), 'stale')
  fs.mkdirSync(other, { recursive: true })
  fs.writeFileSync(path.join(other, 'keep.md'), 'keep')

  const spawnSync = () => {
    fs.mkdirSync(root, { recursive: true })
    fs.writeFileSync(path.join(root, 'install-sdks.md'), 'canonical')
    fs.mkdirSync(path.join(root, 'analyzer'), { recursive: true })
    fs.writeFileSync(path.join(root, 'analyzer/overview.md'), 'analyzer')
    fs.mkdirSync(path.join(root, 'collection'), { recursive: true })
    fs.writeFileSync(path.join(root, 'collection/manage.md'), 'collection')
    return { status: 0 }
  }

  const result = renderGuidesTable({
    workspace, table_id: 'tbl-client', table_name: '客户端参考', table_slug: 'client-libraries', target: 'zilliz.paas', cleanup: false, spawnSync,
  })

  assert.equal(result.outputPath, 'docs-byoc/tutorials/client-libraries')
  assert.equal(fs.existsSync(path.join(expected, 'stale.md')), false)
  assert.equal(fs.readFileSync(path.join(expected, 'install-sdks.md'), 'utf8'), 'canonical')
  assert.equal(fs.readFileSync(path.join(expected, 'analyzer/overview.md'), 'utf8'), 'analyzer')
  assert.equal(fs.readFileSync(path.join(expected, 'collection/manage.md'), 'utf8'), 'collection')
  assert.equal(fs.existsSync(path.join(root, 'install-sdks.md')), false)
  assert.equal(fs.existsSync(path.join(root, 'analyzer')), false)
  assert.equal(fs.readFileSync(path.join(other, 'keep.md'), 'utf8'), 'keep')
})

test('cleanup render removes the owned directory without invoking Docusaurus', () => {`,
  );
}

function applyCnRestoreGuidesTableArtifactsPatch(content) {
  if (content.includes('staleOwnedPathsFromSnapshot')) return content;

  let next = content.replace(
    "const { artifactId, validateGuidesTableArtifact } = require('./guides-table-artifact')",
    "const { artifactId, validateGuidesTableArtifact } = require('./guides-table-artifact')\nconst { tableOutputPath } = require('./render-guides-table')",
  );
  next = next.replace(
    '\nasync function restoreGuidesTableArtifacts({ matrix, artifactDirs, target, sourceArtifactSha256 = null }) {',
    `
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
    .replace(/[\\u0300-\\u036f]/g, '')
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
      const ownedPath = \`\${root}/\${slug}\`
      if (!expectedOwnedPaths.has(ownedPath)) stale.add(ownedPath)
    }
  }
  return [...stale].sort()
}

async function restoreGuidesTableArtifacts({ matrix, artifactDirs, target, sourceArtifactSha256 = null }) {`,
  );
  next = next.replace(
    '  const expected = new Map()\n  for (const entry of matrix) {',
    '  const expected = new Map()\n  const expectedOwnedPaths = new Set()\n  for (const entry of matrix) {',
  );
  next = next.replace(
    '    expected.set(id, entry)\n  }',
    '    expected.set(id, entry)\n    expectedOwnedPaths.add(tableOutputPath(entry))\n  }',
  );
  next = next.replace(
    '  for (const id of expected.keys()) if (!artifacts.has(id)) throw new Error(`Missing Guides table artifact: ${id}`)\n  for (const id of artifacts.keys()) if (!expected.has(id)) throw new Error(`Extra Guides table artifact: ${id}`)\n\n  const restored = []',
    '  for (const id of expected.keys()) if (!artifacts.has(id)) throw new Error(`Missing Guides table artifact: ${id}`)\n  for (const id of artifacts.keys()) if (!expected.has(id)) throw new Error(`Extra Guides table artifact: ${id}`)\n\n  for (const ownedPath of await staleOwnedPathsFromSnapshot(target, expectedOwnedPaths)) {\n    await fs.rm(path.join(target, ownedPath), { recursive: true, force: true })\n  }\n\n  const restored = []',
  );
  return next;
}

function applyCnRestoreGuidesTableArtifactsTestPatch(content) {
  if (content.includes('absent from the current matrix')) return content;
  return content.replace(
    "\ntest('rejects missing, extra, and duplicate table artifacts'",
    `
test('removes stale baseline table directories that are absent from the current matrix', async () => {
  const f = await artifactFixture()
  const target = path.join(f.root, 'target')
  await fs.mkdir(path.join(target, 'docs/tutorials/tools'), { recursive: true })
  await fs.writeFile(path.join(target, 'docs/tutorials/tools/stale.md'), 'stale')
  await fs.mkdir(path.join(target, 'docs/tutorials/architecture'), { recursive: true })
  await fs.writeFile(path.join(target, 'docs/tutorials/architecture/data-security.md'), 'old')
  await fs.mkdir(path.join(target, 'plugins/lark-docs/meta/snapshots'), { recursive: true })
  await fs.writeFile(path.join(target, 'plugins/lark-docs/meta/snapshots/guides-uat-last-success.json'), \`\${JSON.stringify({
    records: [
      { table_name: 'Tools', slug: 'page' },
      { table_name: 'Architecture', slug: 'data-security' },
    ],
  })}\\n\`)

  await restoreGuidesTableArtifacts({ matrix: [entry], artifactDirs: [f.artifact], target })

  assert.equal(await fs.readFile(path.join(target, 'docs/tutorials/tools/page.md'), 'utf8'), 'new')
  await assert.rejects(() => fs.access(path.join(target, 'docs/tutorials/architecture/data-security.md')))
})

test('rejects missing, extra, and duplicate table artifacts'`,
  );
}

function applyCnFinalizeCancelledDisabledTranslationPatch(content) {
  if (content.includes('downstreamDidNotRun')) return content;
  let next = content.replace(
    "    if (preparationResult !== 'skipped' || batchResult !== 'skipped' || publisherResult !== 'skipped' || batchCount !== 0) throw new Error('disabled publication requires skipped preparation, translation, and publisher results with zero batches')",
    "    const downstreamDidNotRun = result => result === 'skipped' || result === 'cancelled'\n    if (preparationResult !== 'skipped' || !downstreamDidNotRun(batchResult) || !downstreamDidNotRun(publisherResult) || batchCount !== 0) throw new Error('disabled publication requires skipped preparation and no completed translation or publisher jobs with zero batches')",
  );
  next = next.replace(
    "  ]) assert.throws(() => finalizeTranslationBatches(input), /disabled|skipped/i)",
    "  ]) assert.throws(() => finalizeTranslationBatches(input), /disabled|preparation|completed/i)",
  );
  next = next.replace(/\/disabled\|skipped\/i/g, '/disabled|preparation|completed/i');
  if (next.includes("test('reports publication disabled as skipped'") && !next.includes('reports disabled publication as skipped when downstream matrix jobs are cancelled')) {
    next = next.replace(
      "test('validates publisher status and status-dependent SHA invariants'",
      `test('reports disabled publication as skipped when downstream matrix jobs are cancelled', () => {
  assert.deepEqual(finalizeTranslationBatches(values({
    publish: false,
    preparationResult: 'skipped',
    batchCount: 0,
    batchResult: 'cancelled',
    publisherResult: 'skipped',
    publisherStatus: '',
    publisherCommitSha: '',
  })), {
    translatorStatus: 'skipped',
    publisherStatus: 'skipped',
    commitSha: '',
  })
})

test('validates publisher status and status-dependent SHA invariants'`,
    );
  }
  return next;
}

function applyCnCollectBuildCardNotesPatch(content) {
  if (content.includes('cnGuidesEmptyRefsNote')) return content;
  let next = content.replace(
    '\nconst GUIDES_REPORTS = Object.freeze([',
    `
function cnGuidesEmptyRefsNote() {
  const reportsDir = 'plugins/lark-docs/meta/reports'
  let files = []
  try {
    files = fs.readdirSync(reportsDir)
      .filter(file => /^cn-guides-ref-normalization(?:-.+)?\\.json$/.test(file))
      .map(file => path.posix.join(reportsDir, file))
      .sort()
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    return null
  }

  const skipped = new Map()
  const blockers = []
  const usedFiles = []
  for (const file of files) {
    const report = readJsonIfExists(file)
    if (!report || !Array.isArray(report.disabled)) continue
    usedFiles.push(file)
    for (const item of report.disabled) {
      if (item?.reason !== 'empty-target') continue
      const key = item.node_token || \`\${item.source_file || ''}:\${item.title || ''}:\${item.ref_target_token || ''}\`
      if (!skipped.has(key)) skipped.set(key, item)
    }
    if (Array.isArray(report.blockers)) blockers.push(...report.blockers)
  }
  if (skipped.size === 0) return null

  const examples = [...skipped.values()].slice(0, 8).map(item => {
    const title = item.title || item.node_token || '(untitled ref)'
    const target = item.target_title || item.ref_target_token || '(unknown target)'
    return \`- \${title} -> \${target}\`
  })
  return [
    '# CN Guides empty docs',
    '',
    \`- Skipped empty ref docs: \${skipped.size}\`,
    \`- Missing ref target blockers: \${blockers.length}\`,
    '',
    '## Examples',
    ...examples,
    skipped.size > examples.length ? \`- ...and \${skipped.size - examples.length} more skipped empty refs\` : null,
    '',
    '## Reports',
    ...reportFileLines(usedFiles.slice(0, 6)),
    usedFiles.length > 6 ? \`- ...and \${usedFiles.length - 6} more normalization report files\` : null,
  ].filter(Boolean).join('\\n')
}

const GUIDES_REPORTS = Object.freeze([`,
  );
  next = next.replace(
    "  { key: 'cache-generation', title: 'Guides cache persistence report', collect: cacheGenerationNote },",
    "  { key: 'cache-generation', title: 'Guides cache persistence report', collect: cacheGenerationNote },\n  { key: 'cn-empty-refs', title: 'CN Guides empty docs report', collect: cnGuidesEmptyRefsNote },",
  );
  return next.replace(
    '  canonicalLinkNote,\n',
    '  canonicalLinkNote,\n  cnGuidesEmptyRefsNote,\n',
  );
}

function removeScheduleBlock(content) {
  return content.replace(/\n\s+schedule:\n(?:\s+- cron: .*?\n)+/m, '\n');
}

function applyFetchDocsPatch(content) {
  let next = content;
  next = next.replace(/^name: .+$/m, 'name: fetch CN docs');
  next = removeScheduleBlock(next);
  next = next.replace(/default: true/g, 'default: false');
  next = applyDocsBrandPatch(next);
  return applyOssPatch(next);
}

function applyDocsBrandPatch(content) {
  let next = content;
  next = next.replace(/Global Docs Artifact-Only Build/g, 'CN Docs Artifact-Only Build');
  next = next.replace(/Global Docs Build/g, 'CN Docs Build');
  return next;
}

function applyCnWorkflowPatch(content) {
  return content.replace(/group: docs-production-dev/g, 'group: cn-docs-production-dev');
}

function applyPackageManagerPatch(content) {
  return content
    .replace(/cache: pnpm/g, 'cache: npm')
    .replace(/pnpm install --frozen-lockfile/g, 'npm ci');
}

function applyFetchContentGroupPatch(content) {
  if (content.includes('name: Restore preserved landing pages after generation')) return content;
  return content.replace(
    /(\n      - name: Fetch content group\n(?:        .+\n)+?          OSS_ACCESS_KEY_SECRET: \$\{\{ secrets\.OSS_ACCESS_KEY_SECRET \}\}\n)/,
    `$1
      - name: Restore preserved landing pages after generation
        if: \${{ env.GROUP != 'rest' }}
        run: node scripts/docs-workflow/prepare-content-group-workspace.js "$GROUP"
`,
  );
}

function applyRenderGuidesTableAssembledUpstreamPatch(content) {
  let next = content;
  if (!next.includes('name: Materialize locked upstream')) {
    next = next.replace(
      /(\n\s+- run: (?:npm ci|pnpm install --frozen-lockfile)\n)/,
      `$1      - name: Materialize locked upstream
        run: node scripts/upstream/materialize.js
      - name: Assemble locked upstream
        run: npm run assemble
      - name: Install assembled dependencies
        run: pnpm --dir .zdoc-assembled install --frozen-lockfile
`,
    );
  }
  next = next.replace(
    /--target "\$GITHUB_WORKSPACE"/g,
    '--target "$GITHUB_WORKSPACE/.zdoc-assembled"',
  );
  if (!next.includes('name: Normalize CN Guides source')) {
    next = next.replace(
      /(\n      - name: Render Guides table offline\n)/,
      `
      - name: Normalize CN Guides source
        run: |
          node -e 'const fs=require("fs");const entry=JSON.parse(process.env.ENTRY_JSON);fs.writeFileSync(process.argv[1], JSON.stringify({include:[entry]}) + "\\n")' "$RUNNER_TEMP/guides-table-matrix.json"
          node scripts/normalize-cn-guides-source.js --source-dir "$GITHUB_WORKSPACE/.zdoc-assembled/plugins/lark-docs/meta/sources/guides" --matrix-file "$RUNNER_TEMP/guides-table-matrix.json" --output "$GITHUB_WORKSPACE/.zdoc-assembled/plugins/lark-docs/meta/reports/cn-guides-ref-normalization-\${{ inputs.target_name }}-\${{ inputs.table_slug }}.json"
        env:
          ENTRY_JSON: \${{ toJSON(inputs) }}
$1`,
    );
  }
  next = next.replace(
    /node scripts\/docs-workflow\/render-guides-table\.js --workspace "\$GITHUB_WORKSPACE"/g,
    'node .zdoc-assembled/scripts/docs-workflow/render-guides-table.js --workspace "$GITHUB_WORKSPACE/.zdoc-assembled"',
  );
  next = next.replace(
    /node scripts\/docs-workflow\/guides-table-artifact\.js --operation create --workspace "\$GITHUB_WORKSPACE"/g,
    'node scripts/docs-workflow/guides-table-artifact.js --operation create --workspace "$GITHUB_WORKSPACE/.zdoc-assembled"',
  );
  return next;
}

function applyAssembleGuidesAssembledUpstreamPatch(content) {
  let next = content;
  if (!next.includes('name: Materialize locked upstream')) {
    next = next.replace(
      /(\n\s+- run: (?:npm ci|pnpm install --frozen-lockfile)\n)/,
      `$1      - name: Materialize locked upstream
        run: node scripts/upstream/materialize.js
      - name: Assemble locked upstream
        run: npm run assemble
      - name: Install assembled dependencies
        run: pnpm --dir .zdoc-assembled install --frozen-lockfile
`,
    );
  }
  next = next.replace(
    /--target "\$GITHUB_WORKSPACE"/g,
    '--target "$GITHUB_WORKSPACE/.zdoc-assembled"',
  );
  next = next.replace(
    /--repository-root "\$GITHUB_WORKSPACE"/g,
    '--repository-root "$GITHUB_WORKSPACE/.zdoc-assembled"',
  );
  if (!next.includes('name: Normalize CN Guides refs')) {
    next = next.replace(
      /(\n      - name: Restore validated Guides source\n        run: \|\n(?:          .+\n)+?          node scripts\/docs-workflow\/guides-stage-artifact\.js .+\n)/,
      `$1      - name: Normalize CN Guides refs
        run: |
          node -e 'require("fs").writeFileSync(process.argv[1], process.env.MATRIX_JSON)' "$RUNNER_TEMP/guides-table-matrix.json"
          node scripts/normalize-cn-guides-source.js --source-dir "$GITHUB_WORKSPACE/.zdoc-assembled/plugins/lark-docs/meta/sources/guides" --matrix-file "$RUNNER_TEMP/guides-table-matrix.json" --output "$GITHUB_WORKSPACE/.zdoc-assembled/plugins/lark-docs/meta/reports/cn-guides-ref-normalization.json"
        env:
          MATRIX_JSON: \${{ inputs.table_matrix }}
`,
    );
  }
  next = next.replace(
    /node scripts\/docs-workflow\/restore-guides-table-artifacts\.js/g,
    'node .zdoc-assembled/scripts/docs-workflow/restore-guides-table-artifacts.js',
  );
  next = next.replace(
    /node scripts\/docs-workflow\/guides-assembly-identity\.js/g,
    'node .zdoc-assembled/scripts/docs-workflow/guides-assembly-identity.js',
  );
  next = next.replace(
    /run: node scripts\/docs-workflow\/generate-guides-sidebars\.js --media-manifest plugins\/lark-docs\/meta\/media-cache\/guides\.json/g,
    'run: cd .zdoc-assembled && node scripts/docs-workflow/generate-guides-sidebars.js --media-manifest plugins/lark-docs/meta/media-cache/guides.json',
  );
  next = next.replace(
    /          node scripts\/validate-generated-sidebars\.js\n          node scripts\/run-doc-build-stage\.js --build "pnpm run build" --skipLinkChecks --skipCardReporting/g,
    '          cd .zdoc-assembled\n          node scripts/validate-generated-sidebars.js\n          node scripts/run-doc-build-stage.js --build "pnpm run build" --skipLinkChecks --skipCardReporting',
  );
  next = next.replace(
    /decision=plugins\/lark-docs\/meta\/reports\/guides-assembly-decision\.json\n          descriptor=plugins\/lark-docs\/meta\/assembly\/guides\.json\n          saas=config\/generated\/guides\.sidebar\.js\n          byoc=config\/generated\/guides-byoc\.sidebar\.js/g,
    'workspace="$GITHUB_WORKSPACE/.zdoc-assembled"\n          decision=plugins/lark-docs/meta/reports/guides-assembly-decision.json\n          descriptor=plugins/lark-docs/meta/assembly/guides.json\n          saas=config/generated/guides.sidebar.js\n          byoc=config/generated/guides-byoc.sidebar.js',
  );
  next = next.replace(
    /cmp -s "\$RUNNER_TEMP\/baseline\/\$saas" "\$saas"/g,
    'cmp -s "$RUNNER_TEMP/baseline/$saas" "$workspace/$saas"',
  );
  next = next.replace(
    /cmp -s "\$RUNNER_TEMP\/baseline\/\$byoc" "\$byoc"/g,
    'cmp -s "$RUNNER_TEMP/baseline/$byoc" "$workspace/$byoc"',
  );
  next = next.replace(
    /--saas-sidebar "\$saas" --byoc-sidebar "\$byoc" --output "\$descriptor"/g,
    '--saas-sidebar "$saas" --byoc-sidebar "$byoc" --output "$descriptor"',
  );
  next = next.replace(
    /mode=\$\(node -e 'const d=require\("\.\/"\+process\.argv\[1\]\);process\.stdout\.write\(d\.mode\)' "\$decision"\)/g,
    'mode=$(node -e \'const d=require(process.argv[1]);process.stdout.write(d.mode)\' "$GITHUB_WORKSPACE/.zdoc-assembled/$decision")',
  );
  next = next.replace(
    /node - "\$decision" "\$RUNNER_TEMP\/baseline" <<'NODE'/g,
    'node - "$GITHUB_WORKSPACE/.zdoc-assembled/$decision" "$RUNNER_TEMP/baseline" <<\'NODE\'',
  );
  next = next.replace(
    /candidate=plugins\/lark-docs\/meta\/reports\/guides-source-snapshot-candidate\.json\n          snapshot=plugins\/lark-docs\/meta\/snapshots\/guides-uat-last-success\.json/g,
    'cd .zdoc-assembled\n          candidate=plugins/lark-docs/meta/reports/guides-source-snapshot-candidate.json\n          snapshot=plugins/lark-docs/meta/snapshots/guides-uat-last-success.json',
  );
  next = next.replace(
    /mkdir -p plugins\/lark-docs\/meta\/source-cache\n          snapshot=plugins\/lark-docs\/meta\/snapshots\/guides-uat-last-success\.json/g,
    'cd .zdoc-assembled\n          mkdir -p plugins/lark-docs/meta/source-cache\n          snapshot=plugins/lark-docs/meta/snapshots/guides-uat-last-success.json',
  );
  next = next.replace(
    /snapshot=plugins\/lark-docs\/meta\/snapshots\/guides-uat-last-success\.json\n          generation=/g,
    'cd .zdoc-assembled\n          snapshot=plugins/lark-docs/meta/snapshots/guides-uat-last-success.json\n          generation=',
  );
  next = next.replace(
    /--workspace "\$GITHUB_WORKSPACE" --output tmp\/guides-source-cache-v4/g,
    '--workspace "$GITHUB_WORKSPACE/.zdoc-assembled" --output tmp/guides-source-cache-v4',
  );
  next = next.replace(
    /path: tmp\/guides-source-cache-v4/g,
    'path: .zdoc-assembled/tmp/guides-source-cache-v4',
  );
  next = next.replace(
    /node scripts\/docs-workflow\/guides-cache-generation-lifecycle\.js report \\/g,
    'node .zdoc-assembled/scripts/docs-workflow/guides-cache-generation-lifecycle.js report \\',
  );
  next = next.replace(
    /--output plugins\/lark-docs\/meta\/reports\/guides-cache-generation\.json/g,
    '--output .zdoc-assembled/plugins/lark-docs/meta/reports/guides-cache-generation.json',
  );
  next = next.replace(
    /node scripts\/docs-workflow\/create-checkpoint-artifact\.js --group guides --master-sha "\$\{\{ inputs\.master_sha \}\}" --dev-baseline-sha "\$\{\{ inputs\.dev_baseline_sha \}\}" --baseline-dir "\$RUNNER_TEMP\/baseline" --workspace "\$GITHUB_WORKSPACE"/g,
    'node .zdoc-assembled/scripts/docs-workflow/create-checkpoint-artifact.js --group guides --master-sha "${{ inputs.master_sha }}" --dev-baseline-sha "${{ inputs.dev_baseline_sha }}" --baseline-dir "$RUNNER_TEMP/baseline" --workspace "$GITHUB_WORKSPACE/.zdoc-assembled"',
  );
  next = next.replace(
    /path: plugins\/lark-docs\/meta\/reports\//g,
    'path: .zdoc-assembled/plugins/lark-docs/meta/reports/',
  );
  return next;
}

function applyTranslatePatch(content) {
  return content
    .replace(/ja-JP/g, 'zh-CN')
    .replace(/Japanese/g, 'Chinese')
    .replace(/japanese/g, 'chinese');
}

function applyCnTestFixturePatch(content) {
  return content.replace(/selectedManifest\(\{ locale: 'zh-CN' \}\)/g, "selectedManifest({ locale: 'en-US' })");
}

function applyGuidesRootTokenPatch(content, context) {
  if (!content.includes(UPSTREAM_GUIDES_ROOT_TOKEN)) return content;
  return content.split(UPSTREAM_GUIDES_ROOT_TOKEN).join(context.guidesRootToken);
}

function transform(relativePath, content, context = { guidesRootToken: UPSTREAM_GUIDES_ROOT_TOKEN }) {
  let next = content;
  if (relativePath === '.github/workflows/fetch-docs.yml') next = applyFetchDocsPatch(next);
  if (relativePath === '.github/workflows/_fetch-content-group.yml') next = applyFetchContentGroupPatch(applyOssPatch(next));
  if (relativePath === '.github/workflows/_fetch-guides-sources.yml') next = applyCnGuidesFetchThrottlePatch(applyOssPatch(next));
  if (relativePath === '.github/workflows/_render-guides-table.yml') next = applyRenderGuidesTableAssembledUpstreamPatch(next);
  if (relativePath === '.github/workflows/_assemble-guides.yml') next = applyAssembleGuidesAssembledUpstreamPatch(next);
  if (relativePath === 'scripts/collect-build-card-notes.js') next = applyCnCollectBuildCardNotesPatch(next);
  if (relativePath === 'scripts/docs-workflow/guides-tables.js') next = applyCnGuidesTableSlugPatch(next);
  if (relativePath === 'scripts/docs-workflow/render-guides-table.js') next = applyCnRenderGuidesTableSlugNormalizationPatch(next);
  if (relativePath === 'scripts/docs-workflow/render-guides-table.test.js') next = applyCnRenderGuidesTableSlugNormalizationTestPatch(next);
  if (relativePath === 'scripts/docs-workflow/restore-guides-table-artifacts.js') next = applyCnRestoreGuidesTableArtifactsPatch(next);
  if (relativePath === 'scripts/docs-workflow/restore-guides-table-artifacts.test.js') next = applyCnRestoreGuidesTableArtifactsTestPatch(next);
  if (relativePath === 'scripts/docs-workflow/finalize-translation-batches.js' || relativePath === 'scripts/docs-workflow/finalize-translation-batches.test.js') next = applyCnFinalizeCancelledDisabledTranslationPatch(next);
  if (relativePath.startsWith('.github/workflows/') || relativePath.startsWith('scripts/docs-workflow/')) {
    next = applyTranslatePatch(next);
    next = applyDocsBrandPatch(next);
  }
  if (relativePath.startsWith('scripts/docs-workflow/') && relativePath.endsWith('.test.js')) {
    next = applyCnTestFixturePatch(next);
  }
  if (relativePath.startsWith('.github/workflows/')) {
    next = applyCnWorkflowPatch(next);
    next = applyPackageManagerPatch(next);
    next = applyGuidesRootTokenPatch(next, context);
  }
  return next;
}

function syncInto(root, upstream, contextRoot = root) {
  const context = { guidesRootToken: readGuidesRootToken(contextRoot) };
  for (const relativePath of COPIED_PATHS) {
    const source = path.join(upstream, relativePath);
    const target = path.join(root, relativePath);
    if (!fs.existsSync(source)) throw new Error(`Missing upstream sync source: ${relativePath}`);

    const stat = fs.statSync(source);
    if (stat.isDirectory()) {
      fs.rmSync(target, { recursive: true, force: true });
      for (const child of listFiles(source)) {
        const childSource = path.join(source, child);
        const childRelativePath = path.posix.join(relativePath, child);
        const content = transform(childRelativePath, fs.readFileSync(childSource, 'utf8'), context);
        writeText(root, childRelativePath, content);
        const childStat = fs.statSync(childSource);
        if (childStat.mode & 0o111) fs.chmodSync(path.join(root, childRelativePath), childStat.mode);
      }
      continue;
    }

    const content = transform(relativePath, fs.readFileSync(source, 'utf8'), context);
    writeText(root, relativePath, content);
    if (stat.mode & 0o111) fs.chmodSync(target, stat.mode);
  }
}

function diffDirectories(expected, actual) {
  const result = spawnSync('git', ['diff', '--no-index', '--', expected, actual], {
    encoding: 'utf8',
  });
  if (result.status === 0) return '';
  if (result.status === 1) return `${result.stdout}${result.stderr}`;
  throw new Error(result.stderr || result.stdout || 'git diff --no-index failed');
}

function check(root, upstream) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'zdoc-cn-workflow-sync-'));
  try {
    syncInto(tempRoot, upstream, root);
    const drift = [];
    for (const relativePath of COPIED_PATHS) {
      const expected = path.join(tempRoot, relativePath);
      const actual = path.join(root, relativePath);
      if (!fs.existsSync(actual)) {
        drift.push(`${relativePath}: missing`);
        continue;
      }
      const diff = diffDirectories(expected, actual);
      if (diff) drift.push(`${relativePath}:\n${diff}`);
    }
    return drift;
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(options.upstream)) throw new Error(`Upstream repo not found: ${options.upstream}`);

  if (options.mode === 'write') {
    syncInto(options.root, options.upstream);
    return;
  }

  const drift = check(options.root, options.upstream);
  if (drift.length > 0) {
    console.error(`Workflow sync drift detected. Run: npm run upstream:sync-workflows\n\n${drift.join('\n')}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  COPIED_PATHS,
  applyCnWorkflowPatch,
  applyCnTestFixturePatch,
  applyFetchDocsPatch,
  applyOssPatch,
  applyPackageManagerPatch,
  applyTranslatePatch,
  listFiles,
  parseArgs,
  syncInto,
  transform,
};
