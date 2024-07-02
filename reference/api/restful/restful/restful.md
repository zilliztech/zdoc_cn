---
displayed_sidebar: restfulSidebar
sidebar_position: 0
slug: /restful
---

# RESTful API 参考

Zilliz Cloud 提供了 RESTful API，以便您可以操作您的集群、集合以及存储在其中的数据。在深入了解之前，有几件事情值得注意：

## Control Plane 和 Data Plane

Zilliz Cloud 使用 Control Plane 来集中管理集群和相关资源，而 Data Plane 则负责特定集合中的数据存储和处理。

Control Plane 提供了 **Cloud Meta**、**集群操作**、**导入操作** 和 **流水线操作** 的 API。Data Plane 提供了 **集合操作** 和 **向量操作** 的 API。

- 使用 Control Plane API 时，您需要使用 **有效的 API 密钥** 来验证您的请求。

    以下是一个列出所有可用云提供商的示例。

    ```shell
    export CLOUD_REGION="gcp-us-west1"
    export API_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

    curl --request GET \
        --url "https://controller.api.${CLOUD_REGION}.zillizcloud.com/v1/clouds"  \
        --header "Authorization: Bearer ${API_KEY}" \
        --header "accept: application/json" \
        --header "content-type: application/json"
    ```

- 使用 Data Plane API 时，您可以使用 **有效的 API 密钥或有效的集群用户名和密码对** 来验证您的请求。

    以下是一个列出指定集群中所有可用集合的示例。

    ```shell
    export CLOUD_REGION="gcp-us-west1"
    export CLUSTER_ID="inxx-xxxxxxxxxxxxxxxxxxx"
    export CLUSTER_ENDPOINT="https://${CLUSTER_ID}.api.${CLOUD_REGION}.zillizcloud.com" 
    export CLUSTER_USER="username"
    export CLUSTER_PASSWORD="password"

    curl --request GET \
        --url "${CLUSTER_ENDPOINT}/v1/vector/collections" \
        --header "Authorization: Bearer ${CLUSTER_USER}:${CLUSTER_PASSWORD}" \
        --header "accept: application/json" \
        --header "content-type: application/json"
    ```

## API 版本控制

对于所有与 Milvus 2.4 及以上版本兼容的 Zilliz Cloud **集群**，您应该使用 **v2** 进行所有数据平面的操作。

有关详细信息，请参考以下参考页面：

import DocCardList from '@theme/DocCardList';

<DocCardList />
