import { createContext } from 'preact';
import type { RefObject } from 'preact';

export type TableInfo = {
  /** This table has click-able, focus-able rows */
  interactive: boolean;
  /** This table has a sticky header */
  stickyHeader: boolean;
  tableRef: RefObject<HTMLElement | undefined>;
};

const TableContext = createContext({} as TableInfo);

export default TableContext;
