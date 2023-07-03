---
displayed_sidebar: apiSidebar
sidebar_position: 2
slug: /api/java/query
---

# query()

调用接口查询 Collection 中满足指定条件的 Entity。

```Java
R<QueryResults> query(QueryParam requestParam);
```

## 请求示例

```Java
import io.milvus.param.*;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.response.FieldDataWrapper;
import io.milvus.grpc.QueryResults;

QueryParam param = QueryParam.newBuilder()
        .withCollectionName("collection1")
        .withExpr("id in [100, 101]")
        .addOutFields("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .build();
R<QueryResults> response = client.query(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

QueryResultsWrapper wrapper = new QueryResultsWrapper(response.getData());
FieldDataWrapper fieldData = queryResultsWrapper.getFieldWrapper("field1");
System.out.println("Field " + fieldName + " row count: " + fieldData.getRowCount());
System.out.println(fieldData.getFieldData());
```

## QueryParam

使用 `QueryParam.Builder` 构建 `QueryParam` 对象。

```Java
import io.milvus.param.QueryParam;
QueryParam.Builder builder = QueryParam.newBuilder();
```

`QueryParam.Builder` 方法：

| 方法                                                       | 描述                                                  | 参数                                               |
| ------------------------------------------------------------ | ------------------------------------------------------------ | -------------------------------------------------------- |
| `withCollectionName(collectionName)`                         | 设置 Collection 名称。Collection 名称不能为空或 null。 | `collectionName`：目标 Collection 名称。                |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | 设置查询中使用的一致性级别。 如果不指定一致性级别，则默认级别为 `ConsistencyLevelEnum.BOUNDED`。 | `consistencyLevel`：查询中使用的一致性级别。 |
| `withPartitionNames(List<String> partitionNames)`            | 设置分片名称（可选）。 | `partitionNames`：分片名称列表。  |
| `addPartitionName(String partitionName)`                     | 添加分片指定查询范围（可选）。          | `partitionName`：目标分片名称。        |
| `withTravelTimestamp(Long ts)`                               | 在查询中指定绝对时间戳，以根据指定时间点的数据视图获取结果（可选）。 默认值为 0，服务器在完整数据视图上执行查询。 | `ts`：绝对时间戳值。                       |
| `withOutFields(List<String> outFields)`                      | 指定输出标量字段（可选）。 如果指定了输出字段，则 `query()` 返回的 `QueryResults` 将包含这些字段的值。 | `outFields`：指定返回字段。                 |
| `addOutField(String fieldName)`                              | 指定输出标量字段（可选）。                 | `fieldName`：字段名称。                   |
| `withExpr(String expr)`                                      | 设置查询实体的表达式。 | `expr`：查询使用的布尔表达式。         |
| `withOffset(Long offset)`	| 设置位置偏离，之前返回的 Entity 将被忽略。该参数仅在指定了 `limit` 值时才起作用。 默认值为 0，即从第一个开始返回 Entity。 | `offset`：位置偏离值。 |
| `withLimit(Long limit)` | 限制返回的 Entity 数量。 它必须是一个正整数。 默认值为 0，表示无限制返回所有的 Entity。	| `limit`：限制返回的 Entity 数量。 |
| `withIgnoreGrowing(Boolean ignoreGrowing)` | 在相似性搜索期间是否忽略新增的数据片段。默认值为 `false`，表示搜索包含新增的数据片段。 | `ignoreGrowing`：是否忽略新增的数据片段。 |
| `build()`                                                    | 构建 `QueryParam` 对象。                          | N/A                                                      |

`QueryParam.Builder.build()` 可能会抛出以下异常：

- `ParamException`：如果指定参数为无效参数则抛出此异常。

## 返回结果

此方法捕获所有异常并返回 `R<QueryResults>` 对象。

- 如果 API 调用在服务器端失败，会从服务器返回错误代码和消息。

- 如果 API 调用因 RPC 异常而失败，则会返回 `R.Status.Unknow` 和异常的错误消息。

- 如果 API 调用成功，返回 `QueryResults`。您可以通过 `QueryResultsWrapper` 获取信息。

## QueryResultsWrapper

封装 `QueryResults` 的工具类。

```Java
import io.milvus.response.QueryResultsWrapper;
QueryResultsWrapper wrapper = new QueryResultsWrapper(queryResults);
```

`QueryResultsWrapper` 方法：

| 方法                          | 描述                                              | 参数                                               | 返回类型      |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| `getFieldWrapper(String fieldName)` | 按字段名称返回 `FieldDataWrapper` 对象。如果指定字段不存在，则抛出 `ParamException` 错误。 | `fieldName`：由 `QueryParam` 的 `withOutFields()` 指定的字段名称。 | FieldDataWrapper |

## FieldDataWrapper

工具类，用于封装 `query()` 返回的字段数据。

`FieldDataWrapper` 方法：

| 方法        | 描述                                              | 返回类型                                                  |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `isVectorField()` | 是否为向量字段。 | Boolean                                                      |
| `getDim()`        | 如果为向量字段，则获取维度值。 如果不是向量字段，则会抛出`IllegalResponseException`。 | int                                                          |
| `getRowCount()`   | 获取字段的行数。如果字段数据非法，则会抛出`IllegalResponseException`。 | long                                                         |
| `getFieldData()`  | 根据字段类型返回字段数据。              | <li>如果是浮点向量字段，返回 `List<List<Float>>`。</li> <li>如果是二进制向量字段，返回 `List<ByteBuffer>`。</li> <li>如果是 Int64 类型，返回 `List<Long>`。</li> <li>如果是 Int32/Int16/Int8 类型，返回 `List<Integer>`。</li> <li>如果是 Bool 字段，返回 `List<Boolean>`。</li> <li>如果是浮点类型，返回 `List<Float>`。</li> <li>如果是 Double 类型，返回 `List<Double>`。</li><li>如果是 VARCHAR 类型，返回  `List<String>`。</li> |
