import { createContext } from 'preact';
import type { RefObject } from 'preact';

export type TableInfo = {
  /** This table has click-able, focus-able rows */
  interactive: boolean;
  /** This table has a sticky header */
  stickyHeader: boolean;
  /** Turn off outer table borders */
  borderless: boolean;
  /** Show a different background every other row */
  striped: boolean;
  /** Show grid lines around table cells */
  grid: boolean;
  tableRef: RefObject<HTMLElement | undefined>;
};

const TableContext = createContext({} as TableInfo);

export default TableContext;
