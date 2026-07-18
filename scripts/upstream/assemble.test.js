const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const { assembleWorkspace } = require('./assemble');

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
    copy: [{ from: 'site-profile', to: 'site-profile/zh-CN' }],
    patches: [],
  }, null, 2));
  return root;
}

test('copies upstream into the assembled workspace and excludes generated state', () => {
  const root = createRoot();
  const upstream = path.join(root, '.zdoc-upstream', 'worktree');
  write(path.join(upstream, 'package.json'), '{"name":"upstream"}\n');
  write(path.join(upstream, 'docs/index.md'), '# upstream\n');
  write(path.join(upstream, '.git/HEAD'), 'ref: refs/heads/main\n');
  write(path.join(upstream, 'build/index.html'), '<html></html>\n');
  write(path.join(upstream, '.docusaurus/routes.js'), 'generated\n');
  write(path.join(upstream, 'node_modules/pkg/index.js'), 'module\n');
  write(path.join(upstream, '.zdoc-upstream/worktree/file'), 'nested\n');
  write(path.join(upstream, '.zdoc-assembled/file'), 'nested\n');

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
