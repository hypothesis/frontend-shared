import classnames from 'classnames';
import { useCallback, useMemo, useState } from 'preact/hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/icons';
import { IconButton, InputGroup } from '../../../../components/input';
import SelectNext from '../../../../components/input/SelectNext';
import Library from '../../Library';

const defaultItems = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];
const longListOfItems = [
  ...defaultItems.map(({ id, name }) => ({
    id: `1${id}`,
    name: `1 ${name}`,
  })),
  ...defaultItems.map(({ id, name }) => ({
    id: `2${id}`,
    name: `2 ${name}`,
  })),
  ...defaultItems.map(({ id, name }) => ({
    id: `3${id}`,
    name: `3 ${name}`,
  })),
  ...defaultItems.map(({ id, name }) => ({
    id: `4${id}`,
    name: `4 ${name}`,
  })),
  ...defaultItems.map(({ id, name }) => ({
    id: `5${id}`,
    name: `5 ${name}`,
  })),
  ...defaultItems.map(({ id, name }) => ({
    id: `6${id}`,
    name: `6 ${name}`,
  })),
];

function SelectOptionExample({
  item,
  textOnly,
}: {
  item: (typeof defaultItems)[number];
  textOnly: boolean;
}) {
  return (
    <SelectNext.Option value={item}>
      {() =>
        textOnly ? (
          <>{item.name}</>
        ) : (
          <>
            {item.name}
            <div className="grow" />
            <div className="rounded px-2 bg-grey-7 text-white">{item.id}</div>
          </>
        )
      }
    </SelectNext.Option>
  );
}

function SelectExample({
  disabled,
  textOnly = false,
  filterable,
  items = defaultItems,
}: {
  disabled?: boolean;
  textOnly?: boolean;
  filterable?: boolean;
  items?: typeof defaultItems;
}) {
  const [value, setValue] = useState<(typeof items)[number]>();
  const onFilter = useCallback(
    (query: string, value: (typeof items)[number]) =>
      value.name.toLowerCase().includes(query.toLowerCase()),
    [],
  );

  return (
    <SelectNext
      value={value}
      onChange={setValue}
      buttonContent={
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
      {!filterable &&
        items.map(item => (
          <SelectOptionExample item={item} textOnly={textOnly} key={item.id} />
        ))}
      {filterable && (
        <>
          {/* Render a couple options before filterable to demonstrate stickiness */}
          <SelectOptionExample item={items[0]} textOnly={textOnly} />
          <SelectOptionExample item={items[1]} textOnly={textOnly} />

          {/* Render two filterable blocks to demonstrate sections filtering */}
          <SelectNext.Filterable onFilter={onFilter}>
            {items
              .slice(2)
              .splice(0, items.length / 2 - 2)
              .map(item => (
                <SelectOptionExample
                  item={item}
                  textOnly={textOnly}
                  key={item.id}
                />
              ))}
          </SelectNext.Filterable>
          <SelectNext.Filterable onFilter={onFilter}>
            {items
              .slice(2)
              .splice(items.length / 2 - 2 + 1)
              .map(item => (
                <SelectOptionExample
                  item={item}
                  textOnly={textOnly}
                  key={item.id}
                />
              ))}
          </SelectNext.Filterable>
        </>
      )}
    </SelectNext>
  );
}

function InputGroupSelectExample() {
  const [selected, setSelected] = useState<(typeof defaultItems)[number]>();
  const selectedIndex = useMemo(
    () => (!selected ? -1 : defaultItems.findIndex(item => item === selected)),
    [selected],
  );
  const next = useCallback(() => {
    const newIndex = selectedIndex + 1;
    setSelected(defaultItems[newIndex] ?? selected);
  }, [selected, selectedIndex]);
  const previous = useCallback(() => {
    const newIndex = selectedIndex - 1;
    setSelected(defaultItems[newIndex] ?? selected);
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
      <SelectNext
        value={selected}
        onChange={setSelected}
        buttonContent={
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
        {defaultItems.map(item => (
          <SelectNext.Option value={item} key={item.id}>
            {() => (
              <>
                {item.name}
                <div className="grow" />
                <div
                  className={classnames('rounded px-2 text-white bg-grey-7')}
                >
                  {item.id}
                </div>
              </>
            )}
          </SelectNext.Option>
        ))}
      </SelectNext>
      <IconButton
        icon={ArrowRightIcon}
        title="Next student"
        variant="dark"
        onClick={next}
        disabled={selectedIndex >= defaultItems.length - 1}
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
              <div className="w-96 mx-auto">
                <SelectExample textOnly />
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
                <SelectExample />
              </div>
            </Library.Demo>

            <Library.Demo title="Select in InputGroup">
              <div className="w-96">
                <InputGroupSelectExample />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Select with many options">
            <Library.Demo title="Select with many options">
              <div className="w-96 mx-auto">
                <SelectExample items={longListOfItems} />
              </div>
            </Library.Demo>
            <Library.Demo title="Select with filtering">
              <div className="w-96 mx-auto">
                <SelectExample items={longListOfItems} filterable />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Disabled Select">
            <Library.Demo title="Disabled Select">
              <div className="w-96 mx-auto">
                <SelectExample disabled />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>SelectNext</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          <Library.Example title="buttonContent">
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
          <Library.Example title="buttonId">
            <Library.Info>
              <Library.InfoItem label="description">
                The toggle button{"'"}s <code>id</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
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
      buttonContent={
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
