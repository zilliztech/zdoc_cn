const assert = require('node:assert/strict');
const {
    applyMdxPatches,
    normalizeCodeTagContent,
    normalizeEscapedGenericTypes,
} = require('./mdxPatcher');
const LarkDocWriter = require('../lark-docs/larkDocWriter');

const failingCodeSpan = '<p><code><i>http</i>s://{cluster-id}.serverless.{region}.vectordb.zillizcloud.com</code></p>';
const normalizedCodeSpan = '<p><code>https://\\{cluster-id\\}.serverless.\\{region\\}.vectordb.zillizcloud.com</code></p>';
const backslashedPlaceholderUri = '<p>https://s3.\\<region_code>.amazonaws.com.cn/\\<bucket_name>/\\<object_name></p>';
const backslashedJavaTypes = '- **getResults** (*List\\<QueryResp.QueryResult\\>*)\n\n- **fields** (*Map\\<String,Object\\>*)';
const escapedJavaGenericTypes = '- **getResults** (*List\\\\\\\\<QueryResp.QueryResult\\\\\\\\>*)\n- **fields** (*Map\\\\\\\\<String,Object\\\\\\\\>*)';

async function testNormalizeCodeTagContentIsExported() {
    assert.equal(typeof normalizeCodeTagContent, 'function');
}

async function testNormalizeEscapedGenericTypesIsExported() {
    assert.equal(typeof normalizeEscapedGenericTypes, 'function');
}

async function testNormalizeCodeTagContentBehavior() {
    assert.equal(normalizeCodeTagContent(failingCodeSpan), normalizedCodeSpan);
}

async function testNormalizeEscapedGenericTypesBehavior() {
    const normalized = normalizeEscapedGenericTypes(escapedJavaGenericTypes);
    assert.ok(normalized.includes('*List&lt;QueryResp.QueryResult&gt;*'));
    assert.ok(normalized.includes('*Map&lt;String,Object&gt;*'));
}

async function testNormalizeEscapedGenericTypesSkipsInlineCode() {
    const markdown = '`List\\\\\\\\<QueryResp.QueryResult\\\\\\\\>`';
    assert.equal(normalizeEscapedGenericTypes(markdown), markdown);
}

async function testApplyMdxPatchesNormalizesCodeTagContent() {
    const patched = await applyMdxPatches(failingCodeSpan);
    assert.equal(patched, normalizedCodeSpan);
}

async function testApplyMdxPatchesNormalizesEscapedGenericTypes() {
    const patched = await applyMdxPatches(escapedJavaGenericTypes);
    assert.ok(patched.includes('*List&lt;QueryResp.QueryResult&gt;*'));
    assert.ok(patched.includes('*Map&lt;String,Object&gt;*'));
}

async function testLarkDocWriterUsesSharedNormalization() {
    const writer = new LarkDocWriter('', '', 'pythonSidebar');
    const patched = await writer.__mdx_patches(failingCodeSpan);
    assert.equal(patched, normalizedCodeSpan);
}

async function testLarkDocWriterNormalizesEscapedGenericTypes() {
    const writer = new LarkDocWriter('', '', 'javaSidebar');
    const patched = await writer.__mdx_patches(escapedJavaGenericTypes);
    assert.ok(patched.includes('*List&lt;QueryResp.QueryResult&gt;*'));
    assert.ok(patched.includes('*Map&lt;String,Object&gt;*'));
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

async function testApplyMdxPatchesConvertsBackslashedJavaTypesToEntities() {
    const patched = await applyMdxPatches(backslashedJavaTypes);
    assert.ok(patched.includes('List&lt;QueryResp.QueryResult&gt;'));
    assert.ok(patched.includes('Map&lt;String,Object&gt;'));
    assert.ok(!patched.includes('\\<QueryResp.QueryResult\\>'));
    assert.ok(!patched.includes('\\<String,Object\\>'));
}

async function testLarkDocWriterConvertsBackslashedJavaTypesToEntities() {
    const writer = new LarkDocWriter('', '', 'javaSidebar');
    const patched = await writer.__mdx_patches(backslashedJavaTypes);
    assert.ok(patched.includes('List&lt;QueryResp.QueryResult&gt;'));
    assert.ok(patched.includes('Map&lt;String,Object&gt;'));
    assert.ok(!patched.includes('\\<QueryResp.QueryResult\\>'));
    assert.ok(!patched.includes('\\<String,Object\\>'));
}

async function run() {
    await testNormalizeCodeTagContentIsExported();
    await testNormalizeEscapedGenericTypesIsExported();
    await testNormalizeCodeTagContentBehavior();
    await testNormalizeEscapedGenericTypesBehavior();
    await testNormalizeEscapedGenericTypesSkipsInlineCode();
    await testApplyMdxPatchesNormalizesCodeTagContent();
    await testApplyMdxPatchesNormalizesEscapedGenericTypes();
    await testLarkDocWriterUsesSharedNormalization();
    await testLarkDocWriterNormalizesEscapedGenericTypes();
    await testApplyMdxPatchesConvertsBackslashedPlaceholdersToEntities();
    await testLarkDocWriterConvertsBackslashedPlaceholdersToEntities();
    await testApplyMdxPatchesConvertsBackslashedJavaTypesToEntities();
    await testLarkDocWriterConvertsBackslashedJavaTypesToEntities();
    console.log('mdxPatcher regression tests passed');
}

run().catch(error => {
    console.error(error);
    process.exit(1);
});
