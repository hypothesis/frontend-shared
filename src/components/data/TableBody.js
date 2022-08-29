import classnames from 'classnames';
import { useContext } from 'preact/hooks';

import { downcastRef } from '../../util/typing';

import TableSectionContext from './TableSectionContext';
import TableContext from './TableContext';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'|'rows'>} HTMLAttributes
 * @typedef {import('./TableSectionContext').TableSection} TableSection
 */

/**
 * Render a table body
 *
 * @param {CommonProps & HTMLAttributes} props
 */
const TableBodyNext = function TableBody({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}) {
  const tableContext = useContext(TableContext);
  const sectionContext = /** @type {TableSection} */ ({
    section: 'body',
  });

  return (
    <TableSectionContext.Provider value={sectionContext}>
      <tbody
        {...htmlAttributes}
        ref={downcastRef(elementRef)}
        className={classnames(
          { 'cursor-pointer': tableContext?.interactive },
          classes
        )}
        data-component="TableBody"
      >
        {children}
      </tbody>
    </TableSectionContext.Provider>
  );
};

export default TableBodyNext;
