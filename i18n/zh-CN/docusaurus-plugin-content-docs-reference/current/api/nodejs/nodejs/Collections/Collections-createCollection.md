---
title: "createCollection() | Node.js"
slug: /node/node/Collections-createCollection
sidebar_label: "createCollection()"
beta: false
added_since: v2.3.x
last_modified: v3.0.x
deprecate_since: false
notebook: false
description: "此操作使用默认或自定义设置创建 collection。 | Node.js"
type: docx
token: KPZZd2TiAodSeWxUdlJciHGcnbg
sidebar_position: 5
keywords: 
  - 视频相似性搜索
  - Vector 检索
  - 音频相似性搜索
  - 弹性 vector 数据库
  - zilliz
  - zilliz cloud
  - cloud
  - createCollection()
  - nodejs30
displayed_sidebar: nodeSidebar

displayed_sidbar: nodeSidebar
---

import Admonition from '@theme/Admonition';


# createCollection()

此操作使用默认或自定义设置创建 collection。 

```javascript
await milvusClient.createCollection(data)
```

## 请求语法\{#request-syntax}

此方法有以下替代用法。

### 使用 CreateColReq\{#with-createcolreq}

使用此请求体，你可以仅通过设置 collection 名称和 vector 字段维度来创建 collection。

```javascript
await milvusClient.createCollection({
    db_name?: string
    collection_name: string;
    dimension: number;
    auto_id?: boolean;
    consistency_level?: "Strong" | "Session" | "Bounded" | "Eventually" | "Customized";
    description?: string;
    enable_dynamic_field?: boolean;
    id_type?: Int64 | VarChar;
    index_params?: CreateIndexParam;
    metric_type?: string;
    primary_field_name?: string;
    vector_field_name?: string;
    timeout?: number;
    external_source?: string;
    external_spec?: string;
    do_physical_backfill?: boolean;
    file_source_ids?: Array<number | string>;
 })
```

**参数：**

- **db_name** (*string*) -

    目标 collection 所属数据库的名称。

- **collection_name** (*string*) -

    **[必需]**

    要创建的 collection 的名称。

- **dimension** (*number*) -

    Vector embeddings 的维度。该值应为大于 1 的整数。如果需要自定义 collection schema，请跳过此参数。

- **auto_id** (*boolean*) - 

    向此 collection 插入数据时，主字段是否自动递增。

    该值默认为 **False**。将其设置为 **True** 会使主字段自动递增。在这种情况下，待插入的数据中不应包含主字段，以避免错误。自动生成的 ID 具有固定长度且无法更改。

    此参数用于快速设置 collection；如果 **schema** 不是 **None**，则会被忽略。

- **consistency_level** (*number* | *string*)

    目标 collection 的一致性级别。

    该值默认为 **Bounded**，可选值包括 **Strong**、**Bounded**、**Session**、**Eventually** 和 **Customized**。

    <Admonition type="info" icon="📘" title="Note">

    什么是一致性级别？
    
        分布式数据库中的一致性专指这样一种属性：在给定时间写入或读取数据时，确保每个节点或副本对数据都有相同的视图。
    
        Zilliz Cloud 提供三种一致性级别：**Strong**、**Bounded Staleness** 和 **Eventually**，默认设置为 **Bounded Staleness**。
    
        在执行 vector 相似性搜索或查询时，你可以轻松调整一致性级别，使其最适合你的应用。

    </Admonition>

- **description** (*string)* -

    要创建的 collection 的描述。

- **enable_dynamic_field** (*boolean)* -

    是否使用名为 **&#36;meta** 的保留 JSON 字段，以键值对形式存储未定义字段及其值。

    该值默认为 **True**，表示使用 meta 字段。

- **id_type** (*Int64* | *VarChar*) -

    主字段的数据类型。

- **index_params** (*CreatIndexParam*) -

    要创建的 collection 的 index 参数。

- **metric_type** (*string*) -

    Metric 类型决定如何衡量 vector embeddings 之间的相似度。

- **primary_field_name** (*string*) -

    主字段的自定义名称。

- **vector_field_name** (*string*) -

    Vector 字段的自定义名称。

- **timeout** (number) -

    此操作的超时时长。将其设置为 **None** 表示此操作在任何响应返回或发生错误时超时。

- **external_source** (*string*) -

    外部源路径。此参数适用于创建外部 collection。

- **external_spec** (*string*) -

    外部 spec 配置。此参数适用于创建外部 collection。

- **do_physical_backfill** (*boolean*) -

    是否对外部数据进行物理回填。此参数适用于创建外部 collection。

- **file_resource_ids** (*Array&lt;number | string&gt;*) -

    外部文件资源 ID。此参数适用于创建外部 collection。

### 使用 CreateCollectionReq\{#with-createcollectionreq}

使用此请求体，你可以自定义 collection 的 schema 设置。

```javascript
await milvusClient.createCollection({
   db_name?: string,
   collection_name: string,
   consistency_level: number | string,
   description: string,
   enable_dynamic_field: boolean,
   schema: [
     {
       name: string,
       description: "vector field",
       data_type: DataType.FloatVector,
       element_type?: DataType,
       is_primary_key?: boolean,
       is_partition_key?: boolean,
       is_function_output?: boolean,
       type_params: {
         dim: number,
         max_length: number,
         max_capacity: number,
         analyzer_params: Record<String, any>,
         enable_analyzer: boolean,
         enable_match: boolean,
         multi_analyzer_params: Record<String, any>,
         'mmap.enabled': boolean
       },
       autoID?: boolean,
       nullable: boolean,
       default_value: object,
     }
   ],
   functions: [
      {
        name: string,
        description: string,
        type: FunctionType,
        input_field_names: string[],
        output_field_names: string[],
        params: Record<string, any>,
      },
   ],
   num_partitions?: number,
   partition_key_field?: string,
   shards_num?: number,
   properties?: Properties,
   timeout?: number,
   external_source?: string;
   external_spec?: string;
   do_physical_backfill?: boolean;
   file_source_ids?: Array<number | string>;
})
```

**参数：**

- **db_name** (*string*) -

    目标 collection 所属数据库的名称。

- **collection_name** (*string*) -

    **[必需]**

    要创建的 collection 的名称。

- **consistency_level** (*number* | *string*)

    目标 collection 的一致性级别。

    该值默认为 **Bounded**，可选值包括 **Strong**、**Bounded**、**Session**、**Eventually** 和 **Customized**。

    <Admonition type="info" icon="📘" title="Note">

    什么是一致性级别？
    
        分布式数据库中的一致性专指这样一种属性：在给定时间写入或读取数据时，确保每个节点或副本对数据都有相同的视图。
    
        Zilliz Cloud 提供三种一致性级别：**Strong**、**Bounded Staleness** 和 **Eventually**，默认设置为 **Bounded Staleness**。
    
        在执行 vector 相似性搜索或查询时，你可以轻松调整一致性级别，使其最适合你的应用。

    </Admonition>

- **description** (*string)* -

    要创建的 collection 的描述。

- **enable_dynamic_field** (*boolean)* -

    是否使用名为 **&#36;meta** 的保留 JSON 字段，以键值对形式存储未定义字段及其值。

    该值默认为 **True**，表示使用 meta 字段。

- **schema** (*FieldType[]*) -

    - **name** (*string)* -

        字段名称。

    - **data_type** (*string)* -

        字段的数据类型。有关所有可用数据类型的枚举，请参见 [DataType](./Collections-DataType)。

    - **description** (*string)* -

        字段描述。

    - **is_partition_key** (*boolean)* -

        一个布尔值，表示此字段是否作为 partition key 字段。

    - **is_primary_key** (*boolean)* -

        字段是否作为主键。

        该值默认为 **False**。将其设置为 **True** 会使该字段成为主键字段，在整个 collection 中唯一。

    - **is_function_output** (boolean) -

        字段是否作为某个 function 的输出字段。

    - **type_params** (*string* | *number)* -

        字段的其他参数。

        - **dim** (*string* | *number*) -

            保存 vector embeddings 的 collection 字段的维度。 

            该值应为大于 1 的整数，通常由你用于生成 vector embeddings 的模型决定。

        - **element_type** (string) -

            数组中元素的数据类型。 

            如果当前字段是数组字段，则适用此参数。

        - **max_capacity** (*string* | *number)* -

            数组中的元素数量。

            如果当前字段是数组字段，则适用此参数。

        - **max_length** (*string*) -

            此字段中字符串的最大长度。

            当此字段的 **data_type** 为 **VarChar** 时，此参数为必需。

        - **enable_analyzer** (*boolean*) -

            是否为指定的 `VarChar` 字段启用文本分析。设置为 `true` 时，它会指示 Milvus 使用文本分析器，对字段的文本内容进行分词和过滤。

        - **enable_match** (*boolean*)

            是否为指定的 `VarChar` 字段启用关键词匹配。设置为 `true` 时，Milvus 会为该字段创建 inverted index，从而支持快速高效的关键词查找。`enable_match` 与 `enable_analyzer` 配合使用，以提供基于结构化词项的文本搜索，其中 `enable_analyzer` 负责分词，`enable_match` 负责对这些词元执行搜索操作。

        - **analyzer_params** (*object*)

            配置用于文本处理的 analyzer，专用于 `VarChar` 字段。此参数配置 tokenizer 和 filter 设置，尤其适用于 [关键词匹配](https://milvus.io/docs/keyword-match.md) 或 [全文搜索](https://milvus.io/docs/full-text-search.md) 中使用的文本字段。根据 analyzer 类型，可以通过以下任一方法进行配置：

            - 内置 analyzer

                ```javascript
                const analyzer_params: { type: 'english' };
                ```

                - `type` (*string*) -

                    Milvus 内置的预配置 analyzer 类型，可通过指定其名称直接使用。可能的值：`standard`、`english`、`chinese`。更多信息请参阅 [Standard Analyzer](https://milvus.io/docs/standard-analyzer.md)、[English Analyzer](https://milvus.io/docs/english-analyzer.md) 和 [Chinese Analyzer](https://milvus.io/docs/chinese-analyzer.md)。

            - 自定义 analyzer

                ```javascript
                const analyzer_params: {
                    "tokenizer": "standard",
                    "filter": ["lowercase"],
                };
                ```

                - `tokenizer` (*string*) -

                    定义 tokenizer 类型。可能的值：`standard`（默认）、`whitespace`、`jieba`。更多信息请参阅 [Standard Tokenizer](https://milvus.io/docs/standard-tokenizer.md)、[Whitespace Tokenizer](https://milvus.io/docs/whitespace-tokenizer.md) 和 [Jieba Tokenizer](https://milvus.io/docs/jieba-tokenizer.md)。

                - `filter` (*list*) -

                    列出用于细化 tokenizer 生成的词元的 filter，可选择内置 filter 和自定义 filter。更多信息请参阅 [Alphanumonly Filter](https://milvus.io/docs/alphanumonly-filer.md) 及其他文档。

        - **multi_analyzer_params** (*object*) -

            配置用于文本处理的多个 analyzer。此参数的值是一个 JSON 对象，用于决定 Milvus 如何为每个实体选择合适的 analyzer：

            ```javascript
            const multi_analyzer_params = {
              // Define language-specific analyzers
              // Each analyzer follows this format: <analyzer_name>: <analyzer_params>
              "analyzers": {
                "english": {"type": "english"},          // English-optimized analyzer
                "chinese": {"type": "chinese"},          // Chinese-optimized analyzer
                "default": {"tokenizer": "icu"}          // Required fallback analyzer
              },
              "by_field": "language",                    // Field determining analyzer selection
              "alias": {
                "cn": "chinese",                         // Use "cn" as shorthand for Chinese
                "en": "english"                          // Use "en" as shorthand for English
              }
            }
            ```

    - **autoID** (*boolean)* -

        向此 collection 插入数据时，主字段是否自动递增。

        该值默认为 **False**。将其设置为 **True** 会使主字段自动递增。如果需要设置具有自定义 schema 的 collection，请跳过此参数。

    - **nullable** (*boolean*) -

        一个布尔参数，用于指定字段是否可以接受 null 值。有效值：

        - **true**：字段可以包含 null 值，表示该字段是可选的，并且条目允许缺失数据。

        - **false**（默认）：字段必须为每个实体包含有效值；不允许缺失数据，因此该字段为必填。

        更多信息请参阅 [Nullable & Default](https://milvus.io/docs/nullable-and-default.md)。

    - **default_value** (*object*)

        在创建 collection schema 时，为其中的特定字段设置默认值。当你希望某些字段即使在数据插入期间未显式提供值也具有初始值时，这尤其有用。

- **functions** (*list*)

    将数据转换为 vector embeddings。此 function 将添加到 collection 的 schema 中。

    - **name** (*string*)

        Function 的名称。此标识符用于在查询和 collection 中引用该 function。

    - **description** (*string*)

        对 function 用途的简要描述。这有助于在较大项目中进行文档说明或提升清晰度，默认值为空字符串。

    - **type** (*[FunctionType](./Collections-FunctionType)*)

        用于处理原始数据的 function 类型。可能的值：

        - `FunctionType.BM25`：使用 BM25 算法从 `VARCHAR` 字段生成 sparse embeddings。

    - **input_field_names** (*string[]*)

        包含需要转换为 vector 表示的原始数据的字段名称。对于使用 `FunctionType.BM25` 的 function，此参数仅接受一个字段名称。

    - **output_field_names** (*string[]*)

        存储生成的 embeddings 的字段名称。此字段应对应于 collection schema 中定义的 vector 字段。对于使用 `FunctionType.BM25` 的 function，此参数仅接受一个字段名称。

- **num_partitions** (*number)* -

    要在 collection 中创建的 partition 数量。

    <Admonition type="info" icon="📘" title="Note">

    什么是分区？
    
        数据分区是一种基于特定条件组织数据的技术。通过数据分区，你可以分别创建、加载、释放和删除 partition，也可以在其中执行搜索和查询。

    </Admonition>

- **partition_key_field** (*string*) -

    用作 partition key 的字段名称。

    <Admonition type="info" icon="📘" title="Note">

    什么是 partition key？
    
        Partition key 用于根据实体的键值将实体存储到不同 partition 中。换句话说，partition key 会将具有相同键的实体分组在一起；当你按键字段进行过滤时，可以避免扫描无关 partition。与传统过滤方法相比，partition key 可以显著提升查询性能。

    </Admonition>

- **shards_num** (*number)* -

    创建此 collection 时一并创建的 shard 数量。 

    该值默认为 **1**，表示创建此 collection 时会一并创建一个 shard。

    <Admonition type="info" icon="📘" title="Note">

    什么是分片？
    
        Sharding 指的是将写入操作分发到不同节点，以充分利用 Milvus cluster 的并行计算潜力来写入数据。
    
        默认情况下，一个 collection 包含一个 shard。

    </Admonition>

- **properties** (Record&lt;string, string | number | boolean&gt;) 

    Collection 的额外属性，以键值对形式表示。可能的值包括：

    - **collection.ttl.seconds** (*number*) -

        当前 collection 的存活时间，单位为秒。

    - **mmap.enabled** (*boolean*) -

        是否在整个 collection 范围启用 mmap。

    - **partitionkey.isolation** (*boolean*) -

        是否启用 partition key 隔离。

    - **dynamicfield.enabled** (*boolean*) -

        是否启用动态字段。

    - **allow_insert_auto_id** (*boolean*) -

        启用 autoID 时是否允许插入主键。

- **timeout** (*float* | *None*) -

    此操作的超时时长。将其设置为 **None** 表示此操作在任何响应返回或发生错误时超时。

- **external_source** (*string*) -

    外部源路径。此参数适用于创建外部 collection。

- **external_spec** (*string*) -

    外部 spec 配置。此参数适用于创建外部 collection。

- **do_physical_backfill** (*boolean*) -

    是否对外部数据进行物理回填。此参数适用于创建外部 collection。

- **file_resource_ids** (*Array&lt;number | string&gt;*) -

    外部文件资源 ID。此参数适用于创建外部 collection。

### 使用 CreateCollectionWithSchemaAndIndexParamsReq\{#with-createcollectionwithschemaandindexparamsreq}

使用此请求体，你可以自定义 collection 的 schema 和 index 设置。创建后，collection 会自动加载。

```javascript
await milvusClient.createCollection({
   db_name?: string,
   collection_name: string,
   consistency_level: number | string,
   description: string,
   enable_dynamic_field: boolean,
   schema: [
     {
       name: string,
       description: "vector field",
       data_type: DataType.FloatVector,
       element_type?: DataType,
       is_primary_key?: boolean,
       is_partition_key?: boolean,
       is_function_output?: boolean,
       type_params: {
         dim: number,
         max_length: number,
         max_capacity: number,
         analyzer_params: Record<String, any>,
         enable_analyzer: boolean,
         enable_match: boolean,
         multi_analyzer_params: Record<String, any>,
         'mmap.enabled': boolean
       },
       nullable: boolean,
       default_value: object
     }
   ],
   functions: [
      {
        name: string,
        description: string,
        type: FunctionType,
        input_field_names: string[],
        output_field_names: string[],
        params: Record<string, any>,
      },
   ],
   num_partitions?: number,
   partition_key_field?: string,
   shards_num?: number,
   properties?: Properties,
   index_params: [
     {
       field_name: string,
       index_name?: string,
       index_type: string,
       metric_type?: string,
       params?: keyValueObj
     }     
   ],
   timeout?: number
 })
```

**参数：**

- **db_name** (*string*) -

    目标 collection 所属数据库的名称。

- **collection_name** (*string*) -

    **[必填]**

    要创建的 collection 的名称。

- **consistency_level** (*number* | *string*)

    目标 collection 的一致性级别。

    该值默认为 **Bounded**，可选项包括 **Strong**、**Bounded**、**Session**、**Eventually** 和 **Customized**。

    <Admonition type="info" icon="📘" title="Note">

    什么是一致性级别？
    
        分布式数据库中的一致性特指在给定时间写入或读取数据时，确保每个节点或副本对数据具有相同视图的属性。
    
        Zilliz Cloud 提供三种一致性级别：**Strong**、**Bounded Staleness** 和 **Eventually**，其中 **Bounded Staleness** 为默认设置。
    
        在执行 vector 相似性搜索或查询时，你可以轻松调整一致性级别，使其最适合你的应用。

    </Admonition>

- **description** (*string)* -

    要创建的 collection 的描述。

- **enable_dynamic_field** (*boolean)* -

    是否使用名为 **&#36;meta** 的保留 JSON 字段，以键值对形式存储未定义的字段及其值。

    该值默认为 **True**，表示使用 meta 字段。

- **schema** (*FieldType[]*) -

    - **name** (*string)* -

        field 的名称。

    - **data_type** (*string)* -

        field 的数据类型。有关所有可用数据类型的枚举，请参见 [DataType](./Collections-DataType)。

    - **description** (*string)* -

        field 的描述。

    - **is_partition_key** (*boolean)* -

        一个布尔值，表示此 field 是否将作为 partition key field。

    - **is_primary_key** (*boolean)* -

        该 field 是否将作为 primary key。

    - **is_function_output** (boolean) -

        该 field 是否作为函数的输出 field。

    - **type_params** (*string* | *number)* -

        field 的其他参数。

        - **dim** (*string* | *number*) -

            保存 vector embeddings 的 collection field 的维度。 

            该值应为大于 1 的整数，通常由你用于生成 vector embeddings 的模型决定。

        - **element_type** (string) -

            数组中元素的数据类型。 

            如果当前 field 是数组 field，则适用此参数。

        - **max_capacity** (*string* | *number*) -

            数组中的元素数量。

            如果当前 field 是数组 field，则适用此参数。

        - **max_length** (*string*) -

            此 field 中字符串的最大长度。

            当此 field 的 **data_type** 为 **VarChar** 时，此参数为必填。

        - **enable_analyzer** (*boolean*) -

            是否为指定的 `VarChar` field 启用文本分析。设置为 `true` 时，会指示 Milvus 使用文本分析器，对该 field 的文本内容进行分词和过滤。

        - **enable_match** (*boolean*)

            是否为指定的 `VarChar` field 启用关键词匹配。设置为 `true` 时，Milvus 会为该 field 创建倒排索引，从而支持快速高效的关键词查找。`enable_match` 与 `enable_analyzer` 协同工作，以提供基于结构化词项的文本搜索，其中 `enable_analyzer` 负责分词，`enable_match` 负责对这些词元执行搜索操作。

        - **analyzer_params** (*object*)

            配置用于文本处理的分析器，专门用于 `VarChar` field。此参数配置 tokenizer 和 filter 设置，尤其适用于 [关键词匹配](https://milvus.io/docs/keyword-match.md)或[全文搜索](https://milvus.io/docs/full-text-search.md)中使用的文本 field。根据分析器类型，可以使用以下任一方法进行配置：

            - 内置分析器

                ```javascript
                const analyzer_params: { type: 'english' };
                ```

                - `type` (*string*) -

                    Milvus 内置的预配置分析器类型，可通过指定其名称开箱即用。可能的值：`standard`、`english`、`chinese`。有关更多信息，请参阅 [Standard Analyzer](https://milvus.io/docs/standard-analyzer.md)、[English Analyzer](https://milvus.io/docs/english-analyzer.md) 和 [Chinese Analyzer](https://milvus.io/docs/chinese-analyzer.md)。

            - 自定义分析器

                ```javascript
                const analyzer_params: {
                    "tokenizer": "standard",
                    "filter": ["lowercase"],
                };
                ```

                - `tokenizer` (*string*) -

                    定义 tokenizer 类型。可能的值：`standard`（默认）、`whitespace`、`jieba`。有关更多信息，请参阅 [Standard Tokenizer](https://milvus.io/docs/standard-tokenizer.md)、[Whitespace Tokenizer](https://milvus.io/docs/whitespace-tokenizer.md) 和 [Jieba Tokenizer](https://milvus.io/docs/jieba-tokenizer.md)。

                - `filter` (*list*) -

                    列出用于优化 tokenizer 生成的 token 的 filter，可选择内置 filter 和自定义 filter。有关更多信息，请参阅 [Alphanumonly Filter](https://milvus.io/docs/alphanumonly-filer.md) 等。

        - **multi_analyzer_params** (*object*) -

            配置用于文本处理的多个分析器。此参数的值是一个 JSON 对象，用于决定 Milvus 如何为每个 entity 选择合适的分析器：

            ```javascript
            const multi_analyzer_params = {
              // Define language-specific analyzers
              // Each analyzer follows this format: <analyzer_name>: <analyzer_params>
              "analyzers": {
                "english": {"type": "english"},          // English-optimized analyzer
                "chinese": {"type": "chinese"},          // Chinese-optimized analyzer
                "default": {"tokenizer": "icu"}          // Required fallback analyzer
              },
              "by_field": "language",                    // Field determining analyzer selection
              "alias": {
                "cn": "chinese",                         // Use "cn" as shorthand for Chinese
                "en": "english"                          // Use "en" as shorthand for English
              }
            }
            ```

    - **autoID** (*boolean)* -

        在向此 collection 插入数据时，primary field 是否自动递增。

        该值默认为 **False**。将其设置为 **True** 会使 primary field 自动递增。如果需要设置具有自定义 schema 的 collection，请跳过此参数。

    - **nullable** (*boolean*) -

        一个布尔参数，用于指定 field 是否可以接受 null 值。有效值：

        - **true**：该 field 可以包含 null 值，表示该 field 是可选的，条目允许缺失数据。

        - **false**（默认）：该 field 必须为每个 entity 包含有效值；不允许缺失数据，因此该 field 为必填。

        有关更多信息，请参阅 [Nullable & Default](https://milvus.io/docs/nullable-and-default.md)。

    - **default_value** (*[DataType](./Collections-DataType)*)

        创建 collection schema 时，为 collection 中的特定 field 设置默认值。当你希望某些 field 即使在数据插入期间未显式提供值也具有初始值时，这尤其有用。

- **functions** (*list*)

    将数据转换为 vector embeddings。此函数将被添加到 collection 的 schema 中。

    - **name** (*string*)

        函数的名称。此标识符用于在查询和 collection 中引用该函数。

    - **description** (*string*)

        对函数用途的简要描述。这对于大型项目中的文档或清晰度可能很有用，默认为空字符串。

    - **type** (*[FunctionType](./Collections-FunctionType)*)

        用于处理原始数据的函数类型。可能的值：

        - `FunctionType.BM25`：使用 BM25 算法从 `VARCHAR` field 生成 sparse embeddings。

    - **input_field_names** (*string[]*)

        包含需要转换为 vector 表示的原始数据的 field 名称。对于使用 `FunctionType.BM25` 的函数，此参数仅接受一个 field 名称。

    - **output_field_names** (*string[]*)

        用于存储生成的 embeddings 的 field 名称。它应对应于 collection schema 中定义的 vector field。对于使用 `FunctionType.BM25` 的函数，此参数仅接受一个 field 名称。

- **num_partitions** (*number)* -

    要在 collection 中创建的 partition 数量。

    <Admonition type="info" icon="📘" title="Note">

    什么是分区？
    
        数据分区是一种基于特定条件组织数据的技术。通过数据分区，你可以分别创建、加载、释放和删除 partition，并在其中执行搜索和查询。

    </Admonition>

- **partition_key_field** (*boolean)* -

    一个布尔值，表示是否启用 partition key。

    <Admonition type="info" icon="📘" title="Note">

    什么是 partition key？
    
        Partition key 用于根据 key 值将 entity 存储到不同的 partition 中。换句话说，partition key 会将具有相同 key 的 entity 分组到一起，当你按 key field 过滤时，可以避免扫描无关 partition。与传统过滤方法相比，partition key 可以显著提升查询性能。

    </Admonition>

- **shards_num** (*number)* -

    创建此 collection 时同时创建的 shard 数量。 

    该值默认为 **1**，表示创建此 collection 时将同时创建一个 shard。

    <Admonition type="info" icon="📘" title="Note">

    什么是 sharding？
    
        Sharding 是指将写入操作分发到不同节点，以充分利用 Milvus cluster 在写入数据时的并行计算潜力。
    
        默认情况下，一个 collection 包含一个 shard。

    </Admonition>

- **properties** (Record&lt;string, string | number | boolean&gt;) 

    collection 的额外属性，以键值对形式表示。可能的值包括：

    - **collection.ttl.seconds** (*number*) -

        当前 collection 的生存时间，单位为秒。

    - **mmap.enabled** (*boolean*) -

        是否在整个 collection 范围内启用 mmap。

    - **partitionkey.isolation** (*boolean*) -

        是否启用 partition key 隔离。

    - **dynamicfield.enabled** (*boolean*) -

        是否启用动态 field。

    - **allow_insert_auto_id** (*boolean*) -

        启用 autoID 时是否允许插入 primary key。

- **index_params** (*CreateIndexSimpleReq[]* | *CreateIndexSimpleReq*)

    index 参数。

    - **field_name** (*string*) -

        要创建 index 的 field 名称。

    - **index_name** (*string*) -

        要生成的 index 文件名称。

    - **index_type** (*string*) -

        要使用的 index 算法类型。

    - **metric_type** (*string*) -

        用于衡量 vector embeddings 之间相似度的度量类型。

    - **params** (*KeyValueObj*) -

        额外的 index 相关参数，以键值对形式表示。

- **timeout** (*number*) -

    此操作的超时时长。将其设置为 **None** 表示当任何响应返回或发生错误时，此操作即超时。

- **external_source** (*string*) -

    外部源路径。此参数适用于创建外部 collection。

- **external_spec** (*string*) -

    外部 spec 配置。此参数适用于创建外部 collection。

- **do_physical_backfill** (*boolean*) -

    是否对外部数据执行物理回填。此参数适用于创建外部 collection。

- **file_resource_ids** (*Array&lt;number | string&gt;*) -

    外部文件资源 ID。此参数适用于创建外部 collection。

**返回值** *Promise\<ResStatus>*

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

    表示已发生错误的错误代码。如果此操作成功，则保持为 **Success**。 

- **reason** (*string*) - 

    表示所报告错误原因的原因。如果此操作成功，则保持为空字符串。

## 示例\{#example}

```java
const milvusClient = new MilvusClient({
    address: 'YOUR_CLUSTER_ENDPOINT',
    token: 'YOUR_CLUSTER_TOKEN',
});
 const resStatus = await milvusClient.createCollection({
   collection_name: 'my_collection',
   fields: [
     {
       name: "vector_01",
       description: "vector field",
       data_type: DataType.FloatVector,
       type_params: {
         dim: "8"
       }
     },
     {
       name: "age",
       data_type: DataType.Int64,
       autoID: true,
       is_primary_key: true,
       description: "",
     },
   ],
 });
```

