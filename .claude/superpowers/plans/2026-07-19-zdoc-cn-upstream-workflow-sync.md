# zdoc_cn Upstream Workflow Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `zdoc_cn` GitHub Actions and docs-workflow helpers sync from upstream `zdoc` with a small, explicit, test-covered CN patch layer.

**Architecture:** GitHub Actions workflow files remain committed in `zdoc_cn` because GitHub needs local workflow entrypoints, but they become generated artifacts instead of hand-maintained forks. A sync script copies selected upstream workflow/helper files from `../zdoc` or `.zdoc-upstream/worktree`, applies deterministic CN transformations, and a drift test fails when committed files differ from regenerated output. CN-only behavior is limited to Ali OSS variables, CN workflow/card naming, migration dispatch defaults, and Chinese translation locale/path policy.

**Tech Stack:** Node.js CommonJS scripts, `node:test`, GitHub Actions YAML, upstream `scripts/docs-workflow/**`, existing overlay lock/materialization tooling, pnpm/npm workflow commands, Ali OSS environment variables.

---

## File Structure

- Create: `scripts/upstream/sync-workflows.js`
  - Copies upstream-owned workflow/helper files into `zdoc_cn`.
  - Applies all allowed CN transformations in one deterministic place.
  - Supports `--check`, `--write`, `--upstream <path>`, and `--root <path>`.
- Create: `scripts/upstream/sync-workflows.test.js`
  - Uses temporary upstream/root fixtures.
  - Verifies workflow files are copied, CN mutations are applied, and `--check` reports drift.
- Modify: `package.json`
  - Add `upstream:sync-workflows` and `upstream:check-workflows`.
- Modify: `scripts/validate-workflow-policy.test.js`
  - Change the source producer graph assertion back to upstream parity.
  - Keep CN-specific workflow title, manual migration trigger, and OSS assertions.
- Modify: `.github/workflows/fetch-docs.yml`
  - Regenerate from upstream plus CN patches.
  - Restore upstream-parallel source producers.
- Modify: `.github/workflows/_fetch-content-group.yml`
  - Regenerate from upstream plus Ali OSS substitutions.
  - Remove temporary Feishu retry overrides unless they are present upstream.
- Modify: `.github/workflows/_fetch-guides-sources.yml`
  - Regenerate from upstream plus Ali OSS substitutions.
  - Remove temporary Feishu retry overrides unless they are present upstream.
- Modify: `.github/workflows/locked-upstream-overlay.yml`
  - Add `npm run upstream:check-workflows` so drift is caught in CI.
- Modify: `scripts/upstream/validate-overlay.js`
  - Keep production workflows blocked from `overlay-manifest.json`; workflow sync is a separate mechanism.
- Modify: `scripts/upstream/validate-overlay.test.js`
  - Rename the existing “first-class” workflow assertion so it explicitly says workflows are synced by `sync-workflows.js`, not overlay copy.
- Modify: `.claude/superpowers/plans/2026-07-19-zdoc-cn-assemble-workflow-migration.md`
  - Add a short note that the serialized producer/backoff patch was a temporary diagnostic mitigation and is superseded by upstream-parallel sync.

---

### Task 1: Add Workflow Sync Script Tests

**Files:**
- Create: `scripts/upstream/sync-workflows.test.js`

- [ ] **Step 1: Write the failing test file**

Create `scripts/upstream/sync-workflows.test.js` with:

```js
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
jobs:
  prepare:
    steps:
      - run: echo Global Docs Build
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
      - run: bash scripts/update-sdk-reference-snapshots.sh "$GROUP"
        env:
          AWS_BUCKET: ${{ vars.AWS_BUCKET }}
          AWS_REGION: ${{ vars.AWS_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
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
      - run: node scripts/docs-workflow/guides-media-prefetch.js
        env:
          AWS_BUCKET: ${{ vars.AWS_BUCKET }}
          AWS_REGION: ${{ vars.AWS_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
`);

  writeFile(upstream, '.github/workflows/_verify-docs.yml', 'name: verify docs\n');
  writeFile(upstream, '.github/workflows/translate-codex.yml', 'name: translate codex\n');
  writeFile(upstream, 'scripts/docs-workflow/example.js', "module.exports = 'upstream';\n");
  writeFile(upstream, 'scripts/update-sdk-reference-snapshots.sh', '#!/usr/bin/env bash\n');
  writeFile(upstream, 'scripts/update-lark-doc-snapshot.js', "console.log('snapshot');\n");

  fs.mkdirSync(root, { recursive: true });
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

    const contentGroup = readFile(fixture.root, '.github/workflows/_fetch-content-group.yml');
    assert.match(contentGroup, /OSS_ACCESS_KEY_ID/);
    assert.match(contentGroup, /OSS_ACCESS_KEY_SECRET/);
    assert.match(contentGroup, /OSS_BUCKET/);
    assert.match(contentGroup, /OSS_REGION/);
    assert.match(contentGroup, /OSS_ENDPOINT/);
    assert.doesNotMatch(contentGroup, /AWS_ACCESS_KEY_ID/);
    assert.doesNotMatch(contentGroup, /AWS_SECRET_ACCESS_KEY/);

    assert.equal(readFile(fixture.root, 'scripts/docs-workflow/example.js'), "module.exports = 'upstream';\n");
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
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test scripts/upstream/sync-workflows.test.js
```

Expected: FAIL with `Cannot find module ... sync-workflows.js`.

- [ ] **Step 3: Commit the failing test**

```bash
git add scripts/upstream/sync-workflows.test.js
git commit -m "test(upstream): specify workflow sync behavior"
```

---

### Task 2: Implement Workflow Sync Script

**Files:**
- Create: `scripts/upstream/sync-workflows.js`

- [ ] **Step 1: Add the sync script implementation**

Create `scripts/upstream/sync-workflows.js` with:

```js
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
  'scripts/docs-workflow',
  'scripts/update-lark-doc-snapshot.js',
  'scripts/update-sdk-reference-snapshots.sh',
];

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
      options.root = path.resolve(argv[++index]);
    } else if (arg === '--upstream') {
      options.upstream = path.resolve(argv[++index]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

function assertInside(base, target) {
  const relative = path.relative(base, target);
  if (relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))) return;
  throw new Error(`Path escapes ${base}: ${target}`);
}

function removePath(target) {
  fs.rmSync(target, { recursive: true, force: true });
}

function copyPath(from, to) {
  assertInside(path.dirname(to), to);
  removePath(to);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.cpSync(from, to, { recursive: true, dereference: false, preserveTimestamps: false });
}

function readText(root, relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
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

function removeScheduleBlock(content) {
  return content.replace(/\n\s+schedule:\n(?:\s+- cron: .*?\n)+/m, '\n');
}

function applyFetchDocsPatch(content) {
  let next = content;
  next = next.replace(/^name: .+$/m, 'name: fetch CN docs');
  next = removeScheduleBlock(next);
  next = next.replace(/default: true/g, 'default: false');
  next = next.replace(/Global Docs Artifact-Only Build/g, 'CN Docs Artifact-Only Build');
  next = next.replace(/Global Docs Build/g, 'CN Docs Build');
  next = next.replace(/group: docs-production-dev/g, 'group: cn-docs-production-dev');
  return applyOssPatch(next);
}

function applyTranslatePatch(content) {
  return content
    .replace(/ja-JP/g, 'zh-CN')
    .replace(/Japanese/g, 'Chinese')
    .replace(/japanese/g, 'chinese');
}

function transform(relativePath, content) {
  if (relativePath === '.github/workflows/fetch-docs.yml') return applyFetchDocsPatch(content);
  if (relativePath === '.github/workflows/_fetch-content-group.yml') return applyOssPatch(content);
  if (relativePath === '.github/workflows/_fetch-guides-sources.yml') return applyOssPatch(content);
  if (relativePath === '.github/workflows/_translate-content-group.yml') return applyTranslatePatch(content);
  if (relativePath === '.github/workflows/_translate-publish-batch.yml') return applyTranslatePatch(content);
  if (relativePath === '.github/workflows/_publish-translation-batches.yml') return applyTranslatePatch(content);
  if (relativePath === '.github/workflows/translate-codex.yml') return applyTranslatePatch(content);
  return content;
}

function syncInto(root, upstream) {
  for (const relativePath of COPIED_PATHS) {
    const source = path.join(upstream, relativePath);
    const target = path.join(root, relativePath);
    if (!fs.existsSync(source)) throw new Error(`Missing upstream sync source: ${relativePath}`);

    const stat = fs.statSync(source);
    if (stat.isDirectory()) {
      copyPath(source, target);
      continue;
    }

    const content = transform(relativePath, fs.readFileSync(source, 'utf8'));
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
    syncInto(tempRoot, upstream);
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
  applyFetchDocsPatch,
  applyOssPatch,
  applyTranslatePatch,
  parseArgs,
  syncInto,
  transform,
};
```

- [ ] **Step 2: Run the sync script test**

Run:

```bash
node --test scripts/upstream/sync-workflows.test.js
```

Expected: PASS.

- [ ] **Step 3: Commit the implementation**

```bash
git add scripts/upstream/sync-workflows.js scripts/upstream/sync-workflows.test.js
git commit -m "feat(upstream): generate synced docs workflows"
```

---

### Task 3: Add Package Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add package script assertions**

Append this test to `scripts/upstream/sync-workflows.test.js`:

```js
test('package scripts expose workflow sync commands', () => {
  const packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json'), 'utf8'));
  assert.equal(packageJson.scripts['upstream:sync-workflows'], 'node scripts/upstream/sync-workflows.js --write');
  assert.equal(packageJson.scripts['upstream:check-workflows'], 'node scripts/upstream/sync-workflows.js --check');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test scripts/upstream/sync-workflows.test.js
```

Expected: FAIL because `upstream:sync-workflows` and `upstream:check-workflows` are missing.

- [ ] **Step 3: Add scripts to `package.json`**

Modify the `"scripts"` block so the upstream section contains:

```json
"upstream:materialize": "node scripts/upstream/materialize.js",
"assemble": "node scripts/upstream/assemble.js",
"build:assembled": "npm run assemble && pnpm --dir .zdoc-assembled run build",
"upstream:sync-workflows": "node scripts/upstream/sync-workflows.js --write",
"upstream:check-workflows": "node scripts/upstream/sync-workflows.js --check",
```

- [ ] **Step 4: Run the test to verify it passes**

Run:

```bash
node --test scripts/upstream/sync-workflows.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit the package script change**

```bash
git add package.json scripts/upstream/sync-workflows.test.js
git commit -m "chore(upstream): expose workflow sync commands"
```

---

### Task 4: Regenerate Workflows From Upstream

**Files:**
- Modify: `.github/workflows/fetch-docs.yml`
- Modify: `.github/workflows/_assemble-guides.yml`
- Modify: `.github/workflows/_fetch-content-group.yml`
- Modify: `.github/workflows/_fetch-guides-sources.yml`
- Modify: `.github/workflows/_monitor-docs-progress.yml`
- Modify: `.github/workflows/_prepare-translation-batches.yml`
- Modify: `.github/workflows/_publish-content-group.yml`
- Modify: `.github/workflows/_publish-translation-batches.yml`
- Modify: `.github/workflows/_render-guides-table.yml`
- Modify: `.github/workflows/_translate-content-group.yml`
- Modify: `.github/workflows/_translate-publish-batch.yml`
- Modify: `.github/workflows/_verify-docs.yml`
- Modify: `.github/workflows/translate-codex.yml`
- Modify: `scripts/docs-workflow/**`
- Modify: `scripts/update-lark-doc-snapshot.js`
- Modify: `scripts/update-sdk-reference-snapshots.sh`

- [ ] **Step 1: Generate the synced files**

Run:

```bash
npm run upstream:sync-workflows
```

Expected: command exits 0 and rewrites only the files in `COPIED_PATHS`.

- [ ] **Step 2: Inspect producer graph and temporary retry drift**

Run:

```bash
rg -n "produce_python:|produce_java:|produce_node:|produce_go:|produce_cli:|produce_rest:|FEISHU_RETRY_ATTEMPTS|FEISHU_RETRY_DELAY_MS" .github/workflows/fetch-docs.yml .github/workflows/_fetch-content-group.yml .github/workflows/_fetch-guides-sources.yml
```

Expected:

```text
.github/workflows/fetch-docs.yml:<line>:  produce_python:
.github/workflows/fetch-docs.yml:<line>:  produce_java:
.github/workflows/fetch-docs.yml:<line>:  produce_node:
.github/workflows/fetch-docs.yml:<line>:  produce_go:
.github/workflows/fetch-docs.yml:<line>:  produce_cli:
.github/workflows/fetch-docs.yml:<line>:  produce_rest:
```

No `FEISHU_RETRY_ATTEMPTS` or `FEISHU_RETRY_DELAY_MS` matches should appear unless upstream has added them.

- [ ] **Step 3: Inspect OSS patch output**

Run:

```bash
rg -n "AWS_|OSS_BUCKET|OSS_REGION|OSS_ENDPOINT|OSS_ACCESS_KEY" .github/workflows/fetch-docs.yml .github/workflows/_fetch-content-group.yml .github/workflows/_fetch-guides-sources.yml
```

Expected: `OSS_BUCKET`, `OSS_REGION`, `OSS_ENDPOINT`, `OSS_ACCESS_KEY_ID`, and `OSS_ACCESS_KEY_SECRET` appear; `AWS_` does not appear in these files.

- [ ] **Step 4: Commit regenerated files**

```bash
git add .github/workflows scripts/docs-workflow scripts/update-lark-doc-snapshot.js scripts/update-sdk-reference-snapshots.sh
git commit -m "chore(ci): sync docs workflows from upstream"
```

---

### Task 5: Restore Upstream-Parallel Producer Policy

**Files:**
- Modify: `scripts/validate-workflow-policy.test.js`

- [ ] **Step 1: Change the producer graph test**

Replace the current test named:

```js
test('content producers and source publishers form explicit queues', () => {
```

with this implementation:

```js
test('content producers follow upstream-parallel source graph and serialized publishers', () => {
  const workflowPath = path.join(process.cwd(), '.github/workflows/fetch-docs.yml')
  const workflow = yaml.load(fs.readFileSync(workflowPath, 'utf8'))
  const groups = ['guides', 'python', 'java', 'node', 'go', 'cli', 'rest']
  const publicationOrder = ['java', 'node', 'go', 'cli', 'rest', 'python', 'guides']

  for (const group of groups) {
    const expectedProducerNeeds = group === 'guides'
      ? ['prepare', 'produce_guides_sources', 'render_guides_tables']
      : 'prepare'
    assert.deepEqual(workflow.jobs[`produce_${group}`].needs, expectedProducerNeeds)
    const producerCondition = workflow.jobs[`produce_${group}`].if || ''
    assert.match(producerCondition, new RegExp(`needs\\.prepare\\.outputs\\.selected_group == '${group}'`), `${group} producer must support single-group dispatch`)
    const condition = workflow.jobs[`publish_${group}`].if
    assert.match(condition, /always\(\)/, `${group} publisher must tolerate skipped dependencies`)
    assert.match(condition, /needs\.prepare\.outputs\.publish == 'true'/, `${group} publisher must require publish mode`)
    assert.match(condition, new RegExp(`needs\\.prepare\\.outputs\\.selected_group == '${group}'`), `${group} publisher must require group selection`)
    assert.match(condition, new RegExp(`needs\\.produce_${group}\\.outputs\\.status == 'artifact_ready'`), `${group} publisher must require an artifact-ready producer`)
  }

  for (const [index, group] of publicationOrder.entries()) {
    const expectedNeeds = ['prepare', `produce_${group}`]
    if (index > 0) expectedNeeds.push(`publish_${publicationOrder[index - 1]}`)
    assert.deepEqual(workflow.jobs[`publish_${group}`].needs, expectedNeeds)
  }
})
```

- [ ] **Step 2: Run workflow policy tests**

Run:

```bash
npm run test:workflow-policy
```

Expected: PASS. If this fails because generated upstream workflows changed publisher ordering, compare `../zdoc/scripts/validate-workflow-policy.test.js` and copy upstream policy first, then reapply only CN-specific assertions.

- [ ] **Step 3: Run sync drift check**

Run:

```bash
npm run upstream:check-workflows
```

Expected: PASS.

- [ ] **Step 4: Commit policy alignment**

```bash
git add scripts/validate-workflow-policy.test.js
git commit -m "test(ci): require upstream-parallel producer graph"
```

---

### Task 6: Wire Drift Check Into Existing CI

**Files:**
- Modify: `.github/workflows/locked-upstream-overlay.yml`
- Modify: `scripts/upstream/validate-overlay.test.js`

- [ ] **Step 1: Add test coverage for the CI check**

Append this test to `scripts/upstream/validate-overlay.test.js`:

```js
test('locked upstream workflow checks generated workflow drift', () => {
  const workflow = fs.readFileSync(path.join(ROOT_DIR, '.github/workflows/locked-upstream-overlay.yml'), 'utf8');
  assert.match(workflow, /npm run upstream:check-workflows/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
node --test scripts/upstream/validate-overlay.test.js
```

Expected: FAIL because the CI workflow does not yet call `npm run upstream:check-workflows`.

- [ ] **Step 3: Add the CI step**

In `.github/workflows/locked-upstream-overlay.yml`, add this step after dependency installation and before assemble/build validation:

```yaml
      - name: Check workflow sync drift
        run: npm run upstream:check-workflows
```

- [ ] **Step 4: Run overlay tests**

Run:

```bash
node --test scripts/upstream/validate-overlay.test.js
```

Expected: PASS.

- [ ] **Step 5: Commit CI drift check**

```bash
git add .github/workflows/locked-upstream-overlay.yml scripts/upstream/validate-overlay.test.js
git commit -m "ci(upstream): check workflow sync drift"
```

---

### Task 7: Clarify Overlay Boundary

**Files:**
- Modify: `scripts/upstream/validate-overlay.test.js`
- Modify: `.claude/superpowers/plans/2026-07-19-zdoc-cn-assemble-workflow-migration.md`

- [ ] **Step 1: Rename the overlay boundary test**

In `scripts/upstream/validate-overlay.test.js`, rename:

```js
test('production docs workflows stay first-class in zdoc_cn', () => {
```

to:

```js
test('production docs workflows are synced separately from overlay copy rules', () => {
```

Keep the assertions that block `.github/workflows/_assemble-guides.yml` and `scripts/docs-workflow` from `overlay-manifest.json`.

- [ ] **Step 2: Add a migration plan note**

Append this note to `.claude/superpowers/plans/2026-07-19-zdoc-cn-assemble-workflow-migration.md`:

```markdown

## Workflow Sync Supersedes Temporary Producer Serialization

The temporary CN-only serialization and retry/backoff changes were useful for identifying Feishu source-fetch pressure, but they are not the long-term workflow policy. `zdoc_cn` now keeps production docs workflows generated from upstream `zdoc` plus a small CN patch layer. The source producer graph should match upstream unless upstream changes it; Feishu service failures should be handled by upstream-compatible retry/runtime fixes or external Feishu permission/rate-limit remediation.
```

- [ ] **Step 3: Run overlay tests**

Run:

```bash
node --test scripts/upstream/validate-overlay.test.js
```

Expected: PASS.

- [ ] **Step 4: Commit documentation boundary**

```bash
git add scripts/upstream/validate-overlay.test.js .claude/superpowers/plans/2026-07-19-zdoc-cn-assemble-workflow-migration.md
git commit -m "docs(upstream): document workflow sync boundary"
```

---

### Task 8: Final Verification

**Files:**
- No new files.

- [ ] **Step 1: Run targeted tests**

Run:

```bash
node --test scripts/upstream/sync-workflows.test.js
npm run upstream:check-workflows
npm run test:workflow-policy
node --test scripts/upstream/validate-overlay.test.js
node --test scripts/docs-workflow/monitor-docs-progress.test.js
npm run test:translation
```

Expected: all commands PASS.

- [ ] **Step 2: Run formatting/sanity checks**

Run:

```bash
git diff --check
git status --short
```

Expected: `git diff --check` prints no whitespace errors. `git status --short` shows only intentional uncommitted files, or is clean if every task was committed.

- [ ] **Step 3: Commit any missed verification-only updates**

If verification required small test or script corrections, commit them:

```bash
git add scripts/upstream scripts/validate-workflow-policy.test.js .github/workflows package.json .claude/superpowers/plans
git commit -m "chore(upstream): finalize workflow sync verification"
```

Expected: no commit is created if there were no missed updates.

---

## Self-Review

- Spec coverage: This plan keeps workflow files local for GitHub Actions, makes them synced from upstream, limits CN differences to OSS/title/locale/migration defaults, restores upstream-parallel source producers, and preserves overlay boundaries.
- Placeholder scan: No `TBD`, `TODO`, “similar to,” or unresolved implementation placeholders are used.
- Type consistency: The sync script exports and tests consistently use `COPIED_PATHS`, `applyFetchDocsPatch`, `applyOssPatch`, `applyTranslatePatch`, `parseArgs`, `syncInto`, and `transform`.
- Risk note: If upstream changes workflow structure before implementation, regenerate with `npm run upstream:sync-workflows`, then update only the assertions that describe intentional CN deltas.
