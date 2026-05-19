const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  scanArtifacts,
  formatViolations,
  normalizeArtifacts,
} = require('./verify-cn-publish-artifacts');

function withTempDir(run) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cn-publish-verify-'));
  try {
    run(tempDir);
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

function testPassesWhenArtifactsAreCnSafe() {
  withTempDir((tempDir) => {
    fs.writeFileSync(
      path.join(tempDir, 'index.html'),
      [
        'https://support.zilliz.com.cn/hc/zh-cn',
        'https://zilliz.com.cn/contact-sales',
        'https://zilliz.com.cn/pricing',
        'https://api.cloud.zilliz.com.cn',
        'https://{project-id}.{region}.api.cloud.zilliz.com.cn',
        'https://in03-613b5625e3f1d30.serverless.ali-cn-hangzhou.cloud.zilliz.com.cn',
        'https://in03-613b5625e3f1d30.ali-cn-hangzhou.vectordb.zilliz.com.cn:19530',
      ].join('\n'),
      'utf8',
    );

    const violations = scanArtifacts(tempDir);
    assert.equal(violations.length, 0);
  });
}

function testFindsAllForbiddenResidualClasses() {
  withTempDir((tempDir) => {
    fs.writeFileSync(
      path.join(tempDir, 'bad.html'),
      [
        'https://YOUR_CLUSTER_ENDPOINT',
        'https://support.zilliz.com/hc/en-us',
        'https://zilliz.com/pricing',
        'https://api.cloud.zilliz.com',
        'https://proj-123.ali-cn-hangzhou.api.zillizcloud.com.cn/v2/jobs',
        'https://proj-123.ali-cn-hangzhou.api.zilliz.com.cn/v2/jobs',
        'https://api.cloud.zilliz.com.cn.cn',
        'https://in01-xxxx.serverless.gcp-us-west1.vectordb.zillizcloud.com',
        'https://YOUR_PROJECT_ID.YOUR_REGION.api.zillizcloud.com',
        'https://YOUR_CLUSTER_ID.serverless.YOUR_REGION.vectordb.zillizcloud.com',
        'object_url="://your/data/path/in/external/storage.json"',
        '<i>http</i>s://support.zilliz.com/hc/en-us',
      ].join('\n'),
      'utf8',
    );

    const violations = scanArtifacts(tempDir);
    const classes = new Set(violations.map((v) => v.rule));

    assert.equal(classes.has('placeholder-endpoint'), true);
    assert.equal(classes.has('support-url-non-cn'), true);
    assert.equal(classes.has('sales-or-pricing-non-cn'), true);
    assert.equal(classes.has('endpoint-family-non-canonical'), true);
    assert.equal(classes.has('cluster-endpoint-family-non-canonical'), true);
    assert.equal(classes.has('malformed-object-url-scheme'), true);
    assert.equal(classes.has('duplicate-cn-suffix'), true);
    assert.equal(classes.has('decorated-http-scheme'), true);
  });
}

function testNormalizeArtifactsRewritesResidualsBeforeScan() {
  withTempDir((tempDir) => {
    fs.writeFileSync(
      path.join(tempDir, 'chunk.js'),
      [
        'https://support.zilliz.com/hc/en-us',
        'https://zilliz.com/contact-sales',
        'https://api.cloud.zilliz.com',
        'https://{project-id}.{region}.api.zillizcloud.com',
        'https://{project-id}.{region}.api.zilliz.com.cn/v2/jobs',
        'https://in01-xxxx.serverless.gcp-us-west1.vectordb.zillizcloud.com',
        'https://YOUR_PROJECT_ID.YOUR_REGION.api.zillizcloud.com',
        'https://YOUR_CLUSTER_ID.serverless.YOUR_REGION.vectordb.zillizcloud.com',
        'object_url="://your/data/path/in/external/storage.json"',
        'https://YOUR_GLOBAL_ENDPOINT',
        '<i>http</i>s://support.zilliz.com/hc/en-us',
        'https://api.cloud.zilliz.com.cn.cn',
      ].join('\n'),
      'utf8',
    );

    const changedFiles = normalizeArtifacts(tempDir);
    const violations = scanArtifacts(tempDir);
    const normalized = fs.readFileSync(path.join(tempDir, 'chunk.js'), 'utf8');

    assert.equal(changedFiles.length, 1);
    assert.equal(violations.length, 0);
    assert.doesNotMatch(normalized, /support\.zilliz\.com\/hc\/en-us/);
    assert.doesNotMatch(normalized, /https:\/\/api\.cloud\.zilliz\.com(?!\.cn)/);
    assert.doesNotMatch(normalized, /\.api\.zillizcloud\.com(?:\.cn)?/);
    assert.doesNotMatch(normalized, /\.api\.zilliz\.com\.cn/);
    assert.match(normalized, /\.api\.cloud\.zilliz\.com\.cn/);
    assert.doesNotMatch(normalized, /vectordb\.zillizcloud\.com(?:\.cn)?/);
    assert.match(normalized, /serverless\.[\w-]+\.cloud\.zilliz\.com\.cn/);
    assert.match(normalized, /vectordb\.zilliz\.com\.cn/);
    assert.match(normalized, /object_url\s*=\s*"oss:\/\/\{bucket_name\}\/you\/data\/in\/storage\.json"/);
    assert.doesNotMatch(normalized, /object_url\s*=\s*":\/\//);
    assert.doesNotMatch(normalized, /YOUR_GLOBAL_ENDPOINT/);
    assert.doesNotMatch(normalized, /\.cn\.cn\b/);
    assert.doesNotMatch(normalized, /<i>http<\/i>s?:\/\//);
  });
}

function testFormatsReadableReport() {
  const output = formatViolations([
    {
      rule: 'placeholder-endpoint',
      file: '/tmp/build/index.html',
      line: 3,
      match: 'https://YOUR_CLUSTER_ENDPOINT',
    },
  ]);

  assert.match(output, /placeholder-endpoint/);
  assert.match(output, /index.html:3/);
}

function run() {
  testPassesWhenArtifactsAreCnSafe();
  testFindsAllForbiddenResidualClasses();
  testNormalizeArtifactsRewritesResidualsBeforeScan();
  testFormatsReadableReport();
  console.log('verify-cn-publish-artifacts tests passed');
}

run();
