import PlaygroundHome from './components/PlaygroundHome';

import ColorFoundations from './components/patterns/ColorFoundations';
import LayoutFoundations from './components/patterns/LayoutFoundations';

import MoleculePatterns from './components/patterns/MoleculePatterns';
import OrganismPatterns from './components/patterns/OrganismPatterns';

import ButtonComponents from './components/patterns/ButtonComponents';
import DialogComponents from './components/patterns/DialogComponents';
import FormComponents from './components/patterns/FormComponents';
import PanelComponents from './components/patterns/PanelComponents';

/**
 * @typedef {'home'|'foundations'|'patterns'|'components'} PlaygroundRouteGroup
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
    component: ColorFoundations,
    group: 'foundations',
  },
  {
    route: '/foundations-layout',
    title: 'Layout',
    component: LayoutFoundations,
    group: 'foundations',
  },
  {
    route: '/patterns-molecules',
    title: 'Molecules',
    component: MoleculePatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-organisms',
    title: 'Organisms',
    component: OrganismPatterns,
    group: 'patterns',
  },
  {
    route: '/components-buttons',
    title: 'Buttons',
    component: ButtonComponents,
    group: 'components',
  },
  {
    route: '/components-dialogs',
    title: 'Dialogs',
    component: DialogComponents,
    group: 'components',
  },
  {
    route: '/components-forms',
    title: 'Forms',
    component: FormComponents,
    group: 'components',
  },
  {
    route: '/components-panel',
    title: 'Panel',
    component: PanelComponents,
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
