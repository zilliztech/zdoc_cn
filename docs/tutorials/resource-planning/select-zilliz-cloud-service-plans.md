---
slug: /select-zilliz-cloud-service-plans
beta: FALSE
notebook: FALSE
token: XNCIwt9i6iFgEDkEQE9cTMf8nSe
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# Zilliz Cloud 版本类型

在配置集群前，您需要先选择版本。Zilliz Cloud 各版本提供不同的服务体验、计费模型，且性能及可扩展性也都有所不同 。目前， Zilliz Cloud 共有 3 个版本可供选择，以满足多样的用户需求。

- 免费版

- 企业版

- BYOC (Bring Your Own Cloud)

3 个不同的版本为不同的用户需求及使用场景设计，您可以根据自己的需求灵活选择。

## Zilliz Cloud 集群类型{#understand-cluster-types}{#zilliz-cloud-understand-cluster-types}

本质上，Zilliz Cloud 提供两种不同的集群类型——**Serverless** 和 **Dedicated**。

|  **集群类型**       |  **描述**<br/> <br/>                 |  **资源分配**                                           |  **适用场景**                          |
| --------------- | -------------------------------- | --------------------------------------------------- | ---------------------------------- |
|  **Serverless** |  简单易用的全托管向量数据库集群                 |  - 动态卷供应（Dynamic Provisioning）<br/> <br/> - 与其他用户共享资源 |  - 向量数据库新手<br/> <br/> - 寻求省时省力的向量数据库 |
|  **Dedicated**  |  - 开放所有功能<br/> <br/> - 高可用性及数据安全保障 |  - 专有 [CU](./cu-types-explained) 资源<br/> <br/> - 最佳性能 |  - 企业用户<br/> <br/> - 严格要求性能和数据安全     |

如需深入了解集群配置，请见[免费试用](./free-trials)和 [价格计算器](./pricing-calculator)。

## 选择版本类型{#select-a-cluster-plan}{#select-a-cluster-plan}

Zilliz Cloud 提供三种版本。

|  功能特性                    |  免费版        |  企业版                                                          |  Bring Your Own Cloud (BYOC)                   |
| ------------------------ | ----------- | ------------------------------------------------------------- | ---------------------------------------------- |
|  **集群类型**                |  Serverless |  Dedicated                                                    |  Dedicated                                     |
|  **定价**                  |  免费         |  详见 [Zilliz 定价](https://zilliz.com.cn/pricing)                |  详见 [Zilliz 定价](https://zilliz.com.cn/pricing) |
|  **云服务提供上和地域**           |  阿里云华东1（杭州） |  阿里云华东1（杭州）                                                   |  阿里云、<br/> <br/>  百度智能云、<br/> <br/>  金山云、腾讯云       |
|  **CU 大小**               |  1 CU       |  最多 32 CU (支持 CU 大小包括: 1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32) |  可根据用户需求定制                                     |
|  **最多可创建 Collection 数量** |  2          |  根据 CU 大小决定                                                   |  根据 CU 大小决定                                    |
|  **私网连接**                |  不可用        |  可用                                                           |  可用                                            |
|  **备份**                  |  不可用        |  可用                                                           |  可用                                            |
|  **迁移**                  |  不可用        |  可用                                                           |  可用                                            |

### 免费版{#starter-plan}{#starter-plan}

-  适合个人开发者或测试初期。

- 至多可创建 2 个 Collection，最多可处理 50 万 768 维向量。

- 1 个免费的 Serverless 集群

### 企业版{#enterprise-plan}{#enterprise-plan}

- 专为企业用户设计，承诺每月 99.9% 正常运行时间。

- CU 大小上限为 256 CU。高扩展性，可创建上千个 CU。

- 支持高级功能（例如：私网连接、自动备份等）。

### BYOC (Bring Your Own Cloud){#byoc}{#byoc-bring-your-own-cloudbyoc}

- 支持在您自己的虚拟私有云（VPC）上部署全托管的向量数据库服务。

- 适用于高度注重数据隐私和合规的场景。

- CU 大小可达 128 CU 以上。

更多 Zilliz Cloud 版本详情，请访问[定价页面](https://zilliz.com.cn/pricing)或[联系销售](https://zilliz.com.cn/contact-sales)。

## 版本限制{#plan-limitations}{#plan-limitations}

- **免费版：**每位免费版用户只可在阿里云上创建 1 个集群，至多可创建 2 个 Collection。用户无法使用备份等高级功能。

- **企业版：**每个集群中可创建 Collection 数量取决于集群 CU 大小。

- **BYOC (Bring Your Own Cloud)：**仅适合需要 128 CU 或以上且高度注重数据隐私和合规的用户。

## 文档推荐{#related-topics}{#related-topics}

- [注册账号](./register-with-zilliz-cloud) 

