import { useMemo } from 'preact/hooks';

import type { Order } from '../types';

const collator = new Intl.Collator(undefined, { sensitivity: 'case' });

/**
 * Orders a list of rows based on provided order options.
 * Provided rows are not mutated, but a copy is returned instead.
 * Strings are compared using `Intl.Collator`, other types are compared using
 * standard JavaScript comparisons.
 */
export function useOrderedRows<Row>(
  rows: Row[],
  order?: Order<keyof Row>,
): Row[] {
  return useMemo(() => {
    if (!order) {
      return rows;
    }

    // Order nulls last by default
    const { nullsLast = true } = order;

    return [...rows].sort(({ [order.field]: a }, { [order.field]: b }) => {
      const [x, y] = order.direction === 'ascending' ? [a, b] : [b, a];

      if (typeof x === 'string' && typeof y === 'string') {
        return collator.compare(x, y);
      }

      if (x === y) {
        return 0;
      }

      // We check a/b instead of x/y because nulls should not be affected by the
      // regular order direction.
      if (a === null || a === undefined) {
        return nullsLast ? 1 : -1;
      }
      if (b === null || b === undefined) {
        return nullsLast ? -1 : 1;
      }

      return x > y ? 1 : -1;
    });
  }, [order, rows]);
}
