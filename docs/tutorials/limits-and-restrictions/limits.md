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
     <th><strong>内容</strong></th>
     <th><strong>最大数量</strong></th>
     <th><strong>描述</strong></th>
   </tr>
   <tr>
     <td>组织</td>
     <td>1<br/></td>
     <td>每个用户只能创建 1 个组织。<br/></td>
   </tr>
   <tr>
     <td>组织成员</td>
     <td>100</td>
     <td>每个组织最多可以容纳 100 个成员。每个用户可以属于多个组织。</td>
   </tr>
   <tr>
     <td>项目</td>
     <td>10</td>
     <td>每个用户可以创建 10 个项目。</td>
   </tr>
   <tr>
     <td>项目成员</td>
     <td>100</td>
     <td>每个项目最多可以容纳 100 个成员。每个用户可以加入同一组织内的多个项目。</td>
   </tr>
</table>

## 集群和 CU{#clusters-and-cus}

集群和 CU 数量的限制取决于您的支付方式和订阅计划。下表展示了企业版集群相关限制。

- **未绑定有效支付方式**

    <table>
       <tr>
         <th><strong>类型</strong></th>
         <th><strong>最大数量</strong></th>
         <th><strong>描述</strong></th>
       </tr>
       <tr>
         <td>企业版集群</td>
         <td>1</td>
         <td>未绑定有效支付方式，最多可创建一个企业版集群。</td>
       </tr>
    </table>

- **已绑定有效支付方式**

    <table>
       <tr>
         <th>类型</th>
         <th><strong>最大数量</strong></th>
         <th><strong>描述</strong></th>
       </tr>
       <tr>
         <td>企业版集群</td>
         <td>128 CUs</td>
         <td>在自助操作时，单个集群最多使用 32 个 CU，所有集群最多使用 128 个 CU。</td>
       </tr>
    </table>

如需创建超过 32 个 CU 规格的集群或需要的总 CU 数量超过 128 CU 时，请[联系我们](https://zilliz.com.cn/contact-sales?firstname=xushuang&lastname=hu&company=Zilliz&name=Zilliz&email=xushuang.hu@zilliz.com&fullname=hu%20xushuang&phone=--&country=)。

## Pipeline{#pipelines}

### Pipeline{#number-of-pipelines}

下表展示了项目中不同类型的 Pipeline 的相关限制。

<table>
   <tr>
     <th><strong>Pipeline 类型</strong></th>
     <th><strong>最大数量（每个项目）</strong></th>
   </tr>
   <tr>
     <td>Ingestion Pipeline</td>
     <td>10</td>
   </tr>
   <tr>
     <td>Deletion Pipeline</td>
     <td>10</td>
   </tr>
   <tr>
     <td>Search Pipeline</td>
     <td>10</td>
   </tr>
</table>

### Ingestion{#ingestion}

下表展示了每个 Embedding 模型可自定义的切片大小范围。

<table>
   <tr>
     <th><strong>Embedding 模型</strong></th>
     <th><strong>切片大小范围 (Tokens）</strong></th>
   </tr>
   <tr>
     <td>zilliz/bge-base-en-v1.5</td>
     <td>20-500</td>
   </tr>
   <tr>
     <td>zilliz/bge-base-zh-v1.5</td>
     <td>20-500</td>
   </tr>
</table>

下表展示了 Ingestion Pipeline 的 PRESERVE Function 生成的元数据字段限制。

<table>
   <tr>
     <th></th>
     <th><strong>最大数量</strong></th>
   </tr>
   <tr>
     <td>元数据字段</td>
     <td>5</td>
   </tr>
   <tr>
     <td>字符串类型字段的最大长度</td>
     <td>4,000</td>
   </tr>
</table>

下表展示了每次运行 Ingestion Pipeline 时切片数量限制。

<table>
   <tr>
     <th><strong>Embedding 模型</strong></th>
     <th><strong>每次运行 Ingestion 的最大切片数量</strong></th>
   </tr>
   <tr>
     <td>zilliz/bge-base-en-v1.5</td>
     <td>3,500</td>
   </tr>
   <tr>
     <td>zilliz/bge-base-zh-v1.5</td>
     <td>3,500</td>
   </tr>
</table>

### Token 用量{#token-usage}

下表展示了各模型的 Token 用量限制。

<table>
   <tr>
     <th><strong>Pipeline 类型</strong></th>
     <th><strong>Embedding 模型</strong></th>
     <th><strong>最大 Token 用量</strong></th>
   </tr>
   <tr>
     <td>Ingestion Pipeline</td>
     <td>zilliz/bge-base-en-v1.5 &amp; zilliz/bge-base-zh-v1.5</td>
     <td>100,000,000</td>
   </tr>
   <tr>
     <td>Search Pipeline</td>
     <td>zilliz/bge-base-en-v1.5 &amp; zilliz/bge-base-zh-v1.5</td>
     <td>20,000,000</td>
   </tr>
   <tr>
     <td>1 个组织中的所有 Pipeline</td>
     <td>zilliz/bge-base-en-v1.5 &amp; zilliz/bge-base-zh-v1.5</td>
     <td>200,000,000</td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>已删除 Pipeline 的用量仍然计算在组织中所有 Pipeline 的用量中。</p>

</Admonition>

## Collection{#collections}

<table>
   <tr>
     <th><strong>类型</strong></th>
     <th><strong>最大数量</strong></th>
     <th><strong>描述</strong></th>
   </tr>
   <tr>
     <td>企业版集群<br/></td>
     <td>每 CU：\<= 64<br/> 每集群：\&lt;= 4096</td>
     <td>在企业版集群中，每个计算单元（CU）可创建最多 64 个 Collection，并且集群中的 Collection 总数不能超过 4096。</td>
   </tr>
</table>

除了对集群中 Collection 数量的限制外，Zilliz Cloud 还有容量资源相关的限制。具体见下表。

<table>
   <tr>
     <th><strong>CU 数量</strong></th>
     <th><strong>容量</strong></th>
   </tr>
   <tr>
     <td>1-8 CU</td>
     <td>\&lt;= 4,096</td>
   </tr>
   <tr>
     <td>12 CU 及以上</td>
     <td>\&lt;= 512 x CU 数</td>
   </tr>
</table>

已使用的容量应该小于可用的通用容量。

<Admonition type="info" icon="📘" title="说明">

<p>下文介绍了 Zilliz Cloud 如何计算集群的已使用容量和通用容量。</p>
<ul>
<li><strong>计算集群的已使用容量</strong></li>
</ul>
<p>假设一个集群含有 50 个 Collection。前 20 个 Collection 中，每个 Collection 含有在 20 个Partition，剩下的 30 个 Collection 分别含有在 100 个 Partition。因此，可以按照以下方式计算集群的<strong>已使用容量</strong>：</p>
<p><strong>20 (collections) x 20 (partitions) + 30 (collections) x 100 (partitions) = 160 + 360 = 700</strong></p>
<p>基于以上等式，Zilliz Cloud 将该集群的已使用容量设定为 700。</p>
<ul>
<li><strong>计算集群的通用容量</strong></li>
</ul>
<p>可以使用以下公式计算集群的通用容量：</p>
<p><strong>\<= 512 x CU 数</strong></p>
<p>例如：</p>
<p>在一个 2 CU 的集群中，最多可创建 128 个 Collection，通用容量最大为 1024。</p>
<p>在一个 12 CU 的集群中，最多可创建 768 个 Collection，通用容量最大为 6144。</p>
<p>在一个 32 CU 的集群中，最多可创建 4096 个 Collection，通用容量最大为 65536。</p>

</Admonition>

此外，每个集群创建 Collection 的速率限制为每秒 1 个 Collection。

### Partition{#partitions}

<table>
   <tr>
     <th><strong>类型</strong></th>
     <th><strong>最大数量（每个 Collection）</strong></th>
     <th>描述</th>
   </tr>
   <tr>
     <td>企业版集群<br/></td>
     <td>4096</td>
     <td>在企业版集群中，您可以为每个 Collection 创建最多 4096 个 Partition。</td>
   </tr>
</table>

在计算已使用容量和通用容量时，请参考 [Collection](./limits#collections) 部分的说明。此外，每个集群创建 Partition 的速率限制为每秒 1 个 Partition。

### 字段{#fields}

<table>
   <tr>
     <th><strong>内容</strong></th>
     <th><strong>最大数量</strong></th>
     <th><strong>描述</strong></th>
   </tr>
   <tr>
     <td>所有字段（每个 Collection）</td>
     <td>64</td>
     <td>N/A</td>
   </tr>
   <tr>
     <td>向量字段（每个 Collection）</td>
     <td>1</td>
     <td>即将支持多向量功能，敬请期待。</td>
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
     <th>Insert rate limits</th>
   </tr>
   <tr>
     <td>企业版集群（1-2 CU）</td>
     <td>4 MB/s</td>
   </tr>
   <tr>
     <td>企业版集群（4-8 CU）</td>
     <td>6 MB/s</td>
   </tr>
   <tr>
     <td>企业版集群（12-20 CU）</td>
     <td>8 MB/s</td>
   </tr>
   <tr>
     <td>企业版集群（&gt;= 24 CU）</td>
     <td>12 MB/s</td>
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
     <th>Insert rate limits</th>
   </tr>
   <tr>
     <td>企业版集群（1-2 CU）</td>
     <td>4 MB/s</td>
   </tr>
   <tr>
     <td>企业版集群（4-8 CU）</td>
     <td>6 MB/s</td>
   </tr>
   <tr>
     <td>企业版集群（12-20 CU）</td>
     <td>8 MB/s</td>
   </tr>
   <tr>
     <td>企业版集群（&gt;= 24 CU）</td>
     <td>12 MB/s</td>
   </tr>
</table>

在 Upsert 数据时，请确保包含所有在 Schema 中已定义的字段。

为了使 Upsert 的数据能够立即被检索到，建议将搜索或查询请求中的一致性级别更改为 **Strong**。详细信息，请参阅[一致性水平](./consistency-level)。

### Index{#index}

不同字段类型对应不同类型的索引。以下表格列出了可索引的字段类型及其对应的索引类型。

<table>
   <tr>
     <th><strong>字段类型</strong></th>
     <th><strong>索引类型</strong></th>
     <th><strong>度量类型</strong></th>
   </tr>
   <tr>
     <td>向量字段</td>
     <td>AUTOINDEX</td>
     <td>L2, IP, 和 COSINE</td>
   </tr>
   <tr>
     <td>VarChar 字段</td>
     <td>TRIE</td>
     <td>N/A</td>
   </tr>
   <tr>
     <td>Int8/16/32/64</td>
     <td>STL_SORT</td>
     <td>N/A</td>
   </tr>
   <tr>
     <td>Float32/64</td>
     <td>STL_SORT</td>
     <td>N/A</td>
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

## CU 容量{#cu-capacity}

请参阅[选择合适的 CU 类型](./cu-types-explained)了解更多。

## 数据导入（控制台）{#data-import-on-console}

<table>
   <tr>
     <th>文件类型</th>
     <th>本地导入</th>
     <th>对象存储导入</th>
   </tr>
   <tr>
     <td>JSON</td>
     <td>1 GB</td>
     <td>1 GB</td>
   </tr>
   <tr>
     <td>Numpy<br/></td>
     <td>暂不支持</td>
     <td>文件夹的最大大小为 100 GB，每个子文件夹的最大大小为 15 GB。</td>
   </tr>
   <tr>
     <td>Parquet</td>
     <td>暂不支持</td>
     <td>10 GB</td>
   </tr>
</table>

请参阅[准备导入数据](./prepare-source-data)了解更多。

## 数据备份（控制台）{#backup-on-console}

Zilliz Cloud 提供免费的备份存储服务，快照可保存长达30天。

## 数据恢复（控制台）{#restore-on-console}

您可以从快照中恢复 Zilliz Cloud 集群。恢复的集群和原集群应属于同一地域，并使用相同的 CU 类型。