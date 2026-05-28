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
    'baseCn="https://api.cloud.zilliz.com.cn"',
    'baseHttp="http://api.cloud.zilliz.com"',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/\{cluster-id\}\.\{region\}\.vectordb\.zilliz\.com\.cn:19530/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/glo-xxxx\.global-cluster\.vectordb\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/\{cluster-id\}-privatelink\.\{region\}\.vectordb\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/api\.cloud\.zilliz\.com\.cn/);
  assert.doesNotMatch(out, /api\.cloud\.zilliz\.com\.cn\.cn/);

  assert.doesNotMatch(out, /YOUR_CLUSTER_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_CLUSTER_PUBLIC_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_ZILLIZ_CLOUD_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_GLOBAL_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_PRIVATE_ENDPOINT/);
  assert.doesNotMatch(out, /YOUR_PROJECT_ENDPOINT/);
}

function testNormalizesLegacyProjectEndpointFamilies() {
  const input = [
    'legacyGlobal="https://{cluster-id}.{region}.api.zillizcloud.com"',
    'legacyCn="https://{project-id}.{region}.api.zillizcloud.com.cn"',
    'legacyZillizCn="https://{project-id}.{region}.api.zilliz.com.cn/v2/clusters"',
    'globalCloud="https://{project-id}.{region}.api.cloud.zilliz.com/v2/jobs"',
    'concreteLegacy="https://proj-123.ali-cn-hangzhou.api.zillizcloud.com"',
    'legacyUpper="https://YOUR_PROJECT_ID.YOUR_REGION.api.zillizcloud.com"',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/\{cluster-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn\/v2\/clusters/);
  assert.match(out, /https:\/\/\{project-id\}\.\{region\}\.api\.cloud\.zilliz\.com\.cn\/v2\/jobs/);
  assert.match(out, /https:\/\/proj-123\.ali-cn-hangzhou\.api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/YOUR_PROJECT_ID\.YOUR_REGION\.api\.cloud\.zilliz\.com\.cn/);
  assert.doesNotMatch(out, /\.api\.zillizcloud\.com(?:\.cn)?\b/);
  assert.doesNotMatch(out, /\.api\.zilliz\.com\.cn\b/);
}

function testKeepsCanonicalProjectEndpointWithoutDuplicateCn() {
  const input = 'endpoint="https://{project-id}.{region}.api.cloud.zilliz.com.cn"';

  const out = normalizeCnContent(input);

  assert.equal(out, input);
  assert.doesNotMatch(out, /\.cn\.cn\b/);
}

function testNormalizesClusterEndpointFamilies() {
  const input = [
    'serverless="https://in01-xxxx.serverless.gcp-us-west1.vectordb.zillizcloud.com"',
    'public="https://in01-xxxx.gcp-us-west1.vectordb.zillizcloud.com:19530"',
    'legacyCn="https://in01-xxxx.serverless.gcp-us-west1.vectordb.zillizcloud.com.cn/v1/vector/search"',
    'newServerlessGlobal="https://in01-xxxx.serverless.gcp-us-west1.cloud.zilliz.com/v1/vector/search"',
    'alreadyCn="https://in01-xxxx.serverless.ali-cn-hangzhou.vectordb.zilliz.com.cn"',
    'doubleCn="https://in01-xxxx.serverless.ali-cn-hangzhou.vectordb.zilliz.com.cn.cn"',
    'legacyApiRegion="https://in01-xxxx.api.gcp-us-west1.zillizcloud.com:19530"',
    'legacyApiRegionCn="https://in01-xxxx.api.gcp-us-west1.zillizcloud.com.cn/v1/vector/search"',
    'legacyUpperApiRegion="https://YOUR_CLUSTER_ID.api.YOUR_REGION.zillizcloud.com:19530"',
    'legacyUpperServerless="https://YOUR_CLUSTER_ID.serverless.YOUR_REGION.vectordb.zillizcloud.com"',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/in01-xxxx\.serverless\.gcp-us-west1\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/in01-xxxx\.gcp-us-west1\.vectordb\.zilliz\.com\.cn:19530/);
  assert.match(out, /https:\/\/in01-xxxx\.serverless\.gcp-us-west1\.cloud\.zilliz\.com\.cn\/v1\/vector\/search/);
  assert.match(out, /newServerlessGlobal="https:\/\/in01-xxxx\.serverless\.gcp-us-west1\.cloud\.zilliz\.com\.cn\/v1\/vector\/search"/);
  assert.match(out, /https:\/\/in01-xxxx\.serverless\.ali-cn-hangzhou\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/in01-xxxx\.gcp-us-west1\.vectordb\.zilliz\.com\.cn\/v1\/vector\/search/);
  assert.match(out, /https:\/\/YOUR_CLUSTER_ID\.YOUR_REGION\.vectordb\.zilliz\.com\.cn:19530/);
  assert.match(out, /https:\/\/YOUR_CLUSTER_ID\.serverless\.YOUR_REGION\.cloud\.zilliz\.com\.cn/);
  assert.doesNotMatch(out, /vectordb\.zillizcloud\.com(?:\.cn)?/);
  assert.doesNotMatch(out, /serverless\.[\w-]+\.vectordb\.zilliz\.com\.cn/);
  assert.doesNotMatch(out, /serverless\.[\w{}-]+\.cloud\.zilliz\.com(?!\.cn)/i);
  assert.doesNotMatch(out, /\.api\.[\w{}-]+\.zillizcloud\.com(?:\.cn)?/i);
  assert.doesNotMatch(out, /vectordb\.zilliz\.com\.cn\.cn/);
}

function testNormalizesDecoratedHttpSchemes() {
  const input = [
    'inline: <i>http</i>s://support.zilliz.com/hc/en-us',
    'endpoint: <em>http</em>s://api.cloud.zilliz.com',
    'placeholder: <strong>http</strong>s://YOUR_GLOBAL_ENDPOINT',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /https:\/\/support\.zilliz\.com\.cn\/hc\/zh-cn/);
  assert.match(out, /https:\/\/api\.cloud\.zilliz\.com\.cn/);
  assert.match(out, /https:\/\/glo-xxxx\.global-cluster\.vectordb\.zilliz\.com\.cn/);
  assert.doesNotMatch(out, /<i>http<\/i>|<em>http<\/em>|<strong>http<\/strong>/);
}

function testNormalizesProviderAndRegionExamples() {
  const input = [
    'cloudId: aws',
    'regionId: aws-us-west-2',
    'cloud_id = azure',
    'regionId=aws-us-east-1',
    '"cloud_id": "gcp",',
    '"region_id": "gcp-us-west1",',
    '"region_id": "az-eastus",',
    'provider notes: aws gcp azure should stay in prose',
    'unrelated sentence about aws, gcp, and azure services',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /cloudId: ali/);
  assert.match(out, /regionId: ali-cn-hangzhou/);
  assert.match(out, /cloud_id = ali/);
  assert.match(out, /regionId=ali-cn-hangzhou/);
  assert.match(out, /"cloud_id": "ali",/);
  assert.match(out, /"region_id": "ali-cn-hangzhou",/);
  assert.match(out, /provider notes: aws gcp azure should stay in prose/);
  assert.match(out, /unrelated sentence about aws, gcp, and azure services/);
}

function testNormalizesFieldScopedStorageExamples() {
  const input = [
    'STORAGE_PATH = "s3://your/data/path/in/external/storage"',
    'object_url="://your/data/path/in/external/storage.json"',
    '"objectUrl": "://your/data/path/in/external/storage.json"',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.match(out, /STORAGE_PATH\s*=\s*"oss:\/\/\{bucket_name\}\/your\/data\/in\/storage\/"/);
  assert.match(out, /object_url\s*=\s*"oss:\/\/\{bucket_name\}\/you\/data\/in\/storage\.json"/);
  assert.match(out, /objectUrl"\s*:\s*"oss:\/\/\{bucket_name\}\/you\/data\/in\/storage\.json"/);
  assert.doesNotMatch(out, /object_url\s*=\s*":\/\//);
}

function testKeepsStorageUrisAndHostsUnchanged() {
  const input = [
    'oss://my-bucket/my-folder/',
    'https://my-bucket.oss-cn-hangzhou.aliyuncs.com/my-file.parquet',
    'https://my-bucket.cos.ap-beijing.myqcloud.com/object.json',
    'https://my-bucket.s3.northwest-1.amazonaws.com.cn/path/data.parquet',
    'https://s3.northwest-1.amazonaws.com.cn/my-bucket/path/data.parquet',
    's3://my-bucket/path/data.parquet',
    'some prose mentioning object_url should not change: s3://my-bucket/path/data.parquet',
  ].join('\n');

  const out = normalizeCnContent(input);

  assert.equal(out, input);
}

function testIsIdempotent() {
  const input = [
    'https://support.zilliz.com/hc/en-us',
    'uri="https://YOUR_CLUSTER_ENDPOINT"',
    'endpoint="https://{project-id}.{region}.api.zillizcloud.com.cn"',
  ].join('\n');

  const once = normalizeCnContent(input);
  const twice = normalizeCnContent(once);
  assert.equal(twice, once);
}

function run() {
  testNormalizesSupportSalesPricingUrls();
  testNormalizesEndpointPlaceholders();
  testNormalizesLegacyProjectEndpointFamilies();
  testKeepsCanonicalProjectEndpointWithoutDuplicateCn();
  testNormalizesClusterEndpointFamilies();
  testNormalizesDecoratedHttpSchemes();
  testNormalizesProviderAndRegionExamples();
  testNormalizesFieldScopedStorageExamples();
  testKeepsStorageUrisAndHostsUnchanged();
  testIsIdempotent();
  console.log('normalizeCnContent tests passed');
}

run();
