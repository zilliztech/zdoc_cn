---
title: "addCollectionFields() | Node.js"
slug: /node/node/Collections-addCollectionFields
sidebar_label: "addCollectionFields()"
beta: false
added_since: v2.6.x
last_modified: false
deprecate_since: false
notebook: false
description: "此操作可向现有 collection 添加一组新的 scalar 字段，而无需重新创建 collection。由于内部 schema 同步，这些字段几乎可以立即可用，延迟极小。 | Node.js"
type: docx
token: FmG6dw3O1ouzgbxnl4jc5T7cnXf
sidebar_position: 20
keywords: 
  - 视频相似性搜索
  - Vector 检索
  - 音频相似性搜索
  - 弹性 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - addCollectionFields()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# addCollectionFields()

此操作可向现有 collection 添加一组新的 scalar 字段，而无需重新创建 collection。由于内部 schema 同步，这些字段几乎可以立即可用，延迟极小。

```javascript
await milvusClient.addCollectionFields(data: AddCollectionFieldReq)
```

<Admonition type="info" icon="📘" title="说明">

如果 collection 启用了 dynamic field，并且你添加了一个与现有 dynamic field key 同名的静态字段，则该静态字段会遮蔽该 dynamic field key。原始 dynamic 值仍可通过 `$meta['field_name']` 语法访问。

</Admonition>

## 请求语法\{#request-syntax}

```javascript
await milvusClient.addCollectionFields({
    collection_name: string,
    db_name?: string,
    field: FieldType,
    timeout?: number
})
```

**参数：**

- **collection_name** (*string*) -

    目标 collection 的名称。

- **db_name** (*string*) -

    目标数据库的名称。

- **fields** (*FieldType[]*) -

    要添加的字段配置，每个配置都是一个 **FieldType** 对象，包含以下字段：

    - **name** (*string)* -

        字段名称。

    - **data_type** (*string)* -

        字段的数据类型。有关所有可用数据类型的枚举，请参阅 [DataType](./Collections-DataType)。

    - **description** (*string)* -

        字段描述。

    - **is_clustering_key** (*boolean*) -

        一个布尔值，表示此字段是否将作为 clustering key。

    - **is_partition_key** (*boolean)* -

        一个布尔值，表示此字段是否将作为 partition key 字段。

    - **is_primary_key** (*boolean)* -

        该字段是否将作为 primary key。

        该值默认为 **False**。将其设置为 **True** 会使该字段成为 primary key 字段，在整个 collection 中唯一。

    - **type_params** (*string* | *number)* -

        该字段的其他参数。

        - **auto_id** (*boolean)* -

            在向此 collection 插入数据时，主字段是否自动递增。

            该值默认为 **False**。将其设置为 **True** 会使主字段自动递增。如果需要设置自定义 schema 的 collection，请跳过此参数。

        - **dim** (*string* | *number*) -

            用于保存 vector embeddings 的 collection 字段的维度。 

            该值应为大于 1 的整数，通常由你用于生成 vector embeddings 的模型决定。

        - **element_type** (string) -

            数组中元素的数据类型。 

            如果当前字段是数组字段，则此参数适用。

        - **max_capacity** (*string* | *number)* -

            数组中的元素数量。

            如果当前字段是数组字段，则此参数适用。

        - **max_length** (*string*) -

            此字段中字符串的最大长度。

            当此字段的 **data_type** 为 **VarChar** 时，此项为必需。

        - **type_params** (*object*) -

            当前字段的额外参数，以键值对形式提供。

    - **nullable** (*boolean*) -

        一个布尔参数，用于指定该字段是否可以接受 null 值。有效值：

        - **true**：该字段可以包含 null 值，表示该字段是可选的，条目允许缺失数据。

        - **false**（默认）：该字段必须为每个实体包含有效值；不允许缺失数据，因此该字段为必填。

        更多信息请参阅 [Nullable & Default](https://milvus.io/docs/nullable-and-default.md)。

    - **default_value** (*object*)

        在创建 collection schema 时，为其中的特定字段设置默认值。当你希望某些字段即使在数据插入期间未显式提供值也具有初始值时，这尤其有用。

    - **enable_analyzer** (*boolean*) -

        是否为指定的 `VarChar` 字段启用文本分析。设置为 `true` 时，会指示 Milvus 使用文本分析器，对该字段的文本内容进行分词和过滤。

    - **enable_match** (*boolean*)

        是否为指定的 `VarChar` 字段启用关键字匹配。设置为 `true` 时，Milvus 会为该字段创建倒排 index，从而实现快速高效的关键字查找。`enable_match` 与 `enable_analyzer` 配合使用，以提供结构化的基于词项的文本搜索，其中 `enable_analyzer` 负责分词，`enable_match` 负责对这些 token 执行搜索操作。

    - **analyzer_params** (*object*)

        配置用于文本处理的分析器，专门用于 `VarChar` 字段。此参数配置 tokenizer 和 filter 设置，尤其适用于 [关键字匹配](https://milvus.io/docs/keyword-match.md)或[全文搜索](https://milvus.io/docs/full-text-search.md)中使用的文本字段。根据分析器类型，可以通过以下任一方法进行配置：

        - 内置分析器

            ```javascript
            const analyzer_params: { type: 'english' };
            ```

            - `type` (*string*) -

                Milvus 内置的预配置分析器类型，可通过指定其名称开箱即用。可能的值：`standard`、`english`、`chinese`。更多信息请参阅 [Standard Analyzer](https://milvus.io/docs/standard-analyzer.md)、[English Analyzer](https://milvus.io/docs/english-analyzer.md) 和 [Chinese Analyzer](https://milvus.io/docs/chinese-analyzer.md)。

        - 自定义分析器

            ```javascript
            const analyzer_params: {
                "tokenizer": "standard",
                "filter": ["lowercase"],
            };
            ```

            - `tokenizer` (*string*) -

                定义 tokenizer 类型。可能的值：`standard`（默认）、`whitespace`、`jieba`。更多信息请参阅 [Standard Tokenizer](https://milvus.io/docs/standard-tokenizer.md)、[Whitespace Tokenizer](https://milvus.io/docs/whitespace-tokenizer.md) 和 [Jieba Tokenizer](https://milvus.io/docs/jieba-tokenizer.md)。

            - `filter` (*list*) -

                列出用于细化 tokenizer 生成的 token 的 filter，选项包括内置 filter 和自定义 filter。更多信息请参阅 [Alphanumonly Filter](https://milvus.io/docs/alphanumonly-filer.md) 等。

- **timeout** (*number*) -  

    此操作的超时时长。将其设置为 **None** 表示此操作会在收到任何响应或发生任何错误时超时。

**返回** *Promise\<ResStatus>*

此方法返回一个 promise，该 promise 解析为 **ResStatus** 对象。

```javascript
{
    code: number,
    error_code: string | number,
    reason: string
}
```

**参数：**

- **code** (*number*) -

    表示操作结果的代码。如果此操作成功，则保持为 **0**。

- **error_code** (*string* | *number*) -

    表示发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因说明。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```javascript
const milvusClient = new MilvusClient(MILVUS_ADDRESS);
const resStatus = await milvusClient.addCollectionFields({
  collection_name: 'my_collection',
  fields: [
    {
      name: 'new_field_1',
      data_type: 'Int64',
      is_primary_key: false,
      description: 'First new field'
    },
    {
      name: 'new_field_2',
      data_type: 'FloatVector',
      dim: 128,
      description: 'Second new field'
    }
  ]
});
```
