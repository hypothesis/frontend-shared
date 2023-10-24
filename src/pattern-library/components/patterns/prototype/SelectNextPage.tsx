import classnames from 'classnames';
import { useCallback, useId, useMemo, useState } from 'preact/hooks';

import { ArrowLeftIcon, ArrowRightIcon } from '../../../../components/icons';
import type { SelectNextProps } from '../../../../components/input';
import { IconButton, InputGroup } from '../../../../components/input';
import SelectNext from '../../../../components/input/SelectNext';
import Library from '../../Library';

type ItemType = {
  id: string;
  name: string;
  disabled?: boolean;
};

const defaultItems: ItemType[] = [
  { id: '1', name: 'All students' },
  { id: '2', name: 'Albert Banana' },
  { id: '3', name: 'Bernard California' },
  { id: '4', name: 'Cecelia Davenport' },
  { id: '5', name: 'Doris Evanescence' },
];

function SelectExample({
  disabled,
  textOnly,
  items = defaultItems,
  ...rest
}: Pick<
  SelectNextProps<ItemType>,
  'aria-label' | 'aria-labelledby' | 'classes' | 'disabled'
> & {
  textOnly?: boolean;
  items?: ItemType[];
}) {
  const [value, setValue] = useState<ItemType>();
  const buttonId = useId();

  return (
    <>
      {!rest['aria-label'] && !rest['aria-labelledby'] && (
        <label htmlFor={buttonId}>Select a person</label>
      )}
      <SelectNext
        {...rest}
        buttonId={buttonId}
        value={value}
        onChange={setValue}
        disabled={disabled}
        buttonContent={
          value ? (
            <>
              {textOnly && value.name}
              {!textOnly && (
                <div className="flex">
                  <div className="truncate">{value.name}</div>
                  <div className="rounded px-2 ml-2 bg-grey-7 text-white">
                    {value.id}
                  </div>
                </div>
              )}
            </>
          ) : disabled ? (
            <>This is disabled</>
          ) : (
            <>Select one…</>
          )
        }
      >
        {items.map(item => (
          <SelectNext.Option
            value={item}
            key={item.id}
            disabled={item.disabled}
          >
            {({ disabled }) =>
              textOnly ? (
                item.name
              ) : (
                <>
                  {item.name}
                  <div className="grow" />
                  <div
                    className={classnames('rounded px-2 ml-2 text-white', {
                      'bg-grey-7': !disabled,
                      'bg-grey-4': disabled,
                    })}
                  >
                    {item.id}
                  </div>
                </>
              )
            }
          </SelectNext.Option>
        ))}
      </SelectNext>
    </>
  );
}

function InputGroupSelectExample({ classes }: { classes?: string }) {
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
  const buttonId = useId();

  return (
    <>
      <label htmlFor={buttonId}>Select a person</label>
      <InputGroup>
        <IconButton
          icon={ArrowLeftIcon}
          title="Previous student"
          variant="dark"
          onClick={previous}
          disabled={selectedIndex <= 0}
        />
        <SelectNext
          buttonId={buttonId}
          value={selected}
          onChange={setSelected}
          classes={classes}
          buttonContent={
            selected ? (
              <div className="flex">
                <div className="truncate">{selected.name}</div>
                <div className="rounded px-2 ml-2 bg-grey-7 text-white">
                  {selected.id}
                </div>
              </div>
            ) : (
              <>Select one…</>
            )
          }
        >
          {defaultItems.map(item => (
            <SelectNext.Option value={item} key={item.id}>
              {item.name}
              <div className="grow" />
              <div
                className={classnames('rounded px-2 ml-2 text-white bg-grey-7')}
              >
                {item.id}
              </div>
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
    </>
  );
}

export default function SelectNextPage() {
  return (
    <Library.Page
      title="SelectNext"
      intro={
        <p>
          <code>SelectNext</code> is a component that behaves like a combobox.
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

            <Library.Code
              title="Basic select usage"
              content={`function App({ items }: { items: string[] }) {
  const [value, setSelected] = useState<string>();

  return (
    <SelectNext
      value={value}
      onChange={setSelected}
      buttonContent={value ?? 'Select one…'}
    >
      {items.map(item => (
        <SelectNext.Option value={item} key={item}>
          {item}
        </SelectNext.Option>
      ))}
    </SelectNext>
  );
}`}
            />
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

            <Library.Code
              title="Custom options usage"
              content={`type ItemType = {
  id: string;
  name: string;
};

function ItemOption({ item }: { item: ItemType }) {
  return (
    <div className="flex">
      <div className="truncate">{item.name}</div>
      <div className="rounded px-2 ml-2 bg-grey-7 text-white">
        {item.id}
      </div>
    </div>
  )
}

function App({ items }: { items: ItemType[] }) {
  const [value, setSelected] = useState<ItemType>();

  return (
    <SelectNext
      value={value}
      onChange={setSelected}
      buttonContent={!value ? 'Select one…' : <ItemOption item={value} />}
    >
      {items.map(item => (
        <SelectNext.Option value={item} key={item}>
          <ItemOption item={item} />
        </SelectNext.Option>
      ))}
    </SelectNext>
  );
}`}
            />

            <Library.Demo title="Select in InputGroup">
              <div className="w-96">
                <InputGroupSelectExample />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Select with many options">
            <p>
              <code>SelectNext</code> renders a scrollable listbox with a
              limited height.
            </p>
            <p>
              The listbox automatically drops up or down, depending on the
              amount of available viewport space.
            </p>

            <Library.Demo title="Select with many options">
              <div className="w-96 mx-auto">
                <SelectExample
                  items={[
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
                  ]}
                />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Labeling SelectNext">
            <p>
              There are three ways to label a <code>SelectNext</code>. Make sure
              you always use one of them.
            </p>
            <Library.Demo
              title={
                <>
                  Via{' '}
                  <code>
                    {'<'}label {'/>'}
                  </code>{' '}
                  linked to <code>buttonId</code>
                </>
              }
            >
              <div className="w-96 mx-auto">
                <SelectExample />
              </div>
            </Library.Demo>
            <Library.Code
              title={`Labeling with label[htmlFor="buttonId"]`}
              content={`function App() {
  const buttonId = useId();

  return (
    <>
      <label htmlFor={buttonId}>Select a person</label>
      <SelectNext buttonId={buttonId} ... />
    </>
  );
}`}
            />

            <Library.Demo title="Via aria-label">
              <div className="w-96 mx-auto">
                <SelectExample aria-label="Select a person with aria label" />
              </div>
            </Library.Demo>
            <Library.Code
              title="Labeling with aria-label"
              content={`function App() {
  return (
    <SelectNext aria-label="Select a person with aria label" ... />
  );
}`}
            />

            <Library.Demo title="Via aria-labelledby">
              <div className="w-96 mx-auto">
                <p id="select-next-meta-label">
                  Select a person with aria labelledby
                </p>
                <SelectExample aria-labelledby="select-next-meta-label" />
              </div>
            </Library.Demo>
            <Library.Code
              title="Labeling with aria-labelledby"
              content={`function App() {
  const paragraphId = useId();

  return (
    <>
      <p id={paragraphId}>Select a person with aria labelledby</p>
      <SelectNext aria-labelledby={buttonId} ... />
    </>
  );
}`}
            />
          </Library.Example>

          <Library.Example title="Select with long content">
            <p>
              <code>SelectNext</code> makes sure the button content never
              overflows, and applies <code>text-overflow: ellipsis</code>.
            </p>
            <p>
              If you provide more complex children to <code>buttonContent</code>
              , and the default hidden overflow logic does not work for your use
              case, it is up to you to handle the overflow logic in your
              components.
            </p>
            <p>
              On the other hand, the listbox will always grow to fit its
              options.
            </p>

            <Library.Demo title="Plain text">
              <div className="mx-auto">
                <SelectExample textOnly classes="!w-36" />
              </div>
            </Library.Demo>

            <Library.Demo title="Custom options">
              <div className="mx-auto">
                <SelectExample classes="!w-36" />
              </div>
            </Library.Demo>

            <Library.Demo title="Input group">
              <div className="mx-auto">
                <InputGroupSelectExample classes="!w-36" />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="SelectNext component API">
          <code>SelectNext</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
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
            <Library.Demo title="Disabled Select">
              <div className="w-96 mx-auto">
                <SelectExample disabled />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="SelectNext.Option component API">
          <Library.Example title="value">
            <Library.Info>
              <Library.InfoItem label="description">
                The value to set when this option is selected.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>T</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="children">
            <Library.Info>
              <Library.InfoItem label="description">
                Content of the option. You can pass a callback to receive the
                option status (<code>disabled</code> and <code>selected</code>).
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  ComponentChildren | (({'{'} disabled, selected {'}'}) {'=>'}{' '}
                  ComponentChildren)
                </code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Code
              title="Children as callback"
              content={`function App({ items }: { items: string[] }) {
  const [value, setSelected] = useState<string>();

  return (
    <SelectNext
      value={value}
      onChange={setSelected}
      buttonContent={value ?? 'Select one…'}
    >
      {items.map(item => (
        <SelectNext.Option value={item} key={item}>
          {({ selected, disabled }) => (
            <span
              className={classnames({
                'font-bold': selected,
                'line-through': disabled,
              })}
            >
              {item}
            </span>
          )}
        </SelectNext.Option>
      ))}
    </SelectNext>
  );
}`}
            />
          </Library.Example>
          <Library.Example title="disabled">
            <Library.Info>
              <Library.InfoItem label="description">
                Whether the option is disabled or not.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Disabled options">
              <div className="w-96 mx-auto">
                <SelectExample
                  items={defaultItems.map(item =>
                    item.id !== '4' ? item : { ...item, disabled: true },
                  )}
                />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
