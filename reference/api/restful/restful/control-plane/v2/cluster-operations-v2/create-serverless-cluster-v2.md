---
displayed_sidebar: restfulSidebar
sidebar_position: 61
slug: /restful/create-serverless-cluster-v2
title: 创建 Serverless 集群
---

import RestHeader from '@site/src/components/RestHeader';

Create serverless cluster.

<RestHeader method="post" endpoint="https://api.cloud.zilliz.com.cn/v2/clusters/createServerless" />

---

## 示例



import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""
export REGION_ID=""

curl --request POST \
     --url https://api.cloud.zilliz.com.cn/v2/clusters/createServerless \
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
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
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
| __code__    | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`0`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __message__ | **string**<br/>表示错误信息。                                                                        |
