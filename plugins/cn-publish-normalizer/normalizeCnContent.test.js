const assert = require('node:assert/strict');
const { normalizeCnContent } = require('./normalizeCnContent');

function testNormalizesSupportSalesPricingUrls() {
  const input = [
    'support: http://support.zilliz.com.cn',
    'support: https://support.zilliz.com/hc/en-us',
    'support deep: https://support.zilliz.com.cn/hc/en-us/articles/123?a=1#section',
    'sales: https://zilliz.com/contact-sales',
    'sales cn: https://zilliz.com.cn/contact-sales?from=footer',
    'pricing: https://zilliz.com/pricing#calculator',
    'pricing cn: https://zilliz.com.cn/pricing/enterprise?plan=pro#detail',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/support\.zilliz\.com\.cn\/hc\/zh-cn/);
  assert.match(out, /https:\/\/zilliz\.com\.cn\/contact-sales/);
  assert.match(out, /https:\/\/zilliz\.com\.cn\/pricing#calculator/);
  assert.match(out, /https:\/\/zilliz\.com\.cn\/pricing\/enterprise\?plan=pro#detail/);

  assert.doesNotMatch(out, /support\.zilliz\.com\/hc\/en-us/);
  assert.doesNotMatch(out, /support\.zilliz\.com\.cn\/hc\/en-us\/articles\/123\?a=1#section/);
  assert.doesNotMatch(out, /https?:\/\/zilliz\.com(?:\.cn)?\/contact-sales\?from=footer/);
  assert.doesNotMatch(out, /https?:\/\/zilliz\.com\/pricing/);
}

function testNormalizesEndpointPlaceholders() {
  const input = [
    'uri="http://YOUR_CLUSTER_ENDPOINT"',
    'uri="https://YOUR_CLUSTER_ENDPOINT"',
    'uri="YOUR_CLUSTER_ENDPOINT"',
    'uri="http://YOUR_CLUSTER_PUBLIC_ENDPOINT"',
    'uri="https://YOUR_CLUSTER_PUBLIC_ENDPOINT"',
    'uri="YOUR_CLUSTER_PUBLIC_ENDPOINT"',
    'uri="http://YOUR_ZILLIZ_CLOUD_ENDPOINT"',
    'uri="https://YOUR_ZILLIZ_CLOUD_ENDPOINT"',
    'uri="YOUR_ZILLIZ_CLOUD_ENDPOINT"',
    'uri="http://YOUR_GLOBAL_ENDPOINT"',
    'uri="https://YOUR_GLOBAL_ENDPOINT"',
    'uri="YOUR_GLOBAL_ENDPOINT"',
    'uri="http://YOUR_PRIVATE_ENDPOINT"',
    'uri="https://YOUR_PRIVATE_ENDPOINT"',
    'uri="YOUR_PRIVATE_ENDPOINT"',
    'uri="http://YOUR_PROJECT_ENDPOINT"',
    'uri="https://YOUR_PROJECT_ENDPOINT"',
    'uri="YOUR_PROJECT_ENDPOINT"',
    'base="https://api.cloud.zilliz.com"',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/\{cluster-id\}\.\{region\}\.vectordb\.zilliz\.com\.cn:19530/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/glo-xxxx\.global-cluster\.vectordb\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/\{cluster-id\}-privatelink\.\{region\}\.vectordb\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/api\.cloud\.zilliz\.com\.cn/);

  assert.doesNotMatch(out, /YOUR_CLUSTER_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_CLUSTER_PUBLIC_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_ZILLIZ_CLOUD_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_GLOBAL_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_PRIVATE_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_PROJECT_ENDPOINT/);
}

function testNormalizesZillizCloudPlaceholderSubdomain() {
  const input = [
    'endpoint="https://{cluster-id}.{region}.api.zillizcloud.com"',
    'endpoint="https://{project-id}.{region}.api.zillizcloud.com"',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/\{cluster-id\}\.\{region\}\.api\.zillizcloud\.com\.cn/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.zillizcloud\.com\.cn/);
  assert.doesNotMatch(out, /\.api\.zillizcloud\.com(?!\.cn)\b/);
}

function testDoesNotAppendCnTwiceForZillizCloudSubdomain() {
  const input = 'endpoint="https://{project-id}.{region}.api.zillizcloud.com.cn"';

  const out = normalizeCnContent(input);

  assert.equal(out, input);
  assert.doesNotMatch(out, /\.cn\.cn\b/);
}

function testNormalizesProviderAndRegionExamples() {
  const input = [
    'cloudId: aws',
    'regionId: aws-us-west-2',
    '"cloud_id": "gcp",',
    '"region_id": "gcp-us-west1",',
    'provider notes: aws gcp azure should stay in prose',
    'unrelated sentence about aws, gcp, and azure services',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /cloudId: ali/);
  assert.match(out, /regionId: ali-cn-hangzhou/);
  assert.match(out, /"cloud_id": "ali",/);
  assert.match(out, /"region_id": "ali-cn-hangzhou",/);
  assert.match(out, /provider notes: aws gcp azure should stay in prose/);
  assert.match(out, /unrelated sentence about aws, gcp, and azure services/);
}

function testIsIdempotent() {
  const input = 'https://support.zilliz.com/hc/en-us\nuri="https://YOUR_CLUSTER_ENDPOINT"';
  const once = normalizeCnContent(input);
  const twice = normalizeCnContent(once);
  assert.equal(twice, once);
}

function run() {
  testNormalizesSupportSalesPricingUrls();
  testNormalizesEndpointPlaceholders();
  testNormalizesZillizCloudPlaceholderSubdomain();
  testDoesNotAppendCnTwiceForZillizCloudSubdomain();
  testNormalizesProviderAndRegionExamples();
  testIsIdempotent();
  console.log('normalizeCnContent tests passed');
}

run();
