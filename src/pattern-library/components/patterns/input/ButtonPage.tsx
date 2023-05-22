import { Button, IconButton, ButtonBase } from '../../../../';
import {
  CancelIcon,
  CheckIcon,
  EditIcon,
  ReplyIcon,
  ShareIcon,
  CautionIcon,
} from '../../../../';
import Library from '../../Library';

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
      <Library.Section title="Button">
        <Library.Pattern>
          <Library.Usage componentName="Button" />
          <Library.Example>
            <Library.Demo title="Basic Button" withSource>
              <Button
                icon={CheckIcon}
                onClick={() => alert('You clicked the button')}
              >
                Click me
              </Button>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <code>Button</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="expanded">
            <Library.Info>
              <Library.InfoItem label="description">
                This {"button's"} associated content is expanded.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="icon">
            <Library.Info>
              <Library.InfoItem label="description">
                An SVG icon to display to the left of the {"button's"} content.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>IconComponent</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="pressed">
            <Library.Info>
              <Library.InfoItem label="description">
                This button is active
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="title">
            <Library.Info>
              <Library.InfoItem label="description">
                Used to set an <code>aria-label</code> attribute
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Button</code> accepts HTML attribute props applicable to{' '}
                <code>HTMLButtonElement</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Omit<preact.JSX.HTMLAttributes<HTMLButtonElement>, 'icon' | 'size'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Styling API">
          <p>
            <code>Button</code> accepts the following props from the{' '}
            <Library.Link href="/using-components#presentational-components-styling-api">
              presentational component styling API
            </Library.Link>
            .
          </p>
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Set a defined theme on the button. Set to {`'custom'`} to
                disable theming and provide your own theming with{' '}
                <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'primary' | 'secondary' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'secondary'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="variant: 'secondary'" withSource>
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

            <Library.Demo title="variant: 'custom' (custom theming)" withSource>
              <Button variant="custom" classes="border rounded">
                Default
              </Button>
              <Button variant="custom" classes="border rounded">
                <EditIcon />
                Default
              </Button>
              <Button variant="custom" pressed classes="border rounded">
                Pressed
              </Button>
              <Button variant="custom" expanded classes="border rounded">
                Expanded
              </Button>
              <Button variant="custom" disabled classes="border rounded">
                Disabled
              </Button>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the relative internal sizing of the button. Set to{' '}
                {`'custom'`} to disable sizing classes and set your own with{' '}
                <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'xs' | 'sm' | 'md' | 'lg' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Button sizes" withSource>
              <Button icon={EditIcon} size="xs">
                (xs)
              </Button>
              <Button icon={EditIcon} size="sm">
                (sm)
              </Button>
              <Button icon={ReplyIcon} size="md">
                (md)
              </Button>
              <Button icon={CheckIcon} size="lg">
                (lg)
              </Button>
              <Button icon={CheckIcon} size="custom" classes="p-2 gap-x-3">
                (custom)
              </Button>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="unstyled">
            <Library.Info>
              <Library.InfoItem label="description">
                Set this to disable all styling and provide your own styling
                with <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo
              title="unstyled Button with custom styling"
              withSource
            >
              <Button
                unstyled
                classes="border rounded p-2 bg-stone-100 font-normal color-slate-600 hover:bg-stone-50 hover:color-slate-700 hover:shadow-lg"
              >
                Custom button
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
        <Library.Pattern>
          <Library.Usage componentName="IconButton" />
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
              For customization, use <code>ButtonBase</code>.
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
            <Library.Demo title="size: 'xs', 'sm', 'md' and 'lg'" withSource>
              <IconButton icon={EditIcon} size="xs" title="Edit" />
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
        title="ButtonBase"
        intro={
          <>
            <p>
              <code>ButtonBase</code> is a base presentational component that
              allows style customization of buttons.
            </p>
            <p>
              <code>ButtonBase</code> applies minimal common styling. Turn off
              all styling by setting the <code>unstyled</code> prop.
            </p>
          </>
        }
      >
        <Library.Pattern>
          <Library.Usage componentName="ButtonBase" />

          <Library.Example>
            <p>
              <code>ButtonBase</code> applies color transition and layout basic
              styling, but no colors, padding, hover or state styling.
            </p>
            <p>
              This example shows a <code>ButtonBase</code> with some additional{' '}
              <code>classes</code>. These <code>classes</code> are appended to
              the {"component's"} base styling classes.
            </p>

            <Library.Demo
              title="ButtonBase with some additional styles"
              withSource
            >
              <ButtonBase
                classes="border bg-grey-0 hover:bg-grey-1"
                onClick={() => alert('You clicked the button')}
              >
                <CheckIcon />
                Click me
              </ButtonBase>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
        <Library.Pattern title="Props">
          <Library.Example title="unstyled">
            <p>
              Set <code>unstyled</code> to style your button from scratch. This
              example shows an unstyled <code>ButtonBase</code> with the same{' '}
              <code>classes</code> as above. <em>Only</em> the classes in{' '}
              <code>classes</code> are applied.
            </p>
            <Library.Demo title="ButtonBase unstyled" withSource>
              <ButtonBase
                classes="border bg-grey-0 hover:bg-grey-1"
                onClick={() => alert('You clicked the button')}
                unstyled
              >
                <CheckIcon /> Click me
              </ButtonBase>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
