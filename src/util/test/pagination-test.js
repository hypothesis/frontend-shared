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

    // Case where elide the page after the current one and then reduce the
    // elided set so the number of items is consistent regardless of page.
    {
      current: 1,
      total: 4,
      boundaryCount: 1,
      siblingCount: 0,
      expected: [1, 2, null, 4],
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

  function* configurations() {
    for (let boundaryCount = 1; boundaryCount <= 3; boundaryCount++) {
      for (let siblingCount = 0; siblingCount <= 2; siblingCount++) {
        for (let total = 1; total <= 10; total++) {
          yield { total, boundaryCount, siblingCount };
        }
      }
    }
  }

  function isStrictlyIncreasing(list) {
    return list.every((item, idx) => idx === 0 || item > list[idx - 1]);
  }

  it('should produce expected items for generated configurations', () => {
    for (const { total, boundaryCount, siblingCount } of configurations()) {
      const expectedItems =
        total === 1
          ? 0
          : Math.min(total, 2 * boundaryCount + 2 * siblingCount + 3);

      for (let current = 1; current <= total; current++) {
        const items = paginationItems(current, total, {
          boundaryCount,
          siblingCount,
        });

        if (total === 1) {
          assert.deepEqual(items, []);
          continue;
        }

        assert.equal(
          items.length,
          expectedItems,
          'incorrect pagination item count',
        );
        assert.include(items, 1, 'first page should be included');
        assert.include(items, current, 'current page should be included');
        assert.include(items, total, 'last page should be included');
        assert.isAtMost(
          items.filter(it => it === null).length,
          2,
          'should have at most two elided page indicators',
        );

        const numbers = items.filter(it => typeof it === 'number');
        assert.isTrue(
          isStrictlyIncreasing(numbers),
          `${numbers.join(', ')} is not strictly increasing`,
        );
      }
    }
  });
});
