import { Button, IconButton, ButtonUnstyled } from '../../../../next';
import {
  CancelIcon,
  CheckIcon,
  EditIcon,
  ReplyIcon,
  ShareIcon,
  CautionIcon,
} from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function ButtonPage() {
  return (
    <Library.Page
      title="Button"
      intro={
        <p>
          Button components apply common styling and accessibility attributes to{' '}
          <code>button</code> elements.
        </p>
      }
    >
      <Library.Section
        title="Button"
        intro={
          <p>
            The <code>Button</code> component can be used for buttons with
            textual labels and, optionally, an icon.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>Button</code> is a new component that re-implements the{' '}
            <code>LabeledButton</code> legacy component.{' '}
          </p>
          <Library.Example title="Migrating to this component">
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
                  <code>iconPosition</code>
                </s>{' '}
                ➜ Icons are always positioned left
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop: <code>icon</code>,{' '}
                <s>
                  <code>{'{string}'}</code>
                </s>{' '}
                ➜ Now takes <code>{'{IconComponent}'}</code>
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

        <Library.Pattern title="Props">
          <Library.Example title="icon">
            <p>
              The <code>Button</code>
              {"'s"} <code>icon</code> prop accepts an icon component and will
              render it to the left of content, sized proportionally to the
              local font size.
            </p>
            <Library.Demo
              title="Icons are sized proportionally to button label content"
              withSource
            >
              <span className="text-xl">
                <Button icon={CancelIcon}>Cancel</Button>
              </span>
              <Button icon={CancelIcon}>Cancel</Button>
              <span className="text-xs">
                <Button icon={CancelIcon}>Cancel</Button>
              </span>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="variant">
            <p>
              These examples show each variant in each of the supported states,
              as well as an example with an icon. These states are associated
              with the <code>pressed</code>, <code>expanded</code> and{' '}
              <code>disabled</code> boolean props.
            </p>
            <Library.Demo title="variant: 'secondary' (default)" withSource>
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

            <Library.Demo title="variant: 'primary'" withSource>
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
          <Library.Example title="size">
            <p>
              The <code>size</code> prop affects padding and spacing within the{' '}
              <code>Button</code>, but other sizing (e.g. font size) is
              inherited.
            </p>
            <Library.Demo withSource>
              <Button icon={EditIcon} size="sm">
                Small (sm)
              </Button>
              <Button icon={ReplyIcon} size="md">
                Medium (md, default)
              </Button>
              <Button icon={CheckIcon} size="lg">
                Large (lg)
              </Button>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="IconButton"
        intro={
          <p>
            <code>IconButton</code> is for buttons that contain only an icon.
          </p>
        }
      >
        <Library.Pattern title="Status">
          <p>
            <code>IconButton</code> is a reimplementation of an existing legacy
            component with the same name.
          </p>

          <Library.Example title="Migrating to this component">
            <Next.Changelog>
              <Next.ChangelogItem status="breaking">
                Prop name:{' '}
                <s>
                  <code>buttonRef</code>
                </s>{' '}
                ➜ <code>elementRef</code>
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop: <code>icon</code>,{' '}
                <s>
                  <code>{'{string}'}</code>
                </s>{' '}
                ➜ Now takes <code>{'{IconComponent}'}</code>
              </Next.ChangelogItem>
              <Next.ChangelogItem status="breaking">
                Prop: <code>variant</code> value{' '}
                <s>
                  <code>{"'light'"}</code>:
                </s>{' '}
                This is no longer a standard variant ➜ Use{' '}
                <code>ButtonUnstyled</code> instead
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
          <Next.Usage componentName="IconButton" />
          <Library.Example>
            <Library.Demo title="Basic IconButton" withSource>
              <IconButton
                onClick={() => alert('You clicked the button')}
                icon={ReplyIcon}
                title="Reply"
              />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="icon">
            <p>
              The <code>IconButton</code>
              {"'s"} <code>icon</code> prop accepts an icon component and will
              render it sized proportionally to the local font size.
            </p>
            <Library.Demo withSource>
              <span className="text-xl">
                <IconButton icon={ShareIcon} title="Share" />
              </span>
              <IconButton icon={ShareIcon} title="Share" />
              <span className="text-xs">
                <IconButton icon={ShareIcon} title="Share" />
              </span>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="icon: customizing styles">
            <p>
              If you need more control over icon styles, use an icon component
              directly in the content instead.
            </p>
            <Library.Demo withSource>
              <IconButton title="Share">
                <ShareIcon className="w-8 h-8" />
              </IconButton>
              <IconButton title="Share">
                <ShareIcon className="w-3 h-3" />
              </IconButton>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="variant">
            <p>
              These examples show each variant in each of the supported states.
              These states are associated with the <code>pressed</code>,{' '}
              <code>expanded</code> and <code>disabled</code> boolean props.
            </p>

            <p>
              For customization, use <code>ButtonUnstyled</code>.
            </p>
            <Library.Demo title="variant: 'secondary' (default)" withSource>
              <IconButton
                variant="secondary"
                title="Watch out!"
                icon={CautionIcon}
              />
              <IconButton
                variant="secondary"
                title="Watch out!"
                icon={CautionIcon}
                pressed
              />
              <IconButton
                variant="secondary"
                title="Watch out!"
                icon={CautionIcon}
                expanded
              />
              <IconButton
                variant="secondary"
                title="Watch out!"
                icon={CautionIcon}
                disabled
              />
            </Library.Demo>

            <Library.Demo title="variant: 'primary'" withSource>
              <IconButton
                variant="primary"
                title="Watch out!"
                icon={CautionIcon}
              />
              <IconButton
                variant="primary"
                title="Watch out!"
                icon={CautionIcon}
                pressed
              />
              <IconButton
                variant="primary"
                title="Watch out!"
                icon={CautionIcon}
                expanded
              />
              <IconButton
                variant="primary"
                title="Watch out!"
                icon={CautionIcon}
                disabled
              />
            </Library.Demo>
            <Library.Demo
              classes="bg-slate-0 p-4"
              title="variant: 'dark'"
              withSource
            >
              <IconButton
                variant="dark"
                title="Watch out!"
                icon={CautionIcon}
              />
              <IconButton
                variant="dark"
                title="Watch out!"
                icon={CautionIcon}
                pressed
              />
              <IconButton
                variant="dark"
                title="Watch out!"
                icon={CautionIcon}
                expanded
              />
              <IconButton
                variant="dark"
                title="Watch out!"
                icon={CautionIcon}
                disabled
              />
            </Library.Demo>
          </Library.Example>
          <Library.Example title="size">
            <p>
              The <code>size</code> prop affects padding and spacing within the{' '}
              <code>IconButton</code>.
            </p>
            <Library.Demo title="size: 'sm', 'md' and 'lg'" withSource>
              <IconButton icon={EditIcon} size="sm" title="Edit" />
              <IconButton icon={EditIcon} size="md" title="Edit" />
              <IconButton icon={EditIcon} size="lg" title="Edit" />
            </Library.Demo>
          </Library.Example>

          <Library.Example title="disableTouchSizing">
            <p>
              By default, <code>IconButton</code> will apply styles for touch
              devices (<code>pointer: coarse</code>) to ensure the minimum
              dimensions are equal or greater to our defined touch-target
              minimums (44×44px). In some cases that is undesirable. Disable
              with the <code>disableTouchSizing</code> boolean prop.
            </p>

            <Library.Demo title="Disabling touch-target sizing" withSource>
              <IconButton icon={EditIcon} title="Edit" disableTouchSizing />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>

      <Library.Section
        title="ButtonUnstyled"
        intro={
          <p>
            <code>ButtonUnstyled</code> is a presentational component that does
            not apply any styling. It can be used for custom buttons.
          </p>
        }
      >
        <Library.Pattern title="Usage">
          <Next.Usage componentName="ButtonUnstyled" />
          <p>
            To enable a focus ring consistent with other interactive elements,
            use the <code>.focus-visible-ring</code> utility class.
          </p>
          <Library.Example>
            <Library.Demo withSource>
              <ButtonUnstyled
                classes="focus-visible-ring bg-slate-0 p-2"
                onClick={() => alert('You clicked it!')}
              >
                My custom button
              </ButtonUnstyled>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
