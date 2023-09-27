import classnames from 'classnames';
import type { ComponentChildren } from 'preact';
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
import { useShouldBePositionedAbove } from '../../hooks/use-should-be-positioned-above';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import { MenuCollapseIcon, MenuExpandIcon } from '../icons';
import Button from './Button';
import SelectContext from './SelectContext';

export type SelectOptionStatus = {
  selected: boolean;
  disabled: boolean;
};

export type SelectOptionProps<T> = {
  value: T;
  disabled?: boolean;
  children: (status: SelectOptionStatus) => ComponentChildren;
  classes?: string | string[];
};

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
    <Button
      variant="custom"
      classes={classnames(
        'w-full ring-inset rounded-none !p-0',
        'border-t first:border-t-0 bg-transparent',
        { 'hover:bg-grey-1': !disabled },
        classes,
      )}
      onClick={() => selectValue(value)}
      role="option"
      disabled={disabled}
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
        {children({ selected, disabled })}
      </div>
    </Button>
  );
}

export type SelectProps<T> = PresentationalProps & {
  value: T;
  onChange: (newValue: T) => void;
  label: ComponentChildren;
  disabled?: boolean;
};

function SelectMain<T>({
  label,
  value,
  onChange,
  children,
  disabled,
  classes,
  elementRef,
}: SelectProps<T>) {
  const [listboxOpen, setListboxOpen] = useState(false);
  const closeListbox = useCallback(() => setListboxOpen(false), []);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const buttonRef = useSyncedRef(elementRef);
  const buttonId = useId();
  const shouldListboxDropUp = useShouldBePositionedAbove(
    buttonRef.current ?? null,
    listboxRef.current,
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
  useArrowKeyNavigation(wrapperRef, { horizontal: false, loop: false });

  useLayoutEffect(() => {
    // Focus toggle button after closing listbox, only if previously focused
    // element was inside the listbox itself
    if (!listboxOpen && listboxRef.current!.contains(document.activeElement)) {
      buttonRef.current!.focus();
    }
  }, [buttonRef, listboxOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        id={buttonId}
        variant="custom"
        classes={classnames(
          'w-full flex border rounded',
          'bg-grey-0 disabled:bg-grey-1 disabled:text-grey-6',
          classes,
        )}
        expanded={listboxOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        elementRef={buttonRef}
        onClick={() => setListboxOpen(prev => !prev)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' && !listboxOpen) {
            setListboxOpen(true);
          }
        }}
        data-testid="select-toggle-button"
      >
        {label}
        <div className="grow" />
        <div className="text-grey-6">
          {listboxOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
        </div>
      </Button>
      <SelectContext.Provider value={{ selectValue, value }}>
        <div
          className={classnames(
            'absolute z-5 w-full max-h-80 overflow-y-auto',
            'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
            {
              'top-full mt-1': !shouldListboxDropUp,
              'bottom-full mb-1': shouldListboxDropUp,

              // Hiding instead of unmounting to
              // * Ensure screen readers detect button as a listbox handler
              // * Listbox size can be computed to correctly drop up or down
              hidden: !listboxOpen,
            },
          )}
          role="listbox"
          ref={listboxRef}
          id={listboxId}
          aria-labelledby={buttonId}
          aria-orientation="vertical"
          data-testid="select-listbox"
        >
          {children}
        </div>
      </SelectContext.Provider>
    </div>
  );
}

const SelectNext = Object.assign(SelectMain, { Option: SelectOption });

export default SelectNext;
