import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext } from 'preact/hooks';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

import TableSectionContext from './TableSectionContext';

export type TableCellProps = PresentationalProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>;

/**
 * Render a single table cell
 *
 * @param {CommonProps & HTMLAttributes} props
 */
const TableCellNext = function TableCell({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: TableCellProps) {
  const sectionContext = useContext(TableSectionContext);
  const isHeadCell = sectionContext && sectionContext.section === 'head';
  const Cell = isHeadCell ? 'th' : 'td';

  return (
    <Cell
      data-component="TableCell"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        'p-3',
        {
          // Set horizontal borders here for table headers. This needs to be
          // done here (versus on the row or table) to prevent a 1-pixel wiggle
          // on scroll with sticky headers.
          'text-left border-t border-b border-b-grey-5': isHeadCell,
          'border-none': !isHeadCell,
          // Apply a very subtle bottom border to the last row in the table (not
          // in the head). This can help delineate the end of data in tables
          // with sparse row data. Only apply border if row is not selected.
          // This uses Tailwind's nested-group syntax. See
          // https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-nested-groups
          'group-last/unselected:border-b group-last/unselected:border-grey-2 group-last/unselected:border-dotted':
            !isHeadCell,
        },
        classes
      )}
      scope={isHeadCell ? 'col' : undefined}
    >
      {children}
    </Cell>
  );
};

export default TableCellNext;
