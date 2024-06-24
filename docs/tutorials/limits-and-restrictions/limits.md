---
slug: /limits
beta: FALSE
notebook: FALSE
type: origin
token: A8UFwSbMniMl6IkpJkNc4HsHnLc
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 使用限制

本文介绍了 Zilliz Cloud 平台和集群的使用限制信息。如需了解更多限制信息，可向我们[提交请求](https://support.zilliz.com.cn/hc/zh-cn)。

## 组织、项目和成员{#organizations-projects-and-members}

下表展示了单个用户可加入的最大组织和项目数。

<table>
   <tr>
     <th><p><strong>内容</strong></p></th>
     <th><p><strong>最大数量</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>组织</p></td>
     <td><p>1</p></td>
     <td><p>每个用户只能创建 1 个组织。</p></td>
   </tr>
   <tr>
     <td><p>组织成员</p></td>
     <td><p>100</p></td>
     <td><p>每个组织最多可以容纳 100 个成员。每个用户可以属于多个组织。</p></td>
   </tr>
   <tr>
     <td><p>项目</p></td>
     <td><p>10</p></td>
     <td><p>每个用户可以创建 10 个项目。</p></td>
   </tr>
   <tr>
     <td><p>项目成员</p></td>
     <td><p>100</p></td>
     <td><p>每个项目最多可以容纳 100 个成员。每个用户可以加入同一组织内的多个项目。</p></td>
   </tr>
</table>

## 集群和 CU{#clusters-and-cus}

集群和 CU 数量的限制取决于您的支付方式和订阅计划。下表展示了 Dedicated 版集群相关限制。

- **未绑定有效支付方式**

    <table>
       <tr>
         <th><p><strong>类型</strong></p></th>
         <th><p><strong>最大数量</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>Dedicated 版集群</p></td>
         <td><p>1</p></td>
         <td><p>未绑定有效支付方式，最多可创建一个Dedicated 版集群。</p></td>
       </tr>
    </table>

- **已绑定有效支付方式**

    <table>
       <tr>
         <th><p>类型</p></th>
         <th><p><strong>最大数量</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>Dedicated 版集群</p></td>
         <td><p>256 CUs</p></td>
         <td><p>在自助操作时，单个集群最多使用 256 个 CU。</p></td>
       </tr>
    </table>

如需创建超过 256 个 CU 规格的集群，请[联系我们](https://zilliz.com.cn/contact-sales?firstname=xushuang&lastname=hu&company=Zilliz&name=Zilliz&email=xushuang.hu@zilliz.com&fullname=hu%20xushuang&phone=--&country=)。

## Pipeline{#pipelines}

### Pipeline{#number-of-pipelines}

下表展示了项目中不同类型的 Pipeline 的相关限制。

<table>
   <tr>
     <th><p><strong>Pipeline 类型</strong></p></th>
     <th><p><strong>最大数量（每个项目）</strong></p></th>
   </tr>
   <tr>
     <td><p>Ingestion Pipeline</p></td>
     <td><p>10</p></td>
   </tr>
   <tr>
     <td><p>Deletion Pipeline</p></td>
     <td><p>10</p></td>
   </tr>
   <tr>
     <td><p>Search Pipeline</p></td>
     <td><p>10</p></td>
   </tr>
</table>

### Ingestion{#ingestion}

下表展示了每个 Embedding 模型可自定义的切片大小范围。

<table>
   <tr>
     <th><p><strong>Embedding 模型</strong></p></th>
     <th><p><strong>切片大小范围 (Tokens）</strong></p></th>
   </tr>
   <tr>
     <td><p>zilliz/bge-base-en-v1.5</p></td>
     <td><p>20-500</p></td>
   </tr>
   <tr>
     <td><p>zilliz/bge-base-zh-v1.5</p></td>
     <td><p>20-500</p></td>
   </tr>
</table>

下表展示了 Ingestion Pipeline 的 PRESERVE Function 生成的元数据字段限制。

<table>
   <tr>
     <th></th>
     <th><p><strong>最大数量</strong></p></th>
   </tr>
   <tr>
     <td><p>元数据字段</p></td>
     <td><p>5</p></td>
   </tr>
   <tr>
     <td><p>字符串类型字段的最大长度</p></td>
     <td><p>4,000</p></td>
   </tr>
</table>

下表展示了每次运行 Ingestion Pipeline 时切片数量限制。

<table>
   <tr>
     <th><p><strong>Embedding 模型</strong></p></th>
     <th><p><strong>每次运行 Ingestion 的最大切片数量</strong></p></th>
   </tr>
   <tr>
     <td><p>zilliz/bge-base-en-v1.5</p></td>
     <td><p>3,500</p></td>
   </tr>
   <tr>
     <td><p>zilliz/bge-base-zh-v1.5</p></td>
     <td><p>3,500</p></td>
   </tr>
</table>

### Pipelines 用量{#pipelines-usage}

<table>
   <tr>
     <th></th>
     <th><p>用量上限</p></th>
   </tr>
   <tr>
     <td><p>每个组织</p></td>
     <td><p>¥140/月</p></td>
   </tr>
</table>

## Collection{#collections}

<table>
   <tr>
     <th><p><strong>类型</strong></p></th>
     <th><p><strong>最大数量</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>Dedicated 版集群</p></td>
     <td><p>每 CU：&lt;= 64</p><p>每集群：&lt;= 4096</p></td>
     <td><p>在 Dedicated 版集群中，每个计算单元（CU）可创建最多 64 个 Collection，并且集群中的 Collection 总数不能超过 4096。</p></td>
   </tr>
</table>

除了对集群中 Collection 数量的限制外，Zilliz Cloud 还有容量资源相关的限制。具体来说，Zilliz Cloud 会根据集群使用的 CU 大小来计算集群的通用容量，集群当前已使用容量须小于或等于其通用容量。

```java
集群通用容量 = 512 x CU 大小
```

<Admonition type="info" icon="📘" title="说明">

<p>为了便于理解，下文演示了 Zilliz Cloud 如何计算集群的已使用容量和通用容量。</p>
<ul>
<li><strong>计算集群的已使用容量</strong></li>
</ul>
<p>假设一个集群含有 50 个 Collection。前 20 个 Collection 中，每个 Collection 含有 20 个Partition，剩下的 30 个 Collection 分别含有 10 个 Partition。因此，可以按照以下方式计算集群的<strong>已使用容量</strong>：</p>
<p><strong>20 (collections) x 20 (partitions) + 30 (collections) x 10 (partitions) = 400 + 300 = 700</strong></p>
<p>基于以上等式，Zilliz Cloud 将该集群的已使用容量设定为 700。</p>
<ul>
<li><strong>计算集群的通用容量</strong></li>
</ul>
<p>可以使用以下公式计算集群的通用容量：</p>
<p><strong>\<= 512 x CU 数</strong></p>
<p>例如：</p>
<p>在一个 2 CU 的集群中，最多可创建 128 个 Collection，通用容量最大为 1,028。</p>
<p>在一个 12 CU 的集群中，最多可创建 768 个 Collection，通用容量最大为 6144。</p>
<p>在一个 32 CU 的集群中，最多可创建 4096 个 Collection，通用容量最大为 16,384。</p>

</Admonition>

此外，每个集群创建 Collection 的速率限制为每秒 1 个 Collection。

### Partition{#partitions}

<table>
   <tr>
     <th><p><strong>类型</strong></p></th>
     <th><p><strong>最大数量（每个 Collection）</strong></p></th>
     <th><p>描述</p></th>
   </tr>
   <tr>
     <td><p>Dedicated 版集群</p></td>
     <td><p>4096</p></td>
     <td><p>在 Dedicated 版集群中，您可以为每个 Collection 创建最多 4096 个 Partition。</p></td>
   </tr>
</table>

在计算已使用容量和通用容量时，请参考 [Collection](./limits#collections) 部分的说明。此外，每个集群创建 Partition 的速率限制为每秒 1 个 Partition。

### 字段{#fields}

<table>
   <tr>
     <th><p><strong>内容</strong></p></th>
     <th><p><strong>最大数量</strong></p></th>
     <th><p><strong>描述</strong></p></th>
   </tr>
   <tr>
     <td><p>所有字段（每个 Collection）</p></td>
     <td><p>64</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p>向量字段（每个 Collection）</p></td>
     <td><p>1</p></td>
     <td><p>即将支持多向量功能，敬请期待。</p></td>
   </tr>
</table>

关于字段的其他限制：

- 任何字段类型都不支持空值。

- 某些字段（如 VarChar 或 JSON）使用的内存超出预期，可能导致集群空间耗尽。

### 向量维度{#dimensions}

向量字段的最大维度数为 32768。

## 数据操作{#operations}

下文将介绍 Zilliz Cloud 集群中常见数据操作的速率限制。

### Insert{#insert}

每个插入请求/响应的大小不应超过 64 MB。

速率限制根据集群类型和 CU 数量而有所不同。以下表格列出了插入操作的速率限制。

<table>
   <tr>
     <th></th>
     <th><p>Insert rate limits</p></th>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（1-2 CU）</p></td>
     <td><p>4 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（4-8 CU）</p></td>
     <td><p>6 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（12-20 CU）</p></td>
     <td><p>8 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（&gt;= 24 CU）</p></td>
     <td><p>12 MB/s</p></td>
   </tr>
</table>

在插入数据时，请确保包含所有在 Schema 中已定义的字段。如果 Collection 启用了 AutoID，则排除主键。

为了使插入的数据能够立即被检索到，建议将搜索或查询请求中的一致性级别更改为 **Strong**。详细信息，请参阅[一致性水平](./consistency-level)。

### Upsert{#upsert}

每个 Upsert 请求/响应的大小不应超过 64 MB。

速率限制根据集群类型和 CU 数量而有所不同。以下表格列出了 Upsert 操作的速率限制。

<table>
   <tr>
     <th></th>
     <th><p>Insert rate limits</p></th>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（1-2 CU）</p></td>
     <td><p>4 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（4-8 CU）</p></td>
     <td><p>6 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（12-20 CU）</p></td>
     <td><p>8 MB/s</p></td>
   </tr>
   <tr>
     <td><p>Dedicated 版集群（&gt;= 24 CU）</p></td>
     <td><p>12 MB/s</p></td>
   </tr>
</table>

在 Upsert 数据时，请确保包含所有在 Schema 中已定义的字段。

为了使 Upsert 的数据能够立即被检索到，建议将搜索或查询请求中的一致性级别更改为 **Strong**。详细信息，请参阅[一致性水平](./consistency-level)。

### Index{#index}

不同字段类型对应不同类型的索引。以下表格列出了可索引的字段类型及其对应的索引类型。

<table>
   <tr>
     <th><p><strong>字段类型</strong></p></th>
     <th><p><strong>索引类型</strong></p></th>
     <th><p><strong>度量类型</strong></p></th>
   </tr>
   <tr>
     <td><p>向量字段</p></td>
     <td><p>AUTOINDEX</p></td>
     <td><p>L2, IP, 和 COSINE</p></td>
   </tr>
   <tr>
     <td><p>VarChar 字段</p></td>
     <td><p>TRIE</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p>Int8/16/32/64</p></td>
     <td><p>STL_SORT</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p>Float32/64</p></td>
     <td><p>STL_SORT</p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

### Flush{#flush}

每个集群的 Flush 请求速率限制为每秒 1 个请求。

<Admonition type="info" icon="📘" title="说明">

<p>不建议您手动执行 Flush 操作。Zilliz Cloud 会自动优雅地处理数据 Flush 操作。</p>

</Admonition>

### Load{#load}

每个集群的加载请求速率限制为每秒 1 个请求。

<Admonition type="info" icon="📘" title="说明">

<p>对于已加载的 Collection，即使有新数据插入，您无需重复执行加载操作。</p>

</Admonition>

### Search{#search}

每个搜索请求/响应的大小不应超过 64 MB。

每个搜索请求携带的查询向量（**nq**）不超过 16384 个。

每个搜索响应返回的 Entity 数量（**topK**）不超过 16384 个。

### Query{#query}

每个查询请求/响应的大小不应超过 64 MB。

每个查询响应返回的 Entity 数量（**topK**）不超过 16384 个。

### Delete Entity{#delete}

每个删除请求/响应的大小不应超过 64 MB。

每个集群的删除请求速率限制为每秒 0.5 MB。

### Drop Collection{#drop}

每个集群的删除请求速率限制为每秒 1 个请求。

### Data Import{#data-import}

单 Collection 支撑最多 10 个正在运行或待运行的数据导入任务。

## CU 容量{#cu-capacity}

请参阅[选择合适的 CU 类型](./cu-types-explained)了解更多。

## 数据导入（控制台）{#data-import-on-console}

<table>
   <tr>
     <th><p>文件类型</p></th>
     <th><p>本地导入</p></th>
     <th><p>对象存储导入</p></th>
   </tr>
   <tr>
     <td><p>JSON</p></td>
     <td><p>1 GB</p></td>
     <td><p>1 GB</p></td>
   </tr>
   <tr>
     <td><p>Numpy</p></td>
     <td><p>暂不支持</p></td>
     <td><p>文件夹的最大大小为 100 GB，每个子文件夹的最大大小为 15 GB。</p></td>
   </tr>
   <tr>
     <td><p>Parquet</p></td>
     <td><p>暂不支持</p></td>
     <td><p>10 GB</p></td>
   </tr>
</table>

请参阅[准备导入数据](./prepare-source-data)了解更多。

## 数据备份（控制台）{#backup-on-console}

Zilliz Cloud 提供免费的备份存储服务，快照可保存长达30天。

## 数据恢复（控制台）{#restore-on-console}

您可以从快照中恢复 Zilliz Cloud 集群。恢复的集群和原集群应属于同一地域，并使用相同的 CU 类型。