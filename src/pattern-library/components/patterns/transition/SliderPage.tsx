import type { FunctionComponent, ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

import { Button, Card, CardContent, Slider } from '../../../../';
import type { TransitionComponent } from '../../../../';
import Library from '../../Library';

type Slider_Props = ComponentProps<TransitionComponent> & {
  _transitionStatus?: 'in' | 'out';
};

const Slider_: FunctionComponent<Slider_Props> = ({
  children,
  direction,
  onTransitionEnd,
  _transitionStatus,
}) => {
  const [currentDirection, setCurrentDirection] = useState(direction);
  const toggleSlider = () =>
    setCurrentDirection(prev => (prev === 'in' ? 'out' : 'in'));

  return (
    <div className="flex-col w-full space-y-2">
      <Button onClick={toggleSlider} variant="primary">
        {currentDirection === 'in' ? 'Hide' : 'Show'} slider
      </Button>
      <Slider direction={currentDirection} onTransitionEnd={onTransitionEnd}>
        {children}
      </Slider>
      <div>
        {_transitionStatus === 'in' && (
          <p>
            The <code>Slider</code> just opened.
          </p>
        )}
        {_transitionStatus === 'out' && (
          <p>
            The <code>Slider</code> just closed.
          </p>
        )}
      </div>
    </div>
  );
};

export default function SliderPage() {
  return (
    <Library.Page
      title="Slider"
      intro={
        <>
          <p>
            <code>Slider</code> is a transition component with a
            slide-down/slide-up transition on open/close.
          </p>
        </>
      }
      apiReference="functions/Slider"
    >
      <Library.Section>
        <Library.Pattern>
          <Library.Usage componentName="Slider" />
          <Library.Example>
            <Library.Demo title="Basic Slider" withSource>
              <Slider_ direction="out">
                <Card>
                  <CardContent>This is the content of the Slider</CardContent>
                </Card>
              </Slider_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Component API">
          <p>
            <code>Button</code> accepts{' '}
            <Library.Link href="/using-components#transition-components-api">
              transition component props
            </Library.Link>
            .
          </p>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
