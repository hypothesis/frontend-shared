//import type { ComponentChildren } from 'preact';
import classnames from 'classnames';
import type { ComponentChildren, JSX } from 'preact';
import { useState } from 'preact/hooks';

import {
  Button,
  Card,
  CardActions,
  CardTitle,
  CloseButton,
  Dialog,
  IconButton,
  Input,
  InputGroup,
  OptionButton,
  Slider,
  TabList,
  Tab,
} from '../../../../';
import {
  CopyIcon,
  EmailIcon,
  SocialTwitterIcon,
  SocialFacebookIcon,
} from '../../../../';
import type { PresentationalProps } from '../../../../types';
import Library from '../../Library';

type DividerProps = PresentationalProps & {
  variant: 'full' | 'center' | 'custom';
} & JSX.HTMLAttributes<HTMLElement>;

function Divider({ variant }: DividerProps) {
  return (
    <hr
      className={classnames('border-t border-px h-px', {
        'mx-2': variant === 'center',
      })}
    />
  );
}

type TabListHeaderProps = PresentationalProps & {
  onClose?: () => void;
};

function TabListHeader({ children, onClose }: TabListHeaderProps) {
  return (
    <div data-testid="tabbed-header" className="flex items-center">
      {onClose && (
        // This might be extractable as, say, a CloseButton component
        <CloseButton
          classes="text-[16px] text-grey-6 hover:text-grey-7 hover:bg-grey-3/50 order-last"
          title="Close"
          variant="custom"
          size="sm"
        />
      )}
      <TabList classes="grow gap-x-1 -mb-[1px] z-2">{children}</TabList>
    </div>
  );
}

type TabPanelProps = PresentationalProps & {
  active?: boolean;
  title?: ComponentChildren;
} & JSX.HTMLAttributes<HTMLDivElement>;

function TabPanel({
  children,
  active,
  title,
  ...htmlAttributes
}: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      className={classnames('p-3 focus-visible-ring ring-inset', {
        hidden: !active,
      })}
      {...htmlAttributes}
    >
      {title && <CardTitle>{title}</CardTitle>}
      <div className="space-y-3 pt-2">{children}</div>
    </div>
  );
}

function TabbedDialog() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('one');
  return (
    <div className="w-full flex gap-x-4 h-[300px]">
      <div>
        <OptionButton
          onClick={() => setPanelOpen(!panelOpen)}
          selected={panelOpen}
        >
          Toggle dialog
        </OptionButton>
      </div>

      <div className="w-[450px] mx-auto">
        {panelOpen && (
          <Dialog
            variant="custom"
            onClose={() => setPanelOpen(false)}
            restoreFocus
          >
            <TabListHeader onClose={() => setPanelOpen(false)}>
              <Tab
                aria-controls="one-panel"
                id="one-panel-tab"
                variant="tab"
                selected={selectedTab === 'one'}
                textContent="One"
                onClick={() => setSelectedTab('one')}
              >
                One
              </Tab>
              <Tab
                aria-controls="two-panel"
                id="two-panel-tab"
                variant="tab"
                selected={selectedTab === 'two'}
                textContent="Two"
                onClick={() => setSelectedTab('two')}
              >
                Two
              </Tab>
              <Tab
                aria-controls="three-panel"
                id="three-panel-tab"
                variant="tab"
                selected={selectedTab === 'three'}
                textContent="Three"
                onClick={() => setSelectedTab('three')}
                disabled
              >
                Three
              </Tab>
            </TabListHeader>
            <Card
              classes={selectedTab === 'one' ? 'rounded-tl-none' : undefined}
            >
              <TabPanel
                id="one-panel"
                active={selectedTab === 'one'}
                aria-labelledby="one-panel-tab"
                title="The first tab"
                tabIndex={0}
              >
                <p>
                  <strong>This tab panel has no focusable elements</strong>, so
                  the tabpanel itself can take focus.
                </p>
              </TabPanel>
              <TabPanel
                id="two-panel"
                active={selectedTab === 'two'}
                aria-labelledby="two-panel-tab"
                title="The second tab"
              >
                <p>
                  This tab panel has focusable elements, so the tabpanel itself
                  does not take focus.
                </p>
                <Input id="two-panel-input" />
                <CardActions>
                  <Button variant="primary">Save</Button>
                </CardActions>
              </TabPanel>
              <TabPanel
                aria-labelledby="three-panel-tab"
                id="three-panel"
                active={selectedTab === 'three'}
                title="Tab number three"
              >
                <p>Nothing to see here.</p>
              </TabPanel>
            </Card>
          </Dialog>
        )}
      </div>
    </div>
  );
}

function TabbedSharePanel() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('share');
  return (
    <div className="w-full flex gap-x-4 bg-grey-2 p-4 h-[300px]">
      <div>
        <OptionButton
          onClick={() => setPanelOpen(!panelOpen)}
          selected={panelOpen}
        >
          Toggle dialog
        </OptionButton>
      </div>

      <div className="w-[410px] mx-auto text-[13px] leading-normal">
        {panelOpen && (
          <Dialog
            variant="custom"
            onClose={() => setPanelOpen(false)}
            transitionComponent={Slider}
            restoreFocus
          >
            <TabListHeader onClose={() => setPanelOpen(false)}>
              <Tab
                aria-controls="share-panel"
                id="share-panel-tab"
                variant="tab"
                selected={selectedTab === 'share'}
                textContent="Share"
                onClick={() => setSelectedTab('share')}
              >
                Share
              </Tab>
              <Tab
                aria-controls="export-panel"
                id="export-panel-tab"
                variant="tab"
                selected={selectedTab === 'export'}
                textContent="Export"
                onClick={() => setSelectedTab('export')}
              >
                Export
              </Tab>
            </TabListHeader>
            <Card
              classes={selectedTab === 'share' ? 'rounded-tl-none' : undefined}
            >
              <TabPanel
                id="share-panel"
                active={selectedTab === 'share'}
                aria-labelledby="share-panel-tab"
                title="Share annotations from GroupName"
              >
                <p>
                  <strong>
                    Use this link to share these annotations with anyone:
                  </strong>
                </p>
                <InputGroup>
                  <Input
                    id="share-annotations-url"
                    value="https://www.examle.com/fake"
                  />
                  <IconButton icon={CopyIcon} variant="dark" title="copy" />
                </InputGroup>
                <Divider variant="full" />
                <ul className="flex flex-row gap-x-4 items-center justify-center text-grey-6">
                  <li>
                    <SocialTwitterIcon className="w-6 h-6" />
                  </li>
                  <li>
                    <SocialFacebookIcon className="w-6 h-6" />
                  </li>
                  <li>
                    <EmailIcon className="w-6 h-6" />
                  </li>
                </ul>
              </TabPanel>
              <TabPanel
                id="export-panel"
                active={selectedTab === 'export'}
                aria-labelledby="export-panel-tab"
                title="Export from GroupName"
              >
                <p>
                  Export <strong>2 annotations</strong> in a file named:
                </p>
                <Input
                  id="export-filename"
                  value="2023-07-10-hypothesis-export.json"
                />
                <CardActions>
                  <Button variant="primary">Export</Button>
                </CardActions>
              </TabPanel>
            </Card>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default function TabbedDialogPage() {
  return (
    <Library.Page title="Export/Import Annotations">
      <Library.Section title="Tabbed Panel (Dialog) Pattern">
        <Library.Example title="General tabbed dialog pattern">
          <p>
            This design pattern extends the panel-like dialog layout with tabs
            and an integrated close button. Tabs may be disabled.
          </p>
          <Library.Demo>
            <TabbedDialog />
          </Library.Demo>
        </Library.Example>
      </Library.Section>
      <Library.Section title="Import/Export">
        <Library.Pattern title="Exporting">
          <Library.Example title="Adding Export tab to existing share panel">
            <p>
              Client-specific font sizes and sidebar background color are
              applied to this tabbed dialog to show how it would appear in situ.
            </p>
            <Library.Demo>
              <TabbedSharePanel />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
