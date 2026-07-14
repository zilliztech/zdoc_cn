# Zdoc CN Upstream Overlay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `zdoc_cn` into a deterministic Chinese overlay on a locked `zdoc` commit while preserving Chinese content, on-premise documentation, regional publishing, and deployment behavior.

**Architecture:** First add versioned downstream extension points to `../zdoc`. Then add an allowlisted assembly system and Chinese site profile to `zdoc_cn`. Migrate Chinese content behavior into adapters on top of upstream plugins. Finally adopt upstream checkpoint workflows and switch Jenkins/ArgoCD after preview verification.

**Tech Stack:** Docusaurus 3.10, TypeScript, Node.js 22, pnpm 10, Zod, Vitest, Node test runner, Playwright, Feishu Base, Aliyun OSS, Docker, Nginx, GitHub Actions, Jenkins, Kubernetes, ArgoCD

---

## File ownership established by this plan

Shared files created or modified in `../zdoc`:

- `config/site-profile/types.ts`: serializable site-profile contract.
- `config/site-profile/schema.ts`: compatibility and runtime validation.
- `config/site-profile/default.ts`: English default profile.
- `config/site-profile/load.ts`: profile loader.
- `config/markdown-pipeline.ts`: shared remark/rehype pipeline.
- `docusaurus.config.ts`: projects shared configuration from a profile.
- `scripts/docs-workflow/content-groups.js`: loads workflow groups from profile data.
- `plugins/lark-docs/baseNavigationReader.js`: converts Base records to the shared navigation model.
- `plugins/lark-docs/*`: invokes Markdown and asset adapters.
- `plugins/apifox-docs/*`: invokes REST localization adapter.
- `plugins/report-to-lark/*`: consumes localized report labels.
- `docs/platform/site-profile.md`: downstream contract documentation.

Chinese files created or retained in `zdoc_cn`:

- `upstream.lock`: immutable upstream revision and compatibility.
- `overlay-manifest.json`: allowlisted overlay writes.
- `scripts/upstream/*.js`: lock validation, materialization, assembly, and workflow export.
- `site-profile/index.ts`: Chinese runtime and Docusaurus profile.
- `site-profile/workflow.cjs`: Chinese workflow groups.
- `content-config/base.ts`: Base token and table mapping.
- `content-config/onpremise.ts`: independent on-premise source.
- `plugins/cn-publish-normalizer/`: Chinese-only Markdown normalization.
- `plugins/adapters/aliyun-oss/`: Chinese asset uploader.
- `rest-overrides/zh-CN/`: REST localization data and code.
- `nginx/zh-CN/`: structured Chinese redirects and runtime settings.
- `tests/zh-CN/`: Chinese unit, browser, workflow, and container tests.
- `ci/`: Jenkins and ArgoCD adapters.
- `.zdoc-upstream/` and `.zdoc-assembled/`: ignored disposable state.

## Phase 1: Add upstream extension points

### Task 1: Define the versioned site-profile contract

**Files:**

- Create: `../zdoc/config/site-profile/types.ts`
- Create: `../zdoc/config/site-profile/schema.ts`
- Create: `../zdoc/config/site-profile/default.ts`
- Create: `../zdoc/config/site-profile/load.ts`
- Test: `../zdoc/config/site-profile/load.test.ts`

- [ ] **Step 1: Write the failing loader tests**

Test that no environment variable returns the English profile, an absolute fixture path loads a Chinese fixture, an unsupported compatibility number is rejected, and malformed URLs or duplicate source IDs are rejected.

- [ ] **Step 2: Run the focused test**

Run: `cd ../zdoc && pnpm vitest run config/site-profile/load.test.ts`

Expected: FAIL because the loader does not exist.

- [ ] **Step 3: Add the contract**

Implement these core types:

```ts
export type ContentSource = {
  id: string;
  group: string;
  kind: 'lark-manual' | 'base-table' | 'apifox';
  manual?: string;
  tableId?: string;
  ownedPaths: string[];
};

export type DocsInstance = {
  id: string;
  path: string;
  routeBasePath: string;
  sidebarPath: string;
};

export type SiteProfile = {
  compatibility: 1;
  id: string;
  locale: string;
  siteUrl: string;
  title: string;
  tagline: string;
  links: {home: string; support: string; login: string; signup: string};
  footerCopyright: string;
  features: {onpremise: boolean; aliyunOss: boolean; cnPublishNormalizer: boolean};
  contentSources: ContentSource[];
  docsInstances: DocsInstance[];
  reportLabels: {title: string; stages: Record<string, string>};
};
```

Use Zod in `schema.ts`, require compatibility `1`, validate unique content-source and docs-instance IDs, and validate that all ownership paths are relative and normalized.

- [ ] **Step 4: Implement the loader**

```ts
import path from 'node:path';
import defaultProfile from './default';
import {siteProfileSchema} from './schema';
import type {SiteProfile} from './types';

export function loadSiteProfile(env: NodeJS.ProcessEnv = process.env): SiteProfile {
  const requested = env.ZDOC_SITE_PROFILE;
  const loaded = requested
    ? require(path.resolve(requested)).default ?? require(path.resolve(requested))
    : defaultProfile;
  const parsed = siteProfileSchema.safeParse(loaded);
  if (!parsed.success) throw new Error('Invalid site profile: ' + parsed.error.message);
  return parsed.data;
}
```

- [ ] **Step 5: Run tests**

Run: `cd ../zdoc && pnpm vitest run config/site-profile/load.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd ../zdoc
git add config/site-profile
git commit -m "feat(config): add versioned site profiles"
```

### Task 2: Project Docusaurus configuration from the profile

**Files:**

- Create: `../zdoc/config/markdown-pipeline.ts`
- Modify: `../zdoc/docusaurus.config.ts`
- Test: `../zdoc/config/site-profile/docusaurus.test.ts`

- [ ] **Step 1: Write failing projection tests**

Assert that the default profile reproduces the current English title, URL, navbar links, footer, BYOC plugin, and reference plugin. Assert that a fixture docs instance adds `onpremise` without replacing shared plugins.

- [ ] **Step 2: Extract shared Markdown helpers**

Move `remarkMathFix`, `rehypeWrapTables`, and `rehypeEmojiMarks` from the root config into `config/markdown-pipeline.ts` and export one shared pipeline factory.

- [ ] **Step 3: Load profile values in the root config**

Replace embedded site title, tagline, URL, external links, footer text, report labels, and additional docs instances with values from `loadSiteProfile()`. Keep shared theme, components, BYOC, reference, search, chat, embed-markdown, llms, and structured-data configuration upstream.

- [ ] **Step 4: Run verification**

```bash
cd ../zdoc
pnpm vitest run config/site-profile/docusaurus.test.ts
pnpm run typecheck
pnpm run build
```

Expected: PASS and the default build remains English.

- [ ] **Step 5: Commit**

```bash
cd ../zdoc
git add docusaurus.config.ts config/markdown-pipeline.ts config/site-profile
git commit -m "refactor(config): build site config from profile"
```

### Task 3: Make workflow content groups profile-driven

**Files:**

- Modify: `../zdoc/scripts/docs-workflow/content-groups.js`
- Modify: `../zdoc/scripts/docs-workflow/content-groups.test.js`
- Create: `../zdoc/config/site-profile/default-workflow.cjs`

- [ ] **Step 1: Add failing tests**

Test an injected profile with `guides`, `tools`, and `onpremise`; confirm order, immutable definitions, disjoint ownership, and `translate: false`.

- [ ] **Step 2: Replace hard-coded definitions**

Load `ZDOC_WORKFLOW_PROFILE` when set; otherwise load `default-workflow.cjs`. Preserve `normalizeOwnershipPath`, `validateDisjointOwnership`, deep freezing, and unknown-group rejection.

- [ ] **Step 3: Run workflow tests**

```bash
cd ../zdoc
node --test scripts/docs-workflow/content-groups.test.js
pnpm run test:workflow-policy
node --test scripts/docs-workflow/*.test.js
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
cd ../zdoc
git add config/site-profile/default-workflow.cjs scripts/docs-workflow
git commit -m "refactor(workflow): load groups from site profile"
```

### Task 4: Add narrow plugin adapter hooks

**Files:**

- Create: `../zdoc/config/site-profile/adapters.ts`
- Modify: `../zdoc/plugins/lark-docs/larkDocWriter.js`
- Modify: `../zdoc/plugins/lark-docs/index.js`
- Modify: `../zdoc/plugins/apifox-docs/refGen.js`
- Modify: `../zdoc/plugins/report-to-lark/index.js`
- Test: existing focused plugin test files

- [ ] **Step 1: Write failing hook tests**

Prove that a Markdown transformer runs after upstream MDX patching, an asset uploader receives a path/key/content type, a REST localizer receives an operation and locale, and report labels come from profile data.

- [ ] **Step 2: Define contracts**

```ts
export type MarkdownTransformer = (
  markdown: string,
  context: {sourceId: string; outputPath: string},
) => string;

export type AssetUploader = (
  input: {localPath: string; key: string; contentType?: string},
) => Promise<string>;

export type RestSpecLocalizer = (
  input: {locale: string; operation: unknown; sourceFile: string},
) => unknown;
```

- [ ] **Step 3: Invoke default no-op adapters**

Shared plugins must not branch on `zh-CN`, `zdoc_cn`, Aliyun, or Chinese table names. Missing adapters preserve current English behavior.

- [ ] **Step 4: Run shared verification**

```bash
cd ../zdoc
node --test plugins/lark-docs/*.test.js plugins/apifox-docs/*.test.js plugins/report-to-lark/*.test.js plugins/mdx-parse/*.test.js
pnpm run typecheck
pnpm run test:frontend
```

Expected: PASS.

- [ ] **Step 5: Document the upstream contract**

Create `../zdoc/docs/platform/site-profile.md` documenting every serializable profile field, the three function adapter signatures, `ZDOC_SITE_PROFILE`, `ZDOC_WORKFLOW_PROFILE`, compatibility-version changes, default behavior, and the prohibition on downstream imports from `src/` or shared plugin internals. Add a short link under a new “Downstream site profiles” section in `../zdoc/README.md`.

- [ ] **Step 6: Commit**

```bash
cd ../zdoc
git add README.md docs/platform/site-profile.md config/site-profile plugins/lark-docs plugins/apifox-docs plugins/report-to-lark
git commit -m "feat(plugins): add downstream adapters"
```

## Phase 2: Assemble the Chinese site

### Task 5: Lock and materialize upstream

**Files:**

- Create: `upstream.lock`
- Create: `scripts/upstream/read-lock.js`
- Create: `scripts/upstream/materialize.js`
- Test: `scripts/upstream/read-lock.test.js`
- Test: `scripts/upstream/materialize.test.js`
- Modify: `.gitignore`
- Modify: `package.json`

- [ ] **Step 1: Write failing lock tests**

Accept only repository `zilliztech/zdoc`, a 40-character lowercase SHA, compatibility `1`, and the exact key set. Reject branch names and extra keys.

- [ ] **Step 2: Add the lock**

```yaml
repository: zilliztech/zdoc
commit: 67f4c491300fbb4dd6ccb2e2630afed5c3c0d544
compatibility: 1
```

This is the inspected upstream baseline. After Phase 1 is merged, update this value in the same pull request to the exact result of `git -C ../zdoc rev-parse HEAD`, then run the lock tests before committing.

- [ ] **Step 3: Implement safe materialization**

Use `child_process.spawnSync` with argument arrays. Clone/fetch into `.zdoc-upstream/repository`, verify the remote, verify the locked object is a commit, and create `.zdoc-upstream/worktree` at that exact commit. Never log credentials.

- [ ] **Step 4: Add ignored state**

```gitignore
.zdoc-upstream/
.zdoc-assembled/
.zdoc-cache/
```

- [ ] **Step 5: Add commands**

```json
{
  "scripts": {
    "upstream:materialize": "node scripts/upstream/materialize.js",
    "assemble": "node scripts/upstream/assemble.js",
    "start:assembled": "pnpm run assemble && pnpm --dir .zdoc-assembled start",
    "build:assembled": "pnpm run assemble && pnpm --dir .zdoc-assembled build"
  }
}
```

- [ ] **Step 6: Test and commit**

```bash
node --test scripts/upstream/read-lock.test.js scripts/upstream/materialize.test.js
git add upstream.lock scripts/upstream .gitignore package.json
git commit -m "feat(upstream): lock shared zdoc platform"
```

### Task 6: Enforce overlay boundaries and assemble

**Files:**

- Create: `overlay-manifest.json`
- Create: `scripts/upstream/validate-overlay.js`
- Create: `scripts/upstream/assemble.js`
- Test: `scripts/upstream/validate-overlay.test.js`
- Test: `scripts/upstream/assemble.test.js`

- [ ] **Step 1: Write allowlist tests**

Accept only `site-profile`, `locale`, `content-config`, `plugins/cn-publish-normalizer`, `plugins/adapters/aliyun-oss`, `rest-overrides/zh-CN`, `nginx/zh-CN`, and `tests/zh-CN`. Reject writes to `src`, shared plugins, shared workflow scripts, and reusable workflows.

- [ ] **Step 2: Add the manifest**

```json
{
  "compatibility": 1,
  "copy": [
    {"from": "site-profile", "to": "site-profile/zh-CN"},
    {"from": "locale", "to": "locale/zh-CN"},
    {"from": "content-config", "to": "content-config/zh-CN"},
    {"from": "plugins/cn-publish-normalizer", "to": "plugins/cn-publish-normalizer"},
    {"from": "plugins/adapters/aliyun-oss", "to": "plugins/adapters/aliyun-oss"},
    {"from": "rest-overrides/zh-CN", "to": "rest-overrides/zh-CN"},
    {"from": "nginx/zh-CN", "to": "nginx/zh-CN"},
    {"from": "tests/zh-CN", "to": "tests/zh-CN"}
  ]
}
```

- [ ] **Step 3: Implement deterministic assembly**

Copy the locked upstream worktree into `.zdoc-assembled` while excluding `.git`, `docs`, `docs-byoc`, `reference`, `build`, `.docusaurus`, generated source caches, snapshots, checkpoints, reports, and test output. Apply allowlisted overlay entries and write `.zdoc-build-manifest.json` with upstream SHA, CN SHA, compatibility, and sorted copied paths.

- [ ] **Step 4: Test repeated assembly**

Run assembly twice and assert identical manifests and identical checksums for all non-content files.

- [ ] **Step 5: Commit**

```bash
node --test scripts/upstream/validate-overlay.test.js scripts/upstream/assemble.test.js
git add overlay-manifest.json scripts/upstream
git commit -m "feat(overlay): assemble allowlisted chinese site"
```

### Task 7: Add the Chinese site profile

**Files:**

- Create: `site-profile/index.ts`
- Create: `site-profile/workflow.cjs`
- Create: `sidebarsOnPremise.ts`
- Test: `tests/zh-CN/site-profile.test.ts`
- Test: `tests/zh-CN/site-profile.spec.ts`

- [ ] **Step 1: Write profile tests**

Assert `zh-Hans`, `https://docs.zilliz.com.cn`, Chinese support/login/signup links, legal footer, `onpremise` feature enabled, one additive docs instance, and no separate Agents docs instance.

- [ ] **Step 2: Add the profile**

Use the approved Chinese values. Configure the additive docs instance as:

```ts
docsInstances: [{
  id: 'onpremise',
  path: 'onpremise',
  routeBasePath: 'on-premise',
  sidebarPath: './sidebarsOnPremise.ts',
}]
```

- [ ] **Step 3: Build from fixture content**

```bash
pnpm run assemble
pnpm --dir .zdoc-assembled install --frozen-lockfile
ZDOC_SITE_PROFILE="$PWD/.zdoc-assembled/site-profile/zh-CN/index.ts" pnpm --dir .zdoc-assembled run typecheck
ZDOC_SITE_PROFILE="$PWD/.zdoc-assembled/site-profile/zh-CN/index.ts" pnpm --dir .zdoc-assembled run build
```

Expected: PASS.

- [ ] **Step 4: Run browser checks**

Assert Chinese regional links and footer on desktop/mobile and successful fixture routes for `/docs`, `/docs/byoc`, `/reference`, and `/on-premise`.

- [ ] **Step 5: Commit**

```bash
git add site-profile sidebarsOnPremise.ts tests/zh-CN
git commit -m "feat(profile): add chinese site configuration"
```

## Phase 3: Migrate Chinese content behavior

### Task 8: Define the new Base contract

**Files:**

- Create: `content-config/base.ts`
- Create: `tests/fixtures/base-contract.json`
- Create: `scripts/validate-base-contract.js`
- Test: `scripts/validate-base-contract.test.js`

- [ ] **Step 1: Add the exact table mapping**

```ts
export const baseConfig = {
  token: 'I6YUb1M0JajHrqsJGcLcZNh7neP',
  tables: [
    {id: 'tblsw6S3J0ekcgNB', name: '从这里开始', group: 'guides'},
    {id: 'tblYpqCgevikMomb', name: '开发指南', group: 'guides'},
    {id: 'tblMuHkoG4qMugeX', name: '运维指南', group: 'guides'},
    {id: 'tbloC4PVprwYo0P0', name: '客户端参考', group: 'reference-entry'},
    {id: 'tblRaa3JnIhllHb9', name: '工具', group: 'tools'},
    {id: 'tblr7Zec2ReTfRmw', name: 'AI 模型', group: 'guides'},
    {id: 'tblzcM4ERJ00Wjjx', name: '产品架构', group: 'guides'},
    {id: 'tblkdIEI58OHEJn0', name: '解决方案', group: 'guides'},
  ],
} as const;
```

- [ ] **Step 2: Write fixture and live validators**

Require fields `Targets`, `Parent`, `Slug`, `Docs`, `Placement Type`, and `Progress`. Allow placements `canonical`, `ref`, `section`, and `link`; allow targets `Zilliz.SaaS` and `Zilliz.PaaS`. Empty configured tables are valid.

- [ ] **Step 3: Test**

```bash
node --test scripts/validate-base-contract.test.js
node scripts/validate-base-contract.js --fixture tests/fixtures/base-contract.json
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add content-config/base.ts scripts/validate-base-contract* tests/fixtures/base-contract.json
git commit -m "feat(content): define chinese base contract"
```

### Task 9: Add a generic Base navigation reader upstream

**Files:**

- Create: `../zdoc/plugins/lark-docs/baseNavigationReader.js`
- Test: `../zdoc/plugins/lark-docs/baseNavigationReader.test.js`
- Modify: `../zdoc/plugins/lark-docs/index.js`
- Modify: `site-profile/index.ts`
- Modify: `upstream.lock`

- [ ] **Step 1: Write upstream tests**

Cover parent ordering, section rows, canonical/ref/link placement, target filtering, duplicate slug rejection, empty tables, and tool records containing Agents content.

- [ ] **Step 2: Implement a locale-neutral reader**

Accept `baseToken`, `tableId`, `targets`, and an injected client. Return the same normalized navigation model consumed by the existing writer. Do not embed Chinese names or IDs upstream.

- [ ] **Step 3: Register Chinese tables**

Declare the eight sources in the CN profile. Route tools and Agents into normal `docs`; do not recreate `docs-agents`.

- [ ] **Step 4: Commit upstream and update lock**

```bash
cd ../zdoc
node --test plugins/lark-docs/baseNavigationReader.test.js plugins/lark-docs/*.test.js
git add plugins/lark-docs
git commit -m "feat(lark-docs): support base navigation tables"
cd ../zdoc_cn
git add upstream.lock site-profile
git commit -m "feat(content): fetch chinese base tables"
```

### Task 10: Integrate Chinese Markdown and OSS adapters

**Files:**

- Retain and narrow: `plugins/cn-publish-normalizer/`
- Create: `plugins/adapters/aliyun-oss/index.js`
- Test: `plugins/adapters/aliyun-oss/index.test.js`
- Test: `tests/zh-CN/markdown-pipeline.test.js`
- Modify: `site-profile/index.ts`

- [ ] **Step 1: Add Markdown integration tests**

Run upstream MDX patching followed by the CN normalizer. Verify fences, JSX, nested generics, links, and Chinese replacement rules. Remove normalizer behavior now handled upstream.

- [ ] **Step 2: Add OSS tests**

With a fake client, verify deterministic object keys, content type, public URL, missing environment errors, and retryable failures. Read credentials only at invocation time.

- [ ] **Step 3: Register adapters**

Export the normalizer and OSS uploader through the Phase 1 adapter contract. No shared plugin file may import `ali-oss` directly.

- [ ] **Step 4: Test and commit**

```bash
node plugins/cn-publish-normalizer/normalizeCnContent.test.js
node plugins/cn-publish-normalizer/remarkCnPublishNormalizer.test.js
node --test plugins/adapters/aliyun-oss/index.test.js tests/zh-CN/markdown-pipeline.test.js
git add plugins site-profile tests/zh-CN
git commit -m "feat(content): add chinese markdown and oss adapters"
```

### Task 11: Convert REST divergence into zh-CN overrides

**Files:**

- Create: `rest-overrides/zh-CN/titles.json`
- Create: `rest-overrides/zh-CN/descriptions.json`
- Create: `rest-overrides/zh-CN/operations/`
- Create: `rest-overrides/zh-CN/localizer.js`
- Test: `rest-overrides/zh-CN/localizer.test.js`
- Modify: `site-profile/index.ts`

- [ ] **Step 1: Generate a difference inventory**

Compare current CN REST metadata and templates against locked upstream. Classify each difference as translation, China endpoint, product availability, upstream-fixed bug, or stale generated data. Retain only the first three categories.

- [ ] **Step 2: Write pure localization tests**

Assert Chinese titles, descriptions, China API hostnames, retained volume corrections, and unchanged unrelated fields. Reject an override for a missing operation ID.

- [ ] **Step 3: Generate REST docs through upstream**

```bash
pnpm run assemble
ZDOC_SITE_PROFILE="$PWD/.zdoc-assembled/site-profile/zh-CN/index.ts" pnpm --dir .zdoc-assembled exec docusaurus fetch-apifox-docs -s plugins/apifox-docs/meta/openapi/ -l zh-CN
node .zdoc-assembled/scripts/validate-generated-sidebars.js
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add rest-overrides/zh-CN site-profile
git commit -m "feat(rest): add chinese locale overrides"
```

### Task 12: Preserve on-premise as a checkpoint group

**Files:**

- Create: `content-config/onpremise.ts`
- Modify: `site-profile/workflow.cjs`
- Test: `tests/zh-CN/onpremise.test.js`
- Test: `tests/zh-CN/workflow-groups.test.js`

- [ ] **Step 1: Add route and ownership tests**

Assert the route is `/on-premise`, ownership does not overlap `docs`, the existing on-premise manual identifier is retained, and translation is disabled.

- [ ] **Step 2: Declare the group**

Declare manual `onpremise` with root `PXwawNqh0i40H4krMYlc6qgZnKe`, base `V7t6bcQWiaDL99sgUkwcEIJ0nUb`, source type `wiki`, sidebar `onPremiseSidebar`, source directory `plugins/lark-docs/meta/sources/onpremise`, target `paas`, output `onpremise/docs/ops`, images `static/img`, and `robots: noindex`. Declare exact owned content, sidebar, snapshot, and report paths in the workflow profile.

- [ ] **Step 3: Run assembled verification**

```bash
node --test tests/zh-CN/onpremise.test.js tests/zh-CN/workflow-groups.test.js
pnpm run assemble
ZDOC_WORKFLOW_PROFILE="$PWD/.zdoc-assembled/site-profile/zh-CN/workflow.cjs" node --test .zdoc-assembled/scripts/docs-workflow/*.test.js
pnpm --dir .zdoc-assembled run build
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add content-config/onpremise.ts site-profile/workflow.cjs tests/zh-CN
git commit -m "feat(content): preserve chinese on-premise group"
```

## Phase 4: Align workflows and deployment

### Task 13: Consume locked upstream reusable workflows

**Files:**

- Create: `scripts/upstream/export-workflows.js`
- Test: `scripts/upstream/export-workflows.test.js`
- Create: `.github/workflows/check-overlay.yml`
- Create: `.github/workflows/fetch-docs.yml`
- Retire after cutover: legacy fetch workflows

- [ ] **Step 1: Test workflow export**

Allow only declared reusable files from the locked checkout. Record their SHA and reject downstream modifications to exported reusable workflows.

- [ ] **Step 2: Add PR verification**

Run lock validation, overlay validation, assembly, frozen install, typecheck, shared frontend tests, Chinese tests, workflow-policy tests, and production build. Upload the build manifest and reports; do not publish content.

- [ ] **Step 3: Add Chinese orchestration**

Call the upstream producer, publisher, and verifier logic with `ZDOC_WORKFLOW_PROFILE`, Chinese credentials, Chinese report labels, and the target branch. Native Chinese groups set `translate: false`.

- [ ] **Step 4: Verify**

```bash
node --test scripts/upstream/export-workflows.test.js
pnpm run assemble
node .zdoc-assembled/scripts/validate-workflow-policy.js
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/upstream .github/workflows
git commit -m "ci: consume locked upstream documentation workflows"
```

### Task 14: Generate Nginx configuration and replace Docker build

**Files:**

- Create: `nginx/zh-CN/redirects.json`
- Create: `nginx/zh-CN/runtime.json`
- Create: `scripts/generate-nginx.js`
- Test: `scripts/generate-nginx.test.js`
- Replace: `Dockerfile`
- Create: `.dockerignore`
- Test: `tests/zh-CN/container-smoke.sh`
- Retire after cutover: `default.conf`

- [ ] **Step 1: Classify redirects**

Parse current CN and upstream Nginx files. Store only CN-specific redirects. Fail on duplicate sources or conflicts with shared redirects.

- [ ] **Step 2: Generate from upstream base**

Preserve upstream compression, cache, MIME, chat proxy, and common redirects. Add Chinese redirects and regional runtime values through structured data, not broad regex replacement.

- [ ] **Step 3: Build the assembled workspace**

Use Node 22 and pnpm 10 for the build stage and Nginx Alpine for runtime. Do not pass Lark or OSS credentials to Docker. Add OCI labels for both commits.

- [ ] **Step 4: Smoke-test**

```bash
pnpm run assemble
node scripts/generate-nginx.js --root .zdoc-assembled
docker build --build-arg CN_COMMIT="$(git rev-parse HEAD)" --build-arg UPSTREAM_COMMIT="$(node -p \"require('./scripts/upstream/read-lock').readUpstreamLock().commit\")" -t zdoc-cn:overlay-test .
bash tests/zh-CN/container-smoke.sh zdoc-cn:overlay-test
```

- [ ] **Step 5: Commit**

```bash
git add nginx/zh-CN scripts/generate-nginx* Dockerfile .dockerignore tests/zh-CN/container-smoke.sh
git commit -m "build: create chinese runtime from assembled upstream"
```

### Task 15: Update Jenkins and ArgoCD adapters

**Files:**

- Modify: `ci/build-dev.groocy`
- Modify: `ci/prod-deploy-new.groocy`
- Modify or remove after usage confirmation: `ci/prod-deploy.groocy`
- Test: `tests/zh-CN/jenkins-contract.test.js`

- [ ] **Step 1: Add static contract tests**

Require checkout access to both repositories, Node 22/pnpm 10, assembly before verification, verification before Docker, no Lark/OSS Docker build arguments, dual-SHA image tag, no deployment on failure, and ArgoCD health wait.

- [ ] **Step 2: Update development deployment**

Checkout `zdoc_cn`, fetch locked upstream using existing GitHub credentials without printing tokens, run common assembly and verification commands, build and push the candidate image, run smoke checks, then update the dev deployment.

- [ ] **Step 3: Update production promotion**

Promote the tested image from test registry to production. Put both SHAs in the deployment commit message. Keep the previous image available for rollback.

- [ ] **Step 4: Test and commit**

```bash
node --test tests/zh-CN/jenkins-contract.test.js
git add ci tests/zh-CN/jenkins-contract.test.js
git commit -m "ci: deploy assembled chinese site"
```

### Task 16: Preview, cut over, and remove duplicated shared code

**Files:**

- Create: `tests/zh-CN/preview.spec.ts`
- Create: `.claude/superpowers/plans/evidence/zdoc-cn-overlay-cutover.md`
- Remove after successful preview: `docusaurus.config.js`
- Remove after successful preview: copied shared plugin implementations
- Remove after successful preview: `default.conf`
- Remove after successful preview: legacy fetch workflows
- Modify: `README.md`

- [ ] **Step 1: Deploy an isolated preview**

Use a distinct namespace, hostname, deployment, and image tag. Do not alter production routing.

- [ ] **Step 2: Run browser parity tests**

Verify desktop/mobile navigation, Chinese search, chat, copy buttons, tables, `/docs`, `/docs/byoc`, `/on-premise`, `/reference`, Agents under normal docs, sitemap, Markdown exports, redirects, and 404 behavior.

- [ ] **Step 3: Compare route inventories**

Compare current production and preview sitemaps. Every removed route requires an approved redirect or explicit removal record. Verify Chinese canonical URLs and structured data.

- [ ] **Step 4: Record evidence**

Write both commits, image tag, test results, route diff, known non-blocking findings, previous rollback image, and approval in the evidence file.

- [ ] **Step 5: Switch production**

Deploy the approved dual-SHA image, wait for ArgoCD health, and run external smoke checks before declaring success.

- [ ] **Step 6: Prove rollback**

Select or dry-run the previous image and confirm the previous `upstream.lock` is recorded and buildable.

- [ ] **Step 7: Remove duplicates**

Delete only files now supplied by upstream assembly. Retain the overlay profile, adapters, content mappings, deployment integration, tests, design, plan, and evidence.

- [ ] **Step 8: Run final verification**

```bash
node --test scripts/upstream/*.test.js scripts/validate-base-contract.test.js tests/zh-CN/*.test.js
pnpm run assemble
pnpm --dir .zdoc-assembled run typecheck
pnpm --dir .zdoc-assembled run test:frontend
pnpm --dir .zdoc-assembled run build
bash tests/zh-CN/container-smoke.sh "$RELEASE_IMAGE"
```

Expected: PASS.

- [ ] **Step 9: Commit cleanup**

```bash
git add -A
git commit -m "refactor: make chinese site an upstream overlay"
```

## Final self-check before execution

- [ ] Every shared behavior change is assigned to `../zdoc`.
- [ ] Every Chinese-only behavior is assigned to an allowlisted overlay location.
- [ ] Agents is part of normal docs and `onpremise` remains independent.
- [ ] Live Base access is required only for live contract/fetch jobs; unit tests use fixtures.
- [ ] Production never follows a moving upstream branch.
- [ ] No secret is copied into the assembled source, static runtime placeholder, build manifest, or Docker history.
- [ ] Production cutover occurs only after preview evidence and rollback proof.
