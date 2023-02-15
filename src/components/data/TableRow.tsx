import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

import TableSectionContext from './TableSectionContext';
import TableContext from './TableContext';

type ComponentProps = {
  selected?: boolean;
};

export type TableRowProps = PresentationalProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>;

/**
 * Render a table row
 *
 * @param {CommonProps & TableRowProps & HTMLAttributes} props
 */
const TableRowNext = function TableRow({
  children,
  classes,
  elementRef,

  selected,

  ...htmlAttributes
}: TableRowProps) {
  const rowRef = useSyncedRef(elementRef);

  const sectionContext = useContext(TableSectionContext);
  const tableContext = useContext(TableContext);

  const isHeadRow = sectionContext?.section === 'head';

  return (
    <tr
      {...htmlAttributes}
      aria-selected={selected}
      ref={downcastRef(rowRef)}
      className={classnames(
        'group',
        {
          // Low-opacity backgrounds allow any scroll shadows to be visible
          'odd:bg-slate-9/[.03]': !isHeadRow && !selected,
          'bg-slate-7 text-color-text-inverted': selected,
          'focus-visible-ring ring-inset': tableContext?.interactive,
          'hover:bg-slate-9/[.08]': tableContext?.interactive && !selected,
          'group/unselected': !selected,
          'group/selected': selected,
        },
        classes
      )}
      data-component="TableRow"
      data-section={isHeadRow ? 'head' : 'body'}
    >
      {children}
    </tr>
  );
};

export default TableRowNext;
