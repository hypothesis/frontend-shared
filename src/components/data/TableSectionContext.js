import { createContext } from 'preact';

/**
 * @typedef TableSection
 * @prop {'head'|'body'|'footer'} section
 */

const TableSectionContext = createContext(/** @type {TableSection} */ ({}));

export default TableSectionContext;
