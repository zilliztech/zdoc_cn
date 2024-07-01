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
          saas: {
            outputDir: 'docs/tutorials',
            imageDir: 'static/img',
          },
          paas: {
            outputDir: 'versioned_docs/version-byoc/tutorials',
            imageDir: 'static/byoc',
          }
        }
      },
      python: {
        root: 'PTJzfzI0ulKGjwdUsxQcFxfJn6b',
        base: 'D1VabelmAansLwsNTvLc2Wxxn1g',
        sourceType: 'drive',
        version: 'v2.3.x',
        displayedSidebar: 'pythonSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/python/v2.3.x',
        targets: {
          milvus: {
            outputDir: 'milvus/reference/python/docs',
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
        root: 'GYfPfBbdglDhh5dzLH3cYaV1nDf',
        base: 'Bp72bJ9wEazV1SsA30lcsuJgnfe',
        sourceType: 'drive',
        version: 'v2.3.x',
        displayedSidebar: 'javaSidebar',
        docSourceDir: './plugins/lark-docs/meta/sources/java/v2.3.x/v2',
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
            outputDir: 'milvus/reference/node/docs',
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
          href: '/docs/quick-start'
        },
        items: [
          {
            type: 'search',
            position: 'right',
          },
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: '文档',
          // },
          // {to: '/api', label: 'API 参考', position: 'left'},
          {
            href: '/docs/quick-start',
            label: "开发指南",
            position: 'left',
            className: 'header-link',
          },
          // {
          //   href: '/docs/byoc',
          //   label: "BYOC Docs",
          //   position: 'left',
          //   className: 'header-link',
          // },
          {
            type: 'dropdown',
            label: '参考文档',
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
            href: 'https://zilliz.com.cn/pricing',
            label: '定价',
            position: 'left',
            className: 'header-link',
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
              }
            ],
          },
          {
            href: 'https://zilliz.com.cn/use-cases',
            label: '场景解决方案',
            position: 'left',
            className: 'header-link',
          },
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
        additionalLanguages: ['java', 'go', 'bash', 'json', ]
      },
      colorMode: {
        disableSwitch: true,
      },
      hotjar: {
        applicationId: 3711906,
      },
    }),
  themes: [
    'docusaurus-theme-frontmatter',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'zh'],
      }
    ]
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
