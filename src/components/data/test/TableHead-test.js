import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import TableContext from '../TableContext';
import TableHead from '../TableHead';

describe('TableHead', () => {
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

  testPresentationalComponent(TableHead, {
    createContent: contentFn,
    elementSelector: '[data-component="TableHead"]',
  });

  context('within a table with a sticky header', () => {
    beforeEach(() => {
      tableContextValue = { stickyHeader: true };
    });

    it('adds interactive cursor styling', () => {
      const wrapper = createComponent(TableHead);
      assert.isTrue(
        wrapper.find('[data-component="TableHead"]').hasClass('sticky')
      );
    });
  });
});
