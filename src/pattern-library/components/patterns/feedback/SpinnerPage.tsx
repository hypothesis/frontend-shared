import { useState } from 'preact/hooks';

import { Spinner, SpinnerOverlay, Button } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

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
        <Library.Pattern title="Usage">
          <Next.Usage componentName="Spinner" />
          <Library.Example>
            <Library.Demo withSource>
              <Spinner />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="color">
            <Library.Demo title="color: 'text-light' (default)" withSource>
              <Spinner color="text-light" size="md" />
            </Library.Demo>
            <Library.Demo title="color: 'text'" withSource>
              <Spinner color="text" size="md" />
            </Library.Demo>

            <Library.Demo title="color: 'text-inverted'" withSource>
              <div className="bg-slate-7 rounded-lg flex items-center justify-center p-8">
                <Spinner color="text-inverted" size="md" />
              </div>
            </Library.Demo>
          </Library.Example>

          <Library.Example title="size">
            <Library.Demo title="size: 'sm' (1em) (default)" withSource>
              <Spinner size="sm" />
            </Library.Demo>
            <Library.Demo title="size: 'md' (2em)" withSource>
              <Spinner size="md" />
            </Library.Demo>
            <Library.Demo title="size: 'lg' (4em)" withSource>
              <Spinner size="lg" />
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
      <Library.Section
        title="SpinnerOverlay"
        intro={
          <p>
            <code>SpinnerOverlay</code> is a simple component encapsulating a
            design pattern for a full-page loading spinner.
          </p>
        }
      >
        <Library.Pattern title="Usage">
          <Next.Usage componentName="SpinnerOverlay" />
          <Library.Example>
            <Library.Demo>
              <Button onClick={toggleOverlayOpen}>Show overlay</Button>
              {overlayOpen && <SpinnerOverlay onClick={toggleOverlayOpen} />}
            </Library.Demo>
            <Next.Code
              content={`<Button onClick={toggleOverlayOpen}>Show overlay</Button>
{overlayOpen && <SpinnerOverlay onClick={toggleOverlayOpen} />}`}
              title="Source for spinner-overlay example"
            />
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <p>
            <code>SpinnerOverlay</code> accepts all HTML attributes except{' '}
            <code>className</code>.
          </p>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
