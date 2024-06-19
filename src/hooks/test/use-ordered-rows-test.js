import { mount } from 'enzyme';
import { useState } from 'preact/hooks';

import { useOrderedRows } from '../use-ordered-rows';

// Some start with lowercase to test case-insensitive ordering
const starWarsCharacters = [
  { name: 'Luke Skywalker', age: 20 },
  { name: 'leia Organa', age: 20 },
  { name: 'Han Solo', age: 25 },
  { name: 'Baby Yoda', age: 2 },
  { name: 'baby yöda The Second', age: 2 },
  { name: 'young Anakin Skywalker', age: 10 },
];

describe('useOrderedRows', () => {
  function FakeComponent({ rows, initialOrder }) {
    const [order, setOrder] = useState(initialOrder);
    const orderedRows = useOrderedRows(rows, order);

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

  function createComponent(
    rows = starWarsCharacters,
    initialOrder = undefined,
  ) {
    return mount(<FakeComponent rows={rows} initialOrder={initialOrder} />);
  }

  function assertDefaultOrder(wrapper) {
    assertOrder(wrapper, starWarsCharacters);
  }

  function assertOrder(wrapper, expectedRows) {
    expectedRows.forEach((character, index) => {
      assert.equal(
        wrapper.find(`[data-testid="name-${index}"]`).text(),
        character.name ?? '',
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
        { name: 'Baby Yoda', age: 2 },
        { name: 'baby yöda The Second', age: 2 },
        { name: 'Han Solo', age: 25 },
        { name: 'leia Organa', age: 20 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'young Anakin Skywalker', age: 10 },
      ],
    },
    {
      orderId: 'button-order-by-name-desc',
      expectedRows: [
        { name: 'young Anakin Skywalker', age: 10 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
        { name: 'Han Solo', age: 25 },
        { name: 'baby yöda The Second', age: 2 },
        { name: 'Baby Yoda', age: 2 },
      ],
    },
    {
      orderId: 'button-order-by-age-asc',
      expectedRows: [
        { name: 'Baby Yoda', age: 2 },
        { name: 'baby yöda The Second', age: 2 },
        { name: 'young Anakin Skywalker', age: 10 },
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
        { name: 'young Anakin Skywalker', age: 10 },
        { name: 'Baby Yoda', age: 2 },
        { name: 'baby yöda The Second', age: 2 },
      ],
    },
  ].forEach(({ orderId, expectedRows }) => {
    it('orders rows based on field and direction', () => {
      const wrapper = createComponent();

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

  [
    // Null/undefined element is initially last
    [...starWarsCharacters, { name: null, age: 20 }],
    [...starWarsCharacters, { name: undefined, age: 20 }],

    // Null/undefined element is initially first
    [{ name: null, age: 20 }, ...starWarsCharacters],
    [{ name: undefined, age: 20 }, ...starWarsCharacters],

    // Null/undefined element is initially somewhere in between
    [
      starWarsCharacters[0],
      starWarsCharacters[1],
      { name: null, age: 20 },
      starWarsCharacters[2],
      starWarsCharacters[3],
      starWarsCharacters[4],
      starWarsCharacters[5],
    ],
    [
      starWarsCharacters[0],
      starWarsCharacters[1],
      starWarsCharacters[2],
      starWarsCharacters[3],
      { name: undefined, age: 20 },
      starWarsCharacters[4],
      starWarsCharacters[5],
    ],
  ].forEach(rows => {
    it('orders null values last when initial order is ascending', () => {
      const wrapper = createComponent(rows, {
        field: 'name',
        direction: 'ascending',
      });

      // All items are ordered ascending, with nulls at the bottom
      assertOrder(wrapper, [
        { name: 'Baby Yoda', age: 2 },
        { name: 'baby yöda The Second', age: 2 },
        { name: 'Han Solo', age: 25 },
        { name: 'leia Organa', age: 20 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'young Anakin Skywalker', age: 10 },
        { name: null, age: 20 },
      ]);
    });

    it('orders null values last when initial order is descending', () => {
      const wrapper = createComponent(rows, {
        field: 'name',
        direction: 'descending',
      });

      // All items are ordered descending, with nulls at the bottom
      assertOrder(wrapper, [
        { name: 'young Anakin Skywalker', age: 10 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
        { name: 'Han Solo', age: 25 },
        { name: 'baby yöda The Second', age: 2 },
        { name: 'Baby Yoda', age: 2 },
        { name: null, age: 20 },
      ]);
    });

    it('orders null values first when nullsLast is false', () => {
      const wrapper = createComponent(rows, {
        field: 'name',
        direction: 'descending',
        nullsLast: false,
      });

      assertOrder(wrapper, [
        { name: null, age: 20 },
        { name: 'young Anakin Skywalker', age: 10 },
        { name: 'Luke Skywalker', age: 20 },
        { name: 'leia Organa', age: 20 },
        { name: 'Han Solo', age: 25 },
        { name: 'baby yöda The Second', age: 2 },
        { name: 'Baby Yoda', age: 2 },
      ]);
    });
  });
});
