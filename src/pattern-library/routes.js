import LibraryHome from './components/LibraryHome';

import GettingStartedPage from './components/patterns/GettingStartedPage';
import ColorsPage from './components/patterns/ColorsPage';
import CustomizingComponentsPage from './components/patterns/CustomizingComponentsPage';
import UsingComponentsPage from './components/patterns/UsingComponentsPage';
import UtilitiesPage from './components/patterns/UtilitiesPage';

import IconsPage from './components/patterns/data/IconsPage';
import ScrollBoxPage from './components/patterns/data/ScrollBoxPage';

import SpinnerPage from './components/patterns/feedback/SpinnerPage';

import ButtonsPage from './components/patterns/input/ButtonPage';
import IconButtonPage from './components/patterns/input/IconButtonPage';
import InputPage from './components/patterns/input/InputPage';
import InputGroupPage from './components/patterns/input/InputGroupPage';

import CardPage from './components/patterns/layout/CardPage';
import PanelPage from './components/patterns/layout/PanelPage';
import OverlayPage from './components/patterns/layout/OverlayPage';

import LinkPage from './components/patterns/navigation/LinkPage';
import LinkButtonPage from './components/patterns/navigation/LinkButtonPage';

// Legacy pattern-library pages

import FormPatterns from './components/patterns/FormPatterns';
import TablePatterns from './components/patterns/TablePatterns';
import ThumbnailPatterns from './components/patterns/ThumbnailPatterns';

import ButtonComponents from './components/patterns/ButtonComponents';
import ContainerComponents from './components/patterns/ContainerComponents';
import DialogComponents from './components/patterns/DialogComponents';
import FormComponents from './components/patterns/FormComponents';
import IconComponents from './components/patterns/IconComponents';
import LinkComponents from './components/patterns/LinkComponents';
import PanelComponents from './components/patterns/PanelComponents';
import SpinnerComponents from './components/patterns/SpinnerComponents';
import TableComponents from './components/patterns/TableComponents';
import ThumbnailComponents from './components/patterns/ThumbnailComponents';

export const componentGroups = {
  data: 'Data Display',
  feedback: 'Feedback',
  input: 'Input',
  layout: 'Layout',
  navigation: 'Navigation',
};

/**
 * @typedef {keyof componentGroups|'home'|'foundations'|'patterns'|'components'} PlaygroundRouteGroup
 *
 * @typedef PlaygroundRoute - Route "handler" that provides a component (function)
 *   that should be rendered for the indicated route
 * @prop {RegExp|string} [route] - Pattern or string path relative to
 *   `baseURL`, e.g. '/my-patterns'
 * @prop {string} title
 * @prop {import("preact").FunctionComponent<{}>} [component]
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
    title: 'Getting started',
    group: 'foundations',
    component: GettingStartedPage,
    route: '/getting-started',
  },
  {
    title: 'Using components',
    group: 'foundations',
    component: UsingComponentsPage,
    route: '/using-components',
  },
  {
    route: '/foundations-colors',
    title: 'Colors',
    component: ColorsPage,
    group: 'foundations',
  },

  {
    route: '/foundations-util',
    title: 'Utilities',
    component: UtilitiesPage,
    group: 'foundations',
  },
  {
    title: 'Customizing components',
    group: 'foundations',
    component: CustomizingComponentsPage,
    route: '/customizing-components',
  },
  {
    route: '/patterns-forms',
    title: 'Forms',
    component: FormPatterns,
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
    route: '/foundations-icons',
    title: 'Icons',
    component: IconComponents,
    group: 'components',
  },
  {
    route: '/components-links',
    title: 'Links',
    component: LinkComponents,
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
  {
    title: 'ScrollBox',
    group: 'data',
    component: ScrollBoxPage,
    route: '/data-scrollbox',
  },
  { title: 'Icons', group: 'data', component: IconsPage, route: '/data-icons' },
  { title: 'Table', group: 'data' },
  { title: 'Dialog', group: 'feedback' },
  {
    title: 'Spinner',
    group: 'feedback',
    component: SpinnerPage,
    route: '/feedback-spinner',
  },
  {
    title: 'Button',
    group: 'input',
    component: ButtonsPage,
    route: '/input-button',
  },
  {
    title: 'IconButton',
    group: 'input',
    component: IconButtonPage,
    route: '/input-iconbutton',
  },
  {
    title: 'Panel',
    group: 'layout',
    component: PanelPage,
    route: '/layout-panel',
  },
  {
    title: 'Card',
    group: 'layout',
    component: CardPage,
    route: '/layout-card',
  },
  {
    title: 'Overlay',
    group: 'layout',
    component: OverlayPage,
    route: '/layout-overlay',
  },
  {
    title: 'Input',
    group: 'input',
    component: InputPage,
    route: '/input-input',
  },
  {
    title: 'InputGroup',
    group: 'input',
    component: InputGroupPage,
    route: '/input-input-group',
  },
  { title: 'Checkbox', group: 'input' },
  {
    title: 'Link',
    group: 'navigation',
    route: '/navigation-link',
    component: LinkPage,
  },
  {
    title: 'LinkButton',
    group: 'navigation',
    component: LinkButtonPage,
    route: '/input-linkbutton',
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
