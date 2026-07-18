const fs = require('node:fs');
const path = require('node:path');
const { readLock } = require('./read-lock');
const { hashFile } = require('./assemble');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label} mismatch: expected ${expected}, got ${actual}`);
  }
}

function validateAssembled(rootDir = path.resolve(__dirname, '..', '..')) {
  const assembledDir = path.join(rootDir, '.zdoc-assembled');
  const manifestPath = path.join(assembledDir, '.zdoc-build-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error(`Assembled build manifest does not exist: ${manifestPath}`);
  }

  const lock = readLock(path.join(rootDir, 'upstream.lock'));
  const manifest = readJson(manifestPath);
  assertEqual(manifest.upstream.repository, lock.repository, 'upstream repository');
  assertEqual(manifest.upstream.commit, lock.commit, 'upstream commit');
  assertEqual(manifest.compatibility, lock.compatibility, 'compatibility');
  assertEqual(manifest.overlayManifest.sha256, hashFile(path.join(rootDir, 'overlay-manifest.json')), 'overlay manifest hash');

  const copied = manifest.copiedOverlayPaths || [];
  const sorted = [...copied].sort();
  assertEqual(JSON.stringify(copied), JSON.stringify(sorted), 'copied overlay path order');
  for (const copiedPath of copied) {
    if (!fs.existsSync(path.join(assembledDir, copiedPath))) {
      throw new Error(`Copied overlay path missing from assembled workspace: ${copiedPath}`);
    }
  }

  const skipped = manifest.skippedOptionalOverlayPaths || [];
  const sortedSkipped = [...skipped].sort();
  assertEqual(JSON.stringify(skipped), JSON.stringify(sortedSkipped), 'skipped optional overlay path order');
  const copiedSet = new Set(copied);
  for (const skippedPath of skipped) {
    if (copiedSet.has(skippedPath)) {
      throw new Error(`Overlay path cannot be both copied and skipped: ${skippedPath}`);
    }
  }

  for (const patch of manifest.patches || []) {
    assertEqual(patch.sha256, hashFile(path.join(rootDir, patch.path)), `patch hash for ${patch.path}`);
  }

  return manifest;
}

if (require.main === module) {
  validateAssembled();
  process.stdout.write('validate-assembled passed\n');
}

module.exports = { validateAssembled };
