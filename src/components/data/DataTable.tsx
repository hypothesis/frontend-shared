import type { ComponentChildren, JSX } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { CompositeProps } from '../../types';
import { downcastRef } from '../../util/typing';
import { SpinnerSpokesIcon } from '../icons';
import ScrollContext from './ScrollContext';
import Table from './Table';
import TableBody from './TableBody';
import TableCell from './TableCell';
import TableFoot from './TableFoot';
import TableHead from './TableHead';
import TableRow from './TableRow';

export type TableColumn = {
  field: string;
  label: string;
  classes?: string;
};

type ComponentProps<Row> = {
  rows: Row[];
  columns: TableColumn[];

  /** Content to render if rows is empty (and not in a loading state) */
  emptyMessage?: ComponentChildren;
  loading?: boolean;
  selectedRow?: Row | null;

  /** Callback when a row is "selected" by focus or click */
  onSelectRow?: (r: Row) => void;

  /**
   * Callback when a row is "confirmed" by double-click or pressing "Enter"
   */
  onConfirmRow?: (r: Row) => void;

  /** Callback to render an individual table cell */
  renderItem?: (r: Row, field: keyof Row) => ComponentChildren;
  title: string;
};

export type DataTableProps<Row> = CompositeProps &
  ComponentProps<Row> &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'rows' | 'role' | 'loading'>;

/**
 * An interactive table of rows and columns with a sticky header.
 */
const DataTable = function DataTable<Row>({
  children,
  elementRef,

  columns = [],
  rows = [],
  title,
  selectedRow,
  loading = false,
  renderItem = (r: Row, field: keyof Row) => r[field] as ComponentChildren,
  onSelectRow,
  onConfirmRow,
  emptyMessage,

  ...htmlAttributes
}: DataTableProps<Row>) {
  const tableRef = useSyncedRef(elementRef);
  const scrollContext = useContext(ScrollContext);

  useArrowKeyNavigation(tableRef, {
    selector: 'tbody tr',
    horizontal: true,
    vertical: true,
  });

  const noContent = loading || (!rows.length && emptyMessage);
  const fields = columns.map(column => column.field);

  function selectRow(row: Row) {
    onSelectRow?.(row);
  }

  function confirmRow(row: Row) {
    onConfirmRow?.(row);
  }

  function handleKeyDown(event: KeyboardEvent, row: Row) {
    if (event.key === 'Enter') {
      confirmRow(row);
      event.preventDefault();
      event.stopPropagation();
    }
  }

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

  return (
    <Table
      data-composite-component="DataTable"
      role="grid"
      {...htmlAttributes}
      title={title}
      elementRef={downcastRef(tableRef)}
      interactive={!!(onSelectRow || onConfirmRow)}
      stickyHeader={true}
    >
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.field} classes={column.classes}>
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {!loading &&
          rows.map((row, idx) => (
            <TableRow
              key={idx}
              selected={row === selectedRow}
              onClick={() => selectRow(row)}
              onFocus={() => selectRow(row)}
              onDblClick={() => confirmRow(row)}
              onKeyDown={event => handleKeyDown(event, row)}
            >
              {fields.map(field => (
                <TableCell key={field}>
                  {renderItem(row, field as keyof Row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
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
};

export default DataTable;
