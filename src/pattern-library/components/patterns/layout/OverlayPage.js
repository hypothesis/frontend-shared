import { useState } from 'preact/hooks';

import { Button, Card, CardContent, Spinner } from '../../../../next';
import { Overlay } from '../../../../next';
import Library from '../../Library';
import Next from '../../LibraryNext';

export default function OverlayPage() {
  const [defaultOpen, setDefaultOpen] = useState(false);
  const [darkOpen, setDarkOpen] = useState(false);
  const [lightOpen, setLightOpen] = useState(false);

  const toggleDefaultOverlay = () => setDefaultOpen(!defaultOpen);
  const toggleLightOpen = () => setLightOpen(!lightOpen);
  const toggleDarkOpen = () => setDarkOpen(!darkOpen);

  return (
    <Library.Page
      title="Overlay"
      intro={
        <p>
          <code>Overlay</code> is a presentational component that provides a
          full-screen backdrop for loading states or modals.
        </p>
      }
    >
      <Library.Pattern title="Status">
        <p>
          <code>Overlay</code> is a new component based on a design pattern used
          in legacy modals and <code>FullScreenSpinner</code> components.
        </p>
      </Library.Pattern>

      <Library.Pattern title="Usage">
        <Next.Usage componentName="Overlay" />
        <Library.Example>
          <Library.Demo title="Basic Overlay" withSource>
            <Button onClick={toggleDefaultOverlay}>Show Overlay</Button>
            <Overlay open={defaultOpen} onClick={toggleDefaultOverlay}>
              <Card width="auto">
                <CardContent>Content in Overlay</CardContent>
              </Card>
            </Overlay>
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Props">
        <Library.Example title="variant">
          <Library.Demo title="variant: 'dark' (default)" withSource>
            <Button onClick={toggleDarkOpen}>Show Overlay</Button>
            <Overlay open={darkOpen} onClick={toggleDarkOpen} variant="dark">
              <Spinner size="lg" color="text-inverted" />
            </Overlay>
          </Library.Demo>

          <Library.Demo title="variant: 'light'" withSource>
            <Button onClick={toggleLightOpen}>Show Overlay</Button>
            <Overlay open={lightOpen} onClick={toggleLightOpen} variant="light">
              <Spinner size="lg" />
            </Overlay>
          </Library.Demo>
        </Library.Example>

        <Library.Example title="open">
          <p>
            Control whether an <code>Overlay</code> is rendered or not by
            setting the <code>open</code> boolean prop (default{' '}
            <code>true</code>). Reference other examples on this page.
          </p>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
