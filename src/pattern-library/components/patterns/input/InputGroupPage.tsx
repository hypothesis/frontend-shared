import {
  InputGroup,
  Input,
  IconButton,
  CopyIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SelectNext,
} from '../../../../';
import Library from '../../Library';

export default function InputGroupPage() {
  return (
    <Library.Page
      title="InputGroup"
      intro={
        <p>
          <code>InputGroup</code> is a presentational component that provides
          layout and styling for groups of input components.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="InputGroup" />
          <Library.Example>
            <Library.Demo
              title="Basic InputGroup containing an Input and an IconButton"
              withSource
            >
              <div className="w-[350px]">
                <InputGroup>
                  <Input name="test" />
                  <IconButton icon={CopyIcon} title="copy" variant="dark" />
                </InputGroup>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with InputGroups">
          <Library.Example title="Composing InputGroups">
            <p>
              The following input components can be used in an{' '}
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
                <code>SelectNext</code>
              </li>
            </ul>
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
                  <SelectNext
                    value="1"
                    buttonContent="Apple"
                    onChange={() => {}}
                  >
                    <SelectNext.Option value="1">Apple</SelectNext.Option>
                    <SelectNext.Option value="2">Banana</SelectNext.Option>
                    <SelectNext.Option value="3">Cherries</SelectNext.Option>
                  </SelectNext>
                  <IconButton
                    icon={ArrowRightIcon}
                    title="Next"
                    variant="dark"
                  />
                </InputGroup>
              </div>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="Sizing InputGroups">
            <Library.Demo title="Scaling to local font size" withSource>
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
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <p>
            <code>InputGroup</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>InputGroup</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
