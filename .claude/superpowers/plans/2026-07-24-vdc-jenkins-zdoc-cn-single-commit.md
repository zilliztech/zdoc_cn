# vdc-jenkins zdoc_cn Single-Commit Build Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Chinese dev Jenkins pipeline build, label, push, and deploy one immutable directly buildable `zdoc_cn` commit without content/tooling assembly.

**Architecture:** Keep the existing single polling checkout from `params.BRANCH`, capture the GitSCM-returned full SHA as `BUILD_SHA`, validate it, and use it for image identity and OCI metadata. The job performs no secondary checkout, generated-state restore, locale repair, or content copy. The English Jenkins job is outside the change set.

**Tech Stack:** Jenkins Declarative Pipeline, GitSCM, Groovy, Node.js built-in test runner, Docker, Harbor, cicd-portal image sync, Argo CD.

---

## Prerequisite and Upstream Sync

Do not start until the `zdoc_cn` plan produces a directly buildable feature SHA. Before any local read or write in `../vdc-jenkins`, synchronize with `gh`:

```bash
cd ../vdc-jenkins
gh repo sync AnthonyTsu1984/vdc-jenkins --source zilliztech/vdc-jenkins --branch master
git fetch origin master
git switch -c fix/zdocs-cn-single-commit origin/master
git merge-base --is-ancestor origin/master HEAD
```

Expected: the branch starts from current upstream `master`, not PR #321 or `fix/zdocs-cn-master-tooling`.

## File Map

- Create `zilliz-docs/zilliz-docs-cn-dev.test.js`: one-checkout, one-SHA, direct-build contract.
- Modify `zilliz-docs/zilliz-docs-cn-dev.groovy`: capture and propagate `BUILD_SHA`.
- Do not modify `zilliz-docs/zilliz-docs-dev.groovy` or any English pipeline file.

### Task 1: Add the single-commit Jenkins contract test

**Files:**

- Create/test: `zilliz-docs/zilliz-docs-cn-dev.test.js`

- [ ] **Step 1: Create the failing test**

```javascript
'use strict'
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')

const pipeline = fs.readFileSync(path.join(__dirname, 'zilliz-docs-cn-dev.groovy'), 'utf8')

test('checks out the requested branch exactly once', () => {
  assert.equal((pipeline.match(/\bcheckout\s*\(/g) || []).length, 1)
  assert.match(pipeline, /def buildCheckout = checkout\(/)
  assert.match(pipeline, /branches: \[\[name: "\*\/\$\{params\.BRANCH\}"\]\]/)
  assert.match(pipeline, /env\.BUILD_SHA = buildCheckout\.GIT_COMMIT/)
  assert.match(pipeline, /BUILD_SHA ==~ \/\[0-9a-f\]\{40\}\//)
})

test('builds without overlays', () => {
  assert.doesNotMatch(pipeline, /restore-generated-state|TOOLING_SHA|CONTENT_SHA/)
  assert.match(pipeline, /docker build --network=host/)
})

test('uses one revision for image identity', () => {
  assert.match(pipeline, /env\.BUILD_SHORT = env\.BUILD_SHA\.take\(9\)/)
  assert.match(pipeline, /env\.IMAGE_TAG = "\$\{params\.BRANCH\}-\$\{date\}-\$\{env\.BUILD_SHORT\}"/)
  assert.match(pipeline, /--label org\.opencontainers\.image\.revision=\$\{env\.BUILD_SHA\}/)
})

test('is scoped to the Chinese job', () => {
  assert.match(pipeline, /IMAGE_REPO = 'vdc\/zilliz-docs-cn'/)
  assert.doesNotMatch(pipeline, /zilliz-docs-dev\.groovy/)
})
```

- [ ] **Step 2: Run and observe failure**

```bash
node --test zilliz-docs/zilliz-docs-cn-dev.test.js
```

Expected: FAIL because the current pipeline ignores the checkout result and has no full revision label.

- [ ] **Step 3: Commit the failing test**

```bash
git add zilliz-docs/zilliz-docs-cn-dev.test.js
git commit -m "test(zdocs-cn): require a single immutable build"
```

### Task 2: Capture and propagate one BUILD_SHA

**Files:**

- Modify: `zilliz-docs/zilliz-docs-cn-dev.groovy`
- Test: `zilliz-docs/zilliz-docs-cn-dev.test.js`

- [ ] **Step 1: Capture the GitSCM result**

```groovy
def buildCheckout = checkout([
    $class: 'GitSCM',
    branches: [[name: "*/${params.BRANCH}"]],
    extensions: [[$class: 'PruneStaleBranch'], [$class: 'CleanBeforeCheckout']],
    userRemoteConfigs: [[url: 'https://github.com/zilliztech/zdoc_cn.git', credentialsId: env.GITHUB_CREDENTIAL_ID]]
])
env.BUILD_SHA = buildCheckout.GIT_COMMIT
if (!(env.BUILD_SHA ==~ /[0-9a-f]{40}/)) {
    error "Invalid build commit SHA: ${env.BUILD_SHA}"
}
env.BUILD_SHORT = env.BUILD_SHA.take(9)
```

- [ ] **Step 2: Use the revision for tag, description, and OCI label**

```groovy
env.IMAGE_TAG = "${params.BRANCH}-${date}-${env.BUILD_SHORT}"
currentBuild.description = "${env.IMAGE_TAG} revision:${env.BUILD_SHORT}"
echo "Build SHA: ${env.BUILD_SHA}"
```

Add `--label org.opencontainers.image.revision=${env.BUILD_SHA}` to `docker build`. Do not add a tooling revision label.

- [ ] **Step 3: Test and commit**

```bash
node --test zilliz-docs/zilliz-docs-cn-dev.test.js
git diff --check
git add zilliz-docs/zilliz-docs-cn-dev.groovy zilliz-docs/zilliz-docs-cn-dev.test.js
git commit -m "fix(zdocs-cn): build one immutable commit"
```

Expected: PASS with exactly one checkout and two changed files.

### Task 3: Validate against the zdoc_cn feature SHA and open a replacement PR

**Files:** Verify the two Chinese job files only.

- [ ] **Step 1: Prove the feature SHA builds outside Jenkins**

In the `zdoc_cn` worktree:

```bash
git fetch origin feat/single-language-publication
feature_sha=$(git rev-parse origin/feat/single-language-publication)
git cat-file -e "$feature_sha^{commit}"
docker build --network=host --label org.opencontainers.image.revision="$feature_sha" -t zdoc-cn-single-language:"${feature_sha:0:9}" .
```

Expected: build succeeds without restoring another ref.

- [ ] **Step 2: Run Jenkins with `BRANCH=feat/single-language-publication`**

Expected console evidence: one Build SHA matching branch head, tag suffix matching the first nine characters, OCI revision equal to the full SHA, and successful `/docs/home`, `/docs/byoc/`, and `/reference/python` smoke routes.

- [ ] **Step 3: Recheck scope**

```bash
node --test zilliz-docs/zilliz-docs-cn-dev.test.js
git diff origin/master...HEAD --name-only
git diff --check
```

Expected changed files are exactly the Groovy job and its test.

- [ ] **Step 4: Push and open the new PR**

```bash
git push -u origin fix/zdocs-cn-single-commit
gh pr create --repo zilliztech/vdc-jenkins --base master --head AnthonyTsu1984:fix/zdocs-cn-single-commit --title "fix(zdocs-cn): build one immutable commit" --body-file /tmp/zdocs-cn-single-commit-pr.md
```

The PR body names the validated `zdoc_cn` SHA and Jenkins build URL, states that PR #321 is superseded, and confirms the English job is unchanged.

- [ ] **Step 5: Handle PR #321 after replacement validation**

Close PR #321 as superseded, or ask its owner to close it, only after the replacement PR and evidence exist. Do not merge, rebase, or amend PR #321.

### Task 4: Coordinate rollout and rollback

- [ ] **Step 1: Merge in buildable order**

Merge the `zdoc_cn` change first and confirm `dev` builds with the existing direct-checkout Jenkins job. Then merge the new `vdc-jenkins` PR.

- [ ] **Step 2: Verify the formal job**

Trigger with `BRANCH=dev` and confirm Jenkins checkout SHA, image OCI revision, and the `zdoc_cn/dev` SHA validated by GitHub Actions are identical.

- [ ] **Step 3: Record independent rollback points**

Record the prior Jenkins Groovy commit and prior deploy image tag. A Jenkins regression reverts only `vdc-jenkins`; a content regression deploys the prior `zdoc_cn` image. Neither rollback restores PR #321's two-checkout design.

