import classnames from 'classnames';
import type { JSX } from 'preact';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { useSyncedRef } from '../../hooks/use-synced-ref';
import type { PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';

type HTMLAttributes = Omit<JSX.HTMLAttributes<HTMLElement>, 'size'>;

type ComponentProps = {
  /**
   * By default, TabLists are oriented horizontally. Vertically-oriented
   * TabLists add up/down arrow-key navigation.
   */
  vertical?: boolean;
};

export type TabListProps = PresentationalProps &
  ComponentProps &
  HTMLAttributes;

/**
 * Render a tablist container for a set of tabs, with arrow key navigation per
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/
 */
const TabListNext = function TabList({
  children,
  classes,
  elementRef,

  vertical = false,

  ...htmlAttributes
}: TabListProps) {
  const tabListRef = useSyncedRef(elementRef);

  useArrowKeyNavigation(tabListRef, {
    selector: 'button',
    horizontal: true,
    vertical,
  });

  return (
    <div
      {...htmlAttributes}
      ref={downcastRef(tabListRef)}
      className={classnames('flex', { 'flex-col': vertical }, classes)}
      role="tablist"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
      data-component="TabList"
    >
      {children}
    </div>
  );
};

export default TabListNext;
