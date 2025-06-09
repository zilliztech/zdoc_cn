---
title: "从 NumPy 文件中导入 | Cloud"
slug: /data-import-numpy
sidebar_label: "从 NumPy 文件中导入"
beta: FALSE
notebook: FALSE
description: "作为 Numpy 标准二进制文件格式，`.npy` 格式用于存放单个数组及其形状和数据类型信息，以便在不同机器上正确重构。 | Cloud"
type: origin
token: QyBEwkTplilK9LksUSjcP2k1nNf
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 数据导入
  - numpy
  - numpy files
  - import from numpy
  - 从 numpy 文件导入

---

import Admonition from '@theme/Admonition';


# 从 NumPy 文件中导入

作为 [Numpy 标准二进制文件格式](https://numpy.org/devdocs/reference/generated/numpy.lib.format.html)，`.npy` 格式用于存放单个数组及其形状和数据类型信息，以便在不同机器上正确重构。

建议您[使用 BulkWriter](./use-bulkwriter) 工具将您的原始数据转换为 `.npy` 文件。下图演示了您的原始数据如何映射到 `.npy` 文件中。

![numpy_file_structure_zh](/img/numpy_file_structure_zh.png)

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><strong>是否启用 AutoID</strong></li>
</ul>
<p>Collection 中的 id 字段作为主键区分 Entity。如果需要 Zilliz Cloud 为插入的数据自动生成主键，可以启用 AutoID。在这种情况下，批量导入数据时需要排队主键列。</p>
<ul>
<li><strong>是否启用 Dynamic Field</strong></li>
</ul>
<p>当目标 Collection 启用了 Dynamic Field 并且您希望导入 Schema 中未定义的字段时，您可以在导入数据中纳入一个名为 <strong>&#36;meta</strong> 的字段，并将所有未在 Schema 中定义的字段以键值对的方式存放到 <strong>&#36;meta</strong> 字段中。</p>
<ul>
<li><strong>大小写</strong></li>
</ul>
<p>字典键名和 Collection 的字段名是大小写敏感的。您需要确保待导入字典的键名和目标 Collection 的字段名是完全对应的。比如，目标 Collection 中有个字段名为 <strong>id</strong>，那么待导入字典的键名也应该为 <strong>id</strong>。使用 <strong>ID</strong> 或 <strong>Id</strong> 会导致报错。</p>

</Admonition>

## 目录结构{#directory-structure}

如果您希望将您的原始数据转换为 NumPy 文件，请将相同数据子集的所有 NumPy 文件放到同一个子文件夹中，然后将这些子文件夹放入源文件夹中，如下方所示。

```bash
├── numpy-folders
│       ├── 1
│       │   ├── id.npy
│       │   ├── vector.npy
│       │   ├── scalar_1.npy
│       │   ├── scalar_2.npy
│       │   └── $meta.npy 
│       └── 2
│           ├── id.npy
│           ├── vector.npy
│           ├── scalar_1.npy
│           ├── scalar_2.npy
│           └── $meta.npy  
```

## 导入数据{#import-data}

在准备好待导入数据后，您可以使用如下任意一种方式将它们导入到您在 Zilliz Cloud 上创建的 Collection 中。

- [从多个 NumPy 子文件夹导入（推荐）](./data-import-numpy#import-files-from-a-list-of-numpy-file-folders-recommended)

- [从源文件夹导入](./data-import-numpy#import-files-from-a-numpy-file-folder)

<Admonition type="info" icon="📘" title="说明">

<p>如果您的文件体积较小，建议您使用多路径或源文件夹的方式将所有文件一次性导入。Zilliz Cloud 针对这两种方式做了内部优化，可以降低后续资源消耗。</p>

</Admonition>

您也可以使用 Zilliz Cloud 控制台或使用 Milvus SDK。具体操作，可以参考 [通过 Web 控制台导入](./import-data-on-web-ui)以及[通过 SDK 导入](./import-data-via-sdks)。

### 从多个 NumPy 子文件夹导入（推荐）{#import-files-from-a-list-of-numpy-file-folders-recommended}

当您有多个 NumPy 子文件夹时，需要将每个 NumPy 文件夹路径放入一个子列表中，然后将所有子列表放入一个上层列表中，如下方代码所示。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com.cn/v2/vectordb/jobs/import/create" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     -d '{
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
        "collectionName": "medium_articles",
        "partitionName": "",
        "objectUrls": [
            ["s3://bucket-name/numpy-folder-1/1/"],
            ["s3://bucket-name/numpy-folder-2/1/"],
            ["s3://bucket-name/numpy-folder-3/1/"]
         ],
        "accessKey": "",
        "secretKey": ""
    }'
```

### 从源文件夹导入{#import-files-from-a-numpy-file-folder}

If the source folder contains only the NumPy file folder to import, you can simply include the source folder in the request as follows:

如果源文件夹中只包含待导入数据对应的 NumPy 子文件夹，您可以将这个源文件夹的路径放在一个子列表中，然后将这个子列表放在一个外层列表中，如下方代码所示。

```bash
curl --request POST \
     --url "https://api.cloud.zilliz.com/v2/vectordb/jobs/import/create" \
     --header "Authorization: Bearer ${TOKEN}" \
     --header "Accept: application/json" \
     --header "Content-Type: application/json" \
     -d '{
        "clusterId": "inxx-xxxxxxxxxxxxxxx",
        "collectionName": "medium_articles",
        "partitionName": "",
        "objectUrls": [
            ["s3://bucket-name/numpy-folder/1/"]
         ],
        "accessKey": "",
        "secretKey": ""
    }'
```

## 存储路径{#storage-paths}

Zilliz Cloud 支持从您的云存储中导入数据。下表罗列了 Zilliz Cloud 支持的数据文件路径格式。

<table>
   <tr>
     <th><p>云服务提供商</p></th>
     <th><p>相关示例</p></th>
   </tr>
   <tr>
     <td><p>阿里云 OSS</p></td>
     <td><p><code>https://bucket-name.oss-cn-hangzhou.aliyuncs.com/numpy-folder/</code></p></td>
   </tr>
   <tr>
     <td><p>腾讯云 COS</p></td>
     <td><p><code>https://&lt;BucketName-APPID&gt;.cos.ap-beijing.myqcloud.com/numpy-folder/</code></p></td>
   </tr>
   <tr>
     <td><p>亚马逊云科技 S3</p></td>
     <td><p><code>s3://bucket-name/numpy-folder/</code></p></td>
   </tr>
</table>

## 相关限制{#limits}

Zilliz Cloud 针对导入 Parquet 格式的文件时设置了如下限制。

一个合法的 NumPy 文件夹集合中的每个文件的文件名应该与目标 Collection 的 Schema 中定义的字段名称相同，其中的数据格式应该符合各字段的定义。

<table>
   <tr>
     <th><p>项目</p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p><strong>支持多文件导入</strong></p></td>
     <td><p>是</p></td>
   </tr>
   <tr>
     <td><p><strong>从顶层文件夹导入</strong></p></td>
     <td><p>是</p></td>
   </tr>
   <tr>
     <td><p><strong>一级子目录最大数量</strong></p></td>
     <td><p>100</p></td>
   </tr>
   <tr>
     <td><p><strong>每次导入的文件体积限制</strong></p></td>
     <td><p>Free 集群：最大 512 MB</p><p>Serverless 或 Dedicated 集群</p><ul><li><p>单个文件大小：最大 10 GB</p></li><li><p>总文件大小：最大 100 GB</p></li></ul></td>
   </tr>
   <tr>
     <td><p><strong>文件存放位置</strong></p></td>
     <td><p>仅远程</p></td>
   </tr>
</table>

建议您[使用 BulkWriter](./use-bulkwriter) 工具将您的原始数据转换成 Parquet 文件。我们按照本文示意图中的 Schema 准备了一个示例数据供您参考。[单击此处](https://assets.zilliz.com/prepared_numpy_data.zip)下载该示例文件。