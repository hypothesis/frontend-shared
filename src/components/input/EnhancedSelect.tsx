import classnames from 'classnames';
import type { ComponentChildren, Context } from 'preact';
import { createContext } from 'preact';
import { useCallback, useContext, useId, useRef, useState } from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { useClickAway } from '../../hooks/use-click-away';
import { useKeyPress } from '../../hooks/use-key-press';
import { MenuCollapseIcon, MenuExpandIcon } from '../icons';
import Button from './Button';

type EnhancedSelectContextType<T = unknown> = {
  selectValue: (newValue: T) => void;
  selected: T;
};

const EnhancedSelectContext = createContext<EnhancedSelectContextType | null>(
  null,
);

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
  const { Provider } = EnhancedSelectContext as Context<
    EnhancedSelectContextType<T>
  >;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
  const selectValue = useCallback(
    (newValue: T) => {
      onChange(newValue);
      setIsDropdownOpen(false);
    },
    [onChange],
  );
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useId();
  const buttonId = useId();

  // When clicking away or pressing `Esc`, close the dropdown
  useClickAway(wrapperRef, closeDropdown);
  useKeyPress(['Escape'], closeDropdown);

  // Vertical arrow key for options in the dropdown
  useArrowKeyNavigation(wrapperRef, {
    horizontal: false,
  });

  return (
    <div className="relative" ref={wrapperRef}>
      <Button
        id={buttonId}
        variant="custom"
        classes={classnames(
          'w-full flex border',
          'bg-grey-0 disabled:bg-grey-1 disabled:text-grey-6',
        )}
        onClick={() => setIsDropdownOpen(prev => !prev)}
        expanded={isDropdownOpen}
        pressed={isDropdownOpen}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
      >
        {label}
        <div className="grow" />
        {isDropdownOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
      </Button>
      <Provider value={{ selectValue, selected }}>
        {isDropdownOpen && (
          <div
            className={classnames(
              'absolute z-5 top-full mt-1 w-full',
              'rounded border bg-grey-0 overflow-hidden',
            )}
            role="listbox"
            id={listboxId}
            aria-labelledby={buttonId}
            aria-orientation="vertical"
          >
            {children}
          </div>
        )}
      </Provider>
    </div>
  );
}

type SelectOptionProps<T> = {
  value: T;
  disabled?: boolean;
  children: (status: {
    isSelected: boolean;
    disabled: boolean;
  }) => ComponentChildren;
};

function Option<T>({
  value,
  children,
  disabled = false,
}: SelectOptionProps<T>) {
  const { selectValue, selected } = useContext(
    EnhancedSelectContext,
  ) as EnhancedSelectContextType<T>;
  const isSelected = !disabled && selected === value;

  return (
    <Button
      variant="custom"
      classes={classnames(
        'w-full ring-inset rounded-none',
        'border-t first:border-t-0 border-l-4 bg-grey-0',
        {
          'border-l-transparent': !isSelected,
          'border-l-brand font-medium': isSelected,
          'hover:bg-grey-1': !disabled,
        },
      )}
      onClick={() => selectValue(value)}
      role="option"
      pressed={isSelected}
      aria-selected={isSelected}
      disabled={disabled}
      // This is intended to be interacted with arrow keys
      tabIndex={-1}
    >
      {children({ isSelected, disabled })}
    </Button>
  );
}

const Select = Object.assign(SelectMain, { Option });

export default Select;
