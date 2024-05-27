---
displayed_sidebar: restfulSidebar
sidebar_position: 9
slug: /restful/create-serverless-cluster
title: 创建 Serverless 集群
---

import RestHeader from '@site/src/components/RestHeader';

创建一个 Serverless 集群。

<RestHeader method="post" endpoint="https://controller.api.{cloud-region}.cloud.zilliz.com.cn/v1/clusters/createServerless" />

---

## 示例


:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。
- 此 API 要求提供目标项目 ID。

:::

```shell
curl --request POST \
    --url "https://controller.api.${CLOUD_REGION}.zillizcloud.com/v1/clusters/createServerless" \
    --header "Authorization: Bearer ${API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json" \
    --data-raw '{
    "plan": "Free",    
    "clusterName": "cluster-starter",
    "projectId": "proj-*********************"
    }'
```

Success response:

```shell
{
    "code": 200,
    "data": {
       "clusterId": "in03-******************",
       "username": "db_admin",
       "password": "******************",
       "prompt": "Submission successful, Cluster is being created, You can use the DescribeCluster interface to obtain the creation progress and the status of the Cluster. When the Cluster status is RUNNING, you can access your vector database using the SDK with the admin account and the initialization password you provided."
    }
}
```

:::info 如何获取项目 ID？

您可以通过以下方式获取项目 ID：

- 通过 Zilliz Cloud 控制台查看：

    1. 在控制台导航栏中，选择 **项目** 菜单。
    2. 找到目标项目，并复制其 **项目 ID** 列中的值。

- 通过调用[查看项目列表](./list-projects)查看。

:::


## 请求

### 参数

- 无查询参数。

- 无路径参数。

### 请求体

```json
{
    "plan": "string",
    "clusterName": "string",
    "projectId": "string"
}
```

| 参数名称        | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __plan__ | string  <br/>待创建集群所属订阅计划。可选值有 `free` 和 `serverless`。  |
| __clusterName__ | string  <br/>待创建集群名称，长度不超过 32 个字符。  |
| __projectId__ | string  <br/>待创建集群所属项目 ID。  |

## 响应

返回包含创建集群详情的对象。

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
| __code__ | integer  <br/>  |
| __data__ | object<br/> |
| __data.clusterId__ | string  <br/>受当前操作影响的集群 ID。  |
| __data.username__ | string  <br/>默认生成的集群用户名。  |
| __data.password__ | string  <br/>默认生成的集群用户密码。此密码仅显示一次，请务必妥善保存。  |
| __data.prompt__ | string  <br/>表明当前操作成功的提示信息。  |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80014 | Invalid projectId. The projectId should like proj-xxxxxx |
| 80021 | Serverless cluster not support this operation. |

