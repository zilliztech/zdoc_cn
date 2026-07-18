# Upstream Patch Policy

Patches in this directory are temporary exact-apply shims for the locked upstream commit.

Every patch must be listed in `overlay-manifest.json` with a reason and a removal condition. Assembly fails if `git apply --check` fails.

Prefer environment variables, upstream CLI arguments, Docusaurus composition, or overlay-owned generated config before adding a patch.
