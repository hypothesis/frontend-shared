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
            <code>Spinner</code> is a simple component to render a spinner with
            spokes, representing loading or other progress.
          </p>
          <p>
            <code>SpinnerOverlay</code> is a simple component that styles a
            full-screen <code>Overlay</code> with a centered{' '}
            <code>Spinner</code>.
          </p>
        </>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Spinner</code> is a reimplementation of an existing legacy
          component of the same name.
        </p>
        <p>
          <code>SpinnerOverlay</code> is a new component modeled after the
          legacy <code>FullScreenSpinner</code> component.
        </p>

        <Library.Example title="Migrating to this component (Spinner)">
          <Next.Changelog>
            <Next.ChangelogItem status="breaking">
              Prop:{' '}
              <s>
                <code>classes</code>
              </s>{' '}
              removed
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Prop values for <code>size</code>:{' '}
              <s>
                <code>{"'small'"}</code>,<code>{"'medium'"}</code>,
                <code>{"'large'"}</code>
              </s>{' '}
              ➜ Use <code>{"'sm'"}</code>, <code>{"'md'"}</code>, or{' '}
              <code>{"'lg'"}</code>
            </Next.ChangelogItem>
            <Next.ChangelogItem status="breaking">
              Default <code>size</code>:{' '}
              <s>
                <code>{"'medium'"}</code>
              </s>{' '}
              ➜ <code>{"'sm'"}</code>
            </Next.ChangelogItem>
          </Next.Changelog>
        </Library.Example>
      </Library.Pattern>
      <Library.Pattern title="Usage">
        <Next.Usage componentName="Spinner" />
        <Library.Example>
          <Library.Demo title="Basic Spinner" withSource>
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

      <Library.Pattern title="SpinnerOverlay">
        <p>
          This component encapsulates a design pattern for a full-page loading
          spinner.
        </p>
        <Library.Example title="Usage">
          <Next.Usage componentName="SpinnerOverlay" />
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
          <code>SpinnerOverlay</code> accepts HTML attributes.
        </p>
      </Library.Pattern>
    </Library.Page>
  );
}
