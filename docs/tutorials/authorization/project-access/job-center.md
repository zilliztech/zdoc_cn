---
title: "项目任务管理 | Cloud"
slug: /job-center
sidebar_label: "项目任务管理"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供了一个直观的任务中心页面，将同一项目下的所有历史和异步数据任务整合在一起。 | Cloud"
type: origin
token: S2tAwNfvTiRoq9kXtp9cONd6n3e
sidebar_position: 3
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 项目
  - 管理
  - 成员

---

import Admonition from '@theme/Admonition';


# 项目任务管理

Zilliz Cloud 提供了一个直观的任务中心页面，将同一项目下的所有历史和异步数据任务整合在一起。

## 查看项目任务

选择目标项目。在左侧导航栏中，点击**任务中心**。您可以看到正在执行或已完成的所有异步数据任务。

任务列表中会显示以下信息：

- 任务描述与任务类型：任务描述包含数据任务的目标和详情。任务类型包含以下几种：

    <table>
       <tr>
         <th><p><strong>任务类型</strong></p></th>
         <th><p><strong>说明</strong></p></th>
       </tr>
       <tr>
         <td rowspan="2"><p>备份</p></td>
         <td><p>为集群创建备份。</p></td>
       </tr>
       <tr>
         <td><p>为 Collection 创建备份。</p></td>
       </tr>
       <tr>
         <td rowspan="2"><p>恢复</p></td>
         <td><p>从备份恢复集群。</p></td>
       </tr>
       <tr>
         <td><p>从备份恢复 Collection。</p></td>
       </tr>
       <tr>
         <td><p>迁移</p></td>
         <td><p>将数据迁移至集群。</p><ul><li><p>迁移外部数据</p><ul><li><p>从 Elasticsearch 迁移至 Zilliz Cloud 集群</p></li><li><p>从 Milvus 迁移至 Zilliz Cloud 集群</p></li></ul></li><li><p>跨集群迁移</p><ul><li><p>从 Serverless 或 Dedicated 集群迁移至新的 Dedicated 集群</p></li><li><p>从 Dedicated 集群迁移至另一个现有的 Dedicated 集群</p></li></ul></li></ul></td>
       </tr>
       <tr>
         <td><p>导入</p></td>
         <td><p>将数据导入至 Collection。</p></td>
       </tr>
       <tr>
         <td><p>复制 Collection</p></td>
         <td><p>复制 Collection Schema 及 Collection 中所有数据。</p></td>
       </tr>
    </table>

- 任务状态：任务状态包括**成功**、**进行中**、**等待中**、**失败**和**已取消**。

- 任务 ID：数据任务的 ID。在数据任务执行过程中，如有任何问题，请[提交工单](http://support.zilliz.com.cn)并提供对应的任务 ID。

- 任务开始时间与结束时间

- 创建人：发起数据任务的项目用户。

## 查看任务详情

点击**操作**栏中的**...**，选择**查看详情**。

![view_job_details_cn](/img/view_job_details_cn.png)

## 取消任务

您可以取消**进行中**和**等待中**的任务。点击**操作**栏中的**...**，选择**取消任务**。

<Admonition type="info" icon="📘" title="说明">

<p>目前仅支持取消迁移和备份任务。</p>

</Admonition>

![cancel_job_cn](/img/cancel_job_cn.png)

## 重试失败任务

<Admonition type="info" icon="📘" title="说明">

<p>目前仅支持重试失败的导入任务。</p>

</Admonition>

如果您的数据导入任务失败，您可以点击其状态旁的 ℹ️ 图标以查看失败原因及具体的报错信息。

如果您在查看失败原因后对需要导入的数据文件进行相应调整，您可以重试导入任务。

