import type { FunctionComponent, ComponentProps } from 'preact';
import { useState } from 'preact/hooks';

import { Button, Card, CardContent, Slider } from '../../../../';
import type { TransitionComponent } from '../../../../';
import Library from '../../Library';

const Slider_: FunctionComponent<
  ComponentProps<TransitionComponent> & { _transitionStatus?: 'in' | 'out' }
> = ({ children, visible, onTransitionEnd, _transitionStatus }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const toggleSlider = () => setIsVisible(prev => !prev);

  return (
    <div className="flex-col w-full space-y-2">
      <Button onClick={toggleSlider} variant="primary">
        {isVisible ? 'Hide' : 'Show'} slider
      </Button>
      <Slider visible={isVisible} onTransitionEnd={onTransitionEnd}>
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
  const [transitionStatus, setTransitionStatus] = useState<
    'in' | 'out' | undefined
  >();

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
    >
      <Library.Section
        title="Slider"
        intro={
          <p>
            <code>Slider</code> implements the <code>TransitionComponent</code>{' '}
            API, so it can be used standalone, or together with any other
            component which accepts a <code>TransitionComponent</code>.
          </p>
        }
      >
        <Library.Pattern>
          <Library.Usage componentName="Slider" />
          <Library.Example>
            <Library.Demo title="Basic example" withSource>
              <Slider_ visible={false}>
                <Card>
                  <CardContent>This is the content of the Slider</CardContent>
                </Card>
              </Slider_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>

        <Library.Pattern title="Props">
          <Library.Example title="visible">
            This mandatory boolean prop tells if the Slider is currently
            displayed or hidden.
          </Library.Example>

          <Library.Example title="onTransitionEnd">
            Optionally, you can provide a callback that will be invoked once the{' '}
            <code>in</code>/<code>out</code> transitions end.
            <Library.Demo title="Slider with onTransitionEnd" withSource>
              <Slider_
                visible={false}
                onTransitionEnd={direction => setTransitionStatus(direction)}
                _transitionStatus={transitionStatus}
              >
                <Card>
                  <CardContent>This is the content of the Slider</CardContent>
                </Card>
              </Slider_>
            </Library.Demo>
          </Library.Example>
        </Library.Pattern>
      </Library.Section>
    </Library.Page>
  );
}
