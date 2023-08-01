import classnames from 'classnames';
import type { JSX } from 'preact';
import { useContext } from 'preact/hooks';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import TableContext from './TableContext';
import TableSectionContext from './TableSectionContext';

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
const TableRow = function TableRow({
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
      data-component="TableRow"
      {...htmlAttributes}
      aria-selected={selected}
      ref={downcastRef(rowRef)}
      className={classnames(
        'group',
        'focus-visible-ring ring-inset',
        {
          // Low-opacity backgrounds allow any scroll shadows to be visible
          'odd:bg-slate-9/[.03]': !isHeadRow && !selected,
          'bg-slate-7 text-color-text-inverted': selected,
          'hover:bg-slate-9/[.08]': tableContext?.interactive && !selected,
          'group/unselected': !selected,
          'group/selected': selected,
        },
        classes,
      )}
      data-section={isHeadRow ? 'head' : 'body'}
    >
      {children}
    </tr>
  );
};

export default TableRow;
