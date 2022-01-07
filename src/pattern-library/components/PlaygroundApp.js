import classnames from 'classnames';

import { Link, SvgIcon } from '../../';

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
      <h1>:(</h1>
      <p>Page not found.</p>
    </>
  );

  const routeGroups = [
    { title: 'Foundations', routes: getRoutes('foundations') },
    { title: 'Patterns', routes: getRoutes('patterns') },
    { title: 'Common Components', routes: getRoutes('components') },
  ];

  if (extraRoutes.length) {
    routeGroups.push({ title: 'Application Patterns', routes: extraRoutes });
  }

  return (
    <main className="grid grid-cols-[20rem_1fr] w-screen h-screen">
      <div className="bg-grey-2">
        <div className="p-4 text-center">
          <Link href={baseURL} onClick={e => navigate(e, '/')}>
            <SvgIcon name="logo" />
          </Link>
        </div>
        {routeGroups.map(rGroup => (
          <div key={rGroup.title}>
            <h2 className="p-2">{rGroup.title}</h2>
            <ul>
              {rGroup.routes.map(({ route, title }) => (
                <li key={title}>
                  <Link
                    classes={classnames(
                      'w-full border-x-6 border-grey-2 py-3 pl-6 hover:bg-grey-3',
                      {
                        'bg-grey-3': activeRoute?.route === route,
                      }
                    )}
                    href={`${route}`}
                    onClick={e => navigate(e, route)}
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div>{content}</div>
    </main>
  );
}
