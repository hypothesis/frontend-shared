import { createContext } from 'preact';

export type TableSection = {
  section: 'head' | 'body' | 'foot';
};

const TableSectionContext = createContext<TableSection | null>(null);

export default TableSectionContext;
