---
sidebar_position: 3
---

# 恢复备份

本文介绍如何从快照备份中恢复 Zilliz Cloud 集群。您只能使用**创建成功**的快照进行集群恢复。

要恢复集群到快照，单击**操作列**中的更多按钮，然后选择**恢复数据库**。

然后根据提示设置相关属性，以从快照备份中还原集群。

![restore_from_snapshot](/img/restore_from_snapshot.png)

设置属性时，需注意以下几点：

- 您可以通过备份快照在不同项目中创建目标集群，但目标集群不能和源集群位于不同的云地域。

- 您可以选择是否保留集群 Collection 的加载状态。

- 您可以重命名目标集群并重置集群大小和用户名密码。

在**恢复数据库**中单击**恢复**后，Zilliz Cloud 会使用指定的属性创建目标集群，然后将快照中的 Collection 还原到目标集群中。

目标集群的状态从**创建中**变为**恢复中**后，源集群的**备份恢复历史**列表中将出现一条备份恢复记录。

![view_restore_history](/img/view_restore_history.png)

## 相关文档

- [创建备份快照](https://zilliverse.feishu.cn/wiki/GFFswc3z1iQtjQkpmyScL00dnSx)

- [创建自动备份](https://zilliverse.feishu.cn/wiki/TXyTwrfxCiStfek4hc7c2nKwnJc)

- [查看备份快照](https://zilliverse.feishu.cn/wiki/PS8EwUahQiNPTikPIMbcBxvGnKS)

- [删除备份快照](https://zilliverse.feishu.cn/wiki/FW37wt3qEiKvZzkzBducXgHZnIe)
