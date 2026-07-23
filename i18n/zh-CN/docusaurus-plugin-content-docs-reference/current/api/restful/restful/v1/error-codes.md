---
displayed_sidbar: restfulSidebar
slug: /restful/error-codes
beta: NEAR DEPRECATE
notebook: FALSE
sidebar_position: 2
---

# 错误码 (v1)

您可在本页查找 Zilliz Cloud RESTful API (v1) 的错误码，以便更好地理解接口调用过程中可能遇到的问题。


**80000**

参数不正确：xxx

**80001**

token 非法

**80002**

token 无效

**80003**

参数 'pageSize' 的值应在 5 到 100 之间。

**80004**

参数 'currentPage' 的值应在 1 到 Int 的最大值之间。

**80005**

clusterType 无效。参数值应为 'Performance-optimized' 或 'Capacity-optimized'。

**80006**

cuSize 无效。参数值应在 1 到 256 之间。

**80007**

此 CU Size 需要消耗大量资源。如果要使用它，请先在 Billing 页面完成绑定银行卡。

**80008**

如果要创建超过 32 个 CU 的 cluster，请先联系我们。

**80009**

clusterName 无效，只能包含字母数字字符和连字符。

**80010**

ClusterName 重复。您已经创建了一个同名的运行中 Cluster。为避免管理复杂性，请修改名称并创建新的 Cluster。"

**80011**

'description' 的长度已超过 256 个字符的限制。

**80012**

密码输入无效，密码规则为：\n1. 密码字符数应在 8 到 64 之间。\n2. 密码应由以下任意三类字符组成：大写字母、小写字母、数字和特殊字符。\n3. 特殊字符包括：!@#$%^&*()_+-=

**80014**

您输入的 cuSize 值暂不支持。

**80020**

clusterId 无效，或您没有访问该 Cluster 的权限。

**80021**

Serverless cluster 不支持此操作。

**80022**

Dedicated cluster 不支持此操作。

**90001**

collection xxx 不存在。您可以使用 ListCollections 查看现有 collection 列表。

**90002**

返回值属性 xxx 在 collection xxx 上不存在。

**90003**

表达式无效。请参考文档了解表达式用法：https://milvus.io/docs/boolean.md#Boolean-Expression-Rules

**90004**

参数 'limit' 的值应在 1 到 100 之间。

**90005**

参数 'offset' 的值不应小于 0。

**90006**

属性 xxx 不是 vector 类型，因此不能用于近似检索。

**90007**

字段 xxx 上的 vector 维度不匹配。输入 vector 的维度为 xxx，而预期 vector 维度为 xxx。

**90008**

目前，Milvus 不支持过滤和删除非主键属性。请在表达式中使用主键过滤。过滤和删除非主键属性的功能正在开发中。敬请期待。

**90009**

插入的列数与集合中定义的列数不匹配。插入了 \{0} 列，但预期为 \{1} 列。

**90010**

字段 xxx 的类型不匹配，预期为 xxx，但输入的是 xxx。

**90011**

CollectionName 无效。原因：xxx

**90013**

参数 shardsNum 的取值范围应在 1 到 32 之间。

**90014**

参数 description 的长度不能超过 4096。

**90015**

没有字段。请在表定义中至少包含 1 个主键字段和 1 个 vector 字段。

**90016**

没有主键字段。

**90017**

每个 collection 只能有一个主键字段。

**90018**

主键字段的类型必须为 int64 或 varchar。

**90019**

AutoID 只能添加到主键字段。

**90020**

AutoID 只能添加到 int64 类型的主键字段。

**90023**

Varchar 类型的长度应在 1 到 **65535** 之间。

**90024**

vector 类型必须指定维度。

**90025**

vector 列的维度应在 32 到 **32768** 之间。

**90026**

index 类型不正确。Zilliz Cloud 上仅支持 AUTOINDEX。

**90027**

参数 metricType 无效。仅允许 L2 或 IP。请参考文档：https://milvus.io/docs/metric.md

**90100**

解析字段 xxx 的数字类型时出错。

**90101**

varchar 类型必须指定 maxLength。

**90102**

当前 region 中不存在该 cluster。

**90103**

请求路径中的 clusterId 参数为空。

**90106**

collection 已存在。

**90107**

启用 int64 auto id 时，不能分配主字段数据

**90108**

需要移除 json 文件中的多余字段 xxx

**90109**

最大插入批次行数应小于 100。

**90110**

没有 filter key 字段。

**90111**

参数 'level' 的值应在 1 到 3 之间。

**90112**

字段名称不应为空。

**90113**

字段 xxx 的字段类型不应为空。

**90114**

index 字段名称只能添加到 vector 字段。

**90115**

插入的列数与集合中定义的列数不匹配。

**90117**

使用了无效域名，请检查您正在使用的域名。

**90118**

没有 data key 字段，请检查您的请求。

**90119**

'data' 参数的值应为 JSON 格式。

**90120**

'data' 参数的值为空。

**90121**

'data' 参数中存在空对象。

**90122**

没有 dimension key 字段。

**90123**

输入的 ID 值与字段 xxx 不匹配，预期为 xxx，但收到的是 xxx。

**90124**

没有 id key 字段，请检查您的请求。

**90125**

没有 vector key 字段。

**90126**

'offset' 参数值与 'limit' 参数值之和不应超过 **16384**。

**90127**

请在表达式中使用 xxx in (a,b,c) 过滤。

**90128**

不包含用于过滤的数据，请检查 filter 字段

**90129**

filter dataType 不受支持，请检查 filter 字段

**90130**

属性 xxx 不是此 collection 的 vector 字段，因此不能用于近似检索。

**90131**

未提供插入内容。

**90132**

未提供删除内容。

**90133**

未提供 get 内容。

**90134**

未提供 query 内容。

**90135**

未提供 search 内容。

**90136**

未提供 create collection 内容。

**90138**

未提供 drop collection 内容。

**90139**

字段 'xxx' 类型不匹配。预期类型：xxx，但收到的输入为：xxx。

**90140**

参数 'id' 中的元素数量不应超过 100。

**90011**

CollectionName 无效。原因：名称只能包含字母数字字符和下划线，并且第一个字符应为下划线、小写字母或大写字母

**47005**

指定的 cluster collection 不存在。

**47053**

检查文件 \{xxx} 失败。

**80020**

clusterId 无效，或您没有访问该 Cluster 的权限。

**10003**

s3 ObjectUrl 无效。[xxx]

**83001**

获取 ObjectMeta 失败 \{Access denied}。

**47005**

指定的 cluster collection 不存在。

**90144**

在此 cluster 下未找到 jobId 记录，请检查您的请求参数。

**90103**

请求路径中的 clusterId 参数为空。

**83001**

获取 ObjectMeta 失败 \{xxx}。

**40021**

cluster ID 不存在。

**40022**

无权访问此 cluster。请向您的管理员请求访问权限。

**40003**

鉴于 cluster 当前状态，此操作不可用。

**47039**

指定的 cluster 不支持同时进行多个导入。

**83004**

目前不支持跨 cloud 导入文件

**47035**

指定的对象大小超出限制。

**47036**

对象数量不等于 collection 字段数量。

**47055**

当前 cluster 正在导入数据 (xxx)。为确保您的 Milvus cluster 服务更加稳定，请等待几分钟后再导入数据。

**90142**

未提供 import 内容。

**90104**

请求参数中的 clusterId 参数为空。

**90145**

没有 ObjectUrl key 字段。

**63032**

CloudId 不存在。

**94148**

未提供 upsert 内容。

**90149**

字段 '%s' 类型不匹配。预期类型：%s，但收到的输入为：%s。

**90150**

没有 data key 字段，请检查您的请求。

**90151**

'data' 参数的值为空。

**90152**

'data' 参数中存在空对象。

**10041**

（可能的 pipeline 错误都归在此错误码下。）

**80005**

cuType 无效。参数值应为 ['Performance-optimized','Capacity-optimized'] 之一。

**80006**

cuSize 无效。参数值应为 [1,2,4,6,8,12,16,20,24] 之一。

**80013**

plan 无效。参数值应为 ['Standard','Enterprise'] 之一。

**80014**

projectId 无效。projectId 应类似 proj-xxxxxx

**80015**

ProjectId 不存在，或您没有此 project 的权限。

**80020**

Cluster 不存在，或您没有权限。

**80025**

当前 region 不提供 Serverless！
