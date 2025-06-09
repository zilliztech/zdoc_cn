---
title: "通过 Web 控制台导入 | Cloud"
slug: /import-data-on-web-ui
sidebar_label: "控制台"
beta: FALSE
notebook: FALSE
description: "本文介绍如何通过 Zilliz Cloud Web 控制台将数据导入现有 Collection 中。 | Cloud"
type: origin
token: BXBvwZh9Yiis0Vk8LcdcjZSPnQd
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 导入
  - 控制台

---

import Admonition from '@theme/Admonition';


# 通过 Web 控制台导入

本文介绍如何通过 Zilliz Cloud Web 控制台将数据导入现有 Collection 中。

## 开始前{#before-you-start}

请确保已完成以下步骤：

- 已创建集群。详情请参见[创建集群](./create-cluster-on-demand)。

- 已按照格式准备需要导入的数据。更多详情，请参阅[支持的对象存储](./data-import-storage-options)和[支持的数据格式](./data-import-format-options)。

- 已创建 Collection，且该 Collection 的 Schema 与示例数据集相匹配。详情请参见[创建 Collection](./manage-collections-sdks)。

## 准备数据文件{#prepare-data-files}

Zilliz Cloud 支持从单个本地文件或一个或多个远程文件导入数据。导入的数据类型可以是 JSON 和 NumPy。如果您的数据不是这两种格式，您可以使用 BulkWriter 转换数据格式。详情请参见[支持的数据格式](./data-import-format-options)和[使用 BulkWriter](./use-bulkwriter)。

### 准备单个本地 JSON 文件{#local-json-file}

本地导入仅支持 JSON 格式的数据文件，并且每次导入只支持上传单个文件。文件大小不能超过 1 GB。

在实际应用场景中，您可能需要一次导入多个或更大的数据文件。在这种情况下，我们建议准备远程文件。

### 准备远程文件{#remote-files}

Zilliz Cloud 支持远程导入 JSON 和 NumPy 数据文件。在准备远程文件时，请注意以下事项：

- 当数据类型为 JSON 时，每次导入仅支持一个 JSON 文件。这意味着您无法一次上传多个远程 JSON 文件。

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

## 导入数据{#import-data-on-the-web-ui}

数据文件准备好后，您可以直接从本地导入，也可以先将文件上传到对象存储桶（如阿里云 OSS），然后进行远程导入。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>在同一个 Collection 下，导入任务队列中最多可以同时包含 10 条运行中或等待中的任务。</p></li>
<li><p>Zilliz Cloud 界面支持上传本地 JSON 文件的最大大小为 1 GB。 如需上传更大的文件，我们推荐通过对象存储桶进行导入。有关情况，可以查看<a href="./data-import-storage-options">支持的对象存储</a>。如果您在导入数据过程中遇到任何问题，请<a href="https://support.zilliz.com.cn/hc/zh-cn">提交工单</a>。</p></li>
</ul>

</Admonition>

### 导入本地 JSON 文件{#local-json-file}

要导入数据，您可以将本地文件拖放到上传区域中，或单击**上传文件**并选择文件。

![zh_import_data_from_local_files](/img/zh_import_data_from_local_files.png)

### 从对象存储桶中导入远程文件{#remote-files-from-an-object-storage-bucket}

要导入远程文件，您必须先将它们上传到对象存储桶中。您可以将单个 JSON 文件或一组 NumPy 文件上传到桶中。上传后，填写文件路径和桶凭据，以便 Zilliz Cloud 从您的桶中提取数据。

要批量导入 NumPy 文件，请提供包含所有 NumPy 文件的文件夹的路径，例如，**/mydata/np/**。

有关如何获取文件 URL 和访问密钥，请参见：

- 阿里云：[获取单个或多个文件的 URL](https://help.aliyun.com/zh/oss/user-guide/how-to-obtain-the-url-of-a-single-object-or-the-urls-of-multiple-objects?spm=a2c4g.11186623.0.i18) 和[创建 Access Key](https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair)。

- 腾讯云：[导出对象 URL](https://www.tencentcloud.com/zh/document/product/436/42391) 和[临时密钥生成及使用指引](https://cloud.tencent.com/document/product/598/40488)。

- 亚马逊云科技：[使用预签名 URL 共享对象](https://docs.amazonaws.cn/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html)和[使用长期凭证进行身份验证](https://docs.amazonaws.cn/sdkref/latest/guide/access-iam-users.html)。

根据您的数据安全需求，您也可以使用 [Session Token](/docs/faq-data-import#can-i-use-session-tokens-when-importing-data-from-an-object-storage-service)。

![zh_import_data_from_object_storage](/img/zh_import_data_from_object_storage.png)

## 结果验证{#verify-the-result}

单击**导入**后，Zilliz Cloud 会生成一条导入任务。您可以前往[任务中心](./view-activities)查看导入进度及任务详情。

## 支持的导入路径{#supported-object-paths}

关于导入路径需遵循的格式要求，可查看[支持的对象存储](./data-import-storage-options)。

## 推荐阅读{#related-topics}

- [支持的对象存储](./data-import-storage-options)

- [支持的数据格式](./data-import-format-options)

- [使用 BulkWriter](./use-bulkwriter)

- [通过 RESTful API 导入](./import-data-via-restful-api)

- [通过 SDK 导入](./import-data-via-sdks)

