---
displayed_sidebar: restfulSidebar
sidebar_position: 11
slug: /restful/import
title: 导入
---

import RestHeader from '@site/src/components/RestHeader';

从指定的对象存储桶中的文件导入数据。该对象存储桶须与目标集群处于同一公有云网络。

<RestHeader method="post" endpoint="https://controller.api.${CLOUD_REGION}.cloud.zilliz.com.cn/v1/vector/collections/import" />

---

## 示例




:::info 说明

您可以使用拥有相应权限的 [API 密钥](/docs/manage-api-keys)完成鉴权。

:::

从指定的对象存储桶中的文件导入数据。该对象存储桶须与目标集群处于同一公有云网络。

```shell
curl --request POST \
     --url "https://controller.api.${CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/vector/collections/import" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "clusterId": "in03-181766e3f9556b7",
       "collectionName": "medium_articles",
       "objectUrl": "gs://publicdataset-zillizcloud-com/medium_articles_2020.json",
       "accessKey": "your-access-key",
       "secretKey": "your-secret-key"
     }'
```




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
    "clusterId": "string",
    "collectionName": "string",
    "objectUrl": "string",
    "accessKey": "string",
    "secretKey": "string"
}
```

| 参数名称          | 参数描述                                                                               |
|------------------|-------------------------------------------------------------------------------------------|
| __clusterId__ | __string__  <br/>目标集群 ID。  |
| __collectionName__ | __string__  <br/>目标 Collection 名称。  |
| __objectUrl__ | __string__  <br/>用于存储待导入数据的对象的 URL。  |
| __accessKey__ | __string__  <br/>用于访问指定对象的访问密钥（AK）。  |
| __secretKey__ | __string__  <br/>用于访问指定对象的访问密钥（SK）。  |

## 响应

创建导入任务并返回该任务的Job ID。

### 响应体

```json
{
    "code": "integer",
    "data": {
        "jobId": "string"
    }
}
```

| 属性名称 | 属性描述                                                                                                                                    |
|----------|---------------------------------------------------------------------------------------------------------------------------------------------|
| __code__ | **integer**<br/>表示当前操作是否成功。<br/><ul><li>`200`: 当前操作成功返回。</li><li>其它: 发生错误。</li></ul> |
| __data__ | __object__<br/> |
| __data.jobId__ | __string__  <br/>已提交的导入任务 ID。  |

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
