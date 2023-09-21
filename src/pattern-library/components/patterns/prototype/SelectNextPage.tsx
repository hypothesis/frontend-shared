import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'preact/hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/icons';
import { IconButton, InputGroup } from '../../../../components/input';
import Select from '../../../../components/input/SelectNext';
import Library from '../../Library';

const items = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
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
  const [value, setValue] = useState<(typeof theItems)[number]>();

  return (
    <Select
      value={value}
      onChange={setValue}
      label={
        value ? (
          <>
            {value.name}
            {!textOnly && (
              <div className="rounded px-2 bg-grey-7 text-white">
                {value.id}
              </div>
            )}
          </>
        ) : disabled ? (
          <>This is disabled</>
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
    setSelected(
      (items[newIndex]?.id === '4' ? items[newIndex + 1] : items[newIndex]) ??
        selected,
    );
  }, [selected, selectedIndex]);
  const previous = useCallback(() => {
    const newIndex = selectedIndex - 1;
    setSelected(
      (items[newIndex]?.id === '4' ? items[newIndex - 1] : items[newIndex]) ??
        selected,
    );
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
      <div className="w-full">
        <Select
          value={selected}
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
            <Select.Option
              value={item}
              key={item.id}
              disabled={item.id === '4'}
            >
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

export default function SelectNextPage() {
  return (
    <Library.Page
      title="SelectNext"
      intro={
        <p>
          <code>SelectNext</code> is a presentational component which behaves
          like the native <code>{'<select>'}</code> element.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="SelectNext" />

          <Library.Example>
            <Library.Demo title="Basic Select">
              <div className="w-[350px] mx-auto">
                <Select_ textOnly />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with SelectNext">
          <p>
            <code>SelectNext</code> toggles a listbox where <code>Options</code>
            {"'"} UI can be customized and values can be objects.
          </p>

          <Library.Example title="Composing and styling Selects">
            <Library.Demo title="Select with custom Options">
              <div className="w-96">
                <Select_ />
              </div>
            </Library.Demo>

            <Library.Demo title="Select in InputGroup">
              <div className="w-96">
                <InputGroupSelect_ />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Select with many options">
            <Library.Demo title="Select with many options">
              <div className="w-[350px] mx-auto">
                <Select_
                  theItems={[
                    ...items.map(({ id, name }) => ({
                      id: `1${id}`,
                      name: `1 ${name}`,
                    })),
                    ...items.map(({ id, name }) => ({
                      id: `2${id}`,
                      name: `2 ${name}`,
                    })),
                    ...items.map(({ id, name }) => ({
                      id: `3${id}`,
                      name: `3 ${name}`,
                    })),
                    ...items.map(({ id, name }) => ({
                      id: `4${id}`,
                      name: `4 ${name}`,
                    })),
                    ...items.map(({ id, name }) => ({
                      id: `5${id}`,
                      name: `5 ${name}`,
                    })),
                    ...items.map(({ id, name }) => ({
                      id: `6${id}`,
                      name: `6 ${name}`,
                    })),
                  ]}
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Disabled Select">
            <Library.Demo title="Disabled Select">
              <div className="w-[350px] mx-auto">
                <Select_ disabled />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>SelectNext</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          <Library.Example title="label">
            <Library.Info>
              <Library.InfoItem label="description">
                The content to be displayed in the toggle button.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="value">
            <Library.Info>
              <Library.InfoItem label="description">
                Represents currently selected Option.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>T</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="onChange">
            <Library.Info>
              <Library.InfoItem label="description">
                A callback invoked every time selected value changes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>(newValue: T) =&gt; void</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="disabled">
            <Library.Info>
              <Library.InfoItem label="description">
                Whether the Select is disabled or not.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="How to use it">
          <p>
            <code>SelectNext</code> is meant to be used as a controlled
            component.
          </p>

          <Library.Code
            content={`function App() {
  const [value, setSelected] = useState<{ id: string; name: string }>();

  return (
    <SelectNext
      value={value}
      onChange={setSelected}
      label={
        value ? (
          <>
            {value.name}
            <div className="rounded px-2 bg-grey-7 text-white">
              {value.id}
            </div>
          </>
        ) : (
          <>Select one...</>
        )
      }
    >
      {items.map(item => (
        <SelectNext.Option value={item} key={item.id}>
          {() => (
            <>
              {item.name}
              <div className="grow" />
              <div className="rounded px-2 bg-grey-7 text-white">
                {item.id}
              </div>
            </>
          )}
        </SelectNext.Option>
      ))}
    </SelectNext>
  );
}`}
          />
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
