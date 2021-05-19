import classnames from 'classnames';

import { SvgIcon } from '../../components/SvgIcon';

// Design patterns
import SharedColorPatterns from './patterns/SharedColorPatterns';
import SharedMoleculePatterns from './patterns/SharedMoleculePatterns';
import SharedOrganismPatterns from './patterns/SharedOrganismPatterns';

// Components
import SharedButtonPatterns from './patterns/SharedButtonPatterns';
import SharedFormPatterns from './patterns/SharedFormPatterns';
import SharedPanelPatterns from './patterns/SharedPanelPatterns';

import { useRoute } from '../router';

/**
 * @typedef PlaygroundRoute - Route "handler" that provides a component (function)
 *   that should be rendered for the indicated route
 * @prop {RegExp|string} route - Pattern or string path relative to
 *   `baseURL`, e.g. '/my-patterns'
 * @prop {string} title
 * @prop {import("preact").FunctionComponent<{}>} component
 */

function HomeRoute() {
  return (
    <>
      <h1 className="heading">UI component playground</h1>
      <p>Select a component to view examples.</p>
    </>
  );
}

/** @type {PlaygroundRoute} */
const homeRoute = {
  route: /^\/?$/,
  title: 'Home',
  component: HomeRoute,
};

/** @type {PlaygroundRoute[]} */
const patternRoutes = [
  {
    route: '/shared-colors',
    title: 'Colors',
    component: SharedColorPatterns,
  },
  {
    route: '/shared-molecules',
    title: 'Molecules',
    component: SharedMoleculePatterns,
  },
  {
    route: '/shared-organisms',
    title: 'Organisms',
    component: SharedOrganismPatterns,
  },
];

/** @type {PlaygroundRoute[]} */
const componentRoutes = [
  {
    route: '/shared-buttons',
    title: 'Buttons',
    component: SharedButtonPatterns,
  },
  {
    route: '/shared-forms',
    title: 'Forms',
    component: SharedFormPatterns,
  },
  {
    route: '/shared-panel',
    title: 'Panel',
    component: SharedPanelPatterns,
  },
];

/** @type {PlaygroundRoute[]} */
const routes = [homeRoute, ...patternRoutes, ...componentRoutes];

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
    { title: 'Foundations', routes: patternRoutes },
    { title: 'Common Components', routes: componentRoutes },
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
