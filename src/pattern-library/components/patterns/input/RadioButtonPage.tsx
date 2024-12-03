import Library from '../../Library';

export default function RadioButtonPage() {
  return (
    <Library.Page
      title="Radio button"
      intro={
        <p>
          <code>RadioButton</code> is a composite component that includes a
          radio input and label.
        </p>
      }
    >
      <Library.SectionL2>
        <Library.Usage componentName="RadioButton" />
        <Library.SectionL3>
          <Library.Demo
            title="Basic RadioButton"
            withSource
            exampleFile="radio-button-basic"
          />
        </Library.SectionL3>
      </Library.SectionL2>

      <Library.SectionL2 title="Working with RadioButtons">
        <Library.SectionL3 title="Controlled RadioButton">
          <p>
            <code>RadioButton</code>s are always expected to be controlled,
            because only one in a group should be checked at once.
          </p>
          <p>
            Because of this, there should be a parent component handling the
            state for all of them, as <code>RadioButton</code>s do not know
            about each other.
          </p>
        </Library.SectionL3>

        <Library.SectionL3 title="Customizing RadioButton icons">
          <p>
            <code>RadioButton</code> uses icons to style the radio, in unchecked
            and checked states. Custom icons may be provided if desired.
          </p>
          <Library.Demo
            withSource
            title="RadioButton with custom icon and checkedIcon"
            exampleFile="radio-button-custom-icons"
          />
        </Library.SectionL3>
      </Library.SectionL2>

      <Library.SectionL2 title="Component API">
        <code>RadioButton</code> accepts all standard{' '}
        <Library.Link href="/using-components#presentational-components-api">
          presentational component props
        </Library.Link>
        .
        <Library.SectionL3 title="checked">
          <Library.Info>
            <Library.InfoItem label="description">
              Set whether the <code>RadioButton</code> is checked. The presence
              of this component indicates that the <code>RadioButton</code> is
              being used as a controlled component.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`boolean`}</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>{`undefined`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="icon">
          <Library.Info>
            <Library.InfoItem label="description">
              <code>IconComponent</code> to use as the (unchecked) radio icon
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`IconComponent`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="checkedIcon">
          <Library.Info>
            <Library.InfoItem label="description">
              <code>IconComponent</code> to use as the (checked) radio icon
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`IconComponent`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
        <Library.SectionL3 title="...htmlAttributes">
          <Library.Info>
            <Library.InfoItem label="description">
              <code>RadioButton</code> accepts HTML attributes for input
              elements
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`JSX.InputHTMLAttributes<HTMLInputElement>`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.SectionL3>
      </Library.SectionL2>
    </Library.Page>
  );
}
