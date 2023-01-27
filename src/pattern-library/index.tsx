// Entry point for extending the pattern library
import { render } from 'preact';
// Enable preact debug checks
import 'preact/debug';

import { registerIcons } from '../';
import type { CustomPlaygroundRoute } from './routes';

import PlaygroundApp from './components/PlaygroundApp';
import iconSet from './icons';

export type PlaygroundAppProps = {
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
};

export type PatternLibraryAppOptions = {
  /**
   * Icons, additional to default pattern-library icons, to register for use in
   * patterns/components in the pattern library.
   *
   * @deprecated - Use individual icon components instead
   */
  icons?: Record<string, string>;
} & PlaygroundAppProps;

/**
 * Render the pattern-library preact app
 */
export function startApp({
  icons = {},

  ...componentProps
} = {}) {
  const allIcons = { ...iconSet, ...icons };
  registerIcons(allIcons);
  const container = document.querySelector('#app');
  render(<PlaygroundApp {...componentProps} />, container as Element);
}
