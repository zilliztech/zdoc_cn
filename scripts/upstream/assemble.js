const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { readLock } = require('./read-lock');
const { readOverlayManifest, validateOverlayManifest } = require('./validate-overlay');
const { run } = require('./materialize');

const EXCLUDED_NAMES = new Set([
  '.git',
  'build',
  '.docusaurus',
  'node_modules',
  '.zdoc-upstream',
  '.zdoc-assembled',
  '.zdoc-cache',
]);

function removePath(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function ensureParent(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function copyTree(source, target, options = {}) {
  const copiedFiles = options.copiedFiles || [];
  if (!fs.existsSync(source)) return copiedFiles;

  const stat = fs.lstatSync(source);
  const name = path.basename(source);
  if (EXCLUDED_NAMES.has(name)) return copiedFiles;

  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const child of fs.readdirSync(source).sort()) {
      copyTree(path.join(source, child), path.join(target, child), options);
    }
    return copiedFiles;
  }

  ensureParent(target);
  if (stat.isSymbolicLink()) {
    fs.symlinkSync(fs.readlinkSync(source), target);
  } else {
    fs.copyFileSync(source, target);
  }
  fs.chmodSync(target, stat.mode);
  copiedFiles.push(path.relative(options.relativeRoot || target, target).split(path.sep).join('/'));
  return copiedFiles;
}

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function readTextIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function getDownstreamCommit(rootDir) {
  try {
    return run('git', ['rev-parse', 'HEAD'], { cwd: rootDir });
  } catch (error) {
    return null;
  }
}

function applyPatches(rootDir, assembledDir, patches) {
  return patches.map((patch) => {
    const patchPath = path.join(rootDir, patch.path);
    if (!fs.existsSync(patchPath)) throw new Error(`Patch file does not exist: ${patch.path}`);
    run('git', ['apply', '--check', patchPath], { cwd: assembledDir });
    run('git', ['apply', patchPath], { cwd: assembledDir });
    return {
      path: patch.path,
      reason: patch.reason,
      removeWhen: patch.removeWhen,
      sha256: hashFile(patchPath),
    };
  });
}

function writeBuildManifest(rootDir, assembledDir, lock, overlayManifest, copiedOverlayPaths, patches) {
  const manifestPath = path.join(rootDir, 'overlay-manifest.json');
  const buildManifest = {
    upstream: {
      repository: lock.repository,
      commit: lock.commit,
    },
    downstream: {
      commit: getDownstreamCommit(rootDir),
    },
    compatibility: lock.compatibility,
    overlayManifest: {
      sha256: hashContent(readTextIfExists(manifestPath)),
    },
    patches,
    copiedOverlayPaths: [...copiedOverlayPaths].sort(),
  };
  fs.writeFileSync(
    path.join(assembledDir, '.zdoc-build-manifest.json'),
    `${JSON.stringify(buildManifest, null, 2)}\n`,
  );
  return buildManifest;
}

function assembleWorkspace(options = {}) {
  const rootDir = options.rootDir || path.resolve(__dirname, '..', '..');
  const upstreamDir = options.upstreamDir || path.join(rootDir, '.zdoc-upstream', 'worktree');
  const assembledDir = options.assembledDir || path.join(rootDir, '.zdoc-assembled');
  const lock = options.lock || readLock(path.join(rootDir, 'upstream.lock'));
  const overlayManifest = options.overlayManifest
    ? validateOverlayManifest(options.overlayManifest)
    : readOverlayManifest(path.join(rootDir, 'overlay-manifest.json'));

  if (!fs.existsSync(upstreamDir)) {
    throw new Error(`Materialized upstream does not exist: ${upstreamDir}`);
  }

  removePath(assembledDir);
  fs.mkdirSync(assembledDir, { recursive: true });
  copyTree(upstreamDir, assembledDir, { relativeRoot: assembledDir });

  const copiedOverlayPaths = [];
  for (const entry of overlayManifest.copy) {
    const from = path.join(rootDir, entry.from);
    if (!fs.existsSync(from)) continue;
    copyTree(from, path.join(assembledDir, entry.to), {
      copiedFiles: copiedOverlayPaths,
      relativeRoot: assembledDir,
    });
  }

  copiedOverlayPaths.sort();
  const patchManifest = applyPatches(rootDir, assembledDir, overlayManifest.patches);
  return writeBuildManifest(rootDir, assembledDir, lock, overlayManifest, copiedOverlayPaths, patchManifest);
}

if (require.main === module) {
  const manifest = assembleWorkspace();
  process.stdout.write(`${JSON.stringify(manifest, null, 2)}\n`);
}

module.exports = {
  EXCLUDED_NAMES,
  assembleWorkspace,
  copyTree,
  hashFile,
};
