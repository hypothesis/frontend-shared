import PlaygroundHome from './components/PlaygroundHome';

import ColorPatterns from './components/patterns/ColorPatterns';
import LayoutPatterns from './components/patterns/LayoutPatterns';
import MoleculePatterns from './components/patterns/MoleculePatterns';
import OrganismPatterns from './components/patterns/OrganismPatterns';

import ButtonPatterns from './components/patterns/ButtonPatterns';
import DialogPatterns from './components/patterns/DialogPatterns';
import FormPatterns from './components/patterns/FormPatterns';
import PanelPatterns from './components/patterns/PanelPatterns';

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
    component: ColorPatterns,
    group: 'foundations',
  },
  {
    route: '/foundations-layout',
    title: 'Layout',
    component: LayoutPatterns,
    group: 'foundations',
  },
  {
    route: '/foundations-molecules',
    title: 'Molecules',
    component: MoleculePatterns,
    group: 'foundations',
  },
  {
    route: '/foundations-organisms',
    title: 'Organisms',
    component: OrganismPatterns,
    group: 'foundations',
  },
  {
    route: '/components-buttons',
    title: 'Buttons',
    component: ButtonPatterns,
    group: 'components',
  },
  {
    route: '/components-dialogs',
    title: 'Dialogs',
    component: DialogPatterns,
    group: 'components',
  },
  {
    route: '/components-forms',
    title: 'Forms',
    component: FormPatterns,
    group: 'components',
  },
  {
    route: '/components-panel',
    title: 'Panel',
    component: PanelPatterns,
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
