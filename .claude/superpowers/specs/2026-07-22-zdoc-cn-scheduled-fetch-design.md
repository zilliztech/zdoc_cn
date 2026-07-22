# Scheduled CN Docs Fetch Design

## Goal

Run the existing CN docs production workflow automatically while retaining its manual dispatch interface.

## Design

Add a GitHub Actions `schedule` event to `.github/workflows/fetch-docs.yml` alongside `workflow_dispatch`. Use the cron expression `0 6,14,22 * * *`, which shifts the upstream `zdoc` cadence four hours later at each timepoint.

Scheduled events will use the workflow's existing event-aware defaults:

- content group: `all`
- artifact retention: 3 days
- target branch: `dev`
- publishing: enabled
- tooling ref: `master`

Manual dispatch behavior and inputs remain unchanged. The existing concurrency group continues to serialize manual and scheduled production runs.

## Validation

- Parse the workflow as YAML.
- Assert that both `workflow_dispatch` and `schedule` are present.
- Assert that the schedule is exactly `0 6,14,22 * * *`.
- Review the diff to confirm that no job behavior changed.
