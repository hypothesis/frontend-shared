import { mount } from 'enzyme';
import { useState } from 'preact/hooks';

import { useOrderedRows } from '../use-ordered-rows';

const starWarsCharacters = [
  { name: 'Luke Skywalker', age: 20 },
  // Lowercased on purpose to test case-sensitivity capabilities
  { name: 'leia Organa', age: 20 },
  { name: 'Han Solo', age: 25 },
];

describe('useOrderedRows', () => {
  function FakeComponent({ options }) {
    const [order, setOrder] = useState();
    const orderedRows = useOrderedRows(starWarsCharacters, order, options);

    return (
      <div>
        {orderedRows.map((character, index) => (
          <div key={`${character.name}${index}`}>
            <span data-testid={`name-${index}`}>{character.name}</span>
            <span data-testid={`age-${index}`}>{character.age}</span>
          </div>
        ))}
        <button
          data-testid="button-order-by-name-asc"
          onClick={() => setOrder({ field: 'name', direction: 'ascending' })}
        >
          By name ASC
        </button>
        <button
          data-testid="button-order-by-name-desc"
          onClick={() => setOrder({ field: 'name', direction: 'descending' })}
        >
          By name DES
        </button>
        <button
          data-testid="button-order-by-age-asc"
          onClick={() => setOrder({ field: 'age', direction: 'ascending' })}
        >
          By age ASC
        </button>
        <button
          data-testid="button-order-by-age-desc"
          onClick={() => setOrder({ field: 'age', direction: 'descending' })}
        >
          By age DES
        </button>
        <button
          data-testid="button-reset-order"
          onClick={() => setOrder(undefined)}
        >
          Reset order
        </button>
      </div>
    );
  }

  function createComponent(options) {
    return mount(<FakeComponent options={options} />);
  }

  function assertDefaultOrder(wrapper) {
    assertOrder(wrapper, starWarsCharacters);
  }

  function assertOrder(wrapper, expectedRows) {
    expectedRows.forEach((character, index) => {
      assert.equal(
        wrapper.find(`[data-testid="name-${index}"]`).text(),
        character.name,
      );
      assert.equal(
        wrapper.find(`[data-testid="age-${index}"]`).text(),
        character.age,
      );
    });
  }

  [
    {
      orderId: 'button-order-by-name-asc',
      expectedRows: [
        { name: 'Han Solo', age: 25 },
        { name: 'leia Organa', age: 20 },
        { name: 'Luke Skywalker', age: 20 },
      ],
    },
    {
      orderId: 'button-order-by-name-asc',
      options: { caseSensitive: true },
      expectedRows: [
        { name: 'Han Solo', age: 25 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
      ],
    },
    {
      orderId: 'button-order-by-name-desc',
      expectedRows: [
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
        { name: 'Han Solo', age: 25 },
      ],
    },
    {
      orderId: 'button-order-by-age-asc',
      expectedRows: [
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
        { name: 'Han Solo', age: 25 },
      ],
    },
    {
      orderId: 'button-order-by-age-desc',
      expectedRows: [
        { name: 'Han Solo', age: 25 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
      ],
    },
  ].forEach(({ orderId, options, expectedRows }) => {
    it('orders rows based on field and direction', () => {
      const wrapper = createComponent(options);

      // Rows are initially not ordered
      assertDefaultOrder(wrapper);

      // Click button to order
      wrapper.find(`[data-testid="${orderId}"]`).simulate('click');
      assertOrder(wrapper, expectedRows);

      // Order can be reset
      wrapper.find('[data-testid="button-reset-order"]').simulate('click');
      assertDefaultOrder(wrapper);
    });
  });
});
