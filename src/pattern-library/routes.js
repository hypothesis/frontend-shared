import LibraryHome from './components/LibraryHome';

import GettingStartedPage from './components/patterns/GettingStartedPage';
import ColorsPage from './components/patterns/ColorsPage';
import CustomizingComponentsPage from './components/patterns/CustomizingComponentsPage';
import UsingComponentsPage from './components/patterns/UsingComponentsPage';
import UtilitiesPage from './components/patterns/UtilitiesPage';

import AspectRatioPage from './components/patterns/data/AspectRatioPage';
import DataTablePage from './components/patterns/data/DataTablePage';
import IconsPage from './components/patterns/data/IconsPage';
import ScrollBoxPage from './components/patterns/data/ScrollBoxPage';
import TablePage from './components/patterns/data/TablePage';
import ThumbnailPage from './components/patterns/data/ThumbnailPage';

import DialogPage from './components/patterns/feedback/DialogPage';
import SpinnerPage from './components/patterns/feedback/SpinnerPage';

import ButtonsPage from './components/patterns/input/ButtonPage';
import CheckboxPage from './components/patterns/input/CheckboxPage';
import InputPage from './components/patterns/input/InputPage';
import InputGroupPage from './components/patterns/input/InputGroupPage';

import CardPage from './components/patterns/layout/CardPage';
import PanelPage from './components/patterns/layout/PanelPage';
import OverlayPage from './components/patterns/layout/OverlayPage';

import LinkPage from './components/patterns/navigation/LinkPage';
import LinkButtonPage from './components/patterns/navigation/LinkButtonPage';

// Legacy pattern-library pages

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
 * @typedef {keyof componentGroups|'home'|'foundations'|'components'} PlaygroundRouteGroup
 *
 * @typedef PlaygroundRoute - Route "handler" that provides a component (function)
 *   that should be rendered for the indicated route
 * @prop {RegExp|string} [route] - Pattern or string path relative to
 *   `baseURL`, e.g. '/data-my-component'
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
    title: 'AspectRatio',
    group: 'data',
    component: AspectRatioPage,
    route: '/data-aspectratio',
  },
  {
    title: 'DataTable',
    group: 'data',
    component: DataTablePage,
    route: '/data-datatable',
  },
  { title: 'Icons', group: 'data', component: IconsPage, route: '/data-icons' },
  {
    title: 'ScrollBox',
    group: 'data',
    component: ScrollBoxPage,
    route: '/data-scrollbox',
  },
  {
    title: 'Table',
    group: 'data',
    component: TablePage,
    route: '/data-table',
  },
  {
    title: 'Thumbnail',
    group: 'data',
    component: ThumbnailPage,
    route: '/data-thumbnail',
  },
  {
    title: 'Dialog',
    group: 'feedback',
    component: DialogPage,
    route: '/feedback-dialog',
  },
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
    title: 'Checkbox',
    group: 'input',
    component: CheckboxPage,
    route: '/input-checkbox',
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
  {
    title: 'Card',
    group: 'layout',
    component: CardPage,
    route: '/layout-card',
  },
  {
    title: 'Panel',
    group: 'layout',
    component: PanelPage,
    route: '/layout-panel',
  },
  {
    title: 'Overlay',
    group: 'layout',
    component: OverlayPage,
    route: '/layout-overlay',
  },
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
    route: '/navigation-linkbutton',
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
