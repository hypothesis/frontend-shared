import type { FunctionComponent } from 'preact';

import ColorsPage from './components/patterns/ColorsPage';
import CustomizingComponentsPage from './components/patterns/CustomizingComponentsPage';
import GettingStartedPage from './components/patterns/GettingStartedPage';
import UsingComponentsPage from './components/patterns/UsingComponentsPage';
import UtilitiesPage from './components/patterns/UtilitiesPage';
import AspectRatioPage from './components/patterns/data/AspectRatioPage';
import DataTablePage from './components/patterns/data/DataTablePage';
import IconsPage from './components/patterns/data/IconsPage';
import ScrollBoxPage from './components/patterns/data/ScrollBoxPage';
import TablePage from './components/patterns/data/TablePage';
import ThumbnailPage from './components/patterns/data/ThumbnailPage';
import DialogPage from './components/patterns/feedback/DialogPage';
import ModalPage from './components/patterns/feedback/ModalPage';
import SpinnerPage from './components/patterns/feedback/SpinnerPage';
import ButtonsPage from './components/patterns/input/ButtonPage';
import CheckboxPage from './components/patterns/input/CheckboxPage';
import InputGroupPage from './components/patterns/input/InputGroupPage';
import InputPage from './components/patterns/input/InputPage';
import SelectPage from './components/patterns/input/SelectPage';
import CardPage from './components/patterns/layout/CardPage';
import OverlayPage from './components/patterns/layout/OverlayPage';
import PanelPage from './components/patterns/layout/PanelPage';
import LinkButtonPage from './components/patterns/navigation/LinkButtonPage';
import LinkPage from './components/patterns/navigation/LinkPage';
import PointerButtonPage from './components/patterns/navigation/PointerButtonPage';
import TabPage from './components/patterns/navigation/TabPage';
import SharedAnnotationsPage from './components/patterns/prototype/SharedAnnotationsPage';
import SliderPage from './components/patterns/transition/SliderPage';

export const componentGroups = {
  data: 'Data Display',
  feedback: 'Feedback',
  input: 'Input',
  layout: 'Layout',
  navigation: 'Navigation',
  transition: 'Transitions',
} as const;

Object.freeze(componentGroups);

export type PlaygroundRouteGroup =
  | keyof typeof componentGroups
  | 'home'
  | 'foundations'
  | 'components'
  | 'prototype'
  | 'custom';

/**
 * Route "handler" that provides a component (function) that should be rendered
 * for the indicated route
 */
export type PlaygroundRoute = {
  /**
   * Pattern or string path relative to `baseURL`, e.g. '/data-my-component'. If
   * not provided, a placeholder entry for this route will be added to the
   * navigation, with no link.
   */
  route?: string;
  title: string;
  component?: FunctionComponent;
  group: PlaygroundRouteGroup;
};

export type CustomPlaygroundRoute = Omit<PlaygroundRoute, 'group'>;

const routes: PlaygroundRoute[] = [
  {
    title: 'Getting started',
    group: 'foundations',
    component: GettingStartedPage,
    route: '/',
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
    title: 'Dialogs',
    group: 'feedback',
    component: DialogPage,
    route: '/feedback-dialog',
  },
  {
    title: 'Modal',
    group: 'feedback',
    component: ModalPage,
    route: '/feedback-modal',
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
    title: 'Select',
    group: 'input',
    component: SelectPage,
    route: '/input-select',
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
    title: 'PointerButton',
    group: 'navigation',
    component: PointerButtonPage,
    route: '/navigation-pointerbutton',
  },
  {
    title: 'Tabs',
    group: 'navigation',
    component: TabPage,
    route: '/navigation-tab',
  },
  {
    title: 'Slider',
    group: 'transition',
    component: SliderPage,
    route: '/transitions-slider',
  },
  {
    title: 'Shared Annotations',
    group: 'prototype',
    component: SharedAnnotationsPage,
    route: '/shared-annotations-ui',
  },
];

/**
 * Retrieve all routes or the subset in group `group`.
 */
export function getRoutes(group?: PlaygroundRouteGroup) {
  if (group) {
    return routes.filter(route => route.group === group);
  }
  return routes;
}
