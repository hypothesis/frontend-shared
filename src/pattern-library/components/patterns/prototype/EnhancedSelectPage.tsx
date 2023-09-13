import classnames from 'classnames';
import type { ComponentChildren, Context } from 'preact';
import { createContext } from 'preact';
import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MenuCollapseIcon,
  MenuExpandIcon,
} from '../../../../components/icons';
import { IconButton, InputGroup } from '../../../../components/input';
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
      >
        {label}
        <div className="grow" />
        {isDropdownOpen ? <MenuCollapseIcon /> : <MenuExpandIcon />}
      </Button>
      <Provider value={{ selectValue, selected }}>
        {isDropdownOpen && (
          <div
            className="absolute top-full w-full mt-1 rounded bg-grey-0 z-5 overflow-hidden border"
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
  disabled = false,
}: {
  value: T;
  disabled?: boolean;
  children: (status: {
    isSelected: boolean;
    disabled: boolean;
  }) => ComponentChildren;
}) {
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

Object.assign(Select, { Option: SelectOption });

function Select_({ disabled }: { disabled?: boolean }) {
  const [selected, setSelected] = useState<(typeof items)[number]>();

  return (
    <Select
      selected={selected}
      onChange={setSelected}
      label={
        selected ? (
          <>
            {selected.name}
            <div className="rounded px-2 bg-grey-7 text-white">
              {selected.id}
            </div>
          </>
        ) : (
          <>Select one...</>
        )
      }
      disabled={disabled}
    >
      {items.map(item => (
        <Select.Option value={item} key={item.id}>
          {() => (
            <>
              {item.name}
              <div className="grow" />
              <div className="rounded px-2 bg-grey-7 text-white">{item.id}</div>
            </>
          )}
        </Select.Option>
      ))}
    </Select>
  );
}

function InputGroupSelect_() {
  const [selected, setSelected] = useState<(typeof items)[number]>();
  const selectedIndex = useMemo(
    () => (!selected ? -1 : items.findIndex(item => item === selected)),
    [selected],
  );
  const next = useCallback(() => {
    const newIndex = selectedIndex + 1;
    setSelected(items[newIndex] ?? selected);
  }, [selected, selectedIndex]);
  const previous = useCallback(() => {
    const newIndex = selectedIndex - 1;
    setSelected(items[newIndex] ?? selected);
  }, [selected, selectedIndex]);

  return (
    <InputGroup>
      <IconButton
        icon={ArrowLeftIcon}
        title="Previous student"
        variant="dark"
        onClick={previous}
        disabled={selectedIndex <= 0}
      />
      <div className="w-[350px]">
        <Select
          selected={selected}
          onChange={setSelected}
          label={
            selected ? (
              <>
                {selected.name}
                <div className="rounded px-2 bg-grey-7 text-white">
                  {selected.id}
                </div>
              </>
            ) : (
              <>Select one...</>
            )
          }
        >
          {items.map(item => (
            <Select.Option value={item} key={item.id} disabled={item.id === 4}>
              {({ disabled }: { disabled: boolean }) => (
                <>
                  <span
                    className={
                      disabled ? 'line-through text-grey-6' : undefined
                    }
                  >
                    {item.name}
                  </span>
                  <div className="grow" />
                  <div
                    className={classnames('rounded px-2 text-white', {
                      'bg-grey-7': !disabled,
                      'bg-grey-4': disabled,
                    })}
                  >
                    {item.id}
                  </div>
                </>
              )}
            </Select.Option>
          ))}
        </Select>
      </div>
      <IconButton
        icon={ArrowRightIcon}
        title="Next student"
        variant="dark"
        onClick={next}
        disabled={selectedIndex >= items.length - 1}
      />
    </InputGroup>
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

        <Library.Pattern title="Inside an InputGroup">
          <InputGroupSelect_ />
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
