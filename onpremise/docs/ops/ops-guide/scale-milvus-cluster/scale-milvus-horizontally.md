---
title: "Milvus 集群横向扩缩容 | Cloud"
slug: /scale-milvus-horizontally
sidebar_label: "横向扩缩容"
beta: FALSE
notebook: FALSE
description: "横向扩缩容是指通过增加和减少 Milvus 集群各组件的副本数量对 Milvus 集群进行扩缩容。本节主要介绍如何对 Milvus 集群进行横向扩缩容。 | Cloud"
type: origin
token: VhFgwywnJiGGnKk8X68cjChPn0d
sidebar_position: 1
keywords: 
  - 向量数据库
  - 私有部署
  - milvus
  - 大模型向量数据库
  - 部署运维手册
  - 概述

---

import Admonition from '@theme/Admonition';


# Milvus 集群横向扩缩容

横向扩缩容是指通过增加和减少 Milvus 集群各组件的副本数量对 Milvus 集群进行扩缩容。本节主要介绍如何对 Milvus 集群进行横向扩缩容。

<Admonition type="info" icon="📘" title="警告">

<p>如果需要执行集群横向扩缩容操作（即调整 Milvus 集群各组件的副本数量），请务必单独下发相关配置。如果将横向扩缩容操作配置与其它集群配置修改一并下发，可能会引起集群运行异常。</p>

</Admonition>

## 操作步骤{#procedures}

您可以按照如下步骤对 Milvus 集群进行横向扩缩容。

1. 确认 Milvus 集群当前各组件的副本数量。

    ```shell
    $ kubectl get milvus my-release -o custom-columns="\
      mixCoord:status.componentsDeployStatus.mixcoord.status.replicas\
      ,queryNode:status.componentsDeployStatus.querynode.status.replicas\
      ,dataNode:status.componentsDeployStatus.datanode.status.replicas\
      ,indexNode:status.componentsDeployStatus.indexnode.status.replicas\
      ,proxy:status.componentsDeployStatus.proxy.status.replicas"
    ```

    命令返回如下：

    ```shell
    mixCoord   queryNode   dataNode   indexNode   proxy
    1          4           1          1           1
    ```

1. 执行扩缩容。

    如下示例以负责查询的 QueryNode 为例，将其由当前的 **4** 个扩容到 **6** 个。

    ```shell
    $ export COMPONENT="queryNode"
    $ export REPLICAS="6"
    
    $ kubectl patch milvus my-release --type='json' \
      -p='[{"op": "replace", \
      "path": "/spec/components/'$COMPONENT'/replicas", \
      "value": '$REPLICAS'}]'
    ```

    你可以根据需要调整 `COMPONENT` 和 `REPLICAS` 的值。例如将 `REPLICAS` 修改成 `2`，则意味着对 QueryNode 执行缩容操作。此时，请在操作前确保减少副本数量后仍有足够的内存。

    执行上述命令后，可以通过如下命令查看扩容的目标数量。

    ```shell
    $ kubectl get milvus my-release -o \
      custom-columns="mixCoordTarget:spec.components.mixCoord.replicas\
      ,queryNodeTarget:spec.components.queryNode.replicas\
      ,dataNodeTarget:spec.components.dataNode.replicas\
      ,indexNodeTarget:spec.components.indexNode.replicas\
      ,proxyTarget:spec.components.proxy.replicas"
    ```

    可以看到 QueryNode 的扩容目标成功修改为 **6**。

    ```shell
    mixCoordTarget queryNodeTarget dataNodeTarget indexNodeTarget proxyTarget
    1              6               1              1               1
    ```

    <Admonition type="info" icon="📘" title="说明">

    <p>此时仅调整了扩容目标，扩缩容操作可能仍在进行中。</p>

    </Admonition>

1. 查看扩缩容进度。

    可以重复执行如下命令查看目前实际启动的 QueryNode 副本数量。

    ```shell
    $ kubectl get milvus my-release -o custom-columns="\
      mixCoord:status.componentsDeployStatus.mixcoord.status.replicas\
      ,queryNode:status.componentsDeployStatus.querynode.status.replicas\
      ,dataNode:status.componentsDeployStatus.datanode.status.replicas\
      ,indexNode:status.componentsDeployStatus.indexnode.status.replicas\
      ,proxy:status.componentsDeployStatus.proxy.status.replicas"
    ```

    因操作延时原因，显示的数量可能与实际数量不符。

    ```shell
    mixCoord   queryNode   dataNode   indexNode   proxy
    1          5           1          1           1
    ```

    另外，你也可以通过查看相关组件 pod 数量的方式确认扩缩容结果。

    ```shell
    $ kubectl get pods |grep -v etcd |grep -v pulsar
    ```

    在当前示例中，如果扩容成功后，可以在命令回显中看到 6 个 QueryNode pod。

    ```shell
    NAME                                             READY   STATUS    RESTARTS   AGE
    my-release-milvus-datanode-6ccf846d6c-qwqrc      1/1     Running   0          4h45m
    my-release-milvus-indexnode-6ccf846d6c-qwqrc     1/1     Running   0          4h45m
    my-release-milvus-mixcoord-6994988556-prbs9      1/1     Running   0          4h45m
    my-release-milvus-proxy-7758898786-q9x84         2/2     Running   0          3h19m
    my-release-milvus-querynode-0-66f8c8b49f-2khzk   1/1     Running   0          4h45m
    my-release-milvus-querynode-0-66f8c8b49f-6h4zf   1/1     Running   0          4h45m
    my-release-milvus-querynode-0-66f8c8b49f-6j9mx   1/1     Running   0          171m
    my-release-milvus-querynode-0-66f8c8b49f-8mzz4   1/1     Running   0          4h45m
    my-release-milvus-querynode-0-66f8c8b49f-9wsml   1/1     Running   0          29s
    my-release-milvus-querynode-0-66f8c8b49f-tqrsx   1/1     Running   0          38s
    ```
