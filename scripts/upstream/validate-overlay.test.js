const assert = require('node:assert/strict');
const test = require('node:test');
const { validateOverlayManifest } = require('./validate-overlay');

function validManifest(overrides = {}) {
  return {
    compatibility: 1,
    copy: [
      { from: 'site-profile', to: 'site-profile/zh-CN' },
      { from: 'content-config', to: 'content-config/zh-CN' },
      { from: 'config/cn-publish-replacements.js', to: 'config/cn-publish-replacements.js' },
      { from: 'plugins/cn-publish-normalizer', to: 'plugins/cn-publish-normalizer' },
      { from: 'plugins/adapters/aliyun-oss', to: 'plugins/adapters/aliyun-oss' },
      { from: 'rest-overrides/zh-CN', to: 'rest-overrides/zh-CN' },
      { from: 'nginx/zh-CN', to: 'nginx/zh-CN' },
      { from: 'ci', to: 'ci/zh-CN' },
      { from: 'tests/zh-CN', to: 'tests/zh-CN' },
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

test('rejects duplicate destinations, absolutes, and traversal', () => {
  assert.throws(() => validateOverlayManifest(validManifest({ copy: [
    { from: 'a', to: 'site-profile/zh-CN' },
    { from: 'b', to: 'site-profile/zh-CN' },
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
