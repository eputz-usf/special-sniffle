import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function RouteAccessibility() {
  const location = useLocation();

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;
    main.id = 'main-content';
    main.tabIndex = -1;
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' });
    } else {
      main.focus({ preventScroll: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    const heading = main.querySelector('h1')?.textContent?.trim();
    document.title = `${heading || 'Degree Explorer'} | Bellini Degree Explorer Beta`;
  }, [location.pathname, location.search, location.hash]);

  return null;
}
