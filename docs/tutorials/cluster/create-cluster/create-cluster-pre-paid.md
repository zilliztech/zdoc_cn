---
title: "创建包年包月集群 | Cloud"
slug: /create-cluster-pre-paid
sidebar_label: "创建包年包月集群"
beta: FALSE
notebook: FALSE
description: "包年包月集群采用预付费的计费方式，即先付费后使用，按照订单的购买时长进行结算。包年包月集群一般适用于资源需求相对稳定的长期业务。购买包年包月集群可享受折扣，且购买时长越长，折扣越大。本文介绍如何在 Zilliz Cloud 创建和管理包年包月的 Dedicated 集群。如需了解包年包月集群使用过程中可能会额外产生的费用以及计费规则，请参考了解账单。 | Cloud"
type: origin
token: RY1swXlbQilxR3k42SdczdL0ndc
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 创建集群
  - 创建包年包月集群
  - 包年包月

---

import Admonition from '@theme/Admonition';


# 创建包年包月集群

包年包月集群采用预付费的计费方式，即先付费后使用，按照订单的购买时长进行结算。包年包月集群一般适用于资源需求相对稳定的长期业务。购买包年包月集群可享受折扣，且购买时长越长，折扣越大。本文介绍如何在 Zilliz Cloud 创建和管理包年包月的 Dedicated 集群。如需了解包年包月集群使用过程中可能会额外产生的费用以及计费规则，请参考[了解账单](./view-invoice)。

## 前提条件{#Prerequisites}

- 您具备**组织管理员**或**项目管理员**权限。

- 您的组织已完成[企业认证](./enterprise-certification)。

## 创建包年包月集群

![Oeusw9TnGhQfe0bLWcGcQoaZn5f](/img/Oeusw9TnGhQfe0bLWcGcQoaZn5f.png)

上图展示了创建包年包月集群的主要流程和步骤。以下为具体操作说明。

### 步骤 1. 配置包年包月集群

1. 登录 Zilliz Cloud。在合适的项目下点击 **+ 创建集群**。

    ![KViKb8FAYoEzQHxJPyhcFAIBn5Z](/img/KViKb8FAYoEzQHxJPyhcFAIBn5Z.png)

1. 选择 **Dedicated** 版本并配置集群。目前仅 Dedicated 集群支持包年包月的计费方式。

    ![Wwe6bCy6doclTkxRVFlch0FtnBf](/img/Wwe6bCy6doclTkxRVFlch0FtnBf.png)

    <table>
       <tr>
         <th><p><strong>配置项</strong></p></th>
         <th><p><strong>说明</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>集群名称</strong></p></td>
         <td><p>请输入集群的名称。Zilliz Cloud 会提供随机的默认名称，您可按需修改集群名称。</p></td>
       </tr>
       <tr>
         <td><p><strong>云服务提供商和地域</strong></p></td>
         <td><p>请选择集群部署的云服务提供商和地域。所有可选择云服务提供商和地域请参考 <a href="./cloud-providers-and-regions">云服务提供商和地域</a>。</p></td>
       </tr>
       <tr>
         <td><p><strong>计费方式</strong></p></td>
         <td><p>请选择包年包月作为计费方式。</p><p>如需创建按量计费集群，请参考<a href="./create-cluster-on-demand">创建按量计费集群</a></p></td>
       </tr>
       <tr>
         <td><p><strong>购买时长</strong></p></td>
         <td><p>请选择包年包月集群的购买时长。</p><ul><li><p>1 年：享受 7 折优惠</p></li><li><p>3 年：享受 5 折优惠</p></li></ul></td>
       </tr>
       <tr>
         <td><p><strong>CU 类型和规格</strong></p></td>
         <td><p>集群需要使用的 CU 类型及数量。</p><p>界面上提供 CU 类型的简要介绍，想了解更多关于 CU 选型的相关内容，请参考<a href="./cu-types-explained">选择合适的 CU 类型</a>。</p><p>集群需要的 CU 规格由您的数据量决定，欢迎使用<a href="https://zilliz.com.cn/pricing#calculator">价格计算器</a>预估所需 CU 数量。</p></td>
       </tr>
       <tr>
         <td><p><strong>云备份（可选）</strong></p></td>
         <td><p>请按需决定是否开启云备份。开启后，会为该集群定期自动创建备份，可有效保护数据。开启云备份会产生备份费用。</p></td>
       </tr>
    </table>

1. 检查配置并点击**创建**。

1. 阅读并同意【购买须知】。

    ![BSO1bUpzMosxzGxXFTNcjF7NnGf](/img/BSO1bUpzMosxzGxXFTNcjF7NnGf.png)

### 步骤 2. 支付订单

完成步骤 1 后，Zilliz Cloud 将生成一份类型为**新购**的**待支付**订单。请检查订单内容并及时完成支付。

![VgbdbtGxJoEzb4xOgNtcdD5xnCb](/img/VgbdbtGxJoEzb4xOgNtcdD5xnCb.png)

<Admonition type="info" icon="📘" title="说明">

<p>如果您的组织现金余额不足，请先进行现金充值（对公转账）。详情请见<a href="./advance-pay">现金充值（对公转账）</a>。</p>
<p>充值成功后，您可以前往<strong>费用中心>订单</strong>页支付订单。详情请见<a href="./manage-order">管理订单</a>。</p>
<p>订单生成后 7 天内未完成支付，系统将自动取消订单。如仍需创建包年包月集群，请重新完成步骤 1 的操作并支付新订单。</p>

</Admonition>

### 步骤 3. 等待集群创建成功

订单支付成功后，Zilliz Cloud 会开始自动为您创建包年包月集群，您将看到以下界面。请及时下载和安全保存集群用户名与密码。

![SDccbRTG3o9ooQxAoujcUep8nBM](/img/SDccbRTG3o9ooQxAoujcUep8nBM.png)

创建集群的过程大约需要 10 分钟，请您耐心等待。当集群状态变为**运行中**时，代表已成功创建包年包月集群。您可以继续[连接集群](./connect-to-cluster)或在集群中[创建 Collection](./manage-collections-sdks)。

## 管理包年包月集群

下表展示了您可以对包年包月集群进行的管理操作。

<table>
   <tr>
     <th><p><strong>操作</strong></p></th>
     <th><p><strong>是否支持</strong></p></th>
     <th><p><strong>说明</strong></p></th>
   </tr>
   <tr>
     <td><p>挂起集群</p></td>
     <td><p>✖️</p></td>
     <td><p>包年包月集群不可挂起。</p></td>
   </tr>
   <tr>
     <td><p>重命名集群</p></td>
     <td><p>✔️</p></td>
     <td><p>在集群详情页的右上角，在操作下拉菜单中选择重命名。输入新名称名点击保存。</p></td>
   </tr>
   <tr>
     <td><p>删除集群</p></td>
     <td><p>✖️</p></td>
     <td><p>包年包月集群到期前不可自行删除。</p></td>
   </tr>
   <tr>
     <td><p>连接集群</p></td>
     <td><p>✔️</p></td>
     <td><p>详情请见<a href="./connect-to-cluster">连接集群</a></p></td>
   </tr>
   <tr>
     <td><p>修改集群版本</p></td>
     <td><p>✖️</p></td>
     <td><p>仅 Dedicated 版本支持包年包月的计费模式。创建包年包月集群后不可修改集群版本类型。</p></td>
   </tr>
   <tr>
     <td><p>修改集群 CU 类型</p></td>
     <td><p>✖️</p></td>
     <td><p>包年包月集群不可修改集群 CU 类型。如有任何问题，请<a href="http://support.zilliz.com.cn">联系我们</a>。</p></td>
   </tr>
   <tr>
     <td><p>管理集群容量</p></td>
     <td><p>✔️</p></td>
     <td><ul><li><p>支持集群扩容</p></li><li><p>不支持集群缩容</p></li><li><p>不支持弹性伸缩。</p><p>详情请见<a href="./scale-cluster">集群扩缩容</a>。</p></li></ul></td>
   </tr>
   <tr>
     <td><p>管理集群 Replica</p></td>
     <td><p>✔️</p></td>
     <td><p>仅支持增加集群 Replica 数量，暂不支持减少 Replica 数量。</p><p>详情请见<a href="./manage-replica">管理 Replica</a>。</p></td>
   </tr>
   <tr>
     <td><p>备份恢复</p></td>
     <td><p>✔️</p></td>
     <td><p>当前仅支持为包年包月集群创建备份。创建备份会额外产生费用，按量计费。详情请见<a href="./view-invoice">了解账单</a>。</p><p>如需恢复备份，请<a href="http://support.zilliz.com.cn">联系我们</a>。</p></td>
   </tr>
   <tr>
     <td><p>集群续订</p></td>
     <td><p>✔️</p></td>
     <td><p>当前您只可以在集群升配（扩容、增加 Replica 数量）的同时进行续订操作。详情请见<a href="./scale-cluster">集群扩缩容</a>和<a href="./manage-replica">管理 Replica</a>。</p></td>
   </tr>
   <tr>
     <td><p>退订集群</p></td>
     <td><p>✖️</p></td>
     <td><p>不支持</p></td>
   </tr>
</table>

## 常见问题

- **为什么购买了预付费的包年包月集群，还有后付费账单产生？**

    包年包月集群有部分服务对应的计费项是按量付费的，例如存储、备份服务。例如，您购买了包年包月集群后，使用备份功能时仍将产生备份存储的按量付费账单。

