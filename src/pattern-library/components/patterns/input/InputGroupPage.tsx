import {
  InputGroup,
  Input,
  IconButton,
  CopyIcon,
  Select,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function InputGroupPage() {
  return (
    <Library.Page title="InputGroup">
      <Library.Section
        title="InputGroup"
        intro={
          <p>
            <code>InputGroup</code> is a presentational component that provides
            layout for groups of input components.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>InputGroup</code> is a new component based loosely on the
            legacy <code>TextInputWithButton</code> component.
          </p>
        </Library.Pattern>
        <Library.Pattern title="Usage">
          <Next.Usage componentName="InputGroup" />
          <Library.Example>
            <Library.Demo
              title="Basic InputGroup with an Input and an IconButton"
              withSource
            >
              <div className="w-[350px]">
                <InputGroup>
                  <Input name="test" />
                  <IconButton icon={CopyIcon} title="copy" variant="dark" />
                </InputGroup>
              </div>
            </Library.Demo>

            <Library.Demo
              title="Select and IconButton components in InputGroup"
              withSource
            >
              <div className="w-[350px]">
                <InputGroup>
                  <IconButton
                    icon={ArrowLeftIcon}
                    title="Previous"
                    variant="dark"
                  />
                  <Select>
                    <option value="0">Select a fruit</option>
                    <option value="1">Apple</option>
                    <option value="2">Banana</option>
                    <option value="3">Cherries</option>
                  </Select>
                  <IconButton
                    icon={ArrowRightIcon}
                    title="Next"
                    variant="dark"
                  />
                </InputGroup>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Scaling InputGroup size">
            <p>
              This example demonstrates <code>InputGroup</code> inputs scaling
              to the local font size.
            </p>
            <Library.Demo withSource>
              <div className="w-[350px]">
                <div className="text-xs">
                  <InputGroup>
                    <Input name="test" />
                    <IconButton
                      icon={CopyIcon}
                      title="copy"
                      size="sm"
                      variant="dark"
                    />
                  </InputGroup>
                </div>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Group-able Inputs">
            <p>
              The following input components are supported by{' '}
              <code>InputGroup</code>:
            </p>
            <ul>
              <li>
                <code>Input</code>
              </li>
              <li>
                <code>IconButton</code>
              </li>
              <li>
                <code>Select</code>
              </li>
            </ul>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}