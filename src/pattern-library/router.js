import { useEffect, useMemo, useState } from 'preact/hooks';

function routeFromCurrentURL(baseURL) {
  return location.pathname.slice(baseURL.length);
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
    const popstateListener = () => {
      setRoute(routeFromCurrentURL(baseURL));
    };
    window.addEventListener('popstate', popstateListener);
    return () => {
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
