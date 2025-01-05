---
title: "分析成本 | Cloud"
slug: /analyze-cost
sidebar_label: "分析成本"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 的用量页为您提供可视化的成本分析能力，支持从多个维度查看 Zilliz Cloud 按量计费集群的使用和消费情况以及包年包月集群额外产生的存储和备份费用。 | Cloud"
type: origin
token: DeRWwlqYKiH76okxiaBcVFPjnMg
sidebar_position: 9
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 用量
  - 分析成本

---

import Admonition from '@theme/Admonition';


# 分析成本

Zilliz Cloud 的用量页为您提供可视化的成本分析能力，支持从多个维度查看 Zilliz Cloud **按量计费集群**的使用和消费情况以及**包年包月集群**额外产生的存储和备份费用。

## 前提条件{#prerequisites}

您需要具备**组织管理员**或**账单管理员**权限才可以通过 Zilliz Cloud **用量**界面查看和分析成本。

## 操作步骤{#procedures}

Zilliz Cloud 提供两种用量分析的方式：

- [通过 Web 控制台](./analyze-cost#via-web-ui)：Web 控制台提供了可视化的图表，帮助您更直观地分析成本。界面上用量明细中的用量金额精度均为 **2 位小数**（例如：¥60.00）。

- [通过 RESTful API](./analyze-cost#via-restful-api)：RESTful API 提供的用量金额数据精度更高，为 **8 位小数**。（例如：¥60.00257846）

### 通过 Web 控制台{#via-web-ui}

在**账单**页面的**用量**板块，您可以查看多类维度下的 Zilliz Cloud 服务用量和成本变化趋势。

<Admonition type="info" icon="📘" title="说明">

<p>用量数据每小时更新。</p>

</Admonition>

![analyze_cost_cn](/img/analyze_cost_cn.png)

- **根据项目分析用量和成本**

    如果您根据业务或部门创建了多个项目，您可以在筛选条件中，根据项目来查看特定项目的具体用量和费用成本。

    例如您分别为研发部门和市场部门创建了 2 个项目，Default Project 和 Project_01。当您需要查看过去一个月研发部门的用量和费用时，可以在项目选择器中选中 Default Project。**用量趋势**部分的柱状图将可视化研发部门每天的用量情况变化，或者您可以通过**用量明细**部分查看更详细的数据表格。

- **根据集群分析用量和成本**

    如果您根据业务创建了多个不同的集群，您可以在筛选条件中，根据集群来查看特定集群的具体用量和费用成本。

    例如您为用户信息和订单信息分别创建了两个不同的集群，当您需要查看过去一个订单集群的用量和费用时，可以在集群选择器中选中对应的订单集群。

    此外，您也可以通过筛选集群仅查看所有按量计费集群的用量或仅查看包年包月集群额外产生的按量计费用量，

- **根据时间分析用量和成本**

    如果您需要查看某段时间内每天用量和费用成本的变化趋势，您可以在筛选条件中选择特定的时间范围。目前筛选器的默认时间跨度为 1 个月，支持最大时间跨度为 2 个月。

    例如您需要分析 2024 年 8 月整个月每天的用量和消费情况，您可以在时间选择器中选择 2024 年 8 月 1 日至 2024 年 8 月 31 日。用量趋势部分的柱状图将可视化每天的消费金额变化趋势。

- **根据计费项分析用量和成本**

    如果您需要查看某一计费项的用量和成本变化，您可以在筛选条件中选择特定计费项。可筛选的计费项包含：CU 费用、写入费用、读取费用、存储费用（Serverless）、存储费用（Dedicated）、备份费用、Pipelines 费用。

    例如，您需要分析过去一个月所有项目花费的备份费用总和时，可以在计费项筛选器中选择备份费用。用量趋势的柱状图将可视化过去一个月每天的备份费用总和。

- **根据云服务地域分析用量和成本**

    如果您在多个云服务地域部署了服务，您可以根据云服务地域来筛选。

    例如您在一个项目内，同时在阿里云华东1（杭州）和亚马逊云科技中国（宁夏）分别部署了集群。你可以筛选并查看在亚马逊云科技中国（宁夏）地区的用量和费用。

您可以根据您的分析需求，组合多种上述筛选条件，查看可视化的用量和成本数据。

### 通过 RESTful API{#via-restful-api}

通过 Zilliz Cloud 用量 API 接口 Query Org Daily Usage 获取的用量信息中，金额精度均为 8 位小数。如需对账，建议您通过 RESTful API 获取精度为 8 为小数的日用量明细。将每日用量的金额加总后，您将获取一个精度为 8 位的用量总金额，对该金额从第 3 位小数进行四舍五入后，您可以获得一个精度为 2 位小数的月用量总金额，该金额与界面上账单详情页展示的总用量金额一致。

## 常见问题{#faq}

- **Zilliz Cloud 用量趋势和明细中的金额精度为多少？**

    Zilliz Cloud 产品价格精度为小数点后 8 位。因此在计费过程中会产生小数点后 8 位的费用。Zilliz Cloud 实际和客户结算过程中会将包含 8 位小数点的费用汇总，随后根据按日汇总后金额的第 3 位小数进行四舍五入。

    在 Zilliz Cloud 界面的用量趋势和用量明细部分，展示的金额精度均为 2 位小数（例如：¥60.00）。

    ![precision_usage_cn](/img/precision_usage_cn.png)

    <include target = "indev">

    通过 Zilliz Cloud 用量 API 接口 Query Org Daily Usage 获取的用量信息中，金额精度均为 8 位小数。以下为 Query Org Daily Usage 接口的返回示例：

    ```bash
    {
        "code": 0,
        "data": {
            "list": [
                {
                    "intervalStart": "2024-01-01T00:00:00Z",
                    "intervalEnd": "2024-01-02T00:00:00Z",
                    "total": 69.59794400,
                    "currency": "RMB"
                    "results": [
                        {
                            "costType": "compute",
                            "properties": {
                                "projectId": "prj-xxxxx",
                                "regionId": "ali-cn-hangzhou",
                                "cuType": "Performance-optimized",
                                "plan": "Enterprise",
                                "clusterId": "in01-xxxxx"
                            },
                            "quantity": 55.6778,
                            "unit": "CU-hours",
                            "listPrice": {
                                "unitPrice": 1.25000000
                            },
                            "price": {
                                "unitPrice": 1.25000000
                            },
                            "amount": 69.59725000 
                        },
                        {
                            "costType": "storage",
                            "properties": {
                                "projectId": "prj-xxxxx",
                                "regionId": "ali-cn-hangzhou",
                                "cuType": "Performance-optimized",
                                "plan": "Enterprise",
                                "clusterId": "in01-xxxxx",
                            },
                            "quantity": 323,
                            "unit": "GB-hours",
                            "listPrice": {
                                "unitPrice": 0.000694
                            },
                            "price": {
                                "unitPrice": 0.000694
                            },
                            "amount": 0.00069400
                        }
                    ]
                }
            ],
            "currentPage": 1,
            "pageSize": 100,
            "total": 10000
        }
    }
    ```

    </include>