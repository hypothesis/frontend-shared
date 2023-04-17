import classnames from 'classnames';
import type { JSX } from 'preact';

import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import ScrollContext from './ScrollContext';
import type { ScrollInfo } from './ScrollContext';

export type ScrollProps = PresentationalProps & {
  /** Render with scroll-hinting shadows ('raised') or without ('flat') */
  variant?: 'raised' | 'flat';
} & JSX.HTMLAttributes<HTMLElement>;

/**
 * Render a fluid container that scrolls on overflow.
 */
const Scroll = function Scroll({
  children,
  classes,
  elementRef,

  variant = 'raised',

  ...htmlAttributes
}: ScrollProps) {
  const ref = useSyncedRef(elementRef);

  const scrollContext: ScrollInfo = {
    scrollRef: ref,
  };

  return (
    <ScrollContext.Provider value={scrollContext}>
      <div
        data-component="Scroll"
        {...htmlAttributes}
        ref={downcastRef(ref)}
        className={classnames(
          // Prevent overflow by overriding `min-height: auto`.
          // See https://stackoverflow.com/a/66689926/434243.
          'min-h-0',
          'h-full w-full overflow-auto',
          { 'scroll-shadows': variant === 'raised' },
          classes
        )}
      >
        {children}
      </div>
    </ScrollContext.Provider>
  );
};

export default Scroll;
