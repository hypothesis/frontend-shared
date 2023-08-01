import { mount } from 'enzyme';

import { testPresentationalComponent } from '../../test/common-tests';
import TableCell from '../TableCell';
import TableSectionContext from '../TableSectionContext';

describe('TableCell', () => {
  let contextValue;

  const createComponent = (Component, props = {}) => {
    return mount(
      <table>
        <TableSectionContext.Provider value={contextValue}>
          <tr>
            <Component {...props} />
          </tr>
        </TableSectionContext.Provider>
      </table>,
    );
  };

  // Content function for shared presentational test does not wrap with context
  // This is to ensure the component functions as expected without context
  const contentFn = (Component, props = {}) => {
    return mount(
      <table>
        <tr>
          <Component {...props} />
        </tr>
      </table>,
    );
  };

  beforeEach(() => {
    contextValue = {};
  });

  testPresentationalComponent(TableCell, {
    createContent: contentFn,
    elementSelector: '[data-component="TableCell"]',
  });

  context('when in a table header', () => {
    beforeEach(() => {
      contextValue = { section: 'head' };
    });

    it('renders as a TH element', () => {
      const wrapper = createComponent(TableCell, { children: 'Content' });
      assert.isTrue(wrapper.find('th').exists());
    });

    it('adds column scope to the TH', () => {
      const wrapper = createComponent(TableCell, { children: 'Content' });
      assert.equal(wrapper.find('th').prop('scope'), 'col');
    });
  });

  context('when in a table body', () => {
    beforeEach(() => {
      contextValue = { section: 'body' };
    });

    it('renders as a TD element', () => {
      const wrapper = createComponent(TableCell, { children: 'Content' });
      assert.isTrue(wrapper.find('td').exists());
    });
  });
});
