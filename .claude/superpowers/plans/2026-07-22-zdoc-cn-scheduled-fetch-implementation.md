# Scheduled CN Docs Fetch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically run the CN docs production workflow three times daily, four hours after each upstream `zdoc` run, without removing manual dispatch.

**Architecture:** Extend the existing `fetch-docs.yml` event block with one GitHub Actions cron schedule. Update the workflow policy regression test so the scheduled trigger becomes required while the existing manual trigger, manual publish default, and no-push constraints remain enforced.

**Tech Stack:** GitHub Actions YAML, Node.js `node:test`, `js-yaml`, repository workflow policy validation.

---

### Task 1: Enable and enforce the scheduled trigger

**Files:**
- Modify: `scripts/validate-workflow-policy.test.js:228-240`
- Modify: `.github/workflows/fetch-docs.yml:1-26`

- [ ] **Step 1: Change the regression test to require the schedule**

Replace the test beginning at line 228 of `scripts/validate-workflow-policy.test.js` with:

```javascript
test('CN docs production supports manual dispatch and the approved schedule', () => {
  const workflowPath = path.join(process.cwd(), '.github/workflows/fetch-docs.yml')
  const triggerBlock = fs.readFileSync(workflowPath, 'utf8').split('\npermissions:')[0]
  assert.match(triggerBlock, /^name: fetch CN docs$/m)
  assert.match(triggerBlock, /workflow_dispatch:/)
  assert.match(triggerBlock, /^  schedule:\n    - cron: "0 6,14,22 \* \* \*"$/m)
  assert.match(triggerBlock, /publish:[\s\S]*default: false/)
  assert.doesNotMatch(triggerBlock, /\n\s+push:/)
  const workflow = fs.readFileSync(workflowPath, 'utf8')
  assert.match(workflow, /CN Docs Build/)
  assert.match(workflow, /CN Docs Artifact-Only Build/)
  assert.doesNotMatch(workflow, /Global Docs(?: Artifact-Only)? Build/)
})
```

- [ ] **Step 2: Run the focused test and verify it fails for the missing schedule**

Run:

```bash
node --test --test-name-pattern="CN docs production supports manual dispatch" scripts/validate-workflow-policy.test.js
```

Expected: FAIL because `.github/workflows/fetch-docs.yml` does not yet contain `schedule` with cron `0 6,14,22 * * *`.

- [ ] **Step 3: Add the schedule to the workflow**

Change the beginning of `.github/workflows/fetch-docs.yml` to:

```yaml
name: fetch CN docs
on:
  schedule:
    - cron: "0 6,14,22 * * *"
  workflow_dispatch:
    inputs:
```

Keep the existing `workflow_dispatch.inputs` mapping and all remaining workflow content unchanged.

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
node --test --test-name-pattern="CN docs production supports manual dispatch" scripts/validate-workflow-policy.test.js
```

Expected: PASS.

- [ ] **Step 5: Run the complete workflow policy suite**

Run:

```bash
node --test scripts/validate-workflow-policy.test.js
```

Expected: all tests pass.

- [ ] **Step 6: Run the workflow policy validator and diff checks**

Run:

```bash
node scripts/validate-workflow-policy.js
git diff --check
git diff -- .github/workflows/fetch-docs.yml scripts/validate-workflow-policy.test.js
```

Expected: the validator exits successfully, `git diff --check` emits no output, and the diff contains only the new trigger plus the matching policy-test update.

- [ ] **Step 7: Commit the implementation**

Run:

```bash
git add .github/workflows/fetch-docs.yml scripts/validate-workflow-policy.test.js
git commit -m "ci: schedule CN docs workflow"
```

Expected: one commit containing the workflow trigger and its regression test.
