---
displayed_sidebar: referenceSidebar
sidebar_position: 0
slug: /create-cluster
title: 创建集群
---

import RestHeader from '@site/src/components/RestHeader';

创建一个新集群

<RestHeader method="post" endpoint="https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/clusters/create" />

---

## 示例


:::note 说明

- 本接口需要使用 [API 密钥](/docs/manage-api-keys)作为鉴权凭据。

:::

```shell
curl --request POST \
    --url "https://controller.api.${cloud-region}.cloud.zilliz.com.cn/v1/clusters/create" \
    --header "Authorization: Bearer ${YOUR_API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json" \
    --data-raw '{
          "plan": "Enterprise",
          "clusterName": "cluster-02",
          "cuSize": 1,
          "cuType": "Performance-optimized",
          "projectId": "proj-***************"
    }'
```

成功响应示例

```shell
{
    "code": 200,
    "data": {
       "clusterId": "in01-4d71039fd8754a4",
       "username": "db_admin",
       "password": "Wu5***************",
       "prompt": "Submission successful, Cluster is being created, You can use the DescribeCluster interface to obtain the creation progress and the status of the Cluster. When the Cluster status is RUNNING, you can access your vector database using the SDK with the admin account and the initialization password you provided."
    }
}
```


## 请求

### 参数

- 无查询参数。

- 无路径参数。

### 请求体

```json
{
    "plan": "string",
    "clusterName": "string",
    "cuSize": "integer",
    "cuType": "string",
    "projectId": "string"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| `plan`  | **string**（必选）<br/>Zilliz Cloud 支持的订阅计划。当前仅支持 **Enterprise**。|
| `clusterName`  | **string**（必选）<br/>待创建集群名称。最多包含 32 个半角字符。|
| `cuSize`  | **integer**（必选）<br/>为待创建集群分配的 CU 大小。参数取值为 1 至 256 之间的整数。|
| `cuType`  | **string**（必选）<br/>为待创建集群分配的 CU 类型。可选值有 **Performance-optimized**， **Capacity-optimized** 以及 **Cost-optimized**。 若不填写，默认为 **Performance-optimized**。<br/>默认值为 **Performance-optimized**.|
| `projectId`  | **string**（必选）<br/>待创建集群所属项目 ID。您可以在 Zilliz Cloud 控制台**集群**页面的 URL 中获取以`proj-`开头的字符串作为项目 ID 使用。|

## 响应

返回成功创建的集群详情。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "clusterId": "string",
        "username": "string",
        "password": "string",
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
| `data.clusterId`   | **string**<br/>当前操作影响的集群 ID。 |
| `data.username`   | **string**<br/>Zilliz Cloud 为当前集群默认生成的用户名，可用于访问该集群。 |
| `data.password`   | **string**<br/>Zilliz Cloud 为当前集群默认生成的用户密钥，可用于访问该集群。该密码只显示一次，请务必记录并妥善保存。 |
| `data.prompt`   | **string**<br/>提示当前操作已成功。 |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80005 | Invalid cuType. The parameter value should be one of ['Performance-optimized' |
| 80006 | Invalid cuSize. The parameter value should be one of [1 |
| 80009 | "Invalid clusterName |
| 80013 | Invalid plan. The parameter value should be one of ['Standard' |
| 80014 | Invalid projectId. The projectId should like proj-xxxxxx |
| 80020 | Cluster not exist or you don't have permission. |

