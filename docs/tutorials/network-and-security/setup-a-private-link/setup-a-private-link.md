---
slug: /setup-a-private-link
beta: FALSE
notebook: FALSE
type: origin
token: JLHPwhdssifn2dkR5lDcA4SWnVg
sidebar_position: 2

---

import Admonition from '@theme/Admonition';


# 创建私网连接

Zilliz Cloud 允许您通过私网连接（PrivateLink）访问您的集群。如果您不希望通过公众互联网访问您位于 Zilliz Cloud 上的集群， 可以按照本章的步骤为您的集群创建私网连接。

## 配置思路{#configuration-principle}

![private_link_cn](/img/private_link_cn.png)

如上图所示，私网连接建立在您的应用所在 VPC 与 您的 Zilliz Cloud 集群所在VPC 之间。 Zilliz Cloud 集群提供的私网连接支持为多个可用区的应用提供服务。

您可以根据您的 Zilliz Cloud 集群所在云服务商选择参考如下文档：

import DocCardList from '@theme/DocCardList';

<DocCardList />