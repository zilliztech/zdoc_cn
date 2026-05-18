module.exports = {
  canonical: {
    support: 'https://support.zilliz.com.cn/hc/zh-cn',
    sales: 'https://zilliz.com.cn/contact-sales',
    pricingBase: 'https://zilliz.com.cn/pricing',
    controlPlaneEndpoint: 'https://api.cloud.zilliz.com.cn',
    globalEndpoint: 'https://glo-xxxx.global-cluster.vectordb.zilliz.com.cn',
    privateEndpoint: 'https://{cluster-id}-privatelink.{region}.vectordb.zilliz.com.cn',
    clusterEndpoint: 'https://{cluster-id}.{region}.vectordb.zilliz.com.cn:19530',
    zillizCloudEndpoint: 'https://{project-id}.{region}.api.cloud.zilliz.com.cn',
    projectEndpoint: 'https://{project-id}.{region}.api.cloud.zilliz.com.cn',
  },
  providerMap: {
    aws: 'ali',
    gcp: 'ali',
    azure: 'ali',
  },
  regionMap: {
    'aws-us-east-1': 'ali-cn-hangzhou',
    'aws-us-west-2': 'ali-cn-hangzhou',
    'gcp-us-west1': 'ali-cn-hangzhou',
    'az-eastus': 'ali-cn-hangzhou',
    'az-westus3': 'ali-cn-hangzhou',
  },
};
