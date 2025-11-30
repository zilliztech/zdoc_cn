---
title: "变更 Milvus 集群配置 | On-Premise"
slug: /modify-milvus-configs
sidebar_label: "变更 Milvus 集群配置"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Milvus 集群支持在运行过程中对其配置及集群依赖的三方件配置进行变更。本章主要介绍如何变更 Milvus 集群配置和 Milvus 集群依赖的三方件配置。 | On-Premise"
type: origin
token: GcwEwsKfxiDY2jk3hjfcBMaAnld
sidebar_position: 3
keywords: 
  - 向量数据库
  - 私有部署
  - milvus
  - 大模型向量数据库
  - 部署运维手册
  - 变更集群配置

---

<head>
  <meta name="robots" content="noindex" />
</head>


import Admonition from '@theme/Admonition';


# 变更 Milvus 集群配置

Milvus 集群支持在运行过程中对其配置及集群依赖的三方件配置进行变更。本章主要介绍如何变更 Milvus 集群配置和 Milvus 集群依赖的三方件配置。

## 变更集群配置\{#modify-milvus-configurations}

Milvus 集群的所有配置都在 `spec.config` 字段中。完整配置可参考 [milvus.yaml](https://github.com/milvus-io/milvus/blob/master/configs/milvus.yaml)。

<Admonition type="info" icon="📘" title="说明">

<p>如无特殊要求，在变更集群配置时，请务必保持 Milvus 集群与其依赖的诸如 MinIO、Pulsar 和 etcd 等三方件之间的连接配置。</p>

</Admonition>

具体配置变更步骤如下：

1. 修改 Milvus 集群配置文件。

    代码中高亮的部分用于在 Proxy 组件上开启记录 Access Log。

    ```yaml
    apiVersion: milvus.io/v1beta1
    kind: Milvus
    metadata:
      name: my-release
      labels:
        app: milvus
    spec:
      config:
        # ref: https://milvus.io/docs/configure_log.md
        log: # 日志配置
          level: info #日志等级 debug, info, warn, error, fatal
          file:
            maxSize: 300
            rootPath: /logs/$(POD_NAME) #日志目录
        common: # 通用配置
          storageType: remote # 存储类型，远程对象存储
        minio: # 对象存储参数
          bucketName: milvus-bucket # milvus存储数据的bucket
          rootPath: milvus/my-release # milvus存储文件在bucket中的目录
          useSSL: true # 访问支持开启ssl
        # highlight-start
        proxy:
          accessLog:
            enable: true
            formatters:
              base:
                format: '{"log_type": "ACCESS","log_format": "BASE","time": "$time_now",
                  "method_name": "$method_name", "user_name": "$user_name", "user_addr":
                  "$user_addr", "method_status": "$method_status", "error_code": "$error_code",
                  "sdk_version": "$sdk_version", "error_msg": "$error_msg", "trace_id":
                  "$trace_id", "time_cost": "$time_cost", "database_name": "$database_name",
                  "collection_name": "$collection_name", "partition_name": "$partition_name",
                  "method_expr": "$method_expr","instance_id": "$cluster_prefix"}'
              query:
                format: '{"log_type": "ACCESS","log_format": "QUERY","time": "$time_now",
                  "method_name": "$method_name", "user_name": "$user_name", "user_addr":
                  "$user_addr", "method_status": "$method_status", "error_code": "$error_code",
                  "sdk_version": "$sdk_version", "error_msg": "$error_msg", "trace_id":
                  "$trace_id", "time_cost": "$time_cost", "database_name": "$database_name",
                  "collection_name": "$collection_name", "partition_name": "$partition_name",
                  "method_expr": "$method_expr","instance_id": "$cluster_prefix"}'
         # highlight-end
    ```

    修改完成后，将上述内容保存为 `milvus-config-change.yaml`。

1. 应用变更。

    执行如下命令应用修改后的配置。

    ```bash
    # add-command-prompt
    kubectl apply -f milvus-config-change.yaml
    ```

1. 重启变更的组件让变更生效。

    本例变更了 Proxy 组件的配置，因此需要执行如下命令重启 Proxy 组件让配置生效。

    ```bash
    # add-command-prompt
    kubectl rollout restart deployment my-release-milvus-proxy 
    ```

1. 查看变更进度。

    在应用了所有变更后，可列出所有 Deployment，观察变更执行情况。

    ```bash
    # add-command-prompt
    kubectl get deployments.apps
    
    # output-start
    NAME                                      READY   UP-TO-DATE   AVAILABLE   AGE
    my-release-milvus-datanode      0/0     0            0           83m
    my-release-milvus-indexnode     0/0     0            0           83m
    my-release-milvus-mixcoord      0/0     0            0           83m
    my-release-milvus-proxy         0/0     0            0           83m
    my-release-milvus-querynode-0   0/0     0            0           83m
    my-release-milvus-querynode-1   0/0     0            0           83m
    my-release-milvus-standalone    1/1     1            1           91m
    # output-end
    ```

    也可以列出相关组件的 Pod，观察其运行状态。

    ```bash
    # add-command-prompt
    kubectl get pod | grep proxy
    
    NAME                                      READY   STATUS      RESTARTS       AGE
    my-release-milvus-proxy-576cfb65c5-jmpvb  1/1     Running     0              30m
    ```

    当 Pod 的 STATUS 变更为 Running 时，表示变更已生效。

## 变更 Pulsar 配置\{#modify-pulsar-configurations}

Milvus 集群依赖的 Pulsar 组件的所有配置都在 `spec.dependencies.pulsar.inCluster.values` 字段中。完整配置可参考 Pulsar Helm Chart 的 [values.yaml](https://github.com/apache/pulsar-helm-chart/blob/master/charts/pulsar/values.yaml) 文件。

具体步骤可参考[变更集群配置](./modify-milvus-configs#modify-milvus-configurations)。

## 变更 etcd 配置\{#modify-etcd-configurations}

Milvus 集群依赖的 etcd 组件的所有配置都在 `spec.dependencies.etcd.inCluster.values` 字段中。完整配置可参考 etcd Helm Chart 的 [values.yaml](https://github.com/bitnami/charts/blob/main/bitnami/etcd/values.yaml) 文件。

具体步骤可参考[变更集群配置](./modify-milvus-configs#modify-milvus-configurations)。

