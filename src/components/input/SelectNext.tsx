import classnames from 'classnames';
import type { ComponentChildren, RefObject } from 'preact';
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

const LISTBOX_TOGGLE_GAP = '.25rem';

type ListboxCSSProps =
  | 'top'
  | 'left'
  | 'minWidth'
  | 'marginBottom'
  | 'bottom'
  | 'marginTop';

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
     * Sets some CSS props in the listbox, and returns a cleanup function that
     * resets them to their default values.
     */
    const setListboxCSSProps = (
      props: Partial<Record<ListboxCSSProps, string>>,
    ) => {
      const entries = Object.entries(props) as Array<[ListboxCSSProps, string]>;
      entries.forEach(([prop, value]) => (listboxEl.style[prop] = value));

      return () => entries.map(([prop]) => (listboxEl.style[prop] = ''));
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

  /**
   * Test seam.
   * Used to determine if current browser supports native popovers.
   * Defaults to `'popover' in document.body`
   */
  nativePopoverSupported?: boolean;
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

  /* istanbul ignore next - test seam */
  nativePopoverSupported = 'popover' in document.body,
}: SelectProps<T>) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLUListElement | null>(null);
  const [listboxOpen, setListboxOpen] = useState(false);
  const toggleListbox = useCallback(
    (open: boolean) => {
      setListboxOpen(open);
      if (nativePopoverSupported) {
        listboxRef.current?.togglePopover(open);
      }
    },
    [nativePopoverSupported],
  );
  const closeListbox = useCallback(() => toggleListbox(false), [toggleListbox]);
  const listboxId = useId();
  const buttonRef = useSyncedRef(elementRef);
  const defaultButtonId = useId();
  const extraProps = useMemo(
    () => (nativePopoverSupported ? { popover: true } : {}),
    [nativePopoverSupported],
  );

  useListboxPositioning(
    buttonRef,
    listboxRef,
    listboxOpen,
    nativePopoverSupported,
    right,
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
      <SelectContext.Provider value={{ selectValue, value }}>
        <ul
          {...extraProps}
          className={classnames(
            'absolute z-5 max-h-80 overflow-y-auto',
            'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
            !nativePopoverSupported && {
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
          aria-labelledby={buttonId ?? defaultButtonId}
          aria-orientation="vertical"
          data-testid="select-listbox"
          data-listbox-open={listboxOpen}
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
