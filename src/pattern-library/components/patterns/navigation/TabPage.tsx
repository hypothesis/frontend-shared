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
        <Library.Pattern>
          <Library.Usage componentName="Tab" />
          <Library.Example>
            <Library.Demo title="Basic (non-interactive) example" withSource>
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
          </Library.Example>

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
              attribute to each <code>Tab</code>. This is not always feasible in
              our applications.
            </li>
          </ul>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="aria-controls">
            An element with <code>{'role="tab"'}</code> should set an{' '}
            <code>aria-controls</code> attribute when possible. See the full{' '}
            <code>TabList</code> example below.
          </Library.Example>

          <Library.Example title="icon">
            <code>Tab</code>s may have icons. The icon will be displayed on the
            left and sized proportionally to the inherited font size.
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
          </Library.Example>

          <Library.Example title="selected">
            This boolean property asserts that the <code>Tab</code> is currently
            selected and the <code>tabpanel</code> it controls (where relevant)
            is active and visible.
          </Library.Example>

          <Library.Example title="textContent">
            <p>
              Bolding is used in our design patterns to indicate a selected tab.
              Without any intervention, textual tabs will jiggle around when
              they are selected. This has a simple cause: bold text takes up
              more room.
            </p>
            <p>
              <code>textContent</code> is a string representing the text content
              of the tab when selected.{' '}
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
              value. A trial and error approach worked here:
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
          </Library.Example>
        </Library.Pattern>
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
        <Library.Pattern title="Status">
          <p>
            <code>TabList</code> is a new component.
          </p>
        </Library.Pattern>
        <Library.Pattern>
          <Library.Usage componentName="TabList" />
          <Library.Example>
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
                    'p-2 focus-visible-ring'
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
                    'p-2 focus-visible-ring'
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
                    'p-2 focus-visible-ring'
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
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="vertical">
            <p>
              By default, <code>TabList</code> layout is horizontal. Set the
              boolean <code>vertical</code> prop for a vertical layout. This
              will also enable arrow-key navigation using the up and down
              arrows.
            </p>
            <p>
              The following example demonstrates vertical layout and up/down
              keyboard navigation.
            </p>
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
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
