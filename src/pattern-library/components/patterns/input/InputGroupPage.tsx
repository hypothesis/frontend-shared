import {
  InputGroup,
  Input,
  IconButton,
  CopyIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  Select,
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
        <Library.SectionL2>
          <Library.Usage componentName="InputGroup" />
          <Library.SectionL3>
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
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Working with InputGroups">
          <Library.SectionL3 title="Composing InputGroups">
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
                <code>Select</code>
              </li>
              <li>
                <code>MultiSelect</code>
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
                  <Select value="1" buttonContent="Apple" onChange={() => {}}>
                    <Select.Option value="1">Apple</Select.Option>
                    <Select.Option value="2">Banana</Select.Option>
                    <Select.Option value="3">Cherries</Select.Option>
                  </Select>
                  <IconButton
                    icon={ArrowRightIcon}
                    title="Next"
                    variant="dark"
                  />
                </InputGroup>
              </div>
            </Library.Demo>
          </Library.SectionL3>
          <Library.SectionL3 title="Sizing InputGroups">
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
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>InputGroup</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>InputGroup</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
