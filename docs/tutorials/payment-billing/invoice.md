---
slug: /invoice
beta: FALSE
notebook: FALSE
type: origin
token: JTuUwoHUyiqJU6kuu30cN9ibnkh
sidebar_position: 6

---

import Admonition from '@theme/Admonition';


# 开具发票

在 Zilliz Cloud 进行现金充值或开通阿里云云市场扣费渠道后，您可以申请开具发票。具体开票方式根据您的支付方式有所不同。如果您的支付方式为现金充值，您可以直接通过 Zilliz Cloud 界面开具发票。如果您开通了阿里云云市场扣费渠道，请通过阿里云云市场申请开票。

<Admonition type="info" icon="📘" title="说明">

<p>预充值不可申请开票。《中华人民共和国发票管理办法》、《中华人民共和国发票管理办法实施细则》规定了只能针对消费者已消费过的订单开具发票。预充值和预付款并未纳入商品消费记录，不具备开具发票的条件。因此，Zilliz Cloud 只能针对您已消费过的订单开具发票。您充值的预付款余额没有消费，也没有对应的 Zilliz Cloud 的产品/服务，因此无法申请开具发票。</p>

</Admonition>

## 通过 Zilliz Cloud 开票{#invoicing-on-zilliz-cloud}

在进行现金充值后，您可以在 Zilliz Cloud 界面申请开票。当前 Zilliz Cloud 仅支持为已结清的账单开具发票，且不可重复开票。

1. 选择组织并点击左侧导航栏中的**系统设置**。

1. 打开**发票管理**页签。点击**可开票账单**。勾选您希望开具发票的账单。在底部提示栏上，您可查看已选中的开票账单数量及开票总金额。确认无误后，请点击**开票**按钮。

    ![invoicing-cn](/img/invoicing-cn.png)

1. 选择发票抬头类型。如选择个人抬头，Zilliz Cloud 仅支持开具增值税普通发票。如需开具增值税专用发票，请选择企业抬头。

1. 选择发票类型并填写所需开票信息。

    - 如选择开具增值税普通发票，相关参数请见下表。**发票抬头**和**统一社会信用代码**自动录入企业认证中的信息，且不可修改。

        <table>
           <tr>
             <th><p><strong>参数</strong></p></th>
             <th><p><strong>描述</strong></p></th>
           </tr>
           <tr>
             <td><p><strong>发票备注（可选）</strong></p></td>
             <td><p>发票备注不得超过 50 个字符。</p></td>
           </tr>
           <tr>
             <td><p><strong>发票接收邮箱</strong></p></td>
             <td><p>用于接收开票结果和发票的邮箱地址。最多可输入 3 个邮箱地址。</p></td>
           </tr>
        </table>

    - 如选择开具增值税专用发票，相关参数请见下表。**发票抬头**、**统一社会信用代码**、**注册地址**和**注册电话**自动录入企业认证中的信息，且不可修改。

        <table>
           <tr>
             <th><p><strong>参数</strong></p></th>
             <th><p><strong>描述</strong></p></th>
           </tr>
           <tr>
             <td><p><strong>开户银行</strong></p></td>
             <td><p>你开立待登记银行帐户的银行名称</p></td>
           </tr>
           <tr>
             <td><p><strong>银行帐户</strong></p></td>
             <td><p>待登记的银行帐户号码</p></td>
           </tr>
           <tr>
             <td><p><strong>发票备注（可选）</strong></p></td>
             <td><p>发票备注不得超过 50 个字符。</p></td>
           </tr>
           <tr>
             <td><p><strong>发票接收邮箱</strong></p></td>
             <td><p>用于接收开票结果和发票的邮箱地址。最多可输入 3 个邮箱地址。</p></td>
           </tr>
        </table>

1. 开票信息填写完毕并确认无误后，点击**申请开票**。

1. 我们预计在 1～3 个工作日后以邮件形式通知您开票结果。如开票成功，您可在 **Zilliz Cloud 开票成功**通知邮件中下载发票。

## 通过阿里云云市场开票{#invoicing-on-alibaba-cloud-marketplace}

如您开通了阿里云云市场扣费渠道并需要开具发票，请参考[申请发票](https://help.aliyun.com/document_detail/150571.html)。

