// Entry point for extending the pattern library
import { render } from 'preact';

import { registerIcons } from '../';
import iconSet from './icons';

import PlaygroundApp from './components/PlaygroundApp';

/**
 * @typedef {import("./components/PlaygroundApp").PlaygroundRoute} PlaygroundRoute
 * @typedef {import("../components/SvgIcon").IconMap} IconMap
 */

/**
 * @typedef PatternLibraryAppOptions
 * @prop {string} [baseURL] - The path relative to web root where the pattern
 *   library is served. Defaults to `/ui-playground`.
 * @prop {PlaygroundRoute[]} [extraRoutes] - Local-/application-specific routes
 *   to add to this pattern library in addition to the shared/common routes
 * @prop {IconMap} [icons] - Icons, additional to default pattern-library icons,
 *   to register for use in patterns/components in the pattern library
 */

/**
 * Render the pattern-library preact container
 *
 * @param {PatternLibraryAppOptions} options
 */
export function startApp({
  baseURL = '/ui-playground',
  extraRoutes = [],
  icons = {},
} = {}) {
  const allIcons = { ...iconSet, ...icons };
  registerIcons(allIcons);
  const container = document.querySelector('#app');
  render(
    <PlaygroundApp baseURL={baseURL} extraRoutes={extraRoutes} />,
    /** @type Element */ (container)
  );
}
