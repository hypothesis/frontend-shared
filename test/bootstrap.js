// Expose the sinon assertions.
sinon.assert.expose(assert, { prefix: null });

// Configure Enzyme for UI tests.
import 'preact/debug';

import { configure } from 'enzyme';
import { Adapter } from 'enzyme-adapter-preact-pure';

configure({ adapter: new Adapter() });

// Suppress warning related with @babel/plugin-transform-react-jsx-source
// See https://github.com/hypothesis/frontend-shared/issues/810
const regularWarn = console.warn;
console.warn = function (message, ...optionalParams) {
  if (
    !message?.startsWith(
      'Add @babel/plugin-transform-react-jsx-source to get a more detailed component stack'
    )
  ) {
    regularWarn(message, ...optionalParams);
  }
};

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
