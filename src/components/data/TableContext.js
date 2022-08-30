import { createContext } from 'preact';

/**
 * @typedef TableInfo
 * @prop {boolean} interactive - This table has click-able, focus-able rows
 * @prop {boolean} stickyHeader - This table has a sticky header
 * @prop {import('preact').RefObject<HTMLElement>} tableRef
 */

const TableContext = createContext(/** @type {TableInfo} */ ({}));

export default TableContext;
