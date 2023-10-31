import classnames from 'classnames';
import type { JSX } from 'preact';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import TableContext from './TableContext';
import type { TableInfo } from './TableContext';

export type TableProps = PresentationalProps & {
  stickyHeader?: boolean;
  /** Sets accessible aria-label */
  title: string;
  /** This table has rows that can be selected */
  interactive?: boolean;
  /** Turn off outer table borders */
  borderless?: boolean;
} & Omit<JSX.HTMLAttributes<HTMLElement>, 'rows'>;

/**
 * Render table content
 */
export default function Table({
  children,
  classes,
  elementRef,

  title,
  interactive = false,
  stickyHeader = false,
  borderless = false,

  ...htmlAttributes
}: TableProps) {
  const ref = useSyncedRef(elementRef);

  const tableContext: TableInfo = {
    interactive,
    stickyHeader,
    borderless,
    tableRef: ref,
  };

  return (
    <TableContext.Provider value={tableContext}>
      <table
        data-component="Table"
        {...htmlAttributes}
        aria-label={title}
        className={classnames(
          'w-full h-full',
          'focus-visible-ring ring-inset',
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
          { 'border-x border-b': !borderless },
          classes,
        )}
        ref={downcastRef(ref)}
      >
        {children}
      </table>
    </TableContext.Provider>
  );
}
