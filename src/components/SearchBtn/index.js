import React, { useState, useCallback } from 'react';
import {
    InkeepModalSearch,
} from "@inkeep/cxkit-react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

export default function SearchBtn(props) {
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
            primaryBrandColor: '#175fff',
            transformSource: (source, type) => {
                const tabs = source.tabs || [];

                if (type === 'searchResultItem') {
                    if (source.url.includes('/docs/byoc')) {
                        tabs.push('BYOC')
                    } else if (source.breadcrumbs.includes('Reference')) {
                        tabs.push('指南')
                    } else if (source.url.includes('/docs')) {
                        tabs.push('参考')
                    } else if (source.url.startsWith('https://support.zilliz.com')) {
                        tabs.push('支持')
                    } else if (source.breadcrumbs.includes('Partners')) {
                        tabs.push('案例')
                    } else if (source.breadcrumbs.includes('Event')) {
                        tabs.push('活动')
                    } else if (source.breadcrumbs.includes('Glossary')) {
                        tabs.push('术语')
                    } 
                        
                    return {
                        ...source,
                        title: `${source.title.split('Contact')[0]}`
                    }
                }
            }

        },
        searchSettings: {
            placeholder: '您需要找什么？',
            tabs: ['All', '指南', '参考', '支持', '学习', '案例', '活动']
        }
    }
    
    config.modalSettings = {
        isOpen,
        onOpenChange: handleOpenChange,
    }

    return (
        <>
            <div className={styles.searchBtn} onClick={() => setIsOpen(true)}>
                <i className={styles.searchIcon} />
            </div>
            <InkeepModalSearch {...config} />
        </>
    )
}