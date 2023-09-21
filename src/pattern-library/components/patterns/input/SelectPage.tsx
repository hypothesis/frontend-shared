import {
  ArrowLeftIcon,
  ArrowRightIcon,
  IconButton,
  InputGroup,
  Select,
} from '../../../../';
import type { SelectProps } from '../../../../components/input/Select';
import Library from '../../Library';

function SelectWrapper({ children, ...selectProps }: SelectProps) {
  const options = children ?? (
    <>
      <option value={-1}>All students</option>
      <option value="a">Albert Banana</option>
      <option value="b">Bernard California</option>
      <option value="c">Cecelia Davenport</option>
      <option value="d">Doris Evanescence</option>
    </>
  );
  return <Select {...selectProps}>{options}</Select>;
}

export default function SelectPage() {
  return (
    <Library.Page
      title="Select"
      intro={
        <>
          <p>
            <code>Select</code> is a presentational component that styles native{' '}
            <code>{'<select>'}</code> elements.
          </p>
          <p>
            <code>Select</code> is <Library.StatusChip status="deprecated" />,
            use{' '}
            <Library.Link href="/input-select-next">SelectNext</Library.Link>{' '}
            instead.
          </p>
        </>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="Select" />

          <Library.Example>
            <Library.Demo title="Basic Select" withSource>
              <div>
                <SelectWrapper aria-label="Example input">
                  <option value={-1}>All students</option>
                  <option value="a">Albert Banana</option>
                  <option value="b">Bernard California</option>
                  <option value="c">Cecelia Davenport</option>
                </SelectWrapper>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with Selects">
          <p>
            <code>Select</code> styles <code>{'<select>'}</code> elements. Note
            that <code>{'<option>'}</code> elements, with a few browser-specific
            exceptions, cannot be styled with CSS.
          </p>
          <Library.Example title="Composing and styling Selects">
            <Library.Demo title="Select in an InputGroup" withSource>
              <div className="w-[380px]">
                <InputGroup>
                  <IconButton
                    icon={ArrowLeftIcon}
                    title="Previous student"
                    variant="dark"
                  />
                  <SelectWrapper aria-label="Example select" />
                  <IconButton
                    icon={ArrowRightIcon}
                    title="Next student"
                    variant="dark"
                  />
                </InputGroup>
              </div>
            </Library.Demo>
            <Library.Demo title="Setting Select width" withSource>
              <div className="w-[250px]">
                <SelectWrapper aria-label="Example select" />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Disabled Selects">
            <Library.Demo title="disabled Select" withSource>
              <div className="w-[350px]">
                <SelectWrapper aria-label="Example select" disabled />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>Select</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="feedback">
            <Library.Info>
              <Library.InfoItem label="description">
                Set <code>feedback</code> to indicate that there is an
                associated error or warning for the <code>Select</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>
                  {`"error"`} | {`"warning"`}
                </code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`undefined`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="w-[350px]">
                <SelectWrapper
                  aria-label="Select with error"
                  feedback="error"
                />
              </div>
              <div className="w-[350px]">
                <SelectWrapper
                  aria-label="Select with warning"
                  feedback="warning"
                />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="hasError">
            <Library.Info>
              <Library.InfoItem label="description">
                <Library.StatusChip status="deprecated" />
                Use <code>{`feedback="error"`}</code> instead.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`false`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <div className="w-[350px]">
                <SelectWrapper aria-label="Example select" hasError />
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Select</code> accepts HTML attributes for select elements.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLSelectElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
