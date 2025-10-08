import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import larkDocsConfig from './config/lark-docs.config';
import { tutorialsItemsGenerator, ReferenceItemsGenerator } from './config/sidebar-generators';
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

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    }
  },

  themes: ['@docusaurus/theme-mermaid'],


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
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Cloud 开发指南',
            },
            'byoc': {
              label: 'BYOC 开发指南',
              path: 'byoc',
              banner: 'none'
            },
          },
          sidebarItemsGenerator: ReferenceItemsGenerator,
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
        sidebarItemsGenerator: tutorialsItemsGenerator,
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
    [
      '@inkeep/cxkit-docusaurus', { 
        SearchBar: {
          baseSettings: {
            apiKey: process.env.INKEEP_API_KEY,
          },
        },
        ChatButton: {
          baseSettings: {
            apiKey: process.env.INKEEP_API_KEY,
          },
        }
      }
    ],
    ['./plugins/lark-docs', larkDocsConfig],
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
            type: 'custom-searchbtn',
            position: 'right'
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
            label: "Cloud 开发指南",
            position: 'left',
            className: 'header-link',
          },
          {
            href: '/docs/byoc/quick-start',
            label: "BYOC 开发指南",
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
            label: '版本文档',
            position: 'left',
            items: [
              {
                label: '功能支持情况',
                href: '/docs/feature-availability',
              },
              {
                label: '版本说明书',
                href: '/docs/release-notes',
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
      }
    }),
  themes: [
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
