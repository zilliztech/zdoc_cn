import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  findFirstSidebarItemLink,
  useDocById
} from '@docusaurus/plugin-content-docs/client';
import {usePluralForm} from '@docusaurus/theme-common';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
// function useCategoryItemsPlural() {
//   const {selectMessage} = usePluralForm();
//   return (count) =>
//     selectMessage(
//       count,
//       translate(
//         {
//           message: '1 item|{count} items',
//           id: 'theme.docs.DocCard.categoryDescription.plurals',
//           description:
//             'The default description for a category card in the generated index about how many items this category includes',
//         },
//         {count},
//       ),
//     );
// }

function findCategoryDocId(item) {
  if (item.link?.type === 'doc') return item.link.id;
  for (const child of item.items || []) {
    if (child.type === 'link' && child.docId) return child.docId;
    if (child.type === 'category') {
      const docId = findCategoryDocId(child);
      if (docId) return docId;
    }
  }
  return undefined;
}

function useOptionalDocById(docId) {
  try {
    return useDocById(docId ?? undefined);
  } catch {
    return undefined;
  }
}


function CardContainer({href, children}) {
  return (
    <Link
      href={href}
      className={clsx('card padding--lg', styles.cardContainer)}>
      {children}
    </Link>
  );
}
function CardLayout({href, icon, title, description}) {
  if (description && description.includes('|')) {
    description = description.split('|')[0];
  }

  return (
    <CardContainer href={href}>
      <h2 className={clsx('text--truncate', styles.cardTitle)} title={title}>
        {title} <span className="tooltip">[READ MORE]</span>
      </h2>
      {description && (
        <p
          className={clsx('text--truncate', styles.cardDescription)}
          title={description}>
          {description}
        </p>
      )}
    </CardContainer>
  );
}
function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  // const categoryItemsPlural = useCategoryItemsPlural();
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }

  const doc = useOptionalDocById(findCategoryDocId(item));

  return (
    <CardLayout
      href={href}
      icon="🗃️"
      title={item.label}
      //description={item.description ?? categoryItemsPlural(item.items.length)}
      description={item.description ?? doc?.description}
    />
  );
}
function CardLink({item}) {
  const icon = isInternalUrl(item.href) ? '📄️' : '🔗';
  const doc = useOptionalDocById(item.docId);
  return (
    <CardLayout
      href={item.href}
      icon={icon}
      title={item.label}
      description={item.description ?? doc?.description}
    />
  );
}
export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
