const assert = require('node:assert/strict');
const {
    applyMdxPatches,
    normalizeCodeTagContent,
} = require('./mdxPatcher');
const LarkDocWriter = require('../lark-docs/larkDocWriter');

const failingCodeSpan = '<p><code><i>http</i>s://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com</code></p>';
const normalizedCodeSpan = '<p><code>https://\\{cluster-id\\}.serverless.\\{region\\}.vectordb.zillizcloud.com</code></p>';
const backslashedPlaceholderUri = '<p>https://s3.\\<region_code>.amazonaws.com.cn/\\<bucket_name>/\\<object_name></p>';

async function testNormalizeCodeTagContentIsExported() {
    assert.equal(typeof normalizeCodeTagContent, 'function');
}

async function testNormalizeCodeTagContentBehavior() {
    assert.equal(normalizeCodeTagContent(failingCodeSpan), normalizedCodeSpan);
}

async function testApplyMdxPatchesNormalizesCodeTagContent() {
    const patched = await applyMdxPatches(failingCodeSpan);
    assert.equal(patched, normalizedCodeSpan);
}

async function testLarkDocWriterUsesSharedNormalization() {
    const writer = new LarkDocWriter('', '', 'pythonSidebar');
    const patched = await writer.__mdx_patches(failingCodeSpan);
    assert.equal(patched, normalizedCodeSpan);
}

async function testApplyMdxPatchesConvertsBackslashedPlaceholdersToEntities() {
    const patched = await applyMdxPatches(backslashedPlaceholderUri);
    assert.ok(patched.includes('&lt;region_code&gt;'));
    assert.ok(patched.includes('&lt;bucket_name&gt;'));
    assert.ok(patched.includes('&lt;object_name&gt;'));
    assert.ok(!patched.includes('\\<region_code>'));
}

async function testLarkDocWriterConvertsBackslashedPlaceholdersToEntities() {
    const writer = new LarkDocWriter('', '', 'pythonSidebar');
    const patched = await writer.__mdx_patches(backslashedPlaceholderUri);
    assert.ok(patched.includes('&lt;region_code&gt;'));
    assert.ok(patched.includes('&lt;bucket_name&gt;'));
    assert.ok(patched.includes('&lt;object_name&gt;'));
    assert.ok(!patched.includes('\\<region_code>'));
}

async function run() {
    await testNormalizeCodeTagContentIsExported();
    await testNormalizeCodeTagContentBehavior();
    await testApplyMdxPatchesNormalizesCodeTagContent();
    await testLarkDocWriterUsesSharedNormalization();
    await testApplyMdxPatchesConvertsBackslashedPlaceholdersToEntities();
    await testLarkDocWriterConvertsBackslashedPlaceholdersToEntities();
    console.log('mdxPatcher regression tests passed');
}

run().catch(error => {
    console.error(error);
    process.exit(1);
});
