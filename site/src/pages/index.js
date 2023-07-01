import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import MidNav from '@site/src/components/MidNav';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ArticlesList from '../components/ArticleLists';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx(styles.heroBannerRow)}>
        <div className={clsx(styles.heroBannerColumn)}>
          <div></div>
          <div style={{display: "flex", flexDirection: "column", color: "#FFFFFF", marginTop: "3.5em"}}>
            <div style={{fontSize: "2em", marginBottom: "0.5em"}}>{siteConfig.title}</div>
            <div style={{fontSize: "18px", marginBottom: "2em"}}>{siteConfig.tagline}</div>
            <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
              <button style={{backgroundColor: "#FFFFFF", border: "none", borderRadius: "2px", color: "#000000", padding: "5px 10px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "1em", cursor: "pointer"}}>
                  <span style={{color: "#000000"}}><a style={{color: "#000000"}} href="https://docs.zilliz.com/docs/release-notes-200">版本说明书</a></span>
              </button>
              <button style={{backgroundColor: "rgba(0,0,0,0)", border: "1px solid #FFFFFF", borderRadius: "2px", color: "#FFFFFF", padding: "5px 10px", textAlign: "center", textDecoration: "none", display: "inline-block", fontSize: "1em", cursor: "pointer"}}>
                  <span><a href="./docs/faqs" style={{color: "#FFFFFF"}}>常见问题</a></span>
              </button>
            </div>
          </div>
          <div style={{margin: "2.5em auto"}}>
            <img src="https://assets.zilliz.com/rdme_hero_img.png" style={{width: "100%", height: "auto"}} />
          </div>
          <div></div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main style={{marginBottom: "15px"}}>
        <MidNav />
        <HomepageFeatures />
        <ArticlesList />
      </main>
    </Layout>
  );
}
