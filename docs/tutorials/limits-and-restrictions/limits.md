---
slug: /limits
beta: FALSE
notebook: FALSE
token: A8UFwSbMniMl6IkpJkNc4HsHnLc
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 使用限制

本文介绍了 Zilliz Cloud 平台和集群的使用限制信息。如需了解更多限制信息，可向我们[提交请求](https://support.zilliz.com.cn/hc/zh-cn)。

## 组织、项目和成员

下表展示了单个用户可加入的最大组织和项目数。

|  **内容** |  **最大数量**   |  **描述**                                 |
| ------- | ----------- | --------------------------------------- |
|  组织     |  1<br/>  |  每个用户只能创建 1 个组织。<br/>                |
|  组织成员   |  100        |  每个组织最多可以容纳 100 个成员。每个用户可以属于多个组织。       |
|  项目     |  10         |  每个用户可以创建 10 个项目。                       |
|  项目成员   |  100        |  每个项目最多可以容纳 100 个成员。每个用户可以加入同一组织内的多个项目。 |

## 集群和 CU

集群和 CU 数量的限制取决于您的支付方式和订阅计划。下表展示了企业版集群相关限制。

- **未绑定有效支付方式**

    |  **类型** |  **最大数量** |  **描述**                  |
    | ------- | --------- | ------------------------ |
    |  企业版集群  |  1        |  未绑定有效支付方式，最多可创建一个企业版集群。 |

- **已绑定有效支付方式**

    |  类型    |  **最大数量** |  **描述**                              |
    | ------ | --------- | ------------------------------------ |
    |  企业版集群 |  128 CUs  |  单个集群最多使用 32 个 CU，所有集群最多使用 128 个 CU。 |

如需创建超过 32 个 CU 规格的集群，请[联系我们](https://zilliz.com.cn/contact-sales?firstname=xushuang&lastname=hu&company=Zilliz&name=Zilliz&email=xushuang.hu@zilliz.com&fullname=hu%20xushuang&phone=--&country=)。

## Pipeline

### Pipeline

下表展示了项目中不同类型的 Pipeline 的相关限制。

|  **Pipeline 类型**    |  **最大数量（每个项目）** |
| ------------------- | --------------- |
|  Ingestion Pipeline |  10             |
|  Deletion Pipeline  |  10             |
|  Search Pipeline    |  10             |

### Ingestion

下表展示了每个 Embedding 模型可自定义的切片大小范围。

|  **Embedding 模型**         |  **切片大小范围 (Tokens）** |
| ------------------------- | -------------------- |
|  zilliz/bge-base-en-v1.5  |  20-500              |
|  zilliz/bge-base-zh-v1.5  |  20-500              |

下表展示了 Ingestion Pipeline 的 PRESERVE Function 生成的元数据字段限制。

|               |  **最大数量** |
| ------------- | --------- |
|  元数据字段        |  5        |
|  字符串类型字段的最大长度 |  4,000    |

下表展示了每次运行 Ingestion Pipeline 时切片数量限制。

|  **Embedding 模型**         |  **每次运行 Ingestion 的最大切片数量** |
| ------------------------- | --------------------------- |
|  zilliz/bge-base-en-v1.5  |  3,500                      |
|  zilliz/bge-base-zh-v1.5  |  3,500                      |

### Token 用量

下表展示了各模型的 Token 用量限制。

|  **Pipeline 类型**    |  **Embedding 模型**                                   |  **最大 Token 用量** |
| ------------------- | --------------------------------------------------- | ---------------- |
|  Ingestion Pipeline |  zilliz/bge-base-en-v1.5 & zilliz/bge-base-zh-v1.5  |  100,000,000     |
|  Search Pipeline    |  zilliz/bge-base-en-v1.5 & zilliz/bge-base-zh-v1.5  |  20,000,000      |
|  1 个组织中的所有 Pipeline |  zilliz/bge-base-en-v1.5 & zilliz/bge-base-zh-v1.5  |  200,000,000     |

<Admonition type="info" icon="📘" title="说明">

<p>已删除 Pipeline 的用量仍然计算在组织中所有 Pipeline 的用量中。</p>

</Admonition>

## Collection

|  **类型**         |  **最大数量**                       |  **描述**                                                                 |
| --------------- | ------------------------------- | ----------------------------------------------------------------------- |
|  企业版集群<br/>  |  每 CU：<= 64<br/> 每集群：<= 4096 |  在企业版集群中，每个计算单元（CU）可创建最多 64 个 Collection，并且集群中的 Collection 总数不能超过 4096。 |

除了对集群中 Collection 数量的限制外，Zilliz Cloud 还有容量资源相关的限制。具体见下表。

|  **CU 数量** |  **容量**                 |
| ---------- | ----------------------- |
|  1-8 CU    |  <= 4,096               |
|  12 CU 及以上 |  Min(512 x CU 数, 65536) |

已使用的容量应该小于可用的通用容量。

<Admonition type="info" icon="📘" title="说明">

<p>下文介绍了 Zilliz Cloud 如何计算集群的已使用容量和通用容量。</p>
<ul>
<li><strong>计算集群的已使用容量</strong></li>
</ul>
<p>假设一个集群含有 50 个 Collection。前 20 个 Collection 中，每个 Collection 含有在 2 个Partition 和 4 个 Shard，剩下的 30 个 Collection 分别含有在 1 个 Partition 和 12 个 Shard。因此，可以按照以下方式计算集群的<strong>已使用容量</strong>：</p>
<p><strong>20 (collections) x 2 (partitions) x 4 (shards) + 30 (collections) x 1 (partitions) x 12 (shards) = 160 + 360 = 520</strong></p>
<p>基于以上等式，Zilliz Cloud 将该集群的已使用容量设定为 520。</p>
<ul>
<li><strong>计算集群的通用容量</strong></li>
</ul>
<p>可以使用以下公式计算集群的通用容量：</p>
<p><strong>Min(512 x CU 数, 65536)</strong></p>
<p>例如：</p>
<p>在一个 2 CU 的集群中，最多可创建 128 个 Collection，通用容量为 1024。</p>
<p>在一个 12 CU 的集群中，最多可创建 768 个 Collection，通用容量为 6144。</p>
<p>在一个 32 CU 的集群中，最多可创建 4096 个 Collection，通用容量为 65536。</p>

</Admonition>

此外，每个集群创建 Collection 的速率限制为每秒 1 个 Collection。

### Partition

|  **类型**         |  **最大数量（每个 Collection）** |  描述                                               |
| --------------- | ------------------------ | ------------------------------------------------- |
|  企业版集群<br/>  |  4096                    |  在企业版集群中，您可以为每个 Collection 创建最多 4096 个 Partition。 |

在计算已使用容量和通用容量时，请参考 [Collection](./limits#collection) 部分的说明。此外，每个集群创建 Partition 的速率限制为每秒 1 个 Partition。

### Shard

创建 Collection 时，您可以为 Collection 创建最多 8 个 Shard。如果未指定，Collection 默认具有一个 Shard。

|  **CU 数量** |  **最大 Shard 数量** |
| ---------- | ---------------- |
|   1-8 CU   |  2               |
|  12 CU 及以上 |  8               |

建议在创建 Collection 时保持 Shard 数量的默认设置，特别是对于使用不超过 24 个 CU 的集群。

在计算已使用容量和通用容量时，请参考 [Collection](./limits#collection) 部分的说明。

### 字段

|  **内容**              |  **最大数量** |  **描述**          |
| -------------------- | --------- | ---------------- |
|  所有字段（每个 Collection） |  64       |  N/A             |
|  向量字段（每个 Collection） |  1        |  即将支持多向量功能，敬请期待。 |

关于字段的其他限制：

- 任何字段类型都不支持空值。

- 某些字段（如 VarChar 或 JSON）使用的内存超出预期，可能导致集群空间耗尽。

### 向量维度

向量字段的最大维度数为 32768。

## 数据操作

下文将介绍 Zilliz Cloud 集群中常见数据操作的速率限制。

### 插入

每个插入请求/响应的大小不应超过 64 MB。

速率限制根据集群类型和 CU 数量而有所不同。以下表格列出了插入操作的速率限制。

|                  |  Insert rate limits |
| ---------------- | ------------------- |
|  企业版集群（1-2 CU）   |  4 MB/s             |
|  企业版集群（4-8 CU）   |  6 MB/s             |
|  企业版集群（12-20 CU） |  8 MB/s             |
|  企业版集群（>= 24 CU） |  12 MB/s            |

在插入数据时，请确保包含所有在 Schema 中已定义的字段。如果 Collection 启用了 AutoID，则排除主键。

为了使插入的数据能够立即被检索到，建议将搜索或查询请求中的一致性级别更改为 **Strong**。详细信息，请参阅[一致性水平](./consistency-level)。

### Upsert

每个 Upsert 请求/响应的大小不应超过 64 MB。

速率限制根据集群类型和 CU 数量而有所不同。以下表格列出了 Upsert 操作的速率限制。

|                  |  Insert rate limits |
| ---------------- | ------------------- |
|  企业版集群（1-2 CU）   |  4 MB/s             |
|  企业版集群（4-8 CU）   |  6 MB/s             |
|  企业版集群（12-20 CU） |  8 MB/s             |
|  企业版集群（>= 24 CU） |  12 MB/s            |

在 Upsert 数据时，请确保包含所有在 Schema 中已定义的字段。

为了使 Upsert 的数据能够立即被检索到，建议将搜索或查询请求中的一致性级别更改为 **Strong**。详细信息，请参阅[一致性水平](./consistency-level)。

### 索引

不同字段类型对应不同类型的索引。以下表格列出了可索引的字段类型及其对应的索引类型。

|  **字段类型**      |  **索引类型**  |  **度量类型**         |
| -------------- | ---------- | ----------------- |
|  向量字段          |  AUTOINDEX |  L2, IP, 和 COSINE |
|  VarChar 字段    |  TRIE      |  N/A              |
|  Int8/16/32/64 |  STL_SORT  |  N/A              |
|  Float32/64    |  STL_SORT  |  N/A              |

### 写入

每个集群的写入请求速率限制为每秒 1 个请求。

<Admonition type="info" icon="📘" title="说明">

<p>不建议您手动执行写入操作。Zilliz Cloud 会自动优雅地处理数据写入操作。</p>

</Admonition>

### 加载

每个集群的加载请求速率限制为每秒 1 个请求。

<Admonition type="info" icon="📘" title="说明">

<p>对于已加载的 Collection，即使有新数据插入，您无需重复执行加载操作。</p>

</Admonition>

### 搜索

每个搜索请求/响应的大小不应超过 64 MB。

每个搜索请求携带的查询向量（**nq**）不超过 16384 个。

每个搜索响应返回的 Entity 数量（**topK**）不超过 16384 个。

### 查询

每个查询请求/响应的大小不应超过 64 MB。

每个查询响应返回的 Entity 数量（**topK**）不超过 16384 个。

### 删除 Entity

每个删除请求/响应的大小不应超过 64 MB。

每个集群的删除请求速率限制为每秒 0.5 MB。

### 删除 Collection

每个集群的删除请求速率限制为每秒 1 个请求。

## CU 容量

请参阅[选择合适的 CU 类型](./cu-types-explained)了解更多。

## 数据导入（控制台）

|  文件类型           |  本地导入 |  对象存储导入                               |
| --------------- | ----- | ------------------------------------- |
|  JSON           |  1 GB |  1 GB                                 |
|  Numpy<br/>  |  暂不支持 |  文件夹的最大大小为 100 GB，每个子文件夹的最大大小为 15 GB。 |
|  Parquet        |  暂不支持 |  10 GB                                |

请参阅[准备导入数据](./prepare-source-data)了解更多。

## 数据备份（控制台）

Zilliz Cloud 提供免费的备份存储服务，快照可保存长达30天。

## 数据恢复（控制台）

您可以从快照中恢复 Zilliz Cloud 集群。恢复的集群和原集群应属于同一地域，并使用相同的 CU 类型。