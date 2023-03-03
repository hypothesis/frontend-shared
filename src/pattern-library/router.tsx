import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

import type { PlaygroundRoute } from './routes';

function routeFromCurrentURL(baseURL: string) {
  return location.pathname.slice(baseURL.length);
}

function isAbsolute(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    // URL constructor throws if passed a relative URL
    return false;
  }
}

/**
 * Scroll page to target of fragment identifier.
 *
 * @param hash - Fragment including the leading `#`
 */
function scrollToFragment(hash: string) {
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

/**
 * Hook that sets up the router for the component library and returns the
 * current route.
 *
 * Clicks on links in the current page to URLs that are under `baseURL`
 * are automatically intercepted and handled.
 *
 * @return - Returns a two-item array with the current route's data and a
 *   `navigate` function to manually trigger a client-side navigation to another
 *   route.
 */
export function useRoute(
  baseURL: string,
  routes: PlaygroundRoute[]
): [PlaygroundRoute | undefined, (e: Event, url: string) => void] {
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
    const hashChangeListener = (e: HashChangeEvent) => {
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

  const navigate = useCallback(
    /**
     * @param  url - Relative or absolute URL. If relative, it is assumed to be
     * relative to {@link baseURL}
     */
    (event: Event, url: string) => {
      if (!isAbsolute(url)) {
        url = baseURL + url;
      }
      const routeURL = new URL(url, location.href);

      event.preventDefault();
      history.pushState({}, '' /* unused */, routeURL);

      setRoute(routeURL.pathname.slice(baseURL.length));
    },
    [baseURL]
  );

  // Intercept clicks on links and trigger navigation to a route within the
  // app if appropriate.
  useEffect(() => {
    const clickListener = (event: Event) => {
      const link = (event.target as HTMLElement).closest('a');
      if (!link) {
        return;
      }

      // Don't handle links that point outside this app or links that open in a
      // new tab.
      if (
        link.origin !== location.origin ||
        !link.pathname.startsWith(baseURL) ||
        link.target !== ''
      ) {
        return;
      }

      navigate(event, link.href);
    };
    window.addEventListener('click', clickListener);
    return () => {
      window.removeEventListener('click', clickListener);
    };
  }, [baseURL, navigate]);

  return [routeData, navigate];
}
