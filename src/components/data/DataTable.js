import { useContext, useEffect } from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import { downcastRef } from '../../util/typing';

import { SpinnerSpokesIcon } from '../icons';
import ScrollContext from './ScrollContext';
import Table from './Table';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';

/**
 * @typedef {import('../../types').CompositeProps} CommonProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'|'rows'|'role'|'loading'>} HTMLAttributes
 * @typedef {import('./TableContext').TableInfo} TableInfo
 * @typedef {import('preact').ComponentChildren} Children
 */

/**
 * @typedef Column
 * @prop {string} field
 * @prop {string} label
 * @prop {string} [classes]
 */

/**
 * @template {object} Row
 * @typedef DataTableProps
 * @prop {Column[]} columns
 * @prop {Row[]} rows
 * @prop {string} title
 * @prop {Row|null} [selectedRow]
 * @prop {boolean} [loading=false]
 * @prop {(r: Row) => void} [onConfirmRow] - Callback when a row is "confirmed" by
 *   double-click or pressing "Enter"
 * @prop {(r: Row) => void} [onSelectRow] - Callback when a row is "selected" by
 *   focus or click
 * @prop {(r: Row, field: string) => Children} [renderItem] - Callback to render an individual table cell
 * @prop {Children} [emptyMessage] - Content to render if rows is empty (and not
 *   in a loading state)
 */

/**
 * An interactive table of rows and columns with a sticky header.
 *
 * @template {object} Row
 * @param {CommonProps & DataTableProps<Row> & HTMLAttributes} props
 */
const DataTableNext = function DataTable({
  children,
  elementRef,

  columns = [],
  rows = [],
  title,
  selectedRow,
  loading = false,
  renderItem = (row, field) => row[field],
  onSelectRow,
  onConfirmRow,
  emptyMessage,

  ...htmlAttributes
}) {
  const tableRef = useSyncedRef(elementRef);
  const scrollContext = useContext(ScrollContext);

  useArrowKeyNavigation(tableRef, {
    selector: 'tbody tr',
    horizontal: true,
    vertical: true,
  });

  const noContent = loading || (!rows.length && emptyMessage);
  const fields = columns.map(column => column.field);

  /** @param {Row} row */
  function selectRow(row) {
    onSelectRow?.(row);
  }

  /** @param {Row} row */
  function confirmRow(row) {
    onConfirmRow?.(row);
  }

  /**
   * @param {KeyboardEvent} event
   * @param {Row} row
   * */
  function handleKeyDown(event, row) {
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
    /** @type {HTMLElement | undefined | null} */
    const selectedRowEl = tableRef.current?.querySelector(
      'tr[aria-selected="true"]'
    );

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

  return (
    <Table
      {...htmlAttributes}
      title={title}
      elementRef={downcastRef(tableRef)}
      interactive={!!(onSelectRow || onConfirmRow)}
      stickyHeader={true}
      role="grid"
      data-composite-component="DataTable"
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
                <TableCell key={field}>{renderItem(row, field)}</TableCell>
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
    </Table>
  );
};

export default DataTableNext;
