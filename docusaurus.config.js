import {themes as prismThemes} from 'prism-react-renderer';
import 'dotenv/config';

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zilliz Cloud 开发指南',
  tagline: '一次找全所有和 Zilliz Cloud 开发相关的文档',
  favicon: 'img/favicon.svg',
  trailingSlash: false,

  // Set the production url of your site here
  url: 'https://docs.zilliz.com.cn',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'zilliztech', // Usually your GitHub org/user name.
  // projectName: 'zdoc_cn', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // Future settings
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          breadcrumbs: true,
          sidebarPath: require.resolve('./sidebarsTutorial.js'),
          routeBasePath: 'docs',
          sidebarItemsGenerator: async function ({
            defaultSidebarItemsGenerator, ...args
          }) {
            var sidebarItems = defaultSidebarItemsGenerator(args)
            sidebarItems = sidebarItems.map(item => {
              item.collapsible = false;
              item.collapsed = false;

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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: 'reference',
        breadcrumbs: false,
        routeBasePath: 'reference',
        sidebarPath: require.resolve('./sidebarsReference.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'onpremise',
        path: 'onpremise',
        breadcrumbs: false,
        routeBasePath: 'on-premise',
        sidebarPath: require.resolve('./sidebarsOnPremise.js'),
        lastVersion: 'current',
        versions: {
          current: {
            "label": "v2.4.11",
            "path": "v2.4.11",
          }
        }
      }
    ],
    [
      'docusaurus-gtm-plugin',
      {
        id: 'GTM-MBBL6Z9Q',
      },
    ],
    ['./plugins/lark-docs',
    {
      guides: {
        root: 'XyeFwdx6kiK9A6kq3yIcLNdEnDd',
        base: 'MQI8b662gabapmsTl7ZcnTExnSc',
        sourceType: 'wiki',
        displayedSidebar: 'default',
        docSourceDir: './plugins/lark-docs/meta/sources/guides',
        targets: {
          zilliz: {
            saas: {
              outputDir: 'docs/tutorials',
              imageDir: 'static/img',
            },
            paas: {
              outputDir: 'onpremise/docs/vdb',
              imageDir: 'static/byoc',
            }
          },
          milvus: {
            outputDir: 'milvus/guides/docs',
            imageDir: 'milvus/guides/images'
          }
        }
      },
      onpremise: {
        root: 'PXwawNqh0i40H4krMYlc6qgZnKe',
        base: 'V7t6bcQWiaDL99sgUkwcEIJ0nUb',
        sourceType: 'wiki',
        displayedSidebar: 'onPremiseSidebar',
        robots: 'noindex',
        docSourceDir: './plugins/lark-docs/meta/sources/onpremise',
        targets: {
          paas: {
            outputDir: 'onpremise/docs/ops',
            imageDir: 'static/img'
          }
        }
      },
      python: {
        root: 'PTJzfzI0ulKGjwdUsxQcFxfJn6b',
        base: 'D1VabelmAansLwsNTvLc2Wxxn1g',
        sourceType: 'drive',
        version: 'v2.4.x',
        displayedSidebar: 'pythonSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/python/v2.4.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/python/docs/v2.4.x',
            imageDir: 'milvus/reference/python/images'
          },
          zilliz: {
            outputDir: 'reference/api/python/python',
            imageDir: 'static/img',
          }
        }
      },
      javaV1: {
        root: 'D0cfwvTqMiyhSrkCUv4c1a2Fnjd',
        base: 'A4ivb7y2XaIND9s93QZcvwykn0d',
        // root: 'wikcnu8oU4VVbRFKKLjDH5aCIIh',
        // base: 'XJ2RbEDgTakJ80sfUAPcLG4Tnug',
        sourceType: 'onePager',
        version: 'v2.3.x',
        displayedSidebar: 'javaSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/java/v2.3.x/v1',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/java/docs/v1',
            imageDir: 'milvus/reference/java/images'
          },
          zilliz: {
            outputDir: 'reference/api/java/java/v1',
            imageDir: 'static/img',
          }
        }
      },
      javaV2: {
        root: 'Sg3EfIgVtlTkeBdtguJchE9ynne',
        base: 'WqHJb3zimaxXjssk4Kic4GEDnte',
        sourceType: 'drive',
        version: 'v2.4.x',
        displayedSidebar: 'javaSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/java/v2.4.x/v2',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/java/docs/v2',
            imageDir: 'milvus/reference/java/images'
          },
          zilliz: {
            outputDir: 'reference/api/java/java/v2',
            imageDir: 'static/img',
          }
        }
      },
      node: {
        root: 'Vg1kfluyll0h7MdlUMaciXfEnZd',
        base: 'DVVobtXQMamuLqsQij5c29nVn3c',
        sourceType: 'drive',
        version: 'v2.3.x',
        displayedSidebar: 'nodeSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/node/v2.3.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/node/docs/v2.4.x',
            imageDir: 'milvus/reference/node/images'
          },
          zilliz: {
            outputDir: 'reference/api/nodejs/nodejs',
            imageDir: 'static/img',
          }
        }
      },
      gov1: {
        root: 'V0SCw3U3siZBynkKhUCcRRAin69',
        base: 'WA8rbgtu8aq3wtsBm02cepOznPJ',
        sourceType: 'wiki',
        version: 'v2.4.x',
        displayedSidebar: 'goSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/go/v2.4.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/go/docs/v1',
            imageDir: 'milvus/reference/go/images'
          },
          zilliz: {
            outputDir: 'reference/api/go/go/v1',
            imageDir: 'static/img',
          }
        }
      },
      gov2: {
        root: 'LaQ1wPdnSiDXDLkMieEcrv95nRc',
        base: 'RWi9b79oeaDNkBsCkAGcoc90nif',
        sourceType: 'wiki',
        version: 'v2.5.x',
        displayedSidebar: 'goSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/go/v2.5.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/go/docs/v2',
            imageDir: 'milvus/reference/go/images'
          },
          zilliz: {
            outputDir: 'reference/api/go/go/v2',
            imageDir: 'static/img',
          }
        }
      },
      pymilvus25: {
        root: 'Z1SFf89zYlGHXvdo6dxcR6gXntc',
        base: 'B8X9bJjJta2q4NskclYcxT7lngG',
        sourceType: 'drive',
        displayedSidebar: 'pythonSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/python/v2.5.x',
        fallbackSourceDir: './plugins/lark-docs/meta/sources/python/v2.4.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/python/docs/v2.5.x',
            imageDir: 'milvus/reference/python/images'
          },
          zilliz: {
            outputDir: 'reference/api/python/python',
            imageDir: 'static/img',
          }
        }
      },
      javaV225: {
        root: 'LJ6MfN5wzlHjz8dB642cjUh8nqq',
        base: 'Hsq1bRcqraeQW0sGFJbcI3YIn3d',
        sourceType: 'drive',
        displayedSidebar: 'javaSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/java/v2.5.x',
        fallbackSourceDir: './plugins/lark-docs/meta/sources/java/v2.4.x/v2',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/java/docs/v2.5.x',
            imageDir: 'milvus/reference/java/images'
          },
          zilliz: {
            outputDir: 'reference/api/java/java/v2',
            imageDir: 'static/img',
          }
        }
      },
      nodejs25: {
        root: 'U9fWfMPdelsPMydYnolcr2aEnBf',
        base: 'JTBebezMDaV8ZhsHF5wc7lJSnuh',
        sourceType: 'drive',
        displayedSidebar: 'nodeSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/node/v2.5.x',
        fallbackSourceDir: './plugins/lark-docs/meta/sources/node/v2.3.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/node/docs/v2.5.x',
            imageDir: 'milvus/reference/node/images'
          },
          zilliz: {
            outputDir: 'reference/api/nodejs/nodejs',
            imageDir: 'static/img',
          }
        }
      }
    }],
    './plugins/apifox-docs',
    './plugins/link-checks',
    ['./plugins/report-to-lark',{
        receiveId: 'oc_0e36909edb9247c7b6ecb437e99f1d68'
      }
    ]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: '',
        logo: {
          alt: 'Zilliz Logo',
          src: 'img/logo.svg',
          href: 'https://zilliz.com.cn/'
        },
        items: [
          {
            href: '/search',
            position: 'right',
            className: 'header-search-link',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [{to: '/versions', label: '所有版本'}],
            dropdownActiveClassDisabled: true,            
            docsPluginId: 'onpremise',
          },
          {
            href: 'https://support.zilliz.com/hc/zh-cn/',
            icon: '/img/icons/support.svg',
            label: '技术支持',
            position: 'right',
            className: 'header-link',
          },
          {
            href: 'https://cloud.zilliz.com.cn/login',
            label: '登录',
            position: 'right',
            className: 'header-link',
          },
          {
            href: 'https://cloud.zilliz.com.cn/signup',
            label: '免费注册',
            position: 'right',
            className: 'header-btn',
          },
          {
            href: '/docs/quick-start',
            label: "开发指南",
            position: 'left',
            className: 'header-link',
          },
          {
            type: 'dropdown',
            label: 'API & SDK',
            position: 'left',
            items: [
              {
                label: 'RESTful API',
                to: '/reference/restful',
              },
              {
                label: 'Python SDK',
                to: '/reference/python',
              },
              {
                label: 'Java SDK',
                to: '/reference/java',
              },
              {
                label: 'Go SDK',
                to: '/reference/go',
              },
              {
                label: 'Node.js SDK',
                to: '/reference/nodejs',
              }
            ]
          },
          {
            type: 'dropdown',
            label: '资源中心',
            position: 'left',
            items: [
              {
                label: '博客',
                href: 'https://zilliz.com.cn/blog',
              },
              {
                label: '白皮书',
                href: 'https://zilliz.com.cn/resources?tag=whitepapers',
              },
              {
                label: '线上直播',
                href: 'https://zilliz.com.cn/resources?tag=live',
              },
              {
                label: "活动",
                href: "https://zilliz.com.cn/event"
              },
              {
                label: "三方集成 Notebooks",
                href: "https://zilliz.com/learn/milvus-notebooks"
              }
            ],
          },
          {
            href: 'https://zilliz.com.cn/use-cases',
            label: '场景用例',
            position: 'left',
            className: 'header-link',
          },
          {
            href: 'https://zilliz.com.cn/pricing',
            label: '定价',
            position: 'left',
            className: 'header-link',
          }
        ],
      },
      footer: {
        style: 'light',
        logo: {
          alt: 'Zilliz',
          src: '/img/logo.svg',
          href: 'https://zilliz.com',
          width: 160,
          height: 51,
        },
        links: [
          {
            title: '文档',
            items: [
              {
                label: '开发指南',
                to: '/docs/quick-start',
              },
              {
                label: 'RESTful API',
                to: '/reference/restful',
              },
              {
                label: 'Python SDK',
                to: '/reference/python',
              },
              {
                label: 'Java SDK',
                to: '/reference/java',
              },
              {
                label: 'Go SDK',
                to: '/reference/go',
              },
              {
                label: 'Node.js SDK',
                to: '/reference/nodejs',
              },
            ],
          },
          {
            title: '产品',
            items: [
              {
                label: 'Zilliz Cloud',
                href: 'https://zilliz.com.cn/cloud',
              },
            ],
          },
          {
            title: '关注我们',
            items: [
              {
                label: 'Bilibili',
                href: 'https://space.bilibili.com/1058892339/video',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/zilliztech',
              },
            ],
          },
          {
            title: '其它',
            items: [
              {
                label: '博客',
                to: 'https://zilliz.com.cn/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `LF AI、LF AI & Data、Milvus，以及相关的开源项目名称为 Linux Foundation 所有商标 <br/>版权所有 ©${new Date().getFullYear()} 上海赜睿信息科技有限公司保留所有权利。<br/>ICP 备案: 沪ICP备2023014543号<br/><a class="setting-cookie-btn" >Cookie 设置</a>`,
      },
      prism: {
        additionalLanguages: ['java', 'go', 'bash', 'json' ],
        theme: prismThemes.github,
        magicComments: [
          {
            className: 'command-prompt',
            line: "add-command-prompt"
          },
          {
            className: "command-output",
            line: "output-next-line",
            block: {start: "output-start", end: "output-end"}
          }
        ]
      },
      colorMode: {
        disableSwitch: true,
      },
      hotjar: {
        applicationId: 3711906,
      },
      inkeepConfig: {
        stylesheetUrls: ["/css/inkeep-overrides.css"],
        baseSettings: {
          apiKey: process.env.INKEEP_API_KEY,
          integrationId: process.env.INKEEP_INTEGRATION_ID,
          organizationId: process.env.INKEEP_ORGANIZATION_ID,
          primaryBrandColor: "#175fff",
          organizationDisplayName: "Zilliz Cloud",
          customCardSettings: [
            {
              filters: {
                UrlMatch: {
                  ruleType: 'PartialUrl',
                  partialUrl: 'docs.zilliz.com.cn/docs',
                },
              },
              searchTabLabel: '指南',
            },
            {
              filters: {
                UrlMatch: {
                  ruleType: 'PartialUrl',
                  partialUrl: 'docs.zilliz.com.cn/reference',
                },
              },
              searchTabLabel: '参考',
            },
            {
              filters: {
                UrlMatch: {
                  ruleType: 'PartialUrl',
                  partialUrl: 'support.zilliz.com/hc/en-us',
                },
              },
              searchTabLabel: '支持',
            },
            {
              filters: {
                UrlMatch: {
                  ruleType: 'PartialUrl',
                  partialUrl: 'zilliz.com.cn/learn',
                },
              },
              searchTabLabel: '学习',
            },
            {
              filters: {
                UrlMatch: {
                  ruleType: 'PartialUrl',
                  partialUrl: 'zilliz.com.cn/customers',
                },
              },
              searchTabLabel: '案例',
            },
            {
              filters: {
                UrlMatch: {
                  ruleType: 'PartialUrl',
                  partialUrl: 'zilliz.com.cn/event',
                },
              },
              searchTabLabel: '活动',
            },
          ],
        },
        aiChatSettings: {
            placeholder: "Zilliz Cloud 是什么？",
            chatSubjectName: "Zilliz Cloud",
            introMessage: `我是文档 AI 助手，可以获取包括文档在内的所有与 Zilliz Cloud 开发相关的资料。 \n\n 有什么可以帮您？`,
            botAvatarSrcUrl: "/img/zilliz-star.svg",
            getHelpCallToActions: [
              {
                type: "OPEN_LINK",
                icon: { builtIn: "IoHelpBuoyOutline" },
                name: "支持中心",
                url: "https://support.zilliz.com.cn/hc/zh-cn"
              },
              {
                type: "OPEN_LINK",
                icon: { builtIn: "IoChatbubblesOutline" },
                name: "联系销售",
                url: "https://zilliz.com.cn/contact-sales"
              }
            ],
            quickQuestions: [
              "Zilliz Cloud 是什么？",
              "如何连接 Zilliz Cloud 集群",
              "Zilliz Cloud 和 Milvus 相比有什么差异？"
            ]
        },
        searchSettings: {
          tabSettings: {
            isAllTabEnabled: false,
            rootBreadcrumbsToUseAsTabs: ['指南', '参考', '支持', '学习', '案例', '活动'],
          }
        }
      }
    }),
  themes: [
    'docusaurus-theme-frontmatter',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        language: ['en', 'zh'],
        docsDir: ['docs', 'reference'],
        docsRouteBasePath: ['docs', 'reference'],
        highlightSearchTermsOnTargetPage: true,
      }
    ],
    '@inkeep/docusaurus/chatButton'
  ],
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel:'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0'
      }
    }
  ]
};

module.exports = config;
