# Zdoc CN Assemble Workflow Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `zdoc_cn` from the legacy direct fetch workflow to a CN-owned adaptation of upstream `zdoc`'s artifact-based Guides assemble workflow, including a Chinese translation workflow for English reference docs.

**Architecture:** Keep the locked upstream overlay as the build-compatibility gate, but do not try to run production GitHub Actions from `.zdoc-assembled`. Production workflow files, reusable workflow files, `scripts/docs-workflow/**`, and `scripts/translation/**` become first-class files in `zdoc_cn`, adapted only where CN source IDs, storage, publish behavior, or localization paths differ. English reference docs remain the source of truth under `reference/**`; Chinese translations are generated and published under `i18n/zh-CN/docusaurus-plugin-content-docs-reference/current/**` through a locale-configurable translation workflow.

**Tech Stack:** GitHub Actions reusable workflows, Node.js CommonJS workflow helpers, Docusaurus/pnpm, `node:test`, shell scripts, existing Lark/Feishu credentials, and CN publish normalizer overlay tests.

---

## File Structure And Responsibilities

- Modify: `.github/workflows/fetch-lark-docs.yml`
  - Disable or replace the legacy scheduled direct-fetch workflow after the new artifact workflow is validated.
- Modify: `.github/workflows/fetch-lark-docs-manual.yml`
  - Disable or replace the legacy manual direct-fetch workflow after the new manual workflow is validated.
- Create: `.github/workflows/fetch-docs.yml`
  - CN production entrypoint adapted from `../zdoc/.github/workflows/fetch-docs.yml`.
- Create: `.github/workflows/_fetch-guides-sources.yml`
  - Fetch Guides source artifact, media cache, table matrix, and assembly decision.
- Create: `.github/workflows/_render-guides-table.yml`
  - Render Guides table artifacts in parallel.
- Create: `.github/workflows/_assemble-guides.yml`
  - Restore source/table artifacts, generate combined sidebars, validate output, and create Guides checkpoint.
- Create: `.github/workflows/_fetch-content-group.yml`
  - Fetch non-Guides groups after Guides artifact flow is proven.
- Create: `.github/workflows/_monitor-docs-progress.yml`
  - Update Feishu/Lark progress card from artifact workflow state.
- Create: `.github/workflows/_publish-content-group.yml`
  - Publish source checkpoints to the target branch.
- Create: `.github/workflows/_translate-content-group.yml`
  - Translate staged checkpoints.
- Create: `.github/workflows/_publish-translation-batches.yml`
  - Publish durable Guides translation batches.
- Create: `.github/workflows/_translate-publish-batch.yml`
  - Translate and publish one durable Guides batch.
- Create: `.github/workflows/_verify-docs.yml`
  - Final validation after publish/translation.
- Create: `.github/workflows/translate-reference-docs.yml`
  - Manual workflow for translating English reference groups into Chinese.
- Create: `scripts/docs-workflow/**`
  - Upstream workflow helper library and tests used by the reusable workflows.
- Create or Modify: `plugins/lark-docs/**`
  - Upstream Lark docs runtime required by artifact workflow helpers, preserving CN-only files where they still apply.
- Create or Modify: `scripts/validate-generated-sidebars.js`
  - Validate generated reference and Guides sidebars.
- Create or Modify: `scripts/run-doc-build-stage.js`
  - Run workflow build stages with controlled reporting/link-check behavior.
- Create or Modify: `scripts/promote-lark-doc-snapshot.js`
  - Promote validated Lark source snapshots into generated state.
- Create: `scripts/translation/**`
  - Upstream translation manifest, batching, source-delta, agent-runner, and reporting helpers adapted for `zh-CN`.
- Create or Modify: `scripts/validate-translated-coverage.js`
  - Verify Chinese translated reference coverage for selected content groups.
- Create or Modify: `scripts/validate-translated-coverage.test.js`
  - Regression tests for `zh-CN` translated reference coverage.
- Modify: `docusaurus.config.ts`
  - Register `zh-CN` as the translation locale if translated reference docs are served through Docusaurus i18n.
- Create or Modify: `scripts/restore-generated-state.sh`
  - Restore baseline generated docs, sidebars, snapshots, assembly descriptors, and reports.
- Create or Modify: `scripts/validate-workflow-policy.js`
  - CN workflow policy checks adapted from upstream with CN naming and storage requirements.
- Create or Modify: `scripts/validate-workflow-policy.test.js`
  - Regression tests for the CN workflow graph.
- Modify: `config/lark-docs.config.ts`
  - Align the CN `guides` manual with upstream's assemble-compatible config shape.
- Create: `config/generated/.gitkeep`
  - Keep generated sidebar directory present before first run.
- Create: `config/sidebar-overrides/guides.json`
  - CN SaaS Guides sidebar overrides.
- Create: `config/sidebar-overrides/guides-byoc.json`
  - CN BYOC Guides sidebar overrides.
- Create: `plugins/lark-docs/meta/snapshots/.gitkeep`
  - Keep snapshot directory present before first artifact run.
- Create: `plugins/lark-docs/meta/assembly/.gitkeep`
  - Keep assembly descriptor directory present before first artifact run.
- Create: `plugins/lark-docs/meta/reports/.gitkeep`
  - Keep report directory present before first artifact run.
- Create: `i18n/zh-CN/.gitkeep`
  - Keep the Chinese Docusaurus locale root present before first translation run.
- Create: `.translation-cache/zh-CN.json`
  - Track source hashes for Chinese translation freshness.
- Modify: `package.json`
  - Add workflow-policy, docs-workflow, and translation test scripts.

## Task 1: Freeze The Current Overlay Gate

**Files:**
- Modify: `.github/workflows/locked-upstream-overlay.yml`
- Modify: `scripts/upstream/validate-overlay.test.js`

- [x] **Step 1: Add an assertion that production workflows are not copied by overlay**

Append this test to `scripts/upstream/validate-overlay.test.js`:

```js
test('production docs workflows stay first-class in zdoc_cn', () => {
  const blocked = [
    ['.github/workflows/_assemble-guides.yml', '.github/workflows/_assemble-guides.yml'],
    ['scripts/docs-workflow', 'scripts/docs-workflow'],
  ];

  for (const [from, to] of blocked) {
    assert.throws(
      () => validateOverlayManifest({ compatibility: 1, copy: [{ from, to }], patches: [] }),
      /blocked|not allowlisted/,
      `${from} must not be introduced through overlay-manifest.json`,
    );
  }
});
```

- [x] **Step 2: Run the overlay tests**

Run:

```bash
node --test scripts/upstream/*.test.js
```

Expected: all overlay/materialize/assemble tests pass.

- [x] **Step 3: Verify the assembled build gate still passes**

Run:

```bash
npm run upstream:materialize
npm run assemble
node scripts/upstream/validate-assembled.js
pnpm --dir .zdoc-assembled install --frozen-lockfile
pnpm --dir .zdoc-assembled run build
```

Expected: commands exit `0`. Docusaurus broken-link warnings are acceptable at this stage because the current assembled build already emits them and still succeeds.

- [x] **Step 4: Commit**

Run:

```bash
git add .github/workflows/locked-upstream-overlay.yml scripts/upstream/validate-overlay.test.js
git commit -m "test(overlay): keep production workflows outside overlay"
```

## Task 2: Port Upstream Workflow Helpers As First-Class CN Files

**Files:**
- Create: `scripts/docs-workflow/**`
- Create or Modify: `plugins/lark-docs/**`
- Create or Modify: `scripts/restore-generated-state.sh`
- Create or Modify: `scripts/restore-generated-state.test.js`
- Create or Modify: `scripts/validate-generated-sidebars.js`
- Create or Modify: `scripts/validate-generated-sidebars.test.js`
- Create or Modify: `scripts/run-doc-build-stage.js`
- Create or Modify: `scripts/run-doc-build-stage.test.js`
- Create or Modify: `scripts/promote-lark-doc-snapshot.js`
- Create or Modify: `scripts/promote-lark-doc-snapshot.test.js`
- Create or Modify: `scripts/validate-guides-coverage.js`
- Create or Modify: `scripts/validate-guides-coverage.test.js`
- Create or Modify: `scripts/validate-guides-source-contract.js`
- Create or Modify: `scripts/validate-guides-source-contract.test.js`
- Create or Modify: `scripts/validate-workflow-policy.js`
- Create or Modify: `scripts/validate-workflow-policy.test.js`
- Modify: `package.json`

- [x] **Step 1: Copy helper files from the locked upstream checkout**

Run:

```bash
cp -R ../zdoc/scripts/docs-workflow scripts/docs-workflow
cp ../zdoc/scripts/restore-generated-state.sh scripts/restore-generated-state.sh
cp ../zdoc/scripts/validate-workflow-policy.js scripts/validate-workflow-policy.js
cp ../zdoc/scripts/validate-workflow-policy.test.js scripts/validate-workflow-policy.test.js
```

Expected: `scripts/docs-workflow/guides-assembly-identity.js`, `scripts/docs-workflow/generate-guides-sidebars.js`, and their tests exist in `zdoc_cn`.

- [x] **Step 2: Port the upstream Lark docs runtime and root workflow scripts**

Run:

```bash
cp ../zdoc/plugins/lark-docs/*.js plugins/lark-docs/
cp ../zdoc/plugins/lark-docs/*.test.js plugins/lark-docs/
cp ../zdoc/scripts/restore-generated-state.test.js scripts/restore-generated-state.test.js
cp ../zdoc/scripts/validate-generated-sidebars.js scripts/validate-generated-sidebars.js
cp ../zdoc/scripts/validate-generated-sidebars.test.js scripts/validate-generated-sidebars.test.js
cp ../zdoc/scripts/run-doc-build-stage.js scripts/run-doc-build-stage.js
cp ../zdoc/scripts/run-doc-build-stage.test.js scripts/run-doc-build-stage.test.js
cp ../zdoc/scripts/promote-lark-doc-snapshot.js scripts/promote-lark-doc-snapshot.js
cp ../zdoc/scripts/promote-lark-doc-snapshot.test.js scripts/promote-lark-doc-snapshot.test.js
cp ../zdoc/scripts/validate-guides-coverage.js scripts/validate-guides-coverage.js
cp ../zdoc/scripts/validate-guides-coverage.test.js scripts/validate-guides-coverage.test.js
cp ../zdoc/scripts/validate-guides-source-contract.js scripts/validate-guides-source-contract.js
cp ../zdoc/scripts/validate-guides-source-contract.test.js scripts/validate-guides-source-contract.test.js
```

Expected: `plugins/lark-docs/index.js` exports `generateSidebarTargets` and `writeSidebarPairTransactional`. CN-only files such as `plugins/lark-docs/larkSlugify.js` and `plugins/lark-docs/larkDocWriter.faqs.cn.test.js` remain present unless a later test proves they are obsolete. CN media upload remains Ali OSS-backed even though the upstream writer-facing method is named `__uploadToS3`; workflow adaptation must likewise use `OSS_*` secrets instead of upstream `AWS_*` secrets.

- [x] **Step 3: Add workflow test scripts**

Modify `package.json` scripts to include:

```json
"test:workflow-policy": "node --test scripts/validate-workflow-policy.test.js",
"test:docs-workflow": "node --test scripts/docs-workflow/*.test.js"
```

Keep existing scripts unchanged.

- [x] **Step 4: Run helper tests and capture first failures**

Run:

```bash
node --test scripts/docs-workflow/guides-assembly-identity.test.js scripts/docs-workflow/generate-guides-sidebars.test.js
node --test scripts/validate-workflow-policy.test.js
```

Expected before adaptation: tests may fail because `.github/workflows/fetch-docs.yml` and reusable workflows are not present yet. Any failure about missing workflow files is acceptable in this task; syntax/runtime errors in helper scripts are not acceptable.

- [x] **Step 5: Commit**

Run:

```bash
git add package.json plugins/lark-docs scripts/docs-workflow scripts/restore-generated-state.sh scripts/restore-generated-state.test.js scripts/validate-generated-sidebars.js scripts/validate-generated-sidebars.test.js scripts/run-doc-build-stage.js scripts/run-doc-build-stage.test.js scripts/promote-lark-doc-snapshot.js scripts/promote-lark-doc-snapshot.test.js scripts/validate-guides-coverage.js scripts/validate-guides-coverage.test.js scripts/validate-guides-source-contract.js scripts/validate-guides-source-contract.test.js scripts/validate-workflow-policy.js scripts/validate-workflow-policy.test.js
git commit -m "chore(ci): port docs workflow helpers"
```

## Task 3: Add The CN Workflow Graph In Manual Artifact-Only Mode

**Files:**
- Create: `.github/workflows/fetch-docs.yml`
- Create: `.github/workflows/_fetch-guides-sources.yml`
- Create: `.github/workflows/_render-guides-table.yml`
- Create: `.github/workflows/_assemble-guides.yml`
- Create: `.github/workflows/_fetch-content-group.yml`
- Create: `.github/workflows/_monitor-docs-progress.yml`
- Create: `.github/workflows/_publish-content-group.yml`
- Create: `.github/workflows/_translate-content-group.yml`
- Create: `.github/workflows/_prepare-translation-batches.yml`
- Create: `.github/workflows/_publish-translation-batches.yml`
- Create: `.github/workflows/_translate-publish-batch.yml`
- Create: `.github/workflows/_verify-docs.yml`
  - Create: `.github/workflows/translate-codex.yml`
- Modify: `scripts/validate-workflow-policy.js`
- Modify: `scripts/validate-workflow-policy.test.js`

- [x] **Step 1: Copy upstream workflows**

Run:

```bash
cp ../zdoc/.github/workflows/fetch-docs.yml .github/workflows/fetch-docs.yml
cp ../zdoc/.github/workflows/_fetch-guides-sources.yml .github/workflows/_fetch-guides-sources.yml
cp ../zdoc/.github/workflows/_render-guides-table.yml .github/workflows/_render-guides-table.yml
cp ../zdoc/.github/workflows/_assemble-guides.yml .github/workflows/_assemble-guides.yml
cp ../zdoc/.github/workflows/_fetch-content-group.yml .github/workflows/_fetch-content-group.yml
cp ../zdoc/.github/workflows/_monitor-docs-progress.yml .github/workflows/_monitor-docs-progress.yml
cp ../zdoc/.github/workflows/_publish-content-group.yml .github/workflows/_publish-content-group.yml
cp ../zdoc/.github/workflows/_translate-content-group.yml .github/workflows/_translate-content-group.yml
cp ../zdoc/.github/workflows/_prepare-translation-batches.yml .github/workflows/_prepare-translation-batches.yml
cp ../zdoc/.github/workflows/_publish-translation-batches.yml .github/workflows/_publish-translation-batches.yml
cp ../zdoc/.github/workflows/_translate-publish-batch.yml .github/workflows/_translate-publish-batch.yml
cp ../zdoc/.github/workflows/_verify-docs.yml .github/workflows/_verify-docs.yml
cp ../zdoc/.github/workflows/translate-codex.yml .github/workflows/translate-codex.yml
```

- [x] **Step 2: Make `fetch-docs.yml` manual-only during migration**

In `.github/workflows/fetch-docs.yml`, remove the scheduled trigger block:

```yaml
  schedule:
    - cron: "0 2,10,18 * * *"
```

Set the manual default to artifact-only:

```yaml
      publish:
        description: Publish and translate produced artifacts
        type: boolean
        default: false
```

- [x] **Step 3: Rename the workflow for CN**

Change the workflow name at the top of `.github/workflows/fetch-docs.yml`:

```yaml
name: fetch CN docs
```

Change the concurrency group:

```yaml
concurrency:
  group: cn-docs-production-dev
  cancel-in-progress: false
```

- [x] **Step 4: Replace upstream AWS variables with CN Ali OSS variables**

Replace `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_BUCKET`, and `AWS_REGION` with `OSS_ACCESS_KEY_ID`, `OSS_ACCESS_KEY_SECRET`, `OSS_BUCKET`, `OSS_REGION`, and `OSS_ENDPOINT` where media upload credentials are passed to Guides source/media jobs. `zdoc_cn` uses Ali OSS; do not add AWS dependencies or AWS secrets.

- [x] **Step 5: Run workflow policy tests**

Run:

```bash
node --test scripts/validate-workflow-policy.test.js
```

Expected: tests fail only on intentional CN differences, such as workflow name, schedule removal, default publish mode, or OSS secret names.

- [x] **Step 6: Adapt policy tests for CN migration mode**

Modify `scripts/validate-workflow-policy.test.js` so it accepts:

```js
assert.match(fs.readFileSync('.github/workflows/fetch-docs.yml', 'utf8'), /^name: fetch CN docs$/m);
assert.doesNotMatch(fs.readFileSync('.github/workflows/fetch-docs.yml', 'utf8'), /^\s+schedule:/m);
assert.match(fs.readFileSync('.github/workflows/fetch-docs.yml', 'utf8'), /default: false/);
```

Do not remove existing checks for `_assemble-guides.yml`, `assembly_decision_sha256`, reusable workflow wiring, or final verification.

- [x] **Step 7: Run policy tests again**

Run:

```bash
node --test scripts/validate-workflow-policy.test.js
```

Expected: workflow policy tests pass.

- [x] **Step 8: Commit**

Run:

```bash
git add .github/workflows scripts/validate-workflow-policy.js scripts/validate-workflow-policy.test.js
git commit -m "ci: add manual CN docs artifact workflow"
```

## Task 4: Reconcile CN Guides Config With Assemble Requirements

**Files:**
- Modify: `config/lark-docs.config.ts`
- Create: `config/generated/.gitkeep`
- Create: `config/sidebar-overrides/guides.json`
- Create: `config/sidebar-overrides/guides-byoc.json`

- [x] **Step 1: Replace the experimental `newGuides` block**

In `config/lark-docs.config.ts`, remove the `newGuides` export and make `guides` use the assemble-compatible shape:

```ts
const guides: Manual = {
    root: 'XyeFwdx6kiK9A6kq3yIcLNdEnDd',
    base: 'I6YUb1M0JajHrqsJGcLcZNh7neP:*',
    sourceType: 'wiki',
    displayedSidebar: 'default',
    docSourceDir: './plugins/lark-docs/meta/sources/guides',
    sidebarPath: './config/generated/guides.sidebar.js',
    overridePath: './config/sidebar-overrides/guides.json',
    contentRoot: 'docs',
    targets: {
        zilliz: {
            saas: {
                outputDir: 'docs/tutorials',
                imageDir: 'static/img',
            },
            paas: {
                outputDir: 'docs-byoc/tutorials',
                imageDir: 'static/img',
                sidebarPath: './config/generated/guides-byoc.sidebar.js',
                overridePath: './config/sidebar-overrides/guides-byoc.json',
            },
        },
    },
}
```

Do not keep the old `versioned_docs/version-byoc/tutorials` output for Guides assembly. The upstream assemble workflow validates `docs-byoc/tutorials`.

- [x] **Step 2: Keep `guides` as the exported manual name**

Ensure the export block contains `guides` and does not contain `newGuides`:

```ts
export default {
    guides,
```

- [x] **Step 3: Add empty sidebar override files**

Create `config/sidebar-overrides/guides.json`:

```json
{}
```

Create `config/sidebar-overrides/guides-byoc.json`:

```json
{}
```

- [x] **Step 4: Add generated directory marker**

Create `config/generated/.gitkeep` as an empty file.

- [x] **Step 5: Run config-dependent tests**

Run:

```bash
node --test scripts/docs-workflow/generate-guides-sidebars.test.js scripts/docs-workflow/guides-assembly-identity.test.js
```

Expected: both tests pass.

- [x] **Step 6: Commit**

Run:

```bash
git add config/lark-docs.config.ts config/generated/.gitkeep config/sidebar-overrides/guides.json config/sidebar-overrides/guides-byoc.json
git commit -m "config(guides): align CN guides with assembly workflow"
```

## Task 5: Bootstrap Generated-State Directories

**Files:**
- Create: `plugins/lark-docs/meta/snapshots/.gitkeep`
- Create: `plugins/lark-docs/meta/assembly/.gitkeep`
- Create: `plugins/lark-docs/meta/reports/.gitkeep`
- Modify: `scripts/restore-generated-state.sh`
- Modify: `scripts/restore-generated-state.test.js`

- [x] **Step 1: Create metadata directories**

Run:

```bash
mkdir -p plugins/lark-docs/meta/snapshots plugins/lark-docs/meta/assembly plugins/lark-docs/meta/reports
touch plugins/lark-docs/meta/snapshots/.gitkeep plugins/lark-docs/meta/assembly/.gitkeep plugins/lark-docs/meta/reports/.gitkeep
```

- [x] **Step 2: Verify restore script includes assembly and reports**

Confirm `scripts/restore-generated-state.sh` contains these paths:

```bash
  "config/generated"
  "plugins/lark-docs/meta/snapshots"
  "plugins/lark-docs/meta/assembly"
  "plugins/lark-docs/meta/reports"
```

- [x] **Step 3: Run restore-generated-state tests**

Run:

```bash
node --test scripts/restore-generated-state.test.js
```

Expected: tests pass. If `scripts/restore-generated-state.test.js` was not copied by Task 2, copy it from upstream with:

```bash
cp ../zdoc/scripts/restore-generated-state.test.js scripts/restore-generated-state.test.js
```

Then rerun the test.

- [x] **Step 4: Commit**

Run:

```bash
git add plugins/lark-docs/meta/snapshots/.gitkeep plugins/lark-docs/meta/assembly/.gitkeep plugins/lark-docs/meta/reports/.gitkeep scripts/restore-generated-state.sh scripts/restore-generated-state.test.js
git commit -m "chore(ci): bootstrap generated docs state"
```

## Task 6: Adapt CN Storage And Secret Mapping

**Files:**
- Modify: `.github/workflows/_fetch-guides-sources.yml`
- Modify: `.github/workflows/fetch-docs.yml`
- Modify: `scripts/docs-workflow/guides-media-prefetch.js`
- Modify: `scripts/docs-workflow/guides-media-prefetch.test.js`

- [x] **Step 1: Keep media storage Ali OSS-only for `zdoc_cn`**

Confirmed from `.env` and the existing legacy workflows: `zdoc_cn` uses Ali OSS, not AWS S3. Keep `plugins/lark-docs/larkImageDownloader.js` backed by `ali-oss`; do not add AWS packages or AWS secret wiring.

- [x] **Step 2: Pass CN OSS variables through `_fetch-guides-sources.yml` and `_fetch-content-group.yml`**

In `.github/workflows/_fetch-guides-sources.yml` and `.github/workflows/_fetch-content-group.yml`, pass these variables to source/media jobs:

```yaml
          OSS_ACCESS_KEY_ID: ${{ secrets.OSS_ACCESS_KEY_ID }}
          OSS_ACCESS_KEY_SECRET: ${{ secrets.OSS_ACCESS_KEY_SECRET }}
          OSS_ENDPOINT: ${{ vars.OSS_ENDPOINT }}
          OSS_BUCKET: ${{ vars.OSS_BUCKET }}
          OSS_REGION: ${{ vars.OSS_REGION }}
```

- [x] **Step 3: Keep `MODEL_API_KEY` wired**

Confirm `.github/workflows/fetch-docs.yml` passes this secret to `produce_guides_sources`:

```yaml
      MODEL_API_KEY: ${{ secrets.MODEL_API_KEY }}
```

- [x] **Step 4: Run targeted tests**

Run:

```bash
node --test scripts/docs-workflow/guides-media-prefetch.test.js
node --test plugins/lark-docs/larkImageDownloader.test.js
node --test scripts/validate-workflow-policy.test.js
```

Expected: both tests pass.

- [x] **Step 5: Commit**

No separate commit required if already covered by Task 2 and Task 3 commits.

## Task 7: Run Local Workflow Verification

**Files:**
- Modify only files required by failing tests.

- [x] **Step 1: Run the workflow helper test suite**

Run:

```bash
node --test scripts/docs-workflow/*.test.js
```

Expected: all tests pass.

- [x] **Step 2: Run workflow policy tests**

Run:

```bash
npm run test:workflow-policy
```

Expected: all workflow policy tests pass.

- [x] **Step 3: Run existing overlay tests**

Run:

```bash
node --test scripts/upstream/*.test.js
npm run test:cn-publish-normalizer
```

Expected: all tests pass.

- [x] **Step 4: Run assembled build verification**

Run:

```bash
npm run upstream:materialize
npm run assemble
node scripts/upstream/validate-assembled.js
pnpm --dir .zdoc-assembled install --frozen-lockfile
pnpm --dir .zdoc-assembled run build
node scripts/verify-cn-publish-artifacts.js .zdoc-assembled/build
```

Expected: all commands exit `0`. Docusaurus broken-link warnings are acceptable unless the build exits nonzero.

- [x] **Step 5: Commit fixes from verification**

Run:

```bash
git add .github/workflows scripts config package.json plugins/lark-docs/meta
git commit -m "test(ci): verify CN assemble workflow migration"
```

Skip this commit if there were no changes after Task 6.

## Task 8: Add Chinese Reference Translation Workflow

**Files:**
- Create: `.github/workflows/translate-reference-docs.yml`
- Create: `scripts/translation/**`
- Create or Modify: `scripts/validate-translated-coverage.js`
- Create or Modify: `scripts/validate-translated-coverage.test.js`
- Modify: `.github/workflows/_translate-content-group.yml`
- Modify: `.github/workflows/_publish-content-group.yml`
- Modify: `.github/workflows/_translate-publish-batch.yml`
- Modify: `.github/workflows/_verify-docs.yml`
- Modify: `scripts/docs-workflow/apply-translation-batch.js`
- Modify: `scripts/docs-workflow/translation-batch-input.js`
- Modify: `scripts/docs-workflow/validate-guides-translation-staging.js`
- Modify: `scripts/translation/applySourceDelta.js`
- Modify: `scripts/translation/manifest.js`
- Modify: `docusaurus.config.ts`
- Create: `i18n/zh-CN/.gitkeep`
- Create: `.translation-cache/zh-CN.json`
- Modify: `package.json`

- [x] **Step 1: Copy upstream translation files**

Run:

```bash
cp -R ../zdoc/scripts/translation scripts/translation
cp ../zdoc/scripts/validate-translated-coverage.js scripts/validate-translated-coverage.js
cp ../zdoc/scripts/validate-translated-coverage.test.js scripts/validate-translated-coverage.test.js
cp ../zdoc/.github/workflows/translate-codex.yml .github/workflows/translate-reference-docs.yml
```

Expected: `scripts/translation/manifest.js`, `scripts/translation/agentRunner.js`, and `.github/workflows/translate-reference-docs.yml` exist.

- [x] **Step 2: Rename and scope the translation workflow to reference groups**

Replace the top of `.github/workflows/translate-reference-docs.yml` with:

```yaml
name: translate reference docs to Chinese

on:
  workflow_dispatch:
    inputs:
      group:
        description: Reference content group to translate
        required: true
        type: choice
        default: python
        options: [python, java, node, go, cli, rest]
      max_files: { description: Maximum files, required: false, default: '500' }
      target_branch: { description: Publication branch, required: false, default: dev }
      locale: { description: Translation locale, required: false, default: zh-CN }
```

Remove the legacy `include_reference` input. This workflow is reference-only by design.

- [x] **Step 3: Pass `zh-CN` through the reusable translation workflow**

In `.github/workflows/translate-reference-docs.yml`, pass the locale input to `_translate-content-group.yml`:

```yaml
    with:
      group: ${{ inputs.group }}
      source_commit_sha: ${{ needs.prepare.outputs.source_sha }}
      master_sha: ${{ needs.prepare.outputs.master_sha }}
      should_translate: true
      max_files: ${{ inputs.max_files }}
      translation_locale: ${{ inputs.locale }}
```

Use this publish validation command:

```yaml
      validate_command: 'node "$GITHUB_WORKSPACE/scripts/validate-generated-sidebars.js" && node "$GITHUB_WORKSPACE/scripts/validate-translated-coverage.js" --group "${{ inputs.group }}" --locale "${{ inputs.locale }}"'
```

- [x] **Step 4: Add locale input to `_translate-content-group.yml`**

In `.github/workflows/_translate-content-group.yml`, add this workflow input:

```yaml
      translation_locale: { required: false, type: string, default: zh-CN }
```

Replace every hard-coded `ja-JP` in shell paths and commands with `$TRANSLATION_LOCALE` or `${{ inputs.translation_locale }}`. The key replacements are:

```bash
test -f ".translation-cache/$TRANSLATION_LOCALE.json" || printf '{"files":{}}\n' > ".translation-cache/$TRANSLATION_LOCALE.json"
node scripts/translation/manifest.js --locale "$TRANSLATION_LOCALE" --output tmp/translation-manifest.json --max-files "${{ inputs.max_files }}" --group "$GROUP" --source-checkpoint-sha "$SOURCE_COMMIT_SHA" --source-delta tmp/source-delta.json "${batch_args[@]}"
test ! -d "i18n/$TRANSLATION_LOCALE/docusaurus-plugin-content-docs-reference/current" || npx docusaurus mdx-parse -d "i18n/$TRANSLATION_LOCALE/docusaurus-plugin-content-docs-reference/current"
node scripts/validate-translated-coverage.js --group "$GROUP" --locale "$TRANSLATION_LOCALE"
```

Set the environment:

```yaml
          TRANSLATION_LOCALE: ${{ inputs.translation_locale }}
```

- [x] **Step 5: Make translation helpers locale-configurable**

In `scripts/docs-workflow/apply-translation-batch.js`, replace:

```js
const CACHE_PATH = '.translation-cache/ja-JP.json'
```

with:

```js
function cachePathForLocale(locale = process.env.TRANSLATION_LOCALE || 'zh-CN') {
  if (!/^[a-z]{2}(?:-[A-Z]{2})?$/.test(locale)) throw new Error(`Invalid translation locale: ${locale}`)
  return `.translation-cache/${locale}.json`
}
```

Then use `cachePathForLocale()` wherever the cache path is read or written.

In `scripts/translation/applySourceDelta.js`, replace:

```js
const CACHE_PATH = '.translation-cache/ja-JP.json'
const I18N_PREFIX = 'i18n/ja-JP/'
```

with:

```js
const DEFAULT_LOCALE = process.env.TRANSLATION_LOCALE || 'zh-CN'
const CACHE_PATH = `.translation-cache/${DEFAULT_LOCALE}.json`
const I18N_PREFIX = `i18n/${DEFAULT_LOCALE}/`
```

In `scripts/translation/manifest.js`, change the CLI default from:

```js
const locale = args.get('--locale') || process.env.TRANSLATION_LOCALE || 'ja-JP'
```

to:

```js
const locale = args.get('--locale') || process.env.TRANSLATION_LOCALE || 'zh-CN'
```

- [x] **Step 6: Update translation batch validation for `zh-CN`**

In `scripts/docs-workflow/translation-batch-input.js`, replace hard-coded locale validation that rejects `zh-CN` with validation against the manifest locale:

```js
function assertSupportedLocale(locale) {
  if (locale !== 'zh-CN') throw new Error(`Unsupported translation locale: ${locale}`)
}
```

Call `assertSupportedLocale(manifest.locale)` before validating target paths.

Target paths must be under one of:

```text
i18n/zh-CN/docusaurus-plugin-content-docs/current/tutorials
i18n/zh-CN/docusaurus-plugin-content-docs-byoc/current/tutorials
i18n/zh-CN/docusaurus-plugin-content-docs-reference/current
```

- [x] **Step 7: Add Chinese translation cache and locale root**

Create `i18n/zh-CN/.gitkeep` as an empty file.

Create `.translation-cache/zh-CN.json`:

```json
{"files":{}}
```

- [x] **Step 8: Register `zh-CN` in Docusaurus**

In `docusaurus.config.ts`, ensure the i18n config contains `zh-CN`:

```ts
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'zh-CN'],
},
```

If the repo intentionally uses Chinese as the default locale instead of Docusaurus i18n, keep `defaultLocale` unchanged and add `zh-CN` to `locales`. Do not keep `ja-JP` unless this repo still publishes Japanese pages.

- [x] **Step 9: Add translation test script**

Modify `package.json` scripts to include:

```json
"test:translation": "node scripts/translation/manifest.test.js && node scripts/translation/agentRunner.test.js && node --test scripts/translation/chunker.test.js scripts/translation/reportSummary.test.js scripts/translation/workflowReporting.test.js scripts/validate-translated-coverage.test.js"
```

Keep existing scripts unchanged.

- [x] **Step 10: Update tests from `ja-JP` to `zh-CN`**

In these test files, replace `ja-JP` expectations with `zh-CN` expectations where the test is validating this repo's default translation locale:

```text
scripts/translation/manifest.test.js
scripts/translation/batches.test.js
scripts/translation/sourceDelta.test.js
scripts/docs-workflow/apply-checkpoint-artifact.test.js
scripts/docs-workflow/apply-translation-batch.test.js
scripts/docs-workflow/translation-batch-input.test.js
scripts/docs-workflow/validate-guides-translation-staging.test.js
scripts/validate-translated-coverage.test.js
```

Keep tests that intentionally prove non-`zh-CN` locales are rejected, and update their expected error text to `Unsupported translation locale`.

- [x] **Step 11: Run translation tests**

Run:

```bash
npm run test:translation
node --test scripts/docs-workflow/apply-translation-batch.test.js scripts/docs-workflow/translation-batch-input.test.js scripts/docs-workflow/validate-guides-translation-staging.test.js
```

Expected: tests pass and generated manifests target `i18n/zh-CN/docusaurus-plugin-content-docs-reference/current/**` for reference groups.

- [x] **Step 12: Run workflow policy tests**

Run:

```bash
node --test scripts/validate-workflow-policy.test.js
```

Expected: tests pass and assert that `translate-reference-docs.yml` only exposes reference groups: `python`, `java`, `node`, `go`, `cli`, and `rest`.

- [x] **Step 13: Commit**

Run:

```bash
git add .github/workflows/translate-reference-docs.yml .github/workflows/_translate-content-group.yml .github/workflows/_publish-content-group.yml .github/workflows/_translate-publish-batch.yml .github/workflows/_verify-docs.yml scripts/translation scripts/docs-workflow scripts/validate-translated-coverage.js scripts/validate-translated-coverage.test.js docusaurus.config.ts i18n/zh-CN/.gitkeep .translation-cache/zh-CN.json package.json
git commit -m "ci(translation): add Chinese reference translation workflow"
```

## Task 9: Perform Manual GitHub Dry Run

**Files:**
- No code files unless the dry run finds a real defect.

- [ ] **Step 1: Push a branch**

Run:

```bash
git push origin HEAD
```

- [ ] **Step 2: Start a manual artifact-only Guides run**

Use GitHub Actions UI for `.github/workflows/fetch-docs.yml` with:

```text
group: guides
artifact_retention_days: 3
target_branch: dev
publish: false
tooling_ref: <current branch name>
```

Expected: `prepare`, `produce_guides_sources`, optional `render_guides_tables`, and `produce_guides` complete. Publish and translation jobs should be skipped because `publish=false`.

- [ ] **Step 3: Start a manual Chinese reference translation dry run**

Use GitHub Actions UI for `.github/workflows/translate-reference-docs.yml` with:

```text
group: python
max_files: 5
target_branch: ci/reference-translation-dry-run
locale: zh-CN
```

Expected: translation manifest is created from English files under `reference/api/python/python/**`, translated files are written under `i18n/zh-CN/docusaurus-plugin-content-docs-reference/current/api/python/python/**`, and `.translation-cache/zh-CN.json` is updated in the artifact.

- [ ] **Step 4: Inspect artifacts**

Confirm these artifacts exist:

```text
guides-sources-<run_id>
docs-checkpoint-guides-<run_id>
docs-checkpoint-guides-<run_id>-reports
translation-checkpoint-python-<run_id>
translation-baseline-python-<run_id>
```

Confirm reports include:

```text
plugins/lark-docs/meta/reports/guides-assembly-decision.json
plugins/lark-docs/meta/reports/guides-assembly-result.json
```

- [ ] **Step 5: Fix any dry-run defects**

For each defect, add or adjust a focused test first, then make the smallest workflow/helper change that fixes it.

- [ ] **Step 6: Commit dry-run fixes**

Run:

```bash
git add .github/workflows scripts config package.json
git commit -m "fix(ci): pass CN guides artifact dry run"
```

Skip this commit if the dry run passed without changes.

## Task 10: Retire Legacy Fetch Workflows

**Files:**
- Modify: `.github/workflows/fetch-lark-docs.yml`
- Modify: `.github/workflows/fetch-lark-docs-manual.yml`
- Modify: `.github/workflows/fetch-docs.yml`

- [x] **Step 1: Disable legacy scheduled workflow**

Replace `.github/workflows/fetch-lark-docs.yml` with:

```yaml
name: legacy fetch lark docs disabled
on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  disabled:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Legacy direct fetch workflow is disabled. Use fetch CN docs."
```

- [x] **Step 2: Disable legacy manual workflow**

Replace `.github/workflows/fetch-lark-docs-manual.yml` with:

```yaml
name: legacy fetch lark docs manual disabled
on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  disabled:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Legacy direct fetch workflow is disabled. Use fetch CN docs."
```

- [ ] **Step 3: Restore schedule for the new workflow after dry-run success**

In `.github/workflows/fetch-docs.yml`, add the CN schedule:

```yaml
  schedule:
    - cron: "0 6,14,22 * * *"
```

Keep `publish` default as `false` until one scheduled artifact-only run succeeds. Change it to `true` in a separate rollout after publishing is verified.

- [ ] **Step 4: Run policy tests**

Run:

```bash
node --test scripts/validate-workflow-policy.test.js
```

Expected: tests pass with legacy workflows disabled and the new scheduled artifact workflow enabled.

- [ ] **Step 5: Commit**

Run:

```bash
git add .github/workflows/fetch-lark-docs.yml .github/workflows/fetch-lark-docs-manual.yml .github/workflows/fetch-docs.yml scripts/validate-workflow-policy.test.js
git commit -m "ci: retire legacy CN docs fetch workflow"
```

## Task 11: Enable Publishing In A Separate Rollout

**Files:**
- Modify: `.github/workflows/fetch-docs.yml`
- Modify: `.github/workflows/_publish-content-group.yml`
- Modify: `.github/workflows/_translate-content-group.yml`
- Modify: `.github/workflows/_publish-translation-batches.yml`
- Modify: `.github/workflows/_translate-publish-batch.yml`
- Modify: `.github/workflows/_verify-docs.yml`

- [ ] **Step 1: Run one manual publish to a staging branch**

Use GitHub Actions UI for `.github/workflows/fetch-docs.yml` with:

```text
group: guides
artifact_retention_days: 3
target_branch: ci/docs-workflow-staging
publish: true
tooling_ref: <current branch name>
```

Expected: source publish, translation, translation publish, and verify jobs complete without writing to `dev`.

- [ ] **Step 2: Inspect staging branch output**

Run locally after fetching the branch:

```bash
git fetch origin ci/docs-workflow-staging
git diff --stat origin/dev..origin/ci/docs-workflow-staging
```

Expected: changes are limited to Guides owned paths from `scripts/docs-workflow/content-groups.js`: `docs`, `docs-byoc`, generated Guides sidebars, Guides snapshot, Guides assembly descriptor, and Guides reports.

- [ ] **Step 3: Enable publish default**

In `.github/workflows/fetch-docs.yml`, change:

```yaml
      publish:
        description: Publish and translate produced artifacts
        type: boolean
        default: true
```

- [ ] **Step 4: Run final policy and build checks**

Run:

```bash
node --test scripts/validate-workflow-policy.test.js
node --test scripts/docs-workflow/*.test.js
npm run upstream:materialize
npm run assemble
node scripts/upstream/validate-assembled.js
pnpm --dir .zdoc-assembled run build
```

Expected: all commands exit `0`.

- [ ] **Step 5: Commit**

Run:

```bash
git add .github/workflows scripts
git commit -m "ci: enable CN docs workflow publishing"
```

## Self-Review

Spec coverage:
- The plan separates the already-working locked overlay build from the production workflow migration.
- It accounts for upstream reusable workflows, `scripts/docs-workflow`, Guides assembly decision/descriptor flow, generated-state bootstrap, CN Guides config, and storage/secrets.
- It adds a separate Chinese reference translation workflow so English source reference docs can produce `zh-CN` translations without overwriting the English source tree.
- It avoids copying production workflows through `overlay-manifest.json`, matching the current overlay validator boundaries.

Placeholder scan:
- No task uses reserved placeholder markers or unspecified implementation steps.
- Each verification step has concrete commands and expected outcomes.

Type and name consistency:
- Workflow names use `fetch-docs.yml` for the new CN workflow and leave legacy `fetch-lark-docs*.yml` disabled only after dry-run success.
- The manual translation workflow is consistently named `translate-reference-docs.yml` and is scoped to reference groups: `python`, `java`, `node`, `go`, `cli`, and `rest`.
- Guides assembly paths consistently use `docs`, `docs-byoc`, `config/generated/guides.sidebar.js`, `config/generated/guides-byoc.sidebar.js`, `plugins/lark-docs/meta/snapshots`, `plugins/lark-docs/meta/assembly`, and `plugins/lark-docs/meta/reports`.
- Reference translation paths consistently use `i18n/zh-CN/docusaurus-plugin-content-docs-reference/current/**` and `.translation-cache/zh-CN.json`.

## 2026-07-19 Workflow Breakpoint Update

Observed remote run breakpoints:
- `produce_guides_sources / fetch` reached Feishu and failed with `91403 Forbidden` while listing the configured Base tables. This is an external app/table permission or secret-scope issue, not a local code failure.
- SDK and verify jobs failed because `config/generated` was absent from the checkout. `zdoc_cn` now seeds the generated directory and adopts upstream generated-sidebar loading.
- CLI preparation failed because upstream expects `reference/cli/cli/Overview.md`; CN uses `reference/cli/cli/zilliz-cli.md`. The preserved landing page and CLI override now use the CN path.
- REST preparation failed because `config/generated/restful.sidebar.js` was missing. A bootstrap REST sidebar seed now exists and can be overwritten by the workflow.

Implemented local migration fixes:
- Added upstream-compatible `config/applyOverrides.js`, reference sidebar overrides, and generated sidebar bootstrap files for Guides and REST.
- Updated SDK and CLI manual configs to emit generated sidebars under `config/generated/*.sidebar.js` with reference content roots.
- Replaced static reference sidebars with generated-sidebar loaders and overrides.
- Added a defensive Guides sidebar loader: use generated Guides sidebar only when its doc targets exist locally; otherwise fall back to autogenerated `docs/tutorials`.
- Made sidebar generator keys stable for Chinese labels by preferring IDs/hrefs and hashing non-ASCII-only labels.

Verification snapshot:
- `git diff --check`: pass
- `node --test scripts/validate-generated-sidebars.test.js scripts/translation/sidebarKeys.test.js`: pass
- `node scripts/validate-generated-sidebars.js`: pass
- `npm run test:workflow-policy`: pass
- `npm run test:translation`: pass
- `npm run test:docs-workflow`: pass
- `npm run build`: pass, with existing broken link/anchor warnings and Java/REST HTML minifier warnings.

Remaining known blocker:
- Fix Feishu Base permissions or secret configuration for `produce_guides_sources`; rerun the full workflow after this commit reaches `master`.

## 2026-07-19 Full Workflow Breakpoint Update

Observed remote run `29670406526` after the generated-sidebar and Linux `jieba` fixes:
- `produce_rest / produce` completed successfully through fetch, build, checkpoint validation, and artifact upload. REST is no longer blocked by missing generated sidebars or Linux native packages.
- `produce_java`, `produce_python`, `produce_node`, `produce_go`, and `produce_cli` failed during Feishu fetches with repeated `retryable response 503: {}` after the default short retry window. This is a Feishu service/load breakpoint in the source-fetch phase, amplified by the all-groups producer fan-out.
- `produce_guides_sources / fetch` still failed with `91403 Forbidden` while listing Base tables for `I6YUb1M0JajHrqsJGcLcZNh7neP`. This remains an external app/table permission or secret-scope blocker.
- The translation workflow already covers Guides, SDK references, CLI, and REST. REST spec localization preserves existing `x-i18n.zh-CN` entries and only sends missing prose fields for translation.

Implemented migration changes from this breakpoint:
- Serialized source producers in `fetch-docs.yml` for all-groups runs: Guides sources, Python, Java, Node, Go, CLI, then REST. Single-group dispatch still works through cancellation-aware `!cancelled()` producer conditions.
- Increased Feishu retry/backoff defaults in `_fetch-content-group.yml` and `_fetch-guides-sources.yml`: `FEISHU_RETRY_ATTEMPTS=8`, `FEISHU_RETRY_DELAY_MS=3000`, `FEISHU_MIN_TIME_MS=800`, and `FEISHU_WIKI_NODE_MIN_TIME_MS=1500`.
- Preserved zdoc_cn Ali OSS environment names in all producer workflows: `OSS_BUCKET`, `OSS_REGION`, `OSS_ENDPOINT`, `IMAGE_BED_URL`, `OSS_ACCESS_KEY_ID`, and `OSS_ACCESS_KEY_SECRET`.
- Updated workflow policy tests so source producer serialization is an explicit invariant, not an accidental implementation detail.

Fresh verification:
- `node --test scripts/validate-workflow-policy.test.js scripts/translation/restSpecLocalization.test.js`: pass
- `node --test scripts/validate-generated-sidebars.test.js scripts/translation/sidebarKeys.test.js scripts/docs-workflow/rest-reconciliation.test.js`: pass

Next remote verification:
- Push the source producer serialization/backoff patch to `master`.
- Run artifact-only all-groups workflow again:

```bash
gh workflow run fetch-docs.yml --repo zilliztech/zdoc_cn --ref master -f group=all -f artifact_retention_days=3 -f target_branch=dev -f publish=false -f tooling_ref=master
```

Expected:
- REST should remain artifact-ready.
- SDK/CLI producers should no longer fail from short Feishu `503` bursts under all-groups load.
- Guides will still fail until the Feishu Base permission for `I6YUb1M0JajHrqsJGcLcZNh7neP` is corrected.
