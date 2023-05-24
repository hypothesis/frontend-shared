import classnames from 'classnames';
import type { ComponentChildren } from 'preact';

import { Button, Card, CardHeader, CardContent, CheckIcon } from '../../../../';
import type { ButtonProps } from '../../../../';
import Library from '../../Library';

type ContentButtonProps = { contentType: string } & ButtonProps;

function ContentButton({
  children,
  classes,
  contentType = 'pdf',
  pressed,
  ...buttonProps
}: ContentButtonProps) {
  return (
    <Button
      classes={classnames(
        'w-full rounded-sm gap-x-2 px-2 py-1',
        'border border-stone-300 bg-stone-50',
        'group',
        'enabled:hover:border-slate-5 enabled:hover:bg-slate-0',
        'disabled:border-stone-200',
        'aria-pressed:border-slate-5 aria-pressed:bg-slate-0 aria-pressed:shadow-inner',
        'aria-expanded:border-slate-5 aria-expanded:bg-slate-0 aria-expanded:shadow-inner',
        classes
      )}
      size="custom"
      variant="custom"
      pressed={pressed}
      {...buttonProps}
    >
      <div className="grow flex items-center gap-x-1 text-start">
        {pressed && (
          <div className="rounded-full bg-slate-600 p-0.5">
            <CheckIcon className="w-[0.6em] h-[0.6em] text-white" />
          </div>
        )}
        <div className="text-slate-600 font-semibold group-disabled:text-stone-400">
          {children}
        </div>
      </div>
      <div className="text-end">
        <span
          className={classnames(
            'uppercase text-[0.8em] text-stone-500',
            'group-enabled:group-hover:text-stone-600',
            'group-disabled:text-stone-400',
            'group-aria-pressed:text-slate-600 group-aria-expanded:text-slate-600'
          )}
        >
          {contentType}
        </span>
      </div>
    </Button>
  );
}

/**
 * A relatively simplified layout representation of the LMS content-selection
 * panel
 */
function ContentPanel({ children }: { children: ComponentChildren }) {
  return (
    <Card classes="text-[14px]">
      <CardHeader variant="secondary" title="Assignment details" />
      <CardContent size="lg">
        <div className="grid grid-cols-[11rem_1fr] gap-x-6">
          <div className="space-y-1.5 pt-1 leading-none">
            <div className="text-end font-medium text-slate-600 uppercase">
              Assignment content
            </div>
            <div className="text-end font-normal text-stone-500">
              <p>Select content for your assignment</p>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-y-2 gap-x-3 max-w-[28rem]">
              {children}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LMSContentButtonPage() {
  return (
    <Library.Page
      title="LMS content selection buttons"
      intro={
        <p>
          The proposed LMS <code>ContentButton</code> encapsulates a new button
          design pattern for the assignment content-configuration screen in LMS.
          It is based on a selected design approach in the{' '}
          <Library.Link href="/lms-content-selection">
            set of available sketches
          </Library.Link>
          .
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern title="Working with ContentButton">
          <Library.Example title="Button states">
            <Library.Demo title="ContentButton with hover styling">
              <div className="bg-white p-8">
                <div className="w-[16em] text-[14px]">
                  <ContentButton contentType="PDF">Google Drive</ContentButton>
                </div>
              </div>
            </Library.Demo>

            <Library.Demo title="Pressed (active) ContentButton">
              <div className="bg-white p-8">
                <div className="w-[16em] text-[14px]">
                  <ContentButton pressed contentType="PDF">
                    Google Drive
                  </ContentButton>
                </div>
              </div>
            </Library.Demo>

            <Library.Demo title="Disabled ContentButton">
              <div className="bg-white p-8">
                <div className="w-[16em] text-[14px]">
                  <ContentButton disabled contentType="PDF">
                    Google Drive
                  </ContentButton>
                </div>
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="ContentButtons in context">
            <Library.Demo>
              <div className="w-[700px]">
                <ContentPanel>
                  <ContentButton contentType="Web Page | PDF">
                    URL
                  </ContentButton>
                  <ContentButton contentType="PDF">Canvas</ContentButton>
                  <ContentButton contentType="PDF">Google Drive</ContentButton>
                  <ContentButton contentType="Article">JSTOR</ContentButton>
                  <ContentButton contentType="PDF">OneDrive</ContentButton>
                  <ContentButton contentType="Book">VitalSource</ContentButton>
                  <ContentButton contentType="Video">YouTube</ContentButton>
                </ContentPanel>
              </div>
            </Library.Demo>

            <Library.Callout>
              <em>NB:</em> There is currently no use of <code>disabled</code> or{' '}
              <code>pressed</code> states in the LMS content-selection
              interface. But the new button provides styling for those states.
            </Library.Callout>

            <Library.Demo title="With selected content, and one disabled content option">
              <div className="w-[700px]">
                <ContentPanel>
                  <ContentButton contentType="Web Page | PDF">
                    URL
                  </ContentButton>
                  <ContentButton contentType="PDF">Canvas</ContentButton>
                  <ContentButton contentType="PDF" pressed>
                    Google Drive
                  </ContentButton>
                  <ContentButton contentType="Article">JSTOR</ContentButton>
                  <ContentButton contentType="PDF">OneDrive</ContentButton>
                  <ContentButton contentType="Book">VitalSource</ContentButton>
                  <ContentButton contentType="Video">YouTube</ContentButton>
                </ContentPanel>
              </div>
            </Library.Demo>

            <Library.Demo title="With different options, and one disabled option">
              <div className="w-[700px]">
                <ContentPanel>
                  <ContentButton contentType="Web Page | PDF">
                    URL
                  </ContentButton>
                  <ContentButton contentType="PDF">Canvas</ContentButton>
                  <ContentButton contentType="PDF">Google Drive</ContentButton>
                  <ContentButton contentType="PDF">OneDrive</ContentButton>
                  <ContentButton contentType="Book" disabled>
                    VitalSource
                  </ContentButton>
                </ContentPanel>
              </div>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
