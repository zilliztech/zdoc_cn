import React from 'react';
import { useActiveDocContext } from '@docusaurus/plugin-content-docs/client';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';

export default function DocsVersionDropdownNavbarItemWrapper(props) {
  const activeDocContext = useActiveDocContext(props.docsPluginId);

  if (!activeDocContext.activeDoc) {
    return null;
  }

  return (
    <>
      <DocsVersionDropdownNavbarItem {...props} />
    </>
  );
}
