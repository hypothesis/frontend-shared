import { useCallback, useEffect, useMemo, useState } from 'preact/hooks';

/**
 * @typedef {import('./routes').PlaygroundRoute} PlaygroundRoute
 */

/** @param {string} baseURL */
function routeFromCurrentURL(baseURL) {
  return location.pathname.slice(baseURL.length);
}

/** @param {string} url */
function isAbsolute(url) {
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
 * @param {string} hash - Fragment including the leading `#`
 */
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

/**
 * Hook that sets up the router for the component library and returns the
 * current route.
 *
 * Clicks on links in the current page to URLs that are under {@link baseURL}
 * are automatically intercepted and handled.
 *
 * @param {string} baseURL - Pathname of the root URL of the application.
 * @param {PlaygroundRoute[]} routes
 * @return {[route?: PlaygroundRoute, navigate: (e: Event, url: string) => void]} -
 *   Returns the current route's data and a `navigate` function to manually
 *   trigger a client-side navigation to another route.
 */
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
    /** @param {HashChangeEvent} e */
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

  const navigate = useCallback(
    /**
     * @param {Event} event - Event which triggered the navigation
     * @param {string} url - Relative or absolute URL. If relative, it is
     *   assumed to be relative to {@link baseURL}
     */
    (event, url) => {
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
    /** @param {Event} event */
    const clickListener = event => {
      const link = /** @type {HTMLElement} */ (event.target).closest('a');
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
