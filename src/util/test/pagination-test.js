import { paginationItems } from '../pagination';

describe('paginationItems', () => {
  [
    // Only one page
    {
      current: 1,
      total: 1,
      expected: [],
    },

    // No pages elided.
    {
      current: 1,
      total: 3,
      expected: [1, 2, 3],
    },

    // Pages elided after current.
    {
      current: 1,
      total: 4,
      expected: [1, 2, null, 4],
    },

    // Pages elided before current.
    {
      current: 4,
      total: 6,
      expected: [1, null, 3, 4, 5, 6],
    },

    // Pages elided before and after current.
    {
      current: 4,
      total: 7,
      expected: [1, null, 3, 4, 5, null, 7],
    },

    // Custom boundary count
    {
      current: 6,
      total: 10,
      boundaryCount: 2,
      expected: [1, 2, null, 5, 6, 7, null, 9, 10],
    },

    // Custom sibling count
    {
      current: 6,
      total: 10,
      siblingCount: 2,
      expected: [1, null, 4, 5, 6, 7, 8, null, 10],
    },
  ].forEach(({ current, total, boundaryCount, siblingCount, expected }) => {
    it('should produce expected items', () => {
      const items = paginationItems(current, total, {
        boundaryCount,
        siblingCount,
      });
      assert.deepEqual(items, expected);
    });
  });
});
