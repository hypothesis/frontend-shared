import { Panel } from '../../../../';
import { Button, EditIcon, ScrollBox } from '../../../../';
import Library from '../../Library';
import { LoremIpsum } from '../samples';

export default function PanelPage() {
  return (
    <Library.Page
      title="Panel"
      intro={
        <p>
          <code>Panel</code> is a composite component that can be used to create
          panel-like interfaces. For more nuanced control, use <code>Card</code>{' '}
          and its allies.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="Panel" />
          <Library.Example>
            <Library.Demo title="Basic Panel" withSource>
              <Panel title="A simple panel">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Panel>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Working with Panels">
          <Library.Example title="Scrolling content">
            <p>
              If a <code>Panel</code> is a direct child of an element with a
              height constraint and the <code>scrollable</code> prop is set, its
              content will scroll if it exceeds the available height. Header and
              buttons do not scroll.
            </p>

            <Library.Demo
              title="Scrolling content with `scrollable` prop"
              withSource
            >
              <div className="h-[350px]">
                <Panel title="Scrolling content" scrollable>
                  <LoremIpsum />
                </Panel>
              </div>
            </Library.Demo>

            <p>
              More control can be achieved by using <code>ScrollBox</code> or
              other scrolling components instead.
            </p>

            <Library.Demo title="Scrolling certain content" withSource>
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

        <Library.Pattern title="Component API">
          <code>Panel</code> accepts all standard{' '}
          <Library.Link href="/using-components#composite-components-api">
            composite component props
          </Library.Link>
          .
          <Library.Example title="title">
            <Library.Info>
              <Library.InfoItem label="description">
                Panel title
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`string`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="required">
                <code>true</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="buttons">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>ComponentChildren</code> to render as available actions in
                the panel.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`preact.ComponentChildren`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Panel with buttons" withSource>
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
          <Library.Example title="fullWidthHeader">
            <Library.Info>
              <Library.InfoItem label="description">
                Make the header and its bottom border stretch the full width of
                the panel.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`false`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Panel with fullWidthHeader" withSource>
              <Panel title="Panel with full-width header" fullWidthHeader>
                <LoremIpsum size="xs" />
              </Panel>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="icon">
            <Library.Info>
              <Library.InfoItem label="description">
                An <code>IconComponent</code> to render in the panel header.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`IconComponent`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="Panel with icon" withSource>
              <Panel title="Panel title" icon={EditIcon}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Panel>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="onClose">
            <Library.Info>
              <Library.InfoItem label="description">
                Render a close button and invoke this callback function when it
                is clicked.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`() => void`}</code>
              </Library.InfoItem>
            </Library.Info>

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
          <Library.Example title="paddingSize">
            <Library.Info>
              <Library.InfoItem label="description">
                Determine how much padding is used around the content in the
                panel.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'sm' | 'md' | 'lg' | 'none'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource>
              <Panel title="paddingSize: 'sm'" paddingSize="sm">
                <div className="bg-grey-1">
                  <LoremIpsum size="xs" />
                </div>
              </Panel>
            </Library.Demo>

            <Library.Demo withSource>
              <Panel title="paddingSize: 'md'" paddingSize="md">
                <div className="bg-grey-1">
                  <LoremIpsum size="xs" />
                </div>
              </Panel>
            </Library.Demo>

            <Library.Demo withSource>
              <Panel title="paddingSize: 'lg'" paddingSize="lg">
                <div className="bg-grey-1">
                  <LoremIpsum size="xs" />
                </div>
              </Panel>
            </Library.Demo>

            <Library.Demo withSource title="No padding">
              <Panel title="paddingSize: 'none'" paddingSize="none">
                <div className="bg-grey-1">
                  <LoremIpsum size="xs" />
                </div>
              </Panel>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="scrollable">
            <Library.Info>
              <Library.InfoItem label="description">
                Make the content in the panel scroll if the panel exceeds height
                constraints. All scrollable panels have a{' '}
                <code>fullWidthHeader</code> to align with scroll-shadow hints.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`false`}</code>
              </Library.InfoItem>
            </Library.Info>

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
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Panel</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
