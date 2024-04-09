---
slug: /create-cluster
beta: FALSE
notebook: FALSE
type: origin
token: MAFcwBTqqiR5YZkdkd4cADg0nub
sidebar_position: 1
---

import Admonition from '@theme/Admonition';


# 创建集群

Zilliz Cloud 提供多种集群版本以满足不同的业务需求。请先查阅[选择合适的 CU 类型](./cu-types-explained)进行合理的资源规划。本文介绍如何创建集群。

## 开始前{#prerequisites}

请确保已完成以下步骤：

- 已注册 Zilliz Cloud 账户。有关更多信息，请参见[注册账号](./register-with-zilliz-cloud)。

- 在目标组织或项目中，您具有集群创建权限。有关角色和权限的信息，请参见[用户授权](./authorization)。

## 创建集群{#create-a-dedicated-cluster}

1. 登录 Zilliz Cloud 控制台。

1. 进入您需要创建集群的组织和项目。

1. 在打开的页面中，点击__创建集群__。

    ![create_cluster_01](/img/create_cluster_01.png)

1. 在__创建新集群__页面，选择__企业版__并配置相关参数。

    |  __参数__        |  __描述__                                                                                                                                                                                                                                                        |
    | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    |  __集群名称__      |  请输入集群的名称。当前存在随机默认值，您可根据需要修改该名称。                                                                                                                                                                                                                               |
    |  __云服务提供商和地域__ |  集群部署的云服务提供商和地域。<br/> 目前，Zilliz Cloud 支持以下云服务提供商和地域：<br/> - 阿里云<br/>     - 华东1（杭州）<br/>     - 华北2（北京）<br/>     - 华南1（深圳）<br/> - 腾讯云<br/>     - 华北地区（北京）<br/>     - 华东地区（上海）<br/> 更多详情，请见[云服务提供商和地域](./cloud-providers-and-regions)。 |
    |  __CU 类型和大小__  |  集群需要使用的 CU 类型及大小。<br/> 界面上有关于 CU 类型的简要介绍，并提供了[价格计算器](./pricing-calculator)供您自助估算成本。<br/> 想了解更多关于 CU 选型的相关内容，可参见[选择合适的 CU 类型](./cu-types-explained)。                                                                                                     |
    |  __用户名和密码__    |  用于在集群创建完成后访问该集群的凭据。<br/> __用户名__默认为 __db_admin 且不可修改，__密码__需要满足界面提示中的条件。<br/> 记住在此处设置的用户名和密码，之后你需要它们来连接到集群。                                                                                                                                             |

    ![create-cluster_02](/img/create-cluster_02.png)

1. 点击__创建集群__。

## 结果验证{#verification}

创建集群后，您可以在集群列表页面上检查集群状态。如果集群的状态为__运行中__，则表示集群创建成功。

![create_cluster_verification](/img/create_cluster_verification.png)

