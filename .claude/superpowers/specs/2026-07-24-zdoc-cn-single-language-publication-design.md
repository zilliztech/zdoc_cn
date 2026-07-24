# zdoc_cn Single-Language Publication Design

**Date:** 2026-07-24  
**Status:** Approved for implementation planning

## Summary

`zdoc_cn` will become a single-language Docusaurus site that builds only `zh-CN`. Generated Chinese documents will be published directly into their final content roots. English Reference inputs will be retained under `reference-sources/`, which is neither registered with Docusaurus nor copied into the production image.

Content publication follows the rule **atomic within a group, independent between groups**. A failed group keeps its previous complete Chinese output while unrelated groups may publish successfully.

The associated Chinese Jenkins job will build one immutable `zdoc_cn` commit directly. It will not assemble content from `dev` with tooling from `master`.

## Goals

- Build and deploy only the `zh-CN` locale.
- Keep only Chinese published content in Docusaurus content roots.
- Remove translated manuals from Docusaurus `i18n/` directories.
- Store Reference English inputs in `reference-sources/<group>` without publishing them.
- Publish each content group atomically and independently.
- Make every committed `dev` revision directly buildable without Jenkins overlays.
- Preserve supported public routes or add explicit redirects.
- Remove stale BYOC versioning, Agents, i18n, and legacy Reference tooling after validation.
- Simplify the Chinese Jenkins job to build a single immutable commit.

## Non-goals

- Changing the English `zdoc` site or its Jenkins job.
- Publishing Java v1 or Go v1 manuals; both are retired.
- Introducing a generated publication branch.
- Translating Guides in the production workflow; Guides are already sourced in Chinese.
- Hiding English Reference inputs in an untracked or private branch.

## Repository and Docusaurus Architecture

The production content roots are:

```text
docs/                         Cloud Guides, including former Agents content
docs-byoc/                    BYOC Guides
reference/                    Published Chinese Reference manuals
  <group>/
reference-sources/            English Reference inputs; never published
  <group>/
onpremise/                    On-premise documentation
```

`docs-agents/` is removed because its content has already been merged into Guides.

Docusaurus uses one locale:

```js
i18n: {
  defaultLocale: 'zh-CN',
  locales: ['zh-CN'],
}
```

The docs plugin boundaries are:

| Plugin | Source path | Route base path |
| --- | --- | --- |
| Default docs | `docs/` | `/docs/` |
| BYOC | `docs-byoc/` | `/docs/byoc/` |
| Reference | `reference/` | `/reference/` |
| On-premise | `onpremise/` | `/on-premise/` |

BYOC becomes an independent, unversioned docs plugin. The default docs plugin no longer declares `byoc` as a version. The legacy `versions.json`, `versioned_docs/version-byoc/`, and `versioned_sidebars/version-byoc-sidebars.json` are removed after route parity is demonstrated.

`reference-sources/` is not registered as a Docusaurus content plugin. Docker build configuration must also exclude it from the final image.

The `i18n/` tree must not contain Guides, BYOC, Reference, or On-premise pages. It may retain Docusaurus UI message resources such as `code.json` only when custom Chinese theme strings are still required.

The public site does not introduce a `/zh-CN/` route prefix. The root redirect remains `/docs/home`.

## Content Generation and Publication

### Guides and BYOC

Guides and BYOC are fetched directly from their Chinese source:

```text
fetch Chinese source into staging
  -> validate completeness, MDX, links, assets, and sidebar
  -> atomically replace docs/ or docs-byoc/
  -> commit the published group
```

No production translation step is used. A fetch or validation failure leaves the previous target directory unchanged.

### Reference

Each Reference group runs independently:

```text
fetch English source
  -> validate source completeness
  -> publish reference-sources/<group>
  -> build translation manifest
  -> translate into staging/reference/<group>
  -> validate the complete Chinese group
  -> atomically replace reference/<group>
  -> commit the published Chinese group
```

The source and Chinese publication are separate stages. A newly fetched English source may be committed even if translation later fails. A failed translation must not change the previous complete `reference/<group>`.

The translation manifest records at least the source path, target path, source content hash, translation status, and retirement status. It is used to detect additions, updates, deletions, reusable translations, and intentionally retired pages.

Java v1 and Go v1 are explicitly retired. They are removed from Chinese sidebars and publication manifests, and they do not block group completeness checks. Their source retention under `reference-sources/` is optional archival data and does not make them publishable.

## Atomicity and Concurrency

The publication unit is a content group, such as Guides, BYOC, Python, Java, Node, Go, or CLI.

- Generated files are written only to an isolated staging workspace.
- The live target is not modified until the complete staged group passes validation.
- The validated group replaces its target as one publication operation and one commit.
- Each group maintains its own checkpoint and source/output metadata.
- A group failure does not cancel or roll back successful unrelated groups.
- The aggregate workflow reports failure when any producer fails, even though successful group commits remain valid.
- Before publication, a compare-and-swap check confirms that the target group has not changed since the job baseline.
- On a concurrency conflict, the producer rebases or reconstructs against current `dev`, reruns validation, and publishes only when the result remains safe. It must never force-overwrite another producer.

In an ephemeral CI checkout, a crash during target replacement is harmless unless a commit was successfully pushed. The remote branch remains the authoritative atomic boundary.

## Validation and Failure Handling

### Preflight

Before modifying a target, the producer verifies:

- Required source tokens and upstream resources exist and are accessible.
- Group configuration, target path, and sidebar configuration are valid.
- The fetched source is non-empty and matches the expected group shape.
- File-count and deletion deltas are within configured safety thresholds.
- Every active Reference source page maps to a Chinese target.
- Retired pages are explicitly declared rather than silently omitted.

A missing source token, like the failures observed in GitHub Actions run `30049473843`, terminates only that producer before it mutates published output.

### Published output

Before replacing a Chinese target, validation checks:

- Expected target files exist.
- A Chinese target is not byte-for-byte identical to its English source.
- Abnormally high English prose content is rejected or surfaced for explicit review, while code, API names, parameters, and product names are allowed.
- MDX parses and participates in a production build.
- Document IDs, slugs, and final routes do not conflict.
- Sidebar references resolve.
- Internal links, images, and static assets resolve.
- Production content has no dependency on document trees under `i18n/`, `versioned_docs/`, `docs-agents/`, or `reference-sources/`.

### Failure outcomes

| Failure | Outcome |
| --- | --- |
| Preflight or fetch failure | No source or Chinese publication for that group |
| Source succeeds, translation fails | New `reference-sources/<group>` may publish; old Chinese group remains |
| Chinese validation fails | Chinese target is unchanged |
| CAS conflict | Reconstruct and revalidate, or exit safely |
| One producer fails | Other groups continue; aggregate workflow reports failure |

Workflow retries may skip unchanged successful groups using their manifests and checkpoints.

## Migration Strategy

### Phase 1: Establish the new build boundary

- Configure only the `zh-CN` locale.
- Add the independent BYOC plugin.
- Remove the Agents plugin and let the default Guides plugin own the merged content.
- Ensure `reference-sources/` cannot enter Docusaurus or the production image.
- Keep legacy directories temporarily for comparison and rollback.

### Phase 2: Migrate current content

- Keep the current Chinese `docs/` as the Guides publication source of truth.
- Keep the current Chinese `docs-byoc/` as the BYOC publication source of truth.
- Populate `reference-sources/<group>` from current valid English Reference inputs.
- Populate `reference/<group>` from current valid Chinese translations.
- Exclude retired Java v1 and Go v1 pages from Chinese publication.
- Block a group cutover if any other active page lacks a Chinese result.
- Confirm former Agents pages exist under Guides before deleting `docs-agents/`.

### Phase 3: Switch producers

- Make Guides and BYOC generate Chinese content into staging at final-path shape.
- Make Reference fetching write English inputs to `reference-sources/<group>`.
- Make Reference translation stage content at final `reference/<group>` paths.
- Stop workflow, checkpoint, and validation code from reading or writing document content under `i18n/`.
- Require Jenkins to build the repository commit without overlaying generated state.

### Phase 4: Remove stale tooling

After the new workflow passes continuously and route parity is verified, remove:

- Manual content under `i18n/zh-CN`.
- Legacy BYOC versioned docs, sidebars, and `versions.json`.
- `docs-agents/` and its plugin/sidebar configuration.
- Code and workflow branches used only for the old i18n, BYOC version, Agents, or retired v1 flows.

Every candidate is reference-scanned before deletion. Shared helpers that remain useful to the new workflow are retained or renamed rather than deleted solely because their current names are stale.

## Route Migration

A generated route inventory compares the old and new sites.

- Supported Guides, BYOC, Reference, and On-premise routes must remain reachable.
- Former `/docs/agents/**` routes are served from Guides when paths match.
- Changed Agents routes receive explicit redirects.
- Java v1 and Go v1 routes are listed as intentional removals.
- No route gains a `/zh-CN/` prefix.
- The root continues to resolve to `/docs/home`.

## GitHub Actions Semantics

GitHub Actions is responsible for producing a repository state that can be built directly:

- Producers are independent by content group.
- Successful producers can commit to `dev` even when another group fails.
- Aggregate status remains failed if any required producer fails.
- Final repository verification runs against the assembled latest `dev` state.
- Published commits must contain complete target groups, never partially translated groups.

This preserves the useful behavior seen in run `30049473843`, where Go, CLI, and Guides advanced despite Python, Java, and Node source failures, while eliminating the possibility of publishing incomplete Chinese groups.

## Jenkins and vdc-jenkins Design

PR `zilliztech/vdc-jenkins#321` will not be merged and is not the basis of the final solution. Its split content/tooling assembly is superseded by the single-commit design.

Before any local operation in `../vdc-jenkins`, upstream state must first be fetched or synchronized with `gh`. The final change starts from the latest upstream `master` on a fresh branch.

The Chinese Jenkins job becomes:

```text
checkout params.BRANCH once
  -> validate and record immutable BUILD_SHA
  -> docker build that exact worktree
  -> tag and label the image with BUILD_SHA
  -> push and deploy that same image
```

The job:

- Does not checkout `zdoc_cn/master` for separate tooling.
- Does not invoke `restore-generated-state.sh`.
- Does not copy translated content, choose a locale, or repair versioned docs.
- Uses one SHA for the build description, image tag, and `org.opencontainers.image.revision`.
- Polls only the configured content branch and avoids trigger side effects from auxiliary checkouts.
- Does not change or invoke the English Jenkins job.

The current online Jenkins job remains unchanged until the new `zdoc_cn` feature branch is directly buildable and the replacement `vdc-jenkins` change passes review. Whether to close PR #321 is decided after the replacement is validated; the design does not authorize changing it immediately.

## Test Strategy

### Configuration tests

- Exactly one Docusaurus locale exists: `zh-CN`.
- No manual content exists under `i18n/zh-CN`.
- No Agents plugin remains.
- BYOC is an independent plugin and not a docs version.
- `reference-sources/` is not registered for production build.
- Legacy BYOC version files are not read.

### Producer tests

Each group covers:

- Successful fetch and publication.
- Missing source token.
- Empty or incomplete fetch result.
- Translation failure.
- Missing Chinese file or unchanged English source copied as Chinese.
- Invalid MDX, sidebar, link, or asset.
- Abnormal deletion threshold.
- CAS conflict.
- One group failing while another publishes.
- A failed group preserving its previous Chinese directory byte-for-byte.

### Build and deployment tests

1. Run a complete local Docusaurus production build.
2. Build with the Node and Yarn versions used by Jenkins.
3. Build the actual production image with OrbStack.
4. Confirm the image excludes `reference-sources/`, old manual i18n content, stale BYOC versions, and Agents sources.
5. Start the image and smoke-test critical routes and redirects.
6. Run `vdc-jenkins` pipeline unit and syntax validation.
7. Build a `zdoc_cn` feature branch in Jenkins before changing the production job.
8. Confirm checked-out SHA, image revision, deployed image, and rendered content all identify the same commit.

The replacement `vdc-jenkins` tests assert that the Chinese pipeline performs one checkout, validates its SHA before Docker build, uses that SHA for the image, does not invoke generated-state restoration, and does not modify the English pipeline.

## Rollout and Rollback

Rollout order:

1. Implement the single-language structure and producer changes in `zdoc_cn`.
2. Validate local, Jenkins-compatible, and OrbStack builds.
3. Confirm a feature branch is directly buildable without content/tooling assembly.
4. Synchronize `vdc-jenkins` from upstream using `gh` and create a fresh replacement change.
5. Validate the Chinese Jenkins pipeline against the feature branch.
6. Merge the coordinated `zdoc_cn` and `vdc-jenkins` changes in an order that keeps the active job buildable.
7. Update or allow the formal Chinese dev job to consume the new pipeline.
8. Remove stale content and tooling only after successful production-equivalent validation.

Rollback is group-aware in GitHub Actions and commit-aware in Jenkins:

- A failed producer preserves its previous Chinese group.
- A bad repository migration is reverted to the last directly buildable `zdoc_cn` commit.
- A bad Jenkins pipeline is reverted independently to its previous Groovy revision.
- Already stable unrelated content groups do not need to be rolled back with a failing group.

## Acceptance Criteria

- Docusaurus builds only `zh-CN` without a locale URL prefix.
- Production content roots contain Chinese published documents only.
- English Reference inputs exist only under `reference-sources/` and are absent from the production image.
- Guides include former Agents content; no Agents plugin or source root remains.
- BYOC builds as an independent unversioned docs plugin with supported routes preserved.
- Java v1 and Go v1 are absent from Chinese publication and explicitly recorded as retired.
- Each group publishes atomically and independently.
- A failed group leaves its prior Chinese output unchanged.
- Local, Jenkins-compatible, Docusaurus, Docker, link, route, and smoke tests pass.
- The Chinese Jenkins job builds one immutable `zdoc_cn` commit directly.
- The deployed image revision matches the GitHub Actions-published `dev` commit.
- The English site and English Jenkins job remain unchanged.
