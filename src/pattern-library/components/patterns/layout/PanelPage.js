import { Panel } from '../../../../next';
import { Button, EditIcon } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function PanelPage() {
  return (
    <Library.Page
      title="Panel"
      intro={
        <>
          <p>
            <code>Panel</code> is an opinionated composite component for
            standardized panel layout.
          </p>
          <p>
            For more custom control, use <code>Card</code> and its allies.
          </p>
        </>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Panel</code> is a re-implementation of a legacy component with
          the same name.
        </p>

        <Library.Example title="Migrating to this component">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop <code>icon</code>:{' '}
              <s>
                <code>{'{string}'}</code>
              </s>{' '}
              ➜ now takes <code>{'{IconComponent}'}</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="added">
              Prop <code>containerRef</code>
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>
      <Library.Pattern title="Usage">
        <Next.Usage componentName="Panel" />
        <Library.Example>
          <p>
            All <code>Panel</code>s have a <code>title</code>.
          </p>
          <Library.Demo title="Basic Panel" withSource>
            <Panel title="A simple panel">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Panel>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Props">
        <Library.Example title="onClose">
          <p>
            Provide a function to <code>onClose</code> to render a close button.
          </p>
          <Library.Demo title="Panel with close button" withSource>
            <Panel title="Panel title" onClose={() => alert('you clicked it')}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Panel>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="icon">
          <p>
            An <code>IconComponent</code> provided to the <code>icon</code> prop
            will be rendered to the left of the title.
          </p>
          <Library.Demo withSource>
            <Panel title="Panel title" icon={EditIcon}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Panel>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="buttons">
          <p>
            <code>ComponentChildren</code> passed to the <code>buttons</code>{' '}
            prop will be rendered as actions in the panel.
          </p>
          <Library.Demo withSource>
            <Panel
              title="Panel title"
              buttons={
                <>
                  <Button>Cancel</Button>
                  <Button variant="primary">Do it</Button>
                </>
              }
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Panel>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
