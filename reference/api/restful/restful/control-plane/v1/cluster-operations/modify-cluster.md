---
displayed_sidebar: restfulSidebar
sidebar_position: 53
slug: /restful/modify-cluster
title: 修改集群配置
---

import RestHeader from '@site/src/components/RestHeader';

修改指定集群的配置。当前，仅支持修改集群使用的 CU 大小。

<RestHeader method="post" endpoint="https://controller.${CLOUD_REGION}.vectordb.cloud.zilliz.com.cn:19530/v1/clusters/{CLUSTER_ID}/modify" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request POST \
    --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/${clusterId}/modify" \
    --header "Authorization: Bearer ${API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json" \
    --data-raw '{
    "cuSize": 2
    }'
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
       "clusterId": "in01-***************",
       "prompt": "Submission successful, Cluster is currently upgrading and will take several minutes, you can use the DescribeCluster interface to obtain the creation progress and the status of the Cluster. When the Cluster status is RUNNING, you can access your vector database using the SDK."
    }
}
```




## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `CLUSTER_ID`  | **string**（必选）<br/>受当前操作影响的集群 ID。|

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|

### 请求体

```json
{
    "cuSize": "integer"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __cuSize__ | __integer__  <br/>当前操作成功后，集群使用的 CU 大小。  |

## 响应

返回已修改的集群信息。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "clusterId": "string",
        "prompt": "string"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.clusterId__ | __string__  <br/>受当前操作影响的集群 ID。  |
| __data.prompt__ | __string__  <br/>描述集群修改成功的提示信息。  |

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
