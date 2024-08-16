---
slug: /use-pipeline-in-llamaindex
beta: FALSE
notebook: FALSE
type: origin
token: LTs4wVOhbiJirSkdBn2cblmin4g
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - pipeline
  - llamaindex

---

import Admonition from '@theme/Admonition';


# 在 LlamaIndex 中使用 Pipelines

[Zilliz Cloud Pipelines](./pipelines) 是一个可扩展的 API 服务，用于检索。您可以将 Zilliz Cloud Pipelines 用作 [LLamaIndex](https://docs.llamaindex.ai/en/stable/examples/managed/zcpDemo.html) 中的托管索引。该服务可以将文档转换为 Embedding 向量，并将它们存储在 Zilliz Cloud 中，以实现高效的语义搜索。

## 前提条件{#before-you-start}

开始前，请先：

- 安装 LLamaIndex Python SDK

    ```bash
    pip install llama-index
    ```

- 配置[OpenAI](https://platform.openai.com/) 和 [Zilliz Cloud](https://cloud.zilliz.com.cn/signup?utm_source=twitter&amp;utm_medium=social%20&amp;utm_campaign=2023-12-22_social_pipeline-llamaindex_twitter) 账号鉴权信息

    ```python
    from getpass import getpass
    import os
    
    os.environ["OPENAI_API_KEY"] = getpass("Enter your OpenAI API Key:")
    
    ZILLIZ_PROJECT_ID = getpass("Enter your Zilliz Project ID:")
    ZILLIZ_CLUSTER_ID = getpass("Enter your Zilliz Cluster ID:")
    ZILLIZ_TOKEN = getpass("Enter your Zilliz API Key:")
    ```

    <Admonition type="info" icon="📘" title="说明">

    <p><a href="https://beta.openai.com/account/api-keys">获取 OpenAI API 密钥</a></p>
    <p><a href="./manage-api-keys">获取 Zilliz Cloud 鉴权信息</a></p>

    </Admonition>

## 为文档创建索引{#index-documents}

Zilliz Cloud Pipelines 支持来自[阿里云 OSS](https://www.alibabacloud.com/help/zh/oss/user-guide/authorize-third-party-users-to-download-objects?spm=a2c63.p38356.0.0.590c2cb74gHqev#section-fnd-m6v-bff) 和[腾讯云 COS](https://cloud.tencent.com/document/product/436/68284) 对象存储的文件。您可以从对象存储生成预签名 URL并使用 `from_document_url()` 或 `insert_doc_url()` 上传文件。它可以自动索引文档并将文档块作为向量存储在 Zilliz Cloud 上。

```python
from llama_index.indices import ZillizCloudPipelineIndex

zcp_index = ZillizCloudPipelineIndex.from_document_url(
    # a public or pre-signed url of a file stored on cloud object storage
    url="https://publicdataset.cloud.zilliz.com.cn/milvus_doc.md",
    project_id=ZILLIZ_PROJECT_ID,
    cluster_id=ZILLIZ_CLUSTER_ID,
    token=ZILLIZ_TOKEN,
    # optional
    metadata={"version": "2.3"},  # used for filtering
    collection_name="zcp_llamalection",  # change this value will specify customized collection name
)

# Insert more docs, eg. a Milvus v2.2 document
zcp_index.insert_doc_url(
    url="https://publicdataset.cloud.zilliz.com.cn/milvus_doc_22.md",
    metadata={"version": "2.2"},
)

# Output
# {'token_usage': 984, 'doc_name': 'milvus_doc_22.md', 'num_chunks': 7}

# # Delete docs by doc name
# zcp_index.delete_by_doc_name(doc_name="milvus_doc_22.md")
```

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>如果未创建 Zilliz Cloud Pipelines，上述代码将自动创建 Pipeline。</p></li>
<li><p>您可以按需选择是否为每篇文档添加元数据。元数据可以在检索文档时用于过滤文档片段。</p></li>
</ul>

</Admonition>

## 使用 Pipeline 作为查询引擎{#use-pipelines-as-query-engine}

使用 `ZillizCloudPipelineIndex`进行语义搜索时，您可以通过指定一些参数将其用作查询引擎 `as_query_engine()`：

- **search_top_k**：要检索的文本节点/块数量。默认为 `DEFAULT_SIMILARITY_TOP_K` (2)。

- **filters**：元数据过滤器。默认为 None。

- **output_metadata**：要与检索到的文本节点一起返回的元数据字段的名称列表。默认为 `[]`。

```python
from llama_index.vector_stores.types import ExactMatchFilter, MetadataFilters

query_engine_milvus23 = zcp_index.as_query_engine(
    search_top_k=3,
    filters=MetadataFilters(
        filters=[
            ExactMatchFilter(key="version", value="2.3")
        ]  # version == "2.3"
    ),
    output_metadata=["version"],
)
```

Milvus 2.3 文档语义搜索或检索增强生成（RAG）引擎已经准备就绪。

### 检索{#retrieve}

以下代码片段演示了如何使用 Zilliz Cloud Pipelines 进行语义搜索。

```python
question = "Can users delete entities by filtering non-primary fields?"
retrieved_nodes = query_engine_milvus23.retrieve(question)
print(retrieved_nodes)

# Output
# [NodeWithScore(node=TextNode(id_='447198459513870883', embedding=None, metadata={'version': '2.3'}, excluded_embed_metadata_keys=[], excluded_llm_metadata_keys=[], relationships={}, text='# Delete Entities\nThis topic describes how to delete entities in Milvus.  \nMilvus supports deleting entities by primary key or complex boolean expressions. Deleting entities by primary key is much faster and lighter than deleting them by complex boolean expressions. This is because Milvus executes queries first when deleting data by complex boolean expressions.  \nDeleted entities can still be retrieved immediately after the deletion if the consistency level is set lower than Strong.\nEntities deleted beyond the pre-specified span of time for Time Travel cannot be retrieved again.\nFrequent deletion operations will impact the system performance.  \nBefore deleting entities by comlpex boolean expressions, make sure the collection has been loaded.\nDeleting entities by complex boolean expressions is not an atomic operation. Therefore, if it fails halfway through, some data may still be deleted.\nDeleting entities by complex boolean expressions is supported only when the consistency is set to Bounded. For details, see Consistency.', start_char_idx=None, end_char_idx=None, text_template='{metadata_str}\n\n{content}', metadata_template='{key}: {value}', metadata_seperator='\n'), score=0.728226900100708), NodeWithScore(node=TextNode(id_='447198459513870886', embedding=None, metadata={'version': '2.3'}, excluded_embed_metadata_keys=[], excluded_llm_metadata_keys=[], relationships={}, text='# Delete Entities\n## Prepare boolean expression\n### Complex boolean expression\nTo filter entities that meet specific conditions, define complex boolean expressions.  \nFilter entities whose word_count is greater than or equal to 11000:  \n```python\nexpr = "word_count >= 11000"\n```  \nFilter entities whose book_name is not Unknown:  \n```python\nexpr = "book_name != Unknown"\n```  \nFilter entities whose primary key values are greater than 5 and word_count is smaller than or equal to 9999:  \n```python\nexpr = "book_id > 5 && word_count <= 9999"\n```', start_char_idx=None, end_char_idx=None, text_template='{metadata_str}\n\n{content}', metadata_template='{key}: {value}', metadata_seperator='\n'), score=0.687866747379303), NodeWithScore(node=TextNode(id_='447198459513870884', embedding=None, metadata={'version': '2.3'}, excluded_embed_metadata_keys=[], excluded_llm_metadata_keys=[], relationships={}, text='# Delete Entities\n## Prepare boolean expression\nPrepare the boolean expression that filters the entities to delete.  \nMilvus supports deleting entities by primary key or complex boolean expressions. For more information on expression rules and supported operators, see Boolean Expression Rules.', start_char_idx=None, end_char_idx=None, text_template='{metadata_str}\n\n{content}', metadata_template='{key}: {value}', metadata_seperator='\n'), score=0.6814976334571838)]

```

带有过滤器的查询引擎仅检索带有 "版本 2.3" 标签的文本节点。

### 查询{#query}

以下代码片段展示了如何将查询引擎作为由 Zilliz Cloud Pipelines 和 OpenAI 的大型语言模型支持的 RAG 代理来使用。

```python
response = query_engine_milvus23.query(question)
print(response.response)

# Output
# Yes, users can delete entities by filtering non-primary fields using complex boolean expressions in Milvus. The complex boolean expressions allow users to define specific conditions to filter entities based on non-primary fields, such as word_count or book_name. By specifying the desired conditions in the boolean expression, users can delete entities that meet those conditions. However, it is important to note that deleting entities by complex boolean expressions is not an atomic operation, and if it fails halfway through, some data may still be deleted.
```

## 高级用例{#advanced-use-cases}

您可以在不进行数据摄取的情况下获取托管索引。要开始使用 Zilliz Cloud Pipelines，您需要提供管道 ID 或相关联的集合名称：

- **Pipeline IDs**

    1 个包含 INGESTION、 SEARCH 和 DELETION Pipelines ID 的字典（dictionary）。例如：`{"INGESTION": "pipe-xx1", "SEARCH": "pipe-xx2", "DELETION": “pipe-xx3”}`

- **Collection name**

    集合名称默认为 `zcp_llamalection`。如果没有提供 Pipeline ID，索引将尝试获取与相关联的集合名称相同的 Pipeline

```python
from llama_index.indices import ZillizCloudPipelineIndex

advanced_zcp_index = ZillizCloudPipelineIndex(
    project_id=ZILLIZ_PROJECT_ID,
    cluster_id=ZILLIZ_CLUSTER_ID,
    token=ZILLIZ_TOKEN,
    collection_name="zcp_llamalection_advanced",
)

# Output
# No available pipelines. Please create pipelines first.
```

### 定制化 Pipelines{#advanced-use-cases}

如果没有提供或找到 Pipelines，那么您可以使用以下**可选**参数手动创建和自定义 Pipelines：

- **metadata_schema**: 带有字段名称作为键（key），数据类型作为值的元数据架构字典。例如：`{"user_id": "VarChar"}`

- **chunkSize**: 使用 Token 作为单位的块大小整数。如果没有指定块大小，那么 Zilliz Cloud Pipeline 将使用内置默认块大小（500 Tokens）来分割文档。

更多其他可用参数，请参阅 Zilliz Cloud Pipelines。

For other applicable parameters, refer to [Zilliz Cloud Pipelines](./pipelines) for more available pipeline parameters.

```python
advanced_zcp_index.create_pipelines(
    metadata_schema={"user_id": "VarChar"},
    chunkSize=350,
    # other pipeline params
)

# Output
# {'INGESTION': 'pipe-***********************,
#  'SEARCH': 'pipe-***********************',
#  'DELETION': 'pipe-***********************'}
```

### 多租户{#multi-tenancy}

通过将特定租户的值（例如用户 ID）作为元数据，托管索引可以通过应用元数据过滤器实现多租性。

通过指定元数据值，每个文档在摄取时都会被标记上特定租户的字段。

```python
advanced_zcp_index.insert_doc_url(
    url="https://publicdataset.cloud.zilliz.com.cn/milvus_doc.md",
    metadata={"user_id": "user_001"},
)

# Output
# {'token_usage': 1247, 'doc_name': 'milvus_doc.md', 'num_chunks': 10}
```

然后，托管索引可以通过过滤特定于租户的字段，为每个租户构建一个查询引擎。

```python
from llama_index.vector_stores.types import ExactMatchFilter, MetadataFilters

query_engine_for_user_001 = advanced_zcp_index.as_query_engine(
    search_top_k=3,
    filters=MetadataFilters(
        filters=[ExactMatchFilter(key="user_id", value="user_001")]
    ),
    output_metadata=["user_id"],  # optional, display user_id in outputs
)
```

您可以更改过滤条件（`filters`）来构建具有不同条件的查询引擎。

```python
question = "Can I delete entities by filtering non-primary fields?"

# search_results = query_engine_for_user_001.retrieve(question)
response = query_engine_for_user_001.query(question)
print(response.response)

# Output
# Yes, you can delete entities by filtering non-primary fields. Milvus supports deleting entities by complex boolean expressions, which allows you to filter entities based on specific conditions on non-primary fields. You can define complex boolean expressions using operators such as greater than or equal to, not equal to, and logical operators like AND and OR. By using these expressions, you can filter entities based on the values of non-primary fields and delete them accordingly.
```

