---
displayed_sidebar: restfulSidebar
sidebar_position: 2
slug: /restful/list-clusters
title: 查看集群
---

import RestHeader from '@site/src/components/RestHeader';

列出指定云区域中的所有集群。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/clusters" />

---

## 示例




:::info 说明

- 此 API 要求您拥有 [API 密钥](/docs/manage-api-keys) 作为认证令牌。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/clusters?pageSize=10&currentPage=1" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json"
```

成功响应示例：

```shell
{
    "code": 200,
    "data": {
        "count": 0,
        "currentPage": 1,
        "pageSize": 10,
        "clusters": []
    }
}
```




## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `pageSize`  | **integer**<br/>每页返回的记录数。|
    | `current`  | **integer**<br/>当前页码。|

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>当前集群所属项目 ID。|

### 请求体

No request body required

## 响应

返回集群列表。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "count": "integer",
        "currentPage": "integer",
        "pageSize": "integer",
        "clusters": [
            {
                "clusterId": "string",
                "clusterName": "string",
                "description": "string",
                "regionId": "string",
                "clusterType": "string",
                "cuSize": "integer",
                "status": "string",
                "connectAddress": "string",
                "privateLinkAddress": "string",
                "createTime": "string"
            }
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.count__ | __integer__  <br/>返回的集群总数。  |
| __data.currentPage__ | __integer__  <br/>当前页码。  |
| __data.pageSize__ | __integer__  <br/>结果中每页显示的集群数。  |
| __data[].clusters__ | __array__<br/>集群信息，以数组形式返回。 |
| __data[].clusters[]__ | __object__<br/> |
| __data[].clusters[].clusterId__ | __string__  <br/>集群 ID。  |
| __data[].clusters[].clusterName__ | __string__  <br/>集群名称。  |
| __data[].clusters[].description__ | __string__  <br/>（可选）集群描述信息。  |
| __data[].clusters[].regionId__ | __string__  <br/>集群所在的地域 ID。  |
| __data[].clusters[].clusterType__ | __string__  <br/>集群使用的 CU 类型。有效值：**性能型**、 **容量型**和**经济型**。  |
| __data[].clusters[].cuSize__ | __integer__  <br/>集群使用的 CU 大小。  |
| __data[].clusters[].status__ | __string__  <br/>集群当前状态。有效值：**创建中**、**运行中**、**挂起中**和**恢复中**。  |
| __data[].clusters[].connectAddress__ | __string__  <br/>集群的公共 Endpoint。您可以通过此地址从公网连接到集群。  |
| __data[].clusters[].privateLinkAddress__ | __string__  <br/>集群的私有 Endpoint。您可以为集群设置私有链接，允许同一云区域中的 VPS 访问集群。  |
| __data[].clusters[].createTime__ | __string__  <br/>集群创建时间  |

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
