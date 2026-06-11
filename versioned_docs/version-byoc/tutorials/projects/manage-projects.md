---
title: "项目管理 | BYOC"
slug: /manage-projects
sidebar_key: manage-projects
sidebar_label: "项目管理"
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
beta: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，项目位于组织和集群层级之间，用于分组集群、Volume 和相关资源。同一项目下所有资源都部署在同一云地域中。 | BYOC"
type: origin
token: KHwEwoWy3iSRO1kTpIjc21jNnsb
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 项目
  - 项目管理
  - projects
  - 管理项目
  - 查看项目
  - 创建项目
  - 重命名项目

---

import Admonition from '@theme/Admonition';


import Procedures from '@site/src/components/Procedures';

# 项目管理

在 Zilliz Cloud 中，项目位于组织和集群层级之间，用于分组集群、Volume 和相关资源。同一项目下所有资源都部署在同一云地域中。

您可以根据业务需求创建多个项目。例如，如果您的公司提供多媒体推荐服务，您可以为视频推荐服务创建一个项目，为音乐推荐服务创建另一个项目。本指南将介绍如何管理项目。

每个 BYOC 项目对应一个云地域中的一个 Kubernetes 集群。跨区域操作不受支持。如需在多个地域进行运维，可以考虑在这些区域都部署 BYOC 项目。

## 添加项目地域\{#add-project-regions}

如果您需要使用[全球集群](/docs/global-cluster-explained)功能，你必须创建多地域项目。您可以[联系我们](http://support.zilliz.com.cn)开通多地域项目的功能。

- **通过 RESTful API**

    ```bash
    export BASE_URL="https://api.cloud.zilliz.com.cn"
    export TOKEN="YOUR_API_KEY"
    
    curl --request POST \
         --url "https://${BASE_URL}/v2/projects/proj-a0195d6acacaf2bb985173/regions" \
         --header "Authorization: Bearer ${TOKEN}" \
         --header "Accept: application/json" \
         --header "Content-Type: application/json" \
         --data-raw '{
            "regions": ["ali-cn-hangzhou"]
          }'
    
    ```

    以下为返回结果示例。

    ```json
    {
      "code": 0,
      "data": {
        "projectId": "proj-a0195d6acacaf2bb985173",
        "regions": ["ali-cn-hangzhou", "ali-cn-beijing"]
      }
    }
    
    ```

- **通过 Web console**

    ![MHR4wgt3BhdGGjbvgp3crJmqnVf](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/MHR4wgt3BhdGGjbvgp3crJmqnVf.png)

    <Procedures>

    1. 选择目标项目，并点击**...**

    1. 点击**添加区域**。

    1. 选择地域并点击**添加**。

    </Procedures>

## 查看全部项目\{#view-all-projects}

您可以查看在您的权限范围内的所有项目的列表。

- **通过 Web 控制台**

    ![zh-view-projects-saas](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/zh-view-projects-saas.png "zh-view-projects-saas")

- **通过 RESTful API**

    以下示例查看当前组织下的全部项目。详情请参考[查看项目列表](/reference/restful/list-projects-v2)。

    ```bash
    export TOKEN="YOUR_API_KEY"
    
    curl --request GET \
    --url "${BASE_URL}/v2/projects" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Accept: application/json" \
    --header "Content-Type: application/json"
    ```

    以下为输出结果。

    ```json
    {
        "code": 0,
        "data": [
            {
                "projectName": "Default Project",
                "projectId": "proj-xxxxxxxxxxxxxxxxxxxxxxx",
                "instanceCount": 2,
                "createTime": "2023-08-16T07:34:06Z"
            }
        ]
    }
    ```

## 查看项目详情\{#view-project-details}

您还可以查看某个项目的具体详情。

- **通过 Web 控制台**

    您可以在项目列表页查看项目名称、版本、集群数量、创建时间。您还可以点击某个项目，查看项目下的集群信息。

    ![C2ItbMdsMoH2FWxmmHncejKVn0e](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/C2ItbMdsMoH2FWxmmHncejKVn0e.png "C2ItbMdsMoH2FWxmmHncejKVn0e")

- **通过 RESTful API**

    以下示例查看项目 `proj-xxxxxxxxxxxxxxx` 的详细信息。详情请参考[查看项目详情](/reference/restful/describe-project-v2)。

    ```bash
    export TOKEN="YOUR_API_KEY"
    export PROJECT_ID="proj-xxxxxxxxxxxxxxx"
    
    curl --request GET \
         --url "https://${BASE_URL}/v2/projects/${PROJECT_ID}" \
         --header "Authorization: Bearer ${API_KEY}"   \
         --header "accept: application/json"
    ```

    以下为输出结果。

    ```json
    {
      "code": 0,
      "data": [
        {
          "projectName": "project1",
          "projectId": "proj-xxxxxxxxxxxxxxx",
          "instanceCount": 3,
          "createTime": "2023-12-07T03:21:32Z",
          "plan": "Enterprise"
        }
      ]
    }
    ```

## 重命名项目\{#rename-a-project}

要重命名项目，您必须是[组织管理员](./organization-users)。您可以通过 Web 控制台对项目进行重命名。

<Admonition type="info" icon="📘" title="说明">

每个组织中都有一个默认项目。

</Admonition>

![rename-project-zh](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/rename-project-zh.png "rename-project-zh")

## 删除项目\{#delete-a-project}

要删除项目，您必须是[组织管理员](./organization-users)。删除项目前，您需要先删除该项目下的所有[集群](./manage-cluster#drop-cluster)。

项目一旦删除，该项目下的所有数据和资源将被清理。该操作不可撤销。

<Admonition type="info" icon="📘" title="说明">

组织中的默认项目不可删除。

</Admonition>

您可以通过 Web 控制台删除项目。

![delete-project-zh](https://zdoc-images.oss-cn-hangzhou.aliyuncs.com/delete-project-zh.png "delete-project-zh")

