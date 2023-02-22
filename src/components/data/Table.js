import classnames from 'classnames';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { downcastRef } from '../../util/typing';

import TableContext from './TableContext';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'rows'>} HTMLAttributes
 * @typedef {import('./TableContext').TableInfo} TableInfo
 *
 * @typedef TableProps
 * @prop {boolean} [stickyHeader=false]
 * @prop {string} title - Sets accessible aria-label
 * @prop {boolean} [interactive=false] - This table has rows that can be selected
 */

/**
 * Render table content
 * @param {CommonProps & TableProps & HTMLAttributes} props
 */
const TableNext = function Table({
  children,
  classes,
  elementRef,

  interactive = false,
  title,
  stickyHeader,

  ...htmlAttributes
}) {
  const ref = useSyncedRef(elementRef);

  const tableContext = /** @type {TableInfo} */ ({
    interactive,
    stickyHeader,
    tableRef: ref,
  });

  return (
    <TableContext.Provider value={tableContext}>
      <table
        data-component="Table"
        {...htmlAttributes}
        aria-label={title}
        className={classnames(
          'w-full h-full',
          // Set the width of columns based on the width of the columns in the
          // first table row (typically headers)
          'table-fixed',
          // `border-separate` is required to handle borders on sticky headers.
          // A side effect is that borders need to be set primarily on table
          // cells, not rows
          'border-separate border-spacing-0',
          // No top border is set here: that border is set by `TableCell`.
          // If it is set here, there will be a 1-pixel wiggle in the sticky
          // header on scroll
          'border-x border-b',
          classes
        )}
        ref={downcastRef(ref)}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
};

export default TableNext;
