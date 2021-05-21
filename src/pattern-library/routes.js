import PlaygroundHome from './components/PlaygroundHome';

import SharedColorPatterns from './components/patterns/SharedColorPatterns';
import SharedMoleculePatterns from './components/patterns/SharedMoleculePatterns';
import SharedOrganismPatterns from './components/patterns/SharedOrganismPatterns';

import SharedDialogPatterns from './components/patterns/SharedDialogPatterns';
import SharedButtonPatterns from './components/patterns/SharedButtonPatterns';
import SharedFormPatterns from './components/patterns/SharedFormPatterns';
import SharedPanelPatterns from './components/patterns/SharedPanelPatterns';

/**
 * @typedef {'home'|'foundations'|'components'} PlaygroundRouteGroup
 *
 * @typedef PlaygroundRoute - Route "handler" that provides a component (function)
 *   that should be rendered for the indicated route
 * @prop {RegExp|string} route - Pattern or string path relative to
 *   `baseURL`, e.g. '/my-patterns'
 * @prop {string} title
 * @prop {import("preact").FunctionComponent<{}>} component
 * @prop {PlaygroundRouteGroup} group
 */

/** @type {PlaygroundRoute[]} */
const routes = [
  {
    route: /^\/?$/,
    title: 'Home',
    component: PlaygroundHome,
    group: 'home',
  },
  {
    route: '/foundations-colors',
    title: 'Colors',
    component: SharedColorPatterns,
    group: 'foundations',
  },
  {
    route: '/foundations-molecules',
    title: 'Molecules',
    component: SharedMoleculePatterns,
    group: 'foundations',
  },
  {
    route: '/foundations-organisms',
    title: 'Organisms',
    component: SharedOrganismPatterns,
    group: 'foundations',
  },
  {
    route: '/components-buttons',
    title: 'Buttons',
    component: SharedButtonPatterns,
    group: 'components',
  },
  {
    route: '/components-dialog',
    title: 'Dialogs',
    component: SharedDialogPatterns,
    group: 'components',
  },
  {
    route: '/components-forms',
    title: 'Forms',
    component: SharedFormPatterns,
    group: 'components',
  },
  {
    route: '/components-panel',
    title: 'Panel',
    component: SharedPanelPatterns,
    group: 'components',
  },
];

/**
 * Retrieve all routes or the subset in group `group`.
 *
 * @param {PlaygroundRouteGroup} [group]
 * @returns {PlaygroundRoute[]}
 */
export function getRoutes(group) {
  if (group) {
    return routes.filter(route => route.group === group);
  }
  return routes;
}
