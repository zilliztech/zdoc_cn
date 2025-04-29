import React, { useState, useRef, useCallback } from 'react';
import {
    InkeepModalChat,
} from "@inkeep/cxkit-react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function Banner({ bannerText, bannerLinkText }) {
    const [isOpen, setIsOpen] = useState(false);
    const { siteConfig } = useDocusaurusContext();

    const { apiKey, integrationId, organizationId} = siteConfig.themeConfig.inkeepConfig.baseSettings;

    const handleOpenChange = useCallback((isOpen) => {
        setIsOpen(isOpen);
    }, []);

    const config = {
        baseSettings: {
            apiKey,
            integrationId,
            organizationId,
            organizationDisplayName: 'Zilliz Cloud',
            primaryBrandColor: '#175fff'
        },
        aiChatSettings: {
            aiAssistantName: 'Zilliz',
            chatSubjectName: 'Zilliz Cloud',
            placeholder: 'Zilliz Cloud 是什么？',
            introMessage: "我是文档 AI 助手，可以获取包括文档在内的所有与 Zilliz Cloud 开发相关的资料。\n有什么可以帮您？",
            isShareButtonVisible: true,
            isCopyChatButtonVisible: true,
            exampleQuestions: [
                "我应该如何创建和连接到 Zilliz Cloud 集群？",
                "我的数据集规模比较大，应该如何优化向量搜索性能？",
                "Serverless 和 Dedicated 集群有什么区别？"
            ]
        }
    }

    config.modalSettings = {
        isOpen,
        onOpenChange: handleOpenChange,
    }

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <span className={styles.bannerText}>
                    { bannerText }
                </span>
                <span type="button" className={styles.bannerLink} onClick={() => setIsOpen(true)}>
                    <span>{ bannerLinkText }</span>
                    <i className={styles.zillizStar} />
                </span>
            </div> 

            <InkeepModalChat {...config} />
        </div>
    )
}