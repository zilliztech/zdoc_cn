const assert = require('node:assert/strict');
const { remarkCnPublishNormalizer } = require('./remarkCnPublishNormalizer');

function testTransformsOnlyTextInlineCodeAndCode() {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          { type: 'text', value: 'See https://support.zilliz.com/hc/en-us for help' },
          { type: 'inlineCode', value: 'https://YOUR_CLUSTER_ENDPOINT' },
          { type: 'emphasis', children: [{ type: 'text', value: 'cloudId: aws' }] },
        ],
      },
      {
        type: 'code',
        lang: 'json',
        value: '{"region_id":"gcp-us-west1","base":"https://api.cloud.zilliz.com","cluster":"https://in01-xxxx.gcp-us-west1.vectordb.zillizcloud.com:19530"}',
      },
      {
        type: 'mdxjsEsm',
        value: 'export const support = "https://support.zilliz.com/hc/en-us"\nexport const endpoint = "https://{project-id}.{region}.api.zillizcloud.com"\nexport const legacyCn = "https://{project-id}.{region}.api.zilliz.com.cn/v2"\nexport const cluster = "https://in01-xxxx.serverless.gcp-us-west1.vectordb.zillizcloud.com"\nexport const serverlessCloud = "https://{cluster-id}.serverless.{region}.cloud.zilliz.com"\nexport const legacyDedicated = "https://in01-xxxx.api.gcp-us-west1.zillizcloud.com:19530"',
      },
      {
        type: 'html',
        value: '<a href="https://zilliz.com/contact-sales?from=footer">sales</a>',
      },
    ],
  };

  const transformer = remarkCnPublishNormalizer();
  transformer(tree);

  const paragraph = tree.children[0];
  const textNode = paragraph.children[0];
  const inlineCodeNode = paragraph.children[1];
  const emphasizedTextNode = paragraph.children[2].children[0];
  const codeNode = tree.children[1];
  const mdxjsEsmNode = tree.children[2];
  const htmlNode = tree.children[3];

  assert.equal(textNode.value, 'See https://support.zilliz.com.cn/hc/zh-cn for help');
  assert.equal(inlineCodeNode.value, 'https://{cluster-id}.{region}.vectordb.zilliz.com.cn:19530');
  assert.equal(emphasizedTextNode.value, 'cloudId: ali');
  assert.equal(
    codeNode.value,
    '{"region_id":"ali-cn-hangzhou","base":"https://api.cloud.zilliz.com.cn","cluster":"https://in01-xxxx.gcp-us-west1.vectordb.zilliz.com.cn:19530"}',
  );

  assert.equal(
    mdxjsEsmNode.value,
    'export const support = "https://support.zilliz.com.cn/hc/zh-cn"\nexport const endpoint = "https://{project-id}.{region}.api.cloud.zilliz.com.cn"\nexport const legacyCn = "https://{project-id}.{region}.api.cloud.zilliz.com.cn/v2"\nexport const cluster = "https://in01-xxxx.serverless.gcp-us-west1.cloud.zilliz.com.cn"\nexport const serverlessCloud = "https://{cluster-id}.serverless.{region}.cloud.zilliz.com.cn"\nexport const legacyDedicated = "https://in01-xxxx.gcp-us-west1.vectordb.zilliz.com.cn:19530"',
  );
  assert.equal(htmlNode.value, '<a href="https://zilliz.com.cn/contact-sales">sales</a>');
}

function testNormalizesLinkAndDefinitionUrls() {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url: 'https://support.zilliz.com/hc/en-us',
            children: [{ type: 'text', value: 'support' }],
          },
          {
            type: 'link',
            url: 'https://{project-id}.{region}.api.zillizcloud.com',
            children: [{ type: 'text', value: 'endpoint' }],
          },
          {
            type: 'link',
            url: 'https://{project-id}.{region}.api.zilliz.com.cn/v2/clusters',
            children: [{ type: 'text', value: 'legacy-cn-endpoint' }],
          },
          {
            type: 'link',
            url: 'https://in01-xxxx.serverless.gcp-us-west1.vectordb.zillizcloud.com',
            children: [{ type: 'text', value: 'legacy-cluster-endpoint' }],
          },
          {
            type: 'link',
            url: 'https://in01-xxxx.api.gcp-us-west1.zillizcloud.com:19530',
            children: [{ type: 'text', value: 'legacy-dedicated-endpoint' }],
          },
        ],
      },
      {
        type: 'definition',
        identifier: 'pricing',
        url: 'https://zilliz.com/pricing#calculator',
      },
    ],
  };

  const transformer = remarkCnPublishNormalizer();
  transformer(tree);

  const supportLink = tree.children[0].children[0];
  const endpointLink = tree.children[0].children[1];
  const legacyEndpointLink = tree.children[0].children[2];
  const legacyClusterLink = tree.children[0].children[3];
  const legacyDedicatedLink = tree.children[0].children[4];
  const pricingDefinition = tree.children[1];

  assert.equal(supportLink.url, 'https://support.zilliz.com.cn/hc/zh-cn');
  assert.equal(endpointLink.url, 'https://{project-id}.{region}.api.cloud.zilliz.com.cn');
  assert.equal(legacyEndpointLink.url, 'https://{project-id}.{region}.api.cloud.zilliz.com.cn/v2/clusters');
  assert.equal(legacyClusterLink.url, 'https://in01-xxxx.serverless.gcp-us-west1.cloud.zilliz.com.cn');
  assert.equal(legacyDedicatedLink.url, 'https://in01-xxxx.gcp-us-west1.vectordb.zilliz.com.cn:19530');
  assert.equal(pricingDefinition.url, 'https://zilliz.com.cn/pricing#calculator');
}

function testSkipsNodesWithoutStringValues() {
  const tree = {
    type: 'root',
    children: [
      { type: 'text', value: '' },
      { type: 'inlineCode', value: null },
      { type: 'code' },
      { type: 'link', url: null },
      { type: 'definition' },
    ],
  };

  const transformer = remarkCnPublishNormalizer();
  transformer(tree);

  assert.equal(tree.children[0].value, '');
  assert.equal(tree.children[1].value, null);
  assert.equal(tree.children[2].value, undefined);
  assert.equal(tree.children[3].url, null);
  assert.equal(tree.children[4].url, undefined);
}

function testReturnsSameTreeReference() {
  const tree = {
    type: 'root',
    children: [{ type: 'text', value: 'https://support.zilliz.com/hc/en-us' }],
  };

  const transformer = remarkCnPublishNormalizer();
  const result = transformer(tree);

  assert.equal(result, tree);
}

function testHandlesCyclicGraphWithoutInfiniteRecursion() {
  const root = { type: 'root', children: [] };
  const paragraph = { type: 'paragraph', children: [] };
  const textNode = { type: 'text', value: 'https://support.zilliz.com/hc/en-us' };
  const inlineCodeNode = { type: 'inlineCode', value: 'https://YOUR_CLUSTER_ENDPOINT' };
  const htmlNode = { type: 'html', value: '<a href="https://zilliz.com">zilliz</a>' };

  root.children.push(paragraph);
  paragraph.children.push(textNode, inlineCodeNode, htmlNode, root);

  const transformer = remarkCnPublishNormalizer();
  const result = transformer(root);

  assert.equal(result, root);
  assert.equal(textNode.value, 'https://support.zilliz.com.cn/hc/zh-cn');
  assert.equal(inlineCodeNode.value, 'https://{cluster-id}.{region}.vectordb.zilliz.com.cn:19530');
  assert.equal(htmlNode.value, '<a href="https://zilliz.com">zilliz</a>');
}

function run() {
  testTransformsOnlyTextInlineCodeAndCode();
  testNormalizesLinkAndDefinitionUrls();
  testSkipsNodesWithoutStringValues();
  testReturnsSameTreeReference();
  testHandlesCyclicGraphWithoutInfiniteRecursion();
  console.log('remarkCnPublishNormalizer tests passed');
}

run();
