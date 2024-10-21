import classnames from 'classnames';
import type { ComponentChildren, JSX, RefObject, Ref } from 'preact';
import {
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
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
import {
  CheckboxCheckedFilledIcon,
  CheckIcon,
  MenuCollapseIcon,
  MenuExpandIcon,
} from '../icons';
import Checkbox from './Checkbox';
import { inputGroupStyles } from './InputGroup';
import type { ListboxOverflow, SelectValueOptions } from './SelectContext';
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

  /** Ref associated with the option's container element */
  elementRef?: Ref<HTMLElement | undefined>;
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
  elementRef,
}: SelectOptionProps<T>) {
  const checkboxRef = useRef<HTMLElement | null>(null);
  const checkboxContainerRef = useRef<HTMLLabelElement | null>(null);
  const optionRef = useSyncedRef(elementRef);
  const eventTriggeredInCheckbox = (e: Event) =>
    e.target === checkboxRef.current ||
    e.target === checkboxContainerRef.current;

  const selectContext = useContext(SelectContext);
  if (!selectContext) {
    throw new Error(
      'Select.Option can only be used as Select or MultiSelect child',
    );
  }

  const { selectValue, value: currentValue, multiple } = selectContext;
  const selected = useMemo(() => {
    if (disabled) {
      return false;
    }

    if (!multiple) {
      return currentValue === value;
    }

    // In multi-select, the option should be marked as selected for values
    // which are explicitly part of the array, or for `undefined` values if the
    // array is empty
    return (
      currentValue.includes(value) ||
      (currentValue.length === 0 && value === undefined)
    );
  }, [currentValue, disabled, multiple, value]);

  const selectOneValue = useCallback(() => {
    const options: SelectValueOptions = { closeListbox: true };

    if (!multiple) {
      selectValue(value, options);
    } else {
      selectValue(value !== undefined ? [value] : [], options);
    }
  }, [multiple, selectValue, value]);
  const toggleValue = useCallback(() => {
    /* istanbul ignore next - This will never be invoked in single-select, but TS doesn't know it */
    if (!multiple) {
      return;
    }

    const options: SelectValueOptions = {
      // Close listbox only if selected value is a "clear" option. Clear options
      // are those with `undefined` value
      closeListbox: value === undefined,
    };

    // In multi-select, clear selection for `undefined` values
    if (value === undefined) {
      selectValue([], options);
      return;
    }

    // In multi-select, toggle clicked items
    const index = currentValue.indexOf(value);
    if (index === -1) {
      selectValue([...currentValue, value], options);
    } else {
      const copy = [...currentValue];
      copy.splice(index, 1);
      selectValue(copy, options);
    }
  }, [currentValue, multiple, selectValue, value]);

  return (
    <li
      className={classnames(
        'w-full ring-inset outline-none rounded-none select-none',
        'px-1 mb-1 first:mt-1 whitespace-nowrap group',
        {
          'text-grey-4': disabled,
          'cursor-pointer': !disabled,
        },
        classes,
      )}
      onClick={e => {
        if (
          !disabled &&
          // Do not invoke callback if clicked element is the checkbox or its
          // container, as it has its own event handler.
          !eventTriggeredInCheckbox(e)
        ) {
          selectOneValue();
        }
      }}
      onKeyDown={e => {
        if (disabled) {
          return;
        }

        if (
          ['Enter', ' '].includes(e.key) &&
          // Do not invoke callback if event triggered in the checkbox or its
          // container, as it has its own event handler.
          !eventTriggeredInCheckbox(e)
        ) {
          e.preventDefault();
          selectOneValue();
        } else if (checkboxRef.current && e.key === 'ArrowRight') {
          e.preventDefault();
          checkboxRef.current.focus();
        }
      }}
      role="option"
      aria-disabled={disabled}
      aria-selected={selected}
      // This is intended to be focused with arrow keys
      tabIndex={-1}
      ref={downcastRef(optionRef)}
    >
      <div
        className={classnames(
          'flex justify-between items-center',
          'w-full rounded',
          {
            'hover:bg-grey-1 group-focus-visible:ring': !disabled,
            'bg-grey-1 hover:bg-grey-2': selected,
          },
        )}
      >
        <div
          className={classnames('py-2 pl-3', {
            truncate: selectContext.listboxOverflow === 'truncate',
            'whitespace-normal': selectContext.listboxOverflow === 'wrap',
          })}
        >
          {optionChildren(children, { selected, disabled })}
        </div>
        {!multiple && (
          <div className="px-3">
            <CheckIcon
              className={classnames('text-grey-6 scale-125', {
                // Make the icon visible/invisible, instead of conditionally
                // rendering it, to ensure consistent spacing among selected and
                // non-selected options
                'opacity-0': !selected,
              })}
            />
          </div>
        )}
        {multiple && (
          <Checkbox
            containerClasses={classnames(
              // Make the checkbox stretch, so that its actionable surface spans
              // to the very edges of the option containing it.
              'self-stretch px-3',
              // The checkbox is sized based on the container's font size. Make
              // it a bit larger.
              'text-lg',
              {
                'text-grey-6': selected,
                'text-grey-3 hover:text-grey-6': !selected,
              },
            )}
            checked={selected}
            checkedIcon={CheckboxCheckedFilledIcon}
            elementRef={checkboxRef}
            containerRef={checkboxContainerRef}
            onChange={toggleValue}
            onKeyDown={e => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                optionRef.current?.focus();
              }
            }}
          />
        )}
      </div>
    </li>
  );
}

SelectOption.displayName = 'Select.Option';

/** Small space to apply between the toggle button and the listbox */
const LISTBOX_TOGGLE_GAP = '.25rem';

/**
 * Space in pixels to apply between the listbox and the viewport sides to
 * prevent the listbox from growing to the very edges.
 */
export const LISTBOX_VIEWPORT_HORIZONTAL_GAP = 8;

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

    if (!asPopover) {
      // Set styles for non-popover mode
      if (shouldListboxDropUp) {
        return setListboxCSSProps({
          bottom: '100%',
          marginBottom: LISTBOX_TOGGLE_GAP,
        });
      }

      return setListboxCSSProps({ top: '100%', marginTop: LISTBOX_TOGGLE_GAP });
    }

    const { top: bodyTop, width: bodyWidth } =
      document.body.getBoundingClientRect();
    const absBodyTop = Math.abs(bodyTop);

    // The available space is:
    // - left-aligned Selects: distance from left side of toggle button to right
    //   side of viewport
    // - right-aligned Selects: distance from right side of toggle button to
    //   left side of viewport
    const availableSpace =
      (right ? buttonLeft + buttonWidth : bodyWidth - buttonLeft) -
      LISTBOX_VIEWPORT_HORIZONTAL_GAP;

    let left = buttonLeft;
    if (listboxWidth > availableSpace) {
      // If the listbox is not going to fit the available space, let it "grow"
      // in the opposite direction
      left = right
        ? LISTBOX_VIEWPORT_HORIZONTAL_GAP
        : left - (listboxWidth - availableSpace);
    } else if (right && listboxWidth > buttonWidth) {
      // If a right-aligned listbox fits the available space, but it's bigger
      // than the button, move it to the left so that it is aligned with the
      // right side of the button
      left -= listboxWidth - buttonWidth;
    }

    return setListboxCSSProps({
      minWidth: `${buttonWidth}px`,
      top: shouldListboxDropUp
        ? `calc(${absBodyTop + buttonDistanceToTop - listboxHeight}px - ${LISTBOX_TOGGLE_GAP})`
        : `calc(${absBodyTop + buttonDistanceToTop + buttonHeight}px + ${LISTBOX_TOGGLE_GAP})`,
      left: `${Math.max(LISTBOX_VIEWPORT_HORIZONTAL_GAP, left)}px`,
    });
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

type BaseSelectProps = CompositeProps & {
  buttonContent?: ComponentChildren;
  disabled?: boolean;

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

  /**
   * Indicates how overflowing content should be handled in the listbox.
   *
   * - `truncate`: Truncate the options via `text-overflow: ellipsis`, so that
   *               they all fit in one line. This is the default value.
   * - `wrap`: Let options content wrap onto multiple lines via
   *           `white-space: normal`
   *
   * Complex content may still need to provide its own styling to handle content
   * overflow.
   */
  listboxOverflow?: ListboxOverflow;
};

export type SelectProps<T> = BaseSelectProps & SingleValueProps<T>;

export type MultiSelectProps<T> = BaseSelectProps & MultiValueProps<T>;

type SelectMainProps<T> = (SelectProps<T> | MultiSelectProps<T>) & {
  /**
   * Whether this select should allow multi-selection or not.
   * When this is true, the listbox is kept open when an option is selected
   * and the value must be an array.
   * Defaults to false.
   */
  multiple: boolean;
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
  multiple,
  listboxOverflow = 'truncate',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  /* eslint-disable-next-line no-prototype-builtins */
  listboxAsPopover = HTMLElement.prototype.hasOwnProperty('popover'),
}: SelectMainProps<T>) {
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
    (value: unknown, options: SelectValueOptions) => {
      onChange(value as any);
      if (options.closeListbox) {
        closeListbox();
      }
    },
    [onChange, closeListbox],
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
        { 'border-grey-5': listboxOpen },
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
          listboxOverflow,
        }}
      >
        <ul
          className={classnames(
            'absolute z-5 max-h-80 overflow-y-auto overflow-x-hidden',
            // We don't want the listbox to ever render outside the viewport,
            // and we give it a 16px gap
            'max-w-[calc(100%-16px)]',
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

export const Select = Object.assign(
  // eslint-disable-next-line prefer-arrow-callback
  function <T>(props: SelectProps<T>) {
    // Calling the function directly instead of returning a JSX element, to
    // avoid an unnecessary extra layer in the component tree
    // eslint-disable-next-line new-cap
    return SelectMain({ ...props, multiple: false });
  },
  { Option: SelectOption, displayName: 'Select' },
);

export const MultiSelect = Object.assign(
  // eslint-disable-next-line prefer-arrow-callback
  function <T>(props: MultiSelectProps<T>) {
    // Calling the function directly instead of returning a JSX element, to
    // avoid an unnecessary extra layer in the component tree
    // eslint-disable-next-line new-cap
    return SelectMain({ ...props, multiple: true });
  },
  { Option: SelectOption, displayName: 'MultiSelect' },
);
