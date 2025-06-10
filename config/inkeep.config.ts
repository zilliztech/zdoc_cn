import { defineConfig } from "@inkeep/cxkit-docusaurus";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
    answerConfidence, 
    salesSignalType,
    detectedSalesSignal, 
    provideAnswerConfidenceSchema 
} from './Inkeep';

const validSalesSignalTypes = salesSignalType.options.map(
  option => option.value
);

export const inkeepSettings ={
  baseSettings: {
    primaryBrandColor: "#175fff",
    organizationDisplayName: "Zilliz",
    theme: {
      styles: [
        {
          key: 'custom-styles',
          type: 'link',
          value: "/css/inkeep-overrides.css"
        }
      ]
    },
    transformSource: (source, type) => {
        const tabs = source.tabs || [];

        if (type === 'searchResultItem') {
            console.log('source', source)
            console.log('type', type)
            if (source.url.includes('/docs/byoc')) {
                tabs.push('BYOC')
            } else if (source.breadcrumbs.includes('Reference')) {
                tabs.push('参考')
            } else if (source.url.startsWith('https://support.zilliz.com')) {
                tabs.push('支持')
            } else if (source.breadcrumbs.includes('Partners')) {
                tabs.push('伙伴')
            } else if (source.breadcrumbs.includes('Event')) {
                tabs.push('活动')
            } else if (source.breadcrumbs.includes('Glossary')) {
                tabs.push('术语')
            } else if (source.url.includes('/docs')) {
                tabs.push('指南')
            }
                
            return {
                ...source,
                title: `${source.title.split('Contact')[0].split(' | ')[0]}`
            }
        }
    }            
  },
  aiChatSettings: {
    toolbarButtonLabels: {
      getHelp: "获取帮助",
      clear: "清空",
      stop: "停止"
    },
    aiAssistantName: "AI 助手",
    chatSubjectName: "Zilliz Cloud",
    introMessage: "您好，我是 Zilliz Cloud AI 助手。\n我基于技术文档、帮助文章和最佳实践进行训练。\n今天有什么可以帮您的？",
    getHelpOptions: [
      {
        name: "提交工单",
        action: {
          type: "open_link",
          url: "https://support.zilliz.com.cn/hc/zh-cn",
        },
        icon: {
          builtIn: "IoHelpBuoyOutline"
        },
        isPinnedToToolbar: true
      },
      {
        name: "联系销售",
        action: {
          type: "open_link",
          url: "https://zilliz.com.cn/contact-sales?contact_sales_traffic_source=websiteBot"
        },
        icon: {
          builtIn: "IOChatbubblesOutline"
        },
        isPinnedToToolbar: true
      }
    ],
    exampleQuestionsLabel: "示例问题",
    exampleQuestions: [
      "创建和连接集群",
      "针对大规模数据集优化向量搜索性能",
      "Serverless v.s. Dedicated",
      "Zilliz Cloud 最近更新",
      "修改支付方式"
    ],
    aiAssistantAvatar: "https://assets.zilliz.com/cloud_ai_assistance_avatar_d9eb0d7763.svg",
    placeholder: "您需要什么帮助？",
    getTools: () => [
      {
        type: "function",
        function: {
          name: "provideAnswerConfidence",
          description: "Determine how confident the AI assistant was and whether or not to escalate to humans.",
          parameters: zodToJsonSchema(provideAnswerConfidenceSchema),
        },
        renderMessageButtons: ({ args }) => {
          const confidence = args.answerConfidence;
          if (["not_confident", "no_sources", "other"].includes(confidence)) {
            return [
              {
                label: "提交工单",
                action: {
                  type: "open_link",
                  url: "https://support.zilliz.com.cn/hc/zh-cn",
                },
                icon: {
                  builtIn: "IoHelpBuoyOutline"
                }
              }
            ];
          }
          return [];
        },
      },
      {
        type: "function",
        function: {
          name: "detectSalesSignal",
          description: "Identify when users express interest in potentially purchasing a product.",
          parameters: zodToJsonSchema(detectedSalesSignal),
        },
        renderMessageButtons: ({ args }) => {
          if (args.type && validSalesSignalTypes.includes(args.type)) {
            return [
              {
                label: "联系销售",
                icon: { builtIn: "LuCalendar"},
                action: {
                  type: "open_link",
                  url: "https://zilliz.com/contact-sales?contact_sales_traffic_source=websiteBot"
                }
              }
            ];
          }
          return []
        }
      }
    ]
  },
  searchSettings: {
    placeholder: '您需要查找什么关键字？',
    tabs: ['All', '指南', '参考', '支持', '伙伴', '活动', '术语']        
  }
};

export default defineConfig({
  SearchBar: {
    ...inkeepSettings
  },
  ChatButton: {
    ...inkeepSettings
  },
});