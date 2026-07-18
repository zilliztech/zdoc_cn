const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { assembleWorkspace } = require('./assemble');

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

function createRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'zdoc-assemble-'));
  write(path.join(root, 'upstream.lock'), [
    'repository: zilliztech/zdoc',
    'commit: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'compatibility: 1',
  ].join('\n'));
  write(path.join(root, 'overlay-manifest.json'), JSON.stringify({
    compatibility: 1,
    copy: [{ from: 'site-profile', to: 'site-profile/zh-CN', optional: true }],
    patches: [],
  }, null, 2));
  return root;
}

function initUpstreamGit(root, content = 'upstream\n') {
  const upstream = path.join(root, '.zdoc-upstream', 'worktree');
  fs.mkdirSync(upstream, { recursive: true });
  git(upstream, ['init']);
  write(path.join(upstream, 'README.md'), content);
  git(upstream, ['add', 'README.md']);
  git(upstream, ['-c', 'user.name=Test User', '-c', 'user.email=test@example.com', 'commit', '-m', 'initial']);
  return git(upstream, ['rev-parse', 'HEAD']);
}

test('copies upstream into the assembled workspace and excludes generated state', () => {
  const root = createRoot();
  const upstream = path.join(root, '.zdoc-upstream', 'worktree');
  write(path.join(upstream, 'package.json'), '{"name":"upstream"}\n');
  write(path.join(upstream, 'docs/index.md'), '# upstream\n');
  write(path.join(upstream, 'build/index.html'), '<html></html>\n');
  write(path.join(upstream, '.docusaurus/routes.js'), 'generated\n');
  write(path.join(upstream, 'node_modules/pkg/index.js'), 'module\n');
  write(path.join(upstream, '.zdoc-upstream/worktree/file'), 'nested\n');
  write(path.join(upstream, '.zdoc-assembled/file'), 'nested\n');
  git(upstream, ['init']);
  git(upstream, ['add', '.']);
  git(upstream, ['-c', 'user.name=Test User', '-c', 'user.email=test@example.com', 'commit', '-m', 'initial']);
  const commit = git(upstream, ['rev-parse', 'HEAD']);
  write(path.join(root, 'upstream.lock'), [
    'repository: zilliztech/zdoc',
    `commit: ${commit}`,
    'compatibility: 1',
  ].join('\n'));

  const manifest = assembleWorkspace({ rootDir: root });

  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', 'package.json')), true);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', 'docs/index.md')), true);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', '.git')), false);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', 'build')), false);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', '.docusaurus')), false);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', 'node_modules')), false);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', '.zdoc-upstream')), false);
  assert.equal(fs.existsSync(path.join(root, '.zdoc-assembled', '.zdoc-assembled')), false);
  assert.deepEqual(manifest.copiedOverlayPaths, []);
  assert.deepEqual(manifest.skippedOptionalOverlayPaths, ['site-profile']);
});

test('copies allowlisted overlay files and rejects blocked destinations before copy', () => {
  const root = createRoot();
  write(path.join(root, '.zdoc-upstream', 'worktree', 'package.json'), '{"name":"upstream"}\n');
  write(path.join(root, 'site-profile', 'config.json'), '{"locale":"zh-CN"}\n');

  const manifest = assembleWorkspace({ rootDir: root });

  assert.equal(
    fs.readFileSync(path.join(root, '.zdoc-assembled', 'site-profile', 'zh-CN', 'config.json'), 'utf8'),
    '{"locale":"zh-CN"}\n',
  );
  assert.deepEqual(manifest.copiedOverlayPaths, ['site-profile/zh-CN/config.json']);

  write(path.join(root, 'overlay-manifest.json'), JSON.stringify({
    compatibility: 1,
    copy: [{ from: 'site-profile', to: 'src/theme' }],
    patches: [],
  }));
  assert.throws(() => assembleWorkspace({ rootDir: root }), /blocked/i);
});

test('writes a deterministic build manifest across repeated assembly', () => {
  const root = createRoot();
  write(path.join(root, '.zdoc-upstream', 'worktree', 'package.json'), '{"name":"upstream"}\n');
  write(path.join(root, 'site-profile', 'b.txt'), 'b\n');
  write(path.join(root, 'site-profile', 'a.txt'), 'a\n');

  assembleWorkspace({ rootDir: root });
  const first = fs.readFileSync(path.join(root, '.zdoc-assembled', '.zdoc-build-manifest.json'), 'utf8');
  assembleWorkspace({ rootDir: root });
  const second = fs.readFileSync(path.join(root, '.zdoc-assembled', '.zdoc-build-manifest.json'), 'utf8');

  assert.equal(second, first);
});

test('fails when a required overlay source is missing', () => {
  const root = createRoot();
  write(path.join(root, '.zdoc-upstream', 'worktree', 'package.json'), '{"name":"upstream"}\n');
  write(path.join(root, 'overlay-manifest.json'), JSON.stringify({
    compatibility: 1,
    copy: [{ from: 'config/cn-publish-replacements.js', to: 'config/cn-publish-replacements.js' }],
    patches: [],
  }));

  assert.throws(() => assembleWorkspace({ rootDir: root }), /Required overlay source/);
});

test('rejects symlinks in overlay copies', { skip: process.platform === 'win32' }, () => {
  const root = createRoot();
  write(path.join(root, '.zdoc-upstream', 'worktree', 'package.json'), '{"name":"upstream"}\n');
  fs.mkdirSync(path.join(root, 'site-profile'), { recursive: true });
  fs.symlinkSync('/etc/passwd', path.join(root, 'site-profile', 'outside'));

  assert.throws(() => assembleWorkspace({ rootDir: root }), /Symlinks are not allowed/);
});

test('fails when materialized upstream git HEAD does not match the lock', () => {
  const root = createRoot();
  const actualCommit = initUpstreamGit(root);
  assert.notEqual(actualCommit, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

  assert.throws(() => assembleWorkspace({ rootDir: root }), /Materialized upstream HEAD mismatch/);
});
