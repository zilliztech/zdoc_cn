---
slug: /import-data-via-restful-api
sidebar_position: 1
---

# 通过 RESTful API 导入

本文介绍如何通过 RESTful API 将数据导入现有 Collection 中。

## 开始前 {#before-you-start}

请确保已完成以下步骤：

- 已获取集群的 API 密钥。详情请参见[管理 API 密钥](./manage-api-keys)。

- 已下载示例数据集。详情请参见[示例数据集](./example-dataset-1)。

- 已创建 Collection，且该 Collection 的 Schema 与示例数据集相匹配。已为该 Collection 创建索引，并已加载 Collection。详情请参见[定制 Schema](./use-customized-schema)。

## 准备数据文件 {#prepare-data-files}

通过 RESTful API，您可以从单个 JSON 文件或多个 NumPy 文件导入数据。如果您的数据不是这两种格式，您可以使用 BulkWriter 转换数据格式。详情请参阅[使用 BulkWriter 导入](./use-bulkwriter-for-data-import)。

在准备数据文件时，请注意以下事项：

- 当数据类型为 JSON 时，每次导入仅支持一个 JSON 文件。这意味着您无法一次上传多个 JSON 文件。

- 如果数据类型为 NumPy，则可以选择一次上传多个文件，或将这些文件组织成一个文件夹，批量上传至 Zilliz Cloud 集群。请注意，每个子文件夹的大小不能超过 10 GB，父文件夹的大小不超过 100 GB。

- 当组织多个文件的文件夹时，请确保文件夹中所有文件的数据类型均一致，并且文件夹含有不超过两个子目录。如果目标文件夹同时包含 JSON 和 NumPy 数据，或超过两个子目录，则在导入数据时会出现错误。如果文件夹同时包含 NumPy 文件和其他不支持的数据类型，则会忽略不支持的文件类型，仅导入 NumPy 文件。例如，您可以指定类似于 **/dataset1/** 或 **/dataset2/sub/** 的有效路径。

要将示例数据集转换为多个 NumPy 文件，请使用以下代码：

```python
import json
import numpy

with open('path/to/medium_articles_2020_dpr.json') as f:
    dataset = json.load(f)
    keys = dataset['rows'][0].keys()

    for key in keys:
        numpy.save(f'{key}.npy', numpy.array([ x[key] for x in dataset['rows'] ]))

    # For JSON fields, you should dump the field values before saving them
    # numpy.save(f'json_field.npy', numpy.array([
    #     json.dumps({"year": 2015, "price": 23.43}),
    #     json.dumps({"year": 2018, "price": 15.05}),
    #     json.dumps({"year": 2020, "price": 36.68}),
    #     json.dumps({"year": 2019, "price": 20.14}),
    #     json.dumps({"year": 2021, "price": 9.36}))
    # ]))
```

## 通过 RESTful API 导入数据 {#importing-data-through-restful-api}

要导入数据，需要先将数据上传到对象存储桶（如阿里云 OSS）。上传完成后，需获取文件路径和桶凭据，以便 Zilliz Cloud 从您的桶中提取数据。

有关如何获取文件 URL 和访问密钥，请参见[获取单个或多个文件的 URL](https://help.aliyun.com/zh/oss/user-guide/how-to-obtain-the-url-of-a-single-object-or-the-urls-of-multiple-objects?spm=a2c4g.11186623.0.i18) 和[创建 Access Key](https://help.aliyun.com/document_detail/53045.html?spm=a2c4g.53045.0.0.718a7f80sYRRJB)。

:::info 说明

为了成功导入数据，请确保您使用的对象存储桶与您的集群位于相同的云中。

:::

一旦获取到文件路径和存储桶凭证，按以下方式调用 API：

```bash
curl --request POST \
     --url "<https://controller.api.$>{CLOUD_REGION_ID}.zillizcloud.com/v1/vector/collections/import" \\
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
     -d '{
       "clusterId": "${CLUSTER_ID}",
       "collectionName": "medium_articles",
       "objectUrl": "gs://publicdataset-zillizcloud-com/medium_articles_2020.json"
       "accessKey": "your-access-key"
       "secretKey": "your-secret-key"
     }'
```

请将请求体中的 Token 替换为集群的 API 密钥，并将其他字段值替换为您的实际值。请求提交后，将返回一个任务 ID。

要查询数据导入的进度，请按以下方式使用返回的任务 ID：

```bash
curl --request GET \
     --url "<https://controller.api.$>{CLOUD_REGION_ID}.zillizcloud.com/v1/vector/collections/import/get?jobId=${JOBID}&clusterId=${CLUSTERID}" \\
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
```

有关更多信息，请参见[导入](https://docs.zilliz.com.cn/reference/import)和[查看导入进度](https://docs.zilliz.com.cn/reference/get-import-progress)。

## **结果验证** {#result-validation}

如果请求返回以下类似内容，则表示数据导入成功：

```bash
{
    "code": 200,
    "data": {
        "jobId": "string"
    }
}
```

您也可以前往 Zilliz Cloud 控制台查看结果和任务详情：

![zh_data_import_complete_restful](/img/zh_data_import_complete_restful.png)

## 推荐阅读 {#recommended-reading}

- [使用 BulkWriter 导入](./use-bulkwriter-for-data-import)

- [通过 Web 控制台导入](./import-data-on-web-ui)

- [通过 SDK 导入](./import-data-via-sdks)
