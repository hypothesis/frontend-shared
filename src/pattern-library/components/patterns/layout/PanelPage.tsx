import { Panel } from '../../../../next';
import { Button, EditIcon, ScrollBox } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

import { LoremIpsum } from '../samples';

export default function PanelPage() {
  return (
    <Library.Page
      title="Panel"
      intro={
        <p>
          <code>Panel</code> can be used to create panel-like interfaces. For
          more nuanced control, use <code>Card</code> and its allies.
        </p>
      }
    >
      <Library.Section
        title="Panel"
        intro={
          <p>
            <code>Panel</code> is a composite component for standardized panel
            layouts.
          </p>
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

          <Library.Example title="Scrolling long content">
            <p>
              If a <code>Panel</code> is a direct child of an element with a
              height constraint and the <code>scrollable</code> prop is set, its
              content will scroll if it exceeds the available height. Header and
              buttons do not scroll.
            </p>

            <Library.Demo withSource>
              <div className="h-[350px]">
                <Panel
                  title="Scrolling content"
                  buttons={
                    <>
                      <Button>Buttons</Button>
                      <Button>do not</Button>
                      <Button variant="primary">Scroll</Button>
                    </>
                  }
                  scrollable
                >
                  <LoremIpsum />
                </Panel>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Scrolling certain content">
            <p>
              It is also possible to scroll some of the content of a Panel but
              not all of it.
            </p>

            <Library.Demo withSource>
              <div className="h-[350px]">
                <Panel
                  title="Scrolling selected content"
                  buttons={
                    <>
                      <Button>Buttons</Button>
                      <Button>do not</Button>
                      <Button variant="primary">Scroll</Button>
                    </>
                  }
                >
                  <p>This content does not scroll.</p>
                  <ScrollBox>
                    <LoremIpsum />
                  </ScrollBox>
                </Panel>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="onClose">
            <p>
              Provide a function to <code>onClose</code> to render a close
              button.
            </p>
            <Library.Demo title="Panel with close button" withSource>
              <Panel
                title="Panel title"
                onClose={() => alert('you clicked it')}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Panel>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="icon">
            <p>
              An <code>IconComponent</code> provided to the <code>icon</code>{' '}
              prop will be rendered to the left of the title.
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

          <Library.Example title="paddingSize">
            <p>
              This sizing prop defines how much padding will be used around the
              Panel content. Set to <code>none</code> to turn off padding
              (background colors are set here to help show effect of padding).
            </p>
            <Library.Demo withSource>
              <Panel title="paddingSize: 'sm'" paddingSize="sm">
                <div className="bg-grey-1">
                  <LoremIpsum size="sm" />
                </div>
              </Panel>
            </Library.Demo>

            <Library.Demo withSource>
              <Panel title="paddingSize: 'md' (default)" paddingSize="md">
                <div className="bg-grey-1">
                  <LoremIpsum size="sm" />
                </div>
              </Panel>
            </Library.Demo>

            <Library.Demo withSource>
              <Panel title="paddingSize: 'lg'" paddingSize="lg">
                <div className="bg-grey-1">
                  <LoremIpsum size="sm" />
                </div>
              </Panel>
            </Library.Demo>

            <Library.Demo withSource title="No padding">
              <Panel title="paddingSize: 'none'" paddingSize="none">
                <div className="bg-grey-1">
                  <LoremIpsum size="sm" />
                </div>
              </Panel>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="fullWidthHeader">
            <p>
              This boolean prop (default <code>false</code>) determines whether
              the header of the Panel and its bottom border stretches the full
              width of the Panel.
            </p>
            <Library.Demo withSource>
              <Panel title="Panel with full-width header" fullWidthHeader>
                <LoremIpsum size="sm" />
              </Panel>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="scrollable">
            <p>
              This boolean prop (default <code>false</code>) determines whether
              content will scroll if it exceeds height constraints. Scrollable
              Panels have a full-width header so that scrolling shadow hints{' '}
              {"don't"} look funky.
            </p>
            <Library.Demo withSource>
              <div className="h-[300px]">
                <Panel
                  title="Scrolling panel"
                  buttons={
                    <>
                      <Button>Cancel</Button>
                      <Button variant="primary">Do it</Button>
                    </>
                  }
                  scrollable
                >
                  <LoremIpsum size="lg" />
                </Panel>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
