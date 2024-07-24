---
displayed_sidebar: restfulSidebar
sidebar_position: 38
slug: /restful/describe-cluster-v2
title: 查看集群详情
---

import RestHeader from '@site/src/components/RestHeader';

Describe a cluster in detail.

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

## Example

```shell
export API_KEY=""

curl --request GET \
    --url "https://api.cloud.zilliz.com/v2/clusters/inxx-xxxxxxxxxxxxxxx" \
    --header "Authorization: Bearer ${API_KEY}"   \
    --header "accept: application/json"
```

Possible response is similar to the following.

```json
{
  "code":0,
  "data": {
    "clusterId": "inxx-xxxxxxxxxxxxxxx",
    "clusterName": "Dedicated-01",
    "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxx",
    "description": "",
    "regionId": "aws-us-west-2",
    "cuType": "Performance-optimized",
    "plan": "Standard",
    "status": "RUNNING",
    "connectAddress": "https://inxx-xxxxxxxxxxxxxxx.aws-us-west-2.vectordb.zillizcloud.com:19530",
    "privateLinkAddress": "",
    "createTime": "2024-06-30T16:34:09Z",
    "cuSize": 2,
    "storageSize": 0,
    "snapshotNumber": 0,
    "createProgress": 100
  }
}
```

<RestHeader method="get" endpoint="https://api.cloud.zilliz.com/v2/clusters/{clusterId}" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/<Cluster-ID>" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
        "clusterId": "in05-***************",
        "clusterName": "Serverless-01",
        "description": "",
        "regionId": "ali-cn-hangzhou",
        "clusterType": "",
        "plan": "Serverless",
        "cuSize": 0,
        "status": "RUNNING",
        "connectAddress": "https://in05-***************.*.api.ali-cn-hangzhou.cloud.zilliz.com.cn",
        "privateLinkAddress": "",
        "createTime": "2024-05-27T10:36:09Z",
        "storageSize": 0,
        "snapshotNumber": 0,
        "createProgress": 100,
        "projectId": "proj-**********************"
    }
}
```




## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `clusterId`  | **string**（必选）<br/>ID of the cluster whose details are to return.|

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>The authorization token. You should always use an API key with appropriate permissions.|
    | __Accept__  | **string**<br/>Use `application/json`.|

### 请求体

No request body required

## 响应

Returns the details of a specified cluster.

### 响应体

```json
{
    "code": "integer",
    "data": {
        "clusterId": "string",
        "clusterName": "string",
        "projectId": "string",
        "description": "string",
        "regionId": "string",
        "cuType": "string",
        "plan": "string",
        "status": "string",
        "connectAddress": "string",
        "privateLinkAddress": "string",
        "cuSize": "integer",
        "storageSize": "integer",
        "snapshotNumber": "integer",
        "createProgress": "integer",
        "createTime": "string"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/>Response payload. |
| __data.clusterId__ | __string__  <br/>ID of the specified cluster.  |
| __data.clusterName__ | __string__  <br/>Name of the cluster.  |
| __data.projectId__ | __string__  <br/>ID of the project to which the cluster belongs.  |
| __data.description__ | __string__  <br/>Description of the cluster.  |
| __data.regionId__ | __string__  <br/>ID of the cloud region hosting the cluster.  |
| __data.cuType__ | __string__  <br/>CU type of the cluster. <br/>This applies to dedicated clusters only. For free and serverless clusters, the value is empty.<br/>Possible values: "**Performance-optimized**", "**Capacity-optimized**"  |
| __data.plan__ | __string__  <br/>Subscription plan of the cluster.<br/>Possible values: "**Free**", "**Serverless**", "**Standard**", "**Enterprise**"  |
| __data.status__ | __string__  <br/>Current status of the cluster.  |
| __data.connectAddress__ | __string__  <br/>Public endpoint of the cluster.  |
| __data.privateLinkAddress__ | __string__  <br/>Private link of the cluster.  |
| __data.cuSize__ | __integer__  <br/>CU size of the cluster. For free and serverless clusters, the value is always `0`.<br/>The value is less than or equal to 256.  |
| __data.storageSize__ | __integer__  <br/>  |
| __data.snapshotNumber__ | __integer__  <br/>Number of backups created.  |
| __data.createProgress__ | __integer__  <br/>Creation progress of the cluster.  |
| __data.createTime__ | __string__  <br/>Time at which the cluster has been created.  |

### 错误响应

```json
{
    "code": integer,
    "message": string
}
```

| 属性名称    | 属性描述                                                                                                                                    |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__    | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __message__ | **string**<br/>表示错误信息。                                                                        |
