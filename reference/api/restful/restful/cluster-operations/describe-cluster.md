---
displayed_sidebar: restfulSidebar
sidebar_position: 4
slug: /restful/describe-cluster
title: 查看集群详情
---

import RestHeader from '@site/src/components/RestHeader';

描述集群的详细信息。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clusters/${CLUSTER_ID}" />

---

## 示例


:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clusters/<Cluster-ID>" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
        "clusterId": "in05-***************",
        "clusterName": "Serverless-01",
        "description": "",
        "regionId": "ali-cn-hangzhou",
        "clusterType": "",
        "plan": "Serverless",
        "cuSize": 0,
        "status": "RUNNING",
        "connectAddress": "https://in05-***************.*.api.ali-cn-hangzhou.cloud.zilliz.com.cn",
        "privateLinkAddress": "",
        "createTime": "2024-05-27T10:36:09Z",
        "storageSize": 0,
        "snapshotNumber": 0,
        "createProgress": 100,
        "projectId": "proj-**********************"
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

### 请求体

无请求体。

## 响应

集群信息，以数组形式返回。

### 响应体

- 处理请求成功后返回

```json
{
    "code": "integer",
    "data": {
        "clusterId": "string",
        "clusterName": "string",
        "description": "string",
        "regionId": "string",
        "clusterType": "string",
        "cuSize": "integer",
        "status": "string",
        "connectAddress": "string",
        "privateLinkAddress": "string",
        "createTime": "string",
        "storageSize": "integer",
        "snapshotNumber": "integer",
        "createProgress": "integer"
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
| __data.clusterId__ | string  <br/>集群 ID。  |
| __data.clusterName__ | string  <br/>集群名称。  |
| __data.description__ | string  <br/>（可选）集群描述信息。  |
| __data.regionId__ | string  <br/>集群所在的地域 ID。  |
| __data.clusterType__ | string  <br/>集群使用的 CU 类型。  |
| __data.cuSize__ | integer  <br/>集群使用的 CU 大小。  |
| __data.status__ | string  <br/>集群当前状态。有效值：**创建中**、**运行中**、**挂起中**和**恢复中**。  |
| __data.connectAddress__ | string  <br/>集群的公共 Endpoint。您可以通过此地址从公网连接到集群。  |
| __data.privateLinkAddress__ | string  <br/>集群的私有 Endpoint。您可以为集群设置私有链接，允许同一云区域中的 VPS 访问您的集群。  |
| __data.createTime__ | string  <br/>集群创建时间。  |
| __data.storageSize__ | integer (sint64) <br/>集群的存储容量。  |
| __data.snapshotNumber__ | integer  <br/>集群的快照数量。  |
| __data.createProgress__ | integer  <br/>集群创建进程。  |
| `message`  | **string**<br/>具体描述请求错误的原因。 |

## 错误码清单

| 错误码 | 错误消息 |
| ---- | ------------- |
| 80001 | The token is illegal |
| 80002 | The token is invalid |
| 80020 | Cluster not exist or you don't have permission. |
| 90103 | The clusterId parameter is empty in the request path. |
| 90117 | Invalid domain name used |

