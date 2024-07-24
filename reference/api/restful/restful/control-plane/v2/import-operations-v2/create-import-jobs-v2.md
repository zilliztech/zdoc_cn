---
displayed_sidebar: restfulSidebar
sidebar_position: 3
slug: /restful/create-import-jobs-v2
title: 创建导入任务
---

import RestHeader from '@site/src/components/RestHeader';

Imports data from files stored in a specified object storage bucket. To learn how to prepare your data files, read [Prepare Data Import](/docs/prepare-source-data).

## Example

import Admonition from '@theme/Admonition';

<Admonition type="info" icon="📘" title="Notes">
    
<p>This API requires an <a href="/docs/manage_api_keys">API key</a> as the authentication token.</p>
    
</Admonition>

```shell
export API_KEY=""

curl --location --request POST "https://api.cloud.zilliz.com/v2/vectordb/jobs/import/create" \
--header "Authorization: Bearer ${API_KEY}" \
--header "Content-Type: application/json" \
--data-raw '{
    "clusterId": "inxx-xxxxxxxxxxxxxxx",
    "collectionName": "medium_articles",
    "partitionName":"",
    "objectUrl": "https://s3.us-west-2.amazonaws.com/publicdataset.zillizcloud.com/medium_articles_2020_dpr/medium_articles_2020_dpr.json",
    "accessKey": "",
    "secretKey": ""
}'
```

Possible response is similar to the following

```json
{
    "code": 0,
    "data": {
        "jobId": "448707763884413158"
    }
}
```

<RestHeader method="post" endpoint="https://api.cloud.zilliz.com/v2/vectordb/jobs/import/create" />

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
    "collectionName": "string",
    "partitionName": "string",
    "objectUrl": "string",
    "accessKey": "string",
    "secretKey": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __clusterId__ | __string__  <br/>ID of a cluster to which this operation applies.  |
| __collectionName__ | __string__  <br/>Name of the target collection.Setting this to a non-existing collection results in an error.  |
| __partitionName__ | __string__  <br/>Name of the partition to which this operation applies.  |
| __objectUrl__ | __string__  <br/>URL of the object that stores the data to be imported.  |
| __accessKey__ | __string__  <br/>Access key used to access the specified object.  |
| __secretKey__ | __string__  <br/>Access secret key used to access the specified object.  |

## 响应

Returns the ID of the created import jobs.

### 响应体

```json
{
    "code": "string",
    "data": {
        "jobId": "string"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/>Response payload. |
| __data.jobId__ | __string__  <br/>ID of the import job that has been submitted.  |

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
