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
import { useKeyPress } from '../../hooks/use-key-press';
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
};

function SelectOption<T>({
  value,
  children,
  disabled = false,
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
      )}
      onClick={() => selectValue(value)}
      role="option"
      disabled={disabled}
      pressed={selected}
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

export type SelectProps<T> = {
  value: T;
  onChange: (newValue: T) => void;
  label: ComponentChildren;
  children?: ComponentChildren;
  disabled?: boolean;
};

function SelectMain<T>({
  label,
  value,
  onChange,
  children,
  disabled,
}: SelectProps<T>) {
  const [isListboxOpen, setIsListboxOpen] = useState(false);
  const [shouldListboxDropUp, setShouldListboxDropUp] = useState(false);
  const closeListbox = useCallback(() => setIsListboxOpen(false), []);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonId = useId();

  const selectValue = useCallback(
    (newValue: unknown) => {
      onChange(newValue as T);
      closeListbox();
    },
    [closeListbox, onChange],
  );

  // When clicking away or pressing `Esc`, close the listbox
  useClickAway(wrapperRef, closeListbox);
  useKeyPress(['Escape'], closeListbox);

  // Vertical arrow key for options in the listbox
  useArrowKeyNavigation(wrapperRef, { horizontal: false });

  useLayoutEffect(() => {
    if (!isListboxOpen) {
      // Focus button after closing listbox
      buttonRef.current!.focus();
      // Reset shouldDropUp so that it does not affect calculations next time
      // it opens
      setShouldListboxDropUp(false);
    } else {
      const viewportHeight = window.innerHeight;
      const { top: buttonDistanceToTop, bottom: buttonBottom } =
        buttonRef.current!.getBoundingClientRect();
      const buttonDistanceToBottom = viewportHeight - buttonBottom;
      const { bottom: listboxBottom } =
        listboxRef.current!.getBoundingClientRect();
      const listboxDistanceToBottom = viewportHeight - listboxBottom;

      // The listbox should drop up only if there's not enough space below it for
      // the listbox max height, and there's also more space above
      setShouldListboxDropUp(
        listboxDistanceToBottom < 0 &&
          buttonDistanceToTop > buttonDistanceToBottom,
      );
    }
  }, [isListboxOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        id={buttonId}
        variant="custom"
        classes={classnames(
          'w-full flex border',
          'bg-grey-0 disabled:bg-grey-1 disabled:text-grey-6',
        )}
        expanded={isListboxOpen}
        pressed={isListboxOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        elementRef={buttonRef}
        onClick={() => setIsListboxOpen(prev => !prev)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' && !isListboxOpen) {
            setIsListboxOpen(true);
          }
        }}
      >
        {label}
        <div className="grow" />
        {isListboxOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
      </Button>
      <SelectContext.Provider value={{ selectValue, value }}>
        <div
          className={classnames(
            'absolute z-5 w-full max-h-80 overflow-y-auto',
            'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
            {
              'top-full mt-1': !shouldListboxDropUp,
              'bottom-full mb-1': shouldListboxDropUp,
              hidden: !isListboxOpen,
            },
          )}
          role="listbox"
          ref={listboxRef}
          id={listboxId}
          aria-labelledby={buttonId}
          aria-orientation="vertical"
        >
          {children}
        </div>
      </SelectContext.Provider>
    </div>
  );
}

const SelectNext = Object.assign(SelectMain, { Option: SelectOption });

export default SelectNext;
