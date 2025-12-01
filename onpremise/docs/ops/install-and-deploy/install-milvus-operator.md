---
title: "安装 Milvus Operator | On-Premise"
slug: /install-milvus-operator
sidebar_label: "安装 Milvus Operator"
beta: FALSE
added_since: FALSE
last_modified: FALSE
deprecate_since: FALSE
notebook: FALSE
description: "Milvus Operator 是一种可帮助您在目标 Kubernetes 集群上部署和管理包括所有 Milvus 组件和相关依赖项的 Milvus 服务栈的解决方案。本节将介绍如何安装 Milvus Operator。 | On-Premise"
type: origin
token: Ksb3wZc3diThypk79NQc8FfznMg
sidebar_position: 1
keywords: 
  - 向量数据库
  - 私有部署
  - milvus
  - 大模型向量数据库
  - 部署运维手册
  - milvus operator

---

<head>
  <meta name="robots" content="noindex" />
</head>


import Admonition from '@theme/Admonition';


# 安装 Milvus Operator

Milvus Operator 是一种可帮助您在目标 Kubernetes 集群上部署和管理包括所有 Milvus 组件和相关依赖项的 Milvus 服务栈的解决方案。本节将介绍如何安装 Milvus Operator。

## 前提条件\{#prerequisites}

在安装 Milvus Operator 前，请确认

- Kubernetes 集群中已部署的 StorageClass 支持创建以 ReadWriteOnce 模式访问的 PersistentVolume (PV)。

- Kubernetes 集群中已部署的 StorageClass 允许磁盘扩容，即 StorageClass 的allowVolumeExpansion 已设置为 true。

## 安装 Milvus Operator\{#install-milvus-operator}

可按如下方式安装 Milvus Operator

```bash
# add-command-prompt
export version=v1.0.8

# add-command-prompt
kubectl apply -f https://github.com/zilliztech/milvus-operator/releases/download/${version}/deployment-no-webhook.yaml
```

<Admonition type="info" icon="📘" title="Notes">

<p>如果执行上述命令后提示没有权限，您可以参考如下声明文件向 Kubernetes 管理员申请更高权限，或由管理员代为安装。</p>

</Admonition>

在安装过程中涉及使用的权限如下：

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: 'milvus-operator-manager-role'
rules:
- apiGroups:
  - ""
  resources:
  - '*'
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - apiextensions.k8s.io
  resources:
  - customresourcedefinitions
  verbs:
  - get
  - list
  - watch
- apiGroups:
  - apps
  resources:
  - '*'
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - batch
  resources:
  - jobs
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - extensions
  resources:
  - deployments
  - pods
  - secrets
  - services
  - statefulsets
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - extensions
  resources:
  - ingresses
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - milvus.io
  resources:
  - milvusclusters
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - milvus.io
  resources:
  - milvusclusters/finalizers
  verbs:
  - update
- apiGroups:
  - milvus.io
  resources:
  - milvusclusters/status
  verbs:
  - get
  - patch
  - update
- apiGroups:
  - milvus.io
  resources:
  - milvuses
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - milvus.io
  resources:
  - milvuses/finalizers
  verbs:
  - update
- apiGroups:
  - milvus.io
  resources:
  - milvuses/status
  verbs:
  - get
  - patch
  - update
- apiGroups:
  - milvus.io
  resources:
  - milvusupgrades
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - milvus.io
  resources:
  - milvusupgrades/finalizers
  verbs:
  - update
- apiGroups:
  - milvus.io
  resources:
  - milvusupgrades/status
  verbs:
  - get
  - patch
  - update
- apiGroups:
  - monitoring.coreos.com
  resources:
  - podmonitors
  - servicemonitors
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - networking.k8s.io
  resources:
  - ingresses
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - policy
  resources:
  - poddisruptionbudgets
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - policy
  resources:
  - podsecuritypolicies
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - clusterrolebindings
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - clusterroles
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - rolebindings
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch
- apiGroups:
  - rbac.authorization.k8s.io
  resources:
  - roles
  verbs:
  - create
  - delete
  - get
  - list
  - patch
  - update
  - watch

```

## 安装后验证\{#verification-afterwards}

您可按照如下方式验证 Milvus Operator 是否安装成功。

```bash
# add-command-prompt
kubectl get pods -n milvus-operator

# output-start
NAME                               READY   STATUS    RESTARTS   AGE
milvus-operator-5fd77b87dc-msrk4   1/1     Running   0          46s
# output-end
```

当 Milvus Operator pod 的 **STATUS** 为 **Running**，且 **READY** 为 **1/1** 时，说明 Milvus Operator 安装成功。

## 后续步骤\{#follow-ups}

在 Milvus Operator 安装成功后，即可[部署 Milvus 集群](./deploy-milvus-cluster)。

## 常见问题\{#faqs}

1. Milvus Operator pod 的 **STATUS** 为 **Pending**，如何解决？

    当 Milvus Operator pod 的 **STATUS** 为 **Pending** 时，表明 Kubernetes 集群当前无法调度资源安装 Milvus Operator。您需要查看当前集群是否有足够资源可供调度，或者咨询 Kubernetes 集群管理员。此时，可能需要为当前部署添加特定的资源调度规则。

1. Milvus Operator pod 的 **STATUS** 为 **ImagePullBackoff** 或 **ImagePullError**，如何解决？

    当 Milvus Operator pod 的 **STATUS** 为 **ImagePullBackoff** 或 **ImagePullError** 时，表明 Kubernetes 集群当前无法获取指定镜像。请检查并修改镜像仓库配置。

1. Milvus Operator pod 的 **STATUS** 为 **Error** 或 **CarchLoopBackoff**，如何解决？

    当 Milvus Operator pod 的 **STATUS** 为 **Error** 或 **CarchLoopBackoff** 时，表明程序运行异常或内存不足。请立即向 Zilliz 报告此异常，并申请 Zilliz 支持团队介入排查。在申请 Zilliz 支持团队介入前，请准备如下信息：

    - 获取 Milvus Operator pod 的运行日志。

        ```bash
        # add-command-prompt
        kubectl logs milvus-operator-5fd77b87dc-msrk4
        ```

    - 获取 Milvus Operator pod 的详情。

        ```bash
        # add-command-prompt
        kubectl -n milvus-operator describe milvus-operator-5fd77b87dc-msrk4
        ```

    在执行上述命令时，请替换 `milvus-operator-5fd77b87dc-msrk4` 为您的 Milvus Operator pod 名称。

