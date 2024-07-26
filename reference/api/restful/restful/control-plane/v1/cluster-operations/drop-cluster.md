---
displayed_sidebar: restfulSidebar
sidebar_position: 44
slug: /restful/drop-cluster
title: 删除集群
---

import RestHeader from '@site/src/components/RestHeader';

删除一个集群。当前操作会将该指定集群移动到回收站。回收站中的集群将在 30 天后被彻底删除。

<RestHeader method="delete" endpoint="https://controller.${CLOUD_REGION}.vectordb.cloud.zilliz.com.cn:19530/v1/clusters/{CLUSTER_ID}/drop" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request DELETE \
    --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/${clusterId}/drop" \
    --header "Authorization: Bearer ${API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
       "clusterId": "in01-***************",
       "prompt": "The Cluster has been deleted. If you believe this was a mistake, you can restore the Cluster from the recycle bin within 30 days (this not include serverless)."
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

No request body required

## 响应

返回已删除的集群信息。

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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.clusterId__ | __string__  <br/>已删除的集群 ID。  |
| __data.prompt__ | __string__  <br/>描述集群删除成功的提示信息。  |

### 错误响应

```json
{
    "code": integer,
    "message": string
}
```

| 属性名称    | 属性描述                                                                                                                                    |
|-------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__    | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __message__ | **string**<br/>表示错误信息。                                                                        |
