// Entry point for extending the pattern library
import { render } from 'preact';
// Enable preact debug checks
import 'preact/debug';

import { registerIcons } from '../';

import PlaygroundApp from './components/PlaygroundApp';
import type { CustomPlaygroundRoute } from './routes';
import iconSet from './icons';

export type PatternLibraryAppOptions = {
  /**
   * The path relative to web root where the pattern library is served. Defaults
   * to `/ui-playground`.
   */
  baseURL?: string;

  /**
   * Application-specific routes to add to this pattern library in
   * addition to the shared/common routes
   */
  extraRoutes?: CustomPlaygroundRoute[];

  /**
   * Optional title to use as a header above any custom routes shown in the
   * navigation menu. Default title is "Playground".
   */
  extraRoutesTitle?: string;

  /**
   * Icons, additional to default pattern-library icons, to register for use in
   * patterns/components in the pattern library.
   *
   * @deprecated - Use individual icon components instead
   */
  icons?: Record<string, string>;
};

/**
 * Render the pattern-library preact app
 *
 * @param {PatternLibraryAppOptions} options
 */
export function startApp({
  baseURL = '',
  extraRoutes = [],
  extraRoutesTitle = 'Playground',
  icons = {},
} = {}) {
  const allIcons = { ...iconSet, ...icons };
  registerIcons(allIcons);
  const container = document.querySelector('#app');
  render(
    <PlaygroundApp
      baseURL={baseURL}
      extraRoutes={extraRoutes}
      extraRoutesTitle={extraRoutesTitle}
    />,
    container as Element
  );
}
