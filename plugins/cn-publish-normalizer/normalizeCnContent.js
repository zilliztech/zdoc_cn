const { canonical, providerMap, regionMap } = require('../../config/cn-publish-replacements');

function normalizeDecoratedSchemes(content) {
  let out = content;

  out = out.replace(/<(?:i|em|strong|b)>\s*http\s*<\/(?:i|em|strong|b)>s?:\/\//gi, 'https://');

  return out;
}

function normalizeUrls(content) {
  let out = content;

  out = out.replace(/https?:\/\/support\.zilliz\.com(?:\.cn)?(?:\/[\w\-.~%!$&'()*+,;=:@/]*)?(?:\?[\w\-.~%!$&'()*+,;=:@/?]*)?(?:#[\w\-.~%!$&'()*+,;=:@/?]*)?/gi, canonical.support);
  out = out.replace(/https?:\/\/(?:www\.)?zilliz\.com(?:\.cn)?\/contact-sales(?:\/[\w\-.~%!$&'()*+,;=:@/]*)?(?:\?[\w\-.~%!$&'()*+,;=:@/?]*)?(?:#[\w\-.~%!$&'()*+,;=:@/?]*)?/gi, canonical.sales);
  out = out.replace(
    /https?:\/\/(?:www\.)?zilliz\.com(?:\.cn)?(\/pricing(?:\/[\w\-.~%!$&'()*+,;=:@/]*)?(?:\?[\w\-.~%!$&'()*+,;=:@/?]*)?(?:#[\w\-.~%!$&'()*+,;=:@/?]*)?)/gi,
    `https://zilliz.com.cn$1`,
  );

  return out;
}

function normalizeEndpoints(content) {
  let out = content;

  out = out.replace(/https?:\/\/YOUR_CLUSTER_ENDPOINT\b/g, canonical.clusterEndpoint);
  out = out.replace(/\bYOUR_CLUSTER_ENDPOINT\b/g, canonical.clusterEndpoint);
  out = out.replace(/https?:\/\/YOUR_CLUSTER_PUBLIC_ENDPOINT\b/g, canonical.clusterEndpoint);
  out = out.replace(/\bYOUR_CLUSTER_PUBLIC_ENDPOINT\b/g, canonical.clusterEndpoint);
  out = out.replace(/https?:\/\/YOUR_ZILLIZ_CLOUD_ENDPOINT\b/g, canonical.zillizCloudEndpoint);
  out = out.replace(/\bYOUR_ZILLIZ_CLOUD_ENDPOINT\b/g, canonical.zillizCloudEndpoint);
  out = out.replace(/https?:\/\/YOUR_GLOBAL_ENDPOINT\b/g, canonical.globalEndpoint);
  out = out.replace(/\bYOUR_GLOBAL_ENDPOINT\b/g, canonical.globalEndpoint);
  out = out.replace(/https?:\/\/YOUR_PRIVATE_ENDPOINT\b/g, canonical.privateEndpoint);
  out = out.replace(/\bYOUR_PRIVATE_ENDPOINT\b/g, canonical.privateEndpoint);
  out = out.replace(/https?:\/\/YOUR_PROJECT_ENDPOINT\b/g, canonical.projectEndpoint);
  out = out.replace(/\bYOUR_PROJECT_ENDPOINT\b/g, canonical.projectEndpoint);
  out = out.replace(/https?:\/\/api\.cloud\.zilliz\.com(?!\.cn)\b/gi, canonical.controlPlaneEndpoint);

  out = out.replace(
    /https?:\/\/(\{[a-z0-9_-]+\}|[a-z0-9_-]+)\.(\{[a-z0-9_-]+\}|[a-z0-9_-]+)\.api\.(?:cloud\.zilliz\.com(?!\.cn)|zillizcloud\.com(?:\.cn)?|zilliz\.com\.cn)\b/gi,
    'https://$1.$2.api.cloud.zilliz.com.cn',
  );

  out = out.replace(
    /https?:\/\/((?:\{[a-z0-9_-]+\}|[a-z0-9_-]+))\.serverless\.(\{[a-z0-9_-]+\}|[a-z0-9_-]+)\.vectordb\.(?:zillizcloud\.com(?:\.cn)?|zilliz\.com\.cn)\b/gi,
    'https://$1.serverless.$2.cloud.zilliz.com.cn',
  );

  out = out.replace(
    /https?:\/\/((?:\{[a-z0-9_-]+\}|[a-z0-9_-]+)(?:\.(?:\{[a-z0-9_-]+\}|[a-z0-9_-]+))*)\.vectordb\.zillizcloud\.com(?:\.cn)?\b/gi,
    'https://$1.vectordb.zilliz.com.cn',
  );

  return out;
}

function normalizeDuplicateCnSuffixes(content) {
  return content.replace(/(?:\.cn){2,}\b/gi, '.cn');
}

function normalizeProviderAndRegionExamples(content) {
  let out = content;

  for (const [from, to] of Object.entries(regionMap)) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(
      new RegExp(`((?:\\bregionId\\b|\\bregion_id\\b|["']regionId["']|["']region_id["'])\\s*[:=]\\s*["']?)${escaped}(?=["']?)`, 'g'),
      `$1${to}`,
    );
  }

  for (const [from, to] of Object.entries(providerMap)) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    out = out.replace(
      new RegExp(`((?:\\bcloudId\\b|\\bcloud_id\\b|["']cloudId["']|["']cloud_id["'])\\s*[:=]\\s*["']?)${escaped}(?=["']?)`, 'g'),
      `$1${to}`,
    );
  }

  return out;
}

function normalizeStorageExamples(content) {
  let out = content;

  out = out.replace(
    /((?:\bSTORAGE_PATH\b|["']STORAGE_PATH["'])\s*[:=]\s*["'])[^"'\n]*(["'])/g,
    `$1${canonical.storagePathFolder}$2`,
  );

  out = out.replace(
    /((?:\bobject_url\b|\bOBJECT_URL\b|\bobjectUrl\b|["']object_url["']|["']OBJECT_URL["']|["']objectUrl["'])\s*[:=]\s*["'])[^"'\n]*(["'])/g,
    `$1${canonical.storageObjectFile}$2`,
  );

  return out;
}

function normalizeCnContent(content) {
  if (typeof content !== 'string' || content.length === 0) {
    return content;
  }

  return [
    normalizeDecoratedSchemes,
    normalizeUrls,
    normalizeEndpoints,
    normalizeDuplicateCnSuffixes,
    normalizeProviderAndRegionExamples,
    normalizeStorageExamples,
  ].reduce(
    (acc, pass) => pass(acc),
    content,
  );
}

module.exports = {
  normalizeCnContent,
};
