---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /modify-cluster
title: 修改集群配置
---

import RestHeader from '@site/src/components/RestHeader';

修改指定集群的配置。当前，您可以使用本 API 修改指定集群的 CU 设置。

<RestHeader method="post" endpoint="https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/clusters/{clusterId}/modify" />

---

## 示例


修改指定集群的配置。当前支持修改集群的 CU 大小。

```shell
curl --request POST \
    --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/<Cluster-ID>/modify" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json" \
    --data-raw '{
    "cuSize": 2
    }'
```

Success response:

```shell
{
    "code": 200,
    "data": {
       "clusterId": "in01-2040352a6a0b1b7",
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
    | `clusterId`  | **string**（必选）<br/>当前操作影响的集群 ID。|

### 请求体

```json
{
    "cuSize": "integer"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `cuSize`  | **integer**（必选）<br/>指定本次操作后的分配给当前集群的 CU 大小。|

## 响应

返回本次操作影响的集群 ID。

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
| `data`    | **object**<br/>表示响应中携带的数据对象。 |
| `data.clusterId`   | **string**<br/>集群 ID |
| `data.prompt`   | **string**<br/>提示当前操作已成功 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80006 | Invalid cuSize. The parameter value should be one of [1 |
| 80014 | Invalid projectId. The projectId should like proj-xxxxxx |
| 80021 | Serverless cluster not support this operation. |

