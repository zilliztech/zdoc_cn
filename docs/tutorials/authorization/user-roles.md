---
slug: /user-roles
beta: FALSE
notebook: FALSE
type: origin
token: SXwewQ8p6i2qf8kd2YaccqKDnng
sidebar_position: 1
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - 角色

---

import Admonition from '@theme/Admonition';


# 用户角色

在 Zilliz Cloud 平台中，基于角色的访问控制（RBAC）在定义组织、项目以及集群的权限方面发挥着重要作用。RBAC 使得组织和项目的管理员能够有效地管理用户的角色和访问权限，以确保集群安全。

有关更多组织和项目信息，请参阅[资源概览](./resource-hierarchy)。

## 组织用户角色{#organization-roles}

为了实现组织层面上的精准控制访问，Zilliz Cloud 提供两种组织用户角色，规定了用户是否有权限访问特定资源或执行特定操作。

- **组织管理员**：拥有对组织的全权管理权限，包括管理系统设置、组织内的所有项目以及其他相关资源。

- **组织成员**：拥有有限的组织访问权限，可以查看组织设置，并有权邀请用户加入组织。组织成员对项目和集群级别资源的具体权限范围取决于他们在项目中的角色。

## 项目用户角色{#project-roles}

在项目层面上，Zilliz Cloud 设置了两种角色：

- **项目管理员**：拥有对项目的全权管理权限，包括管理项目设置、项目中的所有集群以及相关资源。

- **项目成员**：拥有对项目内集群的读写权限，可以查看集群详情并管理 Collection 和索引。

## 集群用户和角色概览{#cluster-users-and-roles}

### 默认用户（管理员权限）{#default-user-with-admin-role}

创建 Zilliz Cloud 集群时，系统会默认创建一个名为 `db_admin` 的集群用户，并自动生成用户密码。作为集群管理员，`db_admin` 被赋予了完整的集群管理权限，可以访问和操作所有集群级别的资源。

<Admonition type="info" icon="📘" title="说明">

<p>集群创建者将自动获得管理员角色。</p>

</Admonition>

### 其他新增用户（内置角色）{#additional-users-with-built-in-roles}

除了默认的 `db_admin` 用户之外，您还可以添加和管理其他具有不同内置角色的集群用户。这些角色分为以下几类，各自定义了用户在集群中的权限界限：

- 管理员（Admin）：拥有对集群及其关联资源的全面控制权。

- 读写权限（Read-Write）：能够读取、写入以及管理集群内的 Collection 和索引。

- 只读权限（Read-Only）：仅可查看大部分集群资源，不具备创建、修改或删除的权限。

有关管理不同角色的集群用户的更多信息，请参考[管理身份凭证](./cluster-credentials-console)。

<Admonition type="info" icon="📘" title="说明">

<ul>
<li><p>内置角色仅适用于 Dedicated 集群类型。有关更多信息，请参考<a href="./select-zilliz-cloud-service-plans">Zilliz Cloud 版本类型</a>。</p></li>
<li><p>使用集群的内置角色功能遇到问题时，请及时<a href="https://zilliz.com.cn/contact-sales">与我们联系</a>，我们将提供故障排除支持。</p></li>
</ul>

</Admonition>

## 访问权限{#access-levels-of-built-in-roles}

<table>
   <tr>
  <th><p>角色名称</p></th>
  <th><p>Web 控制台</p></th>
  <th><p>API 操作</p></th>
   </tr>
   <tr>
  <td><p><strong>组织 & 项目</strong></p></td>
  <td></td>
  <td></td>
   </tr>
   <tr>
  <td><p>组织管理员</p></td>
  <td><p>提供对整个组织内的全面访问权限：</p><ul><li><p>完全访问组织内的所有项目及项目相关功能；</p></li><li><p>完全访问<a href="./payment-billing">支付与账单</a>相关信息；</p></li><li><p>管理 <a href="./manage-api-keys">API 密钥</a>；</p></li><li><p>管理<a href="./organization-users">组织成员</a>；</p></li><li><p>完全访问<a href="./metrics-and-alerts">指标与告警</a>；</p></li><li><p>查看<a href="./view-activities_1">事件</a>；</p></li><li><p>管理<a href="./organization-settings">组织设置</a>；</p></li><li><p>使用<a href="./use-recycle-bin">回收站</a>。</p></li></ul></td>
  <td><p><strong>RESTful</strong></p><ul><li><p>Cloud (<a href="/reference/restful/list-cloud-providers">list cloud providers</a> &amp; <a href="/reference/restful/list-cloud-regions">regions</a>)</p></li><li><p>Cluster (<a href="/reference/restful/create-cluster">create</a>, <a href="/reference/restful/list-clusters">list</a>, <a href="/reference/restful/describe-cluster">describe</a>, <a href="/reference/restful/drop-cluster">drop</a>, <a href="/reference/restful/modify-cluster">modify</a>, <a href="/reference/restful/resume-cluster">resume</a>, <a href="/reference/restful/suspend-cluster">suspend</a>, <a href="/reference/restful/list-projects">list projects</a>)</p></li><li><p>Import (<a href="/reference/restful/import">import</a>, <a href="/reference/restful/get-import-progress">get import progress</a>, <a href="/reference/restful/list-import-jobs">list import jobs</a>)</p></li><li><p>Collection (<a href="/reference/restful/list-collections">list</a>, <a href="/reference/restful/create-collection">create</a>, <a href="/reference/restful/describe-collection">describe</a>, <a href="/reference/restful/drop-collection">drop</a>)</p></li><li><p>Vector (<a href="/reference/restful/delete">delete</a>, <a href="/reference/restful/insert">insert</a>, <a href="/reference/restful/search">search</a>, <a href="/reference/restful/query">query</a>, <a href="/reference/restful/get">get</a>, <a href="/reference/restful/upsert">upsert</a>)</p></li></ul><p><strong>SDK (Python, Java, Go, Node.js)</strong></p><ul><li><p>Credential (create, delete, list, update, addUserToRole, selectUser)</p></li><li><p>Alias (create, drop, describe, alter, list)</p></li><li><p>System (getVersion, checkHealth)</p></li><li><p>Collection (create, drop, describe, show, load, release, flush, getFlushState, compaction, getStatistics, rename)</p></li><li><p>Partition (create, drop, hasPartition, load, release, show)</p></li><li><p>Index (create, drop, getIndexState, getIndexBuildProgress, describeIndex)</p></li><li><p>Vector (search, insert, delete, get,  query)</p></li></ul></td>
   </tr>
   <tr>
  <td><p>项目管理员</p></td>
  <td><p>提供对整个项目内的全面访问权限：</p><ul><li><p>完全访问项目内的所有<a href="./manage-cluster">集群</a>；</p></li><li><p>管理<a href="./project-users">项目成员</a>；</p></li><li><p>指定范围内的 <a href="./manage-api-keys">API 密钥</a>访问；</p></li><li><p>访问<a href="./set-up-whitelist">白名单</a>和<a href="./setup-a-private-link">私网连接</a>信息；</p></li><li><p>访问<a href="./manage-project-alerts">项目告警</a>。</p></li><li><p>完全访问<a href="./backup-and-restore">备份与恢复</a>。</p></li><li><p>查看和管理<a href="./job-center">项目任务</a>。</p></li></ul></td>
  <td><p><strong>RESTful</strong></p><ul><li><p>Cloud (<a href="/reference/restful/list-cloud-providers">list cloud providers</a> &amp; <a href="/reference/restful/list-cloud-regions">regions</a>)</p></li><li><p>Cluster (<a href="/reference/restful/create-cluster">create</a>, <a href="/reference/restful/list-clusters">list</a>, <a href="/reference/restful/describe-cluster">describe</a>, <a href="/reference/restful/drop-cluster">drop</a>, <a href="/reference/restful/modify-cluster">modify</a>, <a href="/reference/restful/resume-cluster">resume</a>, <a href="/reference/restful/suspend-cluster">suspend</a>, <a href="/reference/restful/list-projects">list projects</a>)</p></li><li><p>Import (<a href="/reference/restful/import">import</a>, <a href="/reference/restful/get-import-progress">get import progress</a>, <a href="/reference/restful/list-import-jobs">list import jobs</a>)</p></li></ul><p></p><ul><li><p>Collection (<a href="/reference/restful/list-collections">list</a>, <a href="/reference/restful/create-collection">create</a>, <a href="/reference/restful/describe-collection">describe</a>, <a href="/reference/restful/drop-collection">drop</a>)</p></li><li><p>Vector (<a href="/reference/restful/delete">delete</a>, <a href="/reference/restful/insert">insert</a>, <a href="/reference/restful/search">search</a>, <a href="/reference/restful/query">query</a>, <a href="/reference/restful/get">get</a>, <a href="/reference/restful/upsert">upsert</a>)</p></li></ul><p><strong>SDK (Python, Java, Go, Node.js)</strong></p><ul><li><p>Credential (create, delete, list, update, addUserToRole, selectUser)</p></li><li><p>Alias (create, drop, describe, alter, list)</p></li><li><p>System (getVersion, checkHealth)</p></li><li><p>Collection (create, drop, describe, show, load, release, flush, getFlushState, compaction, getStatistics, rename)</p></li><li><p>Partition (create, drop, hasPartition, load, release, show)</p></li><li><p>Index (create, drop, getIndexState, getIndexBuildProgress, describeIndex)</p></li><li><p>Vector (search, insert, delete, get,  query)</p></li></ul></td>
   </tr>
   <tr>
  <td><p>项目成员</p></td>
  <td><p>提供对项目内所有集群的读写权限：</p><ul><li><p>查看集群信息，但无法创建或管理集群；</p></li><li><p>管理 <a href="./manage-collections">Collection</a> 和 <a href="./manage-indexes">索引</a>。</p></li><li><p>查看<a href="./view-snapshot-details">备份文件</a>，但不能创建备份或从备份中恢复。</p></li><li><p>查看<a href="./job-center">项目任务</a>，但不能取消或重试失败任务。</p></li></ul></td>
  <td><p><strong>RESTful</strong></p><ul><li><p>Cloud (<a href="/reference/restful/list-cloud-providers">list cloud providers</a> &amp; <a href="/reference/restful/list-cloud-regions">regions</a>)</p></li><li><p>Import (<a href="/reference/restful/import">import</a>, <a href="/reference/restful/get-import-progress">get import progress</a>, <a href="/reference/restful/list-import-jobs">list import jobs</a>)</p></li></ul><p></p><ul><li><p>Collection (<a href="/reference/restful/list-collections">list</a>, <a href="/reference/restful/create-collection">create</a>, <a href="/reference/restful/describe-collection">describe</a>, <a href="/reference/restful/drop-collection">drop</a>)</p></li><li><p>Vector (<a href="/reference/restful/delete">delete</a>, <a href="/reference/restful/insert">insert</a>, <a href="/reference/restful/search">search</a>, <a href="/reference/restful/query">query</a>, <a href="/reference/restful/get">get</a>, <a href="/reference/restful/upsert">upsert</a>)</p></li></ul><p><strong>SDK (Python, Java, Go, Node.js)</strong></p><ul><li><p>Alias (create, drop, describe, alter, list)</p></li><li><p>System (getVersion, checkHealth)</p></li><li><p>Collection (create, drop, describe, show, load, release, flush, getFlushState, compaction, getStatistics, rename)</p></li><li><p>Partition (create, drop, hasPartition, load, release, show)</p></li><li><p>Index (create, drop, getIndexState, getIndexBuildProgress, describeIndex)</p></li><li><p>Vector (search, insert, delete, get,  query)</p></li></ul></td>
   </tr>
   <tr>
  <td><p>集群内置角色</p></td>
  <td></td>
  <td></td>
   </tr>
   <tr>
  <td><p>管理员 (<code>db_admin</code>)</p></td>
  <td><p>提供指定集群的完全访问权限。</p></td>
  <td><p><strong>RESTful</strong></p><ul><li><p>Collection (<a href="/reference/restful/list-collections">list</a>, <a href="/reference/restful/create-collection">create</a>, <a href="/reference/restful/describe-collection">describe</a>, <a href="/reference/restful/drop-collection">drop</a>)</p></li><li><p>Vector (<a href="/reference/restful/delete">delete</a>, <a href="/reference/restful/insert">insert</a>, <a href="/reference/restful/search">search</a>, <a href="/reference/restful/query">query</a>, <a href="/reference/restful/get">get</a>, <a href="/reference/restful/upsert">upsert</a>)</p></li></ul><p><strong>SDK (Python, Java, Go, Node.js)</strong></p><ul><li><p>Credential (create, delete, list, update, addUserToRole, selectUser)</p></li><li><p>Alias (create, drop, describe, alter, list)</p></li><li><p>System (getVersion, checkHealth)</p></li><li><p>Collection (create, drop, describe, show, load, release, flush, getFlushState, compaction, getStatistics, rename)</p></li><li><p>Partition (create, drop, hasPartition, load, release, show)</p></li><li><p>Index (create, drop, getIndexState, getIndexBuildProgress, describeIndex)</p></li><li><p>Vector (search, insert, delete, get,  query)</p></li></ul></td>
   </tr>
   <tr>
  <td><p>读写权限 (<code>db_rw</code>)</p></td>
  <td><p>提供指定集群的读写权限。</p></td>
  <td><p><strong>RESTful</strong></p><ul><li><p>Collection (<a href="/reference/restful/list-collections">list</a>, <a href="/reference/restful/create-collection">create</a>, <a href="/reference/restful/describe-collection">describe</a>, <a href="/reference/restful/drop-collection">drop</a>)</p></li><li><p>Vector (<a href="/reference/restful/delete">delete</a>, <a href="/reference/restful/insert">insert</a>, <a href="/reference/restful/search">search</a>, <a href="/reference/restful/query">query</a>, <a href="/reference/restful/get">get</a>, <a href="/reference/restful/upsert">upsert</a>)</p></li></ul><p><strong>SDK (Python, Java, Go, Node.js)</strong></p><ul><li><p>System (getVersion, checkHealth)</p></li><li><p>Alias (create, drop, describe, alter, list)</p></li><li><p>Collection (create, drop, describe, show, load, release, flush, getFlushState, rename)</p></li><li><p>Partition (create, drop, hasPartition, load, release, show)</p></li><li><p>Index (create, drop, getIndexState, getIndexBuildProgress, describeIndex)</p></li><li><p>Vector (search, insert, delete, get,  query)</p></li></ul></td>
   </tr>
   <tr>
  <td><p>只读权限 (<code>db_ro</code>)</p></td>
  <td><p>提供指定集群的只读权限。</p></td>
  <td><p><strong>RESTful</strong></p><ul><li><p>Collection (<a href="/reference/restful/list-collections">list</a>, <a href="/reference/restful/describe-collection">describe</a>)</p></li><li><p>Vector (<a href="/reference/restful/search">search</a>, <a href="/reference/restful/query">query</a>, <a href="/reference/restful/get">get</a>)</p></li></ul><p><strong>SDK (Python, Java, Go, Node.js)</strong></p><ul><li><p>Alias (describe, list)</p></li><li><p>System (getVersion, checkHealth)</p></li><li><p>Collection (describe, show, load)</p></li><li><p>Partition (hasPartition, show)</p></li><li><p>Index (getIndexState, getIndexBuildProgress, describeIndex)</p></li><li><p>Vector (search, get,  query)</p></li></ul></td>
   </tr>
</table>

## 相关文档{#related-topics}

- [权限概览](./resource-hierarchy)

- [管理组织与成员](./organizations)

- [管理项目与成员](./projects)

