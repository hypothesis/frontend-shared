import { mount } from '@hypothesis/frontend-testing';

import { testPresentationalComponent } from '../../test/common-tests';
import TableCell from '../TableCell';
import TableContext from '../TableContext';
import TableSectionContext from '../TableSectionContext';

describe('TableCell', () => {
  let tableContextValue;
  let contextValue;

  const createComponent = (props = {}) => {
    return mount(
      <TableContext.Provider value={tableContextValue}>
        <table>
          <tbody>
            <TableSectionContext.Provider value={contextValue}>
              <tr>
                <TableCell {...props}>{props.children ?? 'Content'}</TableCell>
              </tr>
            </TableSectionContext.Provider>
          </tbody>
        </table>
      </TableContext.Provider>,
    );
  };

  // Content function for shared presentational test does not wrap with context
  // This is to ensure the component functions as expected without context
  const contentFn = (Component, props = {}) => {
    return mount(
      <table>
        <tbody>
          <tr>
            <Component {...props} />
          </tr>
        </tbody>
      </table>,
    );
  };

  beforeEach(() => {
    tableContextValue = {};
    contextValue = {};
  });

  testPresentationalComponent(TableCell, {
    createContent: contentFn,
    elementSelector: '[data-component="TableCell"]',
  });

  [true, false].forEach(flag => {
    it('is set as grid', () => {
      tableContextValue.grid = flag;
      const wrapper = createComponent();
      assert.equal(
        wrapper.find('[data-component="TableCell"]').prop('data-grid'),
        flag,
      );
    });

    it('is set as borderless', () => {
      tableContextValue.borderless = flag;
      const wrapper = createComponent();
      assert.equal(
        wrapper.find('[data-component="TableCell"]').prop('data-borderless'),
        flag,
      );
    });
  });

  context('when in a table header', () => {
    beforeEach(() => {
      contextValue = { section: 'head' };
    });

    it('renders as a TH element', () => {
      const wrapper = createComponent();
      assert.isTrue(wrapper.find('th').exists());
    });

    it('adds column scope to the TH', () => {
      const wrapper = createComponent();
      assert.equal(wrapper.find('th').prop('scope'), 'col');
    });
  });

  context('when in a table body', () => {
    beforeEach(() => {
      contextValue = { section: 'body' };
    });

    it('renders as a TD element', () => {
      const wrapper = createComponent();
      assert.isTrue(wrapper.find('td').exists());
    });
  });
});
