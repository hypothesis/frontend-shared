import classnames from 'classnames';
import { useContext } from 'preact/hooks';

import { downcastRef } from '../../util/typing';

import TableSectionContext from './TableSectionContext';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'>} HTMLAttributes
 *
 * @typedef TableCellProps
 * @prop {'sm'|'md'|'lg'} [size='md']
 * @prop {'primary'|'secondary'} [variant='secondary']
 */

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
}) {
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
