---
displayed_sidebar: apiSidebar
sidebar_position: 0
slug: /api/java/insert
---

# insert()

调用接口将 Entity 插入到 Collection。

```Java
R<MutationResult> insert(InsertParam requestParam);
```

## 请求示例

```Java
import io.milvus.param.*;
import io.milvus.grpc.MutationResult;

List<InsertParam.Field> fields = new ArrayList<>();
int rowCount = 10000;
List<Long> ids = new ArrayList<>();
for (long i = 0L; i < rowCount; ++i) {
    ids.add(i);
}
List<List<Float>> vectors = generateFloatVectors(rowCount);

List<InsertParam.Field> fieldsInsert = new ArrayList<>();
fieldsInsert.add(new InsertParam.Field("id", ids));
fieldsInsert.add(new InsertParam.Field("vec", vectors));

InsertParam param = InsertParam.newBuilder()
        .withCollectionName(collectionName)
        .withFields(fieldsInsert)
        .build();
R<MutationResult> response = client.insert(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

## InsertParam

使用 `InsertParam.Builder` 构建 `InsertParam` 对象。

```Java
import io.milvus.param.InsertParam;
InsertParam.Builder builder = InsertParam.newBuilder();
```

`InsertParam.Builder` 方法：

| 方法                                       | 描述                                                  | 参数                                                   |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)`  | 设置 Collection 名称。Collection 名称不能为空或 null。 | `collectionName`：目标 Collection 名称。 |
| `withPartitionName(String partitionName)`    | 设置分片名称（可选）。                    | `partitionName`：目标分片名称。 |
| `withFields(List<InsertParam.Field> fields)` | 设置要插入的数据。字段列表不能为空。 如果启用自动 ID，则主键字段不需要输入。 | `fields`：`Field` 对象列表， 每个对象代表一个字段。 |
| `build()`                                    | 构建 `InsertParam` 对象。                          |  N/A                                                         |

`InsertParam.Builder.build()` 可能会抛出以下异常：

- `ParamException`：如果指定参数为无效参数则抛出此异常。

## Field

字段的工具类。

`InsertParam.Field` 方法：

| 方法                           | 描述                                             | 参数                                              |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `Field(String name, List<?> values)` | 该类仅提供 `Constructor` 用于创建 `Field` 对象。 | `name`：字段名称。 <br/>`values`：<br/><ul><li>如果数据类型为 Bool，则 `values` 为布尔列表；</li><li>如果数据类型为 Int64，则 `values` 为长整型列表；</li><li>如果数据类型为 Float，则 `values` 为浮点数列表；</li><li>如果数据类型为 Double，则 `values` 为双精度浮点数列表；</li><li>如果数据类型为 VARCHAR，则 `values` 为字符串列表；</li><li>如果数据类型为 FloatVector，则 `values` 为浮点数列表的列表；</li><li>如果数据类型为 BinaryVector，则 `values` 为字节缓冲区列表。</li></ul>|

## 抛出

此方法捕获所有异常并返回 `R<MutationResult>` 对象。

- 如果 API 调用在服务器端失败，会从服务器返回错误代码和消息。

- 如果 API 调用因 RPC 异常而失败，则会返回 `R.Status.Unknow` 和异常的错误消息。

- 如果 API 调用成功，返回 `MutationResult`。您可以通过 `MutationResultWrapper` 获取信息。

## MutationResultWrapper

封装 `MutationResult` 的工具类。

```Java
import io.milvus.response.MutationResultWrapper;
MutationResultWrapper wrapper = new MutationResultWrapper(mutationResult);
```

`MutationResultWrapper` 方法：

| 方法         | 描述                                              | 返回类型  |
| ------------------ | ------------------------------------------------------------ | ------------ |
| `getInsertCount()` | 获取插入 Entity 的行数。                 | long         |
| `getLongIDs()`     | 如果主键字段为 int64 类型，则获取 `insert()` 接口返回的长整型 ID 数组。 如果主键类型不是 `int64`，则抛出 `ParamException`。 | `List<Long>`   |
| `getStringIDs()`   | 如果主键字段为 VARCHAR 类型，则获取 `insert()` 接口返回的字符串ID 数组。 如果主键类型不是 VARCHAR 类型，则抛出 `ParamException`。 | `List<String>` |
| `getDeleteCount()` | 获取已删除 Entity 的行数。 目前，该值始终等于输入行数。 | long         |
| `getOperationTs()` | 获取服务器标记的操作的时间戳。 您可以使用该时间戳作为查询/搜索 API 的保证时间戳。 时间戳不是绝对时间戳，而是由 UTC 时间和内部标志组合而成的混合值。 | long         |