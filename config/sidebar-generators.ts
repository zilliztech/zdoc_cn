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

            subItem.items = iterate(subItem.items)
        }

        if (subItem.label === 'ORM') {
            subItem.className = 'to-be-deprecated'
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
        }

        if (subItem.label === 'Java SDK Reference (v2)') {
            subItem.label = 'V2';
            subItem.collapsed = false;

            subItem.items = iterate(subItem.items)
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
        }

        if (subItem.label === 'Go SDK 参考 (v2)') {
            subItem.label = 'V2';
            subItem.collapsed = false;

            subItem.items = iterate(subItem.items)
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
                        href: '/docs/organization-users#organization-roles'
                      },
                      {
                        type: 'link',
                        label: '管理项目角色',
                        href: '/docs/project-users#project-roles'
                      },
                    ])

                  }

                  return subItem;
                })
              }

              return item;
            })

            return sidebarItems;
          }