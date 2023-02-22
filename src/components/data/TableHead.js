import classnames from 'classnames';
import { useContext } from 'preact/hooks';

import { downcastRef } from '../../util/typing';

import TableContext from './TableContext';
import TableSectionContext from './TableSectionContext';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'>} HTMLAttributes
 * @typedef {import('./TableSectionContext').TableSection} TableSection
 */

/**
 * Render a table head section
 *
 * @param {CommonProps & HTMLAttributes} props
 */
const TableHeadNext = function TableHead({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
  const tableContext = useContext(TableContext);

  const sectionContext = /** @type {TableSection} */ ({
    section: 'head',
  });

  return (
    <TableSectionContext.Provider value={sectionContext}>
      <thead
        data-component="TableHead"
        {...htmlAttributes}
        ref={downcastRef(elementRef)}
        className={classnames(
          'bg-grey-2',
          {
            'sticky top-0': tableContext?.stickyHeader,
          },
          classes
        )}
      >
        {children}
      </thead>
    </TableSectionContext.Provider>
  );
};

export default TableHeadNext;
