---
slug: /use-bulkwriter
beta: FALSE
notebook: FALSE
type: origin
token: B9IdwtZhLi0tB8kb6czce8KXnvb
sidebar_position: 2
keywords: 
  - 向量数据库
  - zilliz
  - milvus
  - 大模型向量数据库
  - bulkwriter

---

import Admonition from '@theme/Admonition';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 使用 BulkWriter

如果您的数据格式不满足[准备导入数据](./prepare-source-data)中列出的各项要求，您可以使用 PyMivus 和 Milvus Java SDK 自带的 **BulkWriter** 对您的数据进行转换。

## 概述{#overview}

**BulkWriter** 用于将原始数据转换成可以批量导入到目标 Collection 的格式，并在 Zilliz Cloud 控制台、Milvus SDK 的 **BulkInsert** 接口，以及 RESTful API 的 Import 接口中使用。目前，有如下两种 **BulkWriter**。

- **LocalBulkWriter** 读取指定数据集并将其转换为适用的格式。

- **RemoteBulkWriter** 完成 **LocalBulkWriter** 的所有工作，并将转换后的文件上传到指定的远程对象存储桶中。

## 使用步骤{#procedure}

### 安装 PyMilvus{#set-up-pymilvus}

在终端中运行如下命令，安装 PyMilvus 或将其升级到最新版本。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>

<TabItem value='python'>

```python
python3 -m pip install --upgrade pymilvus
```

</TabItem>

<TabItem value='java'>

- 如您使用 Apache Maven 管理项目, 在项目的 **pom.xml** 文件中添加如下内容：

```java
<dependency>
  <groupId>io.milvus</groupId>
  <artifactId>milvus-sdk-java</artifactId>
  <version>2.4.0</version>
</dependency>
```

- 如您使用 Gradle/Grails 管理项目, 执行如下命令：

```shell
compile 'io.milvus:milvus-sdk-java:2.4.0'
```

</TabItem>

</Tabs>

### 创建 Collection Schema{#set-up-a-collection-schema}

确定需要导入数据的目标 Collection 的 Schema。在此步骤中，您需要确定哪些字段需要被包含在 Schema 中。

下述代码创建了一个包含四个字段的 Schema。它们分别是 **id**、**vector**、**scalar_1** 和 **scalar_2**。第一个字段为主键，第二个字段为用于存储 768 维向量数据的向量字段。其它两个字段为标量字段。

另外，Schema 中还关闭了 **AutoID** 并开启了动态字段支持。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
from pymilvus import MilvusClient, DataType

# You need to work out a collection schema out of your dataset.
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=768)
schema.add_field(field_name="scalar_1", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="scalar_2", datatype=DataType.INT64)

schema.verify()
```

</TabItem>

<TabItem value='java'>

```java
import io.milvus.param.collection.CollectionSchemaParam;
import io.milvus.param.collection.FieldType;
import io.milvus.grpc.DataType;

// Define schema for the target collection
FieldType id = FieldType.newBuilder()
        .withName("id")
        .withDataType(DataType.Int64)
        .withPrimaryKey(true)
        .withAutoID(false)
        .build();

FieldType vector = FieldType.newBuilder()
        .withName("vector")
        .withDataType(DataType.FloatVector)
        .withDimension(768)
        .build();

FieldType scalar1 = FieldType.newBuilder()
        .withName("scalar_1")
        .withDataType(DataType.VarChar)
        .withMaxLength(512)
        .build();

FieldType scalar2 = FieldType.newBuilder()
        .withName("scalar_2")
        .withDataType(DataType.Int64)
        .build();

CollectionSchemaParam schema = CollectionSchemaParam.newBuilder()
        .withEnableDynamicField(true)
        .addFieldType(id)
        .addFieldType(vector)
        .addFieldType(scalar1)
        .addFieldType(scalar2)
        .build();
```

</TabItem>
</Tabs>

### 创建 BulkWriter{#create-a-bulkwriter}

PyMilvus 中有两种 BulkWriter。在本小节中，我们将了解如何创建这两种 BulkWriter。

- **LocalBulkWriter**

    **LocalBulkWriter** 将原始数据按行添加到缓存中，然后将缓存中的数据存入一个指定格式的本地文件中。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>

    <TabItem value='python'>

    ```python
    from pymilvus.bulk_writer import LocalBulkWriter, BulkFileType
    # 如果您的集群和 Milvus 2.4.2 及之后版本兼容
    # 需使用 `from pymilvus import LocalBulkWriter, BulkFileType` 
    
    writer = LocalBulkWriter(
        schema=schema,
        local_path='.',
        segment_size=512 * 1024 * 1024, # default value
        file_type=BulkFileType.NPY
    )
    ```

    在创建 **LocalBulkWriter** 时，您应该：

    - 在 **schema** 参数中引用之前创建好的 CollectionSchema 对象。

    - 在 **local_path** 中指定本地输出路径。

    - 在 **file_type** 中指定输出文件格式。

    - 如果原始数据中包含大量的数据记录，可以考虑设置 **segment_size** 来调整原始数据分段大小。

    关于参数设置，可以参考 SDK Reference 中关于 **LocalBulkWriter** 的介绍。

    <Admonition type="info" icon="📘" title="说明">

    <p>使用 LocalBulkWriter 生成的 JSON 文件可以直接在 Zilliz Cloud 控制台上导入。</p>
    <p>如需导入其它格式的文件，需要先将它们上传到和集群同云的对象存储桶中。</p>

    </Admonition>

    </TabItem>

    <TabItem value='java'>

    ```java
    import io.milvus.bulkwriter.LocalBulkWriter;
    import io.milvus.bulkwriter.LocalBulkWriterParam;
    import io.milvus.bulkwriter.common.clientenum.BulkFileType;
    
    LocalBulkWriterParam bulkWriterParam = LocalBulkWriterParam.newBuilder()
            .withCollectionSchema(collectionSchema)
            .withLocalPath(".")
            .withFileType(BulkFileType.PARQUET)
            .withChunkSize(512 * 1024 * 1024) // 默认值
            .build();
            
    LocalBulkWriter localBulkWriter = new LocalBulkWriter(bulkWriterParam)
    ```

    在创建 **LocalBulkWriter** 时，您应该： 

    - 在 **withCollectionSchema()** 中引用之前创建好的 CollectionSchema 对象。

    - 在 **withLocalPath()** 中指定本地输出路径。

    - 在 **withFileType()** 中设置输出文件类型为 **BulkFileType.PARQUET。**

    - 如果原始数据中包含大量的数据记录，可以考虑在 **withChunkSize()** 中设置原始数据分段大小。

    <Admonition type="info" icon="📘" title="说明">

    <p>Milvus Java SDK 的 BulkWriter 使用 Apache Parquet 作为唯一支持的数据输出格式。</p>

    </Admonition>

    </TabItem>

    </Tabs>

- **RemoteBulkWriter**

    和 **LocalBulkWriter** 不同的是，**RemoteBulkWriter** 将缓存中的数据写入一个远程对象存储桶中。因此，您需要先设置好用于连接该存储桶的 **ConnectParam** 对象，并在创建 RemoteBulkWriter 时引用该 **ConnectParam** 对象。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
    <TabItem value='python'>

    ```python
    from pymilvus import RemoteBulkWriter, BulkFileType
    # 如果您的集群和 Milvus 2.4.2 及之后版本兼容
    # 需使用 `from pymilvus import LocalBulkWriter, BulkFileType` 
    
    # 三方服务常量
    YOUR_ACCESS_KEY = "YOUR_ACCESS_KEY"
    YOUR_SECRET_KEY = "YOUR_SECRET_KEY"
    YOUR_BUCKET_NAME = "YOUR_BUCKET_NAME"
    
    # 远程存储桶连接参数
    conn = RemoteBulkWriter.S3ConnectParam(
        endpoint="oss-cn-hangzhou.aliyuncs.com", 
        # 腾讯云请使用 "cos.ap-beijing-1.myqcloud.com"
        access_key=ACCESS_KEY,
        secret_key=SECRET_KEY,
        bucket_name=BUCKET_NAME,
        secure=True
    )
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    import io.milvus.bulkwriter.connect.S3ConnectParam;
    import io.milvus.bulkwriter.connect.StorageConnectParam;
    
    // 创建一个 RemoteBulkWriter.
    StorageConnectParam storageConnectParam = S3ConnectParam.newBuilder()
            .withEndpoint("oss-cn-hangzhou.aliyuncs.com") 
            // 腾讯云请使用 "cos.ap-beijing-1.myqcloud.com"
            .withBucketName(BUCKET_NAME)
            .withAccessKey(ACCESS_KEY)
            .withSecretKey(SECRET_KEY)
            .build();
    ```

    </TabItem>
    </Tabs>

    在连接参数准备就绪后，就可以在 RemoteBulkWriter 中引用了。

    <Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
    <TabItem value='python'>

    ```python
    from pymilvus import BulkFileType
    
    writer = RemoteBulkWriter(
        schema=schema,
        remote_path="/",
        connect_param=conn,
        file_type=BulkFileType.NPY
    )
    ```

    </TabItem>

    <TabItem value='java'>

    ```java
    import io.milvus.bulkwriter.RemoteBulkWriter;
    import io.milvus.bulkwriter.RemoteBulkWriterParam;
    import io.milvus.bulkwriter.common.clientenum.BulkFileType;
    
    RemoteBulkWriterParam remoteBulkWriterParam = RemoteBulkWriterParam.newBuilder()
            .withCollectionSchema(schema)
            .withRemotePath("/")
            .withChunkSize(512 * 1024 * 1024)
            .withConnectParam(storageConnectParam)
            .withFileType(BulkFileType.PARQUET)
            .build();
            
    @SuppressWarnings("resource")
    RemoteBulkWriter remoteBulkWriter = new RemoteBulkWriter(remoteBulkWriterParam);
    ```

    </TabItem>
    </Tabs>

除了 **connect_param** 参数外，RemoteBulkWriter 的参数与 LocalBulkWriter 基本相同。更多关于参数设置的信息，可以参考 SDK Reference 中关于 **RemoteBulkWriter** 的介绍。

### 开始转换{#start-writing}

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>

<TabItem value='python'>

**BulkWriter** 对象提供两个方法：**append_row()** 将原始数据按行添加到缓存中，**commit()** 将缓存中的数据写入一个本地文件或远程对象存储桶中。

为了方便演示，下述代码向缓存中添加随机生成的数据。

```python
import random
import string

def generate_random_str(length=5):
    letters = string.ascii_uppercase
    digits = string.digits
    
    return ''.join(random.choices(letters + digits, k=length))

for i in range(10000):
    writer.append_row({
        "id": i, 
        "vector":[random.uniform(-1, 1) for _ in range(768)]
        "scalar_1": generate_random_str(random.randint(1, 20)),
        "scalar_2": random.randint(0, 100),
    })
    
writer.commit()
```

</TabItem>

<TabItem value='java'>

一个 **BulkWriter** 有两个方法，分别为用于添加源数据的 **appendRow()** 以及用于写入本地文件或远程桶的 **commit()**。

出于演示目的，如下代码将插入随机生成的数据。

<Tabs groupId="java" defaultValue='java' values={[{"label":"主程序","value":"java"},{"label":"随机数据生成器","value":"java_1"}]}>
<TabItem value='java'>

```java

import java.util.Random

List<JSONObject> data = new ArrayList<>();

for (int i=0; i<10000; i++) {
    Random rand = new Random();
    JSONObject row = new JSONObject();
    
    row.put("id", Long.valueOf(i));
    row.put("vector", generateFloatVectors(768);
    row.put("scalar_1", generateString(10);
    row.put("scalar_2", rand.nextInt(100));
    remoteBulkWriter.appendRow(row);
}

remoteBulkWriter.commit()

```

</TabItem>
<TabItem value='java_1'>

```java
private static List<float> generateFloatVectors(int dimension) {
    List<float> vector = new ArrayList();
    
    for (int i=0; i< dimension; i++) {
        Random rand = new Random();
        vector.add(rand.nextFloat())
    }
    
    return vector
}

private static String generateString(length) {
    byte[] array = new byte[length];
    new Random().nextBytes(array);
    
    return new String(array, Charset.forName("UTF-8"));
}
```

</TabItem>
</Tabs>

<Admonition type="info" icon="📘" title="说明">

<p>在上述代码中 <code>vector</code> 和 <code>scalar_1</code> 字段的值由两个名为 <code>generateFloatVectors()</code> 和 <code>generateString()</code> 的私有方法生成。具体请参考<strong>随机数据生成器</strong>页签。</p>

</Admonition>

</TabItem>

</Tabs>

## 动态字段支持{#dynamic-schema-support}

在上一节中，我们创建 **BulkWriter** 时引用了一个启用了动态字段的 Schema。因此，我们可以在使用 **BulkWriter** 向缓存中添加数据时携带 Schema 中未定义的字段。

为了方便演示，下述代码向缓存中添加随机生成的数据。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
import random
import string

def generate_random_string(length=5):
    letters = string.ascii_uppercase
    digits = string.digits
    
    return ''.join(random.choices(letters + digits, k=length))

for i in range(10000):
    writer.append_row({
        "id": i, 
        "vector":[random.uniform(-1, 1) for _ in range(768)],
        "scalar_1": generate_random_string(),
        "scalar_2": random.randint(0, 100),
        "dynamic_field_1": random.choice([True, False]),
        "dynamic_field_2": random.randint(0, 100)
    })
    
writer.commit()
```

</TabItem>

<TabItem value='java'>

<Tabs groupId="java" defaultValue='java' values={[{"label":"主程序","value":"java"},{"label":"随机数据生成器","value":"java_1"}]}>
<TabItem value='java'>

```java

import java.util.Random

List<JSONObject> data = new ArrayList<>();

for (int i=0; i<10000; i++) {
    Random rand = new Random();
    JSONObject row = new JSONObject();
    
    row.put("id", Long.valueOf(i));
    row.put("vector", generateFloatVectors(768);
    row.put("scalar_1", generateString(10);
    row.put("scalar_2", rand.nextInt(100));
    row.put("dynamic_field_1", rand.nextBoolean());
    row.put("dynamic_field_1", rand.nextInt(100));
    remoteBulkWriter.appendRow(row);
}

remoteBulkWriter.commit()

```

</TabItem>
<TabItem value='java_1'>

```java
private static List<float> generateFloatVectors(int dimension) {
    List<float> vector = new ArrayList();
    
    for (int i=0; i< dimension; i++) {
        Random rand = new Random();
        vector.add(rand.nextFloat())
    }
    
    return vector
}

private static String generateString(length) {
    byte[] array = new byte[length];
    new Random().nextBytes(array);
    
    return new String(array, Charset.forName("UTF-8"));
}
```

</TabItem>
</Tabs>
</TabItem>
</Tabs>

## 验证结果{#verify-the-result}

您可以通过打印 **BulkWriter** 的 **data_path** 属性来获取实际输出路径。

<Tabs groupId="code" defaultValue='python' values={[{"label":"Python","value":"python"},{"label":"Java","value":"java"}]}>
<TabItem value='python'>

```python
print(writer.data_path)

# LocalBulkWriter
# 'folder/45ae1139-1d87-4aff-85f5-0039111f9e6b'

# RemoteBulkWriter
# '/folder/5868ba87-743e-4d9e-8fa6-e07b39229425'
```

</TabItem>

<TabItem value='java'>

```java
import java.util.List;

List<List<String>> batchFiles = remoteBulkWriter.getBatchFiles();
System.out.println(batchFiles);

// [["/5868ba87-743e-4d9e-8fa6-e07b39229425/1.parquet"]]
```

</TabItem>
</Tabs>

**BulkWriter** 生成一个 UUID，并使用该 UUID 在指定的输入路径下创建一个子路径，然后将生成的文件放在创建的子路径下。您也可以[单击此处](https://assets.zilliz.com/bulk_writer.zip)下载根据上述部署生成的示例数据文件。

生成的数据目录结构如下所示：

- 如果待转换数据大小未超过创建 BulkWriter 时指定的分段大小。

    ```python
    # JSON
    ├── folder
    │   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
    │       └── 1.json 
    
    # Parquet
    ├── folder
    │   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
    │       └── 1.parquet 
    
    # Numpy
    ├── folder
    │   └── 45ae1139-1d87-4aff-85f5-0039111f9e6b
    │       ├── id.npy
    │       ├── vector.npy
    │       ├── scalar_1.npy
    │       ├── scalar_2.npy
    │       └── $meta.npy 
    ```

    则对应的导入文件路径如下：

    <table>
       <tr>
      <th><p><strong>文件类型</strong></p></th>
      <th><p>合法的文件导入路径</p></th>
       </tr>
       <tr>
      <td><p><strong>JSON</strong></p></td>
      <td><ul><li><p><code>https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/</code></p></li><li><p><code>https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/1.json</code></p></li></ul></td>
       </tr>
       <tr>
      <td><p><strong>Parquet</strong></p></td>
      <td><ul><li><p><code>https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/</code></p></li><li><p><code>https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/1.parquet</code></p></li></ul></td>
       </tr>
       <tr>
      <td><p><strong>NumPy</strong></p></td>
      <td><ul><li><p><code>https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/</code></p></li><li><p><code>https://remote_bucket.oss-cn-hangzhou.aliyuncs.com/folder/45ae1139-1d87-4aff-85f5-0039111f9e6b/*.npy</code></p></li></ul></td>
       </tr>
    </table>

    