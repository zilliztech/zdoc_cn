import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import ArticlesList from '../ArticleLists';

const CategoryList = [
  {
    id: 0,
    title: 'Zilliz Cloud 101',
    Svg: require('@site/static/img/zilliz-cloud-101.svg').default,
    groupStyle: styles.activeGroupBlue,
    groupCaptionStyle: styles.activeGroupCaptionBlue,
    description: (
      <>
        了解如何快速使用 Milvus SDK 搭建 Zilliz Cloud 集群。
      </>
    ),
  },
  {
    id: 1,
    title: 'AI 模型集成',
    Svg: require('@site/static/img/ai-model-integrations.svg').default,
    groupStyle: styles.activeGroupOrange,
    groupCaptionStyle: styles.activeGroupCaptionOrange,
    description: (
      <>
        了解如何配合 AI 模型使用 Zilliz Cloud 向量数据库。
      </>
    ),
  },
  {
    id: 2,
    title: 'Zilliz Cloud v.s. Milvus',
    Svg: require('@site/static/img/migration-from-milvus.svg').default,
    groupStyle: styles.activeGroupLightBlue,
    groupCaptionStyle: styles.activeGroupCaptionLightBlue,
    description: (
      <>
        了解 Zilliz Cloud 与开源的向量数据库 Milvus 有哪些异同。
      </>
    ),
  },  
];

function Category({Svg, id, title, description, groupStyle, groupCaptionStyle, activeGroup, setActiveGroup}) {
  const [hover, setHover] = React.useState(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <div 
      style={{display: "block", flex: "25%", cursor: "pointer"}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setActiveGroup(id)
      }}
    >
      <div className={clsx(hover || activeGroup == id ? groupStyle : styles.inactiveGroup)}>
        <div style={{display: "flex", flexDirection: "column", rowGap: "0.4em", margin: "2em"}}>
            <div style={{display: "block", width: "40px", height: "40px", margin: "auto"}}>
              <Svg style={{width: "40px", height: "40px"}} role="img" />
            </div>
            <div style={{textAlign: "center"}}>
                <span className={clsx(hover || activeGroup == id ? groupCaptionStyle : styles.inactiveGroupCaption)}>{title}</span>
            </div>
            <div style={{textAlign: "center"}}>
                <span style={{fontSize: "0.8em", color: "#647489"}}>{description}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  const [activeGroup, setActiveGroup] = React.useState(0)

  return (
    <div>
      <section style={{display: "inline-grid", height: "50px", width: "100%", gridTemplateColumns: "15% auto 10%", paddingTop: "11px"}}>
        <div></div>
        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
          {CategoryList.map((props, idx) => (
            <Category key={idx} {...props} activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
          ))}
        </div>
        <div></div>
      </section>
      <section>
        <ArticlesList activeGroup={activeGroup} />
      </section>
    </div>
  );
}
