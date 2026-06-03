---
title: "版本说明书（2026/06） | Cloud"
slug: /release-notes-2606
sidebar_key: release-notes-2606
sidebar_label: "2026/06"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: FALSE
notebook: FALSE
description: "版本说明书（2026/06） | Cloud"
type: origin
token: IEqzwRohQiApM6kTrMLccyWcncb
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 版本说明书

---

import Admonition from '@theme/Admonition';


import Grid from '@site/src/components/Grid';

# 版本说明书（2026/06）

<Grid columnSize="2" widthRatios="20,80">

    <div>

        **2026-06-03**

    </div>

    <div>

        ## Nullable Vector（向量字段可空）\{#nullable-vector}

        向量字段现已支持 `nullable` 属性，这意味着您可以为已有 Collection 新增向量字段——这是众多用户期待已久的能力。借助 Nullable Vector，您可以在 Collection 创建后动态演进 Schema、按需添加向量列，然后在 Collection 正常运行的同时逐步回填 embedding 数据。

        <Admonition type="info" icon="📘" title="说明">

        Nullable Vector 需要 Serving Cluster 升级至最新的 Milvus 2.6.x 版本。On-Demand Cluster 运行的 Milvus 3.0.x 已支持该功能。未升级至最新版本的 Serving Cluster 不支持 Nullable 向量字段。

        </Admonition>

        该能力覆盖全部六种向量类型——`FLOAT_VECTOR`、`FLOAT16_VECTOR`、`BFLOAT16_VECTOR`、`INT8_VECTOR`、`BINARY_VECTOR` 及 `SPARSE_FLOAT_VECTOR`。主要特性：

        - **为已有 Collection 添加向量字段** — 通过 `AddCollectionField` 在线新增可空向量列，无需重建数据。现有实体的新向量字段初始为 NULL，可随后增量回填。

        - **搜索自动跳过** — NULL 向量在索引构建和搜索中会被自动跳过，不影响召回质量。

        - **近零存储开销** — NULL 向量几乎不占用存储空间，适合存储尚无 embedding 的实体。

        - **全流程覆盖** — Nullable Vector 已覆盖创建 Collection、Add Field、数据预览、Import、备份恢复及 Migration 等流程。

        更多详情，请参考 [Nullable 属性](./nullable-fields) 及 为已有 Collection 添加字段。

        ## 功能增强（Enhancements）\{#enhancements}

        - **按需计算支持私网连接（Private Endpoint）** — On-Demand Compute 现已支持 Private Endpoint，可通过私有网络安全访问按需搜索工作负载。设置流程与 Serving Cluster 一致。更多详情，请参考 [配置 Private Endpoint](./setup-a-private-link-alicloud)。

        - **数据预览增强** — 数据预览页面现已支持 Upsert 就地编辑单条记录、一键插入 10、50 或 100 条样例记录，以及无限翻页流畅浏览大规模数据集。

        - **创建 Collection：字段配置重新设计** — 更直观的字段配置布局，使 Schema 设置更快捷。更多详情，请参考[管理 Collection（控制台）](./manage-collections-console)中的“创建 Collection”-“Collection Schema”章节。

    </div>

</Grid>

