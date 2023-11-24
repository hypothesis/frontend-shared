import { Button, IconButton } from '../../../../';
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
              <Button variant="custom" classes="border rounded-md">
                Default
              </Button>
              <Button variant="custom" classes="border rounded-md">
                <EditIcon />
                Default
              </Button>
              <Button variant="custom" pressed classes="border rounded-md">
                Pressed
              </Button>
              <Button variant="custom" expanded classes="border rounded-md">
                Expanded
              </Button>
              <Button variant="custom" disabled classes="border rounded-md">
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
                classes="border rounded-md p-2 bg-stone-100 font-normal color-slate-600 hover:bg-stone-50 hover:color-slate-700 hover:shadow-lg"
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
            <code>IconButton</code> is for icon-only <code>Button</code>s.
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

        <Library.Pattern title="Working with IconButtons">
          <Library.Example title="Styling the icon">
            <p>
              If you need more control over icon styles, use an icon component
              directly in the content instead of passing an <code>icon</code>{' '}
              prop.
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
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <Library.Example title="title">
            <Library.Info>
              <Library.InfoItem label="description">
                A <code>title</code> is required for <code>IconButton</code>s.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
              </Library.InfoItem>
              <Library.InfoItem label="required">
                <code>true</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="disableTouchSizing">
            <Library.Info>
              <Library.InfoItem label="status">
                <Library.StatusChip status="deprecated" /> Set <code>size</code>{' '}
                to <code>{`'custom'`}</code> and set sizing classes manually
                instead.
              </Library.InfoItem>
              <Library.InfoItem label="description">
                Disable minimum sizing on touch devices (
                <code>pointer: coarse</code>). Buttons will be at least 44px in
                each dimension on these devices by default.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>

          <Library.Example title="...buttonProps">
            <code>IconButton</code> accepts and forwards all props from the{' '}
            <code>Button</code> component API.
          </Library.Example>

          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>IconButton</code> accepts HTML attribute props applicable
                to <code>HTMLButtonElement</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Omit<preact.JSX.HTMLAttributes<HTMLButtonElement>, 'icon' | 'size'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Styling API">
          <p>
            <code>IconButton</code> accepts the following props from the{' '}
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
                <code>{`'primary' | 'secondary' | 'dark' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'secondary'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <p>
              The following examples show themed <code>IconButton</code>s in
              default state, <code>pressed</code>, <code>expanded</code> and{' '}
              <code>disabled</code>.
            </p>

            <Library.Demo title="variant: 'secondary'" withSource>
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

            <Library.Demo
              title="variant: 'custom' with custom theming"
              withSource
            >
              <IconButton
                classes="border rounded-md text-slate-600"
                variant="custom"
                title="Watch out!"
                icon={CautionIcon}
              />
              <IconButton
                classes="border rounded-md text-slate-800 bg-stone-100 border-slate-400"
                variant="custom"
                title="Watch out!"
                icon={CautionIcon}
                pressed
              />
              <IconButton
                variant="custom"
                classes="border rounded-md text-slate-800 bg-stone-100 border-slate-400"
                title="Watch out!"
                icon={CautionIcon}
                expanded
              />
              <IconButton
                classes="border rounded-md text-slate-400"
                variant="custom"
                title="Watch out!"
                icon={CautionIcon}
                disabled
              />
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set relative internal sizing. Set to {`'custom'`} to disable
                sizing classes and set your own with <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'xs' | 'sm' | 'md' | 'lg' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo
              title="size: 'xs', 'sm', 'md', 'lg' and 'custom'"
              withSource
            >
              <IconButton icon={EditIcon} size="xs" title="Edit" />
              <IconButton icon={EditIcon} size="sm" title="Edit" />
              <IconButton icon={EditIcon} size="md" title="Edit" />
              <IconButton icon={EditIcon} size="lg" title="Edit" />
              <IconButton
                icon={EditIcon}
                size="custom"
                title="Edit"
                classes="p-3"
              />
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
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
