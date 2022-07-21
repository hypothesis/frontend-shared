import { Button, ButtonUnstyled } from '../../../../next';
import { CancelIcon, CheckIcon, EditIcon, ReplyIcon } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function ButtonPage() {
  return (
    <Library.Page
      title="Button"
      intro={
        <p>
          <code>Button</code> is a presentational component for{' '}
          <code>button</code> elements that have a text label. A{' '}
          <code>Button</code> may have an icon.{' '}
        </p>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Button</code> is a new component that re-implements the{' '}
          <code>LabeledButton</code> legacy component.{' '}
          <code>ButtonUnstyled</code> is a new component.
        </p>

        <Library.Example title="Migrating to this component (from LabeledButton)">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop name:{' '}
              <s>
                <code>buttonRef</code>
              </s>{' '}
              ➜ <code>elementRef</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop:{' '}
              <s>
                <code>icon</code>
              </s>
              ,{' '}
              <s>
                <code>iconPosition</code>
              </s>{' '}
              ➜ Use <code>Icon</code> prop instead. Icons are always positioned
              left.
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop: <code>variant</code> value{' '}
              <s>
                <code>{"'dark'"}</code>:
              </s>{' '}
              This is no longer a standard variant ➜ Use{' '}
              <code>ButtonUnstyled</code> instead.
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop: <code>variant</code> default value{' '}
              <s>
                <code>{"'normal'"}</code>
              </s>{' '}
              ➜ <code>{"'secondary'"}</code>
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>
      <Library.Pattern title="Usage">
        <Next.Usage componentName="Button" />
        <Library.Example>
          <Library.Demo title="Basic Button" withSource>
            <Button onClick={() => alert('You clicked the button')}>
              Click me
            </Button>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Icons">
        <Library.Example>
          <p>
            The <code>Button</code>
            {"'s"} <code>Icon</code> prop accepts an icon component and will
            render it to the left of content, sized proportionally to the local
            font size.
          </p>
          <Library.Demo
            title="Icons are sized proportionally to button label content"
            withSource
          >
            <span className="text-xl">
              <Button Icon={CancelIcon}>Cancel</Button>
            </span>
            <Button Icon={CancelIcon}>Cancel</Button>
            <span className="text-xs">
              <Button Icon={CancelIcon}>Cancel</Button>
            </span>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Variant">
        <p>
          These examples show each variant in each of the supported states, as
          well as an example with an icon. These states are associated with the{' '}
          <code>pressed</code>, <code>expanded</code> and <code>disabled</code>{' '}
          boolean props.
        </p>
        <Library.Example title="variant: 'secondary' (default)">
          <Library.Demo withSource>
            <Button variant="secondary">Default</Button>
            <Button variant="secondary">
              <CancelIcon />
              Default
            </Button>
            <Button variant="secondary" pressed>
              Pressed
            </Button>
            <Button variant="secondary" expanded>
              Expanded
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="variant: 'primary'">
          <Library.Demo withSource>
            <Button variant="primary">Default</Button>
            <Button variant="primary">
              <EditIcon />
              Default
            </Button>
            <Button variant="primary" pressed>
              Pressed
            </Button>
            <Button variant="primary" expanded>
              Expanded
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Size">
        <p>
          The <code>size</code> prop affects padding and spacing within the{' '}
          <code>Button</code>, but other sizing (e.g. font size) is inherited.
        </p>
        <Library.Example>
          <Library.Demo withSource>
            <Button Icon={EditIcon} size="sm">
              Small (sm)
            </Button>
            <Button Icon={ReplyIcon} size="md">
              Medium (md, default)
            </Button>
            <Button Icon={CheckIcon} size="lg">
              Large (lg)
            </Button>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="ButtonUnstyled">
        <p>
          <code>ButtonUnstyled</code> does not apply any styling. Use the{' '}
          <code>classes</code> prop to style the component.
        </p>
        <p>
          To enable a focus ring consistent with other interactive elements, use
          the <code>.focus-visible-ring</code> utility class.
        </p>
        <Library.Example title="Usage">
          <Next.Usage componentName="ButtonUnstyled" />
          <Library.Demo withSource>
            <ButtonUnstyled classes="focus-visible-ring bg-slate-0 p-2">
              My custom button
            </ButtonUnstyled>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
