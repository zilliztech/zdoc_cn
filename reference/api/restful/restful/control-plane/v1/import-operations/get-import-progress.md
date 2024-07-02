---
displayed_sidebar: restfulSidebar
sidebar_position: 12
slug: /restful/get-import-progress
title: 查看导入进度
---

import RestHeader from '@site/src/components/RestHeader';

获取指定导入任务的进度。

<RestHeader method="get" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/vector/collections/import/get" />

---

## 示例




:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

```shell
curl --request GET \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/vector/collections/import/get?jobId=${JOBID}&clusterId=${CLUSTERID}" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
```




## 请求

### 参数

- 查询参数

    | 参数名称          | 参数说明                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | `jobId`  | **string**（必选）<br/>指定的导入任务 ID。|
    | `clusterId`  | **string**（必选）<br/>应用当前操作的集群 ID。|

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**<br/>|

### 请求体

No request body required

## 响应

以百分比的形式返回指定的导入任务的进度。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "fileName": "string",
        "fileSize": "integer",
        "readyPercentage": "number",
        "completeTime": "string",
        "errorMessage": "string",
        "collectionName": "string",
        "jobId": "string",
        "details": [
            {
                "fileName": "string",
                "fileSize": "integer",
                "readyPercentage": "number",
                "completeTime": "string",
                "errorMessage": "string"
            }
        ]
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.fileName__ | __string__  <br/>对象存储中数据文件对象的路径。  |
| __data.fileSize__ | __integer__ (int64) <br/>数据文件对象的大小。  |
| __data.readyPercentage__ | __number__ (float) <br/>导入进度的百分比指示器。  |
| __data.completeTime__ | __string__  <br/>导入任务完成的预计持续时间（以秒为单位）。  |
| __data.errorMessage__ | __string__  <br/>导入失败的原因说明。  |
| __data.collectionName__ | __string__  <br/>导入任务对应的目标 Collection 名称。  |
| __data.jobId__ | __string__  <br/>导入任务的 ID。  |
| __data[].details__ | __array__<br/>导入任务详情。 |
| __data[].details[]__ | __object__<br/> |
| __data[].details[].fileName__ | __string__  <br/>正在导入的文件路径。  |
| __data[].details[].fileSize__ | __integer__ (int64) <br/>正在导入的文件大小。  |
| __data[].details[].readyPercentage__ | __number__ (float) <br/>当前文件的导入进度。  |
| __data[].details[].completeTime__ | __string__  <br/>当前文件完成导入的时间。值为 `null` 时表示文件正在导入。  |
| __data[].details[].errorMessage__ | __string__  <br/>对于导入失败的提示信息。值为 `null` 时表示无错误发生。  |

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
