---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful
---

# RESTful API 参考

Zilliz Cloud 提供了 RESTful API，以便您可以操作您的集群、Collection 以及存储在其中的数据。在深入了解之前，有几件事情值得注意：

Zilliz Cloud 使用 Control Plane 来集中管理集群和相关资源，而 Data Plane 则负责特定集合中的数据存储和处理。

Control Plane 提供了 **Cloud**、**Cluster**、**Import** 和 **Pipeline** 的相关 API 接口。Data Plane 提供了 **Collection** 和 **Vector** 的相关 API 接口。

- 使用 Control Plane API 时，您需要使用 **有效的 API 密钥** 来验证您的请求。

    以下是一个列出所有可用云提供商的示例。

    ```shell
    export CLOUD_REGION="ali-cn-hangzhou"
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
    export CLUSTER_ENDPOINT="https://${CLUSTER_ID}.api.${CLOUD_REGION}.zillizcloud.com"
    export TOKEN="db_admin:xxxxxxxxxxxx"

    curl --request GET \
        --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/list" \
        --header "Authorization: Bearer ${TOKEN}" \
        --header "accept: application/json" \
        --header "content-type: application/json" \
        -d '{}'
    ```
