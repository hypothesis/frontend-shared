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
        },
        classes
      )}
      data-component="TableCell"
      scope={isHeadCell ? 'col' : undefined}
    >
      {children}
    </Cell>
  );
};

export default TableCellNext;
