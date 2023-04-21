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
        <p>
          <code>Select</code> is a presentational component that styles native{' '}
          <code>{'<select>'}</code> elements.
        </p>
      }
    >
      <Library.Section
        title="Select"
        intro={
          <p>
            <code>Select</code> styles <code>{'<select>'}</code> elements. Note
            that <code>{'<option>'}</code> elements, with a few browser-specific
            exceptions, cannot be styled with CSS.
          </p>
        }
      >
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

            <Library.Demo title="Setting Select width" withSource>
              <div className="w-[250px]">
                <SelectWrapper aria-label="Example input" />
              </div>
            </Library.Demo>

            <Library.Demo title="Select in an InputGroup" withSource>
              <div className="w-[380px]">
                <InputGroup>
                  <IconButton
                    icon={ArrowLeftIcon}
                    title="Previous student"
                    variant="dark"
                  />
                  <SelectWrapper aria-label="Example input" />
                  <IconButton
                    icon={ArrowRightIcon}
                    title="Next student"
                    variant="dark"
                  />
                </InputGroup>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="hasError">
            <p>
              Set <code>hasError</code> to indicate that there is an associated
              error.
            </p>
            <Library.Demo withSource>
              <div className="w-[350px]">
                <SelectWrapper aria-label="Example input" hasError />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="disabled">
            <Library.Demo withSource>
              <div className="w-[350px]">
                <SelectWrapper aria-label="Example input" disabled />
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
