import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';

import TableFoot from '../TableFoot';

describe('TableFoot', () => {
  // Content function for shared presentational test does not wrap with context
  // This is to ensure the component functions as expected without context
  const contentFn = (Component, props = {}) => {
    return mount(
      <table>
        <Component {...props}>
          <tr>
            <td>Cell content</td>
          </tr>
        </Component>
      </table>
    );
  };

  testPresentationalComponent(TableFoot, {
    createContent: contentFn,
    elementSelector: '[data-component="TableFoot"]',
  });
});
