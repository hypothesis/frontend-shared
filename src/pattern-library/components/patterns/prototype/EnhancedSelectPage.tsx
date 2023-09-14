import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'preact/hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/icons';
import { IconButton, InputGroup } from '../../../../components/input';
import Select from '../../../../components/input/SelectNext';
import Library from '../../Library';

const items = [
  { id: 1, name: 'All students' },
  { id: 2, name: 'Albert Banana' },
  { id: 3, name: 'Bernard California' },
  { id: 4, name: 'Cecelia Davenport' },
  { id: 5, name: 'Doris Evanescence' },
];

function Select_({
  disabled,
  textOnly,
  theItems = items,
}: {
  disabled?: boolean;
  textOnly?: boolean;
  theItems?: typeof items;
}) {
  const [selected, setSelected] = useState<(typeof theItems)[number]>();

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
      {theItems.map(item => (
        <Select.Option value={item} key={item.id}>
          {() =>
            textOnly ? (
              <>{item.name}</>
            ) : (
              <>
                {item.name}
                <div className="grow" />
                <div className="rounded px-2 bg-grey-7 text-white">
                  {item.id}
                </div>
              </>
            )
          }
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
              {({ disabled }) => (
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

        <Library.Pattern title="Plain text Select">
          <Select_ textOnly />
        </Library.Pattern>

        <Library.Pattern title="Disabled Select">
          <Select_ disabled />
        </Library.Pattern>

        <Library.Pattern title="Select with many options">
          <Select_
            theItems={[
              ...items,
              ...items,
              ...items,
              ...items,
              ...items,
              ...items,
            ]}
          />
        </Library.Pattern>

        <Library.Pattern title="Inside an InputGroup">
          <InputGroupSelect_ />
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
