import { mount } from 'enzyme';
import { useState } from 'preact/hooks';

import { testCompositeComponent } from '../../test/common-tests';
import DataTable from '../DataTable';
import Scroll from '../Scroll';

describe('DataTable', () => {
  let fakeRows;
  let fakeColumns;

  const createComponent = (Component, props = {}) => {
    return mount(
      <Component columns={fakeColumns} rows={fakeRows} {...props} />
    );
  };

  beforeEach(() => {
    fakeColumns = [
      { field: 'name', label: 'Name', classes: 'w-[50%]' },
      { field: 'color', label: <i>Color</i> },
      { field: 'consistency', label: 'Consistency' },
    ];

    fakeRows = [
      {
        name: 'Chocolate Cake',
        color: 'brown',
        consistency: 'crumby',
        delicious: true,
      },
      {
        name: 'Croissant',
        color: 'golden',
        consistency: 'flaky',
        delicious: true,
      },
      {
        name: 'Crème caramel',
        color: 'golden',
        consistency: 'gooey',
        delicious: true,
      },
      { name: 'Flan', color: 'taupe', consistency: 'spongy', delicious: false },
      {
        name: 'Tiramisu',
        color: 'brown and cream',
        consistency: 'creamy and cakey',
        delicious: true,
      },
    ];
  });

  it('sets appropriate table attributes', () => {
    const wrapper = createComponent(DataTable);
    const interactiveWrapper = createComponent(DataTable, {
      onSelectRow: sinon.stub(),
    });
    const outer = wrapper.find('Table');

    assert.equal(outer.prop('role'), 'grid');
    assert.isTrue(outer.prop('stickyHeader'));
    assert.isFalse(outer.prop('interactive'));

    assert.isTrue(interactiveWrapper.find('Table').props().interactive);
    assert.isTrue(
      interactiveWrapper.find('[data-component="TableFoot"]').exists()
    );
  });

  describe('table columns', () => {
    it('renders a column header for each column', () => {
      const wrapper = createComponent(DataTable);
      const tableHead = wrapper.find('TableHead');

      assert.equal(tableHead.find('th').length, 3);
      assert.equal(tableHead.find('th').at(0).text(), 'Name');
      assert.equal(tableHead.find('th').at(1).text(), 'Color');
      assert.equal(tableHead.find('th').at(2).text(), 'Consistency');
    });

    it('applies extra column classes', () => {
      const wrapper = createComponent(DataTable);
      const tableHead = wrapper.find('TableHead');

      assert.isTrue(tableHead.find('th').at(0).hasClass('w-[50%]'));
    });
  });

  describe('table rows', () => {
    it('renders one table row per row provided', () => {
      const wrapper = createComponent(DataTable);
      assert.equal(
        wrapper.find('TableBody').find('TableRow').length,
        fakeRows.length
      );
    });

    it('renders fields that are defined by columns', () => {
      const wrapper = createComponent(DataTable);
      const firstRow = wrapper.find('TableBody').find('TableRow').first();

      assert.equal(firstRow.find('td').at(0).text(), 'Chocolate Cake');
      assert.equal(firstRow.find('td').at(1).text(), 'brown');
      assert.equal(firstRow.find('td').at(2).text(), 'crumby');
      // No cell rendered for `delicious` because it is not defined in columns
    });

    it('formats cell content with provided `renderItem` callback', () => {
      const formatCell = sinon.stub().callsFake((row, field) => {
        if (field === 'delicious') {
          return row.delicious ? 'Yep' : 'Nope';
        }
        return row[field];
      });

      const columns = [
        { field: 'name', label: 'Name', classes: 'w-[50%]' },
        { field: 'color', label: <i>Color</i> },
        { field: 'delicious', label: 'Tasty?' },
      ];

      const rows = [fakeRows[3]];

      const wrapper = createComponent(DataTable, {
        renderItem: formatCell,
        rows,
        columns,
      });

      const flanRow = wrapper.find('TableBody').find('TableRow').at(0);
      assert.equal(flanRow.find('td').at(0).text(), 'Flan');
      assert.equal(flanRow.find('td').at(2).text(), 'Nope');

      assert.calledWith(formatCell, rows[0], 'name');
      assert.calledWith(formatCell, rows[0], 'color');
      assert.calledWith(formatCell, rows[0], 'delicious');
      assert.equal(formatCell.callCount, 3);
    });
  });

  describe('interacting with row data', () => {
    ['click', 'focus'].forEach(event => {
      it(`invokes provided onSelectRow callback when a row is ${event}ed`, () => {
        const onSelectRow = sinon.stub();
        const wrapper = createComponent(DataTable, {
          onSelectRow,
        });

        wrapper.find('tbody tr').first().simulate(event);

        assert.calledWith(onSelectRow, fakeRows[0]);
      });
    });

    it('invokes provided `onConfirmRow` callback when row is double-clicked', () => {
      const onConfirmRow = sinon.stub();
      const wrapper = createComponent(DataTable, {
        onConfirmRow,
      });

      wrapper.find('tbody tr').first().simulate('dblclick');

      assert.calledWith(onConfirmRow, fakeRows[0]);
    });

    it('invokes provided `onConfirmRow` callback when `Enter` is pressed on a row', () => {
      const onConfirmRow = sinon.stub();
      const wrapper = createComponent(DataTable, {
        onConfirmRow,
      });

      wrapper.find('tbody tr').first().simulate('keydown', { key: 'Enter' });

      assert.calledWith(onConfirmRow, fakeRows[0]);
    });
  });

  context('when loading', () => {
    it('renders a loading spinner', () => {
      const wrapper = createComponent(DataTable, { loading: true });
      assert.isTrue(wrapper.find('SpinnerSpokesIcon').exists());
    });

    it('does not render any data', () => {
      const wrapper = createComponent(DataTable, { loading: true });
      // One row, which holds the spinner
      assert.equal(wrapper.find('tbody tr').length, 1);
    });

    it('still renders headings', () => {
      const wrapper = createComponent(DataTable, { loading: true });
      assert.equal(wrapper.find('thead tr th').length, 3);
    });

    it('does not render a TableFoot', () => {
      const wrapper = createComponent(DataTable, { loading: true });
      assert.isFalse(wrapper.find('[data-component="TableFoot"]').exists());
    });
  });

  context('when empty', () => {
    it('shows an empty message if provided', () => {
      const wrapper = createComponent(DataTable, {
        emptyMessage: <strong>Nope</strong>,
        rows: [],
      });
      assert.equal(wrapper.find('tbody tr td').at(0).text(), 'Nope');
    });

    it('still renders headings', () => {
      const wrapper = createComponent(DataTable, {
        emptyMessage: <strong>Nope</strong>,
        rows: [],
      });
      assert.equal(wrapper.find('thead tr th').length, 3);
    });

    it('does not render a TableFoot', () => {
      const wrapper = createComponent(DataTable, {
        rows: [],
      });
      assert.isFalse(wrapper.find('[data-component="TableFoot"]').exists());
    });
  });

  context('when in a Scroll context', () => {
    let constrainedContainer;

    function TestTableWithScroll() {
      // Initially select the last data row
      const [selectedRow, setSelectedRow] = useState(fakeRows[4]);
      return (
        <Scroll>
          <DataTable
            onSelectRow={setSelectedRow}
            rows={fakeRows}
            columns={fakeColumns}
            selectedRow={selectedRow}
            renderItem={(row, field) => <div>{row[field]}</div>}
          />
        </Scroll>
      );
    }

    beforeEach(() => {
      constrainedContainer = document.createElement('div');
      constrainedContainer.style.height = '150px';
      constrainedContainer.style.maxHeight = '200px';
      document.body.appendChild(constrainedContainer);
    });

    afterEach(() => {
      constrainedContainer.remove();
    });

    it('ensures selected row is visible in scrollable area', async () => {
      const wrapper = mount(<TestTableWithScroll />, {
        attachTo: constrainedContainer,
      });

      const lastRowEl = wrapper.find('tbody tr').at(4).getDOMNode();
      const scrollEl = wrapper.find('Scroll').getDOMNode();
      const selectedRowBottomOffset = Math.floor(
        lastRowEl.offsetTop + lastRowEl.clientHeight
      );
      const scrollBottomVisible = Math.floor(
        scrollEl.scrollTop + scrollEl.clientHeight
      );

      assert.equal(lastRowEl.getAttribute('aria-selected'), 'true');

      // The y-offset of the selected row is larger than the scroll area:
      // the row would not be visible unless the scroll has been "scrolled"
      assert.isTrue(
        lastRowEl.offsetTop > scrollEl.clientHeight,
        "The selected row's vertical offset is greater than the scroll height"
      );

      // The bottom of the selected row is approximately aligned with the bottom
      // of the visible scroll area. Use `approximately` to account for small
      // variations +/-1px in browser math for tables with
      // border-collapse:separate
      assert.approximately(
        selectedRowBottomOffset,
        scrollBottomVisible,
        1,
        'It scrolls to make the selected row visible'
      );

      // Now, select the second data row. This will trigger the component to
      // scroll that row into view.
      wrapper.find('tbody tr').at(1).simulate('click');
      wrapper.update();

      const stickyHeaderHeight = wrapper
        .find('thead')
        .getDOMNode().clientHeight;

      // The scrollTop has to be adjusted to be at least the height of the
      // sticky header, or else the selected row would be obscured behind
      // the header
      assert.approximately(
        stickyHeaderHeight,
        scrollEl.scrollTop,
        1,
        'Scroll is adjusted to ensure selected row is visible below sticky header'
      );
    });
  });

  testCompositeComponent(DataTable);
});
