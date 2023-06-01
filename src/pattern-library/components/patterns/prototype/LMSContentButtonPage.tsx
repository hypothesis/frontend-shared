import type { ComponentChildren } from 'preact';

import { Card, CardHeader, CardContent, OptionButton } from '../../../../';
import Library from '../../Library';

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

export default function LMSOptionButtonPage() {
  return (
    <Library.Page
      title="LMS content selection buttons"
      intro={
        <p>
          The new{' '}
          <Library.Link href="/input-option-button">
            <code>OptionButton</code>
          </Library.Link>{' '}
          encapsulates a new button design pattern for selecting an option from
          a list of options. The assignment content-configuration screen in LMS
          will use this new button. It is based on a selected design approach in
          the{' '}
          <Library.Link href="/lms-content-selection">
            set of available sketches
          </Library.Link>
          .
        </p>
      }
    >
      <Library.Section>
        <Library.Pattern title="OptionButtons in context">
          <Library.Demo>
            <div className="w-[700px]">
              <ContentPanel>
                <OptionButton details="Web Page | PDF">URL</OptionButton>
                <OptionButton details="PDF">Canvas</OptionButton>
                <OptionButton details="PDF">Google Drive</OptionButton>
                <OptionButton details="Article">JSTOR</OptionButton>
                <OptionButton details="PDF">OneDrive</OptionButton>
                <OptionButton details="Book">VitalSource</OptionButton>
                <OptionButton details="Video">YouTube</OptionButton>
              </ContentPanel>
            </div>
          </Library.Demo>

          <Library.Callout>
            <em>NB:</em> There is currently no use of <code>disabled</code> or{' '}
            <code>pressed</code> states in the LMS content-selection interface.
            But the new button provides styling for those states.
          </Library.Callout>

          <Library.Demo title="With selected content, and one disabled content option">
            <div className="w-[700px]">
              <ContentPanel>
                <OptionButton details="Web Page | PDF">URL</OptionButton>
                <OptionButton details="PDF">Canvas</OptionButton>
                <OptionButton details="PDF" pressed>
                  Google Drive
                </OptionButton>
                <OptionButton details="Article">JSTOR</OptionButton>
                <OptionButton details="PDF">OneDrive</OptionButton>
                <OptionButton details="Book">VitalSource</OptionButton>
                <OptionButton details="Video">YouTube</OptionButton>
              </ContentPanel>
            </div>
          </Library.Demo>

          <Library.Demo title="With different options, and one disabled option">
            <div className="w-[700px]">
              <ContentPanel>
                <OptionButton details="Web Page | PDF">URL</OptionButton>
                <OptionButton details="PDF">Canvas</OptionButton>
                <OptionButton details="PDF">Google Drive</OptionButton>
                <OptionButton details="PDF">OneDrive</OptionButton>
                <OptionButton details="Book" disabled>
                  VitalSource
                </OptionButton>
              </ContentPanel>
            </div>
          </Library.Demo>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
