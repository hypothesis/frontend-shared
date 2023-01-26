// Entry point for extending the pattern library
import { render } from 'preact';
// Enable preact debug checks
import 'preact/debug';

import { registerIcons } from '../';
import iconSet from './icons';

import PlaygroundApp from './components/PlaygroundApp';

/**
 * @typedef {import("./components/PlaygroundApp").CustomPlaygroundRoute} CustomPlaygroundRoute
 */

/**
 * @typedef PatternLibraryAppOptions
 * @prop {string} [baseURL] - The path relative to web root where the pattern
 *   library is served. Defaults to `/ui-playground`.
 * @prop {CustomPlaygroundRoute[]} [extraRoutes] -
 *   Local-/application-specific routes to add to this pattern library in
 *   addition to the shared/common routes
 * @prop {string} [extraRoutesTitle] - Optional title to use as a header above
 *   any custom routes shown in the navigation menu
 * @prop {Record<string, string>} [icons] - Icons, additional to default
 *   pattern-library icons, to register for use in patterns/components in the
 *   pattern library
 */

/**
 * Render the pattern-library preact container
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
    /** @type Element */ (container)
  );
}
