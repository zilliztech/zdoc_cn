---
displayed_sidebar: apiSidebar
sidebar_position: 1
slug: /api/java/search
---

# search()

调用接口基于一个或多个向量执行近似最近邻（Approximate Nearest Neighbor，ANN）检索。Zilliz Cloud 支持在检索中指定布尔表达式。

```Java
R<SearchResults> search(SearchParam requestParam);
```

## 请求示例

```Java
import io.milvus.param.*;
import io.milvus.response.SearchResultsWrapper;
import io.milvus.grpc.SearchResults;

SearchParam param = SearchParam.newBuilder()
        .withCollectionName("collection1")
        .withMetricType(MetricType.IP)
        .withTopK(10)
        .withVectors(targetVectors)
        .withVectorFieldName("field1")
        .withConsistencyLevel(ConsistencyLevelEnum.EVENTUALLY)
        .withParams("{\"nprobe\":10,\"offset\":2, \"limit\":3}")
        .build();
R<SearchResults> response = client.search(param)
if (response.getStatus() != R.Status.Success.getCode()) {
    System.out.println(response.getMessage());
}

SearchResultsWrapper wrapper = new SearchResultsWrapper(response.getData().getResults());
System.out.println("Search results:");
for (int i = 0; i < targetVectors.size(); ++i) {
    List<SearchResultsWrapper.IDScore> scores = results.getIDScore(i);
    for (int j = 0; j < scores.size(); ++j) {
        SearchResultsWrapper.IDScore score = scores.get(j);
        System.out.println("Top " + j + " ID:" + score.getLongID() + " Distance:" + score.getScore());
    }
}
```

## SearchParam

使用 `SearchParam.Builder` 构建 `SearchParam` 对象。

```Java
import io.milvus.param.SearchParam;
SearchParam.Builder builder = SearchParam.newBuilder();
```

`SearchParam.Builder` 方法：

| 方法                                                       | 描述                                                  | 参数                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `withCollectionName(collectionName)`                         | 设置 Collection 名称。Collection 名称不能为空或 null。 | `collectionName`：目标 Collection 名称。                |
| `withConsistencyLevel(ConsistencyLevelEnum consistencyLevel)` | 设置查询中使用的一致性级别。 如果不指定一致性级别，则默认级别为 `ConsistencyLevelEnum.BOUNDED`。| `consistencyLevel`：检索中使用的一致性级别。 |
| `withPartitionNames(List<String> partitionNames)`            | （可选）设置分片名称。 | `partitionNames`：分片名称列表。  |
| `addPartitionName(String partitionName)`                     | （可选）添加分片指定查询范围。          | `partitionName`: 目标分片名称。        |
| `withTravelTimestamp(Long ts)`                               | （可选）在查询中指定绝对时间戳，以根据指定时间点的数据视图获取结果。 默认值为 0，服务器在完整数据视图上执行查询。 | `ts`：绝对时间戳值。                        |
| `withOutFields(List<String> outFields)`                      | （可选）指定输出标量字段。 如果指定了输出字段，则 `query()` 返回的 `QueryResults` 将包含这些字段的值。 | `outFields`：指定返回字段。                 |
| `addOutField(String fieldName)`                              | （可选）指定输出标量字段。                 | `fieldName`：字段名称。                   |
| `withExpr(String expr)`                                      | 设置查询实体的表达式。 | `expr`：查询使用的布尔表达式。             |
| `withMetricType(MetricType metricType)`                      | 设置 ANN 检索使用的相似度类型。默认值为 `MetricType.L2`。 | `metricType`：相似度类型。                                   |
| `withVectorFieldName(String vectorFieldName)`                | 设置向量字段名称。该参数不能为空。 | `vectorFieldName`：向量字段名称。                      |
| `withTopK(Integer topK)`                                     | 设置相似度搜索的 topK 值。 有效值范围： [1, 16384]。 | `topK`：相似度搜索的 topK 值。                                          |
| `withVectors(List<?> vectors)`                               | 设置目标向量。 最多允许 16384 个向量。    | `vectors`:  <li> 如果目标字段类型是浮点向量，则需要 `List< List<Float>>`。</li> <li>如果目标字段类型是二进制向量，则需要`List<ByteBuffer>`。</li> |
| `withRoundDecimal(Integer decimal)`                          | 指定返回距离的小数位。可用范围为 [-1, 6]。 默认值为 `-1`，该方法返回所有数字。 | `decimal`：返回距离的小数位。 |
|  `withParams(String params)` | 指定 JSON 格式的搜索参数。 有效键： <br/><ul><li>特殊的索引相关参数，例如 `nprobe`、`ef` 和 `search_k`。</li><li>相似度类型 `metric_type` 的有效值为 `L2` 和 `IP`。</li><li>位置偏离 `offset` 的有效值为整数。</li><li>限制返回结果参数 `limit` 的有效值为整数。</li></ul> |
| `withIgnoreGrowing(Boolean ignoreGrowing)` | 在相似性搜索期间是否忽略新增的数据片段。默认值为 `false`，表示搜索包含新增的数据片段。 | `ignoreGrowing`：是否忽略新增的数据片段。 |
| `build()`                                                    | 构建  `SearchParam` 对象。                         | N/A                                                          |

`SearchParam.Builder.build()` 可能会抛出以下异常：

- `ParamException`：如果指定参数为无效参数则抛出此异常。

## 返回结果

此方法捕获所有异常并返回 `R<SearchResults>` 对象。

- 如果 API 调用在服务器端失败，会从服务器返回错误代码和消息。

- 如果 API 调用因 RPC 异常而失败，则会返回 `R.Status.Unknow` 和异常的错误消息。

- 如果 API 调用成功，返回 `SearchResults`。您可以通过 `SearchResultsWrapper` 获取信息。

## SearchResultsWrapper

封装 `SearchResults` 的工具类。

```Java
import io.milvus.response.SearchResultsWrapper;
SearchResultsWrapper wrapper = new SearchResultsWrapper(searchResults);
```

`SearchResultsWrapper` 方法：

| 方法                          | 描述                                              | 参数                                               | 返回类型      |
| ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------- |
| `getFieldData(String fieldName, int indexOfTarget)` | 获取通过 `SearchParam` 指定的输出字段的数据。 如果字段不存在或 `indexOfTarget` 非法，则抛出 `ParamException`。 | `fieldName`：由 `SearchParam.indexOfTarget` 的 `withOutFields()` 指定的字段名称。 | <li>如果是浮点向量字段，返回 `List<List<Float>>`。</li> <li>如果是二进制向量字段，返回 `List<ByteBuffer>`。</li> <li>如果是 Int64 类型，返回 `List<Long>`。</li> <li>如果是 Int32/Int16/Int8 类型，返回 `List<Integer>`。</li> <li>如果是 Bool 字段，返回 `List<Boolean>`。</li> <li>如果是浮点类型，返回 `List<Float>`。</li> <li>如果是 Double 类型，返回 `List<Double>`。</li> <li>如果是 VARCHAR 类型，返回  `List<String>`。</li> |
| `getIDScore(int indexOfTarget)`                     | 获取由 `search()` 返回的 ID-score 对。 如果 `indexOfTarget` 非法，则抛出 `ParamException`。 如果返回的结果非法，则抛出 `IllegalResponseException`。 | `indexOfTarget`：目标向量排序。            | `List<IDScore>`                                              |

## IDScore

保存 ID 和距离的工具类。

`SearchResultsWrapper.IDScore` 方法：

| 方法     |描述                                    | 返回类型 |
| -------------- | -------------------------------------------------- | ----------- |
| `getLongID() ` | 如果主键类型为 Int64，则获取整数 ID。  | long        |
| `getStrID()`   | 如果主键类型为 VarChar，则获取字符串 ID。 | String      |
| `getScore()`   | 获取距离值。                               | float       |

getScore() 是否是准确的距离取决于索引类型：

- FLAT
        
    **is** 代表是准确距离。
        
- IVF_FLAT
        
    **is** 代表是准确距离。
        
- IVF_SQ8/IVF_PQ
        
    **not** 代表不是准确距离。
        
- HNSW/ANNOY
        
    **is** 代表是准确距离。