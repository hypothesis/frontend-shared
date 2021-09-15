import { mount } from 'enzyme';

import { Table } from '../Table';
import { checkAccessibility } from '../../../test/util/accessibility';

describe('Table', () => {
  let constrainedContainer;
  let fakeItems;

  const createComponent = (props = {}) => {
    return mount(
      <Table
        accessibleLabel="Test table"
        tableHeaders={[{ label: 'Item' }]}
        items={fakeItems}
        renderItem={item => <td>{item}</td>}
        onSelectItem={sinon.stub()}
        onUseItem={sinon.stub()}
        selectedItem={null}
        {...props}
      />,
      { attachTo: constrainedContainer }
    );
  };

  beforeEach(() => {
    fakeItems = [
      'One',
      'Two',
      'Three',
      'Four',
      'Five',
      'Six',
      'Seven',
      'Eight',
    ];
    constrainedContainer = document.createElement('div');
    constrainedContainer.style.height = '200px';
    constrainedContainer.style.maxHeight = '200px';
    document.body.appendChild(constrainedContainer);
  });

  afterEach(() => {
    constrainedContainer.remove();
  });

  context('when loading', () => {
    it('does not render items', () => {
      const wrapper = createComponent({ isLoading: true });
      const items = wrapper.find('tr > td');

      assert.equal(items.length, 0);
    });

    it('shows spinner', () => {
      const wrapper = createComponent({ isLoading: true });
      assert.isTrue(wrapper.exists('Spinner'));
    });

    it('renders column headings', () => {
      const wrapper = createComponent({
        isLoading: true,
        tableHeaders: [{ label: 'Name' }, { label: 'Size' }],
      });

      const columns = wrapper.find('thead th').map(col => col.text());
      assert.deepEqual(columns, ['Name', 'Size']);
    });

    it('does not show an empty items message', () => {
      const wrapper = createComponent({
        isLoading: true,
        tableHeaders: [{ label: 'Name' }, { label: 'Size' }],
        items: [],
        emptyItemsMessage: 'There is nothing here',
      });

      assert.isFalse(
        wrapper.find('[data-testid="empty-items-message"]').exists()
      );
    });
  });

  it('renders column headings', () => {
    const wrapper = createComponent({
      tableHeaders: [{ label: 'Name' }, { label: 'Size' }],
    });
    const columns = wrapper.find('thead th').map(col => col.text());
    assert.deepEqual(columns, ['Name', 'Size']);
  });

  it('renders items', () => {
    const wrapper = createComponent({
      tableHeaders: [{ label: 'Item' }],
      items: ['One', 'Two', 'Three'],
      // eslint-disable-next-line react/display-name
      renderItem: item => <td>{item}</td>,
    });

    const items = wrapper.find('tr > td');
    assert.equal(items.length, 3);
    assert.isTrue(wrapper.contains(<td>One</td>));
    assert.isTrue(wrapper.contains(<td>Two</td>));
    assert.isTrue(wrapper.contains(<td>Three</td>));
  });

  it('shows provided empty message if there are no items', () => {
    const wrapper = createComponent({
      items: [],
      emptyItemsMessage: 'There is nothing here',
    });

    assert.isTrue(wrapper.find('[data-testid="empty-items-message"]').exists());
  });

  ['click', 'mousedown'].forEach(event => {
    it(`selects item on ${event}`, () => {
      const onSelectItem = sinon.stub();
      const wrapper = createComponent({
        items: ['One', 'Two', 'Three'],
        onSelectItem,
      });

      wrapper.find('tbody > tr').first().simulate(event);

      assert.calledWith(onSelectItem, 'One');
    });
  });

  it('uses selected item on double-click', () => {
    const item = 'Test item';
    const onUseItem = sinon.stub();
    const wrapper = createComponent({ items: [item], onUseItem });

    wrapper.find('tbody > tr').first().simulate('dblclick');

    assert.calledWith(onUseItem, item);
  });

  it('supports keyboard navigation', () => {
    const onSelectItem = sinon.stub();
    const onUseItem = sinon.stub();
    const items = ['One', 'Two', 'Three'];
    const wrapper = createComponent({
      items,
      selectedItem: items[1],
      onSelectItem,
      onUseItem,
    });
    const rows = wrapper.find('tbody > tr').map(n => n.getDOMNode());
    rows.forEach(row => (row.focus = sinon.stub()));

    const assertKeySelectsItem = (key, index) => {
      rows[index].focus.reset();
      onSelectItem.reset();

      wrapper.find('table').simulate('keydown', { key });

      assert.calledWith(onSelectItem, items[index]);
      assert.called(rows[index].focus);
    };

    // Down arrow should select item below selected item.
    assertKeySelectsItem('ArrowDown', 2);

    // Up arrow should select item above selected item.
    assertKeySelectsItem('ArrowUp', 0);

    // Enter should use selected item.
    onSelectItem.reset();
    wrapper.find('table').simulate('keydown', { key: 'Enter' });
    assert.calledWith(onUseItem, items[1]);

    // Up arrow should not change selection if first item is selected.
    wrapper.setProps({ selectedItem: items[0] });
    assertKeySelectsItem('ArrowUp', 0);

    // Down arrow should not change selection if last item is selected.
    wrapper.setProps({ selectedItem: items[items.length - 1] });
    assertKeySelectsItem('ArrowDown', items.length - 1);

    // Up or down arrow should select the first item if no item is selected.
    wrapper.setProps({ selectedItem: null });
    assertKeySelectsItem('ArrowUp', 0);
    assertKeySelectsItem('ArrowDown', 0);

    // Other keys should do nothing.
    onSelectItem.reset();
    wrapper.find('table').simulate('keydown', { key: 'Tab' });
    assert.notCalled(onSelectItem);
  });

  it('hides spinner if data is fetched', () => {
    const wrapper = createComponent({ isLoading: false });
    assert.isFalse(wrapper.exists('Spinner'));
  });

  it('leaves the table scrolling as-is if no item is selected', () => {
    const wrapper = createComponent({
      selectedItem: null,
    });

    const scrollboxOffset = wrapper.find('Scrollbox').getDOMNode().scrollTop;
    const scrollboxHeight = wrapper.find('Scrollbox').getDOMNode().clientHeight;

    assert.equal(scrollboxOffset, 0);
    assert.equal(scrollboxHeight, 200); // Inline styles in container
  });

  it('adds a selected class to the selected item', () => {
    const wrapper = createComponent({
      selectedItem: fakeItems[0],
    });

    const selectedItemRow = wrapper.find('tbody > tr').first();
    assert.isTrue(selectedItemRow.hasClass('is-selected'));
  });

  it('scrolls to selected element if below visible scrollbox', () => {
    const wrapper = createComponent({
      selectedItem: fakeItems[fakeItems.length - 1],
    });

    const lastItemRow = wrapper.find('tbody > tr').last();

    // Selected row offset from top of scrollbox (369)
    const rowOffset = lastItemRow.getDOMNode().offsetTop;
    // Scrollbox scroll top (213)
    const scrollboxScrollTop = wrapper.find('Scrollbox').getDOMNode().scrollTop;
    // Selected row height (from applied Table styles) (44)
    const rowHeight = lastItemRow.getDOMNode().clientHeight;
    // The visible height of the scrollbox (from inline styles in these tests)
    const scrollboxHeight = wrapper.find('Scrollbox').getDOMNode().clientHeight;

    // The selected row <tr> is within the visible scrollbox content
    assert.equal(rowOffset - scrollboxScrollTop + rowHeight, scrollboxHeight);
  });

  it(
    'should pass a11y checks',
    checkAccessibility({
      content: () => createComponent({ selectedItem: fakeItems[3] }),
    })
  );
});
