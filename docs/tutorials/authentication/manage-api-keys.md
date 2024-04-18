---
slug: /manage-api-keys
beta: FALSE
notebook: FALSE
type: origin
token: UGzNwB4TmiqTozkJvarceRdenif
sidebar_position: 2
---

import Admonition from '@theme/Admonition';


# API 密钥

在 Zilliz Cloud 平台，您可以在组织下分配和管理 API 密钥。这些密钥是用于对指定项目和资源进行访问所必需的认证令牌，可用于对 RESTful API 或 SDK 调用进行鉴权。

## API 密钥概述{#overview-of-api-keys}

为应对不同需求场景，Zilliz Cloud 提供了两种主要的 API 密钥类型：

- **个人密钥**：这类密钥与单独的用户账户关联，由 Zilliz Cloud 自动为每位组织用户生成，并继承相应用户角色的权限。若用户离开组织，其个人密钥也将随之自动删除。因此，不建议在需要长期维护的项目中使用个人密钥。

- **自定义密钥**：这种密钥与特定的应用程序相关联，而不是与单个用户绑定。具有[管理员](./user-roles)身份的用户可创建并管理自定义密钥。此类密钥更适用于开发场景，提供了稳定的长期 API 集成及自动化功能。

<Admonition type="info" icon="📘" title="说明">

<p>在 2024 年 1 月 29 日之前发布的版本中，并未对 API 密钥进行分类。如果您的 Zilliz Cloud 服务是从该日期前的版本升级而来，您之前版本的 API 密钥将被默认设置为自定义密钥，并继承原 API 密钥所拥有的项目级权限。</p>

</Admonition>

### API 安全调用{#secure-api-calls-with-rbac}

在 Zilliz Cloud 中，基于角色的访问控制（[RBAC](./user-roles)）在安全保障方面发挥着重要作用，并应用于 API 调用管理。通过为组织内的用户分配具备特定权限的角色，RBAC 能够实现对资源访问的精细管理。

有关更多用户角色信息，请参见[用户与权限](./authorization)。

![zh-api-key-access](/img/zh-api-key-access.png)

### API 密钥管理{#api-key-management}

在 Zilliz Cloud 中，用户在组织内的角色决定了其管理 API 密钥的权限范围，具体如下：

|                       |  组织管理员  |  项目管理员  |  项目成员   |
| --------------------- | ------- | ------- | ------- |
|  **个人密钥**             |         |         |         |
|  创建                   |  系统自动分配 |  系统自动分配 |  系统自动分配 |
|  查看自身的 API 密钥         |  ✔️     |  ✔️     |  ✔️     |
|  查看其他成员的 API 密钥名称 [1] |  ✔️     |  ✔️     |  ✘      |
|  重置 API 密钥 [2]        |  ✔️     |  ✔️     |  ✔️     |
|  **自定义密钥**            |         |         |         |
|  创建                   |  ✔️     |  ✔️ [3] |  ✘      |
|  查看                   |  ✔️     |  ✔️ [4] |  ✘      |
|  移除 API 密钥权限          |  ✔️     |  ✔️ [4] |  ✘      |
|  编辑 API 密钥名称          |  ✔️     |  ✘      |  ✘      |
|  重置 API 密钥            |  ✔️     |  ✘      |  ✘      |
|  删除 API 密钥            |  ✔️     |  ✘      |  ✘      |

备注：

[1] 拥有[管理员](./user-roles)身份的用户可以根据其权限范围查看其他成员的 API 密钥名称。组织管理员可查看整个组织内所有成员的 API 密钥名称，而项目管理员仅能查看自己权限范围内的密钥。项目成员只能查看自己的个人密钥。

[2] 每个用户只能重置自己的个人密钥。

[3] 项目管理员授予自定义 API 密钥的权限受到其自身权限范围的限制。

[4] 项目管理员只能查看或管理其自身权限范围内的自定义 API 密钥。例如，用户 1 拥有项目 A 的权限。如果某个自定义 API 密钥（密钥 1）具有访问项目 A、B 和 C 的权限，由于该密钥的访问范围超出了用户 1 的权限，用户 1 无法访问密钥 1。

## 创建 API 密钥{#create-an-api-key}

在 Zilliz Cloud 中，除了系统为每位组织用户自动生成的个人密钥外，您还可以手动创建自定义密钥。对于需要长期维护的项目或应用程序开发，推荐使用自定义 API 密钥。

每位组织管理员或项目管理员均有权限创建自定义 API 密钥。创建 API 密钥的关键是确定其访问范围，包括定义该密钥能访问的项目和集群。

- **API 密钥访问权限**：您可以通过指定用户角色或特定项目，来定义自定义 API 密钥的访问范围。为实现更精细化的访问控制，您还可以通过**选择可访问的集群**来设置可访问的白名单，以限制密钥可访问的集群范围。

在 **API 密钥权限**设置中，您也可以添加 API 密钥的可访问项目。

<Admonition type="info" icon="📘" title="说明">

<p>对于创建自定义 API 密钥的项目管理员而言，您所能授予 API 密钥的权限范围取决于您自身的权限范围。</p>

</Admonition>

![zh-create-customized-api-key](/img/zh-create-customized-api-key.png)

之后，您便可以使用该自定义 API 密钥连接到集群。查看[连接集群](./connect-to-cluster)了解更多。

## 查看 API 密钥{#view-api-keys}

在 Zilliz Cloud 中，只有组织管理员或项目管理员才有权查看已创建的 API 密钥。

- **个人密钥**：组织[管理员](./user-roles)或项目管理员可以查看组织内为用户生成的 API 密钥名称。但是，他们无法获取个人 API 密钥的实际值，以此来保障用户隐私和安全性。

- **自定义密钥**：组织[管理员](./user-roles)有权查看组织内所有已创建的自定义 API 密钥。如果您是项目管理员，您只能查看自身管理权限范围内的 API 密钥。

![zh-view-api-keys](/img/zh-view-api-keys.png)

## 编辑 API 密钥{#edit-an-api-key}

作为组织[管理员](./user-roles)或项目管理员，您可以编辑 API 密钥，包括更改密钥名称或修改访问权限。

- **更改自定义密钥名称**：只有组织管理员有权限更改自定义 API 密钥的名称。

- **修改访问权限**：作为组织管理员，您可以修改自定义 API 密钥的访问权限。如果您是项目管理员，您修改 API 密钥权限的能力将取决于您已有的权限范围。也就是说，作为项目管理员，您无法将权限提升到超出您当前访问权限的更高级别，以确保不会发生权限膨胀。

<Admonition type="info" icon="📘" title="说明">

<p>暂不支持编辑个人密钥。只有自定义 API 密钥才可被编辑。</p>

</Admonition>

![zh-edit-api-key](/img/zh-edit-api-key.png)

## 重置 API 密钥{#reset-an-api-key}

为保持访问控制的安全性和完整性，重置 API 密钥是至关重要的。根据密钥的类型，其处理方式也有所不同：

- **个人密钥**：无论用户角色如何，组织中的每个用户都有权重置自己的个人 API 密钥，并且只能重置自己的密钥。这确保用户能够迅速应对任何安全问题或访问障碍，并通过重置生成新的密钥来维护安全、个性化的访问系统。

- **自定义密钥**：只有组织[管理员](./user-roles)有权重置自定义 API 密钥。这种控制级别在管理广泛的组织级访问和安全方面至关重要。组织管理员可以通过重置这些密钥来解决安全问题或更新访问协议，以确保应用级别访问的完整性不受影响。

<Admonition type="caution" icon="🚧" title="警告">

<p>此操作将重置并使当前 API 密钥失效。依赖此密钥的任何代码将停止运行，直至您用新密钥更新相关代码。</p>

</Admonition>

![zh-reset-api-key](/img/zh-reset-api-key.png)

## 删除 API 密钥{#delete-an-api-key}

当不再需要某个 API 密钥时，作为组织[管理员](./user-roles)，您可以将其删除。

只有自定义 API 密钥可以被删除。个人密钥可以由用户本人重置，但无法删除。

<Admonition type="caution" icon="🚧" title="警告">

<p>删除 API 密钥时，请谨慎操作。这将立即撤销所有使用该密钥的资源的访问权限。</p>

</Admonition>

![zh-delete-api-key](/img/zh-delete-api-key.png)

## 文档推荐{#related-topics}

- [连接集群](./connect-to-cluster)

- [管理身份凭证](./cluster-credentials-console)

- [设置白名单](./set-up-whitelist)

- [管理 MFA](./multi-factor-auth) 

