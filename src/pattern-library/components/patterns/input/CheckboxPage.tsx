import { useState } from 'preact/hooks';

import { Checkbox, ShowIcon, HideIcon } from '../../../../';
import Library from '../../Library';

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false);

  const handleControlledChange = (e: Event) => {
    setChecked((e.target! as HTMLInputElement).checked);
  };
  return (
    <Library.Page
      title="Checkbox"
      intro={
        <p>
          <code>Checkbox</code> is a composite component that includes a
          checkbox input and label.
        </p>
      }
    >
      <Library.Pattern>
        <Library.Usage componentName="Checkbox" />
        <Library.Example>
          <Library.Demo title="Basic Checkbox" withSource>
            <div className="flex flex-col">
              <Checkbox>Click me</Checkbox>
              <Checkbox disabled>Disabled</Checkbox>
            </div>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Working with Checkboxes">
        <Library.Example title="Controlled Checkboxes">
          <p>
            The presence of a <code>checked</code> prop will make the{' '}
            <code>Checkbox</code> behave as a controlled component. Consuming
            components should respond to the <code>onChange</code> event.
          </p>
          <Library.Demo
            title="Controlling a Checkbox with `checked`"
            withSource
          >
            <Checkbox checked={checked} onChange={handleControlledChange}>
              Controlled checkbox
            </Checkbox>
          </Library.Demo>

          <Library.Code
            content={`const [checked, setChecked] = useState(false);

const handleControlledChange = e => {
  setChecked(e.target.checked);
};

<Checkbox
  checked={checked}
  onChange={handleControlledChange}
>
  Controlled checkbox
</Checkbox>
`}
            size="sm"
            title="When the `checked prop` is present, Checkbox will behave as a controlled component"
          />

          <Library.Demo
            title="Don't forget to handle events for controlled Checkboxes"
            withSource
          >
            <Checkbox checked={false}>
              <div className="text-red-error">
                This checkbox will not update when clicked
              </div>
            </Checkbox>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Customizing Checkbox icons">
          <p>
            <code>Checkbox</code> uses icons to style the checkbox, in unchecked
            and checked states. Custom icons may be provided if desired.
          </p>
          <Library.Demo
            withSource
            title="Checkbox with custom icon and checkedIcon"
          >
            <Checkbox icon={HideIcon} checkedIcon={ShowIcon} defaultChecked />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Component API">
        <code>Checkbox</code> accepts all standard{' '}
        <Library.Link href="/using-components#presentational-components-api">
          presentational component props
        </Library.Link>
        .
        <Library.Example title="checked">
          <Library.Info>
            <Library.InfoItem label="description">
              Set whether the <code>Checkbox</code> is checked. The presence of
              this component indicates that the <code>Checkbox</code> is being
              used as a controlled component.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`boolean`}</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>{`undefined`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.Example>
        <Library.Example title="defaultChecked">
          <Library.Info>
            <Library.InfoItem label="description">
              Whether the <code>Checkbox</code> is initially checked. For use
              when <code>Checkbox</code> is an uncontrolled component.
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`boolean`}</code>
            </Library.InfoItem>
            <Library.InfoItem label="default">
              <code>{`false`}</code>
            </Library.InfoItem>
          </Library.Info>

          <Library.Demo
            title="Uncontrolled Checkbox with defaultChecked"
            withSource
          >
            <Checkbox defaultChecked>Default checked</Checkbox>
          </Library.Demo>
        </Library.Example>
        <Library.Example title="icon">
          <Library.Info>
            <Library.InfoItem label="description">
              <code>IconComponent</code> to use as the (unchecked) checkbox icon
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`IconComponent`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.Example>
        <Library.Example title="checkedIcon">
          <Library.Info>
            <Library.InfoItem label="description">
              <code>IconComponent</code> to use as the (checked) checkbox icon
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`IconComponent`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.Example>
        <Library.Example title="...htmlAttributes">
          <Library.Info>
            <Library.InfoItem label="description">
              <code>Checkbox</code> accepts HTML attributes for input elements
            </Library.InfoItem>
            <Library.InfoItem label="type">
              <code>{`JSX.HTMLAttributes<HTMLInputElement>`}</code>
            </Library.InfoItem>
          </Library.Info>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
