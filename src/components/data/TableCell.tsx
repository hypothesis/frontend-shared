import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext } from 'preact/hooks';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import TableContext from './TableContext';
import TableSectionContext from './TableSectionContext';

export type TableCellProps = PresentationalProps &
  Omit<JSX.TdHTMLAttributes<HTMLElement>, 'size'> & {
    /** Remove default padding, allowing consuming code to control it */
    unpadded?: boolean;
  };

/**
 * Render a single table cell
 */
export default function TableCell({
  children,
  classes,
  elementRef,
  unpadded = false,

  ...htmlAttributes
}: TableCellProps) {
  const sectionContext = useContext(TableSectionContext);
  const { borderless, grid } = useContext(TableContext);
  const isHeadCell = sectionContext && sectionContext.section === 'head';
  const Cell = isHeadCell ? 'th' : 'td';

  return (
    <Cell
      data-component="TableCell"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        {
          'p-3': !unpadded,
          // Set horizontal borders here for table headers. This needs to be
          // done here (versus on the row or table) to prevent a 1-pixel wiggle
          // on scroll with sticky headers.
          'text-left border-b border-b-grey-5': isHeadCell,
          'border-t': isHeadCell && !borderless,
          'border-none': !grid && !isHeadCell,
          // Apply a very subtle bottom border to the last row in the table (not
          // in the head). This can help delineate the end of data in tables
          // with sparse row data. Only apply border if row is not selected.
          // This uses Tailwind's nested-group syntax. See
          // https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-nested-groups
          'group-last/unselected:border-b group-last/unselected:border-grey-2 group-last/unselected:border-dotted':
            !grid && !isHeadCell,
          // We would typically set `border` in cells together with
          // `border-collapse` in the parent table. However, that doesn't work
          // for sticky headers, so we mimic the behavior by conditionally
          // setting individual cell borders.
          'group-[:not(:last-child)]:border-b': grid,
        },
        classes,
      )}
      scope={isHeadCell ? 'col' : undefined}
      data-grid={grid}
      data-borderless={borderless}
    >
      {children}
    </Cell>
  );
}
