import { IconButton } from '../../../../next';
import { CautionIcon, EditIcon, ReplyIcon, ShareIcon } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function IconButtonPage() {
  return (
    <Library.Page
      title="IconButton"
      intro={
        <p>
          <code>IconButton</code> is a presentational component for{' '}
          <code>button</code> elements that contain solely an icon.
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
            <IconButton variant="dark" title="Watch out!" icon={CautionIcon} />
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
            dimensions are equal or greater to our defined touch-target minimums
            (44×44px). In some cases that is undesirable. Disable with the{' '}
            <code>disableTouchSizing</code> boolean prop.
          </p>

          <Library.Demo title="Disabling touch-target sizing" withSource>
            <IconButton icon={EditIcon} title="Edit" disableTouchSizing />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
