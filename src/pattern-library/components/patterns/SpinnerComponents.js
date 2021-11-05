import { useState } from 'preact/hooks';

import { FullScreenSpinner, LabeledButton, Spinner } from '../../..';
import Library from '../Library';

export default function SpinnerComponents() {
  const [fullScreenSpinnerVisible, setFullScreenSpinnerVisible] = useState(
    false
  );
  return (
    <Library.Page title="Spinner">
      <p>
        The <code>Spinner</code> component is based on the <code>spinner</code>{' '}
        pattern and renders an animated SVG.
      </p>
      <Library.Pattern title="Spinner">
        <Library.Example title="Basic usage">
          <Library.Demo withSource>
            <Spinner />
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Small size">
          <Library.Demo withSource>
            <Spinner size="small" />
          </Library.Demo>
        </Library.Example>
        <Library.Example title="Large size">
          <Library.Demo withSource>
            <Spinner size="large" />
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>

      <Library.Pattern title="Full-Screen Spinner">
        <Library.Example>
          <p>
            A component that renders a full-screen spinner over an overlay. Note
            that this page has to be reloaded to clear the full-screen spinner
            after showing it.
          </p>
          <Library.Demo>
            <LabeledButton onClick={() => setFullScreenSpinnerVisible(true)}>
              Show Full-Screen Spinner
            </LabeledButton>
            {fullScreenSpinnerVisible && <FullScreenSpinner />}
          </Library.Demo>
        </Library.Example>
      </Library.Pattern>
    </Library.Page>
  );
}
