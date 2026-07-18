const assert = require('node:assert/strict');
const test = require('node:test');
const { parseLockContent } = require('./read-lock');

test('accepts exact zdoc lock', () => {
  const lock = parseLockContent([
    'repository: zilliztech/zdoc',
    'commit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f',
    'compatibility: 1',
    'source: ../zdoc',
  ].join('\n'));

  assert.equal(lock.repository, 'zilliztech/zdoc');
  assert.equal(lock.commit, '0cc5ad1a5234c762a1e999cc525045e96adfb25f');
  assert.equal(lock.compatibility, 1);
  assert.equal(lock.source, '../zdoc');
});

test('rejects branch names, wrong repositories, and extra keys', () => {
  assert.throws(() => parseLockContent('repository: zilliztech/zdoc\ncommit: master\ncompatibility: 1'), /commit/);
  assert.throws(() => parseLockContent('repository: other/zdoc\ncommit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f\ncompatibility: 1'), /repository/);
  assert.throws(() => parseLockContent('repository: zilliztech/zdoc\ncommit: 0cc5ad1a5234c762a1e999cc525045e96adfb25f\ncompatibility: 1\nextra: no'), /extra/);
});
