import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import TableContext from './TableContext';
import TableSectionContext from './TableSectionContext';
import type { TableSection } from './TableSectionContext';

export type TableBodyProps = PresentationalProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'rows'>;

/**
 * Render a table body
 */
export default function TableBody({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: TableBodyProps) {
  const tableContext = useContext(TableContext);
  const sectionContext: TableSection = useMemo(
    () => ({
      section: 'body',
    }),
    [],
  );

  return (
    <TableSectionContext.Provider value={sectionContext}>
      <tbody
        data-component="TableBody"
        {...htmlAttributes}
        ref={downcastRef(elementRef)}
        className={classnames(
          { 'cursor-pointer': tableContext?.interactive },
          classes,
        )}
      >
        {children}
      </tbody>
    </TableSectionContext.Provider>
  );
}
