const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { materializeUpstream } = require('./materialize');

function git(cwd, args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(' ')} failed\n${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function createFixtureRepo(baseDir) {
  const source = path.join(baseDir, 'source');
  fs.mkdirSync(source, { recursive: true });
  git(source, ['init']);
  write(path.join(source, 'README.md'), 'upstream\n');
  git(source, ['add', 'README.md']);
  git(source, ['-c', 'user.name=Test User', '-c', 'user.email=test@example.com', 'commit', '-m', 'initial']);
  const commit = git(source, ['rev-parse', 'HEAD']);
  write(path.join(source, 'README.md'), 'newer upstream\n');
  git(source, ['add', 'README.md']);
  git(source, ['-c', 'user.name=Test User', '-c', 'user.email=test@example.com', 'commit', '-m', 'newer']);
  return { source, commit };
}

test('materializes the locked local source commit into a detached worktree', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zdoc-materialize-'));
  const { source, commit } = createFixtureRepo(root);
  write(path.join(root, 'upstream.lock'), [
    'repository: zilliztech/zdoc',
    `commit: ${commit}`,
    'compatibility: 1',
    `source: ${path.relative(root, source)}`,
  ].join('\n'));

  const target = materializeUpstream({ rootDir: root });

  assert.equal(target, path.join(root, '.zdoc-upstream', 'worktree'));
  assert.equal(git(target, ['rev-parse', 'HEAD']), commit);
  assert.equal(git(target, ['branch', '--show-current']), '');
  assert.equal(fs.readFileSync(path.join(target, 'README.md'), 'utf8'), 'upstream\n');
});

test('fails when the locked commit is absent from the source checkout', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zdoc-materialize-missing-'));
  const { source } = createFixtureRepo(root);
  write(path.join(root, 'upstream.lock'), [
    'repository: zilliztech/zdoc',
    'commit: 1111111111111111111111111111111111111111',
    'compatibility: 1',
    `source: ${path.relative(root, source)}`,
  ].join('\n'));

  assert.throws(() => materializeUpstream({ rootDir: root }), /Locked upstream commit is not available/);
});
