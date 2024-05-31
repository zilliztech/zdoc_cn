---
slug: /setup-a-private-link-alicloud
beta: FALSE
notebook: FALSE
type: origin
token: OZ5Ywbjm0idqAqkOdZrcQU3Wncb
sidebar_position: 1

---

import Admonition from '@theme/Admonition';


# 创建私网连接（阿里云）

本小节主要介绍如何在您的阿里云 VPC 和您托管在阿里云上的 Zilliz Cloud 集群之间建立私网连接。

## 配置思路{#configuration-roadmap}

如需启用访问 Zilliz Cloud 集群的私网连接，您需要：

- 通过阿里云控制台在您的 VPC 中创建一个终端节点，并为其选择安全组、可用区和交换机。

- 将上述信息提交给 Zilliz Cloud 注册私网连接。Zilliz Cloud 将根据提交的信息为您的集群分配一个域名前缀。

- 前往阿里云控制台，使用该域名前缀创建一条私网解析记录。

## 前提条件{#before-you-start}

- 您已经注册 Zilliz Cloud 并创建了 Zilliz Cloud 阿里云集群。

- 您在上述 Zilliz Cloud 腾讯云集群所在云服务地域有一个 VPC。

## 配置步骤{#procedures}

本节将按照配置思路详细介绍如何为您的 Zilliz Cloud 阿里云集群创建私网连接。

### 进入 Zilliz Cloud 私网连接页面 {#enter-private-link-tab-on-zilliz-cloud}

登录Zilliz Cloud，并在左侧导航栏顶部的下拉菜单中选择合适的项目。

在项目左侧导航栏中选择**安全** > **私网连接**，并单击**创建私网连接**。

![zh-ali-create-private-link](/img/zh-ali-create-private-link.png)

您还可以在**集群详情**页面中的**连接信息**区域中单击**创建私网连接**。

![zh-ali-create-private-link-from-cluster-detail](/img/zh-ali-create-private-link-from-cluster-detail.png)

在弹出的**创建私网连接**对话框中，您需要选择**云服务提供商**和**云服务地域**，并提供**主帐号 ID**。

![zh-ali-create-private-link-window](/img/zh-ali-create-private-link-window.png)

### 获取阿里云主帐号 ID{#obtain-aliyun-account-id}

登录阿里云控制台查找主帐号 ID。

- 如果您的阿里云帐号为主帐号，可登录阿里云控制台获取主帐号 ID。

- 如果您的阿里云帐号不是主帐号，请复制您所在组织的主帐号 ID。

![zh-ali-main-account-id](/img/zh-ali-main-account-id.png)

### 设置私网连接参数 {#set-private-link-parameters}

返回 Zilliz Cloud 界面，在**创建私网连接**弹窗中，提供以下信息：

<table>
   <tr>
     <th><p><strong>参数名称</strong></p></th>
     <th><p><strong>参数描述</strong></p></th>
   </tr>
   <tr>
     <td><p><strong>云服务提供商</strong></p></td>
     <td><p>与私网连接访问目标集群所在网络保持一致。</p><p>在<strong>集群详情</strong>页面中的<strong>集群信息</strong>区域中，可查看当前集群的<strong>地域</strong>及详情。</p></td>
   </tr>
   <tr>
     <td><p><strong>云服务地域</strong></p></td>
     <td><p>与私网连接访问目标集群所在网络保持一致。</p></td>
   </tr>
   <tr>
     <td><p><strong>主帐号 ID</strong></p></td>
     <td><p>填写您在步骤 3 中获取的阿里云主帐号 ID，并单击<strong>添加</strong>提交验证。</p></td>
   </tr>
</table>

<Admonition type="info" icon="📘" title="提示">

<ul>
<li><p>请确保主账号 ID 验证通过，如下图所示。否则，在创建终端节点时，您将无法查看到 Zilliz Cloud 的终端节点服务。</p></li>
<li><p>主账号 ID 验证通过后，请不要关闭 Zilliz Cloud 窗口。</p></li>
</ul>

</Admonition>

![zh-ali-main-account-id-verified](/img/zh-ali-main-account-id-verified.png)

### 创建终端节点实例{#create-endpoint}

1. 进入[阿里云终端节点控制台](https://vpc.console.aliyun.com/endpoint)。

1. 根据步骤 1 中提供的地域，选择相同的地域。

    ![zh-ali-region](/img/zh-ali-region.png)

1. 进入**创建终端节点界面**，填写表格。以下为参数解释。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>节点名称</strong></p></td>
         <td><p>为该节点命名。</p></td>
       </tr>
       <tr>
         <td><p><strong>终端节点类型</strong></p></td>
         <td><p>选择<strong>接口终端节点</strong>。</p></td>
       </tr>
       <tr>
         <td><p><strong>终端节点服务</strong></p></td>
         <td><p>选择<strong>选择可用服务</strong>。</p><p>如果您在上一步中添加的阿里云主帐号通过验证后，可用服务列表中将展示该主帐号对应的 Zilliz Cloud 服务。</p></td>
       </tr>
    </table>

    ![zh-ali-create-endpoint](/img/zh-ali-create-endpoint.png)

1. 继续填写表格，配置**专有网络**、**安全组**、**可用区与交换机**。以下为参数解释。

    <table>
       <tr>
         <th><p><strong>专有网络</strong></p></th>
         <th><p>选择需要使用私网连接访问 Zilliz Cloud 集群的服务所在 VPC。</p></th>
       </tr>
       <tr>
         <td><p><strong>安全组</strong></p></td>
         <td><p>选择应用于该终端节点的安全组规则。如第一次使用，建议新建安全组，规划如下：</p><ul><li><p><strong>网络</strong></p><p>选择需要使用私网连接访问 Zilliz Cloud 集群的服务所在 VPC。</p></li><li><p><strong>访问规则</strong></p><p>添加一条<strong>协议类型</strong>为 <strong>TCP</strong>，<strong>端口范围</strong>为 Zilliz Cloud 集群暴露的端口，<strong>授权对象</strong>为 <strong>0.0.0.0/0</strong> 的访问规则。建议添加一条 ICMP 规则用于网络连通性排查。</p></li></ul></td>
       </tr>
       <tr>
         <td><p><strong>可用区与交换机</strong></p></td>
         <td><p>选择 Zilliz Cloud 集群所在可用区并创建默认交换机。</p><p>目前，Zilliz Cloud 集群可选可用区如下：</p><p><strong>杭州</strong></p><ul><li><p>杭州 可用区 H</p></li><li><p>杭州 可用区 J</p></li><li><p>杭州 可用区 K</p></li></ul><p><strong>北京</strong></p><ul><li><p>北京 可用区 G</p></li><li><p>北京 可用区 H</p></li><li><p>北京 可用区 I</p></li></ul><p><strong>深圳</strong></p><ul><li><p>深圳 可用区 D</p></li><li><p>深圳 可用区 E</p></li><li><p>深圳 可用区 F</p></li></ul><p>交换机配置无特殊要求，保持默认即可。</p></td>
       </tr>
    </table>

    <Admonition type="info" icon="📘" title="提示">

    <p>为了可用性，我们建议选 2 个以上<strong>可用区与交换机。</strong>但注意，阿里云会针对每个可用区额外收费，因此您需要考虑成本。</p>

    </Admonition>

    ![zh-ali-create-endpoint](/img/zh-ali-create-endpoint.png)

    安全组详情如下图所示：

    ![zh-ali-safety-group](/img/zh-ali-safety-group.png)

1. 表格填写完成后，点击创建。创建成功后的界面如下图所示。请务必保存以下信息以备后续使用：

    - **终端及节点实例ID**

    - **默认服务域名**

    ![zh-ali-safety-group](/img/zh-ali-safety-group.png)

1. 等待终端节点**状态**变为**可用**。

    <Admonition type="info" icon="📘" title="提示">

    <p>终端节点<strong>连接状态</strong>此时是<strong>已断开</strong>。需要等待下一步连接。</p>

    </Admonition>

### 创建私网连接{#create-private-link}

返回 Zilliz Cloud 界面。在创建私网连接单弹窗中输入上一步中保存的**终端及节点实例ID**。点击**创建**。

![zh-ali-enter-endpoint-id](/img/zh-ali-enter-endpoint-id.png)

此时 Zilliz Cloud 界面会出现如下提示：

![zh-ali-pending](/img/zh-ali-pending.png)

待私网连接创建成功后，Zilliz Cloud 界面如下：

![zh-ali-private-link-created](/img/zh-ali-private-link-created.png)

此时，切换至阿里云界面。可以观察到终端节点的**连接状态**变为**已连接**。

### 创建并设置私域解析{#add-private-zone-record}

1. 进入阿里云控制台[内网 DNS 解析（PrivateZone）](https://dns.console.aliyun.com/#/privateZone/list)。

    ![zh-ali-private-zone](/img/zh-ali-private-zone.png)

1. 选择**管理配置模式**。

    ![zh-ali-enter-endpoint-id](/img/zh-ali-enter-endpoint-id.png)

1. 在页面下方，点击**添加域名**。

    ![zh-ali-add-zone](/img/zh-ali-add-zone.png)

1. 填写**添加内置权威域名**表格。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>内置权威域名（Zone）</p></td>
         <td><p>请根据您的集群地域和集群 ID修改内置权威域名。以下为终端节点所在区域对应的 Zone 名称：</p><ul><li><p>杭州：<code>inxx-xxxxxxxxxxxx.ali-cn-hangzhou.vectordb.zilliz.com.cn</code></p></li><li><p>北京：<code>inxx-xxxxxxxxxxxx.ali-cn-beijing.vectordb.zilliz.com.cn</code></p></li><li><p>深圳：<code>inxx-xxxxxxxxxxxx.ali-cn-shenzhen.vectordb.zilliz.com.cn</code></p></li></ul><p>Zone 名称中的<code>inxx-xxxxxxxxxxxx</code>为您的Zilliz Cloud 阿里云集群 ID。您可参考<a href="./on-zilliz-cloud-console">Zilliz Cloud 控制台</a>查询集群 ID。</p></td>
       </tr>
       <tr>
         <td><p>子域名递归解析代理</p></td>
         <td><p>为防止无法访问公共域名，我们建议您开启此项。</p></td>
       </tr>
    </table>

    ![zh-ali-add-zone-form](/img/zh-ali-add-zone-form.png)

1. 设置私域解析的生效范围。

    ![zh-ali-select-effect-range](/img/zh-ali-select-effect-range.png)

1. 选择需要使用私网连接的 VPC。点击确定。

    ![zh-ali-select-vpc](/img/zh-ali-select-vpc.png)

1. 在风险提示弹窗中，点击继续执行操作。

    ![zh-ali-continue-operation](/img/zh-ali-continue-operation.png)

1. 设置成功后，界面如下所示：

    ![zh-ali-zone-added](/img/zh-ali-zone-added.png)

1. 添加解析。在添加域名标签下，定位对应的内置权威域名，点击右侧操作栏中的**解析记录**。

    ![zh-ali-add-dns](/img/zh-ali-add-dns.png)

1. 点击**添加记录**。

    ![zh-ali-add-record](/img/zh-ali-add-record.png)

1. 填写表格并点击**确定**。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p>记录类型</p></td>
         <td><p>请选择 <strong>CNAME</strong>。</p></td>
       </tr>
       <tr>
         <td><p>主机记录</p></td>
         <td><p>请替换为你的集群 ID。 你可在集群详情页获取集群 ID。</p></td>
       </tr>
       <tr>
         <td><p>记录值</p></td>
         <td><p>请填写在步骤5.e. 中获取的<strong>默认服务域名</strong>。</p></td>
       </tr>
    </table>

![zh-ali-add-record-form](/img/zh-ali-add-record-form.png)

1. 在**解析变更确认**页面中，点击**确定**。

    ![zh-ali-dns-change-confirm](/img/zh-ali-dns-change-confirm.png)

1. 至此，内网 DNS 解析（PrivateZone）创建成功，界面如下所示：

    ![zh-ali-dns-successful](/img/zh-ali-dns-successful.png)

### 您已成功创建私网连接{#create-private-link-successful}

