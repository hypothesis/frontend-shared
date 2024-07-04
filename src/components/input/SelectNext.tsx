import classnames from 'classnames';
import type { ComponentChildren, JSX, RefObject } from 'preact';
import {
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { useClickAway } from '../../hooks/use-click-away';
import { useFocusAway } from '../../hooks/use-focus-away';
import { useKeyPress } from '../../hooks/use-key-press';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { CompositeProps } from '../../types';
import { ListenerCollection } from '../../util/listener-collection';
import { downcastRef } from '../../util/typing';
import { MenuCollapseIcon, MenuExpandIcon } from '../icons';
import { inputGroupStyles } from './InputGroup';
import SelectContext from './SelectContext';

export type SelectOptionStatus = {
  selected: boolean;
  disabled: boolean;
};

export type SelectOptionProps<T> = {
  /**
   * An undefined value in a multiple select will cause the selection to reset
   * to an empty array.
   */
  value: T | undefined;

  disabled?: boolean;
  children:
    | ComponentChildren
    | ((status: SelectOptionStatus) => ComponentChildren);
  classes?: string | string[];
};

function optionChildren(
  children:
    | ComponentChildren
    | ((status: SelectOptionStatus) => ComponentChildren),
  status: SelectOptionStatus,
): ComponentChildren {
  if (typeof children === 'function') {
    return children(status);
  }

  return children;
}

function SelectOption<T>({
  value,
  children,
  disabled = false,
  classes,
}: SelectOptionProps<T>) {
  const selectContext = useContext(SelectContext);
  if (!selectContext) {
    throw new Error('Select.Option can only be used as Select child');
  }

  const { selectValue, value: currentValue, multiple } = selectContext;
  const selected =
    !disabled &&
    ((multiple && currentValue.includes(value)) || currentValue === value);

  const selectOrToggle = useCallback(() => {
    // In single-select, just set current value
    if (!multiple) {
      selectValue(value);
      return;
    }

    // In multi-select, clear selection for nullish values
    if (!value) {
      selectValue([]);
      return;
    }

    // In multi-select, toggle clicked items
    const index = currentValue.indexOf(value);
    if (index === -1) {
      selectValue([...currentValue, value]);
    } else {
      const copy = [...currentValue];
      copy.splice(index, 1);
      selectValue(copy);
    }
  }, [currentValue, multiple, selectValue, value]);

  return (
    <li
      className={classnames(
        'w-full ring-inset outline-none rounded-none',
        'border-t first:border-t-0 transition-colors whitespace-nowrap',
        {
          'text-grey-4': disabled,
          'cursor-pointer focus:ring hover:bg-grey-1': !disabled,
        },
        classes,
      )}
      onClick={() => {
        if (!disabled) {
          selectOrToggle();
        }
      }}
      onKeyPress={e => {
        if (!disabled && ['Enter', 'Space'].includes(e.code)) {
          e.preventDefault();
          selectOrToggle();
        }
      }}
      role="option"
      aria-disabled={disabled}
      aria-selected={selected}
      // This is intended to be focused with arrow keys
      tabIndex={-1}
    >
      <div
        className={classnames('flex w-full p-1.5 border-l-4', {
          'border-l-transparent': !selected,
          'border-l-brand font-medium': selected,
        })}
      >
        {optionChildren(children, { selected, disabled })}
      </div>
    </li>
  );
}

SelectOption.displayName = 'SelectNext.Option';

/** Small space to apply between the toggle button and the listbox */
const LISTBOX_TOGGLE_GAP = '.25rem';

type ListboxCSSProps =
  | 'top'
  | 'left'
  | 'minWidth'
  | 'marginBottom'
  | 'bottom'
  | 'marginTop';

/**
 * Manages the listbox position manually to make sure it renders "next" to the
 * toggle button (below or over). This is mainly needed when the listbox is used
 * as a popover, as that makes it render in the top layer, making it impossible
 * to position it relative to the toggle button via regular CSS.
 */
function useListboxPositioning(
  buttonRef: RefObject<HTMLElement | undefined>,
  listboxRef: RefObject<HTMLElement | null>,
  listboxOpen: boolean,
  asPopover: boolean,
  right: boolean,
) {
  const adjustListboxPositioning = useCallback(() => {
    const listboxEl = listboxRef.current;
    const buttonEl = buttonRef.current;

    if (!buttonEl || !listboxEl || !listboxOpen) {
      return () => {};
    }

    /**
     * We need to set the positioning styles synchronously (not via `style`
     * prop and a piece of state), to make sure positioning happens before
     * `useArrowKeyNavigation` runs, focusing the first option in the listbox.
     */
    const setListboxCSSProps = (
      props: Partial<Record<ListboxCSSProps, string>>,
    ) => {
      Object.assign(listboxEl.style, props);
      const keys = Object.keys(props) as ListboxCSSProps[];
      return () => keys.map(prop => (listboxEl.style[prop] = ''));
    };

    const viewportHeight = window.innerHeight;
    const {
      top: buttonDistanceToTop,
      bottom: buttonBottom,
      left: buttonLeft,
      height: buttonHeight,
      width: buttonWidth,
    } = buttonEl.getBoundingClientRect();
    const buttonDistanceToBottom = viewportHeight - buttonBottom;
    const { height: listboxHeight, width: listboxWidth } =
      listboxEl.getBoundingClientRect();

    // The listbox should drop up only if there's not enough space below to
    // fit it, and also, there's more absolute space above than below
    const shouldListboxDropUp =
      buttonDistanceToBottom < listboxHeight &&
      buttonDistanceToTop > buttonDistanceToBottom;

    if (asPopover) {
      const { top: bodyTop } = document.body.getBoundingClientRect();
      const absBodyTop = Math.abs(bodyTop);

      return setListboxCSSProps({
        minWidth: `${buttonWidth}px`,
        top: shouldListboxDropUp
          ? `calc(${absBodyTop + buttonDistanceToTop - listboxHeight}px - ${LISTBOX_TOGGLE_GAP})`
          : `calc(${absBodyTop + buttonDistanceToTop + buttonHeight}px + ${LISTBOX_TOGGLE_GAP})`,
        left:
          right && listboxWidth > buttonWidth
            ? `${buttonLeft - (listboxWidth - buttonWidth)}px`
            : `${buttonLeft}px`,
      });
    }

    // Set styles for non-popover mode
    if (shouldListboxDropUp) {
      return setListboxCSSProps({
        bottom: '100%',
        marginBottom: LISTBOX_TOGGLE_GAP,
      });
    }

    return setListboxCSSProps({ top: '100%', marginTop: LISTBOX_TOGGLE_GAP });
  }, [asPopover, buttonRef, listboxOpen, listboxRef, right]);

  useLayoutEffect(() => {
    const cleanup = adjustListboxPositioning();

    if (!asPopover) {
      return cleanup;
    }

    // Readjust listbox position when any element scrolls, just in case that
    // affected the toggle button position.
    const listeners = new ListenerCollection();
    listeners.add(document.body, 'scroll', adjustListboxPositioning, {
      capture: true,
    });

    return () => {
      cleanup();
      listeners.removeAll();
    };
  }, [adjustListboxPositioning, asPopover]);
}

type SingleValueProps<T> = {
  value: T;
  onChange: (newValue: T) => void;
};

type MultiValueProps<T> = {
  value: T[];
  onChange: (newValue: T[]) => void;
};

export type SelectProps<T> = CompositeProps &
  (SingleValueProps<T> | MultiValueProps<T>) & {
    buttonContent?: ComponentChildren;
    disabled?: boolean;

    /**
     * Whether this select should allow multi-selection or not.
     * When this is true, the listbox is kept open when an option is selected
     * and the value must be an array.
     * Defaults to false.
     */
    multiple?: boolean;

    /**
     * `id` attribute for the toggle button. This is useful to associate a label
     * with the control.
     */
    buttonId?: string;

    /** Additional classes to pass to container */
    containerClasses?: string | string[];
    /** Additional classes to pass to toggle button */
    buttonClasses?: string | string[];
    /** Additional classes to pass to listbox */
    listboxClasses?: string | string[];

    /**
     * Align the listbox to the right.
     * Useful when the listbox is bigger than the toggle button and this component
     * is rendered next to the right side of the page/container.
     * Defaults to false.
     */
    right?: boolean;

    'aria-label'?: string;
    'aria-labelledby'?: string;

    /**
     * Used to determine if the listbox should use the popover API.
     * Defaults to true, as long as the browser supports it.
     */
    listboxAsPopover?: boolean;

    /** A callback passed to the listbox onScroll */
    onListboxScroll?: JSX.HTMLAttributes<HTMLUListElement>['onScroll'];
  };

function SelectMain<T>({
  buttonContent,
  value,
  onChange,
  children,
  disabled,
  elementRef,
  buttonId,
  buttonClasses,
  listboxClasses,
  containerClasses,
  onListboxScroll,
  right = false,
  multiple = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  /* eslint-disable-next-line no-prototype-builtins */
  listboxAsPopover = HTMLElement.prototype.hasOwnProperty('popover'),
}: SelectProps<T>) {
  if (multiple && !Array.isArray(value)) {
    throw new Error('When `multiple` is true, the value must be an array');
  }

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);
  const [listboxOpen, setListboxOpen] = useState(false);
  const toggleListbox = useCallback(
    (open: boolean) => {
      setListboxOpen(open);
      if (listboxAsPopover) {
        listboxRef.current?.togglePopover(open);
      }
    },
    [listboxAsPopover],
  );
  const closeListbox = useCallback(() => toggleListbox(false), [toggleListbox]);
  const listboxId = useId();
  const buttonRef = useSyncedRef(elementRef);
  const defaultButtonId = useId();

  useListboxPositioning(
    buttonRef,
    listboxRef,
    listboxOpen,
    listboxAsPopover,
    right,
  );

  const selectValue = useCallback(
    (value: unknown) => {
      onChange(value as any);
      // In multi-select mode, keep list open when selecting values
      if (!multiple) {
        closeListbox();
      }
    },
    [onChange, multiple, closeListbox],
  );

  // When clicking away, focusing away or pressing `Esc`, close the listbox
  useClickAway(wrapperRef, closeListbox);
  useFocusAway(wrapperRef, closeListbox);
  useKeyPress(['Escape'], closeListbox);

  // Vertical arrow key for options in the listbox
  useArrowKeyNavigation(listboxRef, {
    horizontal: false,
    loop: false,
    autofocus: true,
    containerVisible: listboxOpen,
    selector: '[role="option"]:not([aria-disabled="true"])',
  });

  useLayoutEffect(() => {
    // Focus toggle button after closing listbox, only if previously focused
    // element was inside the listbox itself
    if (!listboxOpen && listboxRef.current!.contains(document.activeElement)) {
      buttonRef.current!.focus();
    }
  }, [buttonRef, listboxOpen]);

  return (
    <div
      className={classnames(
        'relative w-full border rounded',
        inputGroupStyles,
        containerClasses,
      )}
      ref={wrapperRef}
    >
      <button
        id={buttonId ?? defaultButtonId}
        className={classnames(
          'focus-visible-ring transition-colors whitespace-nowrap',
          'w-full flex items-center justify-between gap-x-2 p-2',
          'bg-grey-0 disabled:bg-grey-1 disabled:text-grey-6',
          // Add inherited rounded corners so that the toggle is consistent with
          // the wrapper, which is the element rendering borders.
          // Using overflow-hidden in the parent is not an option here, because
          // that would hide the listbox
          'rounded-[inherit]',
          buttonClasses,
        )}
        type="button"
        role="combobox"
        disabled={disabled}
        aria-expanded={listboxOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        ref={downcastRef(buttonRef)}
        onClick={() => toggleListbox(!listboxOpen)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' && !listboxOpen) {
            e.preventDefault();
            toggleListbox(true);
          }
        }}
        data-testid="select-toggle-button"
      >
        <div className="truncate">{buttonContent}</div>
        <div className="text-grey-6">
          {listboxOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
        </div>
      </button>

      <SelectContext.Provider
        value={{
          // Explicit type casting needed here
          value: value as typeof multiple extends false ? T : T[],
          selectValue,
          multiple,
        }}
      >
        <ul
          className={classnames(
            'absolute z-5 max-h-80 overflow-y-auto',
            'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
            !listboxAsPopover && {
              // Hiding instead of unmounting to
              // * Ensure screen readers detect button as a listbox handler
              // * Listbox size can be computed to correctly drop up or down
              hidden: !listboxOpen,
              'right-0': right,
              'min-w-full': true,
            },
            listboxClasses,
          )}
          role="listbox"
          ref={listboxRef}
          id={listboxId}
          aria-multiselectable={multiple}
          aria-labelledby={buttonId ?? defaultButtonId}
          aria-orientation="vertical"
          data-testid="select-listbox"
          data-listbox-open={listboxOpen}
          // nb. Use `undefined` rather than `false` because Preact doesn't
          // handle boolean values correctly for this attribute (it will set
          // `popover="false"` instead of removing the attribute).
          popover={listboxAsPopover ? 'auto' : undefined}
          onScroll={onListboxScroll}
        >
          {children}
        </ul>
      </SelectContext.Provider>
    </div>
  );
}

SelectMain.displayName = 'SelectNext';

const SelectNext = Object.assign(SelectMain, { Option: SelectOption });

export default SelectNext;
