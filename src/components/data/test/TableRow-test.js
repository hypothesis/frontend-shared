import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import TableContext from '../TableContext';
import TableRow from '../TableRow';
import TableSectionContext from '../TableSectionContext';

describe('TableRow', () => {
  let tableContextValue;
  let sectionContextValue;

  const createComponent = (props = {}) => {
    return mount(
      <TableContext.Provider value={tableContextValue}>
        <table>
          <TableSectionContext.Provider value={sectionContextValue}>
            <TableRow {...props}>
              <td>Cell content</td>
            </TableRow>
          </TableSectionContext.Provider>
        </table>
      </TableContext.Provider>,
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
      </table>,
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
    const selectedWrapper = createComponent({ selected: true });
    const unselectedWrapper = createComponent({ selected: false });

    assert.isTrue(
      selectedWrapper.find('[data-component="TableRow"]').prop('aria-selected'),
    );
    assert.isFalse(
      unselectedWrapper
        .find('[data-component="TableRow"]')
        .prop('aria-selected'),
    );
  });

  [true, false].forEach(flag => {
    it('is set as striped', () => {
      tableContextValue.striped = flag;
      const wrapper = createComponent();
      assert.equal(
        wrapper.find('[data-component="TableRow"]').prop('data-striped'),
        flag,
      );
    });

    it('is set as grid', () => {
      tableContextValue.grid = flag;
      const wrapper = createComponent();
      assert.equal(
        wrapper.find('[data-component="TableRow"]').prop('data-grid'),
        flag,
      );
    });
  });

  context('when in a table header', () => {
    beforeEach(() => {
      sectionContextValue = { section: 'head' };
    });

    it('renders in a head context', () => {
      const wrapper = createComponent();
      assert.equal(
        wrapper.find('[data-component="TableRow"]').prop('data-section'),
        'head',
      );
    });
  });

  context('when in a table body', () => {
    beforeEach(() => {
      sectionContextValue = { section: 'body' };
    });

    it('renders in a head context', () => {
      const wrapper = createComponent();
      assert.equal(
        wrapper.find('[data-component="TableRow"]').prop('data-section'),
        'body',
      );
    });
  });
});
