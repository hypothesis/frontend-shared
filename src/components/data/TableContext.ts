import { createContext } from 'preact';
import type { RefObject } from 'preact';

export type CommonTableInfo = {
  /** This table has click-able, focus-able rows */
  interactive?: boolean;
  /** This table has a sticky header */
  stickyHeader?: boolean;
  /** Turn off outer table borders */
  borderless?: boolean;

  /**
   * Table variant:
   *  - striped: Show a different background every other row
   *  - grid: Show the table cells as a grid
   */
  variant?: 'striped' | 'grid';
};

export type TableInfo = Required<CommonTableInfo> & {
  tableRef: RefObject<HTMLElement | undefined>;
};

const TableContext = createContext({} as TableInfo);

export default TableContext;
