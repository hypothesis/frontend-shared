import classnames from 'classnames';
import type { ComponentChildren, RefObject } from 'preact';
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
import { downcastRef } from '../../util/typing';
import { MenuCollapseIcon, MenuExpandIcon } from '../icons';
import { inputGroupStyles } from './InputGroup';
import SelectContext from './SelectContext';

export type SelectOptionStatus = {
  selected: boolean;
  disabled: boolean;
};

export type SelectOptionProps<T> = {
  value: T;
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

  const { selectValue, value: currentValue } = selectContext;
  const selected = !disabled && currentValue === value;

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
          selectValue(value);
        }
      }}
      onKeyPress={e => {
        if (!disabled && ['Enter', 'Space'].includes(e.code)) {
          e.preventDefault();
          selectValue(value);
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

function useShouldDropUp(
  buttonRef: RefObject<HTMLElement | undefined>,
  listboxRef: RefObject<HTMLElement | null>,
  listboxOpen: boolean,
): boolean {
  const [shouldListboxDropUp, setShouldListboxDropUp] = useState(false);

  useLayoutEffect(() => {
    // Reset shouldListboxDropUp so that it does not affect calculations next
    // time listbox opens
    if (!buttonRef.current || !listboxRef.current || !listboxOpen) {
      setShouldListboxDropUp(false);
      return;
    }

    const viewportHeight = window.innerHeight;
    const { top: buttonDistanceToTop, bottom: buttonBottom } =
      buttonRef.current.getBoundingClientRect();
    const buttonDistanceToBottom = viewportHeight - buttonBottom;
    const { bottom: listboxBottom } =
      listboxRef.current.getBoundingClientRect();
    const listboxDistanceToBottom = viewportHeight - listboxBottom;

    // The listbox should drop up only if there's not enough space below to
    // fit it, and there's also more absolute space above than below
    setShouldListboxDropUp(
      listboxDistanceToBottom < 0 &&
        buttonDistanceToTop > buttonDistanceToBottom,
    );
  }, [buttonRef, listboxRef, listboxOpen]);

  return shouldListboxDropUp;
}

export type SelectProps<T> = CompositeProps & {
  value: T;
  onChange: (newValue: T) => void;
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
  right = false,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SelectProps<T>) {
  const [listboxOpen, setListboxOpen] = useState(false);
  const closeListbox = useCallback(() => setListboxOpen(false), []);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);
  const listboxId = useId();
  const buttonRef = useSyncedRef(elementRef);
  const defaultButtonId = useId();
  const shouldListboxDropUp = useShouldDropUp(
    buttonRef,
    listboxRef,
    listboxOpen,
  );

  const selectValue = useCallback(
    (newValue: unknown) => {
      onChange(newValue as T);
      closeListbox();
    },
    [closeListbox, onChange],
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
        onClick={() => setListboxOpen(prev => !prev)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' && !listboxOpen) {
            e.preventDefault();
            setListboxOpen(true);
          }
        }}
        data-testid="select-toggle-button"
      >
        <div className="truncate">{buttonContent}</div>
        <div className="text-grey-6">
          {listboxOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
        </div>
      </button>
      <SelectContext.Provider value={{ selectValue, value }}>
        <ul
          className={classnames(
            'absolute z-5 min-w-full max-h-80 overflow-y-auto',
            'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
            {
              'top-full mt-1': !shouldListboxDropUp,
              'bottom-full mb-1': shouldListboxDropUp,
              'right-0': right,

              // Hiding instead of unmounting to
              // * Ensure screen readers detect button as a listbox handler
              // * Listbox size can be computed to correctly drop up or down
              hidden: !listboxOpen,
            },
            listboxClasses,
          )}
          role="listbox"
          ref={listboxRef}
          id={listboxId}
          aria-labelledby={buttonId ?? defaultButtonId}
          aria-orientation="vertical"
          data-testid="select-listbox"
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
