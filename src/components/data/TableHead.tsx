import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import TableContext from './TableContext';
import TableSectionContext from './TableSectionContext';
import type { TableSection } from './TableSectionContext';

export type TableHeadProps = PresentationalProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>;

/**
 * Render a table head section
 */
export default function TableHead({
  children,
  classes,
  elementRef,

  ...htmlAttributes
}: TableHeadProps) {
  const tableContext = useContext(TableContext);

  const sectionContext: TableSection = useMemo(
    () => ({
      section: 'head',
    }),
    [],
  );

  return (
    <TableSectionContext.Provider value={sectionContext}>
      <thead
        data-component="TableHead"
        {...htmlAttributes}
        ref={downcastRef(elementRef)}
        className={classnames(
          // This ensures the header is drawn on top of positioned content
          // in table cells.
          'z-1',
          'bg-grey-2',
          {
            'sticky top-0': tableContext?.stickyHeader,
          },
          classes,
        )}
      >
        {children}
      </thead>
    </TableSectionContext.Provider>
  );
}
