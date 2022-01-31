import { useRef, useState } from 'preact/hooks';

import { Icon, LabeledButton } from '../../..';
import { useElementShouldClose } from '../../../hooks/use-element-should-close';
import Library from '../Library';

export default function SpinnerPatterns() {
  const [fullScreenSpinnerVisible, setFullScreenSpinnerVisible] =
    useState(false);

  const fullScreenSpinnerContainerRef =
    /** @type {{ current: HTMLDivElement }} */ (useRef());

  useElementShouldClose(
    fullScreenSpinnerContainerRef,
    true /* isOpen */,
    () => {
      setFullScreenSpinnerVisible(false);
    }
  );

  return (
    <Library.Page title="Spinners">
      <p>
        The <code>spinner</code> pattern can be used to show loading states. It
        is an animated SVG.
      </p>
      <Library.Pattern title="Spinner">
        <p>
          The spinner is <code>em-sized</code>; it renders at <code>1em</code>{' '}
          square, by default. Other relative sizes are available as shown. For
          manual sizing control, adjust the font-size of a parent element.
          Spinners have a default foreground color, which may be overridden with
          utility classes.
        </p>
        <Library.Example title="Default size">
          <p>
            At its default size, the spinner is <code>2em</code> square.
          </p>
          <Library.Demo withSource>
            <Icon name="hyp-spinner" containerClasses="hyp-spinner" />
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Small size">
          <p>
            Small spinners are <code>1em</code> square and can be used inline.
          </p>
          <Library.Demo withSource>
            <Icon name="hyp-spinner" containerClasses="hyp-spinner--small" />
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Large size">
          <p>
            Large spinners are <code>4em</code> square.
          </p>
          <Library.Demo withSource>
            <Icon name="hyp-spinner" containerClasses="hyp-spinner--large" />
          </Library.Demo>
        </Library.Example>

        <Library.Example title="Changing color">
          <p>
            The color of the spinner may be changed by use of utility classes.
          </p>
          <Library.Demo withSource>
            <Icon
              name="hyp-spinner"
              containerClasses="hyp-spinner hyp-u-color--brand"
            />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Full Screen Spinner">
        <Library.Example>
          <p>
            The full-screen spinner pattern centers a large spinner in a light
            overlay. Press <code>ESC</code> to hide the spinner.
          </p>
          <Library.Demo>
            <LabeledButton onClick={() => setFullScreenSpinnerVisible(true)}>
              Show Full-Screen Spinner
            </LabeledButton>
            {fullScreenSpinnerVisible && (
              <div
                className="hyp-full-screen-spinner"
                ref={fullScreenSpinnerContainerRef}
              >
                <Icon
                  name="hyp-spinner"
                  containerClasses="hyp-spinner--large hyp-full-screen-spinner__spinner"
                />
              </div>
            )}
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
