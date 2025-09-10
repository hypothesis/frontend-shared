import classnames from 'classnames';
import { useState } from 'preact/hooks';

import {
  Card,
  EmailIcon,
  ProfileIcon,
  SettingsIcon,
  Tab,
  TabList,
} from '../../../../';
import Library from '../../Library';

export default function TabPage() {
  const [prefPanel, setPrefPanel] = useState('notifications');
  const [sidebarPanel, setSidebarPanel] = useState('annotations');
  const [sidebarPanel2, setSidebarPanel2] = useState('annotations');
  const [sidebarPanel3, setSidebarPanel3] = useState('annotations');
  const [verticalPanel, setVerticalPanel] = useState('notifications');
  return (
    <Library.Page
      title="Tabs"
      intro={
        <p>
          <code>Tab</code> and <code>TabList</code> are presentational
          components for rendering accessible tabs.
        </p>
      }
    >
      <Library.Section
        title="Tab"
        intro={
          <p>
            <code>Tab</code> generates a button with appropriate ARIA
            attributes.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="Tab" />
          <Library.SectionL3>
            <Library.Demo title="Basic Tabs in a tablist" withSource>
              <div role="tablist" className="gap-x-6 flex">
                <Tab>
                  Annotations
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {52}
                  </span>
                </Tab>
                <Tab selected>
                  Page Notes
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {4}
                  </span>
                </Tab>
                <Tab>
                  Orphans
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {2}
                  </span>
                </Tab>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>
        <Library.SectionL2 title="Working with Tabs">
          <Library.SectionL3 title="Accessibility">
            <ul>
              <li>
                <code>Tab</code>s <em>must</em> be direct children of an element
                with <code>role={'"tablist"'}</code> (or use the{' '}
                <code>TabList</code> component).
              </li>
              <li>
                You <em>should</em> provide an{' '}
                <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls">
                  <code>aria-controls</code>
                </a>{' '}
                attribute to each <code>Tab</code>. This is not always feasible
                in our applications.
              </li>
            </ul>
          </Library.SectionL3>
          <Library.SectionL3 title="Preventing text jiggle with textContent">
            <p>
              Bolding is used in our design patterns to indicate a selected tab.
              Without any intervention, textual tabs will jiggle around when
              they are selected. This has a simple cause: bold text takes up
              more room.
            </p>
            <p>
              <strong>
                Setting <code>textContent</code> can help prevent jiggle in
                selected tabs
              </strong>
              . The size of the tab will accommodate this string rendered in
              bold text.
            </p>
            <Library.Demo
              title="Tabs without textContent (jiggle when selected)"
              withSource
            >
              <TabList classes="gap-x-6">
                <Tab
                  selected={sidebarPanel === 'annotations'}
                  onClick={() => setSidebarPanel('annotations')}
                >
                  Annotations
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {52}
                  </span>
                </Tab>
                <Tab
                  selected={sidebarPanel === 'pageNotes'}
                  onClick={() => setSidebarPanel('pageNotes')}
                >
                  Page Notes
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {48}
                  </span>
                </Tab>
                <Tab
                  selected={sidebarPanel === 'orphans'}
                  onClick={() => setSidebarPanel('orphans')}
                >
                  Orphans
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {4}
                  </span>
                </Tab>
              </TabList>
            </Library.Demo>
            <p>
              For tabs that have a simple text label, setting{' '}
              <code>textContent</code> to that string avoids the jiggle. Text
              will still change size (bold text is larger) but the tabs
              themselves do not move.
            </p>
            <Library.Demo title="Tabs with textContent (no jiggle)" withSource>
              <TabList classes="gap-x-6">
                <Tab
                  selected={sidebarPanel2 === 'annotations'}
                  onClick={() => setSidebarPanel2('annotations')}
                  textContent="Annotations"
                >
                  Annotations
                </Tab>
                <Tab
                  selected={sidebarPanel2 === 'pageNotes'}
                  onClick={() => setSidebarPanel2('pageNotes')}
                  textContent="Page Notes"
                >
                  Page Notes
                </Tab>
                <Tab
                  selected={sidebarPanel2 === 'orphans'}
                  onClick={() => setSidebarPanel2('orphans')}
                  textContent="Orphans"
                >
                  Orphans
                </Tab>
              </TabList>
            </Library.Demo>
            <p>
              For tabs with styled or dynamic content, <code>textContent</code>{' '}
              can be set to an estimated {'"widest-possible-text-content"'}{' '}
              value.
            </p>
            <Library.Demo
              title="Tabs with estimated widest-value textContent"
              withSource
            >
              <TabList classes="gap-x-6">
                <Tab
                  selected={sidebarPanel3 === 'annotations'}
                  onClick={() => setSidebarPanel3('annotations')}
                  textContent="Annotations##"
                >
                  Annotations
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {52}
                  </span>
                </Tab>
                <Tab
                  selected={sidebarPanel3 === 'pageNotes'}
                  onClick={() => setSidebarPanel3('pageNotes')}
                  textContent="Page Notes##"
                >
                  Page Notes
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {56}
                  </span>
                </Tab>
                <Tab
                  selected={sidebarPanel3 === 'orphans'}
                  onClick={() => setSidebarPanel3('orphans')}
                  textContent="Orphans##"
                >
                  Orphans
                  <span className="relative bottom-[3px] left-[2px] text-[10px]">
                    {2}
                  </span>
                </Tab>
              </TabList>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>Tab</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>

          <Library.SectionL3 title="icon">
            <Library.Info>
              <Library.InfoItem label="description">
                Optional icon to display on the left, sized proportionally to
                the inherited font size.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>IconComponent</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Tabs with icon" withSource>
              <div role="tablist">
                <Tab icon={ProfileIcon}>Profile</Tab>
                <Tab classes="text-lg" icon={ProfileIcon}>
                  Profile
                </Tab>
                <Tab classes="text-xl" icon={ProfileIcon}>
                  Profile
                </Tab>
              </div>
            </Library.Demo>
          </Library.SectionL3>

          <Library.SectionL3 title="selected">
            <Library.Info>
              <Library.InfoItem label="description">
                Asserts that the <code>Tab</code> is currently selected and the{' '}
                <code>tabpanel</code> it controls (where relevant) is active and
                visible.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="textContent">
            <Library.Info>
              <Library.InfoItem label="description">
                String representing the longest textual content expected for the
                Tab. Used to prevent jiggle when selected.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>string</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="...buttonProps">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Tab</code> forwards{' '}
                <Library.Link href="/input-button">
                  <code>Button</code>
                </Library.Link>{' '}
                component API props, including HTML attributes. Styling API
                props are not forwarded.
              </Library.InfoItem>

              <Library.InfoItem label="type">
                <code>{`Omit<ButtonProps, 'variant' | 'size' | 'unstyled'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Styling API">
          <p>
            <code>Tab</code> accepts the following props from the{' '}
            <Library.Link href="/using-components#presentational-components-styling-api">
              presentational component styling API
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Set to <code>custom</code> to remove theming styles and provide
                your own styling with <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'text' | 'tab' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{"'text'"}</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo title="variant: 'tab'" withSource>
              <div role="tablist" className="flex">
                <Tab variant="tab">Share</Tab>
                <Tab selected variant="tab">
                  Import
                </Tab>
                <Tab variant="tab">Export</Tab>
              </div>
            </Library.Demo>
          </Library.SectionL3>

          <Library.SectionL3 title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set relative internal spacing and padding. Set to{' '}
                <code>{`'custom'`}</code> to provide your own sizing styles with{' '}
                <code>classes</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'md' | 'custom'`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>

          <Library.SectionL3 title="unstyled">
            <Library.Info>
              <Library.InfoItem label="description">
                Set to remove all styling.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
      <Library.Section
        title="TabList"
        intro={
          <p>
            <code>TabList</code> is a presentational component that provides a{' '}
            <code>{'role="tablist"'}</code> container and arrow-key navigation
            as outlined by{' '}
            <a href="https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/">
              WAI-ARIA authoring practices
            </a>
            .
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="TabList" />
          <Library.SectionL3>
            <p>
              This example demonstrates a full Tab pattern with{' '}
              <code>TabList</code>, <code>Tab</code> and some tabpanels. The
              tabpanels have been made focusable here as they contain no
              focusable elements: pressing <kbd>tab</kbd> when in the tablist
              will move focus to the active tabpanel. Tabs may be navigated with
              the left and right arrows.
            </p>
            <Library.Demo withSource title="Full Tab pattern example">
              <div>
                <TabList classes="w-[400px] gap-x-6 my-4">
                  <Tab
                    aria-controls="profile-panel"
                    textContent="Profile"
                    selected={prefPanel === 'profile'}
                    onClick={() => setPrefPanel('profile')}
                  >
                    Profile
                  </Tab>
                  <Tab
                    aria-controls="notifications-panel"
                    textContent="Notifications"
                    selected={prefPanel === 'notifications'}
                    onClick={() => setPrefPanel('notifications')}
                  >
                    Notifications
                  </Tab>
                  <Tab
                    aria-controls="account-panel"
                    textContent="Account"
                    selected={prefPanel === 'account'}
                    onClick={() => setPrefPanel('account')}
                  >
                    Account
                  </Tab>
                </TabList>
                <Card
                  classes={classnames(
                    { hidden: prefPanel !== 'profile' },
                    'p-2 focus-visible:ring focus-visible:outline-none',
                  )}
                  id="profile-panel"
                  role="tabpanel"
                  tabIndex={0}
                  variant="flat"
                >
                  Profile
                </Card>
                <Card
                  classes={classnames(
                    { hidden: prefPanel !== 'notifications' },
                    'p-2 focus-visible:ring focus-visible:outline-none',
                  )}
                  id="notifications-panel"
                  role="tabpanel"
                  tabIndex={0}
                  variant="flat"
                >
                  Notifications
                </Card>
                <Card
                  classes={classnames(
                    { hidden: prefPanel !== 'account' },
                    'p-2 focus-visible:ring focus-visible:outline-none',
                  )}
                  id="account-panel"
                  role="tabpanel"
                  tabIndex={0}
                  variant="flat"
                >
                  Account
                </Card>
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <p>
            <code>TabList</code> accepts all standard{' '}
            <Library.Link href="/using-components#presentational-components-api">
              presentational component props
            </Library.Link>
            .
          </p>
          <Library.SectionL3 title="vertical">
            <Library.Info>
              <Library.InfoItem label="description">
                Indicates that the tablist should be laid out vertically. When
                set, arrow-key navigation using up and down arrows is enabled.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>boolean</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>false</code>
              </Library.InfoItem>
            </Library.Info>

            <Library.Demo withSource title="Vertical TabList">
              <TabList classes="gap-y-2" vertical>
                <Tab
                  icon={ProfileIcon}
                  onClick={() => setVerticalPanel('profile')}
                  selected={verticalPanel === 'profile'}
                  textContent="Profile"
                >
                  Profile
                </Tab>
                <Tab
                  icon={EmailIcon}
                  onClick={() => setVerticalPanel('notifications')}
                  selected={verticalPanel === 'notifications'}
                  textContent="Notifications"
                >
                  Notifications
                </Tab>
                <Tab
                  icon={SettingsIcon}
                  onClick={() => setVerticalPanel('account')}
                  selected={verticalPanel === 'account'}
                  textContent="Account"
                >
                  Account
                </Tab>
              </TabList>
            </Library.Demo>
          </Library.SectionL3>

          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>TabList</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
