export async function tutorialsItemsGenerator ({
          defaultSidebarItemsGenerator, ...args
        }) {
    var sidebarItems = defaultSidebarItemsGenerator(args)
    var iterate = (items) => {
    return items.map(item => {
        if (item.type === 'category') {
        item.collapsed = false;
        item.items = iterate(item.items)
        }

        return item
    })
    }
    sidebarItems = sidebarItems.map(item => {
    // restful
    if (item.label === 'RESTful API 参考') {
        item.collapsed = false;

        item.items = item.items.map(subItem => {
        if (subItem.label === 'V2') {
            subItem.collapsed = false;

            subItem.items = iterate(subItem.items)
        }

        return subItem
        })
    }

    // python
    if (item.label === 'Python SDK 参考') {
        item.collapsed = false;

        item.items = item.items.map(subItem => {
        if (subItem.label === 'MilvusClient') {
            subItem.collapsed = false;

            subItem.items = subItem.items.map(subSubItem => {
                if (subSubItem.label === 'CollectionSchema') {
                    subSubItem.key = 'collection-schema-milvusclient';
                }

                return subSubItem;
            })
        }

        if (subItem.label === 'ORM') {
            subItem.className = 'to-be-deprecated'

            subItem.items = subItem.items.map(subSubItem => {
                if (subSubItem.label === 'CollectionSchema') {
                    subSubItem.key = 'collection-schema-orm';
                }

                return subSubItem;
            })
        }

        return subItem;
        })
    }

    // java
    if (item.label === 'JAVA SDK 参考') {
        item.collapsed = false;

        item.items = item.items.map(subItem => {
        if (subItem.label === 'Java SDK Reference (v1)') {
            subItem.label = 'V1';
            subItem.className = 'to-be-deprecated';

            subItem.items = subItem.items.map(subSubItem => {
                if (subSubItem.label === 'Authentication') {
                    subSubItem.key = 'authentication-java-v1';
                }

                return subSubItem;
            })
        }

        if (subItem.label === 'Java SDK Reference (v2)') {
            subItem.label = 'V2';
            subItem.collapsed = false;

            subItem.items = subItem.items.map(subSubItem => {
                if (subSubItem.label === 'Authentication') {
                    subSubItem.key = 'authentication-java-v2';
                }

                return subSubItem;
            })
        }

        return subItem;
        })
    }

    // go
    if (item.label === 'Go SDK 参考') {
        item.collapsed = false;

        item.items = item.items.map(subItem => {
        if (subItem.label === 'Go SDK 参考 (v1)') {
            subItem.label = 'V1';
            subItem.className = 'to-be-deprecated';

            subItem.items = subItem.items.map(subSubItem => {
                if (subSubItem.label === 'Collection') {
                    subSubItem.key = 'collection-go-v1';
                }

                if (subSubItem.label === 'Partition') {
                    subSubItem.key = 'partition-go-v1';
                }

                return subSubItem;
            })
        }

        if (subItem.label === 'Go SDK 参考 (v2)') {
            subItem.label = 'V2';
            subItem.collapsed = false;

            subItem.items = subItem.items.map(subSubItem => {
                if (subSubItem.label === 'Collection') {
                    subSubItem.key = 'collection-go-v2';
                }

                if (subSubItem.label === 'Partition') {
                    subSubItem.key = 'partition-go-v2';
                }

                return subSubItem;
            })
        }

        return subItem;
        }) 
    }

    return item;
    })

    return sidebarItems;
}

export async function ReferenceItemsGenerator ({
            defaultSidebarItemsGenerator, ...args
          }) {
  var sidebarItems = defaultSidebarItemsGenerator(args)
  sidebarItems = sidebarItems.map(item => {
    if (item.type === 'category') {
      item.collapsible = false;
      item.collapsed = false;
    }

    if (item.label === '从这里开始') {
      item.items = item.items.map(subItem => {
        if (subItem.label === 'API & SDKs') {
          subItem.items.push(...[
            {
              type: 'link',
              label: 'Python SDK',
              href: '/reference/python'
            },
            {
              type: 'link',
              label: 'Java SDK',
              href: '/reference/java'
            },
            {
              type: 'link',
              label: 'Go SDK',
              href: '/reference/go'
            },
            {
              type: 'link',
              label: 'Node.js SDK',
              href: '/reference/nodejs'
            },
            {
              type: 'link',
              label: 'RESTful API',
              href: '/reference/restful'
            }
          ])
        }

        return subItem;
      })
    }

    if (item.label === '安全') {
      item.items = item.items.map(subItem => {
        if (subItem.label === '访问控制') {
          subItem.items.splice(1, 0, ...[
            {
              type: 'link',
              label: '管理组织角色',
              href: './organization-users#organization-roles',
              description: 'Zilliz Cloud 提供 3 种组织角色。包括组织管理员、组织账单管理员和组织成员。这些角色无法修改或删除。'
            },
            {
              type: 'link',
              label: '管理项目角色',
              href: './project-users#project-roles',
              description: 'Zilliz Cloud 提供 3 种项目角色。包括项目管理员、项目编辑者和项目查看者。这些角色无法修改或删除。'
            },
          ])

        }

        return subItem;
      })
    }

    if (item.label === '指标与告警') {
      item.items.push(...[
        {
          type: 'link',
          label: 'Prometheus 监控',
          href: './prometheus-monitoring',
          description: 'Prometheus 监控系统能够在指定的时间间隔内从配置的目标收集指标，评估规则表达式，展示结果，并根据特定条件触发告警。'
        }
      ])
        
    }

    return item;
  })

  return sidebarItems;
}