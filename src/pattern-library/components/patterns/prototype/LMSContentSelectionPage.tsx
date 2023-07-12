import classnames from 'classnames';
import type { ComponentChildren } from 'preact';

import {
  ArrowRightIcon,
  Button,
  Card,
  CardHeader,
  CardContent,
  FilePdfIcon,
  FilePdfFilledIcon,
  GoogleDriveIcon,
  IconButton,
  InputGroup,
  Input,
  LinkIcon,
  OneDriveIcon,
  VitalSourceIcon,
} from '../../../../';
import type { IconComponent } from '../../../../types';
import Library from '../../Library';

function Button1({ children }: { children: ComponentChildren }) {
  return (
    <Button
      classes="bg-slate-0 rounded-sm border border-slate-3 gap-x-1 p-2"
      variant="custom"
      size="custom"
    >
      {children}
    </Button>
  );
}

function Button2({
  children,
  contentType = 'pdf',
}: {
  children: ComponentChildren;
  contentType?: string;
}) {
  return (
    <Button
      classes="w-[15em] bg-slate-0 rounded-sm border border-slate-3 gap-x-2 items-center"
      variant="custom"
      size="custom"
    >
      <div className="grow text-start p-2">
        <strong>{children}</strong>
      </div>
      <div className="text-end p-2">
        <span className="uppercase text-[11px]">{contentType}</span>
      </div>
    </Button>
  );
}

function Button3({
  children,
  contentType = 'pdf',
}: {
  children: ComponentChildren;
  contentType?: string;
}) {
  return (
    <Button
      classes="w-[15em] rounded-sm gap-x-2 p-2 border border-stone-300 bg-stone-50"
      size="custom"
      variant="custom"
    >
      <div className="grow text-start">
        <strong className="text-slate-600">{children}</strong>
      </div>
      <div className="text-end">
        <span className="uppercase text-[0.8em] text-stone-500">
          {contentType}
        </span>
      </div>
    </Button>
  );
}

function Button4({
  children,
  contentType = 'pdf',
}: {
  children: ComponentChildren;
  contentType?: string;
}) {
  return (
    <Button
      classes="w-full bg-stone-50 rounded-sm border border-stone-300 gap-x-2 items-center"
      size="custom"
      variant="custom"
    >
      <div className="grow text-start p-2">
        <strong className="text-slate-600">{children}</strong>
      </div>
      <div className="text-end p-2">
        <span className="uppercase text-[11px] text-stone-500">
          {contentType}
        </span>
      </div>
    </Button>
  );
}

function Button5({
  children,
  icon,
  contentType = 'pdf',
}: {
  children: ComponentChildren;
  contentType?: string;
  icon?: IconComponent;
}) {
  const Icon = icon ?? FilePdfFilledIcon;
  return (
    <Button
      classes="w-full bg-stone-50 hover:bg-stone-100 rounded-[4px] border border-stone-300 hover:border-stone-400 items-center"
      size="custom"
      variant="custom"
    >
      <div className="p-1.5 bg-stone-200 rounded-l-[4px]">
        <Icon className="text-stone-500" />
      </div>
      <div className="grow text-start pl-1">
        <strong className="text-slate-600">{children}</strong>
      </div>
      <div className="text-end pr-2">
        <span className="uppercase text-[11px] text-stone-500">
          {contentType}
        </span>
      </div>
    </Button>
  );
}

function Button6({
  children,
  icon,
  contentType = 'pdf',
  selected = false,
}: {
  children: ComponentChildren;
  contentType?: string;
  icon?: IconComponent;
  selected?: boolean;
}) {
  const Icon = icon ?? FilePdfIcon;
  return (
    <Button
      classes={classnames(
        'group bg-stone-50 hover:bg-slate-100 shadow hover:shadow-lg rounded-[4px] border border-stone-300 hover:border-stone-400 justify-center',
        {
          'shadow-inner': selected,
        }
      )}
      size="custom"
      variant="custom"
    >
      <div className="flex flex-col items-center w-full gap-y-2 pt-2">
        <Icon
          className={classnames('group-hover:text-slate-400 w-10 h-10', {
            'text-stone-300': !selected,
            'text-slate-400': selected,
          })}
        />
        <div className="grow">
          <strong className="text-slate-600 text-[15px]">{children}</strong>
        </div>
        <div
          className={classnames(
            'group-hover:bg-slate-500 w-full p-0.5 rounded-b-[4px]',
            {
              'bg-stone-200': !selected,
              'bg-slate-500': selected,
            }
          )}
        >
          <span
            className={classnames(
              'uppercase text-[11px] group-hover:text-stone-50',
              {
                'text-stone-500': !selected,
                'text-stone-50': selected,
              }
            )}
          >
            {contentType}
          </span>
        </div>
      </div>
    </Button>
  );
}

export default function LMSContentSelectionPage() {
  return (
    <Library.Page
      title="LMS content selection UI"
      intro={
        <p>
          UI problem: There are too many heavy, identical, wordy buttons on the
          LMS content-selection screen, and they are starting to exceed
          available space.
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern title="Current UI">
          <Library.Example>
            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="flex flex-col space-y-1">
                          <Button variant="primary">
                            Enter URL of web page or PDF
                          </Button>
                          <Button variant="primary">
                            Select PDF from Canvas
                          </Button>
                          <Button variant="primary">
                            Select PDF from Google Drive
                          </Button>
                          <Button variant="primary">
                            Select JSTOR article
                          </Button>
                          <Button variant="primary">
                            Select PDF from OneDrive
                          </Button>
                          <Button variant="primary">
                            Select book from VitalSource
                          </Button>
                        </div>
                        <div className="grow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Iterative: Round 1">
          <Library.Example title="Use grid layout">
            <p>
              It is quick to put the buttons in a two-column grid layout.
              However, because of their heavy, dark color, one ends up with an
              unpleasant optical illusion between button corners.
            </p>
            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="primary">
                            Enter URL of web page or PDF
                          </Button>
                          <Button variant="primary">
                            Select PDF from Canvas
                          </Button>
                          <Button variant="primary">
                            Select PDF from Google Drive
                          </Button>
                          <Button variant="primary">
                            Select JSTOR article
                          </Button>
                          <Button variant="primary">
                            Select PDF from OneDrive
                          </Button>
                          <Button variant="primary">
                            Select book from VitalSource
                          </Button>
                        </div>
                        <div className="grow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Grid with lightened buttons">
            <p>
              Switching buttons from the <code>primary</code> variant to the{' '}
              <code>secondary</code> variant helps the visual artifacts, but
              buttons are hard to scan.
            </p>

            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button>Enter URL of web page or PDF</Button>
                          <Button>Select PDF from Canvas</Button>
                          <Button>Select PDF from Google Drive</Button>
                          <Button>Select JSTOR article</Button>
                          <Button>Select PDF from OneDrive</Button>
                          <Button>Select book from VitalSource</Button>
                        </div>
                        <div className="grow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Lightening and separating buttons">
            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button1>Enter URL of web page or PDF</Button1>
                          <Button1>Select PDF from Canvas</Button1>
                          <Button1>Select PDF from Google Drive</Button1>
                          <Button1>Select JSTOR article</Button1>
                          <Button1>Select PDF from OneDrive</Button1>
                          <Button1>Select book from VitalSource</Button1>
                        </div>
                        <div className="grow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Adjusting button text">
            <p>
              As a first step, we can shorten the button text and use some
              selective bolding. However, this still feels hard to scan.
            </p>

            <Library.Demo title="Shorter and bolded">
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button1>
                            <strong>URL</strong> to web page or PDF
                          </Button1>
                          <Button1>
                            PDF from <strong>Canvas</strong>
                          </Button1>
                          <Button1>
                            PDF from <strong>Google Drive</strong>
                          </Button1>
                          <Button1>
                            <strong>JSTOR</strong> article
                          </Button1>
                          <Button1>
                            PDF from <strong>OneDrive</strong>
                          </Button1>
                          <Button1>
                            Book from <strong>VitalSource</strong>
                          </Button1>
                        </div>
                        <div className="grow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Re-arranging button text">
            <p>
              We can re-arrange the button text for consistency. This is not
              amazing, but may be sensible enough as a starting point.
            </p>

            <Library.Demo title="Changing wording">
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button1>
                            <strong>URL</strong> to web page or PDF
                          </Button1>
                          <Button1>
                            <strong>Canvas</strong> PDF
                          </Button1>
                          <Button1>
                            <strong>Google Drive</strong> PDF
                          </Button1>
                          <Button1>
                            <strong>JSTOR</strong> article
                          </Button1>
                          <Button1>
                            <strong>OneDrive</strong> PDF
                          </Button1>
                          <Button1>
                            <strong>VitalSource</strong> book
                          </Button1>
                        </div>
                        <div className="grow" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Separating content types from source">
            <p>
              We can style the content type (e.g. PDF) quieter and aligned
              right.
            </p>

            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <CardContent size="lg" classes="leading-none">
                  <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
                    <div className="text-end leading-none text-[14px]">
                      <span className="font-medium text-slate-7">
                        Assignment content
                      </span>
                    </div>
                    <div className="space-y-3 text-[13px]">
                      <p>
                        You can select content for your assignment from one of
                        the following sources:
                      </p>
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button2 contentType="web page | PDF">URL</Button2>
                          <Button2>Canvas</Button2>
                          <Button2>Google Drive</Button2>
                          <Button2 contentType="article">JSTOR</Button2>
                          <Button2>OneDrive</Button2>
                          <Button2 contentType="book">VitalSource</Button2>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Working with spacing, size and color">
            <p>
              We can introduce a little subtle color (slate blue), increase
              overall spacing, and tighten up the instructive text. The content
              source name is emphasized and the content types are quieter.
            </p>

            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <div className="px-3 py-6">
                  <div className="grid grid-cols-[12em_1fr] gap-x-6 gap-y-3">
                    <div className="space-y-1.5 pt-1">
                      <div className="leading-none text-[14px] text-end font-medium text-slate-600 uppercase">
                        Assignment content
                      </div>
                      <div className="text-[14px] text-end leading-none font-normal text-stone-500">
                        <p>Select content for your assignment</p>
                      </div>
                    </div>
                    <div className="space-y-6 text-[14px] leading-none">
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button3 contentType="web page | PDF">URL</Button3>
                          <Button3>Canvas</Button3>
                          <Button3>Google Drive</Button3>
                          <Button3 contentType="article">JSTOR</Button3>
                          <Button3>OneDrive</Button3>
                          <Button3 contentType="book">VitalSource</Button3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Simplifying">
            <p>
              Do we really need <em>any</em> explanatory text?
            </p>

            <Library.Demo>
              <Card>
                <CardHeader variant="secondary" title="Assignment details" />
                <div className="px-3 py-6">
                  <div className="grid grid-cols-[12em_1fr] gap-x-6 gap-y-3">
                    <div className="space-y-1.5 pt-1">
                      <div className="leading-none text-[14px] text-end font-medium text-slate-600 uppercase">
                        Select content
                      </div>
                    </div>
                    <div className="space-y-6 text-[14px] leading-none">
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Button3 contentType="web page | PDF">URL</Button3>
                          <Button3>Canvas</Button3>
                          <Button3>Google Drive</Button3>
                          <Button3 contentType="article">JSTOR</Button3>
                          <Button3>OneDrive</Button3>
                          <Button3 contentType="book">VitalSource</Button3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Extracting URL option">
            <p>
              It could be convenient to allow URL entry without having to go to
              another modal dialog, but it might be too busy of an interface.
            </p>

            <Library.Demo>
              <div className="w-[700px]">
                <Card>
                  <CardHeader variant="secondary" title="Assignment details" />
                  <div className="px-3 py-6">
                    <div className="grid grid-cols-[11em_1fr] gap-x-4 gap-y-3">
                      <div className="space-y-1.5">
                        <div className="leading-none text-[14px] text-end font-medium text-slate-600 uppercase">
                          Assignment content
                        </div>
                      </div>
                      <div className="text-[14px] leading-none text-stone-600 space-y-3">
                        <div className="space-y-2 mb-4">
                          <label htmlFor="url-entry">
                            Enter URL to any publicly-accessible web page or
                            PDF:
                          </label>
                          <div className="flex items-center">
                            <InputGroup>
                              <Input
                                placeholder="https://www.example.com"
                                id="url-entry"
                                name="url"
                              />
                              <IconButton
                                icon={ArrowRightIcon}
                                title="Select URL"
                              />
                            </InputGroup>
                          </div>
                        </div>
                        <div>
                          <strong>OR</strong> select content from these options:
                        </div>
                        <div className="flex">
                          <div className="grid grid-cols-2 gap-2 w-full">
                            <Button4>Canvas</Button4>
                            <Button4>Google Drive</Button4>
                            <Button4 contentType="article">JSTOR</Button4>
                            <Button4>OneDrive</Button4>
                            <Button4 contentType="book">VitalSource</Button4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Iterative: Round 2">
          <Library.Example title="Starting point">
            <p>
              {"Let's"} start this round by consolidating some parts of the
              ideas in round 1.
            </p>

            <Library.Demo>
              <Card width="custom" classes="w-[700px]">
                <CardHeader variant="secondary" title="Assignment details" />
                <div className="px-3 py-6">
                  <div className="grid grid-cols-[12em_1fr] gap-x-6 gap-y-3">
                    <div className="space-y-1.5 pt-1">
                      <div className="leading-none text-[14px] text-end font-medium text-slate-600 uppercase">
                        Assignment content
                      </div>
                      <div className="text-[14px] text-end leading-none font-normal text-stone-500">
                        <p>Select content for your assignment</p>
                      </div>
                    </div>
                    <div className="space-y-6 text-[14px] leading-none">
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button4 contentType="web page | PDF">URL</Button4>
                          <Button4>Canvas</Button4>
                          <Button4>Google Drive</Button4>
                          <Button4 contentType="article">JSTOR</Button4>
                          <Button4>OneDrive</Button4>
                          <Button4 contentType="book">VitalSource</Button4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Icons and hover">
            <p>
              We could add SVG icons to the buttons. Here is shown only
              GoogleDrive, VitalSource and OneDrive as creating SVG icons for
              all of these content sources would take some time. This sketch
              also adds a hover interaction to the buttons.
            </p>

            <Library.Callout>
              <strong>Regarding icons</strong>: icons in these sketches are
              intended to show how icons might be used. I was able to quickly
              find icons for GoogleDrive and OneDrive and fumble something
              together for VitalSource. We would want to obtain icons for Canvas
              and JSTOR if we moved forward, and adjust icon sizing to be more
              consistent.
            </Library.Callout>

            <Library.Demo>
              <Card width="custom" classes="w-[700px]">
                <CardHeader variant="secondary" title="Assignment details" />
                <div className="px-3 py-6">
                  <div className="grid grid-cols-[12em_1fr] gap-x-6 gap-y-3">
                    <div className="space-y-1.5 pt-1">
                      <div className="leading-none text-[14px] text-end font-medium text-slate-600 uppercase">
                        Assignment content
                      </div>
                      <div className="text-[14px] text-end leading-none font-normal text-stone-500">
                        <p>Select content for your assignment</p>
                      </div>
                    </div>
                    <div className="space-y-6 text-[14px] leading-none">
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <Button5 contentType="web page | PDF" icon={LinkIcon}>
                            URL
                          </Button5>
                          <Button5>Canvas</Button5>
                          <Button5 icon={GoogleDriveIcon}>Google Drive</Button5>
                          <Button5 contentType="article">JSTOR</Button5>
                          <Button5 icon={OneDriveIcon}>OneDrive</Button5>
                          <Button5 contentType="book" icon={VitalSourceIcon}>
                            VitalSource
                          </Button5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="Tiles">
            <p>
              This sketch demonstrates a possible tile layout, with a{' '}
              {'"selected"'} styling (and hover).
            </p>

            <Library.Demo>
              <Card width="custom" classes="w-[700px]">
                <CardHeader variant="secondary" title="Assignment details" />
                <div className="px-3 py-6">
                  <div className="grid grid-cols-[8em_1fr] gap-x-6 gap-y-3">
                    <div className="space-y-1.5 pt-1">
                      <div className="leading-none text-[14px] text-end font-medium text-slate-600 uppercase">
                        Content
                      </div>
                      <div className="text-[14px] text-end leading-none font-normal text-stone-500">
                        <p>Select content for your assignment</p>
                      </div>
                    </div>
                    <div className="space-y-6 text-[14px] leading-none">
                      <div className="flex flex-row p-y-2">
                        <div className="grid grid-cols-4 gap-2 w-full">
                          <Button6 contentType="web page | PDF" icon={LinkIcon}>
                            URL
                          </Button6>
                          <Button6>Canvas</Button6>
                          <Button6 icon={GoogleDriveIcon}>Google Drive</Button6>
                          <Button6 contentType="article">JSTOR</Button6>
                          <Button6 icon={OneDriveIcon} selected>
                            OneDrive
                          </Button6>
                          <Button6 contentType="book" icon={VitalSourceIcon}>
                            VitalSource
                          </Button6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
