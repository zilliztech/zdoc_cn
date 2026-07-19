const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { readOverlayManifest, validateOverlayManifest } = require('./validate-overlay');

const ROOT_DIR = path.resolve(__dirname, '..', '..');

function workflowPathsFor(workflowContent, eventName) {
  const lines = workflowContent.split(/\r?\n/);
  const eventStart = lines.findIndex((line) => line === `  ${eventName}:`);
  assert.notEqual(eventStart, -1, `missing ${eventName} event`);

  const paths = [];
  let inPaths = false;
  for (let index = eventStart + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (/^  [a-z_]+:/.test(line)) break;
    if (line === '    paths:') {
      inPaths = true;
      continue;
    }
    if (inPaths) {
      const match = line.match(/^      - "(.+)"$/);
      if (match) paths.push(match[1]);
    }
  }

  assert.notEqual(paths.length, 0, `missing ${eventName} paths`);
  return paths;
}

function workflowPatternForOverlaySource(source) {
  return path.posix.extname(source) ? source : `${source}/**`;
}

function validManifest(overrides = {}) {
  return {
    compatibility: 1,
    copy: [
      { from: 'site-profile', to: 'site-profile/zh-CN', optional: true },
      { from: 'content-config', to: 'content-config/zh-CN', optional: true },
      { from: 'config/cn-publish-replacements.js', to: 'config/cn-publish-replacements.js' },
      { from: 'plugins/cn-publish-normalizer', to: 'plugins/cn-publish-normalizer' },
      { from: 'plugins/adapters/aliyun-oss', to: 'plugins/adapters/aliyun-oss', optional: true },
      { from: 'rest-overrides/zh-CN', to: 'rest-overrides/zh-CN', optional: true },
      { from: 'nginx/zh-CN', to: 'nginx/zh-CN', optional: true },
      { from: 'ci', to: 'ci/zh-CN' },
      { from: 'tests/zh-CN', to: 'tests/zh-CN', optional: true },
    ],
    patches: [],
    ...overrides,
  };
}

test('accepts the declared CN overlay entries', () => {
  const manifest = validateOverlayManifest(validManifest());
  assert.deepEqual(manifest.copy.map((entry) => entry.to), [
    'site-profile/zh-CN',
    'content-config/zh-CN',
    'config/cn-publish-replacements.js',
    'plugins/cn-publish-normalizer',
    'plugins/adapters/aliyun-oss',
    'rest-overrides/zh-CN',
    'nginx/zh-CN',
    'ci/zh-CN',
    'tests/zh-CN',
  ]);
});

test('rejects blocked upstream-owned destinations', () => {
  for (const blocked of [
    'src/theme',
    'plugins/lark-docs',
    'plugins/mdx-parse',
    'plugins/report-to-lark',
    'plugins/apifox-docs',
    'scripts/docs-workflow',
    'docusaurus.config.ts',
    'package.json',
    'pnpm-lock.yaml',
    '.github/workflows/_build.yml',
  ]) {
    assert.throws(() => validateOverlayManifest(validManifest({ copy: [{ from: 'x', to: blocked }] })), /blocked/i);
  }
});

test('production docs workflows stay first-class in zdoc_cn', () => {
  const blocked = [
    ['.github/workflows/_assemble-guides.yml', '.github/workflows/_assemble-guides.yml'],
    ['scripts/docs-workflow', 'scripts/docs-workflow'],
  ];

  for (const [from, to] of blocked) {
    assert.throws(
      () => validateOverlayManifest({ compatibility: 1, copy: [{ from, to }], patches: [] }),
      /blocked|not allowlisted/,
      `${from} must not be introduced through overlay-manifest.json`,
    );
  }
});

test('rejects destinations outside the positive allowlist', () => {
  for (const destination of [
    'docs',
    'blog',
    'static/img',
    'config/other.js',
    '.github/workflows/build.yml',
  ]) {
    assert.throws(() => validateOverlayManifest(validManifest({ copy: [{ from: 'x', to: destination }] })), /allowlisted/i);
  }

  assert.throws(() => validateOverlayManifest(validManifest({
    copy: [{ from: 'ci', to: 'ci' }],
  })), /allowlisted/i);
});

test('rejects duplicate destinations, absolutes, and traversal', () => {
  assert.throws(() => validateOverlayManifest(validManifest({ copy: [
    { from: 'site-profile', to: 'site-profile/zh-CN' },
    { from: 'site-profile', to: 'site-profile/zh-CN' },
  ] })), /duplicate/i);

  assert.throws(() => validateOverlayManifest(validManifest({ copy: [{ from: '/tmp/a', to: 'site-profile/zh-CN' }] })), /relative/i);
  assert.throws(() => validateOverlayManifest(validManifest({ copy: [{ from: 'a', to: '/tmp/b' }] })), /relative/i);
  assert.throws(() => validateOverlayManifest(validManifest({ copy: [{ from: '../a', to: 'site-profile/zh-CN' }] })), /traversal/i);
  assert.throws(() => validateOverlayManifest(validManifest({ copy: [{ from: 'a', to: '../site-profile' }] })), /traversal/i);
});

test('validates patch declarations', () => {
  assert.deepEqual(validateOverlayManifest(validManifest({
    patches: [{
      path: 'patches/upstream/0001-example.patch',
      reason: 'Temporary exact patch',
      removeWhen: 'Upstream exposes a hook',
    }],
  })).patches[0].path, 'patches/upstream/0001-example.patch');

  assert.throws(() => validateOverlayManifest(validManifest({
    patches: [{ path: 'other.patch', reason: 'bad', removeWhen: 'never' }],
  })), /patches\/upstream/);
  assert.throws(() => validateOverlayManifest(validManifest({
    patches: [{ path: 'patches/upstream/0001-example.patch' }],
  })), /reason/);
});

test('locked upstream workflow watches every declared overlay source', () => {
  const manifest = readOverlayManifest(path.join(ROOT_DIR, 'overlay-manifest.json'));
  const workflow = fs.readFileSync(path.join(ROOT_DIR, '.github/workflows/locked-upstream-overlay.yml'), 'utf8');
  const requiredPatterns = manifest.copy.map((entry) => workflowPatternForOverlaySource(entry.from));

  for (const eventName of ['pull_request', 'push']) {
    const paths = workflowPathsFor(workflow, eventName);
    for (const pattern of requiredPatterns) {
      assert.ok(paths.includes(pattern), `${eventName} must watch ${pattern}`);
    }
  }
});
