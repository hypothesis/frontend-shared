import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import TableBody from '../TableBody';
import TableContext from '../TableContext';

describe('TableBody', () => {
  let tableContextValue;

  const createComponent = (Component, props = {}) => {
    return mount(
      <TableContext.Provider value={tableContextValue}>
        <table>
          <Component {...props}>
            <tr>
              <td>Cell content</td>
            </tr>
          </Component>
        </table>
      </TableContext.Provider>
    );
  };

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

  beforeEach(() => {
    tableContextValue = {};
  });

  testPresentationalComponent(TableBody, {
    createContent: contentFn,
    elementSelector: '[data-component="TableBody"]',
  });

  context('within an interactive table', () => {
    beforeEach(() => {
      tableContextValue = { interactive: true };
    });

    it('adds interactive cursor styling', () => {
      const wrapper = createComponent(TableBody);
      assert.isTrue(
        wrapper.find('[data-component="TableBody"]').hasClass('cursor-pointer')
      );
    });
  });
});
