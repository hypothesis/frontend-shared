import { useState } from 'preact/hooks';

import { Spinner, SpinnerOverlay, Button } from '../../../../';
import Library from '../../Library';

export default function SpinnerPage() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  function toggleOverlayOpen() {
    setOverlayOpen(!overlayOpen);
  }
  return (
    <Library.Page
      title="Spinner"
      intro={
        <>
          <p>
            <code>Spinner</code> and <code>SpinnerOverlay</code> are simple
            components to render loading spinners.
          </p>
        </>
      }
    >
      <Library.Section
        title="Spinner"
        intro={
          <p>
            <code>Spinner</code> is a simple component to render a spinner with
            spokes, representing loading or other progress.
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="Spinner" />
          <Library.SectionL3>
            <Library.Demo withSource>
              <Spinner />
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <Library.SectionL3 title="color">
            <Library.Info>
              <Library.InfoItem label="description">
                Set the foreground color of the spinner icon.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'text' |'text-light' | 'text-inverted'`}]</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'text-light'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Available Spinner colors" withSource>
              <div className="flex gap-x-8 items-center">
                <Spinner color="text-light" size="md" />

                <Spinner color="text" size="md" />

                <div className="bg-slate-7 rounded-lg flex items-center justify-center p-8">
                  <Spinner color="text-inverted" size="md" />
                </div>
              </div>
            </Library.Demo>
          </Library.SectionL3>

          <Library.SectionL3 title="size">
            <Library.Info>
              <Library.InfoItem label="description">
                Set relative size of the spinner.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`'sm' | 'md' | 'lg' `}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'md'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="Spinner sizes" withSource>
              <div className="flex gap-x-8 items-center">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
              </div>
            </Library.Demo>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
      <Library.Section
        title="SpinnerOverlay"
        intro={
          <p>
            <code>SpinnerOverlay</code> is a simple component that composes a
            spinner with an{' '}
            <Library.Link href="/layout-overlay">
              <code>Overlay</code>
            </Library.Link>
            .
          </p>
        }
      >
        <Library.SectionL2>
          <Library.Usage componentName="SpinnerOverlay" />
          <Library.SectionL3>
            <Library.Demo title="Basic SpinnerOverlay">
              <Button onClick={toggleOverlayOpen}>Show overlay</Button>
              {overlayOpen && <SpinnerOverlay onClick={toggleOverlayOpen} />}
            </Library.Demo>
            <Library.Code
              content={`<Button onClick={toggleOverlayOpen}>Show overlay</Button>
{overlayOpen && <SpinnerOverlay onClick={toggleOverlayOpen} />}`}
              title="Source for spinner-overlay example"
            />
          </Library.SectionL3>
        </Library.SectionL2>

        <Library.SectionL2 title="Component API">
          <Library.SectionL3 title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                HTML attributes applied to the outermost full-screen element.
              </Library.InfoItem>

              <Library.InfoItem label="type">
                <code>
                  {`Omit<JSX.HTMLAttributes<HTMLElement>, 'className' | 'open'>`}
                </code>
              </Library.InfoItem>
            </Library.Info>
          </Library.SectionL3>
        </Library.SectionL2>
      </Library.Section>
    </Library.Page>
  );
}
