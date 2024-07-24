---
displayed_sidebar: restfulSidebar
sidebar_position: 64
slug: /restful/suspend-cluster
title: 挂起集群
---

import RestHeader from '@site/src/components/RestHeader';

挂起集群。本操作会中断集群运行，不会影响集群数据完整性。

<RestHeader method="post" endpoint="https://controller.${CLOUD_REGION}.vectordb.cloud.zilliz.com.cn:19530/v1/clusters/{CLUSTER_ID}/suspend" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request POST \ 
     --url "https://controller.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/<Cluster-ID>/suspend" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
  code: 200,
  data: {
     "clusterId": "cluster01",
     "prompt": "Submission successful. Your vector database computing cost is free until you Resume the Cluster, and only storage costs will be charged."
  }
}
```




## 请求

### 参数

- 无查询参数。

- 路径参数

    | 参数名称        | 参数说明                                                                             |
    |------------------|-------------------------------------------------------------------------------------------|
    | `CLUSTER_ID`  | **string**（必选）<br/>目标集群 ID。|

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|

### 请求体

No request body required

## 响应

集群 ID。

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
| __data.clusterId__ | __string__  <br/>集群 ID。  |
| __data.prompt__ | __string__  <br/>操作成功的回显信息。  |

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
