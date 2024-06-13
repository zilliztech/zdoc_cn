---
displayed_sidebar: restfulSidebar
sidebar_position: 5
slug: /restful/drop-cluster
title: 删除集群
---

import RestHeader from '@site/src/components/RestHeader';

删除一个集群。当前操作会将该指定集群移动到回收站。回收站中的集群将在 30 天后被彻底删除。

<RestHeader method="delete" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clusters/${CLUSTER_ID}/drop" />

---

## 示例


:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request DELETE \
    --url "https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clusters/${clusterId}/drop" \
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

### 请求体

无请求体。

## 响应

返回已删除的集群信息。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "clusterId": "string",
        "prompt": "string"
    }
}
```

- 处理请求失败后返回

```json
{
    "code": integer,
    "message": string
}
```

### 属性

下表罗列了响应包含的所有属性。

| 属性名称  | 属性描述                                                                                                                               |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `code`   | **integer**<br/>表示请求是否成功。<br/><ul><li>`200`：请求成功。</li><li>其它：存在错误。</li></ul> |
| __code__ | integer  <br/>  |
| __data__ | object<br/> |
| __data.clusterId__ | string  <br/>已删除的集群 ID。  |
| __data.prompt__ | string  <br/>描述集群删除成功的提示信息。  |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Cluster not exist or you don't have permission. |
| 80021 | Serverless cluster not support this operation. |
| 90102 | The cluster does not exist in current region. |
| 90103 | The clusterId parameter is empty in the request path. |

