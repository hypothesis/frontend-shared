import type { ComponentChildren } from 'preact';

import {
  ArrowRightIcon,
  Button,
  ButtonBase,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  InputGroup,
  Input,
} from '../../../../';
import Library from '../../Library';

function Button1({ children }: { children: ComponentChildren }) {
  return (
    <ButtonBase classes="bg-slate-0 p-2 rounded-sm border border-slate-3 gap-x-1">
      {children}
    </ButtonBase>
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
    <ButtonBase classes="w-[15em] bg-slate-0 rounded-sm border border-slate-3 gap-x-2 items-center">
      <div className="grow text-start p-2">
        <strong>{children}</strong>
      </div>
      <div className="text-end p-2">
        <span className="uppercase text-[11px]">{contentType}</span>
      </div>
    </ButtonBase>
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
    <ButtonBase classes="w-[15em] bg-stone-50 rounded-sm border border-stone-300 gap-x-2 items-center">
      <div className="grow text-start p-2">
        <strong className="text-slate-600">{children}</strong>
      </div>
      <div className="text-end p-2">
        <span className="uppercase text-[11px] text-stone-500">
          {contentType}
        </span>
      </div>
    </ButtonBase>
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
    <ButtonBase classes="w-full bg-stone-50 rounded-sm border border-stone-300 gap-x-2 items-center">
      <div className="grow text-start p-2">
        <strong className="text-slate-600">{children}</strong>
      </div>
      <div className="text-end p-2">
        <span className="uppercase text-[11px] text-stone-500">
          {contentType}
        </span>
      </div>
    </ButtonBase>
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
                            book from <strong>VitalSource</strong>
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
      </Library.Section>
    </Library.Page>
  );
}
