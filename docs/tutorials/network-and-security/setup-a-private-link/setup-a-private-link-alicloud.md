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

在项目左侧导航栏中选择__安全__ > __私网连接__，并单击__创建私网连接__。

![zh-ali-create-private-link](/img/zh-ali-create-private-link.png)

您还可以在__集群详情__页面中的__连接信息__区域中单击__创建私网连接__。

![zh-ali-create-private-link-from-cluster-detail](/img/zh-ali-create-private-link-from-cluster-detail.png)

在弹出的__创建私网连接__对话框中，您需要选择__云服务提供商__和__云服务地域__，并提供__主帐号 ID__。

![zh-ali-create-private-link-window](/img/zh-ali-create-private-link-window.png)

### 获取阿里云主帐号 ID{#obtain-aliyun-account-id}

登录阿里云控制台查找主帐号 ID。

- 如果您的阿里云帐号为主帐号，可登录阿里云控制台获取主帐号 ID。

- 如果您的阿里云帐号不是主帐号，请复制您所在组织的主帐号 ID。

![zh-ali-main-account-id](/img/zh-ali-main-account-id.png)

### 设置私网连接参数 {#set-private-link-parameters}

返回 Zilliz Cloud 界面，在__创建私网连接__弹窗中，提供以下信息：

|  __参数名称__   |  __参数描述__                                                                 |
| ----------- | ------------------------------------------------------------------------- |
|  __云服务提供商__ |  与私网连接访问目标集群所在网络保持一致。<br/> 在__集群详情__页面中的__集群信息__区域中，可查看当前集群的__地域__及详情。 |
|  __云服务地域__  |  与私网连接访问目标集群所在网络保持一致。                                                     |
|  __主帐号 ID__ |  填写您在步骤 3 中获取的阿里云主帐号 ID，并单击__添加__提交验证。                                    |

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

1. 进入__创建终端节点界面__，填写表格。以下为参数解释。

    |  __参数__     |  __描述__                                                                          |
    | ----------- | -------------------------------------------------------------------------------- |
    |  __节点名称__   |  为该节点命名。                                                                         |
    |  __终端节点类型__ |  选择__接口终端节点__。                                                                   |
    |  __终端节点服务__ |  选择__选择可用服务__。<br/> 如果您在上一步中添加的阿里云主帐号通过验证后，可用服务列表中将展示该主帐号对应的 Zilliz Cloud 服务。 |

    ![zh-ali-create-endpoint](/img/zh-ali-create-endpoint.png)

1. 继续填写表格，配置__专有网络__、__安全组__、__可用区与交换机__。以下为参数解释。

    |  __专有网络__             |  选择需要使用私网连接访问 Zilliz Cloud 集群的服务所在 VPC。                                                                                                                                                                                                                                                                                 |
    | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |  __安全组__              |  选择应用于该终端节点的安全组规则。如第一次使用，建议新建安全组，规划如下：<br/> - __网络__<br/>     选择需要使用私网连接访问 Zilliz Cloud 集群的服务所在 VPC。<br/> - __访问规则__<br/>     添加一条__协议类型__为 __TCP__，__端口范围__为 Zilliz Cloud 集群暴露的端口，__授权对象__为 __0.0.0.0/0 __的访问规则。建议添加一条 ICMP 规则用于网络连通性排查。                                                                   |
    |  __可用区与交换机__<br/>  |  选择 Zilliz Cloud 集群所在可用区并创建默认交换机。<br/> 目前，Zilliz Cloud 集群可选可用区如下：<br/> __杭州__<br/> - 杭州 可用区 H<br/> - 杭州 可用区 J<br/> - 杭州 可用区 K<br/> __北京__<br/> - 北京 可用区 G<br/> - 北京 可用区 H<br/> - 北京 可用区 I<br/> __深圳__<br/> - 深圳 可用区 D<br/> - 深圳 可用区 E<br/> - 深圳 可用区 F<br/> 交换机配置无特殊要求，保持默认即可。 |

    <Admonition type="info" icon="📘" title="提示">

    <p>为了可用性，我们建议选 2 个以上<strong>可用区与交换机。</strong>但注意，阿里云会针对每个可用区额外收费，因此您需要考虑成本。</p>

    </Admonition>

    ![zh-ali-create-endpoint](/img/zh-ali-create-endpoint.png)

    安全组详情如下图所示：

    ![zh-ali-safety-group](/img/zh-ali-safety-group.png)

1. 表格填写完成后，点击创建。创建成功后的界面如下图所示。请务必保存以下信息以备后续使用：

    - __终端及节点实例ID__

    - __默认服务域名__

    ![zh-ali-safety-group](/img/zh-ali-safety-group.png)

1. 等待终端节点__状态__变为__可用__。

    <Admonition type="info" icon="📘" title="提示">

    <p>终端节点<strong>连接状态</strong>此时是<strong>已断开</strong>。需要等待下一步连接。</p>

    </Admonition>

### 创建私网连接{#create-private-link}

返回 Zilliz Cloud 界面。在创建私网连接单弹窗中输入上一步中保存的__终端及节点实例ID__。点击__创建__。

![zh-ali-enter-endpoint-id](/img/zh-ali-enter-endpoint-id.png)

此时 Zilliz Cloud 界面会出现如下提示：

![zh-ali-pending](/img/zh-ali-pending.png)

待私网连接创建成功后，Zilliz Cloud 界面如下：

![zh-ali-private-link-created](/img/zh-ali-private-link-created.png)

此时，切换至阿里云界面。可以观察到终端节点的__连接状态__变为__已连接__。

### 创建并设置私域解析{#add-private-zone-record}

1. 进入阿里云控制台[内网 DNS 解析（PrivateZone）](https://dns.console.aliyun.com/#/privateZone/list)。

    ![zh-ali-private-zone](/img/zh-ali-private-zone.png)

1. 选择__管理配置模式__。

    ![zh-ali-enter-endpoint-id](/img/zh-ali-enter-endpoint-id.png)

1. 在页面下方，点击__添加域名__。

    ![zh-ali-add-zone](/img/zh-ali-add-zone.png)

1. 填写__添加内置权威域名__表格。

    |  __参数__       |  __描述__                                                                                                                                                                                                                                                                                                                                                                                        |
    | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |  内置权威域名（Zone） |  请根据您的集群地域和集群 ID修改内置权威域名。以下为终端节点所在区域对应的 Zone 名称：<br/> - 杭州：`inxx-xxxxxxxxxxxx.ali-cn-hangzhou.vectordb.zilliz.com.cn`<br/> - 北京：`inxx-xxxxxxxxxxxx.ali-cn-beijing.vectordb.zilliz.com.cn`<br/> - 深圳：`inxx-xxxxxxxxxxxx.ali-cn-shenzhen.vectordb.zilliz.com.cn`<br/> Zone 名称中的`inxx-xxxxxxxxxxxx`为您的Zilliz Cloud 阿里云集群 ID。您可参考[Zilliz Cloud 控制台](./on-zilliz-cloud-console)查询集群 ID。 |
    |  子域名递归解析代理    |  为防止无法访问公共域名，我们建议您开启此项。                                                                                                                                                                                                                                                                                                                                                                        |

    ![zh-ali-add-zone-form](/img/zh-ali-add-zone-form.png)

1. 设置私域解析的生效范围。

    ![zh-ali-select-effect-range](/img/zh-ali-select-effect-range.png)

1. 选择需要使用私网连接的 VPC。点击确定。

    ![zh-ali-select-vpc](/img/zh-ali-select-vpc.png)

1. 在风险提示弹窗中，点击继续执行操作。

    ![zh-ali-continue-operation](/img/zh-ali-continue-operation.png)

1. 设置成功后，界面如下所示：

    ![zh-ali-zone-added](/img/zh-ali-zone-added.png)

1. 添加解析。在添加域名标签下，定位对应的内置权威域名，点击右侧操作栏中的__解析记录__。

    ![zh-ali-add-dns](/img/zh-ali-add-dns.png)

1. 点击__添加记录__。

    ![zh-ali-add-record](/img/zh-ali-add-record.png)

1. 填写表格并点击__确定__。

    |  __参数__ |  __描述__                        |
    | ------- | ------------------------------ |
    |  记录类型   |  请选择 __CNAME__。                |
    |  主机记录   |  请替换为你的集群 ID。 你可在集群详情页获取集群 ID。 |
    |  记录值    |  请填写在步骤5.e. 中获取的__默认服务域名__。    |

![zh-ali-add-record-form](/img/zh-ali-add-record-form.png)

1. 在__解析变更确认__页面中，点击__确定__。

    ![zh-ali-dns-change-confirm](/img/zh-ali-dns-change-confirm.png)

1. 至此，内网 DNS 解析（PrivateZone）创建成功，界面如下所示：

    ![zh-ali-dns-successful](/img/zh-ali-dns-successful.png)

### 您已成功创建私网连接{#create-private-link-successful}

