import { useEffect, useMemo, useState } from 'preact/hooks';

function routeFromCurrentURL(baseURL) {
  return location.pathname.slice(baseURL.length);
}

function scrollToFragment(hash) {
  const fragmentId = decodeURIComponent(hash.substring(1));
  const fragElement = document.getElementById(fragmentId);
  // Vertical offset (px) that should be added to scroll to ensure
  // content is not obscured by sticky header on page
  const headerOffset = 72;
  if (fragElement) {
    fragElement.scrollIntoView();
    const fragTop = fragElement.getBoundingClientRect().top;
    if (fragTop <= headerOffset) {
      // Adjustment to accommodate sticky header (only if fragment is at or
      // near top of viewport)
      window.scrollBy({ top: -1 * (headerOffset - fragTop) });
    }
  }
}

export function useRoute(baseURL, routes) {
  const [route, setRoute] = useState(() => routeFromCurrentURL(baseURL));

  // Data associated with the currently-applied route
  const routeData = useMemo(() => {
    return routes.find(r => {
      if (!r.route) {
        return false;
      }
      if (typeof r.route === 'string') {
        return r.route === route;
      }
      return r.route && route.match(r.route);
    });
  }, [route, routes]);
  const title = `${
    routeData?.title ?? 'Page not found'
  }: Hypothesis Component Library`;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    // Reset scrolling after navigation
    const hash = location.hash;

    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    scrollToFragment(hash);
  }, [route]);

  useEffect(() => {
    const hashChangeListener = e => {
      try {
        const hash = new URL(e.newURL).hash;
        scrollToFragment(hash);
      } catch (e) {
        // no op
      }
    };
    const popstateListener = () => {
      setRoute(routeFromCurrentURL(baseURL));
    };
    window.addEventListener('hashchange', hashChangeListener);
    window.addEventListener('popstate', popstateListener);
    return () => {
      window.removeEventListener('hashchange', hashChangeListener);
      window.removeEventListener('popstate', popstateListener);
    };
  }, [baseURL]);

  const navigate = (event, route) => {
    event.preventDefault();
    history.pushState({}, title, baseURL + route);
    setRoute(route);
  };

  return [routeData, navigate];
}
