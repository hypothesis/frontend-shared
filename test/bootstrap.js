// Expose the sinon assertions.
sinon.assert.expose(assert, { prefix: null });

// Configure Enzyme for UI tests.
import 'preact/debug';

import { configure } from 'enzyme';
import { Adapter } from 'enzyme-adapter-preact-pure';

configure({ adapter: new Adapter() });

// Register a single (fake) icon, `hyp-test` for test-use convenience
// No other icons are registered; components are responsible for registering
// their own needed icons
import { registerIcons } from '../src/components/SvgIcon';
const testIcons = {
  'hyp-test': require('../images/icons/logo.svg'),
};
registerIcons(testIcons);

// Ensure that uncaught exceptions between tests result in the tests failing.
// This works around an issue with mocha / karma-mocha, see
// https://github.com/hypothesis/client/issues/2249.
let pendingError = null;
let pendingErrorNotice = null;

window.addEventListener('error', event => {
  pendingError = event.error;
  pendingErrorNotice = 'An uncaught exception was thrown between tests';
});
window.addEventListener('unhandledrejection', event => {
  pendingError = event.reason;
  pendingErrorNotice = 'An uncaught promise rejection occurred between tests';
});

afterEach(() => {
  if (pendingError) {
    console.error(pendingErrorNotice);
    throw pendingError;
  }
});
