import classnames from 'classnames';

import { Link, SvgIcon } from '../../';
import Library from './Library';

import { componentGroups, getRoutes } from '../routes';
import { useRoute } from '../router';

/**
 * @typedef {import("../routes").PlaygroundRoute} PlaygroundRoute
 * @typedef {import("../routes").PlaygroundRouteGroup} PlaygroundRouteGroup
 * @typedef {import('preact').ComponentChildren} Children
 */

/**
 * @typedef PlaygroundAppProps
 * @prop {string} [baseURL]
 * @prop {PlaygroundRoute[]} [extraRoutes] - Local-/application-specific routes
 *   to add to this pattern library in addition to the shared/common routes
 */

/**
 * Render web content for the playground application. This includes the "frame"
 * around the page and a navigation channel, as well as the content rendered
 * by the component handling the current route.
 *
 * @param {PlaygroundAppProps} props
 */
export default function PlaygroundApp({
  baseURL = '/ui-playground',
  extraRoutes = [],
}) {
  const routes = getRoutes();
  const allRoutes = routes.concat(extraRoutes);
  const [activeRoute, navigate] = useRoute(baseURL, allRoutes);
  const content = activeRoute ? (
    <activeRoute.component />
  ) : (
    <Library.Page title=":( Sorry">
      <h1 className="text-2xl">Page not found</h1>
    </Library.Page>
  );

  /**
   * Header for a primary section of nav
   *
   * @param {object} props
   *   @param {Children} props.children
   */
  function NavHeader({ children }) {
    return (
      <h2 className="border-b px-2 py-1 font-light text-lg">{children}</h2>
    );
  }

  /**
   * A single navigation link
   *
   * @param {object} props
   *   @param {PlaygroundRoute} props.route
   */
  function NavLink({ route }) {
    return (
      <li className="-ml-[2px]">
        {route.route && (
          <Link
            classes={classnames('pl-4 w-full border-l-2 hover:border-l-brand', {
              'border-l-2 border-brand font-semibold':
                activeRoute?.route === route.route,
              'border-transparent': activeRoute?.route !== route.route,
            })}
            href={route.toString()}
            onClick={e => navigate(e, route.route)}
          >
            {route.title}
          </Link>
        )}
        {!route.route && (
          <div className="pl-4 w-full text-slate-5 font-light">
            {route.title}
          </div>
        )}
      </li>
    );
  }

  /**
   * Render a list of navigation items
   *
   * @param {object} props
   *   @param {PlaygroundRoute[]} props.routes
   */
  function NavList({ routes }) {
    return (
      <ul className="ml-2 space-y-2 border-l-2 border-slate-0">
        {routes.map(route => (
          <NavLink key={route.title} route={route} />
        ))}
      </ul>
    );
  }

  /**
   * Secondary section of navigation, with header
   *
   * @param {object} props
   *   @param {string} props.title - Title of navigation section
   *   @param {Children} props.children
   */
  function NavSection({ title, children }) {
    return (
      <div className="space-y-4">
        <h3 className="mx-2 text-slate-7 font-semibold text-sm">{title}</h3>
        {children}
      </div>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto">
      <div className="md:grid md:grid-cols-[2fr_5fr]">
        <div className="md:h-screen md:sticky md:top-0 overflow-scroll">
          <div className="md:sticky md:top-0 h-16 px-6 flex items-center bg-slate-0 border-b">
            <h1>
              <Link
                href={baseURL}
                classes="grow flex gap-x-2 text-lg"
                onClick={e => navigate(e, '/')}
              >
                <SvgIcon name="logo" />
                Component Library
              </Link>
            </h1>
          </div>
          <nav id="nav" className="pt-8 pb-16 space-y-4 mr-4">
            <NavHeader>Foundations</NavHeader>
            <NavList routes={getRoutes('foundations')} />

            <NavHeader>Components</NavHeader>
            {Object.keys(componentGroups).map(group => {
              return (
                <NavSection key={group} title={componentGroups[group]}>
                  <NavList
                    routes={getRoutes(
                      /** @type PlaygroundRouteGroup */ (group)
                    )}
                  />
                </NavSection>
              );
            })}

            <NavHeader>Legacy</NavHeader>
            <NavSection title="Legacy Patterns">
              <NavList routes={getRoutes('patterns')} />
            </NavSection>
            <NavSection title="Legacy Components">
              <NavList routes={getRoutes('components')} />
            </NavSection>

            {extraRoutes.length > 0 && (
              <>
                <NavHeader>Application</NavHeader>
                <NavList routes={extraRoutes} />
              </>
            )}
          </nav>
        </div>
        <div className="bg-white pb-16">{content}</div>
      </div>
    </main>
  );
}
