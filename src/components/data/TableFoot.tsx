import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

import TableSectionContext from './TableSectionContext';
import type { TableSection } from './TableSectionContext';

type HTMLAttributes = JSX.HTMLAttributes<HTMLTableSectionElement>;

export type TableFootProps = PresentationalProps & HTMLAttributes;

/**
 * Render a table footer section
 */
const TableFootNext = function TableFoot({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: TableFootProps) {
  const sectionContext: TableSection = {
    section: 'foot',
  };

  return (
    <TableSectionContext.Provider value={sectionContext}>
      <tfoot
        data-component="TableFoot"
        {...htmlAttributes}
        ref={downcastRef(elementRef)}
        className={classnames(
          // This tfoot element will take up available extra vertical space when
          // a Table has sparse data. This prevents <TableRow>s from stretching
          // vertically to fill extra space.
          'h-full',
          classes
        )}
      >
        {children}
      </tfoot>
    </TableSectionContext.Provider>
  );
};

export default TableFootNext;
