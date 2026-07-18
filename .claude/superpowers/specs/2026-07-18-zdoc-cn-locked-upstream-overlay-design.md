# Zdoc CN Locked Upstream Overlay Design

## Status

Approved direction as of 2026-07-18: do not change upstream `../zdoc` for now. `zdoc_cn` consumes tooling from a pinned upstream branch or commit through a deterministic assembled workspace.

## Goal

Make `zdoc_cn` use the frontend, build scripts, workflows, and shared tooling from an associated `zdoc` commit while keeping all Chinese-specific behavior local to this repository.

## Decision

`zdoc_cn` will not import from the sibling `../zdoc` path at runtime and will not require upstream changes before this phase can proceed.

Instead, `zdoc_cn` owns a local assembly layer:

1. Read `upstream.lock`.
2. Materialize the exact upstream commit into ignored state.
3. Copy that upstream tree into `.zdoc-assembled`.
4. Apply an allowlisted Chinese overlay.
5. Apply exact local patches only when upstream has no usable extension point.
6. Run upstream commands from `.zdoc-assembled`.
7. Run Chinese verification gates against the assembled output.

## Non-Goals

- No commits to `../zdoc` during this phase.
- No direct sibling imports such as `require('../zdoc/scripts/...')`.
- No wholesale manual merge of the refactored upstream tree into `zdoc_cn`.
- No replacement of shared upstream implementation directories unless declared as an exact temporary patch.
- No moving upstream branch in production; builds use immutable commits.

## Repository Responsibilities

### Upstream `zdoc`

`zdoc` remains the source for shared platform code:

- Docusaurus configuration shape and frontend theme.
- Generated sidebars and sidebar validation.
- Shared docs workflow scripts.
- Shared Lark, REST, MDX, link-check, search, chat, reporting, Docker, and Nginx tooling.
- Node, pnpm, TypeScript, Vitest, Playwright, and build conventions.

### Downstream `zdoc_cn`

`zdoc_cn` owns only local overlay inputs:

- `upstream.lock`
- `overlay-manifest.json`
- `scripts/upstream/`
- `patches/upstream/`
- `site-profile/`
- `content-config/`
- `plugins/cn-publish-normalizer/`
- `plugins/adapters/aliyun-oss/`
- `rest-overrides/zh-CN/`
- `nginx/zh-CN/`
- `ci/`
- `tests/zh-CN/`
- `.claude/superpowers/specs/`
- `.claude/superpowers/plans/`
- `.claude/worktrees/`

## Worktree Policy

All local Git worktrees for this migration live under:

```text
.claude/worktrees/
```

The directory is ignored by Git. Stale worktrees are removed with `git worktree remove` when registered, or by deleting the ignored directory when unregistered. Dirty registered worktrees must be preserved with a stash or commit before removal.

## Upstream Lock

`upstream.lock` records the upstream source of truth:

```yaml
repository: zilliztech/zdoc
commit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f
compatibility: 1
source: ../zdoc
```

Rules:

- `repository` must be exactly `zilliztech/zdoc`.
- `commit` must be a 40-character lowercase SHA.
- `compatibility` must be `1`.
- `source` is optional and local-development only. If present, it may point at `../zdoc`; CI may ignore it and fetch from the repository remote.
- Extra keys are rejected.

## Assembly Model

Ignored state:

```text
.zdoc-upstream/
.zdoc-assembled/
.zdoc-cache/
```

Assembly creates this flow:

```text
zdoc_cn checkout
  -> scripts/upstream/materialize.js
  -> .zdoc-upstream/worktree at locked zdoc commit
  -> scripts/upstream/assemble.js
  -> .zdoc-assembled
  -> overlay files copied by overlay-manifest.json
  -> exact patches from patches/upstream
  -> .zdoc-assembled/.zdoc-build-manifest.json
```

The build manifest records:

- upstream repository
- upstream commit
- downstream commit
- compatibility
- overlay manifest hash
- patch list and patch hashes
- sorted copied overlay paths

## Overlay Manifest

`overlay-manifest.json` allowlists downstream writes. Initial allowed paths:

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
  "patches": [
    {"path": "patches/upstream/0001-cn-site-profile-bootstrap.patch", "reason": "Inject CN profile and normalizer until upstream exposes a serializable profile hook"}
  ]
}
```

Blocked destinations:

```text
src/
plugins/lark-docs/
plugins/mdx-parse/
plugins/report-to-lark/
plugins/apifox-docs/
scripts/docs-workflow/
.github/workflows/_*.yml
docusaurus.config.ts
package.json
pnpm-lock.yaml
```

Blocked files may only be touched by exact patches under `patches/upstream/`, never by overlay copy.

## Patch Policy

Patches are temporary downstream shims. Every patch must:

- apply exactly with `git apply --check`;
- have a focused test or smoke command;
- include a reason in `overlay-manifest.json`;
- include a removal condition in a nearby `patches/upstream/README.md`;
- be listed in `.zdoc-build-manifest.json`;
- fail assembly if it no longer applies.

Preferred mechanisms before patches:

1. environment variable accepted by upstream tooling;
2. upstream CLI argument;
3. Docusaurus plugin composition;
4. overlay-owned generated config;
5. exact patch.

## Chinese Publish Normalization

`plugins/cn-publish-normalizer/` remains Chinese-owned. It normalizes CN-specific URLs, endpoints, providers, regions, and publish artifacts.

The normalizer is applied in the assembled workspace by the smallest available mechanism:

1. if upstream config already has a safe plugin hook, register through overlay config;
2. otherwise apply an exact patch to inject the remark plugin and `build:cn-publish` command;
3. always run `test:cn-publish-normalizer` and artifact verification after build.

## Verification Gates

### Local Unit Gates

```bash
node --test scripts/upstream/read-lock.test.js
node --test scripts/upstream/materialize.test.js
node --test scripts/upstream/validate-overlay.test.js
node --test scripts/upstream/assemble.test.js
npm run test:cn-publish-normalizer
```

### Assembly Gates

```bash
npm run upstream:materialize
npm run assemble
node scripts/upstream/validate-assembled.js
```

### Build Gates

```bash
pnpm --dir .zdoc-assembled install --frozen-lockfile
pnpm --dir .zdoc-assembled run build
node scripts/verify-cn-publish-artifacts.js .zdoc-assembled/build
```

### Non-Mutation Gate

After build, source directories in `zdoc_cn` must remain unchanged:

```bash
git status --short docs docs-agents versioned_docs reference onpremise plugins/cn-publish-normalizer scripts/upstream
```

## Maintenance Workflow

1. A developer updates `upstream.lock` to a new upstream SHA.
2. The branch runs materialize, assemble, test, and build gates.
3. Any exact patch failures are fixed locally or converted into overlay config.
4. The pull request records upstream SHA, CN SHA, patch list, and verification results.
5. Production builds use the same lock and assembly commands.

## Success Criteria

- No upstream `../zdoc` changes are required for this phase.
- `zdoc_cn` can build from the pinned upstream commit in `.zdoc-assembled`.
- CN normalizer and publish verification still run.
- Stale worktrees are absent; future worktrees live under `.claude/worktrees/`.
- The assembled manifest makes both input commits and local overlays auditable.
- Direct sibling imports are absent from committed code.
