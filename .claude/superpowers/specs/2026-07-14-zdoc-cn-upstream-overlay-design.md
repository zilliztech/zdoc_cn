# Zdoc CN Upstream Overlay Design

## Status

Approved in principle on 2026-07-14. This document defines the architecture for aligning the Chinese documentation site with `zilliztech/zdoc` while preserving Chinese content, publishing, and regional requirements.

## Goal

Make `zdoc` the single source of truth for the documentation platform, frontend, shared plugins, scripts, tests, and content-production workflows. Keep `zdoc_cn` as a thin downstream repository containing only Chinese site configuration, content-source mappings, regional adapters, publishing integration, and Chinese-specific validation.

The Chinese site must provide the same frontend and operational experience as the English site without requiring shared code to be copied and maintained in both repositories.

## Decision

Use a build-time composition model:

1. `zdoc_cn` locks an immutable `zdoc` commit.
2. Local development and CI check out that upstream commit.
3. An assembly command creates a disposable workspace from upstream.
4. The Chinese site profile and approved adapters are installed into the workspace.
5. Chinese content is fetched or restored.
6. Shared and Chinese-specific tests run against the assembled result.
7. The assembled site is built and published through the existing Chinese deployment infrastructure.

Direct imports such as `../zdoc/src/...` are prohibited because sibling repositories are not reliable in CI, Docker builds, or other developers' environments.

## Alternatives Considered

### Copy the current `zdoc` tree into `zdoc_cn`

This would provide a quick initial baseline but would recreate the same maintenance problem after the next upstream change. It is rejected as the steady-state architecture.

### Cherry-pick upstream upgrade commits into `zdoc_cn`

The redesign, TypeScript and pnpm migration, plugin hardening, and workflow refactor are coupled. Incremental cherry-picking would produce extensive semantic conflicts and retain two platform implementations. This approach is rejected.

### Merge both sites into one repository immediately

A single multi-site repository is the cleanest long-term model, but it would change English-site ownership, release controls, and content workflows during an already large migration. It remains a possible future evolution, not a prerequisite.

### Publish all shared behavior as npm packages

Packages work for UI and plugin libraries but do not naturally cover root Docusaurus configuration, GitHub workflows, Docker, Nginx, and repository scripts. Packages may be introduced selectively, but they are not the primary composition mechanism.

## Repository Responsibilities

### `zdoc`

`zdoc` owns:

- the design system and frontend theme;
- navigation, search, chat, mobile behavior, tables, code blocks, tags, and document layout;
- the common Docusaurus architecture;
- shared Lark, MDX, link-check, REST-generation, and reporting plugin implementations;
- checkpoint, artifact, producer, publisher, recovery, and verification workflows;
- common Docker, Nginx, and runtime-environment behavior;
- TypeScript, Vitest, Playwright, and shared plugin tests;
- the site-adapter contract and its compatibility version.

Changes needed by both sites must be implemented upstream first.

### `zdoc_cn`

`zdoc_cn` owns:

- the Chinese site profile and `zh-Hans` metadata;
- Chinese UI labels and regional links;
- `zilliz.com.cn` URLs, Chinese support and cloud endpoints;
- footer legal text, ICP information, and cookie settings;
- the new Feishu Base token and table-to-content-group mapping;
- the independent `onpremise` content source, route, and sidebar;
- Chinese REST templates, metadata, localized titles, and targeted corrections;
- Aliyun OSS image publishing;
- `cn-publish-normalizer`;
- Chinese redirect rules;
- Jenkins, Aliyun Registry, Kubernetes, and ArgoCD integration;
- Chinese-specific contract, content, build, and browser tests.

## Upstream Version Lock

`zdoc_cn` stores an upstream lock file containing at least:

```yaml
repository: zilliztech/zdoc
commit: 67f4c491300fbb4dd6ccb2e2630afed5c3c0d544
compatibility: 1
```

Production builds must use the exact locked commit. They must never build directly from a moving upstream branch.

An upstream upgrade changes the lock in a pull request. The pull request assembles the Chinese site, runs all verification gates, and reports upstream changes and overlay compatibility before it can merge.

## Assembly Model

The logical build flow is:

```text
checkout zdoc_cn
  -> read upstream.lock
  -> checkout zdoc at the locked commit
  -> create disposable assembled workspace
  -> install the Chinese site profile and adapters
  -> generate locale-specific configuration
  -> fetch or restore Chinese content
  -> run shared and Chinese-specific verification
  -> build static site and container image
  -> publish using the Chinese deployment pipeline
```

The assembled workspace is disposable and must not be committed. Generated documentation, source caches, snapshots, checkpoints, reports, and build artifacts are runtime inputs or outputs, not overlay source files.

The assembly process must be deterministic: identical upstream and Chinese commits with identical declared inputs must produce the same source tree before content fetching.

## Overlay Allowlist

The Chinese repository may contribute files through explicit extension locations such as:

```text
site-profile/
locale/
content-config/
plugins/cn-publish-normalizer/
plugins/adapters/aliyun-oss/
rest-overrides/zh-CN/
nginx/zh-CN/
ci/
tests/zh-CN/
```

The final names may be refined in the implementation plan, but the responsibility boundaries must remain intact.

The overlay must not replace whole shared implementation areas, including:

```text
src/
plugins/lark-docs/
plugins/mdx-parse/
plugins/report-to-lark/
scripts/docs-workflow/
.github/workflows/_*.yml
```

The assembly command must enforce this restriction with an allowlist and fail on undeclared or conflicting writes.

## Configuration and Extension Contract

The upstream platform will expose a versioned site-adapter interface. Its responsibilities include:

- locale and site metadata;
- external and regional URLs;
- enabled content products;
- content-source declarations;
- Markdown transformation hooks;
- asset upload strategy;
- REST localization strategy;
- report-card labels;
- additional Docusaurus docs instances such as `onpremise`;
- locale-specific Nginx additions.

A conceptual adapter shape is:

```ts
export interface SiteAdapter {
  compatibility: number;
  locale: string;
  contentSources: ContentSource[];
  transformMarkdown?: MarkdownTransformer[];
  uploadAsset?: AssetUploader;
  localizeRestSpec?: RestSpecLocalizer;
  reportLabels?: WorkflowLabels;
  docsInstances?: DocsInstance[];
}
```

The precise API will be designed from existing upstream plugin boundaries. Locale-specific code must depend on documented interfaces instead of importing plugin internals.

## Chinese Content Topology

The new Feishu Base is:

```text
https://zilliverse.feishu.cn/base/I6YUb1M0JajHrqsJGcLcZNh7neP
```

It currently contains these tables:

| Table | Current records | Intended role |
| --- | ---: | --- |
| 从这里开始 | 12 | Entry and getting-started pages |
| 开发指南 | 178 | Development guides |
| 运维指南 | 128 | Operations guides |
| 客户端参考 | 7 | SDK and REST entry points |
| 工具 | 24 | Agents, prompts, CLI, skills, and integrations |
| AI 模型 | 5 | Model-provider integration content |
| 产品架构 | 0 | Reserved future content group |
| 解决方案 | 0 | Reserved future content group |

The table schema uses shared navigation concepts including `Targets`, `Parent`, `Slug`, `Docs`, `Placement Type`, and `Progress`. Contract tests must verify required tables, fields, supported placement types, and target values before content generation starts.

Agents content is generated into the normal `/docs` information architecture from the `工具` table. It is not maintained as a separate Docusaurus docs plugin.

`onpremise` is not represented in the new Base and remains a Chinese-only, independent content source with its own docs instance and route. It participates in the same checkpoint and verification framework as other content groups.

Empty configured tables are valid. They produce no pages until records are added, without requiring a platform deployment.

## Plugin Alignment

### Lark documents

Use the upstream `lark-docs` implementation, including source snapshots, incremental planning, canonical-link auditing, generated-state restore, and checkpoint support. Chinese behavior is provided through Base mappings, target filters, localized metadata, Markdown hooks, and the OSS asset adapter.

The existing Chinese `lark-docs` directory must not replace the upstream plugin.

### MDX parsing

Use the upstream parser and patcher so the Chinese site inherits current generic-type, fence, admonition, anchor, and HTML-warning fixes. Chinese normalization runs through a separate documented transformation hook.

### Report cards

Use the upstream report-card state and Feishu JSON v2 implementation. The Chinese adapter provides translated titles, stages, and messages. The older Chinese plugin implementation is retired after parity tests pass.

### Link checks

Use the upstream link-check implementation and report summarization. The Chinese profile supplies site URLs, ignore policies, baselines, and Chinese deployment-specific expectations.

### REST generation

Use the upstream Apifox generation engine and language filtering. Keep Chinese templates, titles, descriptions, targeted fixes, and locale metadata as `zh-CN` overrides. Aliyun OSS publishing is an injected uploader strategy, not a fork of the generator.

### Chinese publish normalization

Keep `cn-publish-normalizer` as a Chinese-owned plugin with focused tests. It must run through the upstream Markdown extension pipeline and must not duplicate general MDX parser behavior.

## Docusaurus Information Architecture

The assembled site reuses the upstream frontend and common route structure. The Chinese profile localizes navigation labels and regional URLs.

Required content areas include:

- `/docs` for Cloud guides, tools, and Agents content;
- `/docs/byoc` for BYOC content;
- a preserved Chinese `onpremise` route, with the final path fixed during implementation planning after redirect compatibility is audited;
- `/reference` for REST, SDK, and CLI references;
- releases and changelog navigation consistent with the upstream design.

`onpremise` is an additive docs instance. Agents is not.

## Docker and Runtime Configuration

Use the upstream Node 22, pnpm, multi-stage Docker build, Nginx runtime image, and runtime environment injection. The Chinese build may add registry and package mirrors without changing the application build contract.

Secrets and runtime values must not be committed into `static/env.js` or baked into public source artifacts. Static placeholder checks remain mandatory.

Container metadata and tags must identify both inputs, for example:

```text
zdoc-cn:<cn-short-sha>-upstream-<zdoc-short-sha>
```

## Nginx and Redirects

Use the upstream Nginx base for compression, caching, static serving, chat proxying, MIME handling, and common redirects.

Chinese-owned redirect rules and regional upstream settings are generated or included from the Chinese overlay. The Chinese repository must not maintain a full copied Nginx configuration when the difference can be represented as generated includes or structured redirect data.

Before cutover, existing Chinese redirects must be compared against upstream redirects and classified as shared, Chinese-only, obsolete, or conflicting.

## Workflow Alignment

Reuse the upstream reusable workflow architecture:

- content producers work from immutable inputs;
- producers publish validated checkpoint artifacts;
- publishers apply checkpoints safely;
- final verification reads the immutable assembled state;
- failures and partial results are reported through the shared card system;
- content groups can run independently and in parallel;
- retries and recovery do not require force-pushing partially generated trees.

The Chinese orchestration supplies its own content groups and credentials. Translation jobs used specifically to produce non-English derivatives of the English site are not run merely because their files exist upstream. Their durable batching, recovery, validation, and publication mechanisms may be reused where Chinese production needs the same behavior.

Expected Chinese groups include guides, BYOC, tools and Agents, SDK references, REST references, and `onpremise`. Exact grouping will be finalized from the new Base and existing manifests during planning.

## Deployment Integration

The existing Chinese delivery path remains in scope:

```text
Jenkins
  -> assemble and verify
  -> build container
  -> push to Aliyun Registry
  -> update deployment configuration
  -> ArgoCD sync and wait
```

Jenkins scripts remain Chinese-owned deployment adapters. They must invoke the same assembly and verification commands used by local development and pull-request CI rather than implementing a second build path.

## Verification Gates

Every upstream upgrade and production build must pass four layers.

### Assembly integrity

- the locked upstream commit exists and matches the declared repository;
- the adapter compatibility version is supported;
- only allowlisted overlay paths are written;
- no shared implementation directory is replaced;
- the assembled manifest records both repository commits;
- assembly is deterministic.

### Unit and type verification

- pnpm frozen-lockfile installation;
- TypeScript checks;
- upstream Vitest and shared plugin tests;
- workflow policy and checkpoint tests;
- Chinese normalizer tests;
- Chinese REST override and OSS adapter tests;
- new Base schema contract tests;
- `onpremise` configuration and sidebar tests.

### Content and build verification

- required content groups produce valid output;
- generated sidebars contain no invalid, duplicate, or empty entries;
- Chinese publish artifacts contain no forbidden regional URLs or untranslated UI configuration;
- Docusaurus production build succeeds;
- static runtime placeholders contain no secrets;
- sitemap, Markdown exports, structured data, and redirects are valid;
- link reports are produced under the agreed blocking policy.

### Browser and container verification

- desktop and mobile navigation;
- search input, results, and keyboard behavior;
- code-copy behavior and code-block layout;
- tables and responsive overflow;
- Chinese labels and regional links;
- chat panel behavior;
- `/docs`, `/docs/byoc`, `onpremise`, and `/reference` routes;
- container startup and runtime environment injection;
- Nginx redirects and chat proxy smoke tests.

## Failure Handling and Rollback

- Assembly or test failure blocks the upgrade pull request.
- Patch or adapter application failure terminates assembly immediately; it is never skipped or fuzzily applied.
- Content production failure does not publish a replacement checkpoint.
- Publication failure leaves the last successful generated state intact.
- Deployment failure does not advance the production image reference.
- Production rollback selects the previous image, which records both the Chinese and upstream commits.
- An upstream regression is rolled back by restoring the previous `upstream.lock` value.

## Patch Policy

Traditional textual patches are a last resort. Preferred mechanisms, in order, are:

1. site-profile data;
2. environment or build parameters;
3. documented adapter interfaces;
4. Docusaurus plugin composition;
5. generated configuration;
6. small, explicit textual patches.

Every textual patch must record its reason, the missing upstream extension point, its removal condition, and a focused compatibility test. A patch that no longer applies exactly is a build failure.

## Migration Sequence

The initial migration is staged to keep production stable:

1. Add the upstream lock and disposable assembly prototype.
2. Assemble and build the unmodified upstream site from `zdoc_cn` CI.
3. Introduce the versioned site-adapter contract upstream.
4. Add the Chinese profile, UI labels, regional links, footer, and metadata.
5. Add the Chinese normalizer, REST overrides, and OSS adapter.
6. Add the new Base mapping and generate `/docs`, BYOC, tools, Agents, and reference content.
7. Add the independent `onpremise` content group and route.
8. Adopt upstream checkpoint, publisher, recovery, and verification workflows.
9. Generate Chinese Nginx configuration and audit redirects.
10. Build a candidate container and deploy it to a separate preview environment.
11. Compare current production and candidate behavior, routes, SEO output, and key content.
12. Switch Jenkins and ArgoCD production publishing after all gates pass.

Each stage must leave a buildable and testable system. Workflow migration and frontend migration are coordinated through the adapter contract but can be validated independently before production cutover.

## Maintenance Rules

- Shared behavior changes go to `zdoc` first.
- `zdoc_cn` never follows a moving upstream branch in production.
- Overlay size and textual patch count are tracked and expected to decrease over time.
- Generated content and workflow state are not treated as source overlay.
- Chinese release tooling calls the common assembly interface.
- Upstream upgrades are ordinary reviewed pull requests with automated compatibility evidence.

## Success Criteria

The migration is successful when:

- the Chinese site has the same frontend behavior and design as the locked English platform;
- shared frontend, plugin, script, Docker, Nginx, and workflow implementations are maintained only in `zdoc`;
- `zdoc_cn` contains only declared Chinese configuration, adapters, deployment integration, and tests;
- `onpremise` remains available;
- Agents content is part of normal docs navigation from the new Base;
- Chinese REST generation, OSS images, normalization, regional links, and legal requirements continue to work;
- upstream upgrades are performed by changing a lock and passing compatibility tests instead of manually copying files;
- production can be rolled back to a known pair of Chinese and upstream commits.

## Out of Scope

- Merging both repositories immediately;
- redesigning the English site again;
- translating Chinese content from English as the primary Chinese content source;
- removing the existing Jenkins, Aliyun Registry, Kubernetes, or ArgoCD deployment path during the first migration;
- moving `onpremise` into the new Base unless a separate content decision is made later.
