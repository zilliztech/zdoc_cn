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

  writeFile(upstream, '.github/workflows/_assemble-guides.yml', 'name: assemble guides\n');
  writeFile(upstream, '.github/workflows/_monitor-docs-progress.yml', 'name: monitor docs progress\n');
  writeFile(upstream, '.github/workflows/_prepare-translation-batches.yml', 'name: prepare translation batches\n');
  writeFile(upstream, '.github/workflows/_publish-content-group.yml', 'name: publish content group\n');
  writeFile(upstream, '.github/workflows/_publish-translation-batches.yml', 'name: publish translation batches\n');
  writeFile(upstream, '.github/workflows/_render-guides-table.yml', 'name: render guides table\n');
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

    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/example.js'), "module.exports = 'i18n/zh-CN Chinese';\n");
    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/monitor-docs-progress.js'), "module.exports = 'CN Docs Build / CN Docs Artifact-Only Build';\n");
    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/example.test.js'), "assert.throws(() => createBatchInput(selectedManifest({ locale: 'en-US' })), /zh-CN|locale/i)\n");
    const guidesTables = readFile(fixture.root, 'scripts/docs-workflow/guides-tables.js');
    assert.match(guidesTables, /loadCnGuidesTableSlugOverrides/);
    assert.match(guidesTables, /config', 'guides-table-slugs\.json'/);
    assert.match(guidesTables, /TABLE_SLUG_OVERRIDES\[tableId\]/);
    assert.equal(readFile(fixture.root, 'scripts/collect-build-card-notes.js'), "console.log('card notes');\n");
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

test('package scripts expose workflow sync commands', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json'), 'utf8'));
  assert.equal(packageJson.scripts['upstream:sync-workflows'], 'node scripts/upstream/sync-workflows.js --write');
  assert.equal(packageJson.scripts['upstream:check-workflows'], 'node scripts/upstream/sync-workflows.js --check');
});
