import type { JSX } from 'preact';

import Overlay from '../layout/Overlay';
import Spinner from './Spinner';

export type SpinnerOverlayProps = Omit<
  JSX.HTMLAttributes<HTMLElement>,
  'className' | 'open'
>;

/**
 * Render a full-screen spinner atop a light-colored overlay
 */
export default function SpinnerOverlay({
  ...htmlAttributes
}: SpinnerOverlayProps) {
  return (
    <Overlay
      data-composite-component="SpinnerOverlay"
      {...htmlAttributes}
      variant="light"
    >
      <Spinner size="lg" />
    </Overlay>
  );
}
