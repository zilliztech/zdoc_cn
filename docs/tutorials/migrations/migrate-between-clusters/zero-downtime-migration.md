---
title: "在线迁移 | Cloud"
slug: /zero-downtime-migration
sidebar_label: "在线迁移"
beta: PRIVATE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "在线迁移（Zero Downtime Migration）确保数据库服务在整个迁移过程中保持正常运行，提供不中断的数据库访问。迁移过程包括以下阶段： | Cloud"
type: origin
token: Ih3LwgtTQihpKnkTEXoci6oun2e
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 迁移
  - 集群
  - 在线

---

import Admonition from '@theme/Admonition';


import Supademo from '@site/src/components/Supademo';

# 在线迁移

在线迁移（Zero Downtime Migration）确保数据库服务在整个迁移过程中保持正常运行，提供不中断的数据库访问。迁移过程包括以下阶段：

1. **初始化（Initialization）**：选择源集群并创建新的目标集群。

1. **迁移（Migration）**：迁移已有数据并同步增量数据。

1. **最终切换（Finalization）**：当数据同步延迟小于 10 秒时，停止同步并切换至目标集群。

![M7ndwY8wSh2VKWb0kORcVhCCnae](/img/M7ndwY8wSh2VKWb0kORcVhCCnae.png)

<Admonition type="info" icon="📘" title="说明">

<p>在线迁移目前处于<strong>内测</strong>（Private Preview）阶段。如需申请使用权限或了解相关费用，请联系 <a href="https://support.zilliz.com.cn/hc/zh-cn/requests/new">Zilliz Cloud 支持团队</a>。</p>

</Admonition>

## 迁移能力\{#migration-capabilities}

### 集群兼容性\{#cluster-compatibility}

下表列出不同集群类型的迁移能力限制：

<table>
   <tr>
     <th><p>源集群</p></th>
     <th><p>目标集群</p></th>
     <th><p>迁移范围</p></th>
   </tr>
   <tr>
     <td><p>Dedicated</p></td>
     <td><p>新建 Dedicated 集群</p></td>
     <td><p>迁移源集群所有数据库（不支持部分数据库迁移）</p></td>
   </tr>
   <tr>
     <td><p>Serverless / Free</p></td>
     <td><p>新建 Dedicated 集群</p></td>
     <td><p>迁移源集群单个数据库（Serverless / Free集群最多仅含1个数据库）</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<ul>
<li>目标集群类型不得低于源集群（即必须相同或更高）</li>
</ul>

</Admonition>

### 迁移范围\{#migration-scope-options}

<table>
   <tr>
     <th><p>迁移类型</p></th>
     <th><p>描述</p></th>
     <th><p>适用场景</p></th>
   </tr>
   <tr>
     <td><p>同一项目内迁移</p></td>
     <td><p>相同 Zilliz Cloud 项目中的集群间迁移</p></td>
     <td><p>集群升级、性能优化、数据整合</p></td>
   </tr>
   <tr>
     <td><p>跨项目/组织迁移</p></td>
     <td><p>不同 Zilliz Cloud 项目或组织间的集群迁移</p></td>
     <td><p>公司合并、部门移交、多租户</p></td>
   </tr>
</table>

### 直接数据迁移\{#direct-data-transfer}

离线迁移在 Zilliz Cloud 集群间执行直接数据复制，具有以下特征：

- Schema 保留：源数据结构原样转移至目标集群

- 字段不可修改：迁移过程中无法重命名字段、修改数据类型或调整字段属性

- 自动索引：目标集群的向量字段将自动创建 `AUTOINDEX`

### 限制说明\{#limits}

- 迁移期间禁止在源集群执行以下操作：
AlterCollection, AlterCollectionField, CreateAlias, DropAlias, AlterAlias, RenameCollection, AlterDatabase, Import

- 进行中的迁移任务不可取消（该功能将在未来版本开放）

- 数据同步停止到集群切换完成需约 10 秒服务中断

## 开始前\{#before-you-start}

开始离线迁移前需满足：

### 通用要求\{#general-requirements}

<table>
   <tr>
     <th><p>要求项</p></th>
     <th><p>详细说明</p></th>
   </tr>
   <tr>
     <td><p>用户权限</p></td>
     <td><p>需具备组织管理员或项目管理员角色</p></td>
   </tr>
   <tr>
     <td><p>源集群访问</p></td>
     <td><p>源集群必须可通过公网访问</p></td>
   </tr>
   <tr>
     <td><p>目标集群容量</p></td>
     <td><p>需预留足够 CU 容纳源数据（使用 <a href="https://zilliz.com.cn/pricing#calculator">CU 计算器</a>预估容量）</p></td>
   </tr>
</table>

### 跨项目/组织迁移附加要求\{#cross-project-or-organization-migration-requirements}

<table>
   <tr>
     <th><p>要求项</p></th>
     <th><p>详细说明</p></th>
   </tr>
   <tr>
     <td><p>连接凭证</p></td>
     <td><p>需提供源集群的公网 Endpoint、API 密钥或用户名密码</p></td>
   </tr>
   <tr>
     <td><p>网络连通性</p></td>
     <td><p>目标组织需能访问源集群网络</p></td>
   </tr>
</table>

## 操作指南\{#getting-started}

The zero downtime migration process consists of three main phases that require your attention and action:

### 阶段 1: 初始化\{#initialize}

以下演示如何初始化迁移任务：

<Supademo id="cmbooxr7ca71usn1r0lv4vx4t" title="Zilliz Cloud - 初始化在线迁移 Demo" />

点击**迁移**后，源集群将进入**锁定**状态（迁移期间不可删除）。

### 阶段 2: 监控\{#monitor}

启动迁移后，您需在目标集群详情页主动监控进度：

<Supademo id="cmba5mvlu1g20sn1rruotossj" title="Zilliz Cloud - 监控在线迁移 Demo" />

**阶段 1：创建新集群并迁移存量数据**

此阶段将现有数据从源集群迁移到目标集群。持续时间取决于传输的数据量，对于大型数据集可能需要数小时。

<Admonition type="info" icon="📘" title="说明">

<p>如果过程需要较长时间，您可以离开此页面并处理其他任务。之后您可以随时返回，继续监控增量数据同步的进度。</p>

</Admonition>

**阶段 2：同步增量数据**

在此阶段，系统会持续同步插入到源集群中的新数据到目标集群。目标集群将显示**同步中**状态，表示不接受外部数据写入。在此阶段，请按照以下步骤操作：

1. **监控数据同步延时**：

    - 您可以追踪**数据同步延时**（秒）。此指标表示在增量同步期间，源集群中最新数据与目标集群之间的时间差。

    - 当同步延时小于 10 秒时，我们会向您发送邮件通知，提示您可以停止数据同步。

    - **注意**：如果在合理等待时间后，数据同步延时始终未低于 10 秒，请联系 [Zilliz Cloud 支持团队](https://zilliz.com.cn/contact-sales)。

1. **停止数据同步**

    - 在继续之前，请停止所有对源集群的写入，并计划约 10 秒的停机时间。

    - 当**数据同步延时**达到可接受阈值时，点击**停止数据同步**，并通过勾选复选框确认：**我确认已停止向源集群中写入数据**。

    <Admonition type="info" icon="📘" title="说明">

    <p>如果您没有手动停止数据同步，Zilliz Cloud 会继续同步最多 7 天。超过这一期限后，为避免资源浪费，系统会自动停止同步，从而导致迁移任务失败。</p>

    </Admonition>

### 阶段 3: 切换\{#switch}

收到时延 < 10 秒的邮件后，按[连接集群](./connect-to-cluster)指南切换至目标集群。

<Admonition type="info" icon="📘" title="Notes">

<ul>
<li><p>迁移后源集群不会自动删除（建议保留至数据验证完成）。</p></li>
<li><p>迁移后的 Collection 无法立即执行 Search/Query，您必须在 Zilliz Cloud 中手动 Load Collection 以启用相关功能。操作详情见 <a href="./load-release-collections">Load 和 Release</a>。</p></li>
</ul>

</Admonition>