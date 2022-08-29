import classnames from 'classnames';
import { useContext } from 'preact/hooks';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import { downcastRef } from '../../util/typing';

import TableSectionContext from './TableSectionContext';
import TableContext from './TableContext';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'>} HTMLAttributes
 *
 * @typedef TableRowProps
 * @prop {boolean} [selected=false]
 */

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
}) {
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
        'focus-visible-ring ring-inset group',
        {
          // Low-opacity backgrounds allow any scroll shadows to be visible
          'odd:bg-slate-9/[.03]': !isHeadRow && !selected,
          'bg-slate-7 text-color-text-inverted': selected,
          'hover:bg-slate-9/[.08]': tableContext?.interactive && !selected,
        },
        classes
      )}
      data-component="TableRow"
      data-interactive={tableContext?.interactive}
      data-section={isHeadRow ? 'head' : 'body'}
    >
      {children}
    </tr>
  );
};

export default TableRowNext;
