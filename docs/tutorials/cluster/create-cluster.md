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

## 创建 Serverless 集群{#create-a-serverless-cluster}

1. 登录 Zilliz Cloud 控制台。

1. 进入您需要创建集群的组织和项目。

1. 在打开的页面中，点击**创建集群**。

    ![create_cluster_01](/img/create_cluster_01.png)

1. 在**创建新集群**页面，选择 **Serverless 版**并配置相关参数。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>集群名称</strong></p></td>
         <td><p>请输入集群的名称。当前存在随机默认值，您可根据需要修改该名称。</p></td>
       </tr>
       <tr>
         <td><p><strong>云服务提供商和地域</strong></p></td>
         <td><p>集群部署的云服务提供商和地域。</p><p>目前，Zilliz Cloud Serverless 版支持以下云服务提供商和地域：</p><ul><li><p>阿里云</p><ul><li>华东1（杭州）</li></ul></li></ul><p>更多详情，请见<a href="./cloud-providers-and-regions">云服务提供商和地域</a>。</p></td>
       </tr>
       <tr>
         <td><p><strong>CU 类型和大小</strong></p></td>
         <td><p>集群需要使用的 CU 类型及大小。</p><p>界面上有关于 CU 类型的简要介绍，并提供了<a href="./pricing-calculator">价格计算器</a>供您自助估算成本。</p><p>想了解更多关于 CU 选型的相关内容，可参见<a href="./cu-types-explained">选择合适的 CU 类型</a>。</p></td>
       </tr>
       <tr>
         <td><p><strong>用户名和密码</strong></p></td>
         <td><p>用于在集群创建完成后访问该集群的凭据。</p><p><strong>用户名</strong>默认为 <strong>db_admin</strong> 且不可修改，<strong>密码</strong>需要满足界面提示中的条件。</p><p>记住在此处设置的用户名和密码，之后你需要它们来连接到集群。</p></td>
       </tr>
    </table>

    ![create-cluster_02](/img/create-cluster_02.png)

1. 点击**创建集群**。

## 创建 Dedicated 集群{#create-a-dedicated-cluster}

1. 登录 Zilliz Cloud 控制台。

1. 进入您需要创建集群的组织和项目。

1. 在打开的页面中，点击**创建集群**。

    ![create_cluster_01](/img/create_cluster_01.png)

1. 在**创建新集群**页面，选择 **Dedicated 版**并配置相关参数。

    <table>
       <tr>
         <th><p><strong>参数</strong></p></th>
         <th><p><strong>描述</strong></p></th>
       </tr>
       <tr>
         <td><p><strong>集群名称</strong></p></td>
         <td><p>请输入集群的名称。当前存在随机默认值，您可根据需要修改该名称。</p></td>
       </tr>
       <tr>
         <td><p><strong>云服务提供商和地域</strong></p></td>
         <td><p>集群部署的云服务提供商和地域。</p><p>目前，Zilliz Cloud 支持以下云服务提供商和地域：</p><ul><li><p>阿里云</p><ul><li><p>华东1（杭州）</p></li><li><p>华北2（北京）</p></li><li><p>华南1（深圳）</p></li></ul></li><li><p>腾讯云</p><ul><li><p>华北地区（北京）</p></li><li><p>华东地区（上海）</p></li></ul></li></ul><p>更多详情，请见<a href="./cloud-providers-and-regions">云服务提供商和地域</a>。</p></td>
       </tr>
       <tr>
         <td><p><strong>CU 类型和大小</strong></p></td>
         <td><p>集群需要使用的 CU 类型及大小。</p><p>界面上有关于 CU 类型的简要介绍，并提供了<a href="./pricing-calculator">价格计算器</a>供您自助估算成本。</p><p>想了解更多关于 CU 选型的相关内容，可参见<a href="./cu-types-explained">选择合适的 CU 类型</a>。</p></td>
       </tr>
       <tr>
         <td><p><strong>用户名和密码</strong></p></td>
         <td><p>用于在集群创建完成后访问该集群的凭据。</p><p><strong>用户名</strong>默认为 <strong>db_admin 且不可修改，</strong>密码**需要满足界面提示中的条件。</p><p>记住在此处设置的用户名和密码，之后你需要它们来连接到集群。</p></td>
       </tr>
    </table>

    ![create-cluster_02](/img/create-cluster_02.png)

1. 点击**创建集群**。

## 结果验证{#verification}

创建集群后，您可以在集群列表页面上检查集群状态。如果集群的状态为**运行中**，则表示集群创建成功。

![create_cluster_verification](/img/create_cluster_verification.png)

