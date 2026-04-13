import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';

export default function NotFoundContent({className}) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className="row">
        <div className="col col--6 col--offset-3" style={{textAlign: 'center'}}>
          <div style={{fontSize: '72px', marginBottom: '16px', opacity: 0.8}}>
            <span className="material-symbols-outlined" style={{fontSize: '72px', color: '#D0D6DF'}}>
              search_off
            </span>
          </div>
          <Heading as="h1" className="hero__title">
            <Translate
              id="theme.NotFound.title"
              description="The title of the 404 page">
              Page Not Found
            </Translate>
          </Heading>
          <p style={{color: '#475467', fontSize: '16px', lineHeight: '24px'}}>
            <Translate
              id="theme.NotFound.p1"
              description="The first paragraph of the 404 page">
              We could not find what you were looking for. The page may have been moved or no longer exists.
            </Translate>
          </p>

          <div style={{display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px', flexWrap: 'wrap'}}>
            <a className="button button--primary button--lg" href="/home" style={{borderRadius: '8px', minWidth: '120px'}}>
              <span className="button__text button__text--primary">返回首页</span>
            </a>
            <a className="button button--secondary button--lg" href="/docs/quick-start" style={{borderRadius: '8px', minWidth: '120px'}}>
              <span className="button__text button__text--secondary">快速开始</span>
            </a>
          </div>

          <div style={{marginTop: '48px', padding: '24px', background: '#F6F8FA', borderRadius: '12px', textAlign: 'left'}}>
            <p style={{fontSize: '14px', fontWeight: 600, color: '#24292f', marginBottom: '12px'}}>
              常用页面
            </p>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <li>
                <a href="/docs/quick-start" style={{color: '#175fff', fontSize: '14px', textDecoration: 'none'}}>
                  快速开始
                </a>
              </li>
              <li>
                <a href="/reference/restful" style={{color: '#175fff', fontSize: '14px', textDecoration: 'none'}}>
                  RESTful API 参考
                </a>
              </li>
              <li>
                <a href="/reference/python" style={{color: '#175fff', fontSize: '14px', textDecoration: 'none'}}>
                  Python SDK 参考
                </a>
              </li>
              <li>
                <a href="/docs/release-notes" style={{color: '#175fff', fontSize: '14px', textDecoration: 'none'}}>
                  版本说明
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
