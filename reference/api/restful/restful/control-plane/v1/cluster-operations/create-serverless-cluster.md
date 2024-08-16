---
displayed_sidebar: restfulSidebar
sidebar_position: 68
slug: /restful/create-serverless-cluster
title: 创建 Serverless 集群
---

import RestHeader from '@site/src/components/RestHeader';

创建一个 Serverless 集群。

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/clusters/createServerless" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。
- 此 API 要求提供目标项目 ID。

:::

```shell
curl --request POST \
    --url "https://controller.api.${CLOUD_REGION}.zilliz.com.cn/v1/clusters/createServerless" \
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

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|

### 请求体

```json
{
    "plan": "string",
    "clusterName": "string",
    "projectId": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __plan__ | __string__  <br/>待创建集群所属订阅计划。可选值有 `free` 和 `serverless`。<br/>Possible values: "**Free**", "**Serverless**"  |
| __clusterName__ | __string__  <br/>待创建集群名称，长度不超过 32 个字符。  |
| __projectId__ | __string__  <br/>待创建集群所属项目 ID。  |

## 响应

返回包含创建集群详情的对象。

### 响应体

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

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.clusterId__ | __string__  <br/>此操作所影响的集群的 ID。  |
| __data.username__ | __string__  <br/>默认生成的集群用户的名称。  |
| __data.password__ | __string__  <br/>默认生成的集群用户的密码。它不会再次显示，所以请记下并安全存储。  |
| __data.prompt__ | __string__  <br/>表明此操作成功的声明。  |

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
