---
title: "管理订单 | Cloud"
slug: /manage-order
sidebar_label: "管理订单"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 控制台提供专门的订单页面，方便您统一集中管理订单。 | Cloud"
type: origin
token: FJU5wklQuiAJASkHAFlcQShDn9e
sidebar_position: 7
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 订单
  - 支付方式

---

import Admonition from '@theme/Admonition';


# 管理订单

Zilliz Cloud 控制台提供专门的订单页面，方便您统一集中管理订单。

如需管理订单，您的角色需要为**组织管理员**或**项目管理员**。

## 订单概览{#order-overview}

目前，仅创建包年包月集群、为包年包月集群升配会生成订单。以下为订单示例。

![order-details-cn](/img/order-details-cn.png)

**订单中仅包含包年包月集群的 CU 费用，需要一次性全部付清**。只有在您付清订单金额后，系统才会开始创建包年包月集群或开始为包年包月集群进行升配。**如果在后续使用包年包月的过程中产生存储、备份的费用，会合并至按量计费部分的费用中。**这部分费用明细需要前往账单中查看。有关账单的详细信息，请参考[了解账单](./view-invoice)。

当前 Zilliz Cloud 中仅会生成两种类型的订单：

<table>
   <tr>
     <th><p><strong>订单类型</strong></p></th>
     <th><p><strong>说明</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>新购</strong></p></td>
     <td><p>创建包年包月集群后会生成类型为“新购”的订单。</p></td>
   </tr>
   <tr>
     <td><p><strong>升配</strong></p></td>
     <td><p>为包年包月集群进行扩容或增加包年包月集群 Replica 数量后会生成类型为“升配”的订单。</p></td>
   </tr>
</table>

订单会有以下几种状态：

<table>
   <tr>
     <th><p><strong>订单状态</strong></p></th>
     <th><p><strong>说明</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>已支付</strong></p></td>
     <td><p>订单金额已全部付清。系统将开始为您创建包年包月集群或开始为已创建的包年包月集群进行升配。</p></td>
   </tr>
   <tr>
     <td><p><strong>未支付</strong></p></td>
     <td><p>订单金额未付清。需要在订单生成 7 天内完成支付。若未及时在订单生成 7 天内完成支付，订单状态将变为“已超时”。</p></td>
   </tr>
   <tr>
     <td><p><strong>已超时</strong></p></td>
     <td><p>订单在生成后 7 天内未完成支付，被自动取消。状态为“已超时”的订单无法继续支付。</p></td>
   </tr>
   <tr>
     <td><p><strong>已取消</strong></p></td>
     <td><p>订单被用户手动取消。状态为“已取消”的订单无法再继续支付。</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="说明">

<p>订单完成支付后，将归入支付月份的当月账单。</p>

</Admonition>

## 支付订单{#pay-order}

支付订单前，请先确保组织现金余额充足。若现金余额不足，请先充值。详情请参考[现金充值（对公转账）](./advance-pay)。包年包月集群订单暂不支持使用优惠券抵扣。

请前往**费用中心>订单**页面。在目标订单的订单状态栏中点击**支付**按钮。

![pay-order-cn](/img/pay-order-cn.png)

## 下载订单{#download-order}

如需下载订单，请前往**费用中心>订单**页面。在目标订单的操作栏中点击**下载**按钮。

## 取消订单{#cancel-order}

订单取消后将无法恢复或进行支付，请谨慎操作。

如需取消订单，请前往**费用中心>订单**页面。在目标订单的操作下拉菜单中点击**取消订单**。

![cancel-order-cn](/img/cancel-order-cn.png)

在对话框中点击**确定取消**。

![confirm-cancel-order-cn](/img/confirm-cancel-order-cn.png)

## 常见问题{#faqs}

- **为什么购买了预付费的包年包月集群，还有后付费账单产生？**

    包年包月集群有部分服务对应的计费项是按量付费的，例如存储、备份服务。例如，您购买了包年包月集群后，使用备份功能时仍将产生备份存储的按量付费账单。

- **充值后，订单为何还是未支付状态？**

    充值只是增加组织的现金余额。充值后，需要在**费用中心-订单**页面，找到未支付订单进行支付。

- **未支付订单的有效期是多久？**

    下单后，您有 7 天的支付时间，超时未支付，订单将被自动取消。

- **自动取消的订单能否恢复？**

    订单超时未支付时，系统将自动取消订单。自动取消的订单无法恢复或继续支付，请重新提交订单。

- **订单提交失败怎么办？**

    订单提交失败不会生成订单。如遇订单提交失败，请[提交工单](http://support.zilliz.com.cn)。