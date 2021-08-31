import { Spinner } from '../../..';
import Library from '../Library';

export default function SpinnerComponents() {
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
    </Library.Page>
  );
}
