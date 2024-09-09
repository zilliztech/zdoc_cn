---
title: "Milvus 集群依赖和磁盘扩缩容 | On-Premise"
slug: /scale-deps-and-storage
sidebar_label: "依赖和磁盘扩缩容"
beta: FALSE
notebook: FALSE
description: "Milvus 集群的正常运行依赖多个三方组件，包括 Pulsar、etcd 等。本节主要介绍如何对这些 Milvus 集群依赖的三方组件和 Milvus 集群的磁盘进行扩缩容。 | On-Premise"
type: origin
token: H67ZwxJJEiJ5zWk2mS3ciQHNnE3
sidebar_position: 3
keywords: 
  - 向量数据库
  - 私有部署
  - milvus
  - 大模型向量数据库
  - 部署运维手册
  - 依赖和磁盘扩缩容

---

<head>
  <meta name="robots" content="noindex" />
</head>


import Admonition from '@theme/Admonition';


# Milvus 集群依赖和磁盘扩缩容

Milvus 集群的正常运行依赖多个三方组件，包括 Pulsar、etcd 等。本节主要介绍如何对这些 Milvus 集群依赖的三方组件和 Milvus 集群的磁盘进行扩缩容。

## Pulsar 扩容{#scale-pulsar}

<Admonition type="info" icon="📘" title="说明">

<p>Pulsar 组件不支持自动缩容。请提前做好容量规划。</p>

</Admonition>

1. 修改 Milvus 集群部署声明文件中关于 Pulsar 的部分。

    仅需修改下方代码块中高亮的部分。例如，如果需要将分配给 bookkeeper 的 CPU 核心数调整为 1，内存调整为 4 GiB，可修改 `spec.dependencies.pulsar.inCluster.values.bookkeeper.resources`下的配置，并保持其它组件配置不变。

    ```yaml
    apiVersion: milvus.io/v1beta1
    kind: Milvus
    metadata:
      name: my-release
      labels:
        app: milvus
    spec:
      # 省略其他字段
      dependencies:
        pulsar:
          inCluster:
            values:
              proxy:
                replicaCount: 2
                resources:
                  # highlight-start
                  requests:
                    cpu: 0.5
                    memory: 1024Mi
                  # highlight-start
              bookkeeper:
                replicaCount: 3
                resources:
                  # highlight-start
                  requests:
                    cpu: 1
                    memory: 4096Mi
                  # highlight-end
              zookeeper:
                replicaCount: 3
                resources:
                  # highlight-start
                  requests:
                    cpu: 0.2
                    memory: 256Mi
                  # highlight-start
              broker:
                replicaCount: 2
                resources:
                  # highlight-start
                  requests:
                    cpu: 0.5
                    memory: 2048Mi
                  # highlight-start
    ```

    将修改后的声明文件保存为 `milvus-new-version.yaml`。

1. 应用修改后的 Milvus 集群部署声明文件。

    ```shell
    $ kubectl apply -f milvus-new-version.yaml
    ```

## etcd 扩容{#scale-etcd}

1. 修改 Milvus 集群部署声明文件中关于 etcd 的部分。

    仅需修改下方代码块中高亮的部分。例如，如果需要将分配给 etcd 的 CPU 核心数调整为 2，内存调整为 8 GiB，可修改 `spec.dependencies.etcd.inCluster.values.resources`下的配置，并保持其它组件配置不变。

    ```yaml
    apiVersion: milvus.io/v1beta1
    kind: Milvus
    metadata:
      name: my-release
      labels:
        app: milvus
    spec:
      # 省略其他字段
      dependencies:
        etcd:
          inCluster:
            values:
              replicaCount: 3
              resources:
                # highlight-start
                limits:
                  cpu: 2
                  memory: 8Gi
                # highlight-end
    ```

    将修改后的声明文件保存为 `milvus-new-version.yaml`。

1. 应用修改后的 Milvus 集群部署声明文件。

    ```shell
    $ kubectl apply -f milvus-new-version.yaml
    ```

## 磁盘扩容{#scale-storage}

<Admonition type="info" icon="📘" title="说明">

<p>在部署 Milvus 集群前，请确保集群使用的 StorageClass 满足<a href="./deploy-milvus-cluster#prerequisites">此处</a>指定的条件。如果使用的 StorageClass 不允许卷扩容功能，请修改 StorageClass 配置，将 <code>allowVolumeExpansion</code> 参数设置为 <code>true</code>，使其允许对已有存储卷进行扩容操作。</p>

</Admonition>

1. 修改 Kubernetes 集群的 StorageClass 配置中关于 PVC 的部分。

    仅需修改下方代码块中高亮的部分。当磁盘用量较高时，可以修改 PersistentVolumeClaim (PVC) 的 `spec.resources.requests.storage` 字段，增加磁盘容量。

    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: pulsar-bookie-journal-bookie-0
      namespace: pulsar
    spec:
      resources:
        requests:
          # highlight-next-line
          storage: 100Gi
    ```

    将修改后的声明文件保存为 `milvus-new-version.yaml`。

1. 应用修改后的 Milvus 集群部署声明文件。

    ```shell
    $ kubectl apply -f milvus-new-version.yaml
    ```

    