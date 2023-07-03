---
displayed_sidebar: apiSidebar
sidebar_position: 4
slug: /api/java/delete
---

# delete()

调用接口按主键删除 Collection 中的 Entity。您也可以在请求中指定布尔表达式。

```Java
R<MutationResult> delete(DeleteParam requestParam);
```

## 请求示例

```Java
import io.milvus.param.*;
import io.milvus.grpc.MutationResult;

DeleteParam param = DeleteParam.newBuilder()
        .withCollectionName(collectionName)
        .withPartitionName(partitionName)
        .withExpr("id in [100, 200, 300]")
        .build();
R<MutationResult> response = milvusClient.delete(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

## DeleteParam

使用 `DeleteParam.Builder` 构建 `DeleteParam` 对象。

```Java
import io.milvus.param.DeleteParam;
DeleteParam.Builder builder = DeleteParam.newBuilder();
```

`DeleteParam.Builder` 方法：

| 方法                                    | 描述                                                  | 参数                                                   |
| ----------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)` | 设置 Collection 名称。Collection 名称不能为空。 | `collectionName`：目标 Collection 名称。 |
| `withPartitionName(String partitionName)` | （可选）设置目标分片名称。                   | `partitionName`：目标分片名称。 |
| `withExpr(String expr)`                   | 设置表达式过滤以挑选出要删除的 Entity。 目前仅支持 `pk_field in [1, 2, ...]` 格式的表达式。 | `expr`：用于过滤主键字段的表达式。                   |
| `build()`                                 | 构建 `DeleteParam` 对象。                           | N/A                                                          |

`DeleteParam.Builder.build()` 可能会抛出以下异常：

- `ParamException`：如果指定参数为无效参数则抛出此异常。

## 返回结果

此方法捕获所有异常并返回 `R<MutationResult>` 对象。

- 如果 API 调用在服务器端失败，会从服务器返回错误代码和消息。

- 如果 API 调用因 RPC 异常而失败，则会返回 `R.Status.Unknow` 和异常的错误消息。

- 如果 API 调用成功，返回  `MutationResult`。您可以通过 `MutationResultWrapper` 获取信息。有关 `MutationResultWrapper` 的更多信息，请参见 [insert()](insert().md#MutationResultWrapper)。