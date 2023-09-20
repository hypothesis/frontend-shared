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

export type SelectProps<T> = {
  selected: T;
  onChange: (newValue: T) => void;
  label: ComponentChildren;
  children: ComponentChildren;
  disabled?: boolean;
};

function SelectMain<T>({
  label,
  selected,
  onChange,
  children,
  disabled,
}: SelectProps<T>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const buttonId = useId();
  const [shouldDropUp, setShouldDropUp] = useState(false);

  const selectValue = useCallback(
    (newValue: unknown) => {
      onChange(newValue as T);
      closeDropdown();
    },
    [closeDropdown, onChange],
  );

  // When clicking away or pressing `Esc`, close the dropdown
  useClickAway(wrapperRef, closeDropdown);
  useKeyPress(['Escape'], closeDropdown);

  // Vertical arrow key for options in the dropdown
  useArrowKeyNavigation(wrapperRef, { horizontal: false });

  // Focus button after closing dropdown
  useLayoutEffect(() => {
    if (!isDropdownOpen) {
      buttonRef.current!.focus();
    }
  }, [isDropdownOpen]);

  if (isDropdownOpen) {
    const viewportHeight = window.innerHeight;
    const { top: buttonDistanceToTop, height } =
      buttonRef.current!.getBoundingClientRect();
    const buttonDistanceToBottom =
      viewportHeight - (buttonDistanceToTop + height);

    // The listbox should drop up only if there's not enough space below it for
    // the listbox max height, and there's also more space above
    setShouldDropUp(
      // 320px is tailwind's h-80. e should try not to couple with this
      buttonDistanceToBottom < 320 &&
        buttonDistanceToTop > buttonDistanceToBottom,
    );
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        id={buttonId}
        variant="custom"
        classes={classnames(
          'w-full flex border',
          'bg-grey-0 disabled:bg-grey-1 disabled:text-grey-6',
        )}
        expanded={isDropdownOpen}
        pressed={isDropdownOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        elementRef={buttonRef}
        onClick={() => setIsDropdownOpen(prev => !prev)}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' && !isDropdownOpen) {
            setIsDropdownOpen(true);
          }
        }}
      >
        {label}
        <div className="grow" />
        {isDropdownOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
      </Button>
      <SelectContext.Provider value={{ selectValue, selected }}>
        {isDropdownOpen && (
          <div
            className={classnames(
              'absolute z-5 w-full max-h-80 overflow-y-auto',
              'rounded border bg-white shadow hover:shadow-md focus-within:shadow-md',
              {
                'top-full mt-1': !shouldDropUp,
                'bottom-full mb-1': shouldDropUp,
              },
            )}
            role="listbox"
            id={listboxId}
            aria-labelledby={buttonId}
            aria-orientation="vertical"
          >
            {children}
          </div>
        )}
      </SelectContext.Provider>
    </div>
  );
}

export type SelectOptionProps<T> = {
  value: T;
  disabled?: boolean;
  children: (status: {
    isSelected: boolean;
    disabled: boolean;
  }) => ComponentChildren;
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

  const { selectValue, selected } = selectContext;
  const isSelected = !disabled && selected === value;

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
      pressed={isSelected}
      aria-selected={isSelected}
      // This is intended to be focused with arrow keys
      tabIndex={-1}
    >
      <div
        className={classnames('flex w-full p-1.5 border-l-4', {
          'border-l-transparent': !isSelected,
          'border-l-brand font-medium': isSelected,
        })}
      >
        {children({ isSelected, disabled })}
      </div>
    </Button>
  );
}

const SelectNext = Object.assign(SelectMain, { Option: SelectOption });

export default SelectNext;
