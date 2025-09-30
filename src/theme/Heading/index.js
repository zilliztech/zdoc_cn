import React, { useState } from 'react';
import Link from '@docusaurus/Link'
import Heading from '@theme-original/Heading';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const BetaTag = (tag) => {
  var tag_caption = "";
  var tag_color = "";

  switch (true) {
    case tag ==='PUBLIC':
      tag_caption = "公测版";
      tag_color = "#175fff";
      break;
    case tag === 'PRIVATE':
      tag_caption = "内测版";
      tag_color = "#7F47FF";
      break;
    case tag === 'CONTACT SALES':
      tag_caption = "联系销售";
      tag_color = "#FF7F47";
      break;
    case tag === 'NEAR DEPRECATE':
      tag_caption = "即将作废";
      tag_color = "#FF7F47";    
      break;
    case tag?.startsWith('Milvus'):
      tag_caption = 'Compatible with ' + tag;
      tag_color = "rgb(0, 179, 255)"
      break;
    default:
      tag_caption = "";
      tag_color = "";
      break;
  }

  return {
    tag_caption,
    tag_color
  }
}

const BetaTagComponent = (children, tag, linkable, destination_url) => {

  const { tag_caption, tag_color } = BetaTag(tag);

  return (
    <span style={{ 
        display: "inline-block",
        verticalAlign: 'center',
        minHeight: '2rem',
      }}>
          {children}
        <div style={{
          display: "inline-block",
          lineHeight: '2rem',
          verticalAlign: 'top'
        }}>
          { !linkable && (<span
              style={{
                fontSize: '1rem',
                color: '#ffffff',
                fontWeight: 'normal',
                marginLeft: '0.5rem',
                marginBottom: '0.5rem',
                padding: '2px 12px 2px 12px',
                borderRadius: '100px',
                backgroundColor: tag_color,
              }}>
              { tag_caption }
          </span> ) }
          { linkable && (
            <Link to={destination_url} style={{ textDecoration: 'none' }}>
              <span
                  style={{
                    fontSize: '1rem',
                    color: '#ffffff',
                    fontWeight: 'normal',
                    marginLeft: '0.5rem',
                    marginBottom: '0.5rem',
                    padding: '2px 12px 2px 12px',
                    borderRadius: '100px',
                    backgroundColor: tag_color,
                  }}>
                  { tag_caption }
              </span>
            </Link> )}       
        </div>    

    </span>
  );
}

const OpenInButtonComponent = ({
  caption,
  icon,
}) => (
  <div style={{
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: '600',
    padding: "0.5rem 1rem 0.5rem 1rem",
    borderRadius: '8px',
    border: '1px solid #E8EAEE',
    backgroundColor: '#F6F8fA',
    cursor: 'pointer',
  }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ display: 'inline-block'}}>OPEN IN <span className={styles.vendor}>{caption.toUpperCase()}</span></span>
        {icon}
      </div>
  </div>
)

const OpenInButtonLink = ({
  caption,
  icon,
  notebook,
}) => {
  const colab_prefix = "https://colab.research.google.com/github/zilliztech/zdoc-demos/blob/master/python/";
  const github_prefix = "https://github.com/codespaces/new?template_repository=zilliztech/zdoc-demos";
  const prefix = caption === 'colab' ? colab_prefix : github_prefix;

  if (notebook && notebook.indexOf(',') > -1) {
    notebook = notebook.includes(',') ? notebook.split(',') : notebook;
    const [expand, setExpand] = useState(false);

    return (
      <div className="navbar__item dropdown dropdown--hoverable" style={{padding: 0}}>
          <OpenInButtonComponent caption={caption + " \u25BC"} icon={icon} aria-haspopup="true" aria-expanded={expand} onClick={() => setExpand(!expand)} role="button" className="navbar__link" />
          <ul className="dropdown__menu">
              {notebook.map((item, idx) => (
                  <li key={idx}>
                      <a href={prefix+item} className="dropdown__link" target="_blank" rel="noopener noreferrer">{item}</a>
                  </li>
              ))}
          </ul>
      </div>
    )
  } else {
    return ( notebook &&
      <Link to={prefix + notebook} style={{ color: "#000000"}}>
        <OpenInButtonComponent caption={caption} icon={icon} />
      </Link> || 
      <Link to={prefix} style={{ color: "#000000"}}>
        <OpenInButtonComponent caption={caption} icon={icon} />
      </Link>
    )
  }
} 

export default function HeadingWrapper(props) {
  try {
    const { frontMatter, metadata } = useDoc();
    const { beta, notebook, tags, added_since, last_modified, deprecate_since } = frontMatter;
    var tag = metadata.title.endsWith('BYOC') ? 'BYOC' : beta;

    if (props.as === 'h1' && beta) {
      const linkable = tag === 'CONTACT SALES' || tag === 'BYOC'
      const destination_url = 'https://zilliz.com.cn/contact-sales'      

      props = {
        as: "h1",
        id: props.id,
        children: tag ? BetaTagComponent(props.children, tag, linkable, destination_url) : props.children
      }
    }

    if (props.as.match(/h[2-6]/) && props.children.includes('|')) {
      const [title, tag] = props.children.split('|') 
      const linkable = tag?.trim() === 'CONTACT SALES'
      const destination_url = 'https://zilliz.com.cn/contact-sales'

      props = {
        as: "h2",
        id: props.id,
        children: tag ? BetaTagComponent(title.trim(), tag?.trim(), linkable, destination_url) : title.trim()
      }
    }
  
    const Colab = require('@site/static/icons/colab-icon.svg').default;
    const Github = require('@site/static/icons/github-icon.svg').default;
  
    return (
      <>
        { tags?.length > 0 && <span style={{ fontWeight: '400', color: 'rgb(18, 17, 66)'  }}>{tags[0]}</span> }
        <Heading {...props} />

        {
          props.as === 'h1' && (added_since || last_modified || deprecate_since) && (
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem',
              padding: '0.75rem 0',
              borderTop: '1px solid #e9ecef',
              borderBottom: '1px solid #e9ecef'
            }}>
              { added_since && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#495057'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#e7f3ff',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    color: '#0066cc'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    Added
                  </span>
                  <b>{added_since}</b>
                </span>
              ) }
              { last_modified && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#495057'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    color: '#666666'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    Modified
                  </span>
                  <b>{last_modified}</b>
                </span>
              ) }
              { deprecate_since && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#dc3545'
                }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#ffe6e6',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    color: '#dc3545'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    Deprecated
                  </span>
                  <b>{deprecate_since}</b>
                </span>
              ) }
            </div>
          )
        }
  
        {
          props.as === 'h1' && notebook && (
            <div id="exec" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
              <OpenInButtonLink caption="colab" icon={<Colab />} notebook={notebook} />
              <OpenInButtonLink caption="github codespaces" icon={<Github />} />
            </div>
          )
        }
      </>
    );
  } catch (error) {
    return (
      <>
        <Heading {...props} />
      </>
    )
  }
}