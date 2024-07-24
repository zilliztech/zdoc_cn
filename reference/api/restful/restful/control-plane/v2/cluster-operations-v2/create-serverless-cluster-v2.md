---
displayed_sidebar: restfulSidebar
sidebar_position: 61
slug: /restful/create-serverless-cluster-v2
title: 创建 Serverless 集群
---

import RestHeader from '@site/src/components/RestHeader';

Create serverless cluster.

## Example

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""
export REGION_ID=""

curl --request POST \
     --url https://api.cloud.zilliz.com/v2/clusters/createServerless \
     --header 'Authorization: Bearer ${API_KEY}' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data-raw '{
        "clusterName": "Serverless-05",
        "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxxx",
        "regionId": "${REGION_ID}"
      }'
```

Possible response is similar to the following
```json
{
  code: 0,
  data: {
     "clusterId": "inxx-xxxxxxxxxxxxxxx",
     "username":"db_xxxxxxxx",
     "password":"***********",
     "prompt": "Successfully submitted, cluster is being created. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK with the admin account and the initial password you specified."
  }
}
```

<RestHeader method="post" endpoint="https://api.cloud.zilliz.com/v2/clusters/createServerless" />

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

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**(required)<br/>The authorization token. You should always use an API key with appropriate permissions.|
    | __Accept__  | **string**<br/>Use `application/json`.|
    | __Content-Type__  | **string**<br/>Use `application/json`.|

### 请求体

```json
{
    "clusterName": "string",
    "projectId": "string",
    "regionId": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __clusterName__ | __string__  <br/>Name of the cluster to create.  |
| __projectId__ | __string__  <br/>ID of the project to which the cluster belongs.  |
| __regionId__ | __string__  <br/>ID of the cloud region hosting the cluster.  |

## 响应

Returns the details of the created cluster.

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
| __data__ | __object__<br/>Response payload. |
| __data.clusterId__ | __string__  <br/>ID of the cluster created.  |
| __data.username__ | __string__  <br/>Name of the cluster administration user.  |
| __data.password__ | __string__  <br/>Password of the cluster administration user.  |
| __data.prompt__ | __string__  <br/>Prompt messages returned.  |

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
