---
title: "获取镜像 | Cloud"
slug: /obtain-images
sidebar_label: "获取镜像"
beta: FALSE
notebook: FALSE
description: "Milvus 私有化部署镜像由 Zilliz 提供。您可通过用户名/密码鉴权的方式从 Zilliz 的 Harbor 镜像仓库拉取对应版本镜像。在获取 Milvus 私有化部署镜像后，您可将获取到的镜像导入到本地镜像仓库环境进行安全扫描及部署。 | Cloud"
type: origin
token: Vt09w1q6EiQA7hkwTFgcwQFtndh
sidebar_position: 2
keywords: 
  - 向量数据库
  - 私有部署
  - milvus
  - 大模型向量数据库
  - 部署运维手册
  - 私有部署镜像

---

import Admonition from '@theme/Admonition';


# 获取镜像

Milvus 私有化部署镜像由 Zilliz 提供。您可通过用户名/密码鉴权的方式从 Zilliz 的 Harbor 镜像仓库拉取对应版本镜像。在获取 Milvus 私有化部署镜像后，您可将获取到的镜像导入到本地镜像仓库环境进行安全扫描及部署。

## 前提条件{#prerequisites}

- 本地环境已安装 Docker。

- 本地环境可访问 `harbor.zilliz.com`。

## 获取镜像{#obtain-image}

您可按如下步骤获取 Milvus 私有化部署镜像。

1. 使用 Zilliz 提供的用户名和密码登录 Zillliz Harbor 镜像仓库。

    ```shell
    $ docker login harbor.zilliz.com
    Username: username
    Password: ******
    Login Succeeded
    ```

1. 获取 Milvus 镜像到本地环境。

    在如下命令中使用的镜像 Tag 为 `2.4.10-a1d39326`。在执行本步骤前，请向 Zilliz 确认待获取的镜像 Tag，用于替换如下命令中的镜像 Tag。

    ```shell
    $ docker pull harbor.zilliz.com/userns/milvus:2.4.10-a1d39326
    2.4.10-a1d39326: Pulling from userns/milvus
    b49b96595fd4: Pull complete 
    Digest: sha256:f607d0d9c649cd1ef65b37c63f17f986eda3ff3a5d76fd556f83d0c58c759d42
    Status: Downloaded newer image for harbor.zilliz.com/userns/milvus:2.4.10-a1d39326
    harbor.zilliz.com/userns/milvus:2.4.10-a1d39326
    ```

