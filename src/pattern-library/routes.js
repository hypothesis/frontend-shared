import LibraryHome from './components/LibraryHome';

import ColorFoundations from './components/patterns/ColorFoundations';
import LayoutFoundations from './components/patterns/LayoutFoundations';

import FormPatterns from './components/patterns/FormPatterns';
import ContainerPatterns from './components/patterns/ContainerPatterns';
import LinkPatterns from './components/patterns/LinkPatterns';
import PanelPatterns from './components/patterns/PanelPatterns';
import SpinnerPatterns from './components/patterns/SpinnerPatterns';
import TablePatterns from './components/patterns/TablePatterns';
import ThumbnailPatterns from './components/patterns/ThumbnailPatterns';

import ButtonComponents from './components/patterns/ButtonComponents';
import ContainerComponents from './components/patterns/ContainerComponents';
import DialogComponents from './components/patterns/DialogComponents';
import FormComponents from './components/patterns/FormComponents';
import PanelComponents from './components/patterns/PanelComponents';
import SpinnerComponents from './components/patterns/SpinnerComponents';
import TableComponents from './components/patterns/TableComponents';
import ThumbnailComponents from './components/patterns/ThumbnailComponents';

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
    component: LibraryHome,
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
    route: '/patterns-containers',
    title: 'Containers',
    component: ContainerPatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-forms',
    title: 'Forms',
    component: FormPatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-links',
    title: 'Links',
    component: LinkPatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-panels',
    title: 'Panels',
    component: PanelPatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-spinners',
    title: 'Spinners',
    component: SpinnerPatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-tables',
    title: 'Tables',
    component: TablePatterns,
    group: 'patterns',
  },
  {
    route: '/patterns-thumbnails',
    title: 'Thumbnails',
    component: ThumbnailPatterns,
    group: 'patterns',
  },
  {
    route: '/components-buttons',
    title: 'Buttons',
    component: ButtonComponents,
    group: 'components',
  },
  {
    route: '/components-containers',
    title: 'Containers',
    component: ContainerComponents,
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
  {
    route: '/components-spinner',
    title: 'Spinner',
    component: SpinnerComponents,
    group: 'components',
  },
  {
    route: '/components-table',
    title: 'Table',
    component: TableComponents,
    group: 'components',
  },
  {
    route: '/components-thumbnail',
    title: 'Thumbnail',
    component: ThumbnailComponents,
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
