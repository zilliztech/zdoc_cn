---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful
---

import Admonition from '@theme/Admonition';

# RESTful API 参考

Zilliz Cloud 提供了 RESTful API，以便您可以操作您的集群、Collection 以及存储在其中的数据。在深入了解之前，有几件事情值得注意：

Zilliz Cloud 使用 Control Plane 来集中管理集群和相关资源，而 Data Plane 则负责特定集合中的数据存储和处理。

<Admonition type="info" title="Note">

在使用 RESTful API 执行操作时，您可以使用以下两种方法进行身份验证：

- 使用 API 密钥

    要获取 API 密钥，请按照[API 密钥](/docs/manage-api-keys)中的说明进行操作。

- 使用集群令牌

    要获取集群令牌，请使用冒号（:）将目标集群的用户名和密码连接起来，如 `username:password`。注意，BYOC 集群仅支持使用集群令牌进行身份验证。

</Admonition>

Control Plane 提供了 **Cloud**、**Cluster**、**Import** 和 **Pipeline** 的相关 API 接口。Data Plane 提供了 **Collection** 和 **Vector** 的相关 API 接口。

- 使用 Control Plane API 时，您需要使用 **有效的 API 密钥** 来验证您的请求。

    以下是一个列出所有可用云提供商的示例。

    ```shell
    export API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

    curl --request GET \
        --url "https://api.cloud.zilliz.com.cn/v2/clouds" \
        --header "Authorization: Bearer ${API_KEY}" \
        --header "accept: application/json" \
        --header "content-type: application/json"
    ```

- 使用 Data Plane API 时，您可以使用 **有效的 API 密钥或有效的集群用户名和密码对** 来验证您的请求。

    以下是一个列出指定集群中所有可用集合的示例。

    ```shell
    export CLUSTER_ENDPOINT="YOUR_CLUSTER_ENDPOINT"
    export TOKEN="db_admin:xxxxxxxxxxxx"

    curl --request GET \
        --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/list" \
        --header "Authorization: Bearer ${TOKEN}" \
        --header "accept: application/json" \
        --header "content-type: application/json" \
        -d '{}'
    ```
