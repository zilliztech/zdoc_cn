---
slug: /release-notes-230
beta: FALSE
notebook: FALSE
token: BuuSwsbhEiIHDJkB9YSc63xAnrh
sidebar_position: 3
---

import Admonition from '@theme/Admonition';


# 版本说明书（2023/11/23）

**发布日期：2023年11月23日**

我们很高兴地宣布 Zilliz Cloud 2.3.0 的发布。此版本引入了一系列创新 Beta 特性和功能改进：

## Milvus 兼容性

此次发布兼容 **Milvus 2.2.x** 以及 **Milvus 2.3.x (Beta)**。

## 创新 Beta 特性{#innovative-beta-features}

通过我们最新的 Beta 特性，探索未来。立即升级以体验这些增强功能：

- 范围搜索

    用[范围搜索](./conduct-a-range-search)重新定义你的查询，让你为搜索设置半径。与传统的 ANN 搜索不同，范围搜索确保包括指定半径内的所有向量，提供更全面的视图。

- Upsert

    通过 [Upsert](./upsert-entities)（“更新”和“插入”的融合）轻松管理动态数据集。享受频繁变化的数据集更高的效率。

- 余弦度量类型

    体验先进的向量搜索，支持[余弦](./search-metrics-explained#cosine-similarity)、[内积](./search-metrics-explained#inner-product-ip)和[欧式距离](./search-metrics-explained#euclidean-distance-l2)。余弦度量消除了向量标准化的先决条件，简化了搜索过程。

- 访问控制

    通过 [API 密钥](./manage-api-keys)或[用户名密码身份验证](./manage-cluster-credentials-console)安全地访问专用集群和无服务器实例。

- 返回原始向量

    在[搜索参数](./search-query-and-get)中指定向量字段，以将其作为搜索结果的一部分接收。

- JSON_CONTAINS 过滤器

    使用 [JSON_CONTAINS 运算符](./search-and-query-advanced-expressions#search-and-query-with-jsoncontains)进一步细化搜索，允许你基于 JSON 字段值指定过滤条件。

- Entity 计数

    快速概览加载的[集合中的 Entity 总数](./search-and-query-advanced-expressions#use-count)，以更好地管理数据。

## 功能改进{#enhancements}

我们还实施了几项增强功能，以提升您的整体体验：

- RBAC 新角色

    授予[项目成员角色](./resource-hierarchy)给项目协作者，以更流畅的协作。

- 计费优化

    享受更高效的计费管理，流程更简化。

- 高级价格计算器

    使用[价格计算器](https://zilliz.com/pricing#calculator)，获取综合估计，结合主键、向量字段和字符串字段，以提供更准确的价格概览。

- 自助服务账户删除

    轻松删除您自己的[账户](./email-accounts#delete-your-account)或[组织](./delete-your-organization)，更好地控制您的个人资料。

- 稳定性增强

    我们解决了已知问题，以增强我们服务的可靠性。

感谢您选择 Zilliz Cloud，创新与性能的结合！

