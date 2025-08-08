---
title: "合并数据 | Cloud"
slug: /merge-data
sidebar_label: "合并数据"
beta: PRIVATE
notebook: FALSE
description: "您可以将现有Zilliz Cloud Collection 中的数据与本地文件或外部对象存储中的数据合并，来创建一个结合了两个数据源数据的 Collection。这被称为数据合并操作，您可以将其作为一种变通方法，向现有集合中添加带有数据的字段。 | Cloud"
type: origin
token: HnDnw6syeiXSy1kqSHVcq49Infh
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - ETL
  - 提取
  - 转换
  - 载入
  - 数据合并

---

import Admonition from '@theme/Admonition';


# 合并数据

您可以将现有Zilliz Cloud Collection 中的数据与本地文件或外部对象存储中的数据合并，来创建一个结合了两个数据源数据的 Collection。这被称为数据合并操作，您可以将其作为一种变通方法，向现有集合中添加带有数据的字段。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li>本特性目前属于<strong>内测特性</strong>。如果您对该特性感兴趣，想尝试使用。请联系 <a href="https://support.zilliz.com.cn/hc/zh-cn">Zilliz Cloud 技术支持</a>。</li>
</ul>

</Admonition>

## 概述{#overview}

您可以使用 Zilliz Cloud Stage 作为一个中间存放点来存放您上传的本地文件，并将文件中的数据与现有的某个 Collection 进行合并，从而创建一个包括了上述两种数据来源的新的 Collection。

上传到 Stage 里的数据文件必须为 Parquet 格式，其中含有需要添加的列式数据。如下图所示，Parquet 文件中应该包含一个名为 `date` 的字段及各行在该字段的取值，每行为一个长度为 10 的字符串。

![A5KYwhUcYhra6DbQMvbcZVdhnJG](/img/A5KYwhUcYhra6DbQMvbcZVdhnJG.png)

您可以将准备好的 Parquet 文件上传到一个外部对象存储桶中，并在执行数据合并操作时提供可供 Zilliz Cloud 访问该桶的鉴权凭据。这样一来，Zilliz Cloud 就会读取桶中存放的 Parquet 文件，并执行数据合并操作。

## 使用 Stage{#use-stage}

如需执行数据合并操作，您需要先创建一个 Stage，并将您的数据文件上传到 Stage 中。当准备就绪，您就可以通过执行数据合并操作来创建一个包括两种数据来源的新的 Collection。

如何代码片段演示了如何通过 Stage 执行数据合并。关于如何创建 Stage 及向 Stage 中上传数据，请参考[管理 Stage](./manage-stages)。

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"

curl --request POST \
--url "${BASE_URL}/v2/etl/merge" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "clusterId": "in00-xxxxxxxxxxxxxxx",
    "dbName": "my_database",
    "collectionName": "my_collection",
    "destDbName": "my_database",
    "destCollectionName": "my_merged_collection",
    "dataSource": {
        "type": "stage",
        "stageName": "my_stage",
        "dataPath": "/path/to/your/parquet.parquet"
    },
    "mergeField": "id",
    "newFields": [
        {
            "name": "date",
            "dataType": "VARCHAR",
            "params": {
                "maxLength": 10
            }
        }
    ]
}'
```

上述命令创建了一个数据合并任务，并返回任务 ID。

```json
{
    "code": 0,
    "data": {
        "jobId": "job-xxxxxxxxxxxxxxxxxxxxx"
    }
}
```

## 使用对象存储{#use-object-storage}

如需执行数据合并操作，您需要先创建一个对象存储桶并将数据文件上传到该桶中。当准备就绪，您就可以通过执行数据合并操作来创建一个包括两种数据来源的新的 Collection。

如下代码片断演示了如何使用一个对象存储桶来执行数据合并操作。您可以参考您的对象存储服务提供商的文档来学习如何创建对象存储桶及向桶中上传数据。

```bash
export BASE_URL="https://api.cloud.zilliz.com.cn"
export TOKEN="YOUR_API_KEY"

curl --request POST \
--url "${BASE_URL}/v2/etl/merge" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "clusterId": "in00-xxxxxxxxxxxxxxx",
    "dbName": "my_database",
    "collectionName": "my_collection",
    "destDbName": "my_database",
    "destCollectionName": "my_merged_collection",
    "dataSource": {
        "type": "oss",
        "dataPath": "https://oss-cn-hangzhou.aliyuncs.com/my-bucket/my_data.parquet"
    },
    "mergeField": "id",
    "newFields": [
        {
            "name": "date",
            "dataType": "VARCHAR",
            "params": {
                "maxLength": 10
            }
        }
    ]
}'
```

上述命令创建了一个数据合并任务，并返回任务 ID。

```json
{
    "code": 0,
    "data": {
        "jobId": "job-xxxxxxxxxxxxxxxxxxxxx"
    }
}
```

## 验证结果{#verify-the-results}

当您获取了数据合并任务的 ID 后，您可以使用[查看任务详情](/reference/restful/describe-job-v2) API 接口或按照[管理项目任务](./job-center)中的步骤查看任务的状态。

## 故障排除{#troubleshooting}

1. **当 Parquet 文件中的存在 Merge Key 与源 Collection 不匹配的记录时，如何处理？**

    与传统关系型数据库系统的左合并（Left Join）操作类似，数据合并操作会根据指定的 Merge Key 从源 Collection 及指定的 Parquet 文件中获取相应的数据，并使用这些数据创建一个包含合并数据的 Collection。

    只有 Parquet 文件中 Merge Key 与源 Collection 中的 Merge Key 匹配的行才会被合并。如果行的 Merge Key 与源 Collection 中的任何 Entity 都不匹配，则会跳过这些行。如果 Parquet 文件中的所有行都不匹配源 Collection 中的任何 Entity，那么 Zilliz Cloud 会创建 `newFields` 中指定的字段，并使用默认值填充。

