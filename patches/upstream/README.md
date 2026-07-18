# Upstream Patch Policy

Patches in this directory are temporary exact-apply shims for the locked upstream commit.

Every patch must be listed in `overlay-manifest.json` with a reason and a removal condition. Assembly fails if `git apply --check` fails.

Prefer environment variables, upstream CLI arguments, Docusaurus composition, or overlay-owned generated config before adding a patch.

## Active Patches

- `0001-cn-build-normalizer.patch`: registers the CN markdown normalizer and CN publish scripts in the assembled workspace. Remove when upstream exposes a serializable site profile or remark plugin hook.
