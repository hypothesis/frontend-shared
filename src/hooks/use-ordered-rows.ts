import { useMemo } from 'preact/hooks';

import type { Order } from '../types';

/**
 * Orders a list of rows based on provided order options.
 * Provided rows are not mutated, but a copy is returned instead.
 */
export function useOrderedRows<Row>(
  rows: Row[],
  order?: Order<keyof Row>,
): Row[] {
  return useMemo(() => {
    if (!order) {
      return rows;
    }

    return [...rows].sort((a, b) => {
      if (a[order.field] === b[order.field]) {
        return 0;
      }

      if (order.direction === 'ascending') {
        return a[order.field] > b[order.field] ? 1 : -1;
      }

      return a[order.field] > b[order.field] ? -1 : 1;
    });
  }, [order, rows]);
}
