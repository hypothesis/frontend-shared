import classnames from 'classnames';
import type { ComponentChildren, Context } from 'preact';
import { createContext } from 'preact';
import { useCallback, useContext, useRef, useState } from 'preact/hooks';

import { MenuCollapseIcon, MenuExpandIcon } from '../../../../components/icons';
import Button from '../../../../components/input/Button';
import { useArrowKeyNavigation } from '../../../../hooks/use-arrow-key-navigation';
import { useClickAway } from '../../../../hooks/use-click-away';
import { useKeyPress } from '../../../../hooks/use-key-press';
import Library from '../../Library';

type EnhancedSelectContextType<T = unknown> = {
  selectValue: (newValue: T) => void;
  selected: T;
};

const EnhancedSelectContext = createContext<EnhancedSelectContextType | null>(
  null,
);

const items = [
  { id: 1, name: 'All students' },
  { id: 2, name: 'Albert Banana' },
  { id: 3, name: 'Bernard California' },
  { id: 4, name: 'Cecelia Davenport' },
  { id: 5, name: 'Doris Evanescence' },
];

type SelectProps<T> = {
  selected: T;
  onChange: (newValue: T) => void;
  label: ComponentChildren;
  children: ComponentChildren;
  disabled?: boolean;
};

function Select<T>({
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
        classes="w-full flex"
        onClick={() => setIsDropdownOpen(prev => !prev)}
        expanded={isDropdownOpen}
        pressed={isDropdownOpen}
        disabled={disabled}
        aria-haspopup="listbox"
      >
        {label}
        <div className="grow" />
        {isDropdownOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
      </Button>
      <Provider value={{ selectValue, selected }}>
        {isDropdownOpen && (
          <div
            className="absolute top-full w-full mt-1 rounded bg-grey-1 z-5"
            role="listbox"
          >
            {children}
          </div>
        )}
      </Provider>
    </div>
  );
}

function SelectOption<T>({
  value,
  children,
}: {
  value: T;
  children: (isSelected: boolean) => ComponentChildren;
}) {
  const { selectValue, selected } = useContext(
    EnhancedSelectContext,
  ) as EnhancedSelectContextType<T>;
  const isSelected = selected === value;

  return (
    <Button
      classes={classnames('w-full ring-inset bg-', {
        '!bg-brand !enabled:hover:text-white text-grey-2': isSelected,
      })}
      onClick={() => selectValue(value)}
      role="option"
      pressed={isSelected}
      aria-selected={isSelected}
      // This is intended to be interacted with arrow keys
      tabIndex={-1}
    >
      {children(isSelected)}
    </Button>
  );
}

Object.assign(Select, { Option: SelectOption });

function Select_({ disabled }: { disabled?: boolean }) {
  const [selected, setSelected] = useState<(typeof items)[number]>();

  return (
    <Select
      selected={selected}
      onChange={setSelected}
      label={selected?.name ?? 'Select one...'}
      disabled={disabled}
    >
      {items.map(item => (
        <Select.Option value={item} key={item.id}>
          {(isSelected: boolean) => (
            <>
              {item.name}
              <div
                className={classnames('rounded px-2', {
                  'bg-brand hover:text-white text-grey-2': !isSelected,
                  'bg-white text-grey-7': isSelected,
                })}
              >
                {item.id}
              </div>
            </>
          )}
        </Select.Option>
      ))}
    </Select>
  );
}

export default function EnhancedSelectPage() {
  return (
    <Library.Page
      title="Enhanced Select"
      intro={
        <p>
          Experimentation to get an enhanced <code>Select</code> where options
          can be styled.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern title="Select">
          <Select_ />
        </Library.Pattern>
        <Library.Pattern title="Disabled Select">
          <Select_ disabled />
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
