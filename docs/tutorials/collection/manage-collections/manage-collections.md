---
slug: /manage-collections
beta: FALSE
notebook: FALSE
type: origin
token: AtXWwXqsZiEzLvkmOJ3cua7nnic
sidebar_position: 11

---

import Admonition from '@theme/Admonition';


# 管理 Collection

本指南将介绍如何通过 Zilliz Web 控制台或 SDK 管理使用 Collection。

## Collection 数量限制{#limits-on-collections}

<table>
   <tr>
     <th><strong>集群类型</strong></th>
     <th><strong>Collection 最大数量</strong></th>
     <th><strong>描述</strong></th>
   </tr>
   <tr>
     <td>企业版集群</td>
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
     <td>Min(512 x CU 数, 65536)</td>
   </tr>
</table>

如需了解如何计算集群的已使用容量和通用容量，请查看[使用限制](/docs/limits#collections)。

## 相关文档{#contents}

了解如何通过 Web 控制台或 SDK 管理 Collection。

import DocCardList from '@theme/DocCardList';

<DocCardList />