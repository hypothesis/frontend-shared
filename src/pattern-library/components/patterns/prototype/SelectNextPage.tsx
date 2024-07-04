import classnames from 'classnames';
import { useId, useState } from 'preact/hooks';

import { Link } from '../../../..';
import type { SelectNextProps } from '../../../../components/input';
import SelectNext from '../../../../components/input/SelectNext';
import SelectNextInInputGroup from '../../../examples/select-next-in-input-group';
import SelectNextWithManyOptions from '../../../examples/select-next-with-custom-options';
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
  textOnly,
  items = defaultItems,
  ...rest
}: Pick<
  SelectNextProps<ItemType>,
  'buttonClasses' | 'containerClasses' | 'listboxClasses'
> & {
  textOnly?: boolean;
  items?: ItemType[];
}) {
  const [value, setValue] = useState<ItemType>();
  const buttonId = useId();

  return (
    <>
      <label htmlFor={buttonId}>Select a person</label>
      <SelectNext
        {...rest}
        buttonId={buttonId}
        value={value}
        onChange={setValue}
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

export default function SelectNextPage() {
  return (
    <Library.Page
      title="SelectNext"
      intro={
        <p>
          <code>SelectNext</code> is a composite component which behaves like
          the native <code>{'<select>'}</code> element.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="SelectNext" />

          <Library.Example>
            <Library.Demo
              title="Basic Select"
              exampleFile="select-next-basic"
              withSource
            />
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with SelectNext">
          <p>
            <code>SelectNext</code> toggles a listbox where <code>Options</code>
            {"'"} UI can be customized and values can be objects.
          </p>
          <p>
            In browsers that support it, the listbox uses the{' '}
            <Link
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover"
            >
              <code>popover</code>
            </Link>{' '}
            attribute and gets toggled via{' '}
            <Link
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
            >
              popover API
            </Link>
            . Otherwise, it is rendered as an absolute-positioned element.
          </p>

          <Library.Example title="Composing and styling Selects">
            <Library.Demo
              title="Select with custom Options"
              exampleFile="select-next-with-custom-options"
              withSource
            />

            <Library.Demo
              title="Select in InputGroup"
              exampleFile="select-next-in-input-group"
              withSource
            />
          </Library.Example>

          <Library.Example title="Select with many options">
            <Library.Demo title="Select with many options">
              <SelectNextWithManyOptions
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
              exampleFile="select-next-basic"
              withSource
            />

            <Library.Demo
              title="Via aria-label"
              exampleFile="select-next-aria-label"
              withSource
            />

            <Library.Demo
              title="Via aria-labelledby"
              exampleFile="select-next-aria-labelledby"
              withSource
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
                <SelectExample textOnly buttonClasses="!w-36" />
              </div>
            </Library.Demo>

            <Library.Demo title="Custom options">
              <div className="mx-auto">
                <SelectExample buttonClasses="!w-36" />
              </div>
            </Library.Demo>

            <Library.Demo title="Input group">
              <div className="mx-auto">
                <SelectNextInInputGroup
                  buttonClasses="!w-36"
                  wrapperClasses=""
                />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="SelectNext component API">
          <code>SelectNext</code> accepts all standard{' '}
          <Library.Link href="/using-components#composite-components-api">
            composite component props
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
            <Library.Demo
              title="Disabled Select"
              exampleFile="select-next-disabled"
              withSource
            />
          </Library.Example>
          <Library.Example title="right">
            <Library.Info>
              <Library.InfoItem label="description">
                Whether the listbox should be aligned to the right when it grows
                bigger than the toggle button.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Right listbox"
              exampleFile="select-next-right"
              withSource
            />
          </Library.Example>
          <Library.Example title="buttonClasses">
            <Library.Info>
              <Library.InfoItem label="description">
                Additional classes to pass to toggle button.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | string[]</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Custom button">
              <div className="w-96 mx-auto">
                <SelectExample buttonClasses="!bg-yellow-notice" />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="containerClasses">
            <Library.Info>
              <Library.InfoItem label="description">
                Additional classes to pass to container.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | string[]</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Custom container">
              <div className="w-96 mx-auto">
                <SelectExample containerClasses="border-4 border-yellow-notice" />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="listboxClasses">
            <Library.Info>
              <Library.InfoItem label="description">
                Additional classes to pass to listbox.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | string[]</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Custom listbox">
              <div className="w-96 mx-auto">
                <SelectExample listboxClasses="border-4 border-yellow-notice" />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="listboxAsPopover">
            <Library.Info>
              <Library.InfoItem label="description">
                Determines if the listbox should be rendered using the{' '}
                <Link
                  target="_blank"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
                >
                  popover API
                </Link>
                . It{"'"}s mainly used as a test seam, but can help explicitly
                disabling this behavior if needed.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>true</code> if the browser supports <code>[popover]</code>
                . Otherwise it is <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Non-popover listbox"
              exampleFile="select-next-non-popover-listbox"
              withSource
            />
          </Library.Example>
          <Library.Example title="multiple">
            <Library.Info>
              <Library.InfoItem label="description">
                Determines if more than one item can be selected at once,
                causing the listbox to stay open when an option is selected on
                it.
                <p>
                  When multi-selection is enabled, the <code>value</code> must
                  be an array and <code>onChange</code> will receive an array as
                  an argument.
                </p>
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Multi-select listbox"
              exampleFile="select-next-multiple"
              withSource
            />
          </Library.Example>
          <Library.Example title="onListboxScroll">
            <Library.Info>
              <Library.InfoItem label="description">
                A callback passed to the listbox <code>onScroll</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  () {'=>'} void {'|'} undefined
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="SelectNext.Option component API">
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
          </Library.Example>
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
