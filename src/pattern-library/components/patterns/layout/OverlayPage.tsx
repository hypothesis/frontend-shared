import { useState } from 'preact/hooks';

import { Button, Card, CardContent, Spinner } from '../../../../';
import { Overlay } from '../../../../';
import Library from '../../Library';

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
          <code>Overlay</code> is a presentational component that styles
          full-screen backdrops for use during loading or as a modal backdrop.
        </p>
      }
      apiReference="functions/Overlay"
    >
      <Library.Section title="Overlay">
        <Library.Pattern>
          <Library.Usage componentName="Overlay" />
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

        <Library.Pattern title="Component API">
          <code>Overlay</code> accepts all standard{' '}
          <Library.Link href="/using-components#presentational-components-api">
            presentational component props
          </Library.Link>
          .
          <Library.Example title="variant">
            <Library.Info>
              <Library.InfoItem label="description">
                Define which theme to use for the <code>Overlay</code>.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`{'dark' | 'light'}`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'dark'`}</code>
              </Library.InfoItem>
            </Library.Info>
            <Library.Demo title="dark" withSource>
              <Button onClick={toggleDarkOpen}>Show Overlay</Button>
              <Overlay open={darkOpen} onClick={toggleDarkOpen} variant="dark">
                <Spinner size="lg" color="text-inverted" />
              </Overlay>
            </Library.Demo>

            <Library.Demo title="light" withSource>
              <Button onClick={toggleLightOpen}>Show Overlay</Button>
              <Overlay
                open={lightOpen}
                onClick={toggleLightOpen}
                variant="light"
              >
                <Spinner size="lg" />
              </Overlay>
            </Library.Demo>
          </Library.Example>
          <Library.Example title="open">
            <Library.Info>
              <Library.InfoItem label="description">
                Set whether the overlay is open (visible) or not.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`boolean`}</code>
              </Library.InfoItem>
              <Library.InfoItem label="default">
                <code>{`'true'`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
          <Library.Example title="...htmlAttributes">
            <Library.Info>
              <Library.InfoItem label="description">
                <code>Overlay</code> accepts HTML attributes.
              </Library.InfoItem>
              <Library.InfoItem label="type">
                <code>{`JSX.HTMLAttributes<HTMLElement>`}</code>
              </Library.InfoItem>
            </Library.Info>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
