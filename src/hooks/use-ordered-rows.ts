import { useMemo } from 'preact/hooks';

import type { Order } from '../types';

export type UseOrderedRowsOptions = {
  /**
   * Make case-sensitive comparisons for string values.
   * Defaults to false.
   */
  caseSensitive?: boolean;
};

/**
 * Orders a list of rows based on provided order options.
 * Provided rows are not mutated, but a copy is returned instead.
 * Values are compared preserving their type.
 */
export function useOrderedRows<Row>(
  rows: Row[],
  order?: Order<keyof Row>,
  { caseSensitive = false }: UseOrderedRowsOptions = {},
): Row[] {
  return useMemo(() => {
    if (!order) {
      return rows;
    }

    return [...rows].sort(({ [order.field]: a }, { [order.field]: b }) => {
      const aField =
        !caseSensitive && typeof a === 'string' ? a.toLowerCase() : a;
      const bField =
        !caseSensitive && typeof b === 'string' ? b.toLowerCase() : b;

      if (aField === bField) {
        return 0;
      }

      if (order.direction === 'ascending') {
        return aField > bField ? 1 : -1;
      }

      return aField > bField ? -1 : 1;
    });
  }, [caseSensitive, order, rows]);
}
