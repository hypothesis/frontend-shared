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

    return [...rows].sort(({ [order.field]: a }, { [order.field]: b }) => {
      const [x, y] = order.direction === 'ascending' ? [a, b] : [b, a];

      if (typeof x === 'string' && typeof y === 'string') {
        return collator.compare(x, y);
      }

      if (x === y) {
        return 0;
      }

      return x > y ? 1 : -1;
    });
  }, [order, rows]);
}
