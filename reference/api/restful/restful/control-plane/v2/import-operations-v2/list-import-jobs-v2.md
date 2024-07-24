---
displayed_sidebar: restfulSidebar
sidebar_position: 32
slug: /restful/list-import-jobs-v2
title: 查看导入任务列表
---

import RestHeader from '@site/src/components/RestHeader';

This operation lists all import jobs of a specific cluster.

## Example

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
You can use either of the following ways to authorize:
<ul>
<li> An API Key with appropriate permissions.</li>
<li>A colon-joined username and password of the target cluster. For example, `username:passowrd`.</li>
</ul>
    
</Admonition>
```shell
export API_KEY=""

curl --location --request POST "https://api.cloud.zilliz.com/v2/vectordb/jobs/import/list" \
--header "Authorization: Bearer ${API_KEY}" \
--header "Content-Type: application/json" \
--data-raw '{
    "clusterId": "inxx-xxxxxxxxxxxxxxx",
    "currentPage":1,
    "pageSize":10,
}'
```
Possible response is similart to the following.
```json
{
    "code": 0,
    "data": {
        "count":1000,
        "currentPage":1,
        "pageSize":10,
        "records": [
            {
                "collectionName": "quick_setup",
                "jobId": "448761313698322011",
                "state": "Importing"
            }
        ]
    }
}
```

<RestHeader method="post" endpoint="https://api.cloud.zilliz.com/v2/vectordb/jobs/import/list" />

---

## 示例



# RESTful API Examples




## 请求

### 参数

- 无查询参数。

- 无路径参数。

- 请求头参数

    | Parameter        | Description                                                                               |
    |------------------|-------------------------------------------------------------------------------------------|
    | __Authorization__  | **string**(required)<br/>The authorization token. You should always use an API key with appropriate permissions.|
    | __Accept__  | **string**<br/>Use `application/json`.|

### 请求体

```json
{
    "clusterId": "string",
    "pageSize": "integer",
    "currentPage": "integer"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __clusterId__ | __string__  <br/>ID of a specific cluster on Zilliz Cloud.  |
| __pageSize__ | __integer__  <br/>Number of records to return at each request.  |
| __currentPage__ | __integer__  <br/>Current page number.  |

## 响应

Returns the list of import jobs of a specific cluster.

### 响应体

```json
{
    "code": "string",
    "data": {
        "count": "integer",
        "currentPage": "integer",
        "pageSize": "integer",
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
| __data__ | __object__<br/>Response payload. |
| __data.count__ | __integer__  <br/>Total number of records listed in this response.  |
| __data.currentPage__ | __integer__  <br/>Current page number for your reference.  |
| __data.pageSize__ | __integer__  <br/>Maximum number of records to be included in each return.  |
| __data[].records__ | __array__<br/>List of import jobs in detail. |
| __data[].records[]__ | __object__<br/>An import job in detail. |
| __data[].records[].collectionName__ | __string__  <br/>Name of the target collection of this import job.  |
| __data[].records[].jobId__ | __string__  <br/>ID of this import job.  |
| __data[].records[].state__ | __string__  <br/>State of this import job. Possible values are Pending, InProgress, Completed, and Failed.  |

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
