const fs = require('node:fs');
const path = require('node:path');

const BLOCKED_PREFIXES = [
  'src',
  'plugins/lark-docs',
  'plugins/mdx-parse',
  'plugins/report-to-lark',
  'plugins/apifox-docs',
  'scripts/docs-workflow',
];

const BLOCKED_FILES = new Set([
  'docusaurus.config.ts',
  'package.json',
  'pnpm-lock.yaml',
]);

const ALLOWED_COPY_TARGETS = new Map([
  ['site-profile', 'site-profile/zh-CN'],
  ['content-config', 'content-config/zh-CN'],
  ['config/lark-docs.config.ts', 'config/lark-docs.config.ts'],
  ['config/cn-publish-replacements.js', 'config/cn-publish-replacements.js'],
  ['plugins/cn-publish-normalizer', 'plugins/cn-publish-normalizer'],
  ['plugins/adapters/aliyun-oss', 'plugins/adapters/aliyun-oss'],
  ['rest-overrides/zh-CN', 'rest-overrides/zh-CN'],
  ['nginx/zh-CN', 'nginx/zh-CN'],
  ['ci', 'ci/zh-CN'],
  ['tests/zh-CN', 'tests/zh-CN'],
]);

function isAbsolute(input) {
  return path.posix.isAbsolute(input) || path.win32.isAbsolute(input);
}

function normalizeRelativePath(input, label) {
  if (typeof input !== 'string' || input.trim() === '') {
    throw new Error(`${label} must be a non-empty string`);
  }
  if (input.includes('\\')) throw new Error(`${label} must use POSIX separators`);
  if (isAbsolute(input)) throw new Error(`${label} must be relative: ${input}`);
  const normalized = path.posix.normalize(input);
  if (normalized === '.' || normalized.startsWith('../') || normalized === '..') {
    throw new Error(`${label} must not use path traversal: ${input}`);
  }
  return normalized;
}

function isBlockedDestination(toPath) {
  if (BLOCKED_FILES.has(toPath)) return true;
  if (/^\.github\/workflows\/_[^/]+\.ya?ml$/.test(toPath)) return true;
  return BLOCKED_PREFIXES.some((blocked) => toPath === blocked || toPath.startsWith(`${blocked}/`));
}

function validateCopyEntry(entry, seenTargets) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error('copy entry must be an object');
  }
  const from = normalizeRelativePath(entry.from, 'copy.from');
  const to = normalizeRelativePath(entry.to, 'copy.to');
  for (const key of Object.keys(entry)) {
    if (!['from', 'to', 'optional'].includes(key)) throw new Error(`Invalid copy entry key: ${key}`);
  }
  if (entry.optional !== undefined && typeof entry.optional !== 'boolean') {
    throw new Error(`copy.optional must be boolean for ${to}`);
  }
  if (isBlockedDestination(to)) throw new Error(`copy.to is blocked: ${to}`);
  if (ALLOWED_COPY_TARGETS.get(from) !== to) {
    throw new Error(`copy entry is not allowlisted: ${from} -> ${to}`);
  }
  if (seenTargets.has(to)) throw new Error(`Duplicate overlay destination: ${to}`);
  seenTargets.add(to);
  return { from, to, optional: entry.optional === true };
}

function validatePatchEntry(entry, seenPatches) {
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
    throw new Error('patch entry must be an object');
  }
  const patchPath = normalizeRelativePath(entry.path, 'patch.path');
  if (!patchPath.startsWith('patches/upstream/') || !patchPath.endsWith('.patch')) {
    throw new Error(`patch.path must be under patches/upstream and end with .patch: ${patchPath}`);
  }
  if (seenPatches.has(patchPath)) throw new Error(`Duplicate patch path: ${patchPath}`);
  seenPatches.add(patchPath);
  if (typeof entry.reason !== 'string' || entry.reason.trim() === '') {
    throw new Error(`patch ${patchPath} must include a reason`);
  }
  if (typeof entry.removeWhen !== 'string' || entry.removeWhen.trim() === '') {
    throw new Error(`patch ${patchPath} must include removeWhen`);
  }
  return { path: patchPath, reason: entry.reason, removeWhen: entry.removeWhen };
}

function validateOverlayManifest(manifest) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('overlay manifest must be an object');
  }
  const allowedKeys = new Set(['compatibility', 'copy', 'patches']);
  for (const key of Object.keys(manifest)) {
    if (!allowedKeys.has(key)) throw new Error(`Invalid overlay manifest key: ${key}`);
  }
  if (manifest.compatibility !== 1) {
    throw new Error(`Unsupported overlay compatibility: ${manifest.compatibility}`);
  }
  if (!Array.isArray(manifest.copy)) throw new Error('overlay copy must be an array');
  if (!Array.isArray(manifest.patches)) throw new Error('overlay patches must be an array');

  const seenTargets = new Set();
  const seenPatches = new Set();
  return {
    compatibility: manifest.compatibility,
    copy: manifest.copy.map((entry) => validateCopyEntry(entry, seenTargets)),
    patches: manifest.patches.map((entry) => validatePatchEntry(entry, seenPatches)),
  };
}

function readOverlayManifest(filePath = path.resolve(__dirname, '..', '..', 'overlay-manifest.json')) {
  return validateOverlayManifest(JSON.parse(fs.readFileSync(filePath, 'utf8')));
}

module.exports = {
  BLOCKED_FILES,
  BLOCKED_PREFIXES,
  ALLOWED_COPY_TARGETS,
  isBlockedDestination,
  normalizeRelativePath,
  readOverlayManifest,
  validateOverlayManifest,
};
