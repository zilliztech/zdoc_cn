---
slug: /import-data-via-restful-api
sidebar_label: RESTful API
beta: FALSE
notebook: FALSE
type: origin
token: FzANwnN8siARelkAp4vcJVJNnnf
sidebar_position: 2

---

import Admonition from '@theme/Admonition';


# 通过 RESTful API 导入

本文介绍如何通过 RESTful API 将数据导入现有 Collection 中。

## 开始前{#before-you-start}

请确保已完成以下步骤：

- 已获取集群的 API 密钥。详情请参见[管理 API 密钥](./manage-api-keys)。

- 已创建 Collection，且该 Collection 的 Schema 与示例数据集相匹配。已为该 Collection 创建索引，并已加载 Collection。详情请参见[管理 Collection](./manage-collections)。

## 通过 RESTful API 导入数据{#import-data-using-the-restful-api}

要导入数据，需要先将数据上传到对象存储桶（如阿里云 OSS）。上传完成后，需获取文件路径和桶凭据，以便 Zilliz Cloud 从您的桶中提取数据。

有关如何获取文件 URL 和访问密钥，请参见[获取单个或多个文件的 URL](https://help.aliyun.com/zh/oss/user-guide/how-to-obtain-the-url-of-a-single-object-or-the-urls-of-multiple-objects?spm=a2c4g.11186623.0.i18) 和[创建 Access Key](https://help.aliyun.com/document_detail/53045.html?spm=a2c4g.53045.0.0.718a7f80sYRRJB)。

<Admonition type="info" icon="📘" title="说明">

<p>为了成功导入数据，请确保目标 Collection 中的正在运行或待运行的导入任务不超过 10 个。</p>

</Admonition>

一旦获取到文件路径和存储桶凭证，按以下方式调用 API：

```bash
curl --request POST \
     --url "<https://controller.api.$>{CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/vector/collections/import" \
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

在上述代码中，`${CLOUD_REGION_ID}` 代表您集群所在的云地域的 ID，`${TOKEN}` 是用于授权 API 请求的集群 API 密钥，`${CLUSTER_ID}` 是您的集群的 ID。在调用 API 时，请确保将这些占位符替换为您的实际值。您可以从集群的公共访问端点获取 `CLOUD_REGION_ID` 和 `CLUSTER_ID`。例如，在公共访问端点 **https://in03-3bf3c31f4248e22.api.ali-cn-hangzhou.cloud.zilliz.com.cn** 中，`CLOUD_REGION_ID` 是 **ali-cn-hangzhou**，`CLUSTER_ID` 是 **in03-3bf3c31f4248e22**。有关更多信息，请参见[Zilliz Cloud 控制台](./on-zilliz-cloud-console)。

提交请求后，将返回任务 ID。您可以通过任务 ID 查询数据导入进度。示例代码如下：

```bash
curl --request GET \
     --url "<https://controller.api.$>{CLOUD_REGION_ID}.cloud.zilliz.com.cn/v1/vector/collections/import/get?jobId=${JOBID}&clusterId=${CLUSTERID}" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "accept: application/json" \
     --header "content-type: application/json" \
```

有关更多信息，请参见[导入](/reference/restful/import)和[查看导入进度](/reference/restful/get-import-progress)。

## 结果验证{#verify-the-result}

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

