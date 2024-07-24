---
displayed_sidebar: restfulSidebar
sidebar_position: 30
slug: /restful/create-cluster
title: 创建集群
---

import RestHeader from '@site/src/components/RestHeader';

创建一个新集群

<RestHeader method="post" endpoint="https://controller.${CLOUD_REGION}.vectordb.cloud.zilliz.com.cn:19530/v1/clusters/create" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。
- 此 API 要求提供目标项目 ID。

:::

```shell
curl --request POST \
    --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters/create" \
    --header "Authorization: Bearer ${API_KEY}" \
    --header "accept: application/json" \
    --header "content-type: application/json" \
    --data-raw '{
        "plan": "Enterprise",
        "clusterName": "cluster-02",
        "cuSize": 1,
        "cuType": "Performance-optimized",
        "projectId": "proj-*****************"
    }'
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
       "clusterId": "in01-*****************",
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
    "cuSize": "integer",
    "cuType": "string",
    "projectId": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __plan__ | __string__  <br/>Zilliz Cloud 服务订阅计划。当前可选为**Enterprise** (企业版)。<br/>Possible values: "**Standard**", "**Enterprise**"  |
| __clusterName__ | __string__  <br/>待创建集群名称。名称长度不得走过 32 个半角字符。  |
| __cuSize__ | __integer__  <br/>待创建集群使用的 CU 大小。取值范围在 1 至 256 之间的正整数。  |
| __cuType__ | __string__  <br/>待创建集群使用的 CU 类型。当前可选为 **Performance-optimized** (性能型), **Capacity-optimized** (容量型), **Cost-optimized** (经济型)。默认取值为 **Performance-optimized** (性能型)。<br/>The value defaults to Performance-optimized<br/>Possible values: "**Performance-optimized**", "**Capacity-optimized**"  |
| __projectId__ | __string__  <br/>待创建集群所属项目 ID。  |

## 响应

返回新创建的集群信息。

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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.clusterId__ | __string__  <br/>受当前操作影响的集群 ID。  |
| __data.username__ | __string__  <br/>自动生成的集群用户名。  |
| __data.password__ | __string__  <br/>自动生成的集群用户密码。仅展示一次，请务必妥善保管。  |
| __data.prompt__ | __string__  <br/>描述集群创建成功的提示信息。  |

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
