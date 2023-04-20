import classnames from 'classnames';
import type { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';
import {
  Route,
  Router,
  Switch,
  Link as RouteLink,
  useLocation,
  useRoute,
} from 'wouter-preact';

import type { PlaygroundAppProps } from '../';
import { Link, LogoIcon } from '../../';
import { componentGroups, getRoutes } from '../routes';
import type { PlaygroundRoute } from '../routes';
import Library from './Library';

/**
 * Header for a primary section of nav
 */
function NavHeader({ children }: { children: ComponentChildren }) {
  return <h2 className="border-b px-2 py-1 font-light text-lg">{children}</h2>;
}

/**
 * Secondary section of navigation, with header
 */
function NavSection({
  title,
  children,
}: {
  title: string;
  children: ComponentChildren;
}) {
  return (
    <div className="space-y-4">
      <h3 className="mx-2 text-slate-7 font-semibold text-sm">{title}</h3>
      {children}
    </div>
  );
}

/**
 * Render a list of navigation items
 */
function NavList({ children }: { children: ComponentChildren }) {
  return (
    <ul className="ml-2 space-y-2 border-l-2 border-slate-0">{children}</ul>
  );
}

/**
 * A single navigation link
 */
function NavLink({ route }: { route: PlaygroundRoute }) {
  const [isActive] = useRoute(route.route ?? '');
  return (
    <li className="-ml-[2px]">
      {route.route && (
        <RouteLink href={route.route ?? ''}>
          <Link
            classes={classnames(
              'pl-4 w-full border-l-2 hover:border-l-brand',

              {
                'border-l-2 border-brand font-semibold': isActive,
                'border-transparent': !isActive,
              }
            )}
          >
            {route.title}
          </Link>
        </RouteLink>
      )}
      {!route.route && (
        <div className="pl-4 w-full text-slate-5 font-light">{route.title}</div>
      )}
    </li>
  );
}

/**
 * Render web content for the playground application. This includes the "frame"
 * around the page and a navigation channel, as well as the content rendered
 * by the component handling the current route.
 */
export default function PlaygroundApp({
  baseURL = '',
  extraRoutes = [],
  extraRoutesTitle = 'Playground',
}: PlaygroundAppProps) {
  const routes = getRoutes();
  const [pathname] = useLocation();

  useEffect(
    /**
     * Support hash-based navigation and reset scroll when `wouter` path
     * changes.
     * - For locations without hash, reset scroll to top of page
     * - For locations with hash, scroll to top of fragment-indicated element,
     *   and ensure it's not obscured by the sticky `#page-header` element.
     */
    () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash) {
        const fragElement = document.getElementById(hash);
        if (fragElement) {
          fragElement.scrollIntoView();
          const pageHeaderElement = document.getElementById('page-header');
          // Height taken up by sticky header on page. Add 8 pixels to give
          // some visual padding.
          const headerOffset = pageHeaderElement
            ? pageHeaderElement.getBoundingClientRect().height + 8
            : 0;
          const fragTop = fragElement.getBoundingClientRect().top;
          if (fragTop <= headerOffset) {
            // Adjustment to accommodate sticky header (only if fragment is at or
            // near top of viewport)
            window.scrollBy({ top: -1 * (headerOffset - fragTop) });
          }
        }
      } else {
        window.scrollTo(0, 0);
      }
    },
    [pathname]
  );

  // Update document title when `wouter` path changes.
  useEffect(() => {
    const activeRoute = routes.find(({ route }) => route === pathname);
    document.title = `${
      activeRoute?.title ?? 'Page not found'
    }: Hypothesis Component Library`;
  }, [pathname, routes]);

  // Put all of the custom routes into the "custom" group
  const customRoutes = extraRoutes.map((route): PlaygroundRoute => {
    return { ...route, group: 'custom' };
  });
  const allRoutes = routes.concat(customRoutes);

  const pageRoutes = (
    <>
      {allRoutes
        .filter(route => !!route.route)
        .map(aRoute => (
          <Route key={aRoute.title} path={aRoute.route}>
            {aRoute.component ?? aRoute.title}
          </Route>
        ))}
    </>
  );

  const groupKeys = Object.keys(componentGroups) as Array<
    keyof typeof componentGroups
  >;
  return (
    <Router base={baseURL}>
      <main className="max-w-[1200px] mx-auto">
        <div className="md:grid md:grid-cols-[2fr_5fr]">
          <div className="md:h-screen md:sticky md:top-0 overflow-scroll">
            <div className="md:sticky md:top-0 h-16 px-6 flex items-center bg-slate-0 border-b">
              <h1 className="text-lg">
                <Link href={baseURL + '/'} classes="grow flex gap-x-2">
                  <LogoIcon />
                  Component Library
                </Link>
              </h1>
            </div>
            <nav id="nav" className="pt-8 pb-16 space-y-4 mr-4">
              <NavHeader>Foundations</NavHeader>
              <NavList>
                {getRoutes('foundations').map(route => (
                  <NavLink key={route.title} route={route} />
                ))}
              </NavList>

              <NavHeader>Components</NavHeader>

              {groupKeys.map(group => {
                return (
                  <NavSection
                    key={group}
                    title={componentGroups[group] as string}
                  >
                    <NavList>
                      {getRoutes(group).map(route => (
                        <NavLink key={route.title} route={route} />
                      ))}
                    </NavList>
                  </NavSection>
                );
              })}

              {extraRoutes.length > 0 && (
                <>
                  <NavHeader>{extraRoutesTitle}</NavHeader>
                  <NavList>
                    {customRoutes.map(route => (
                      <NavLink key={route.title} route={route} />
                    ))}
                  </NavList>
                </>
              )}
            </nav>
          </div>
          <div className="bg-white pb-16">
            <Switch>
              {pageRoutes}
              <Route>
                <Library.Page title=":( Sorry">
                  <h1 className="text-2xl">Page not found</h1>
                </Library.Page>
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    </Router>
  );
}
