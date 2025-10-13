---
title: "管理项目 | BYOC"
slug: /manage-projects
sidebar_label: "管理项目"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "在 Zilliz Cloud 中，项目位于组织和集群层级之间，用于分组集群和相关资源。您可以根据业务需求创建多个项目。例如，如果您的公司提供多媒体推荐服务，您可以为视频推荐服务创建一个项目，为音乐推荐服务创建另一个项目。 | BYOC"
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


# 管理项目

在 Zilliz Cloud 中，项目位于组织和集群层级之间，用于分组集群和相关资源。您可以根据业务需求创建多个项目。例如，如果您的公司提供多媒体推荐服务，您可以为视频推荐服务创建一个项目，为音乐推荐服务创建另一个项目。

本指南将介绍如何管理项目。

## 查看项目{#view-projects}

加入组织后，您便可以查看该组织中所有项目的列表。

![zh-view-projects-saas](/img/zh-view-projects-saas.png)

## 创建项目{#create-a-project}

要创建项目，您必须是[组织管理员](./organization-users#organization-roles)。

每个组织中最多可创建 100 个项目。

<Admonition type="info" icon="📘" title="说明">

<p>当您创建项目时，您也会成为该项目的<a href="./project-users#project-roles">项目管理员</a>。</p>

</Admonition>

![create-project-zh](/img/create-project-zh.png)

## 重命名项目{#rename-a-project}

要重命名项目，您必须是[组织管理员](./organization-users#organization-roles)。

<Admonition type="info" icon="📘" title="说明">

<p>每个组织中都有一个默认项目。</p>

</Admonition>

![rename-project-zh](/img/rename-project-zh.png)

## 删除项目{#delete-a-project}

要创建项目，您必须是[组织管理员](./organization-users#organization-roles)。

<Admonition type="info" icon="📘" title="说明">

<p>每个组织中都有一个默认项目，默认项目暂不支持删除。</p>

</Admonition>

![delete-project-zh](/img/delete-project-zh.png)

