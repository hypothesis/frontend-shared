import Overlay from '../layout/Overlay';
import Spinner from './Spinner';

/**
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'className'>} HTMLAttributes
 */

/**
 * Render a full-screen spinner atop a light-colored overlay
 *
 * @param {HTMLAttributes} props
 */
const SpinnerOverlayNext = function SpinnerOverlay({ ...HTMLAttributes }) {
  return (
    <Overlay
      {...HTMLAttributes}
      variant="light"
      data-composite-component="SpinnerOverlay"
    >
      <Spinner size="lg" />
    </Overlay>
  );
};

export default SpinnerOverlayNext;
