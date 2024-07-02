---
displayed_sidebar: restfulSidebar
sidebar_position: 13
slug: /restful/list-import-jobs
title: 查看数据导入任务
---

import RestHeader from '@site/src/components/RestHeader';

列出指定集群上的数据导入任务。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/vector/collections/import/list" />

---

## 示例




:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/vector/collections/import/list?clusterId=${CLUSTERID}" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
```




## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `clusterId`  | **string**（必选）<br/>Zilliz Cloud 集群 ID。|
    | `pageSize`  | **string**<br/>每次返回的导入任务数量。|
    | `currentPage`  | **string**<br/>当前页码。|

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|

### 请求体

No request body required

## 响应

返回导入作业的列表。

### 响应体

```json
{
    "code": "string",
    "data": {
        "count": "string",
        "currentPage": "string",
        "pageSize": "string",
        "records": [
            {
                "collectionName": "string",
                "jobId": "string",
                "state": "string"
            }
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.count__ | __string__  <br/>当前响应中包含的导入任务数量。  |
| __data.currentPage__ | __string__  <br/>当前页码。  |
| __data.pageSize__ | __string__  <br/>每次返回的最大记录数量。  |
| __data[].records__ | __array__<br/> |
| __data[].records[]__ | __object__<br/> |
| __data[].records[].collectionName__ | __string__  <br/>当前导入任务对应的目标 Collection 名称。  |
| __data[].records[].jobId__ | __string__  <br/>当前导入任务的 ID。  |
| __data[].records[].state__ | __string__  <br/>当前导入任务的状态。可能的取值有： <b>ImportRunning</b>、<b>ImportCompleted</b> 和 <b>ImportFailed</b>.  |

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
