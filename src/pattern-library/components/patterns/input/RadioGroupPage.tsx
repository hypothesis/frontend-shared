import { Link } from '../../../../components/navigation';
import Library from '../../Library';

export default function RadioGroupPage() {
  return (
    <Library.Page
      title="Radio group"
      intro={
        <p>
          <code>RadioGroup</code> is a component implementing the{' '}
          <Link
            href="https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
            target="_blank"
          >
            Radio Group Pattern
          </Link>
          .
        </p>
      }
    >
      <Library.SectionL2>
        <Library.Usage componentName="RadioGroup" />
        <Library.SectionL3>
          <Library.Demo
            title="Basic RadioGroup"
            withSource
            exampleFile="radio-group-horizontal"
          />
        </Library.SectionL3>
      </Library.SectionL2>

      <Library.SectionL2 title="Working with RadioGroups">
        <p>
          <code>RadioGroup</code> can render a list of radios arranged
          horizontally or vertically. Each radio can optionally render a
          subtitle, and be individually disabled.
        </p>
        <p>
          Radios can be focused via arrow keys. Right/Down to move focus to the
          next radio, and Up/Left for the previous one.
        </p>

        <Library.SectionL3 title="RadioGroup direction">
          <Library.Demo
            title="Vertical RadioGroup"
            withSource
            exampleFile="radio-group-vertical"
          />
        </Library.SectionL3>

        <Library.SectionL3 title="RadioGroup with complex layout">
          <p>
            If the <code>RadioGroup</code> <code>direction</code> does not fit
            your needs, you can provide a more complex container around radios,
            like a responsive set of columns or a grid layout.
          </p>

          <Library.Demo
            title="RadioGroup grid layout"
            withSource
            exampleFile="radio-group-grid-layout"
          />
        </Library.SectionL3>

        <Library.SectionL3 title="Labelling RadioGroups">
          <p>
            There are two ways to label a <code>RadioGroup</code>. Make sure to
            use at least one of them.
          </p>

          <Library.Demo
            title="Via aria-label"
            withSource
            exampleFile="radio-group-aria-label"
          />
          <Library.Demo
            title="Via aria-labelledby"
            withSource
            exampleFile="radio-group-aria-labelledby"
          />
        </Library.SectionL3>
      </Library.SectionL2>

      <Library.SectionL2 title="Component API">
        <Library.SectionL3 title="aria-label">
          <Library.Info>
            <Library.InfoItem label="description">
              Sets the <code>aria-label</code> attribute in the{' '}
              <code>RadioGroup</code>. Make sure either this or{' '}
              <code>aria-labelledby</code> is used.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>string | undefined</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>undefined</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="aria-labelledby">
          <Library.Info>
            <Library.InfoItem label="description">
              Sets the <code>aria-labelledby</code> attribute in the{' '}
              <code>RadioGroup</code>. Make sure either this or{' '}
              <code>aria-label</code> is used.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>string | undefined</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>undefined</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="children">
          <Library.Info>
            <Library.InfoItem label="description">
              The content to render inside the <code>RadioGroup</code>,
              typically a list of <code>RadioGroup.Radio</code> components.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>ComponentChildren</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>undefined</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="direction">
          <Library.Info>
            <Library.InfoItem label="description">
              Whether the radios should be stacked horizontally or vertically.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>
                {"'"}vertical{"'"} | {"'"}horizontal{"'"}
              </code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>
                {"'"}horizontal{"'"}
              </code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="disabled">
          <Library.Info>
            <Library.InfoItem label="description">
              If true, it will disable all radios, regardless of the value of
              their own <code>disabled</code> prop.
              <br />
              Disabled radios are never marked as selected.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>boolean</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>false</code>
            </Library.InfoItem>
          </Library.Info>
          <Library.Demo
            title="Disabled RadioGroup"
            withSource
            exampleFile="radio-group-disabled"
          />
        </Library.SectionL3>
        <Library.SectionL3 title="name">
          <Library.Info>
            <Library.InfoItem label="description">
              When provided, a hidden <code>input</code> will be included, with
              this name and selected value, allowing <code>RadioGroup</code> to
              be used as a regular form control.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>string | undefined</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>undefined</code>
            </Library.InfoItem>
          </Library.Info>
          <Library.Demo
            title="Named RadioGroup in form"
            withSource
            exampleFile="radio-group-in-form"
          />
        </Library.SectionL3>
        <Library.SectionL3 title="onChange">
          <Library.Info>
            <Library.InfoItem label="description">
              A callback invoked when selected radio changes.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>(newValue: T) {'=>'} void</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="selected">
          <Library.Info>
            <Library.InfoItem label="description">
              The value for currently selected radio.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>T | undefined</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>undefined</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
      </Library.SectionL2>
    </Library.Page>
  );
}
