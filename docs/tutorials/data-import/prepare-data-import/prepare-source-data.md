---
slug: /prepare-source-data
beta: FALSE
notebook: FALSE
token: GLk6wr8jviPyzHk7DjRc56YsnNf
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 准备导入数据

本节将介绍在 Zilliz Cloud 上进行批量数据导入前需要完成的准备工作以及待导入数据需要满足的相关要求。

## 源数据与目标 Collection{#map-source-data-to-collection}

批量导入的目标 Collection 要求待导入源数据的结构和 Collection 的 Schema 对齐。下图演示了源数据各字段和目标 Collection 的 Schema 的各列的映射关系。

![data_import-preparetion_zh](/img/data_import-preparetion_zh.png)

您需要仔细分析您的数据，并根据分析结果设计目标 Collection 的 Schema。

以上图中的 JSON 数据为例，源数据中包含两条记录，每条数据包含 6 个字段。而目标 Collection 的 Schema 中选择性地包含了其中的四个字段，分别是 **id**、**vector**、**scalar_1 **和 **scalar_2**。

在设计 Schema 时，还有两个问题需要注意：

- **是否启用 AutoID**

    字段 **id** 为 Collection 的主键。如果需要主键随数据插入自动增长，可以选择启用 AutoID。在这种情况下，源数据中不需要包含 **id **字段。

- **是否启用动态字段**

    在启用了动态字段后，目标 Collection 也可以存储 Schema 中未定义的字段。Zilliz Cloud 预留了一个名为 **$meta** 的 JSON 字段用来以键值对的方式存放这些未定义字段。在上图中，**dynamic_field_1** 和 **dynamic_field_2** 字段及这些字段对应的值将会以键值对的方式存放在 **$meta** 字段中。

我们可以按上图所示的数据，创建目标 Collection 的 Schema。

```python
from pymilvus import MilvusClient, DataType

# You need to work out a collection schema out of your dataset.
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="scalar_1", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="scalar_2", datatype=DataType.INT64)
```

## 源数据格式相关要求{#source-data-requirements}

Zilliz Cloud 支持导入 JSON、Parquet 和 NumPy 数据。如果您的数据是这些格式但是无法导入到您的目标 Collection 中，请检查您的数据是否满足相关要求。如果您的数据并不是这些格式，请使用 BulkWriter 将您的原始数据转换成 Zilliz Cloud 可识别的格式。

### JSON{#json-file}

一个合法的 JSON 文件有一个名为 **rows** 的根字段，其对应的值为一个字典列表。该列表中，每个字典均对应一个匹配目标 Collection Schema 的 Entity 记录。

|  **项目**                   |  **描述**                                       |
| ------------------------- | --------------------------------------------- |
|  **多文件导入（单批次）**           |  支持                                           |
|  **最大文件大小（单批次）**<br/>  |  - 总大小： 100 GB<br/> - 单文件大小： 10 GB<br/> |
|  **数据文件存放位置**             |  本地或远程                                        |

![json_data_structure_zh](/img/json_data_structure_zh.png)

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>如果目标 Collection 在 Schema 中启用了 <strong>AutoID</strong>，待导入数据中不应包含主键。</p></li>
<li><p>如果目标 Collection 在 Schema 中启用了动态字段，待导入数据中可以包含 Schema 中未定义的字段。</p></li>
<li><p>字典中的键与值均大小写敏感。请确保数据字典中各字段名称和 Schema 中各字段名称大小写完全一致。如果目标 Collection 有一个名为 <strong>id</strong> 的字段，每条待导入数据记录中也应该包含一个 <strong>id</strong> 的字段。使用 <strong>ID</strong> 或 <strong>Id</strong> 可能会导致错误。</p></li>
</ul>

</Admonition>

您可以参考上述描述手动重构您的数据或者[使用 BulkWriter](./use-bulkwriter)来重写您的文件。您也可以[单击此处](https://assets.zilliz.com/prepared_json_data.json)下载样例数据进行参考。

### Parquet{#parquet-file}

|  **项目**                   |  **描述**                                       |
| ------------------------- | --------------------------------------------- |
|  **多文件导入（单批次）**           |  支持                                           |
|  **最大文件大小（单批次）**<br/>  |  - 总大小： 100 GB<br/> - 单文件大小： 10 GB<br/> |
|  **数据文件存放位置**             |  仅远程                                          |

建议您使用 BulkWriter 来将您的原始数据转换成 Parquet 文件。您也可以[单击此处](https://assets.zilliz.com/prepared_parquet_data.parquet)下载样例数据进行参考。

<Admonition type="info" icon="📘" title="说明">

<p>如需批量导入 Parquet 文件，您的 Zilliz Cloud 集群版本须与 Milvus 2.3.x 兼容。</p>

</Admonition>

### NumPy{#numpy-files}

一组合法的 NumPy 文件应该和目标 Collection 的 Schema 中定义的列同名，文件中存放的数据应符合列定义。

|  **项目**                   |  **描述**                                               |
| ------------------------- | ----------------------------------------------------- |
|  **多文件导入（单批次）**           |  支持                                                   |
|  **读取子目录下的文件（仅一层）**       |  支持                                                   |
|  **子目录下最大文件数量（仅一层）**      |  100                                                  |
|  **最大文件大小（单批次）**<br/>  |  - 总大小： 100 GB<br/> - 每个一层子目录下的文件大小： 10 GB<br/> |
|  **数据文件存放位置**             |  仅远程                                                  |

![numpy_file_structure_zh](/img/numpy_file_structure_zh.png)

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>如果目标 Collection 在 Schema 中启用了 <strong>AutoID</strong>，待导入数据中不应包含主键对应的 Numpy 文件。</p></li>
<li><p>如果目标 Collection 在 Schema 中启用了动态字段，待导入数据中可以包含 Schema 中未定义的字段。这些字段应以键值对的方式存入一个名为 <strong>$meta.npy</strong> 的文件中。</p></li>
<li><p>文件名大小写敏感。请确保文件名和 Schema 中各字段名称大小写完全一致。如果目标 Collection 有一个名为 <strong>id</strong> 的字段，则在待导入数据中应该包含一个名为 <strong>id.npy</strong> 的文件。使用 <strong>ID.npy</strong> 或 <strong>Id.npy</strong> 可能会导致错误。</p></li>
</ul>

</Admonition>

您可以[参考此处](https://milvus.io/docs/bulk_insert.md#Prepare-the-data-file)将您的数据转换成可导入的 NumPy 文件或[使用 BulkWriter](./use-bulkwriter)对您的原始数据进行转换。您也可以[单击此处](https://assets.zilliz.com/prepared_numpy_data.zip)下载样例数据进行参考。

## 源数据路径拼接相关要求{#tips-on-import-paths}

Zilliz Cloud 支持通过 Zilliz Cloud 控制台，RESTful API 以及 SDK 批量导入数据。在执行批量导入任务前，您需要准备好一个合法的源数据路径。

### 从本地导入{#from-local-folders}

Zilliz Cloud 支持在 Zilliz Cloud 控制台中从本地导入满足上述要求的 JSON 文件。如下图所示，您可以拖放准备好的数据文件到 **Import Data** 对话框或单击 **upload a file **并选择该文件，然后单击 **Import** 将文件中的数据导入到目标 Collection 中。

![data-import-on-console_zh](/img/data-import-on-console_zh.png)

### 从远程对象存储桶导入{#from-remote-buckets}

Zilliz Cloud 还支持通过 Zilliz Cloud 控制台或使用 RESTful API / SDK 从阿里云  OSS  桶中导入准备好的数据。

<Admonition type="info" icon="📘" title="说明">

<p>远程对象存储桶须与数据导入目标集群处于同一云服务提供商网络。例如，如果目标集群托管在阿里云上，则源数据须存放在阿里云 OSS 桶中。</p>

</Admonition>

![data-import-on-console-remote_zh](/img/data-import-on-console-remote_zh.png)

- 对象访问 URI

    |  **地域**               |  **URI**                                            |  **地域 ID**         |
    | --------------------- | --------------------------------------------------- | ------------------ |
    |  **华东1（杭州）**<br/>  |  `https://bucket-name.oss-cn-hangzhou.aliyuncs.com` |  `oss-cn-hangzhou` |
    |  **华北2（北京）**          |  `https://bucket-name.oss-cn-beijing.aliyuncs.com`  |  `oss-cn-beijing`  |
    |  **华南1（深圳）**          |  `https://bucket-name.oss-cn-shenzhen.aliyuncs.com` |  `oss-cn-shenzhen` |

- 示例

    |  **文件类型**    |  **路径示例**                                                                                                                                                 |
    | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |  **JSON**    |  `https://bucket-name.oss-cn-hangzhou.aliyuncs.com/json-folder`<br/> `https://bucket-name.oss-cn-hangzhou.aliyuncs.com/json-folder/data.json`          |
    |  **NumPy**   |  `https://bucket-name.oss-cn-hangzhou.aliyuncs.com/numpy-folder`<br/> `https://bucket-name.oss-cn-hangzhou.aliyuncs.com/numpy-folder/*.npy`            |
    |  **Parquet** |  `https://bucket-name.oss-cn-hangzhou.aliyuncs.com/parquet-folder`<br/> `https://bucket-name.oss-cn-hangzhou.aliyuncs.com/parquet-folder/data.parquet` |

