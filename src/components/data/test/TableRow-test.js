import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';

import TableRow from '../TableRow';
import TableContext from '../TableContext';
import TableSectionContext from '../TableSectionContext';

describe('TableRow', () => {
  let tableContextValue;
  let sectionContextValue;

  const createComponent = (Component, props = {}) => {
    return mount(
      <TableContext.Provider value={tableContextValue}>
        <table>
          <TableSectionContext.Provider value={sectionContextValue}>
            <Component {...props}>
              <td>Cell content</td>
            </Component>
          </TableSectionContext.Provider>
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
          <td>Cell content</td>
        </Component>
      </table>
    );
  };

  beforeEach(() => {
    sectionContextValue = {};
    tableContextValue = {};
  });

  testPresentationalComponent(TableRow, {
    createContent: contentFn,
    elementSelector: '[data-component="TableRow"]',
  });

  it('sets aria-selected when selected', () => {
    const selectedWrapper = createComponent(TableRow, { selected: true });
    const unselectedWrapper = createComponent(TableRow, { selected: false });

    assert.isTrue(
      selectedWrapper.find('[data-component="TableRow"]').prop('aria-selected')
    );
    assert.isFalse(
      unselectedWrapper
        .find('[data-component="TableRow"]')
        .prop('aria-selected')
    );
  });

  context('when in a table header', () => {
    beforeEach(() => {
      sectionContextValue = { section: 'head' };
    });

    it('renders in a head context', () => {
      const wrapper = createComponent(TableRow);
      assert.equal(
        wrapper.find('[data-component="TableRow"]').prop('data-section'),
        'head'
      );
    });
  });

  context('when in a table body', () => {
    beforeEach(() => {
      sectionContextValue = { section: 'body' };
    });

    it('renders in a head context', () => {
      const wrapper = createComponent(TableRow);
      assert.equal(
        wrapper.find('[data-component="TableRow"]').prop('data-section'),
        'body'
      );
    });
  });
});
