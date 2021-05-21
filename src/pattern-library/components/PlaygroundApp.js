import classnames from 'classnames';

import { SvgIcon } from '../../components/SvgIcon';

import { getRoutes } from '../routes';

import { useRoute } from '../router';

/**
 * @typedef {import("../routes").PlaygroundRoute} PlaygroundRoute
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
    <>
      <h1 className="heading">:(</h1>
      <p>Page not found.</p>
    </>
  );

  const routeGroups = [
    { title: 'Foundations', routes: getRoutes('foundations') },
    { title: 'Common Components', routes: getRoutes('components') },
  ];

  if (extraRoutes.length) {
    routeGroups.push({ title: 'Application Patterns', routes: extraRoutes });
  }

  return (
    <main className="PlaygroundApp">
      <div className="PlaygroundApp__sidebar">
        <div className="PlaygroundApp__sidebar-home">
          <a href={baseURL} onClick={e => navigate(e, '/')}>
            <SvgIcon name="logo" />
          </a>
        </div>
        {routeGroups.map(rGroup => (
          <div key={rGroup.title}>
            <h2>{rGroup.title}</h2>
            <ul>
              {rGroup.routes.map(({ route, title }) => (
                <li key={title}>
                  <a
                    className={classnames('PlaygroundApp__nav-item', {
                      'is-active': activeRoute.route === route,
                    })}
                    href={`${route}`}
                    onClick={e => navigate(e, route)}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="PlaygroundApp__content">{content}</div>
    </main>
  );
}
