import React, { useEffect } from 'react';

export default function Root({ children }) {
  useEffect(() => {
    const badge = document.querySelector('.navbar__item--new-badge');
    if (!badge) return;

    const handleClick = () => {
      badge.classList.add('badge-dismissed');
    };

    badge.addEventListener('click', handleClick);
    return () => badge.removeEventListener('click', handleClick);
  }, []);

  return <>{children}</>;
}
