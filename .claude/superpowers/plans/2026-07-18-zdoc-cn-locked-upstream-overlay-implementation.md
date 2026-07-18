# Zdoc CN Locked Upstream Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-only assembly layer so `zdoc_cn` consumes tooling from a pinned `zdoc` commit without changing upstream `../zdoc`.

**Architecture:** `zdoc_cn` records an immutable upstream lock, materializes that commit into ignored state, assembles a disposable workspace, applies allowlisted Chinese overlay files, applies exact temporary patches only when needed, and runs upstream tooling inside `.zdoc-assembled`. Specs, plans, and worktrees live under `.claude`.

**Tech Stack:** Node.js CommonJS scripts for local assembly, Git CLI with argument arrays, Docusaurus/pnpm in the assembled upstream workspace, `node:test`, existing CN normalizer tests.

---

## File Structure And Responsibilities

- Create: `upstream.lock`
  - Exact upstream repository, commit, compatibility, and optional local source hint.
- Create: `scripts/upstream/read-lock.js`
  - Parse and validate `upstream.lock`.
- Create: `scripts/upstream/read-lock.test.js`
  - Unit tests for accepted and rejected lock forms.
- Create: `scripts/upstream/materialize.js`
  - Materialize the locked upstream commit into `.zdoc-upstream/worktree`.
- Create: `scripts/upstream/materialize.test.js`
  - Fixture-repository tests for exact checkout behavior.
- Create: `overlay-manifest.json`
  - Allowlisted CN overlay copy and patch declarations.
- Create: `scripts/upstream/validate-overlay.js`
  - Validate overlay manifest boundaries.
- Create: `scripts/upstream/validate-overlay.test.js`
  - Unit tests for allowed paths, blocked paths, duplicate targets, and patch declarations.
- Create: `scripts/upstream/assemble.js`
  - Copy upstream to `.zdoc-assembled`, apply overlay, apply exact patches, write build manifest.
- Create: `scripts/upstream/assemble.test.js`
  - Determinism and boundary tests using fixtures.
- Create: `patches/upstream/README.md`
  - Patch policy, active patch list, and removal conditions.
- Modify: `.gitignore`
  - Ignore `.zdoc-upstream/`, `.zdoc-assembled/`, `.zdoc-cache/`, and `.claude/worktrees/`.
- Modify: `package.json`
  - Add local assembly scripts.

## Task 1: Lock File Parser

**Files:**
- Create: `upstream.lock`
- Create: `scripts/upstream/read-lock.js`
- Create: `scripts/upstream/read-lock.test.js`

- [ ] **Step 1: Add the lock fixture**

Create `upstream.lock`:

```yaml
repository: zilliztech/zdoc
commit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f
compatibility: 1
source: ../zdoc
```

- [ ] **Step 2: Write failing parser tests**

Create `scripts/upstream/read-lock.test.js`:

```js
const assert = require('node:assert/strict');
const test = require('node:test');
const { parseLockContent } = require('./read-lock');

test('accepts exact zdoc lock', () => {
  const lock = parseLockContent([
    'repository: zilliztech/zdoc',
    'commit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f',
    'compatibility: 1',
    'source: ../zdoc',
  ].join('\n'));

  assert.equal(lock.repository, 'zilliztech/zdoc');
  assert.equal(lock.commit, '0cc5ad1a5234c762a1e999cc525045e96adfb25f');
  assert.equal(lock.compatibility, 1);
  assert.equal(lock.source, '../zdoc');
});

test('rejects branch names, wrong repositories, and extra keys', () => {
  assert.throws(() => parseLockContent('repository: zilliztech/zdoc\ncommit: master\ncompatibility: 1'), /commit/);
  assert.throws(() => parseLockContent('repository: other/zdoc\ncommit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f\ncompatibility: 1'), /repository/);
  assert.throws(() => parseLockContent('repository: zilliztech/zdoc\ncommit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f\ncompatibility: 1\nextra: no'), /extra/);
});
```

- [ ] **Step 3: Run the failing test**

Run:

```bash
node --test scripts/upstream/read-lock.test.js
```

Expected: FAIL with `Cannot find module './read-lock'`.

- [ ] **Step 4: Implement the parser**

Create `scripts/upstream/read-lock.js`:

```js
const fs = require('node:fs');
const path = require('node:path');

const REQUIRED_KEYS = new Set(['repository', 'commit', 'compatibility']);
const OPTIONAL_KEYS = new Set(['source']);
const ALLOWED_KEYS = new Set([...REQUIRED_KEYS, ...OPTIONAL_KEYS]);

function parseScalar(value) {
  const trimmed = value.trim();
  if (/^['"].*['"]$/.test(trimmed)) return trimmed.slice(1, -1);
  if (/^[0-9]+$/.test(trimmed)) return Number(trimmed);
  return trimmed;
}

function parseLockContent(content) {
  const out = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+#.*$/, '').trim();
    if (!line) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) throw new Error(`Invalid lock line: ${rawLine}`);
    const key = match[1];
    if (!ALLOWED_KEYS.has(key)) throw new Error(`Invalid extra lock key: ${key}`);
    if (Object.prototype.hasOwnProperty.call(out, key)) throw new Error(`Duplicate lock key: ${key}`);
    out[key] = parseScalar(match[2]);
  }

  for (const key of REQUIRED_KEYS) {
    if (!Object.prototype.hasOwnProperty.call(out, key)) throw new Error(`Missing lock key: ${key}`);
  }

  if (out.repository !== 'zilliztech/zdoc') throw new Error(`Invalid repository: ${out.repository}`);
  if (!/^[a-f0-9]{40}$/.test(out.commit)) throw new Error(`Invalid commit: ${out.commit}`);
  if (out.compatibility !== 1) throw new Error(`Unsupported compatibility: ${out.compatibility}`);
  if (out.source && path.isAbsolute(out.source)) throw new Error('source must be relative when present');
  return out;
}

function readLock(filePath = path.resolve(__dirname, '..', '..', 'upstream.lock')) {
  return parseLockContent(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { parseLockContent, readLock };
```

- [ ] **Step 5: Run the passing test**

Run:

```bash
node --test scripts/upstream/read-lock.test.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add upstream.lock scripts/upstream/read-lock.js scripts/upstream/read-lock.test.js
git commit -m "feat(upstream): lock zdoc source commit"
```

## Task 2: Materialize Locked Upstream

**Files:**
- Create: `scripts/upstream/materialize.js`
- Create: `scripts/upstream/materialize.test.js`
- Modify: `.gitignore`
- Modify: `package.json`

- [ ] **Step 1: Write fixture materialization tests**

Create `scripts/upstream/materialize.test.js` with fixture repositories created under `node:test` temporary directories. Test that a local `source` checkout containing the locked commit is copied to `.zdoc-upstream/worktree` at detached HEAD, and that a missing commit fails.

- [ ] **Step 2: Implement materialization**

Create `scripts/upstream/materialize.js` using `child_process.spawnSync(command, args)` only. Resolve `lock.source || '../zdoc'` for local development. Verify:

- `git rev-parse --is-inside-work-tree`
- `git rev-parse <commit>^{commit}`
- checked-out worktree HEAD equals lock commit

Never shell-interpolate user input.

- [ ] **Step 3: Ignore generated state**

Modify `.gitignore`:

```gitignore
.zdoc-upstream/
.zdoc-assembled/
.zdoc-cache/
.claude/worktrees/
```

- [ ] **Step 4: Add scripts**

Modify `package.json`:

```json
{
  "scripts": {
    "upstream:materialize": "node scripts/upstream/materialize.js",
    "assemble": "node scripts/upstream/assemble.js",
    "build:assembled": "npm run assemble && pnpm --dir .zdoc-assembled run build"
  }
}
```

Preserve existing CN scripts, especially `test:cn-publish-normalizer`, `verify:cn-publish`, and `build:cn-publish`.

- [ ] **Step 5: Run tests**

```bash
node --test scripts/upstream/materialize.test.js
npm run upstream:materialize
```

Expected: tests pass and `.zdoc-upstream/worktree` resolves to the locked upstream SHA.

- [ ] **Step 6: Commit**

```bash
git add .gitignore package.json scripts/upstream/materialize.js scripts/upstream/materialize.test.js
git commit -m "feat(upstream): materialize locked zdoc checkout"
```

## Task 3: Validate Overlay Boundaries

**Files:**
- Create: `overlay-manifest.json`
- Create: `scripts/upstream/validate-overlay.js`
- Create: `scripts/upstream/validate-overlay.test.js`
- Create: `patches/upstream/README.md`

- [ ] **Step 1: Add the manifest**

Create `overlay-manifest.json`:

```json
{
  "compatibility": 1,
  "copy": [
    {"from": "site-profile", "to": "site-profile/zh-CN"},
    {"from": "content-config", "to": "content-config/zh-CN"},
    {"from": "plugins/cn-publish-normalizer", "to": "plugins/cn-publish-normalizer"},
    {"from": "plugins/adapters/aliyun-oss", "to": "plugins/adapters/aliyun-oss"},
    {"from": "rest-overrides/zh-CN", "to": "rest-overrides/zh-CN"},
    {"from": "nginx/zh-CN", "to": "nginx/zh-CN"},
    {"from": "ci", "to": "ci/zh-CN"},
    {"from": "tests/zh-CN", "to": "tests/zh-CN"}
  ],
  "patches": []
}
```

- [ ] **Step 2: Write boundary tests**

Test that the manifest accepts the listed entries and rejects:

- `to: "src/theme"`
- `to: "plugins/lark-docs"`
- `to: "scripts/docs-workflow"`
- `to: "docusaurus.config.ts"`
- duplicate `to` destinations
- absolute paths
- `..` path traversal

- [ ] **Step 3: Implement validation**

Create `scripts/upstream/validate-overlay.js` exporting `validateOverlayManifest(manifest)`. Normalize POSIX paths and enforce blocked prefixes before assembly copies anything.

- [ ] **Step 4: Add patch policy**

Create `patches/upstream/README.md`:

```md
# Upstream Patch Policy

Patches in this directory are temporary exact-apply shims for the locked upstream commit.

Every patch must be listed in `overlay-manifest.json` with a reason and a removal condition. Assembly fails if `git apply --check` fails.

Prefer environment variables, upstream CLI arguments, Docusaurus composition, or overlay-owned generated config before adding a patch.
```

- [ ] **Step 5: Run tests**

```bash
node --test scripts/upstream/validate-overlay.test.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add overlay-manifest.json patches/upstream/README.md scripts/upstream/validate-overlay.js scripts/upstream/validate-overlay.test.js
git commit -m "feat(overlay): validate chinese overlay boundaries"
```

## Task 4: Assemble The Disposable Workspace

**Files:**
- Create: `scripts/upstream/assemble.js`
- Create: `scripts/upstream/assemble.test.js`

- [ ] **Step 1: Write assembly tests**

Use fixture upstream and downstream directories. Assert:

- assembly copies upstream into `.zdoc-assembled`;
- `.git`, `build`, `.docusaurus`, `node_modules`, `.zdoc-upstream`, and `.zdoc-assembled` are excluded;
- allowlisted overlay files are copied;
- blocked destinations fail before copy;
- repeated assembly produces identical `.zdoc-build-manifest.json`.

- [ ] **Step 2: Implement assembly**

Create `scripts/upstream/assemble.js`:

- read lock;
- validate manifest;
- recursively copy `.zdoc-upstream/worktree` to `.zdoc-assembled`;
- exclude generated and dependency directories;
- copy each manifest entry;
- run `git apply --check` and `git apply` for each patch inside `.zdoc-assembled`;
- write `.zdoc-build-manifest.json` with sorted copied paths.

- [ ] **Step 3: Run tests**

```bash
node --test scripts/upstream/assemble.test.js
npm run upstream:materialize
npm run assemble
```

Expected: PASS and `.zdoc-assembled/.zdoc-build-manifest.json` exists.

- [ ] **Step 4: Commit**

```bash
git add scripts/upstream/assemble.js scripts/upstream/assemble.test.js
git commit -m "feat(overlay): assemble locked upstream with cn overlay"
```

## Task 5: Add CN Build Integration Patch

**Files:**
- Create: `patches/upstream/0001-cn-build-normalizer.patch`
- Modify: `overlay-manifest.json`
- Test: existing CN normalizer tests and assembled smoke build

- [ ] **Step 1: Inspect assembled upstream config**

Run:

```bash
npm run assemble
rg -n "remarkPlugins|scripts|build" .zdoc-assembled/docusaurus.config.ts .zdoc-assembled/package.json
```

Expected: identify the smallest exact patch needed to register `plugins/cn-publish-normalizer` and a CN verification command.

- [ ] **Step 2: Create exact patch**

Use `git diff --no-index` or manual patch creation to produce `patches/upstream/0001-cn-build-normalizer.patch`. The patch may touch upstream `docusaurus.config.ts` and `package.json` only inside `.zdoc-assembled`.

- [ ] **Step 3: Register patch metadata**

Modify `overlay-manifest.json`:

```json
{
  "path": "patches/upstream/0001-cn-build-normalizer.patch",
  "reason": "Register CN markdown normalizer and build verification without changing upstream",
  "removeWhen": "Upstream exposes a serializable site profile or remark plugin hook"
}
```

- [ ] **Step 4: Run verification**

```bash
npm run test:cn-publish-normalizer
npm run assemble
pnpm --dir .zdoc-assembled install --frozen-lockfile
pnpm --dir .zdoc-assembled run build
node scripts/verify-cn-publish-artifacts.js .zdoc-assembled/build
```

Expected: PASS, or fail with exact residual patterns to fix in the normalizer or patch.

- [ ] **Step 5: Commit**

```bash
git add patches/upstream/0001-cn-build-normalizer.patch overlay-manifest.json
git commit -m "feat(overlay): patch assembled cn build hooks"
```

## Task 6: Final Verification And Worktree Hygiene

**Files:**
- Verify: `.claude/superpowers/specs/2026-07-18-zdoc-cn-locked-upstream-overlay-design.md`
- Verify: `.claude/superpowers/plans/2026-07-18-zdoc-cn-locked-upstream-overlay-implementation.md`
- Verify: `.claude/worktrees/`

- [ ] **Step 1: Verify no direct sibling imports**

```bash
rg -n "\\.\\./zdoc|/Users/.*/zdoc" scripts package.json .claude/superpowers
```

Expected: no committed runtime imports. Mentions in specs/plans are allowed only as local source hints or rejected examples.

- [ ] **Step 2: Verify worktree location**

```bash
git worktree list --porcelain
find .claude/worktrees -maxdepth 2 -type d 2>/dev/null | sort
```

Expected: active migration worktrees, if any, live under `.claude/worktrees/`. No stale unregistered worktree copies with `node_modules`, `build`, or `.docusaurus` remain.

- [ ] **Step 3: Verify tests**

```bash
node --test scripts/upstream/*.test.js
npm run test:cn-publish-normalizer
```

Expected: PASS.

- [ ] **Step 4: Commit docs and hygiene updates**

```bash
git add .claude/superpowers/specs .claude/superpowers/plans .gitignore
git commit -m "docs(plan): use locked upstream overlay without upstream changes"
```

## Self-Review Checklist

- Spec coverage: no-upstream-change decision, locked SHA, deterministic assembly, overlay allowlist, patch policy, CN normalizer, worktree location, and verification gates are covered.
- Placeholder scan: no deferred-work markers are present.
- Type consistency: `upstream.lock`, `overlay-manifest.json`, `.zdoc-upstream`, `.zdoc-assembled`, and `.claude/worktrees` names are consistent across tasks.
