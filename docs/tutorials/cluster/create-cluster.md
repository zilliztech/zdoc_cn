---
title: "创建集群 | Cloud"
slug: /create-cluster
sidebar_label: "创建集群"
beta: FALSE
notebook: FALSE
description: "Zilliz Cloud 提供多种集群版本以满足不同的业务需求。请先查阅选择合适的 CU 类型进行合理的资源规划。本文介绍如何创建集群。 | Cloud"
type: origin
token: MAFcwBTqqiR5YZkdkd4cADg0nub
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 创建

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 创建集群

Zilliz Cloud 提供多种集群版本以满足不同的业务需求。请先查阅[选择合适的 CU 类型](./cu-types-explained)进行合理的资源规划。本文介绍如何创建集群。

## 开始前{#prerequisites}

请确保已完成以下步骤：

- 已注册 Zilliz Cloud 账户。有关更多信息，请参见[注册账号](./register-with-zilliz-cloud)。

- 在目标组织或项目中，您具有集群创建权限。有关角色和权限的信息，请参见[用户授权](./authorization)。

## 创建 Free 集群{#set-up-a-free-cluster}

<Tabs groupId="cluster" defaultValue="console" values={[{"label":"Cloud 控制台","value":"console"},{"label":"cURL","value":"bash"}]}>

<TabItem value="console">

1. 登录 Zilliz Cloud 控制台。

1. 进入您需要创建集群的组织和项目。

1. 在打开的页面中，点击**创建集群**。

    ![create_cluster_cn](/img/create_cluster_cn.png)

1. 在**创建新集群**页面，选择 **Free 版**并配置相关参数。

    <Admonition type="info" icon="📘" title="说明">

    <p>仅支持创建 1 个 Free 集群。如需更多集群，请选择创建 Serverless 或 Dedicated 集群。</p>

    </Admonition>

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
         <td><p>集群部署的云服务提供商和地域。</p><p>目前，Zilliz Cloud Free 版支持以下云服务提供商和地域：</p><ul><li><p>阿里云</p><ul><li>华东1（杭州）</li></ul></li></ul></td>
       </tr>
    </table>

    ![create-cluster-free-cn ](/img/create-cluster-free-cn .png)

1. 点击**创建集群**。

</TabItem>

<TabItem value="bash">

以下为示例代码，请将示例中的 `{API_KEY}` 替换为您自己的Zilliz Cloud API 密钥。

以下 `POST` 通过请求体在项目 `proj-xxxxxxxxxxxxxxxxxxxxx` 中创建了 1 个名称为 `cluster-free` 的 Free 集群。

```bash
curl --request POST \
     --url https://api.cloud.zilliz.com.cn/v2/clusters/createFree \
     --header 'Authorization: Bearer ${API_KEY}' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data-raw '{
        "clusterName": "cluster-free",
        "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxx",
        "regionId": "${REGION_ID}"
      }'
      
#  {
#    code: 0,
#    data: {
#      "clusterId": "inxx-xxxxxxxxxxxxxxx",
#      "username":"db_xxxxxxxx",
#      "password":"*************",
#      "prompt": "Successfully submitted, cluster is being created. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK with the admin account and the initial password you specified."
#    }
#  }
```

以下为参数说明：

- `{API_KEY}`：用于验证 API 请求的鉴权信息。请使用您自己的 Zilliz Cloud API 密钥。

- `clusterName`：需要创建的集群名称。

- `projectId`：需要创建的集群所属的项目的 ID。如需查看项目 ID，请使用[查看项目列表](/reference/restful/list-projects-v2)。

- `regionId`：需要创建的集群所部署的云服务地域 ID。目前，仅支持在 `ali-cn-hangzhou` 创建 Free 集群。如需查看所有 Zilliz Cloud 支持的云服务地域 ID，请使用[查看云服务区域](/reference/restful/list-cloud-regions-v2)。

</TabItem>

</Tabs>

## 创建 Serverless 集群{#create-a-serverless-cluster}

<Tabs groupId="cluster" defaultValue="console" values={[{"label":"Cloud 控制台","value":"console"},{"label":"cURL","value":"bash"}]}>

<TabItem value="console">

1. 登录 Zilliz Cloud 控制台。

1. 进入您需要创建集群的组织和项目。

1. 在打开的页面中，点击**创建集群**。

    ![create_cluster_cn](/img/create_cluster_cn.png)

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
         <td><p>集群部署的云服务提供商和地域。</p><p>目前，Zilliz Cloud Serverless 版支持以下云服务提供商和地域：</p><ul><li><p>阿里云</p><ul><li>华东1（杭州）</li></ul></li></ul></td>
       </tr>
    </table>

    ![create-cluster-serverless-cn](/img/create-cluster-serverless-cn.png)

1. 点击**创建集群**。

</TabItem>

<TabItem value="bash">

以下为示例代码，请将示例中的 `{API_KEY}` 替换为您自己的Zilliz Cloud API 密钥。

以下 `POST` 通过请求体在项目 `proj-xxxxxxxxxxxxxxxxxxxxx` 中创建了 1 个名称为 `cluster-serverless` 的 Serverless 集群。

```bash
curl --request POST \
     --url https://api.cloud.zilliz.com.cn/v2/clusters/createServerless \
     --header 'Authorization: Bearer ${API_KEY}' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data-raw '{
        "clusterName": "cluster-serverless",
        "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxxx",
        "regionId": "${REGION_ID}"
      }'
     
# {
#    code: 0,
#    data: {
#       "clusterId": "inxx-xxxxxxxxxxxxxxx",
#       "username":"db_xxxxxxxx",
#       "password":"***********",
#       "prompt": "Successfully submitted, cluster is being created. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK with the admin account and the initial password you specified."
#    }
#  }
```

以下为参数说明：

- `{API_KEY}`：用于验证 API 请求的鉴权信息。请使用您自己的 Zilliz Cloud API 密钥。

- `clusterName`：需要创建的集群名称。

- `projectId`：需要创建的集群所属的项目的 ID。如需查看项目 ID，请使用[查看项目列表](/reference/restful/list-projects-v2)。

- `regionId`：需要创建的集群所部署的云服务地域 ID。目前，仅支持在 `ali-cn-hangzhou` 创建 Serverless 集群。如需查看所有 Zilliz Cloud 支持的云服务地域 ID，请使用[查看云服务区域](/reference/restful/list-cloud-regions-v2)。

</TabItem>

</Tabs>

## 创建 Dedicated 集群{#create-a-dedicated-cluster}

<Tabs groupId="cluster" defaultValue="console" values={[{"label":"Cloud 控制台","value":"console"},{"label":"cURL","value":"bash"}]}>

<TabItem value="console">

1. 登录 Zilliz Cloud 控制台。

1. 进入您需要创建集群的组织和项目。

1. 在打开的页面中，点击**创建集群**。

    ![create_cluster_cn](/img/create_cluster_cn.png)

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
         <td><p>集群部署的云服务提供商和地域。</p><p>目前，Zilliz Cloud 支持以下云服务提供商和地域：</p><ul><li><p>阿里云</p><ul><li><p>华东1（杭州）</p></li><li><p>华北2（北京）</p></li><li><p>华南1（深圳）</p></li></ul></li><li><p>腾讯云</p><ul><li><p>华北地区（北京）</p></li><li><p>华东地区（上海）</p></li><li><p>美国东部（弗吉尼亚）</p></li></ul></li><li><p>亚马逊云科技</p><ul><li>中国（宁夏）</li></ul><p>更多详情，请见<a href="./cloud-providers-and-regions">云服务提供商和地域</a>。</p></li></ul></td>
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

    ![create-cluster-dedicated-cn](/img/create-cluster-dedicated-cn.png)

1. 点击**创建集群**。

</TabItem>

<TabItem value="bash">

以下为示例代码，请将示例中的 `{API_KEY}` 替换为您自己的Zilliz Cloud API 密钥。

以下 `POST` 通过请求体在项目 `proj-xxxxxxxxxxxxxxxxxxxxx` 中创建了 1 个名称为 `Cluster-02`、CU 规格为 1 CU、CU 类型为性能型的 Dedicated 集群。

```bash
curl --request POST \
     --url https://api.cloud.zilliz.com.cn/v2/clusters/createDedicated \
     --header 'Authorization: Bearer ${API_KEY}' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data-raw '{
        "clusterName": "Cluster-02",
        "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxx",
        "regionId": "${REGION_ID}",
        "plan": "Enterprise",
        "cuType": "Performance-optimized",
        "cuSize": 1
      }'
     
#  {
#    code: 0,
#    data: {
#      "clusterId": "inxx-xxxxxxxxxxxxxxx",
#      "username":"db_admin",
#      "password":"****************",
#      "prompt": "Successfully submitted, cluster is being created. You can access data about the creation progress and status of your cluster by DescribeCluster API. Once the cluster status is RUNNING, you may access your vector database using the SDK with the admin account and the initial password you specified."
#     }
#  }
```

以下为参数说明：

- `{API_KEY}`：用于验证 API 请求的鉴权信息。请使用您自己的 Zilliz Cloud API 密钥。

- `clusterName`：需要创建的集群名称。

- `projectId`：需要创建的集群所属的项目的 ID。如需查看项目 ID，请使用[查看项目列表](/reference/restful/list-projects-v2)。

- `regionId`：需要创建的集群所部署的云服务地域 ID。如需查看所有 Zilliz Cloud 支持的云服务地域 ID，请使用[查看云服务区域](/reference/restful/list-cloud-regions-v2)。

- `plan`: Dedicated 集群的版本类型。仅支持 **Enterprise**（企业版）。

- `cuType`：集群的 CU 类型。可选的参数值包含：**Performance-optimized**（性能型）和 **Capacity-optimized**（容量型）。

- `cuSize`：集群的 CU 规格。参数值为 1-256 之间的整数。

</TabItem>

</Tabs>

## 结果验证{#verification}

创建集群后，您可以在集群列表页面上检查集群状态。如果集群的状态为**运行中**，则表示集群创建成功。

![create_cluster_verification](/img/create_cluster_verification.png)

