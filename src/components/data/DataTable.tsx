import type { ComponentChildren, JSX } from 'preact';
import { useCallback, useContext, useEffect, useMemo } from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { useStableCallback } from '../../hooks/use-stable-callback';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { CompositeProps, Order } from '../../types';
import { downcastRef } from '../../util/typing';
import { ArrowDownIcon, ArrowUpIcon, SpinnerSpokesIcon } from '../icons';
import { Button } from '../input';
import ScrollContext from './ScrollContext';
import Table from './Table';
import type { TableProps } from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFoot from './TableFoot';
import TableHead from './TableHead';
import TableRow from './TableRow';

export type TableColumn<Field> = {
  field: Field;
  label: string;
  classes?: string;
};

type ComponentProps<Row> = Pick<
  TableProps,
  'borderless' | 'variant' | 'title'
> & {
  rows: Row[];
  columns: TableColumn<keyof Row>[];

  /** Content to render if rows is empty (and not in a loading state) */
  emptyMessage?: ComponentChildren;
  loading?: boolean;
  selectedRow?: Row | null;

  /**
   * Callback when a row is "selected" by click or key press.
   *
   * If using multi-selection (see {@link ComponentProps.selectedRows}) this
   * will be passed only the most recently selected row. Use
   * {@link ComponentProps.onSelectRows} to receive the full selection.
   */
  onSelectRow?: (r: Row) => void;

  /**
   * Selected rows. If this property is set it enables multi-selection. The
   * user will be able to select a contiguous range of rows via shift+click or
   * shift + arrow keys.
   */
  selectedRows?: Row[];

  /**
   * Callback when rows are selected by click or key press.
   *
   * If multi-selection is enabled, this may have multiple entries (see
   * {@link ComponentProps.selectedRows} otherwise it will have one entry.
   */
  onSelectRows?: (r: Row[]) => void;

  /**
   * Callback when a row is "confirmed" by double-click or pressing "Enter"
   */
  onConfirmRow?: (r: Row) => void;

  /** Current sort order */
  order?: Order<keyof Row>;

  /**
   * Callback invoked when user clicks a column header to change the sort order.
   * When a header is clicked, if that's not the active order, it is set with
   * order='ascending'.
   * If the active header is clicked consecutively, direction toggles between
   * 'ascending' and 'descending'.
   */
  onOrderChange?: (order: Order<keyof Row>) => void;

  /**
   * Columns that can be used to order the table. Ignored if `onOrderChange` is
   * not provided.
   * No columns will be orderable if this is not provided.
   */
  orderableColumns?: Array<keyof Row>;

  /** Callback to render an individual table cell */
  renderItem?: (r: Row, field: keyof Row) => ComponentChildren;
};

export type DataTableProps<Row> = CompositeProps &
  ComponentProps<Row> &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'rows' | 'role' | 'loading'>;

function defaultRenderItem<Row>(r: Row, field: keyof Row): ComponentChildren {
  return r[field] as ComponentChildren;
}

function calculateNewOrder<T extends string | number | symbol>(
  newField: T,
  prevOrder?: Order<T>,
): Order<T> {
  if (newField !== prevOrder?.field) {
    return { field: newField, direction: 'ascending' };
  }

  const newDirection =
    prevOrder.direction === 'ascending' ? 'descending' : 'ascending';
  return { field: newField, direction: newDirection };
}

type HeaderComponentProps = {
  onClick?: () => void;
  children: ComponentChildren;
  field: string;
};

function HeaderComponent({ children, onClick, field }: HeaderComponentProps) {
  const commonClasses = 'flex justify-between items-center';
  return onClick ? (
    <Button
      classes={`${commonClasses} w-full !p-3`}
      variant="custom"
      onClick={onClick}
      data-testid={`${field}-order-button`}
    >
      {children}
    </Button>
  ) : (
    <div className={commonClasses}>{children}</div>
  );
}

/**
 * An interactive table of rows and columns with a sticky header.
 */
export default function DataTable<Row>({
  children,
  elementRef,

  columns = [],
  rows = [],
  selectedRow,
  selectedRows,
  loading = false,
  renderItem = defaultRenderItem,
  onSelectRow,
  onSelectRows,
  onConfirmRow,
  emptyMessage,

  order,
  onOrderChange,
  orderableColumns = [],

  // Forwarded to Table
  title,
  borderless,
  variant,

  ...htmlAttributes
}: DataTableProps<Row>) {
  const tableRef = useSyncedRef(elementRef);
  const scrollContext = useContext(ScrollContext);
  const updateOrder = useCallback(
    (newField: keyof Row) => {
      const newOrder = calculateNewOrder(newField, order);
      onOrderChange?.(newOrder);
    },
    [onOrderChange, order],
  );

  const noContent = loading || (!rows.length && emptyMessage);
  const fields = useMemo(() => columns.map(column => column.field), [columns]);

  const selectRow = useStableCallback(
    (row: Row, mode: 'replace' | 'extend' = 'replace') => {
      onSelectRow?.(row);

      // If multi-selection is enabled, and the user shift+clicked the new row,
      // extend the selection from the "anchor" row (first entry in `selectedRows`)
      // to the just-clicked row.
      let newSelection = [row];
      if (mode === 'extend' && selectedRows && selectedRows.length > 0) {
        const startIdx = rows.indexOf(selectedRows[0]);
        const endIdx = rows.indexOf(row);
        if (endIdx >= startIdx) {
          newSelection = rows.slice(startIdx, endIdx + 1);
        } else {
          // We reverse the selection here so that `startIdx` remains the first
          // entry in the list, and is used as the 'anchor' row for future
          // selections.
          newSelection = rows.slice(endIdx, startIdx + 1).reverse();
        }
      }
      onSelectRows?.(newSelection);
    },
  );

  useArrowKeyNavigation(tableRef, {
    selector: 'tbody tr',
    horizontal: true,
    vertical: true,
    focusElement: (element, keyEvent) => {
      // Simulate a click to update the selected row when arrow-key navigation
      // happens. We do this instead of using an `onFocus` handler on the row
      // itself because we need to know if the shift key was pressed, and
      // `FocusEvent` doesn't provide that information.
      if (keyEvent) {
        element.dispatchEvent(
          new MouseEvent('click', {
            // Propagate shift key state so arrow key + shift can be used to
            // create a multi-selection.
            shiftKey: keyEvent.shiftKey,
          }),
        );
      }

      // Scroll selected row into view.
      element.focus();
    },
  });

  const confirmRow = useStableCallback((row: Row) => {
    onConfirmRow?.(row);
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent, row: Row) => {
      if (event.key === 'Enter') {
        confirmRow(row);
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [confirmRow],
  );

  // Ensure that a selected row is visible when this table is within
  // a scrolling context
  useEffect(() => {
    if (!selectedRow || !scrollContext) {
      return;
    }
    const scrollEl = scrollContext.scrollRef.current;
    const tableHead = tableRef.current?.querySelector('thead');
    const selectedRowEl: HTMLElement | undefined | null =
      tableRef.current?.querySelector('tr[aria-selected="true"]');

    if (scrollEl && selectedRowEl) {
      // Ensure the row is visible within the scroll content area
      const scrollOffset = selectedRowEl.offsetTop - scrollEl.scrollTop;
      if (scrollOffset > scrollEl.clientHeight) {
        selectedRowEl.scrollIntoView();
      }
      // Ensure the row is not obscured by a sticky header
      if (tableHead) {
        const headingHeight = tableHead.clientHeight;
        const headingOffset = scrollOffset - headingHeight;
        if (headingOffset < 0) {
          scrollEl.scrollBy(0, headingOffset);
        }
      }
    }
  }, [selectedRow, tableRef, scrollContext]);

  // Render a <tfoot> element when there are any row data. This absorbs any
  // excess vertical space in tables with sparse rows data.
  const withFoot = !loading && rows.length > 0;

  const selection = useMemo(() => {
    if (selectedRows) {
      return selectedRows;
    } else if (selectedRow) {
      return [selectedRow];
    } else {
      return [];
    }
  }, [selectedRows, selectedRow]);

  const tableRows = useMemo(() => {
    return rows.map((row, idx) => (
      <TableRow
        key={idx}
        selected={selection.includes(row)}
        onClick={e => selectRow(row, e.shiftKey ? 'extend' : 'replace')}
        onDblClick={() => confirmRow(row)}
        onKeyDown={event => handleKeyDown(event, row)}
      >
        {fields.map(field => (
          <TableCell key={field}>{renderItem(row, field)}</TableCell>
        ))}
      </TableRow>
    ));
  }, [
    confirmRow,
    fields,
    renderItem,
    handleKeyDown,
    rows,
    selectRow,
    selection,
  ]);

  const interactive = Boolean(onSelectRow || onSelectRows || onConfirmRow);

  return (
    <Table
      data-composite-component="DataTable"
      role="grid"
      {...htmlAttributes}
      elementRef={downcastRef(tableRef)}
      interactive={interactive}
      stickyHeader
      title={title}
      borderless={borderless}
      variant={variant}
    >
      <TableHead>
        <TableRow>
          {columns.map(column => {
            const isOrderable =
              !!onOrderChange && orderableColumns.includes(column.field);
            const isActiveOrder = order?.field === column.field;

            return (
              <TableCell
                key={column.field}
                classes={column.classes}
                unpadded={isOrderable}
                aria-sort={isActiveOrder ? order.direction : undefined}
              >
                <HeaderComponent
                  field={column.field.toString()}
                  onClick={
                    isOrderable ? () => updateOrder(column.field) : undefined
                  }
                >
                  <div>{column.label}</div>
                  {isActiveOrder && (
                    <div className="bg-white rounded p-1" aria-hidden>
                      {order.direction === 'ascending' ? (
                        <ArrowUpIcon />
                      ) : (
                        <ArrowDownIcon />
                      )}
                    </div>
                  )}
                </HeaderComponent>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading && tableRows}
        {noContent && (
          <tr>
            <td colSpan={columns.length} className="text-center p-3">
              {loading ? (
                <SpinnerSpokesIcon className="inline w-4em h-4em" />
              ) : (
                <>{emptyMessage}</>
              )}
            </td>
          </tr>
        )}
      </TableBody>
      {children}
      {withFoot && <TableFoot />}
    </Table>
  );
}
