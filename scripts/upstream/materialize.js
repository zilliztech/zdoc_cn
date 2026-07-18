const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { readLock } = require('./read-lock');

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd,
    encoding: 'utf8',
    env: options.env ? { ...process.env, ...options.env } : process.env,
    stdio: options.stdio || 'pipe',
  });
  if (result.status !== 0) {
    const output = [result.stderr, result.stdout].filter(Boolean).join('\n').trim();
    throw new Error(`${command} ${args.join(' ')} failed${output ? `\n${output}` : ''}`);
  }
  return result.stdout ? result.stdout.trim() : '';
}

function assertGitWorkTree(sourceDir) {
  const inside = run('git', ['rev-parse', '--is-inside-work-tree'], { cwd: sourceDir });
  if (inside !== 'true') throw new Error(`source is not a git worktree: ${sourceDir}`);
}

function resolveCommit(sourceDir, commit) {
  try {
    return run('git', ['rev-parse', `${commit}^{commit}`], { cwd: sourceDir });
  } catch (error) {
    throw new Error(`Locked upstream commit is not available in source: ${commit}`);
  }
}

function removePath(targetPath) {
  fs.rmSync(targetPath, { recursive: true, force: true });
}

function resolveSourceDir(rootDir, sourceHint) {
  const rootRelative = path.resolve(rootDir, sourceHint);
  if (fs.existsSync(rootRelative)) return rootRelative;

  try {
    const commonDir = run('git', ['rev-parse', '--git-common-dir'], { cwd: rootDir });
    const commonRoot = path.dirname(path.resolve(rootDir, commonDir));
    const commonRelative = path.resolve(commonRoot, sourceHint);
    if (fs.existsSync(commonRelative)) return commonRelative;
  } catch (error) {
    // Fall through to the original path so the caller reports a useful git error.
  }

  return null;
}

function upstreamRemoteUrl(lock, options = {}) {
  return options.remoteUrl || `https://github.com/${lock.repository}.git`;
}

function materializeFromRemote(lock, cloneDir, options = {}) {
  run('git', ['init', cloneDir]);
  run('git', ['remote', 'add', 'origin', upstreamRemoteUrl(lock, options)], { cwd: cloneDir });
  run('git', ['fetch', '--depth=1', 'origin', lock.commit], { cwd: cloneDir });
  run('git', ['checkout', '--detach', 'FETCH_HEAD'], { cwd: cloneDir });
}

function materializeUpstream(options = {}) {
  const rootDir = options.rootDir || path.resolve(__dirname, '..', '..');
  const lockPath = options.lockPath || path.join(rootDir, 'upstream.lock');
  const lock = options.lock || readLock(lockPath);
  const sourceHint = options.sourceHint || process.env.ZDOC_UPSTREAM_SOURCE || lock.source || '../zdoc';
  const sourceDir = resolveSourceDir(rootDir, sourceHint);
  const upstreamDir = options.upstreamDir || path.join(rootDir, '.zdoc-upstream');
  const targetDir = options.targetDir || path.join(upstreamDir, 'worktree');
  const cloneDir = path.join(upstreamDir, 'clone-tmp');

  removePath(targetDir);
  removePath(cloneDir);
  fs.mkdirSync(upstreamDir, { recursive: true });

  if (sourceDir) {
    assertGitWorkTree(sourceDir);
    const resolvedCommit = resolveCommit(sourceDir, lock.commit);
    if (resolvedCommit !== lock.commit) {
      throw new Error(`Resolved commit mismatch: expected ${lock.commit}, got ${resolvedCommit}`);
    }
    run('git', ['clone', '--no-checkout', sourceDir, cloneDir]);
    run('git', ['checkout', '--detach', lock.commit], { cwd: cloneDir });
  } else {
    materializeFromRemote(lock, cloneDir, options);
  }

  const head = run('git', ['rev-parse', 'HEAD'], { cwd: cloneDir });
  if (head !== lock.commit) {
    throw new Error(`Materialized HEAD mismatch: expected ${lock.commit}, got ${head}`);
  }

  fs.renameSync(cloneDir, targetDir);
  return targetDir;
}

if (require.main === module) {
  const target = materializeUpstream();
  process.stdout.write(`${target}\n`);
}

module.exports = { materializeUpstream, materializeFromRemote, resolveSourceDir, run, upstreamRemoteUrl };
