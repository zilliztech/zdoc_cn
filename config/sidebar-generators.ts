const CHANGELOGS_DOC_ID = 'tutorials/get-started/release-notes/changelogs';

function stableHash(value) {
    let hash = 0;
    for (const char of String(value || '')) {
        hash = ((hash << 5) - hash + char.codePointAt(0)) | 0;
    }
    return Math.abs(hash).toString(36);
}

function slugKeyPart(value) {
    const raw = String(value || 'item');
    const slug = raw
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || `u-${stableHash(raw)}`;
}

function addStableSidebarKeys(items, trail = []) {
    return items.map((item, index) => {
        if (!item || typeof item !== 'object') return item;
        const keySource = item.id || item.href || item.label || item.type || `item-${index}`;
        const nextTrail = [...trail, slugKeyPart(keySource)];
        const keyed = { ...item };
        if (!keyed.key && (keyed.type === 'category' || keyed.type === 'html' || keyed.type === 'link')) {
            keyed.key = nextTrail.join('/');
        }
        if (Array.isArray(keyed.items)) keyed.items = addStableSidebarKeys(keyed.items, nextTrail);
        return keyed;
    });
}

function isReleaseNotesCategory(item) {
    return item.type === 'category' && (
        item.key === 'release-notes' ||
        item.label === 'release-notes' ||
        item.label === '版本说明书'
    );
}

function useChangelogsAsReleaseNotesIndex(item, label, changelogsLabel, description) {
    item.label = label;
    item.description = description;
    item.link = {
        type: 'doc',
        id: CHANGELOGS_DOC_ID,
    };
    item.items = item.items.filter(
        (child) => child.key !== 'changelogs' && child.label !== changelogsLabel,
    );
}


export async function referenceItemsGenerator ({
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

    return addStableSidebarKeys(sidebarItems);
}

export async function tutorialsItemsGenerator ({
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
                    
                    if (isReleaseNotesCategory(subItem)) {
                        useChangelogsAsReleaseNotesIndex(
                            subItem,
                            '版本说明书',
                            '变更日志',
                            '此处文档记录了 Zilliz Cloud 的版本历史。 | Cloud',
                        )
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

            return addStableSidebarKeys(sidebarItems);
          }

export async function agentsItemsGenerator ({
    defaultSidebarItemsGenerator, ...args
}) {
    var sidebarItems = defaultSidebarItemsGenerator(args)

    sidebarItems = sidebarItems.map(item => {
        if (item.type === 'category') {
            item.collapsed = false;
        }

        return item;
    })

    return addStableSidebarKeys(sidebarItems);
}
