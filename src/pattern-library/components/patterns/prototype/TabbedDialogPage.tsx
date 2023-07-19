//import type { ComponentChildren } from 'preact';
import classnames from 'classnames';
import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

import {
  Button,
  CopyIcon,
  IconButton,
  Input,
  InputGroup,
  TabList,
  Tab,
  CancelIcon,
  Card,
  CardActions,
  CardTitle,
  SocialTwitterIcon,
  SocialFacebookIcon,
  EmailIcon,
} from '../../../../';
import type { PresentationalProps } from '../../../../types';
import Library from '../../Library';
import Dialog from './import-export/Dialog';

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

export default function TabbedDialogPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('share');
  return (
    <Library.Page title="Export/Import Annotations">
      <Library.Section title="Tabbed Panel (Dialog) Pattern">
        <p>TODO</p>
      </Library.Section>
      <Library.Section title="Import/Export UI prototyping">
        <Library.Callout>
          NB: This section is a work in progress.
        </Library.Callout>
        <Library.Pattern title="Adding Export to the Share Panel">
          <Library.Callout>
            NB: The disabled <em>Import</em> tab is rendered in the prototyped
            dialog here to demonstrate what a disabled tab might look like, but
            would not appear to users in this manner.
          </Library.Callout>
          <Library.Demo>
            <div className="w-full bg-grey-2 p-4">
              <Button onClick={() => setPanelOpen(!panelOpen)}>
                {panelOpen ? 'Close' : 'Show'} share panel
              </Button>

              <div className="w-[410px] mx-auto text-[13px] leading-normal">
                {panelOpen && (
                  <Dialog
                    variant="custom"
                    title="Share annotations"
                    onClose={() => setPanelOpen(false)}
                    restoreFocus
                  >
                    <div
                      data-testid="tabbed-header"
                      className="flex items-center"
                    >
                      <TabList classes="grow gap-x-1 -mb-[1px] z-2">
                        <Tab
                          aria-controls="share-panel"
                          variant="tab"
                          selected={selectedTab === 'share'}
                          textContent="Share"
                          onClick={() => setSelectedTab('share')}
                        >
                          Share
                        </Tab>
                        <Tab
                          aria-controls="export-panel"
                          variant="tab"
                          selected={selectedTab === 'export'}
                          textContent="Export"
                          onClick={() => setSelectedTab('export')}
                        >
                          Export
                        </Tab>
                        <Tab
                          aria-controls="import-panel"
                          disabled
                          variant="tab"
                          selected={selectedTab === 'import'}
                          textContent="Import"
                          onClick={() => setSelectedTab('import')}
                        >
                          Import
                        </Tab>
                      </TabList>
                      <IconButton
                        classes="text-[16px] text-grey-6 hover:text-grey-7 hover:bg-grey-3/50"
                        title="Close"
                        icon={CancelIcon}
                        onClick={() => setPanelOpen(false)}
                        variant="custom"
                        size="sm"
                      />
                    </div>
                    <Card>
                      <div
                        id="share-panel"
                        role="tabpanel"
                        className={classnames(
                          'p-3 focus-visible-ring ring-inset',
                          {
                            hidden: selectedTab !== 'share',
                          }
                        )}
                        tabIndex={-1}
                      >
                        <CardTitle>Share annotations from GroupName</CardTitle>
                        <div className="space-y-3 pt-2">
                          <p>
                            <strong>
                              Use this link to share these annotations with
                              anyone:
                            </strong>
                          </p>
                          <InputGroup>
                            <Input
                              id="share-annotations-url"
                              value="https://www.examle.com/fake"
                            />
                            <IconButton
                              icon={CopyIcon}
                              variant="dark"
                              title="copy"
                            />
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
                        </div>
                      </div>
                      <div
                        id="export-panel"
                        role="tabpanel"
                        tabIndex={-1}
                        className={classnames(
                          'p-3 focus-visible-ring ring-inset',
                          {
                            hidden: selectedTab !== 'export',
                          }
                        )}
                      >
                        <CardTitle>Export from GroupName</CardTitle>
                        <div className="space-y-3 pt-2">
                          <p>
                            <strong>2 annotations</strong> will be exported with
                            the following file name:
                          </p>
                          <Input
                            id="export-filename"
                            value="2023-07-10-hypothesis-export"
                          />
                          <CardActions>
                            <Button variant="primary">Export</Button>
                          </CardActions>
                        </div>
                      </div>
                      <div
                        id="import-panel"
                        role="tabpanel"
                        tabIndex={-1}
                        className={classnames(
                          'p-3 focus-visible-ring ring-inset',
                          {
                            hidden: selectedTab !== 'import',
                          }
                        )}
                      >
                        <CardTitle>Import into GroupName</CardTitle>
                        <div className="mt-2 space-y-3">
                          <p>
                            TODO: We will mock this up when we work on the
                            import part of this project.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Dialog>
                )}
              </div>
            </div>
          </Library.Demo>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
