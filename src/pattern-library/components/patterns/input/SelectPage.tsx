import classnames from 'classnames';
import { useId, useState } from 'preact/hooks';

import { Link } from '../../../..';
import type { SelectProps } from '../../../../components/input';
import { Select } from '../../../../components/input/Select';
import SelectInInputGroup from '../../../examples/select-in-input-group';
import SelectWithManyOptions from '../../../examples/select-with-custom-options';
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
  SelectProps<ItemType>,
  'buttonClasses' | 'containerClasses' | 'popoverClasses'
> & {
  textOnly?: boolean;
  items?: ItemType[];
}) {
  const [value, setValue] = useState<ItemType>();
  const buttonId = useId();

  return (
    <>
      <label htmlFor={buttonId}>Select a person</label>
      <Select
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
                  <div className="rounded px-2 mr-2 bg-grey-7 text-white">
                    {value.id}
                  </div>
                  <div className="truncate">{value.name}</div>
                </div>
              )}
            </>
          ) : (
            <>Select one…</>
          )
        }
      >
        {items.map(item => (
          <Select.Option value={item} key={item.id} disabled={item.disabled}>
            {({ disabled }) =>
              textOnly ? (
                item.name
              ) : (
                <div className="flex">
                  <div
                    className={classnames('rounded px-2 mr-2 text-white', {
                      'bg-grey-7': !disabled,
                      'bg-grey-4': disabled,
                    })}
                  >
                    {item.id}
                  </div>
                  <div className="truncate">{item.name}</div>
                </div>
              )
            }
          </Select.Option>
        ))}
      </Select>
    </>
  );
}

export default function SelectPage() {
  return (
    <Library.Page
      title="Selects"
      intro={
        <p>
          <code>Select</code> and <code>MultiSelect</code> are composite
          components which behave like the native <code>{'<select>'}</code>{' '}
          element.
        </p>
      }
    >
      <Library.Section
        title="Select"
        intro={
          <p>
            <code>Select</code> renders a single-selection drop-down control.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="Select" />

          <Library.SectionL3>
            <Library.Demo
              title="Basic Select"
              exampleFile="select-basic"
              withSource
            />
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Working with Select">
          <p>
            <code>Select</code> toggles a listbox where <code>Options</code>
            {"'"} UI can be customized and values can be objects.
          </p>
          <p>
            A <Library.Link href="/feedback-popover">Popover</Library.Link>{' '}
            component is used to wrap the listbox and ensure it is always
            correctly positioned.
          </p>

          <Library.SectionL3 title="Composing and styling Selects">
            <Library.Demo
              title="Select with custom Options"
              exampleFile="select-with-custom-options"
              withSource
            />

            <Library.Demo
              title="Select in InputGroup"
              exampleFile="select-in-input-group"
              withSource
            />
          </Library.SectionL3>

          <Library.SectionL3 title="Select with many options">
            <Library.Demo title="Select with many options">
              <SelectWithManyOptions
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
          </Library.SectionL3>

          <Library.SectionL3 title="Labeling Select">
            <p>
              There are three ways to label a <code>Select</code>. Make sure you
              always use one of them.
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
              exampleFile="select-basic"
              withSource
            />

            <Library.Demo
              title="Via aria-label"
              exampleFile="select-aria-label"
              withSource
            />

            <Library.Demo
              title="Via aria-labelledby"
              exampleFile="select-aria-labelledby"
              withSource
            />
          </Library.SectionL3>

          <Library.SectionL3 title="Select with long content">
            <p>
              <code>Select</code> makes sure the button content never overflows,
              and applies <code>text-overflow: ellipsis</code>.
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
                <SelectExample
                  textOnly
                  buttonClasses="!w-36"
                  items={defaultItems.map(({ name, ...rest }) => ({
                    ...rest,
                    name: `${name} (this item has very long text)`,
                  }))}
                />
              </div>
            </Library.Demo>

            <Library.Demo title="Custom options">
              <div className="mx-auto">
                <SelectExample buttonClasses="!w-36" />
              </div>
            </Library.Demo>

            <Library.Demo title="Input group">
              <div className="mx-auto">
                <SelectInInputGroup buttonClasses="!w-36" wrapperClasses="" />
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Select component API">
          <code>Select</code> accepts all standard{' '}
          <Library.Link href="/using-components#composite-components-api">
            composite component props
          </Library.Link>
          <Library.SectionL3 title="value">
            <Library.Info>
              <Library.InfoItem label="description">
                Represents currently selected Option.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>T</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="onChange">
            <Library.Info>
              <Library.InfoItem label="description">
                A callback invoked every time selected value changes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>(newValue: T) =&gt; void</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="buttonContent">
            <Library.Info>
              <Library.InfoItem label="description">
                The content to be displayed in the toggle button.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>ComponentChildren</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="buttonId">
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
          </Library.SectionL3>
          <Library.SectionL3 title="disabled">
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
              exampleFile="select-disabled"
              withSource
            />
          </Library.SectionL3>
          <Library.SectionL3 title="alignListbox">
            <Library.Info>
              <Library.InfoItem label="description">
                Whether the listbox should be aligned to the right or left side
                of the toggle button.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'left' | 'right'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'left'"}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Right-aligned listbox"
              exampleFile="select-right"
              withSource
            />
          </Library.SectionL3>
          <Library.SectionL3 title="buttonClasses">
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
          </Library.SectionL3>
          <Library.SectionL3 title="containerClasses">
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
          </Library.SectionL3>
          <Library.SectionL3 title="listboxAsPopover">
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
              exampleFile="select-non-popover-listbox"
              withSource
            />
          </Library.SectionL3>
          <Library.SectionL3 title="popoverClasses">
            <Library.Info>
              <Library.InfoItem label="description">
                Additional classes to pass to the popover.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | string[]</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Custom popover">
              <div className="w-96 mx-auto">
                <SelectExample popoverClasses="border-4 border-yellow-notice" />
              </div>
            </Library.Demo>
          </Library.SectionL3>
          <Library.SectionL3 title="listboxOverflow">
            <Library.Info>
              <Library.InfoItem label="description">
                Determines the behavior of the listbox options when their
                content is larger than the listbox.
                <ul className="list-disc">
                  <li>
                    <code>{"'truncate'"}</code>: Text will use one line and be
                    truncated with an ellipsis.
                  </li>
                  <li>
                    <code>{"'wrap'"}</code>: Text will span multiple lines if
                    needed, ensuring all content is visible.
                  </li>
                </ul>
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{"'truncate' | 'wrap'"}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'truncate'"}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="Truncate listbox options"
              exampleFile="select-truncate-listbox"
              withSource
            />
            <Library.Demo
              title="Wrap listbox options"
              exampleFile="select-wrap-listbox"
              withSource
            />
          </Library.SectionL3>
          <Library.SectionL3 title="onListboxScroll">
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
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Select.Option component API">
          <Library.SectionL3 title="children">
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
          </Library.SectionL3>
          <Library.SectionL3 title="value">
            <Library.Info>
              <Library.InfoItem label="description">
                The value to set when this option is selected.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>T</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="disabled">
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
          </Library.SectionL3>
          <Library.SectionL3 title="classes">
            <Library.Info>
              <Library.InfoItem label="description">
                CSS class(es) that will be appended to the CSS classes applied
                to the options{"'"}s outermost element.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | string[] | undefined</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="elementRef">
            <Library.Info>
              <Library.InfoItem label="description">
                A <code>Ref</code> applied to the option{"'"}s outermost
                element.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  MutableRef{'<'}HTMLElement | undefined{'>'} | undefined
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
          <Library.SectionL3 title="title">
            <Library.Info>
              <Library.InfoItem label="description">
                If provided, it is set as the option{"'"}s <code>title</code>{' '}
                attribute.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string | undefined</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>undefined</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>

      <Library.Section
        title="MultiSelect"
        intro={
          <p>
            <code>MultiSelect</code> is a variant of <code>Select</code> that
            allows multiple options to be selected at once. It has the same API
            except that <code>value</code> accepts, and <code>onChange</code>{' '}
            receives receive, arrays rather than a single item.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="MultiSelect" />

          <Library.SectionL3>
            <Library.Demo
              title="Basic MultiSelect"
              exampleFile="select-multi-select"
              withSource
            />
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
