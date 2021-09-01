import classnames from 'classnames';
import { useEffect, useRef } from 'preact/hooks';

import { downcastRef } from '../util/typing';

import { Spinner } from './Spinner';
import { Scrollbox } from './containers';

/**
 * @typedef TableHeader
 * @prop {string} label
 * @prop {string} [classes] - Additional CSS classes for the column's `<th>` element
 */

/**
 * @template Item
 * @typedef TableProps
 * @prop {string} accessibleLabel - An accessible label for the table
 * @prop {string} [classes] - Extra CSS classes to apply to the <table>
 * @prop {string} [containerClasses] - Extra CSS classes to apply to the outermost
 *   element, which is a <Scrollbox> div
 * @prop {TableHeader[]} tableHeaders - The columns to display in this table
 * @prop {boolean} [isLoading] - Show an indicator that data for the table is
 *   currently being fetched
 * @prop {Item[]} items -
 *   The items to display in this table, one per row. `renderItem` defines how
 *   information from each item is represented as a series of table cells.
 * @prop {(it: Item, selected: boolean) => any} renderItem -
 *   A function to render an item as a table row. It should return
 *   a `<td>` element for each `tableHeader` column, wrapped in a `Fragment`
 * @prop {Item|null} selectedItem - The currently selected item from `items`
 * @prop {(it: Item) => void} onSelectItem -
 *   Callback invoked when the user changes the selected item
 * @prop {(it: Item) => void} onUseItem -
 *   Callback invoked when a user chooses to use an item by double-clicking it
 *   or pressing Enter while it is selected
 */

/**
 * Return the next item to select when advancing the selection by `step` items
 * forwards (if positive) or backwards (if negative).
 *
 * @template Item
 * @param {Item[]} items
 * @param {Item|null} currentItem
 * @param {number} step
 */
function nextItem(items, currentItem, step) {
  const index = currentItem ? items.indexOf(currentItem) : -1;
  const delta = index + step;
  if (index < 0) {
    return items[0];
  }

  if (delta < 0) {
    return items[0];
  }

  if (delta >= items.length) {
    return items[items.length - 1];
  }

  return items[delta];
}

/**
 * An interactive table of items with a sticky header.
 *
 * @template Item
 * @param {TableProps<Item>} props
 */
export function Table({
  accessibleLabel,
  classes,
  containerClasses,
  isLoading = false,
  items,
  onSelectItem,
  onUseItem,
  renderItem,
  selectedItem,
  tableHeaders,
}) {
  const rowRefs = useRef(/** @type {(HTMLElement|null)[]} */ ([]));
  const scrollboxRef = useRef(/** @type {HTMLElement|null} */ (null));
  const headerRef = useRef(/** @type {HTMLElement|null} */ (null));

  /** @param {Item} item */
  const onKeyboardSelect = item => {
    const rowEl = rowRefs.current[items.indexOf(item)];
    if (rowEl) {
      rowEl.focus();
    }
    onSelectItem(item);
  };

  /** @param {KeyboardEvent} event */
  const onKeyDown = event => {
    let handled = false;
    switch (event.key) {
      case 'Enter':
        handled = true;
        if (selectedItem) {
          onUseItem(selectedItem);
        }
        break;
      case 'ArrowUp':
        handled = true;
        onKeyboardSelect(nextItem(items, selectedItem, -1));
        break;
      case 'ArrowDown':
        handled = true;
        onKeyboardSelect(nextItem(items, selectedItem, 1));
        break;
      default:
        handled = false;
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  // When the selectedItem changes, assure that the table row associated with it
  // is fully visible and not obscured by the sticky table header. This could
  // happen if the table is partially scrolled. Scroll the Scrollbox as needed
  // to make the item row fully visible below the header.
  useEffect(() => {
    if (!selectedItem) {
      return;
    }
    const rowEl = rowRefs.current[items.indexOf(selectedItem)];
    const headingEl = headerRef.current;
    const scrollboxEl = scrollboxRef.current;

    if (rowEl && headingEl && scrollboxEl) {
      const headingHeight = headingEl.offsetHeight;
      // The top of the selected row, relative to the top of the Scrollbox frame
      const rowOffsetFromScrollbox = rowEl.offsetTop - scrollboxEl.scrollTop;

      if (rowOffsetFromScrollbox >= scrollboxEl.clientHeight) {
        // The `selectedItem` is in a table row that is not visible because it
        // is below the visible content in the `scrollbox`. This is most likely
        // to occur if a `Table` is rendered with an initial `selectedItem` that
        // is towards the bottom of the table (later in the `items` array).
        // Scroll it into view.
        rowEl.scrollIntoView();
      }

      // If the offset position is smaller than the height of the header,
      // the row is partially or fully obscured by the header. Scroll just
      // enough to make the full row visible beneath the header.
      if (rowOffsetFromScrollbox <= headingHeight) {
        scrollboxEl.scrollBy(0, rowOffsetFromScrollbox - headingHeight);
      }
    }
  }, [items, selectedItem]);

  return (
    <Scrollbox
      withHeader
      classes={classnames('Hyp-Table-Scrollbox', containerClasses)}
      containerRef={scrollboxRef}
    >
      <table
        aria-label={accessibleLabel}
        className={classnames('Hyp-Table', classes)}
        tabIndex={0}
        role="grid"
        onKeyDown={onKeyDown}
      >
        <thead ref={downcastRef(headerRef)}>
          <tr>
            {tableHeaders.map(({ classes, label }, index) => (
              <th
                key={`${label}-${index}`}
                className={classnames(classes)}
                scope="col"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            items.map((item, index) => (
              <tr
                aria-selected={selectedItem === item}
                key={index}
                className={classnames({
                  'is-selected': selectedItem === item,
                })}
                onMouseDown={() => onSelectItem(item)}
                onClick={() => onSelectItem(item)}
                onDblClick={() => onUseItem(item)}
                ref={node => (rowRefs.current[index] = node)}
                tabIndex={-1}
              >
                {renderItem(item, selectedItem === item)}
              </tr>
            ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="Hyp-Table-Scrollbox__loading">
          <Spinner size="large" />
        </div>
      )}
    </Scrollbox>
  );
}
