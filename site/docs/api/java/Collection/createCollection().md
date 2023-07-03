---
displayed_sidebar: apiSidebar
sidebar_position: 0
slug: /api/java/create_collection
---

# createCollection()

调用接口创建 Collection。

```java
R<RpcStatus> createCollection(CreateCollectionParam requestParam);
```

## 请求示例

```java
import io.milvus.param.*;

List<FieldType> fieldsSchema = new ArrayList<>();
FieldType field_1 = FieldType.newBuilder()
        .withPrimaryKey(true)
        .withAutoID(false)
        .withDataType(DataType.Int64)
        .withName("uid")
        .withDescription("unique id")
        .build();

fieldsSchema.add(field_1);

FieldType field_2 = FieldType.newBuilder()
        .withDataType(DataType.FloatVector)
        .withName("embedding")
        .withDescription("embeddings")
        .withDimension(dimension)
        .build();
fieldsSchema.add(field_2);

// create collection
CreateCollectionParam param = CreateCollectionParam.newBuilder()
        .withCollectionName(collectionName)
        .withDescription("a collection for search")
        .withFieldTypes(fieldsSchema)
        .build();

R<RpcStatus> response = client.createCollection(param);
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}
```

## CreateCollectionParam

使用 `CreateCollectionParam.Builder` 构建 `CreateCollectionParam` 对象。

```Java
import io.milvus.param.CreateCollectionParam;
CreateCollectionParam.Builder builder = CreateCollectionParam.newBuilder();
```

`CreateCollectionParam.Builder` 方法：

| 方法                                       | 描述                                                  | 参数                                                   |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(String collectionName)`  | 设置 Collection 名称。 Collection 名称不能为空。 | `collectionName`：待创建的 Collection 的名称。      |
| `withShardsNum(int shardsNum)`               | 设置分片的数量。 分片数量必须大于 0。 默认值为 2。 | `shardsNum`：将插入的数据分割成的分片数量。 多个分片由 Milvus 中的多个节点处理。 |
| `withDescription(String description)`        | 设置 Collection 的描述信息。 描述可以为空。 | `description`: 待创建的 Collection 的描述信息。  |
| `withFieldTypes(List<FieldType> fieldTypes)` | 为 Collection 设置 Schema。该参数不能留空。 | `fieldTypes`: 一或多列 `FieldType`。 |
| `addFieldType(FieldType fieldType)`          | 添加字段 Schema。                                         | `fieldType`：要添加到 Collection 的字段 Schema。 |
| `build()`                                    | 构建 `CreateCollectionParam` 对象。                 | N/A                                                          |

`CreateCollectionParam.Builder.build()` 可能抛出以下异常：

- `ParamException`：如果指定参数为无效参数则抛出此异常。

## FieldType

代表字段的工具类。使用 `FieldType.Builder` 构建 `FieldType` 对象。

```Java
import io.milvus.param.FieldType;
FieldType.Builder builder = FieldType.newBuilder();
FieldType ft = builder.build()
```

`FieldType.Builder` 方法：

| 方法                                                       | 描述                                                  | 参数                                                   |
| ---------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withName(String name)`                  | 设置字段的名称。 该名称不能为空。 | `Name`: 字段名称。                               |
| `withPrimaryKey(primaryKey)`     | 设置该字段为主键字段。 只有数据类型为 `int64` 或`varchar` 的字段才能设置为主键字段。 默认值为 `false`。 | `primaryKey`: 布尔值，指定该字段是否为主键字段。 `true` 表示该字段是主键字段，`false` 表示不是主键字段。 |
| `withDescription(String description)`    | 设置字段描述。 描述可以为空。 | `Description`: 字段描述。                 |
| `withDataType(DataType dataType)`        | 设置字段的数据类型。 | `dataType`：字段的数据类型。                      |
| `addTypeParam(String key, String value)` | 为字段添加参数对。 主要用于为向量字段和VARCHAR 字段设置额外的参数。 | `key`：参数键。`Value`：参数值。       |
| `withDimension(Integer dimension)`       | 设置向量字段的维度。 向量维度必须大于 0。 该方法内部调用 `addTypeParam()` 来存储维度值。 | `dimension`：向量字段的维度。              |
| `withMaxLength(Integer maxLength)`       | 设置 varchar 字段的最大长度。 该值必须大于 0。 该方法内部调用 `addTypeParam()` 来存储最大长度值。 | `maxLength`：varchar 字段的最大长度。       |
| `withAutoID(boolean autoID)`             | 启用字段的自动 ID 功能。 请注意，自动 ID 功能只能在主键字段上启用。 如果启用自动 ID 功能，Milvus 会自动为每个 Entity 生成唯一的 ID，这样在插入数据时无需提供主键字段的值。 如果禁用自动 ID，则需要在数据插入期间提供主键字段的值。 | `autoID`：布尔值，表示主键是否自动生成。 `true` 表示启用自动 ID，`false` 表示未启用自动 ID。 |
| `build()`                                | 创建 `FieldType` 对象。                                 | N/A                                                          |

## 返回结果

此方法捕获所有异常并返回 `R<RpcStatus>` 对象。

- 如果 API 调用在服务器端失败，会从服务器返回错误代码和消息。

- 如果 API 调用因 RPC 异常而失败，则会返回 `R.Status.Unknow` 和异常的错误消息。

- 如果 API 调用成功，返回 `R.Status.Success`。