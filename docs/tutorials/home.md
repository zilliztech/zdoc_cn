---
title: "首页 | Cloud"
slug: /home
sidebar_label: "首页"
beta: FALSE
notebook: FALSE
description: "此页为 Zilliz Cloud 开发者中心的首页。 | Cloud"
type: origin
token: I5PAwH8MFi67Myky6EYcAxuVnNe
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 首页

hide_title: true
hide_table_of_contents: true
---

import Admonition from '@theme/Admonition';

import Hero from '@site/src/components/Hero';
import Bars from '@site/src/components/Bars';
import Blocks from '@site/src/components/Blocks';
import Cards from '@site/src/components/Cards';
import Stories from '@site/src/components/Stories';
import Banner from '@site/src/components/Banner';



<Hero>

# 欢迎来到 Zilliz Cloud 开发者中心!

Zilliz Cloud 提供完全托管的 Milvus 服务，简化您的向量检索应用的部署和扩缩容流程，并提供相应的安全保障，从而将您从复杂运维流程中解放出来。[了解更多](./get-started)。

![Sj6TwtVo7hurv4bg53Nc9nHQnmg](/img/Sj6TwtVo7hurv4bg53Nc9nHQnmg.png)

</Hero>

<Bars>

Zilliz Cloud 提供如下版本供您订阅：

- [Free](./free-trials)

- [Serverless](./select-zilliz-cloud-service-plans)

- [Dedicated](./select-zilliz-cloud-service-plans)

- [BYOC](https://zilliz.com.cn/contact-sales)

[不清楚如何选择合适的版本？](./select-zilliz-cloud-service-plans)

</Bars>

<Stories>

# 在 Zilliz Cloud 上使用您的数据

## 使用自带向量数据

1. 创建并连接您的 Zilliz Cloud 集群。

    您需要[创建一个集群](./create-cluster)，并为您分配合适的计算和存储资源，然后[连接这个集群](./connect-to-cluster)。

1. 创建 Collection。

    Collection 是一个二维数据表，拥有固定的列数和可变行数。您需要在集群中[创建一个 Collection](./manage-collections-sdks) 来存放您的数据。

1. 导入数据。

    您可以选择从本地文件或您的对象存储桶中[导入数据](./import-data)。

1. 执行向量相似性搜索。

    [向量相似性搜索](./single-vector-search)可以帮助您发现与您的查询向量最相似的搜索结果。

## 从其它数据源迁移数据

1. 连接到您的数据源

    Zilliz Cloud 支持为数众多的数据源。您可以选择从 Pinecone, Qdrant, Elasticsearch, PostgreSQL 等数据源[迁移您的数据到 Zilliz Cloud](./migrations)。

1. 配置数据源及目标集群。

    检查您的数据源信息，并指定迁移的目标集群。

1. 检查字段映射关系。

    设置并检查数据源表字段和目标 Collection 字段间的映射关系。

## 备份与恢复

1. 为您的集群或 Collection 创建备份。

    备份为目标集群或 Collection 在某个时点的数据拷贝。您可以[手动创建备份](./create-snapshot)，也可以让 Zilliz Cloud 按照您的要求[自动为您创建备份](./schedule-automatic-backups)。

1. （可选）导出备份到您的对象存储。

    您可以将您备份好的数据导入到阿里云对象存储。

1. 恢复数据。

    您可以在系统错误或数据丢失时选择相应的备份[恢复您的数据](./restore-from-snapshot)。

</Stories>

<Cards>

# 深入了解 Zilliz Cloud

- [监控与告警 (Monitoring & Alerts)](./metrics-and-alerts)

    监控您的集群并及时获得相关告警。

- [访问控制 (Access Control)](./access-control)

    细粒度的访问控制，保护您的数据安全。

- [私网连接 (Private Networking)](./setup-a-private-link)

    使用私网连接连接您的集群，提升数据安全。

- break

- [支付与账单 (Billing)](./payment-billing)

    用多少，付多少。没有前置费用。

- [第三方集成 (Integrations)](https://zilliz.com/learn/milvus-notebooks)

    在您现有的技术栈和工作流中集成 Zilliz Cloud。

</Cards>

<Blocks>

# 使用您熟悉的编程语言

- [Python](/reference/python)

- [Java](/reference/java)

- [Go](/reference/go)

- [Node.js](/reference/nodejs)

- [RESTful API](/reference/restful)

</Blocks>

<Banner bannerText="仍旧无法找您您需要的信息？" bannerLinkText="试试 Ask AI" />