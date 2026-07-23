# Chinese Jenkins Master-Tooling Assembly Design

**Date:** 2026-07-23

## Goal

Make the Chinese development Jenkins job build the exact generated documentation state from `zdoc_cn/dev` with the build tooling from an immutable `zdoc_cn/master` commit. Preserve `dev` as generated-content state, keep Jenkins polling `dev`, and remove only tooling on Chinese `master` that is demonstrably unused.

## Background

Jenkins build `zilliz-docs-cn-dev/726` checked out `dev` directly and failed while loading the current docs version. The generated document `tutorials/ai-models/integrate-with-model-providers` declares `displayed_sidebar: default`, but the sidebar file on that `dev` commit exports only `tutorialSidebar`.

The equivalent English job succeeds because its branch tooling already exports a sidebar named `default`. The failure is therefore caused by branch-tooling drift, not by the generated document, Jenkins, Docker, Docusaurus 3.10.0, or Node 24.

The Chinese GitHub documentation workflow already validates a different model:

1. check out an immutable `master` tooling SHA;
2. restore checkpoint-owned generated paths from an immutable `dev` SHA;
3. build the combined tree.

GitHub Actions publishes generated paths to `dev`; it does not publish build tooling such as `docusaurus.config.js` or sidebar loaders. Jenkins must reproduce the same composition instead of treating literal `dev` as a standalone website source tree.

## Scope

This change covers:

- `zilliztech/vdc-jenkins:zilliz-docs/zilliz-docs-cn-dev.groovy`;
- focused cleanup of stale sidebar tooling on `zdoc_cn/master`;
- validation that Jenkins continues to deploy the Chinese dev site from `dev` content;
- preservation of the existing image push, China registry sync, and GitOps deployment stages.

This change does not:

- modify the English Jenkins job;
- change the generated-path ownership contract;
- make `dev` contain master tooling;
- migrate the production build to `.zdoc-assembled`;
- remove the legacy BYOC versioned-doc tree.

## Considered Approaches

### 1. Checkout `dev`, then assemble it with immutable `master` tooling

Jenkins performs its normal SCM checkout of the requested content branch, records that commit, performs a non-polling checkout of `master`, and restores only generated paths from the recorded content commit.

Advantages:

- mirrors the final GitHub Actions verification model;
- keeps SCM polling and changelog attribution on `dev`;
- uses the repository-owned generated-state restoration contract;
- avoids maintaining a Jenkins-specific tooling allowlist;
- is a small change to the Chinese job only.

This is the selected approach.

### 2. Overlay selected master tooling files onto a `dev` checkout

This would keep the `dev` checkout as the workspace base and copy a list of configuration, sidebar, script, package, and Docker files from `master`.

This is rejected because the file list would become a second tooling ownership contract. New tooling dependencies could be omitted silently and recreate the same class of drift.

### 3. Build the locked upstream `.zdoc-assembled` workspace

This would move Jenkins to the same upstream-overlay architecture used by the locked-upstream validation workflow.

This is deferred. `.zdoc-assembled` is copied from the locked English upstream and has no Git metadata. Injecting the exact Chinese `dev` generated state would require a new archive/materialization boundary, Docker-context changes, and an explicit migration from legacy `versioned_docs/version-byoc` to `docs-byoc`. That is broader than the current build repair.

## Jenkins Architecture

### Immutable inputs

The job resolves and records two commits:

- `CONTENT_SHA`: the exact commit checked out from `params.BRANCH`, normally `dev`;
- `TOOLING_SHA`: the exact commit checked out from `master`.

The job must never restore generated state from a moving branch name after these SHAs have been resolved.

### Checkout and polling behavior

The first GitSCM checkout remains the requested content branch with normal polling and changelog behavior. This preserves push-triggered builds for `dev`.

The second GitSCM checkout uses `master` with `poll: false` and `changelog: false`. It replaces the workspace with master tooling without causing master changes to become the job's content trigger.

Both checkouts use the existing GitHub credential and clean/prune extensions. The first checkout result supplies `CONTENT_SHA`; the second checkout result supplies `TOOLING_SHA`.

### Generated-state assembly

After the master checkout, Jenkins runs from the repository root:

```bash
bash scripts/restore-generated-state.sh --exact --ref "$CONTENT_SHA"
```

The script restores the repository-owned generated roots:

- `docs`;
- `docs-byoc`;
- `reference`;
- `i18n`;
- `.translation-cache`;
- `config/generated`;
- generated Lark snapshot, assembly, and report state.

All other paths remain from `TOOLING_SHA`. This includes Docusaurus configuration, sidebar loaders, source code, package manifests and locks, Dockerfile, nginx configuration, and validation scripts.

### Build identity

The existing image tag remains content-oriented and uses the short `CONTENT_SHA`, so operators can correlate a deployment with the `dev` commit that triggered it.

The build description and console output include both short SHAs. The Docker image receives labels for the full content and tooling revisions. No secrets are included in labels or descriptions.

### Build and deployment

The existing Docker build remains the production build boundary. It runs against the assembled workspace and therefore executes the Dockerfile and Docusaurus tooling from `master` while reading generated documentation restored from `dev`.

The following stages remain unchanged apart from consuming the new image identity:

- push to US Harbor;
- synchronize to the China registry;
- update the `vdc-deploy` overlay;
- trigger the Argo CD sync.

## Error Handling

The job fails before Docker build when:

- either checkout does not return a full 40-character commit SHA;
- `CONTENT_SHA` is not available in the local repository after the master checkout;
- the exact generated-state restoration fails.

The Docker production build fails when the assembled tree contains an invalid generated sidebar or any other Docusaurus build error.

The console must print both immutable revisions before assembly. Failure messages should identify whether checkout, restoration, or Docker build failed.

No push, registry synchronization, or deployment stage runs after an assembly or build failure.

## Build Validation Boundary

The Jenkins `main` container is treated only as a Docker-in-Docker environment; the design does not assume that it provides a compatible host Node.js runtime. After immutable restoration succeeds, Docker build is the authoritative validation boundary. Its Node base image installs the locked dependencies and runs `yarn build` in the same environment used for deployment.

Focused Node tests and generated-sidebar validation run before rollout in the local assembled-worktree verification. Jenkins then proves the same composed state through the full Docker production build.

## Master Tooling Cleanup

### Delete `sidebars.js`

The scaffold sidebar file has no runtime or test references. It can be deleted with a repository search and full build as regression evidence.

### Fold `sidebarsTutorial.mjs` into `sidebarsTutorial.js`

The MJS file is a transitional adapter whose only purpose is to rename `tutorialSidebar` to `default`. The stable sidebar module will directly export:

```javascript
{
  default: loadGuidesSidebar(),
  releasesSidebar: [...]
}
```

`docusaurus.config.js` will point back to `sidebarsTutorial.js`, and `sidebarsTutorial.test.js` will assert that the configured module exports both required arrays. This matches the sidebar name emitted in generated document frontmatter and removes the format adapter.

### Retain the legacy BYOC version files

The following are not stale under the selected Jenkins architecture:

- `versioned_docs/version-byoc`;
- `versioned_sidebars/version-byoc-sidebars.json`;
- `versions.json`.

The root Chinese Docusaurus configuration still declares BYOC as a version of the primary docs plugin. The production Docker build consumes these files. They can be removed only in a separate migration that makes the production build consume `docs-byoc` through a dedicated plugin and verifies route parity.

### Retain generated-state tooling

`scripts/restore-generated-state.sh`, generated sidebar validators, workflow scripts, and `docs-byoc` ownership definitions remain required. They are part of the master-tooling/dev-content contract even where the current root build still uses the legacy BYOC version tree.

## Validation Strategy

### `zdoc_cn` validation

- run the updated sidebar unit test;
- run generated-sidebar validation after restoring an exact `dev` SHA into a master worktree;
- run the full Docusaurus build on that assembled tree;
- confirm the failing document resolves sidebar `default`;
- confirm BYOC routes are still emitted from the retained versioned tree;
- run `git diff --check`.

### Jenkins definition validation

- inspect the Groovy diff for a first polling `dev` checkout and a second non-polling `master` checkout;
- confirm the image tag is based on `CONTENT_SHA`;
- confirm both full SHAs are logged and attached as image labels;
- confirm restoration occurs before validation and Docker build;
- confirm push, sync, and deploy stages are otherwise unchanged.

### Live validation

After the Jenkins definition is merged or installed:

1. trigger the Chinese dev job for the known failing `dev` commit or the latest descendant;
2. verify the console reports the expected content and tooling SHAs;
3. verify Docusaurus completes the `zh-Hans` build;
4. verify the image reaches both registries;
5. verify the dev deployment serves a Cloud page from the content SHA and an existing BYOC page;
6. verify a subsequent `dev` push still triggers the job.

## Rollout and Recovery

Land the `zdoc_cn/master` sidebar cleanup before enabling the Jenkins assembly change so the selected master tooling already contains the simplified export. Then update the Chinese Jenkins definition.

The Jenkins change is recoverable by reverting only the Groovy commit. The sidebar cleanup is independently recoverable by reverting its `zdoc_cn` commit. No generated content is rewritten by this rollout.

## Success Criteria

- Chinese Jenkins builds do not fail on `displayed_sidebar: default`.
- The job builds exact `dev` generated content with exact `master` tooling.
- SCM polling remains tied to the requested content branch.
- English Jenkins remains unchanged.
- Existing Cloud and BYOC routes remain present.
- `sidebars.js` and the transitional MJS adapter are removed without build regressions.
