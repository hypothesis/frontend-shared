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
        {...htmlAttributes}
        ref={downcastRef(elementRef)}
        className={classnames(
          // Top border is set here instead of on `Table` to prevent sticky
          // headers from causing a border wobble on scroll
          'bg-grey-2 border-t',
          {
            'sticky top-0': tableContext?.stickyHeader,
          },
          classes
        )}
        data-component="TableHead"
      >
        {children}
      </thead>
    </TableSectionContext.Provider>
  );
};

export default TableHeadNext;
