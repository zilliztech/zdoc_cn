const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { spawnSync } = require('node:child_process');

const SCRIPT = path.resolve(__dirname, 'sync-workflows.js');

function writeFile(root, relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function readFile(root, relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function makeFixture() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sync-workflows-'));
  const upstream = path.join(directory, 'zdoc');
  const root = path.join(directory, 'zdoc_cn');

  writeFile(upstream, '.github/workflows/fetch-docs.yml', `name: fetch lark docs
on:
  schedule:
    - cron: '0 2,10,18 * * *'
  workflow_dispatch:
    inputs:
      publish:
        type: boolean
        default: true
permissions:
  contents: write
concurrency:
  group: docs-production-dev
jobs:
  prepare:
    steps:
      - run: echo Global Docs Build
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: pnpm }
      - run: pnpm install --frozen-lockfile
  produce_python:
    needs: prepare
  produce_java:
    needs: prepare
  produce_node:
    needs: prepare
  produce_go:
    needs: prepare
  produce_cli:
    needs: prepare
  produce_rest:
    needs: prepare
`);

  writeFile(upstream, '.github/workflows/_fetch-content-group.yml', `name: fetch content group
on:
  workflow_call:
    secrets:
      AWS_ACCESS_KEY_ID:
        required: true
      AWS_SECRET_ACCESS_KEY:
        required: true
jobs:
  fetch:
    steps:
      - name: Fetch content group
        run: bash scripts/update-sdk-reference-snapshots.sh "$GROUP"
        env:
          AWS_BUCKET: \${{ vars.AWS_BUCKET }}
          AWS_REGION: \${{ vars.AWS_REGION }}
          IMAGE_BED_URL: \${{ vars.IMAGE_BED_URL }}
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
`);

  writeFile(upstream, '.github/workflows/_fetch-guides-sources.yml', `name: fetch guides sources
on:
  workflow_call:
    secrets:
      AWS_ACCESS_KEY_ID: { required: true }
      AWS_SECRET_ACCESS_KEY: { required: true }
jobs:
  sources:
    steps:
      - name: Fetch shared guides sources
        run: node scripts/docs-workflow/run-content-group.js --group guides --stage source
        env:
          FEISHU_HOST: \${{ vars.FEISHU_HOST }}
      - run: node scripts/docs-workflow/guides-source-cache.js create --root-token Tg6mwbRGDitPQ3kLUQzc44I7nth
      - run: node scripts/docs-workflow/guides-media-prefetch.js
        env:
          AWS_BUCKET: \${{ vars.AWS_BUCKET }}
          AWS_REGION: \${{ vars.AWS_REGION }}
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
`);

  writeFile(upstream, '.github/workflows/_assemble-guides.yml', `name: assemble guides
jobs:
  assemble:
    steps:
      - uses: actions/checkout@v4
        with: { ref: '\${{ inputs.master_sha }}', fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - name: Restore validated Guides source
        run: |
          tar -xf "$RUNNER_TEMP/source-download/guides-source.tar" -C "$RUNNER_TEMP/source-download"
          node scripts/docs-workflow/guides-stage-artifact.js --operation restore --target "$GITHUB_WORKSPACE"
      - name: Restore validated Guides table artifacts
        run: node scripts/docs-workflow/restore-guides-table-artifacts.js --target "$GITHUB_WORKSPACE"
      - id: assembly_decision
        name: Validate Guides assembly decision
        run: |
          decision=plugins/lark-docs/meta/reports/guides-assembly-decision.json
          node scripts/docs-workflow/guides-assembly-identity.js validate-decision --repository-root "$GITHUB_WORKSPACE" --input "$decision"
          observed_sha=$(node scripts/docs-workflow/guides-assembly-identity.js decision-sha --repository-root "$GITHUB_WORKSPACE" --input "$decision")
          mode=$(node -e 'const d=require("./"+process.argv[1]);process.stdout.write(d.mode)' "$decision")
          if [[ "$mode" == reuse ]]; then
            node scripts/docs-workflow/guides-assembly-identity.js verify-descriptor --repository-root "$RUNNER_TEMP/baseline"
            node - "$decision" "$RUNNER_TEMP/baseline" <<'NODE'
          console.log(process.argv[2])
          NODE
          fi
      - name: Generate combined Guides sidebars offline
        run: node scripts/docs-workflow/generate-guides-sidebars.js --media-manifest plugins/lark-docs/meta/media-cache/guides.json
      - name: Validate combined guides output
        run: |
          node scripts/validate-generated-sidebars.js
          node scripts/run-doc-build-stage.js --build "pnpm run build" --skipLinkChecks --skipCardReporting
      - name: Finalize Guides assembly identity
        run: |
          decision=plugins/lark-docs/meta/reports/guides-assembly-decision.json
          descriptor=plugins/lark-docs/meta/assembly/guides.json
          saas=config/generated/guides.sidebar.js
          byoc=config/generated/guides-byoc.sidebar.js
          cmp -s "$RUNNER_TEMP/baseline/$saas" "$saas"
          cmp -s "$RUNNER_TEMP/baseline/$byoc" "$byoc"
          node scripts/docs-workflow/guides-assembly-identity.js write-descriptor --repository-root "$GITHUB_WORKSPACE" --decision "$decision" --saas-sidebar "$saas" --byoc-sidebar "$byoc" --output "$descriptor"
          node scripts/docs-workflow/guides-assembly-identity.js verify-descriptor --repository-root "$GITHUB_WORKSPACE" --descriptor "$descriptor" --saas-sidebar "$saas" --byoc-sidebar "$byoc"
          node scripts/docs-workflow/guides-assembly-identity.js write-result --repository-root "$GITHUB_WORKSPACE" --decision "$decision"
      - id: promoted_snapshot
        name: Select promoted Guides source snapshot
        run: |
          candidate=plugins/lark-docs/meta/reports/guides-source-snapshot-candidate.json
          snapshot=plugins/lark-docs/meta/snapshots/guides-uat-last-success.json
      - id: promoted_source_manifest
        name: Prepare promoted Guides source manifest
        run: |
          mkdir -p plugins/lark-docs/meta/source-cache
          snapshot=plugins/lark-docs/meta/snapshots/guides-uat-last-success.json
      - id: guides_v4_generation
        name: Create Guides v4 generation payload
        run: |
          snapshot=plugins/lark-docs/meta/snapshots/guides-uat-last-success.json
          generation={}
          node scripts/docs-workflow/guides-source-cache-generation.js create --workspace "$GITHUB_WORKSPACE" --output tmp/guides-source-cache-v4
      - id: save_guides_v4_generation
        uses: actions/cache/save@v4
        with:
          path: tmp/guides-source-cache-v4
      - name: Record Guides cache generation persistence
        run: |
          node scripts/docs-workflow/guides-cache-generation-lifecycle.js report \\
            --output plugins/lark-docs/meta/reports/guides-cache-generation.json
      - name: Create combined guides checkpoint
        run: node scripts/docs-workflow/create-checkpoint-artifact.js --group guides --master-sha "\${{ inputs.master_sha }}" --dev-baseline-sha "\${{ inputs.dev_baseline_sha }}" --baseline-dir "$RUNNER_TEMP/baseline" --workspace "$GITHUB_WORKSPACE"
      - name: Upload guides reports
        with:
          path: plugins/lark-docs/meta/reports/
`);
  writeFile(upstream, '.github/workflows/_monitor-docs-progress.yml', 'name: monitor docs progress\n');
  writeFile(upstream, '.github/workflows/_prepare-translation-batches.yml', 'name: prepare translation batches\n');
  writeFile(upstream, '.github/workflows/_publish-content-group.yml', 'name: publish content group\n');
  writeFile(upstream, '.github/workflows/_publish-translation-batches.yml', 'name: publish translation batches\n');
  writeFile(upstream, '.github/workflows/_render-guides-table.yml', `name: render guides table
jobs:
  render:
    steps:
      - uses: actions/checkout@v4
        with: { ref: '\${{ inputs.master_sha }}', fetch-depth: 0 }
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - name: Restore validated shared sources
        run: node scripts/docs-workflow/guides-stage-artifact.js --operation restore --target "$GITHUB_WORKSPACE"
      - name: Render Guides table offline
        run: node scripts/docs-workflow/render-guides-table.js --workspace "$GITHUB_WORKSPACE" --entry "$ENTRY_JSON"
      - name: Create table artifact
        run: node scripts/docs-workflow/guides-table-artifact.js --operation create --workspace "$GITHUB_WORKSPACE"
`);
  writeFile(upstream, '.github/workflows/_translate-content-group.yml', 'name: translate ja-JP content group\n');
  writeFile(upstream, '.github/workflows/_translate-publish-batch.yml', 'name: translate publish Japanese batch\n');
  writeFile(upstream, '.github/workflows/_verify-docs.yml', 'name: verify docs\n');
  writeFile(upstream, '.github/workflows/translate-codex.yml', `name: translate codex ja-JP
concurrency:
  group: docs-production-dev
  cancel-in-progress: false
`);
  writeFile(upstream, 'scripts/collect-build-card-notes.js', "console.log('card notes');\n");
  writeFile(upstream, 'scripts/docs-workflow/monitor-docs-progress.js', "module.exports = 'Global Docs Build / Global Docs Artifact-Only Build';\n");
  writeFile(upstream, 'scripts/docs-workflow/example.js', "module.exports = 'i18n/ja-JP Japanese';\n");
  writeFile(upstream, 'scripts/docs-workflow/example.test.js', "assert.throws(() => createBatchInput(selectedManifest({ locale: 'zh-CN' })), /ja-JP|locale/i)\n");
  writeFile(upstream, 'scripts/docs-workflow/guides-tables.js', `const fs = require('node:fs')
const slugify = require('slugify')
const TARGETS = ['zilliz.paas', 'zilliz.saas']
module.exports = {
  entry(tableId, tableName) {
    return {
      table_slug: slugify(tableName, { lower: true, strict: true }),
    }
  }
}
`);
  writeFile(upstream, 'scripts/docs-workflow/render-guides-table.js', `const fs = require('node:fs')
const path = require('node:path')

function tableOutputPath(entry) {
  return \`docs/tutorials/\${entry.table_slug}\`
}

function renderGuidesTable(options) {
  const { workspace, spawnSync } = options
  const outputPath = tableOutputPath(options)
  const absoluteOutput = path.join(workspace, outputPath)
  fs.rmSync(absoluteOutput, { recursive: true, force: true })
  if (options.cleanup) return { outputPath, cleanup: true }
  const result = spawnSync('npx', [], { cwd: workspace })
  if (result.status !== 0) throw new Error(\`Guides table render failed with status \${result.status}\`)
  return { outputPath, cleanup: false }
}
`);
  writeFile(upstream, 'scripts/docs-workflow/render-guides-table.test.js', `const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const test = require('node:test')
const { renderGuidesTable } = require('./render-guides-table')

test('cleanup render removes the owned directory without invoking Docusaurus', () => {
  assert.equal(typeof renderGuidesTable, 'function')
})
`);
  writeFile(upstream, 'scripts/docs-workflow/restore-guides-table-artifacts.js', `const fs = require('node:fs/promises')
const path = require('node:path')
const { artifactId, validateGuidesTableArtifact } = require('./guides-table-artifact')

async function restoreGuidesTableArtifacts({ matrix, artifactDirs, target, sourceArtifactSha256 = null }) {
  if (!Array.isArray(matrix) || !Array.isArray(artifactDirs)) throw new Error('matrix and artifactDirs must be arrays')
  const expected = new Map()
  for (const entry of matrix) {
    const id = artifactId(entry)
    if (expected.has(id)) throw new Error(\`Duplicate Guides table matrix entry: \${id}\`)
    expected.set(id, entry)
  }
  const artifacts = new Map()
  for (const directory of artifactDirs) {
    const manifest = await validateGuidesTableArtifact(directory)
    if (sourceArtifactSha256 && manifest.sourceArtifactSha256 !== sourceArtifactSha256) throw new Error(\`Guides table source artifact mismatch: \${manifest.id}\`)
    if (artifacts.has(manifest.id)) throw new Error(\`Duplicate Guides table artifact: \${manifest.id}\`)
    artifacts.set(manifest.id, { directory, manifest })
  }
  for (const id of expected.keys()) if (!artifacts.has(id)) throw new Error(\`Missing Guides table artifact: \${id}\`)
  for (const id of artifacts.keys()) if (!expected.has(id)) throw new Error(\`Extra Guides table artifact: \${id}\`)

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

module.exports = { restoreGuidesTableArtifacts }
`);
  writeFile(upstream, 'scripts/docs-workflow/restore-guides-table-artifacts.test.js', `test('restores exactly one artifact for every matrix entry', async () => {})
test('rejects missing, extra, and duplicate table artifacts', async () => {})
`);
  writeFile(upstream, 'scripts/docs-workflow/finalize-translation-batches.js', `function finalizeTranslationBatches(options) {
  const preparationResult = options.preparationResult
  const batchResult = options.batchResult
  const publisherResult = options.publisherResult
  const batchCount = options.batchCount
  if (!options.publish) {
    if (preparationResult !== 'skipped' || batchResult !== 'skipped' || publisherResult !== 'skipped' || batchCount !== 0) throw new Error('disabled publication requires skipped preparation, translation, and publisher results with zero batches')
  }
}
module.exports = { finalizeTranslationBatches }
`);
  writeFile(upstream, 'scripts/docs-workflow/finalize-translation-batches.test.js', `test('reports publication disabled as skipped', () => {})
test('disabled publication requires every downstream result to be skipped', () => {
  for (const input of []) assert.throws(() => finalizeTranslationBatches(input), /disabled|skipped/i)
})
test('validates publisher status and status-dependent SHA invariants', () => {})
`);
  writeFile(upstream, 'scripts/restore-generated-state.sh', '#!/usr/bin/env bash\nset -euo pipefail\necho restored\n');
  fs.chmodSync(path.join(upstream, 'scripts/restore-generated-state.sh'), 0o755);
  writeFile(upstream, 'scripts/update-sdk-reference-snapshots.sh', '#!/usr/bin/env bash\n');
  writeFile(upstream, 'scripts/update-lark-doc-snapshot.js', "console.log('snapshot');\n");

  fs.mkdirSync(root, { recursive: true });
  writeFile(root, 'config/lark-docs.config.ts', `
const guides: Manual = {
    root: 'cn-guides-root-token',
}
`);
  return { directory, upstream, root };
}

function runSync(args, fixture) {
  return spawnSync(process.execPath, [
    SCRIPT,
    '--upstream',
    fixture.upstream,
    '--root',
    fixture.root,
    ...args,
  ], {
    cwd: fixture.root,
    encoding: 'utf8',
  });
}

test('write mode copies upstream workflows and applies CN mutations', () => {
  const fixture = makeFixture();
  try {
    const result = runSync(['--write'], fixture);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const fetchDocs = readFile(fixture.root, '.github/workflows/fetch-docs.yml');
    assert.match(fetchDocs, /^name: fetch CN docs$/m);
    assert.match(fetchDocs, /CN Docs Build/);
    assert.match(fetchDocs, /default: false/);
    assert.doesNotMatch(fetchDocs, /^\s+schedule:/m);
    assert.match(fetchDocs, /produce_python:\n    needs: prepare/);
    assert.match(fetchDocs, /produce_rest:\n    needs: prepare/);
    assert.doesNotMatch(fetchDocs, /produce_java:\n    needs: \[prepare, produce_python\]/);
    assert.match(fetchDocs, /cache: npm/);
    assert.match(fetchDocs, /npm ci/);
    assert.doesNotMatch(fetchDocs, /cache: pnpm/);
    assert.doesNotMatch(fetchDocs, /pnpm install --frozen-lockfile/);

    const translateCodex = readFile(fixture.root, '.github/workflows/translate-codex.yml');
    assert.match(translateCodex, /translate codex zh-CN/);
    assert.match(translateCodex, /group: cn-docs-production-dev/);
    assert.doesNotMatch(translateCodex, /^  group: docs-production-dev$/m);

    const contentGroup = readFile(fixture.root, '.github/workflows/_fetch-content-group.yml');
    assert.match(contentGroup, /OSS_ACCESS_KEY_ID/);
    assert.match(contentGroup, /OSS_ACCESS_KEY_SECRET/);
    assert.match(contentGroup, /OSS_BUCKET/);
    assert.match(contentGroup, /OSS_REGION/);
    assert.match(contentGroup, /OSS_ENDPOINT/);
    assert.match(contentGroup, /name: Restore preserved landing pages after generation/);
    assert.match(contentGroup, /if: \$\{\{ env\.GROUP != 'rest' \}\}/);
    assert.doesNotMatch(contentGroup, /AWS_ACCESS_KEY_ID/);
    assert.doesNotMatch(contentGroup, /AWS_SECRET_ACCESS_KEY/);

    const guidesSources = readFile(fixture.root, '.github/workflows/_fetch-guides-sources.yml');
    assert.match(guidesSources, /--root-token cn-guides-root-token/);
    assert.doesNotMatch(guidesSources, /Tg6mwbRGDitPQ3kLUQzc44I7nth/);
    assert.match(guidesSources, /FEISHU_MAX_CONCURRENT: '1'/);
    assert.match(guidesSources, /FEISHU_MIN_TIME_MS: '1500'/);
    assert.match(guidesSources, /FEISHU_WIKI_NODE_MIN_TIME_MS: '1500'/);
    assert.match(guidesSources, /FEISHU_RETRY_ATTEMPTS: '9'/);
    assert.match(guidesSources, /FEISHU_RETRY_DELAY_MS: '5000'/);
    assert.match(guidesSources, /FEISHU_RATE_LIMIT_FALLBACK_MS: '120000'/);

    const renderGuidesTable = readFile(fixture.root, '.github/workflows/_render-guides-table.yml');
    assert.match(renderGuidesTable, /name: Materialize locked upstream/);
    assert.match(renderGuidesTable, /node scripts\/upstream\/materialize\.js/);
    assert.match(renderGuidesTable, /name: Assemble locked upstream/);
    assert.match(renderGuidesTable, /npm run assemble/);
    assert.match(renderGuidesTable, /name: Install assembled dependencies/);
    assert.match(renderGuidesTable, /pnpm --dir \.zdoc-assembled install --frozen-lockfile/);
    assert.match(renderGuidesTable, /--target "\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);
    assert.match(renderGuidesTable, /name: Normalize CN Guides source/);
    assert.match(renderGuidesTable, /--matrix-file "\$RUNNER_TEMP\/guides-table-matrix\.json"/);
    assert.match(renderGuidesTable, /ENTRY_JSON: \$\{\{ toJSON\(inputs\) \}\}/);
    assert.match(renderGuidesTable, /node \.zdoc-assembled\/scripts\/docs-workflow\/render-guides-table\.js --workspace "\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);
    assert.match(renderGuidesTable, /--workspace "\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);

    const assembleGuides = readFile(fixture.root, '.github/workflows/_assemble-guides.yml');
    assert.match(assembleGuides, /name: Materialize locked upstream/);
    assert.match(assembleGuides, /node scripts\/upstream\/materialize\.js/);
    assert.match(assembleGuides, /name: Assemble locked upstream/);
    assert.match(assembleGuides, /npm run assemble/);
    assert.match(assembleGuides, /name: Install assembled dependencies/);
    assert.match(assembleGuides, /pnpm --dir \.zdoc-assembled install --frozen-lockfile/);
    assert.match(assembleGuides, /--target "\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);
    assert.match(assembleGuides, /name: Normalize CN Guides refs/);
    assert.match(assembleGuides, /MATRIX_JSON: \$\{\{ inputs\.table_matrix \}\}/);
    assert.match(assembleGuides, /node scripts\/normalize-cn-guides-source\.js --source-dir "\$GITHUB_WORKSPACE\/\.zdoc-assembled\/plugins\/lark-docs\/meta\/sources\/guides"/);
    assert.match(assembleGuides, /--matrix-file "\$RUNNER_TEMP\/guides-table-matrix\.json"/);
    assert.match(assembleGuides, /cn-guides-ref-normalization\.json/);
    assert.match(assembleGuides, /node \.zdoc-assembled\/scripts\/docs-workflow\/restore-guides-table-artifacts\.js/);
    assert.match(assembleGuides, /--repository-root "\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);
    assert.match(assembleGuides, /"\$GITHUB_WORKSPACE\/\.zdoc-assembled\/\$decision"/);
    assert.match(assembleGuides, /cd \.zdoc-assembled && node scripts\/docs-workflow\/generate-guides-sidebars\.js/);
    assert.match(assembleGuides, /cd \.zdoc-assembled\n\s+node scripts\/validate-generated-sidebars\.js/);
    assert.match(assembleGuides, /workspace="\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);
    assert.match(assembleGuides, /--workspace "\$GITHUB_WORKSPACE\/\.zdoc-assembled"/);
    assert.match(assembleGuides, /path: \.zdoc-assembled\/tmp\/guides-source-cache-v4/);
    assert.match(assembleGuides, /path: \.zdoc-assembled\/plugins\/lark-docs\/meta\/reports\//);

    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/example.js'), "module.exports = 'i18n/zh-CN Chinese';\n");
    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/monitor-docs-progress.js'), "module.exports = 'CN Docs Build / CN Docs Artifact-Only Build';\n");
    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/example.test.js'), "assert.throws(() => createBatchInput(selectedManifest({ locale: 'en-US' })), /zh-CN|locale/i)\n");
    const guidesTables = readFile(fixture.root, 'scripts/docs-workflow/guides-tables.js');
    assert.match(guidesTables, /loadCnGuidesTableSlugOverrides/);
    assert.match(guidesTables, /config', 'guides-table-slugs\.json'/);
    assert.match(guidesTables, /TABLE_SLUG_OVERRIDES\[tableId\]/);
    assert.match(guidesTables, /function strictSlug\(value\)/);
    assert.doesNotMatch(guidesTables, /require\('slugify'\)/);
    const renderGuidesTableScript = readFile(fixture.root, 'scripts/docs-workflow/render-guides-table.js');
    assert.match(renderGuidesTableScript, /normalizeRenderedTableOutput/);
    assert.match(renderGuidesTableScript, /const beforeChildren = snapshotChildren\(path\.dirname\(absoluteOutput\)\)/);
    assert.match(renderGuidesTableScript, /normalizeRenderedTableOutput\(workspace, outputPath, beforeChildren\)/);
    const renderGuidesTableTest = readFile(fixture.root, 'scripts/docs-workflow/render-guides-table.test.js');
    assert.match(renderGuidesTableTest, /localized renderer output/);
    assert.match(renderGuidesTableTest, /table_slug: 'ai-models'/);
    assert.match(renderGuidesTableTest, /localized table slug is empty/);
    assert.match(renderGuidesTableTest, /table_slug: 'client-libraries'/);
    const restoreGuidesTableArtifacts = readFile(fixture.root, 'scripts/docs-workflow/restore-guides-table-artifacts.js');
    assert.match(restoreGuidesTableArtifacts, /staleOwnedPathsFromSnapshot/);
    assert.match(restoreGuidesTableArtifacts, /expectedOwnedPaths\.add\(tableOutputPath\(entry\)\)/);
    const restoreGuidesTableArtifactsTest = readFile(fixture.root, 'scripts/docs-workflow/restore-guides-table-artifacts.test.js');
    assert.match(restoreGuidesTableArtifactsTest, /absent from the current matrix/);
    assert.match(restoreGuidesTableArtifactsTest, /architecture/);
    const finalizeTranslation = readFile(fixture.root, 'scripts/docs-workflow/finalize-translation-batches.js');
    assert.match(finalizeTranslation, /downstreamDidNotRun/);
    assert.match(finalizeTranslation, /result === 'skipped' \|\| result === 'cancelled'/);
    const finalizeTranslationTest = readFile(fixture.root, 'scripts/docs-workflow/finalize-translation-batches.test.js');
    assert.match(finalizeTranslationTest, /downstream matrix jobs are cancelled/);
    assert.match(finalizeTranslationTest, /disabled\|preparation\|completed/);
    assert.equal(readFile(fixture.root, 'scripts/collect-build-card-notes.js'), "console.log('card notes');\n");
    assert.equal(readFile(fixture.root, 'scripts/restore-generated-state.sh'), '#!/usr/bin/env bash\nset -euo pipefail\necho restored\n');
    assert.equal(
      fs.statSync(path.join(fixture.root, 'scripts/restore-generated-state.sh')).mode & 0o777,
      fs.statSync(path.join(fixture.upstream, 'scripts/restore-generated-state.sh')).mode & 0o777,
    );
    assert.equal(readFile(fixture.root, 'scripts/update-lark-doc-snapshot.js'), "console.log('snapshot');\n");
  } finally {
    fs.rmSync(fixture.directory, { recursive: true, force: true });
  }
});

test('check mode fails when committed generated files drift', () => {
  const fixture = makeFixture();
  try {
    assert.equal(runSync(['--write'], fixture).status, 0);
    writeFile(fixture.root, '.github/workflows/fetch-docs.yml', 'name: hand edited\n');

    const result = runSync(['--check'], fixture);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Workflow sync drift detected/);
    assert.match(result.stderr, /\.github\/workflows\/fetch-docs\.yml/);
  } finally {
    fs.rmSync(fixture.directory, { recursive: true, force: true });
  }
});

test('check mode reports drift in the generated-state restore helper', () => {
  const fixture = makeFixture();
  try {
    assert.equal(runSync(['--write'], fixture).status, 0);
    writeFile(fixture.root, 'scripts/restore-generated-state.sh', '#!/usr/bin/env bash\necho hand-edited\n');

    const result = runSync(['--check'], fixture);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Workflow sync drift detected/);
    assert.match(result.stderr, /scripts\/restore-generated-state\.sh/);
  } finally {
    fs.rmSync(fixture.directory, { recursive: true, force: true });
  }
});

test('write mode repairs executable-bit drift on non-executable synchronized files', () => {
  const fixture = makeFixture();
  try {
    assert.equal(runSync(['--write'], fixture).status, 0);
    const relativePath = 'scripts/collect-build-card-notes.js';
    const source = path.join(fixture.upstream, relativePath);
    const target = path.join(fixture.root, relativePath);
    const sourceMode = fs.statSync(source).mode & 0o777;
    assert.equal(sourceMode & 0o111, 0);

    fs.chmodSync(target, sourceMode | 0o111);
    assert.notEqual(runSync(['--check'], fixture).status, 0);

    const repaired = runSync(['--write'], fixture);
    assert.equal(repaired.status, 0, repaired.stderr || repaired.stdout);
    assert.equal(fs.statSync(target).mode & 0o777, sourceMode);

    const checked = runSync(['--check'], fixture);
    assert.equal(checked.status, 0, checked.stderr || checked.stdout);
  } finally {
    fs.rmSync(fixture.directory, { recursive: true, force: true });
  }
});

test('package scripts expose workflow sync commands', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json'), 'utf8'));
  assert.equal(packageJson.scripts['upstream:sync-workflows'], 'node scripts/upstream/sync-workflows.js --write');
  assert.equal(packageJson.scripts['upstream:check-workflows'], 'node scripts/upstream/sync-workflows.js --check');
});
