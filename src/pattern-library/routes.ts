import type { FunctionComponent } from 'preact';

import ColorsPage from './components/patterns/ColorsPage';
import GettingStartedPage from './components/patterns/GettingStartedPage';
import StylingComponentsPage from './components/patterns/StylingComponentsPage';
import UsingComponentsPage from './components/patterns/UsingComponentsPage';
import UtilitiesPage from './components/patterns/UtilitiesPage';
import AspectRatioPage from './components/patterns/data/AspectRatioPage';
import DataTablePage from './components/patterns/data/DataTablePage';
import IconsPage from './components/patterns/data/IconsPage';
import ScrollBoxPage from './components/patterns/data/ScrollBoxPage';
import TablePage from './components/patterns/data/TablePage';
import ThumbnailPage from './components/patterns/data/ThumbnailPage';
import CalloutPage from './components/patterns/feedback/CalloutPage';
import DialogPage from './components/patterns/feedback/DialogPage';
import PopoverPage from './components/patterns/feedback/PopoverPage';
import SpinnerPage from './components/patterns/feedback/SpinnerPage';
import ToastMessagesPage from './components/patterns/feedback/ToastMessagesPage';
import UseClickAwayPage from './components/patterns/hooks/UseClickAwayPage';
import ButtonsPage from './components/patterns/input/ButtonPage';
import CheckboxPage from './components/patterns/input/CheckboxPage';
import CloseButtonPage from './components/patterns/input/CloseButtonPage';
import InputGroupPage from './components/patterns/input/InputGroupPage';
import InputPage from './components/patterns/input/InputPage';
import OptionButtonPage from './components/patterns/input/OptionButtonPage';
import RadioGroupPage from './components/patterns/input/RadioGroupPage';
import SelectPage from './components/patterns/input/SelectPage';
import TextareaPage from './components/patterns/input/TextareaPage';
import CardPage from './components/patterns/layout/CardPage';
import OverlayPage from './components/patterns/layout/OverlayPage';
import PanelPage from './components/patterns/layout/PanelPage';
import LinkButtonPage from './components/patterns/navigation/LinkButtonPage';
import LinkPage from './components/patterns/navigation/LinkPage';
import PaginationPage from './components/patterns/navigation/PaginationPage';
import PointerButtonPage from './components/patterns/navigation/PointerButtonPage';
import TabPage from './components/patterns/navigation/TabPage';
import SliderPage from './components/patterns/transition/SliderPage';
import LazyPage from './components/patterns/utilities/LazyPage';

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
  | 'hooks'
  | 'utilities'
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
    title: 'Styling components',
    group: 'foundations',
    component: StylingComponentsPage,
    route: '/styling-components',
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
    title: 'Callout',
    group: 'feedback',
    component: CalloutPage,
    route: '/feedback-callout',
  },
  {
    title: 'Dialogs',
    group: 'feedback',
    component: DialogPage,
    route: '/feedback-dialog',
  },
  {
    title: 'Popover',
    group: 'feedback',
    component: PopoverPage,
    route: '/feedback-popover',
  },
  {
    title: 'Spinner',
    group: 'feedback',
    component: SpinnerPage,
    route: '/feedback-spinner',
  },
  {
    title: 'ToastMessages',
    group: 'feedback',
    component: ToastMessagesPage,
    route: '/feedback-toast-messages',
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
    title: 'CloseButton',
    group: 'input',
    component: CloseButtonPage,
    route: '/input-closebutton',
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
    title: 'OptionButton',
    group: 'input',
    component: OptionButtonPage,
    route: '/input-option-button',
  },
  {
    title: 'RadioGroup',
    group: 'input',
    component: RadioGroupPage,
    route: '/input-radio-group',
  },
  {
    title: 'Selects',
    group: 'input',
    component: SelectPage,
    route: '/input-select',
  },
  {
    title: 'Textarea',
    group: 'input',
    component: TextareaPage,
    route: '/input-textarea',
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
    title: 'Pagination',
    group: 'navigation',
    component: PaginationPage,
    route: '/navigation-pagination',
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
    title: 'useClickAway',
    group: 'hooks',
    component: UseClickAwayPage,
    route: '/hooks-use-click-away',
  },
  {
    title: 'lazy',
    group: 'utilities',
    component: LazyPage,
    route: '/utilities-lazy',
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
