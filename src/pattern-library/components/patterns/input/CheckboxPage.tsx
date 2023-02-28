import { useState } from 'preact/hooks';

import { Checkbox, ShowIcon, HideIcon } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

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
      <Library.Pattern title="Status">
        <p>
          <code>Checkbox</code> combines the functionality of both the{' '}
          <code>Checkbox</code> and <code>LabeledCheckbox</code> legacy
          components.
        </p>

        <Library.Example title="Migrating to this component (from Checkbox)">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop name:{' '}
              <s>
                <code>onToggle</code>
              </s>{' '}
              ➜ Use <code>onChange</code> instead
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop:{' '}
              <s>
                <code>inputRef</code>
              </s>{' '}
              ➜ <code>elementRef</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              The presence of prop <code>checked</code> now configures{' '}
              <code>Checkbox</code> as a controlled component.
            </Next.ChangelogItem>
            <Next.ChangelogItem status="added">
              Prop <code>defaultChecked</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="added">
              Now accepts HTML attributes allowed for <code>HTMLInput</code>{' '}
              elements.
            </Next.ChangelogItem>
            <Next.ChangelogItem status="changed">
              Prop <code>id</code> is no longer required
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>

        <Library.Example title="Migrating to this component (from LabeledCheckbox)">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop:{' '}
              <s>
                <code>containerClasses</code>
              </s>{' '}
              ➜ this is now a composite component (does not take extra CSS{' '}
              <code>classes</code>)
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Usage">
        <Next.Usage componentName="Checkbox" />
        <Library.Example>
          <Library.Demo title="Basic Checkbox" withSource>
            <Checkbox>Click me</Checkbox>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Props">
        <Library.Example title="checked">
          <p>
            When the <code>checked</code> prop is present, <code>Checkbox</code>{' '}
            will behave as a controlled component.
          </p>
          <Next.Code
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
            title="Controlled Checkbox usage example"
          />
          <Library.Demo title="Controlled Checkbox" withSource>
            <Checkbox checked={checked} onChange={handleControlledChange}>
              Controlled checkbox
            </Checkbox>
          </Library.Demo>

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

        <Library.Example title="defaultChecked">
          <p>
            For uncontrolled <code>Checkbox</code>es,{' '}
            <code>defaultChecked</code> sets initial checked state.
          </p>
          <Library.Demo
            title="Uncontrolled Checkbox with defaultChecked"
            withSource
          >
            <Checkbox defaultChecked>Default checked</Checkbox>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="disabled">
          <p>
            <code>disabled</code> styling reduces the opacity of the component.
          </p>
          <Library.Demo withSource>
            <Checkbox>Enabled</Checkbox>
            <Checkbox disabled>Disabled</Checkbox>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="icon and checkedIcon">
          <p>
            Custom icons may be used for styling checkboxes. Use the{' '}
            <code>icon</code> and <code>checkedIcon</code> props to set custom{' '}
            <code>IconComponent</code>s to use for the unchecked and checked
            checkbox styling, respectively.
          </p>
          <Library.Demo withSource>
            <Checkbox icon={HideIcon} checkedIcon={ShowIcon} defaultChecked />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="onChange">
          <p>
            Any provided <code>onChange</code> function is invoked when there is
            a <code>change</code> event on the checkbox <code>input</code> — in
            other words, it behaves just like a normal <code>onChange</code>{' '}
            handler for an input.
          </p>

          <p>
            Remember: <code>Checkbox</code> accepts any valid{' '}
            <code>HTMLInput</code> attribute. You can also use{' '}
            <code>onClick</code>, <code>onInput</code>, etc.
          </p>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
