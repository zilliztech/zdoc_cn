# zdoc_cn Single-Language Publication Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `zdoc_cn` into a directly buildable, single-locale Chinese repository whose English Reference inputs live outside Docusaurus roots and whose content groups publish atomically and independently.

**Architecture:** Give every Reference group an English mirror under `reference-sources/<group>/` and a Chinese publication root under `reference/`. Put the mapping in one shared module used by generators, translation manifests, checkpoints, publishers, and validators. Guides and BYOC publish Chinese directly; Reference translation promotes only a complete validated group.

**Tech Stack:** Docusaurus 3.10, Node.js 20 built-in test runner, GitHub Actions, Bash, Git worktrees, Yarn 1, pnpm 9, Docker/OrbStack.

---

## File Map

- Create `scripts/docs-workflow/publication-layout.js` and test: authoritative source/publication roots.
- Create `scripts/migrate-single-language-content.js` and test: fail-closed migration from current `dev`.
- Create `scripts/validate-single-language-layout.js` and test: locale, plugin, build-root, and stale-tree invariants.
- Create `scripts/route-inventory.js` and test: old/new route parity with explicit retired routes.
- Modify Docusaurus, Lark, translation, checkpoint, GitHub Actions, workflow-policy, Docker, and upstream-sync files listed in the tasks below.
- Delete only after validation: manual `i18n/zh-CN` trees, `docs-agents/`, BYOC version trees, and unreachable overlay tooling.

## Execution Baseline

Use an isolated worktree from `master`, then materialize the immutable current `dev` generated state once:

```bash
git fetch origin master dev
git worktree add .claude/worktrees/single-language-publication -b feat/single-language-publication origin/master
cd .claude/worktrees/single-language-publication
bash scripts/restore-generated-state.sh --exact --ref "$(git rev-parse origin/dev)"
```

Expected: generated content matches `origin/dev`. Do not commit this raw overlay; commit only after the migration validator passes.

### Task 1: Establish the publication layout contract

**Files:**

- Create: `scripts/docs-workflow/publication-layout.js`, `publication-layout.test.js`
- Modify: `scripts/docs-workflow/content-groups.js`, `content-groups.test.js`
- Modify: `scripts/docs-workflow/group-paths.js`, `group-paths.test.js`

- [ ] **Step 1: Write failing tests for exact group mappings**

```javascript
const EXPECTED = {
  python: ['reference-sources/python/api/python/python', 'reference/api/python/python'],
  java: ['reference-sources/java/api/java/java/v2', 'reference/api/java/java/v2'],
  node: ['reference-sources/node/api/nodejs/nodejs', 'reference/api/nodejs/nodejs'],
  go: ['reference-sources/go/api/go/go/v2', 'reference/api/go/go/v2'],
  cli: ['reference-sources/cli/cli/cli', 'reference/cli/cli'],
  rest: ['reference-sources/rest/api/restful/restful', 'reference/api/restful/restful'],
}
```

Also add the active landing-page pairs `reference-sources/java/api/java/java/java.md` -> `reference/api/java/java/java.md` and `reference-sources/go/api/go/go/go.md` -> `reference/api/go/go/go.md`. Assert mapping of `a.md`, Guides has no translation source root, roots are disjoint, and Java/Go v1 roots are retired.

- [ ] **Step 2: Run and observe failure**

```bash
node --test scripts/docs-workflow/publication-layout.test.js scripts/docs-workflow/content-groups.test.js scripts/docs-workflow/group-paths.test.js
```

Expected: FAIL because the shared layout does not exist and group paths still point at i18n.

- [ ] **Step 3: Implement the immutable mapping API**

```javascript
function assertSafeRelativePath(value) {
  if (typeof value !== 'string' || !value || value.startsWith('/') || value.endsWith('/') || value.includes('\\')) throw new Error(`Unsafe path: ${value}`)
  if (value.split('/').some(part => !part || part === '.' || part === '..')) throw new Error(`Unsafe path: ${value}`)
  return value
}

function getPublicationLayout(group) {
  if (!Object.hasOwn(LAYOUTS, group)) throw new Error(`Unknown publication group: ${group}`)
  return LAYOUTS[group]
}

function mapSourceToPublished(group, sourcePath) {
  const safe = assertSafeRelativePath(sourcePath)
  const layout = getPublicationLayout(group)
  for (let index = 0; index < layout.sourceRoots.length; index++) {
    const sourceRoot = layout.sourceRoots[index]
    if (safe === sourceRoot || safe.startsWith(`${sourceRoot}/`)) return `${layout.publishedRoots[index]}${safe.slice(sourceRoot.length)}`
  }
  return null
}
module.exports = { getPublicationLayout, mapSourceToPublished, assertSafeRelativePath }
```

Use the exact table above, require equal array lengths, and reject overlapping ownership.

- [ ] **Step 4: Split group ownership**

Reference groups expose `sourceOwnedPaths` and `publishedPaths`. Example:

```javascript
sourceOwnedPaths: ['reference-sources/python', 'config/generated/python.sidebar.js', 'plugins/lark-docs/meta/snapshots/pymilvus30-uat-last-success.json'],
publishedPaths: ['reference/api/python/python'],
```

Java and Go `publishedPaths` retain their active landing-page files in addition to the v2 tree. Guides sets `translate: false` and owns current Chinese outputs directly. `getGroupPaths()` returns `sourceOutputs`, `publicationOutputs`, `sidebars`, `snapshot`, and `translate`; remove i18n/preserved-English helpers.

- [ ] **Step 5: Test and commit**

```bash
node --test scripts/docs-workflow/publication-layout.test.js scripts/docs-workflow/content-groups.test.js scripts/docs-workflow/group-paths.test.js
git diff --check
git add scripts/docs-workflow/publication-layout.js scripts/docs-workflow/publication-layout.test.js scripts/docs-workflow/content-groups.js scripts/docs-workflow/content-groups.test.js scripts/docs-workflow/group-paths.js scripts/docs-workflow/group-paths.test.js
git commit -m "refactor: define Chinese publication layout"
```

Expected: PASS and one contract-only commit.

### Task 2: Redirect English generators to reference-sources

**Files:**

- Modify: `config/lark-docs.config.ts`
- Modify/test: `plugins/lark-docs/index.js`, `plugins/lark-docs/larkDocWriter.test.js`
- Modify/test: `scripts/docs-workflow/run-content-group.js`, `run-content-group.test.js`

- [ ] **Step 1: Add failing generator tests**

```javascript
const items = await writer.generate_sidebar('reference-sources/python/api/python/python', 'reference-sources/python')
assert.equal(findFirstDoc(items).id, 'api/python/python/example')
```

Require REST generation to include `-o reference-sources/rest/api/restful/restful`.

- [ ] **Step 2: Run and observe failure**

```bash
node --test plugins/lark-docs/larkDocWriter.test.js scripts/docs-workflow/run-content-group.test.js
```

Expected: FAIL on current `reference/` outputs.

- [ ] **Step 3: Add explicit logical sidebar roots**

Add `sidebarContentRoot?: string` to `TargetConfig` and use:

```javascript
const sidebarContentRoot = targetConfig.sidebarContentRoot ?? outputDir.split('/')[0]
const sidebarItems = await writer.generate_sidebar(outputDir, sidebarContentRoot)
```

Change active Zilliz Reference outputs to the Task 1 source roots, set `sidebarContentRoot` to `reference-sources/<group>`, remove `agents`, `javaV1`, and `gov1` exports, and pass the explicit REST output path.

- [ ] **Step 4: Test and commit**

```bash
node --test plugins/lark-docs/larkDocWriter.test.js scripts/docs-workflow/run-content-group.test.js
git diff --check
git add config/lark-docs.config.ts plugins/lark-docs/index.js plugins/lark-docs/larkDocWriter.test.js scripts/docs-workflow/run-content-group.js scripts/docs-workflow/run-content-group.test.js
git commit -m "refactor: store Reference sources outside build roots"
```

Expected: sidebar IDs retain existing `api/...` and `cli/...` identities.

### Task 3: Configure one locale, independent BYOC, and no Agents plugin

**Files:**

- Modify: `docusaurus.config.js`, `config/sidebar-generators.ts`, `scripts/common.js`
- Create/test: `sidebarsByoc.mjs`, `sidebarsByoc.test.js`
- Create: `scripts/validate-single-language-layout.js`, `validate-single-language-layout.test.js`, `.dockerignore`
- Delete: `sidebarsAgents.js`, `versions.json`, `versioned_sidebars/version-byoc-sidebars.json`

- [ ] **Step 1: Write and run a failing config validator**

Require `defaultLocale === 'zh-CN'`, `locales === ['zh-CN']`, BYOC `{path:'docs-byoc', routeBasePath:'docs/byoc'}`, no Agents plugin, no BYOC version, and no `reference-sources` plugin.

```bash
node --test scripts/validate-single-language-layout.test.js
```

Expected: FAIL on `zh-Hans`, BYOC versioning, and Agents.

- [ ] **Step 2: Update Docusaurus and sidebar transforms**

Set `i18n: { defaultLocale: 'zh-CN', locales: ['zh-CN'] }`. Remove default-docs versions. Add an independent docs plugin with `id: 'byoc'`, `path: 'docs-byoc'`, `routeBasePath: 'docs/byoc'`, and `sidebarPath: require.resolve('./sidebarsByoc.mjs')`. The adapter exports `{default: generatedSidebar}` and falls back to `[{type:'autogenerated', dirName:'tutorials'}]`. Remove Agents imports/plugin, Java/Go v1 transforms, and `agentsItemsGenerator()`.

- [ ] **Step 3: Remove stale roots and add Docker exclusions**

Remove `versioned_docs` and `docs-agents` from `scripts/common.js`. Create:

```text
.git
.claude/worktrees
build
node_modules
reference-sources
tmp
```

- [ ] **Step 4: Delete config-only legacy files, test, and commit**

```bash
node --test scripts/validate-single-language-layout.test.js sidebarsTutorial.test.js sidebarsByoc.test.js scripts/validate-generated-sidebars.test.js
node scripts/validate-single-language-layout.js
git diff --check
git add docusaurus.config.js config/sidebar-generators.ts scripts/common.js scripts/validate-single-language-layout.js scripts/validate-single-language-layout.test.js sidebarsByoc.mjs sidebarsByoc.test.js .dockerignore sidebarsAgents.js versions.json versioned_sidebars/version-byoc-sidebars.json
git commit -m "refactor: configure a single Chinese docs site"
```

Expected: no runtime `zh-Hans`, Agents plugin, or BYOC version registration.

### Task 4: Migrate current dev content fail-closed

**Files:**

- Create/test: `scripts/migrate-single-language-content.js`, `scripts/route-inventory.js`
- Create/update: `reference-sources/**`, `reference/**`
- Delete: manual plugin content under `i18n/zh-CN/**`, `versioned_docs/version-byoc/**`, `docs-agents/**`; retain UI message files such as `code.json` when present

- [ ] **Step 1: Write migration fixtures**

Assert English is copied to `reference-sources/<group>/...`, Chinese replaces the same final `reference/...` path, Java/Go v1 are removed, Guides ignore legacy i18n, UI message files are retained, and a missing active translation leaves that group byte-for-byte unchanged. Add route-inventory tests that normalize `/index.html`, sort routes, and ignore assets.

- [ ] **Step 2: Run and observe failure**

```bash
node --test scripts/migrate-single-language-content.test.js scripts/route-inventory.test.js
```

Expected: FAIL because the migration command is absent.

- [ ] **Step 3: Implement staged migration**

The command must reject symlinks; copy English before replacing `reference`; derive targets through `mapSourceToPublished()`; verify every active Markdown/MDX source has a legacy Chinese peer; stage each group under `fs.mkdtempSync()`; rename only after complete validation; explicitly retire Java/Go v1; leave `docs/` and `docs-byoc/` unchanged; and write counts plus SHA256s to a JSON report.

- [ ] **Step 4: Dry-run and capture old routes**

```bash
node scripts/migrate-single-language-content.js --dry-run --report tmp/single-language-migration.json
pnpm run build
node scripts/route-inventory.js --build build --output tmp/routes-before.json
```

Expected: zero active missing translations; only approved v1 roots are retired.

- [ ] **Step 5: Apply, validate, and commit content**

```bash
node scripts/migrate-single-language-content.js --write --report tmp/single-language-migration.json
node scripts/validate-single-language-layout.js
node --test scripts/migrate-single-language-content.test.js
git diff --check
git add -A reference-sources reference i18n versioned_docs docs-agents scripts/migrate-single-language-content.js scripts/migrate-single-language-content.test.js scripts/route-inventory.js scripts/route-inventory.test.js
git commit -m "docs: migrate Chinese content to final paths"
```

Expected: every active group has equal source/Chinese document counts and no published English fallback.

### Task 5: Rewrite translation manifests and coverage for final targets

**Files:**

- Modify/test: `scripts/translation/manifest.js`, `sourceDelta.js`, `applySourceDelta.js`, `batches.js`
- Modify/test: `scripts/validate-translated-coverage.js`

- [ ] **Step 1: Replace test fixtures with direct mappings**

```javascript
{
  sourcePath: 'reference-sources/python/api/python/python/a.md',
  targetPath: 'reference/api/python/python/a.md',
  sourceHash: 'a'.repeat(64), locale: 'zh-CN', type: 'reference', reason: 'current_delta',
}
```

Rename `deletedI18n`/`deleted_i18n` to `deletedTargets`/`deleted_targets`, and `oldI18nPath`/`newI18nPath` to `oldTargetPath`/`newTargetPath`.

- [ ] **Step 2: Run and observe failure**

```bash
node --test scripts/translation/manifest.test.js scripts/translation/sourceDelta.test.js scripts/translation/applySourceDelta.test.js scripts/translation/batches.test.js scripts/validate-translated-coverage.test.js
```

Expected: FAIL on hard-coded i18n mappings.

- [ ] **Step 3: Use group layouts everywhere**

Replace `sourceMappingsForLocale()` with `sourceMappingsForGroup(group)`. Guides must be rejected by the translation manifest. Cache entries include `sourceHash` and `targetPath`. Delta application rejects writes/deletes outside the selected group's `publishedRoots`.

- [ ] **Step 4: Strengthen coverage, test, and commit**

Coverage compares `sourceOutputs` to `publicationOutputs`, rejects missing/orphan files, and reports equal source/target SHA256 as `copiedEnglishTargets`. English-prose heuristics remain warnings for code-heavy API pages.

```bash
npm run test:translation
rg -n "docusaurus-plugin-content-docs-reference/current|deleted_i18n|oldI18nPath" scripts/translation scripts/validate-translated-coverage* || true
git diff --check
git add scripts/translation scripts/validate-translated-coverage.js scripts/validate-translated-coverage.test.js
git commit -m "refactor: translate Reference sources into final paths"
```

Expected: tests pass and the scan prints no runtime match.

### Task 6: Make checkpoints and staging group-atomic

**Files:**

- Modify/test: `scripts/docs-workflow/create-checkpoint-artifact.js`, `validate-checkpoint-artifact.js`, `prepare-content-group-workspace.js`
- Modify/test: `translation-batch-input.js`, `validate-translation-batch-outputs.js`, `translation-staging.js`, `translation-staging-publisher.js`, `translation-batch-set.js`, `apply-translation-batch.js`
- Modify/test: `scripts/docs-workflow/checkpoint-contention.test.js`

- [ ] **Step 1: Convert artifact tests**

Assert source artifacts contain only `sourceOwnedPaths`; translation artifacts contain only `publishedPaths` plus `.translation-cache/zh-CN.json`. Add independent Python/Java publication and same-group conflict cases.

The tests also require checkpoint schema version 3 to contain one immutable `baselineSha` instead of the old `masterSha` plus `devBaselineSha` pair. Translation batch inputs continue to carry their explicit `sourceCheckpointSha`.

- [ ] **Step 2: Run and observe failure**

```bash
node --test scripts/docs-workflow/create-checkpoint-artifact.test.js scripts/docs-workflow/validate-checkpoint-artifact.test.js scripts/docs-workflow/prepare-content-group-workspace.test.js scripts/docs-workflow/translation-batch-input.test.js scripts/docs-workflow/validate-translation-batch-outputs.test.js scripts/docs-workflow/translation-staging.test.js scripts/docs-workflow/translation-staging-publisher.test.js scripts/docs-workflow/translation-batch-set.test.js scripts/docs-workflow/apply-translation-batch.test.js scripts/docs-workflow/checkpoint-contention.test.js
```

Expected: FAIL because helpers still expand i18n roots.

- [ ] **Step 3: Centralize allowed artifact paths**

```javascript
function artifactOwnedPaths(groupName, stage) {
  const group = getContentGroup(groupName)
  if (stage === 'source') return group.sourceOwnedPaths
  if (stage === 'translation') return [...group.publishedPaths, '.translation-cache/zh-CN.json']
  throw new Error(`Unknown artifact stage: ${stage}`)
}
```

Remove fixed `TRANSLATION_ROOTS`. Bind staging plans to the selected group and allow mutations only inside its publication roots plus cache. Retain deterministic staging refs, fast-forward-only promotion, SHA leases, and trusted JSON evidence.

Update checkpoint creation, validation, publication, and recovery callers to accept `--baseline-sha`. Reject schema 1/2 artifacts in the new publication path with a clear migration error; do not silently reinterpret two-SHA artifacts.

- [ ] **Step 4: Run the suite and commit**

```bash
npm run test:docs-workflow
git diff --check
git add scripts/docs-workflow
git commit -m "refactor: publish Chinese groups atomically"
```

Expected: Python and Java commits survive independent contention; same-group conflicts never force-push.

### Task 7: Make GitHub Actions use one immutable target baseline

**Files:**

- Modify: `.github/workflows/fetch-docs.yml` and reusable docs workflows
- Modify/test: `scripts/validate-workflow-policy.js`
- Modify/test: `scripts/upstream/sync-workflows.js`

- [ ] **Step 1: Write and run failing policy tests**

Require no `restore-generated-state.sh`, no “immutable master tooling”, no Guides translation job, and direct checkout of `inputs.baseline_sha` or `inputs.final_dev_sha`.

```bash
npm run test:workflow-policy
```

Expected: FAIL on current master/content assembly assumptions.

- [ ] **Step 2: Resolve one baseline SHA**

Remove `tooling_ref` and resolve:

```bash
git fetch --no-tags origin "refs/heads/$TARGET_BRANCH:refs/remotes/origin/$TARGET_BRANCH"
baseline_sha=$(git rev-parse "refs/remotes/origin/$TARGET_BRANCH")
git cat-file -e "$baseline_sha^{commit}"
printf 'baseline_sha=%s\n' "$baseline_sha" >> "$GITHUB_OUTPUT"
```

Pass `baseline_sha` to producers. Feature validation uses its feature target branch so tooling and content are tested together.

- [ ] **Step 3: Remove overlay restoration and validate final roots**

Each reusable workflow checks out its immutable baseline/source/final SHA directly. `_verify-docs.yml` installs and validates in the `final_dev_sha` checkout. MDX checks iterate `getGroupPaths(GROUP).publicationOutputs`, and Reference coverage uses `--fail-on-pending`. Guides and BYOC never enter translation jobs.

- [ ] **Step 4: Preserve CN adaptations during upstream sync**

Update `sync-workflows.js` fixtures and transformations to require `baseline_sha`, direct publication roots, and absence of restore calls. Do not modify `../zdoc`.

- [ ] **Step 5: Test and commit**

```bash
npm run test:workflow-policy
node --test scripts/upstream/sync-workflows.test.js
npm run test:docs-workflow
git diff --check
git add .github/workflows scripts/validate-workflow-policy.js scripts/validate-workflow-policy.test.js scripts/upstream/sync-workflows.js scripts/upstream/sync-workflows.test.js
git commit -m "refactor: build docs from one immutable baseline"
```

Expected: workflows contain no generated-state restoration or document i18n roots.

### Task 8: Remove unreachable stale tooling

**Files:**

- Delete after caller scan: `scripts/restore-generated-state.sh`, `scripts/restore-generated-state.test.js`
- Delete/simplify after caller scan: Guides-only translation recovery and numbered-batch branches
- Modify: `package.json`, workflow-policy and upstream-sync tests

- [ ] **Step 1: Prove candidates are unreachable**

```bash
rg -n "restore-generated-state|validate-guides-translation-staging|recover-guides-translation|durableTranslationBatchSize" .github scripts package.json config
```

Expected: only candidate implementations/tests remain. Migrate any remaining runtime caller before deletion.

- [ ] **Step 2: Delete only proven stale code**

Remove the restore helper and Guides production translation recovery/batch code. Keep generic Reference checkpoint and staging helpers.

- [ ] **Step 3: Test and commit**

```bash
npm run test:translation
npm run test:docs-workflow
npm run test:workflow-policy
node --test scripts/upstream/sync-workflows.test.js
git diff --check
git add -A scripts package.json .github/workflows
git commit -m "refactor: remove stale Chinese overlay tooling"
```

Expected: all suites pass and no runtime caller references removed files.

### Task 9: Verify route parity and production image

**Files:**

- Modify/test: `scripts/route-inventory.js`
- Modify: `package.json`, `Dockerfile`, `default.conf` only if redirects are required

- [ ] **Step 1: Write route tests**

Normalize `/index.html`, sort routes, ignore assets, and allow only Java v1 and Go v1 removals. Every old `/docs/agents/**` route must exist in the new inventory or have an explicit Nginx redirect.

- [ ] **Step 2: Add acceptance commands**

```json
"validate:single-language": "node scripts/validate-single-language-layout.js",
"routes:inventory": "node scripts/route-inventory.js",
"verify:single-language": "npm run validate:single-language && node scripts/validate-generated-sidebars.js && npm run build"
```

- [ ] **Step 3: Build and compare routes**

```bash
node --test scripts/route-inventory.test.js
npm run verify:single-language
node scripts/route-inventory.js --build build --output tmp/routes-after.json
node scripts/route-inventory.js --compare tmp/routes-before.json --after tmp/routes-after.json --redirects default.conf
```

Expected: no `/zh-CN/`; BYOC remains `/docs/byoc/**`; Agents routes are served/redirected; only retired v1 routes disappear.

- [ ] **Step 4: Build and smoke-test with OrbStack**

```bash
docker build --network=host -t zdoc-cn-single-language:test .
docker run --rm -d --name zdoc-cn-single-language -p 18080:80 zdoc-cn-single-language:test
curl -fsS http://127.0.0.1:18080/docs/home >/dev/null
curl -fsS http://127.0.0.1:18080/docs/byoc/ >/dev/null
curl -fsS http://127.0.0.1:18080/reference/python >/dev/null
docker exec zdoc-cn-single-language sh -c 'test ! -e /usr/share/nginx/html/reference-sources'
docker stop zdoc-cn-single-language
```

Expected: smoke checks pass and the image contains no English source tree.

- [ ] **Step 5: Commit acceptance tooling**

```bash
git diff --check
git add scripts/route-inventory.js scripts/route-inventory.test.js package.json Dockerfile default.conf
git commit -m "test: verify single-language routes and image"
```

### Task 10: Full verification and feature-branch rehearsal

**Files:** Verify all changed files.

- [ ] **Step 1: Run the complete suite**

```bash
npm run test:translation
npm run test:docs-workflow
npm run test:workflow-policy
npm run test:cn-publish-normalizer
node --test plugins/lark-docs/*.test.js scripts/*.test.js scripts/upstream/*.test.js
npm run upstream:check-workflows
npm run verify:single-language
git diff --check
git status --short
```

Expected: all tests, the CN upstream-adaptation check, and the production build pass without modifying `../zdoc`.

- [ ] **Step 2: Scan forbidden runtime references**

```bash
rg -n "defaultLocale: 'zh-Hans'|locales: \['zh-Hans'|docs-agents|version-byoc|docusaurus-plugin-content-docs-reference/current|restore-generated-state" docusaurus.config.js config scripts .github package.json Dockerfile
```

Expected: no runtime matches.

- [ ] **Step 3: Record the rollback baseline**

```bash
git fetch origin dev
git rev-parse origin/dev
```

Expected: record the last directly buildable `dev` SHA before any feature-branch publication rehearsal.

- [ ] **Step 4: Push and run artifact-only rehearsal**

```bash
git push -u origin feat/single-language-publication
gh workflow run fetch-docs.yml --ref feat/single-language-publication -f group=all -f target_branch=feat/single-language-publication -f publish=false
```

Expected: all producers and final validation pass without publication.

- [ ] **Step 5: Run controlled group-publication rehearsal**

```bash
gh workflow run fetch-docs.yml --ref feat/single-language-publication -f group=all -f target_branch=feat/single-language-publication -f publish=true
```

Expected: groups publish independently; a failed group preserves prior Chinese output; aggregate status reports any failure; the branch remains directly buildable.

- [ ] **Step 6: Record the immutable SHA for Jenkins validation**

```bash
git fetch origin feat/single-language-publication
git rev-parse origin/feat/single-language-publication
```

Expected: a 40-character SHA handed to the coordinated `vdc-jenkins` plan.
