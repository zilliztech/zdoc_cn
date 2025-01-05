---
title: "变更配置费用说明 | Cloud"
slug: /notice-on-config-changes
sidebar_label: "变更配置费用说明"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 支持您根据业务和数据量的变化灵活变更集群配置。您可以为通过修改集群 CU 规格进行扩缩容，或者增加集群 Replica 数量从而提高 QPS。 | Cloud"
type: origin
token: GMCvwBlS7io85jkiW0icumJnn6A
sidebar_position: 10
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 配置变更
  - 配置变更说明

---

import Admonition from '@theme/Admonition';


# 变更配置费用说明

Zilliz Cloud 支持您根据业务和数据量的变化灵活变更集群配置。您可以为通过修改集群 CU 规格进行扩缩容，或者增加集群 Replica 数量从而提高 QPS。

本文介绍按量付费集群和包年包月集群变更配置的费用说明。

## 按量计费集群变更配置

按量计费集群按小时收费，变更配置后按照新的配置每小时收费。

## 包年包月集群变更配置

包年包月集群当前仅支持升配，不支持降配，且按天为单位结算。以下为不同变配方式的计费说明。

### 仅升配

#### 计算公式

- 扩容

```bash
待支付订单金额 = （升配后 CU 规格 - 升配前 CU 规格）x CU 单位价格
```

- 增加 replica 数量

```bash
待支付订单金额 = （升配后 Replica 数量 - 升配前 Replica 数量）x CU 单位价格
```

公式中的 **CU 单位价格**由**集群剩余时长**和**购买时长**决定。

<table>
   <tr>
     <th><p><strong>集群剩余时长</strong></p></th>
     <th><p><strong>集群购买时长</strong></p></th>
     <th><p><strong>CU 单价</strong></p></th>
     <th><p><strong>说明</strong></p></th>
   </tr>
   <tr>
     <td rowspan="2"><p>&lt; 1 年</p></td>
     <td><p>1 年</p></td>
     <td><p>¥30/天</p></td>
     <td><p>CU 单价 = 官网按月价格 / 30 天</p></td>
   </tr>
   <tr>
     <td><p>3 年</p></td>
     <td><p>¥30/天</p></td>
     <td><p>CU 单价 = 官网按月价格 / 30 天</p></td>
   </tr>
   <tr>
     <td rowspan="2"><blockquote>  <p>= 1 年</p></blockquote></td>
     <td><p>1 年</p></td>
     <td><p>¥21/天</p></td>
     <td><p>CU 单价 = 官网按月价格 / 30 天 x 7 折</p></td>
   </tr>
   <tr>
     <td><p>3 年</p></td>
     <td><p>¥15/天</p></td>
     <td><p>CU 单价 = 官网按月价格 / 30 天 x 5 折</p></td>
   </tr>
</table>

#### **示例**

假设您购买了时长为 3 年，规格为 2 CU 的包年包月集群，您在以下时期将包年包月集群扩容至 4 CU。

- 集群剩余天数为 30 天时，待支付订单金额 =（4-2）x 30 = ¥60

- 集群剩余天数为 2 年时，待支付订单金额 =（4-2）x 15= ¥ 30

### 升配同时延长集群有效期

```bash
待支付订单金额 = （升配后新集群 CU 规格 x 新集群 Replica 数量 x 集群单位价格 x 新订阅时长 x 新折扣） - （升配前原集群 CU 规格 x 原集群 Replica 数量 x 集群单位价格 x 原集群剩余订阅时长 x 原折扣）
```

- 集群单位价格 = ¥900/月

#### 示例

假设您订阅了 3 年的包年包月集群，并在集群剩余订阅时长为 6 个月（0.5 年）时选择升配并延长集群有效期 1 年。升配前后集群配置如下：

<table>
   <tr>
     <th></th>
     <th><p>集群初始配置</p></th>
     <th><p>集群升配后配置</p></th>
   </tr>
   <tr>
     <td><p>CU 规格</p></td>
     <td><p>2 CU</p></td>
     <td><p>4 CU</p></td>
   </tr>
   <tr>
     <td><p>Replica 数量</p></td>
     <td><p>1</p></td>
     <td><p>1</p></td>
   </tr>
</table>

待支付订单金额 = （4 x 1 x 900 x 12 x 0.7）-（2 x 1 x 900 x 0.5 x 0.5）= ¥29790