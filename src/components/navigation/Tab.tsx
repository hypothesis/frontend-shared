import classnames from 'classnames';

import type { IconComponent, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import Button from '../input/Button';
import type { ButtonProps } from '../input/Button';

type ComponentProps = {
  icon?: IconComponent;
  /**
   * Text string representing the content of the tab when selected. The tab
   * button will be sized to accommodate this string in bold text. This can
   * prevent tab jiggle.
   */
  textContent?: string;
  selected?: boolean;

  // Styling API
  size?: 'md' | 'custom';
  variant?: 'text' | 'tab' | 'custom';
  unstyled?: boolean;
};

export type TabProps = PresentationalProps &
  Omit<ButtonProps, 'variant' | 'size' | 'unstyled'> &
  ComponentProps;

/**
 * Render a button with appropriate ARIA tab affordances
 */
const Tab = function Tab({
  children,
  classes,
  elementRef,

  icon: Icon,
  textContent,
  selected = false,
  size = 'md',
  variant = 'text',
  unstyled = false,

  ...htmlAttributes
}: TabProps) {
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';
  const sized = styled && size !== 'custom';

  return (
    <Button
      data-component="Tab"
      {...htmlAttributes}
      classes={classnames(
        // Buttons have a flex layout. Add a horizontal gap.
        sized && 'gap-x-1.5',
        themed && {
          'px-4 py-2': variant === 'tab' && sized,
          'font-semibold text-grey-7 rounded-t border border-transparent border-b-0':
            variant === 'tab',
          'aria-selected:text-color-text aria-selected:bg-white':
            variant === 'tab',
          'aria-selected:border aria-selected:border-grey-3 aria-selected:border-b-0':
            variant === 'tab',
          'enabled:hover:text-color-text disabled:text-grey-7/50':
            variant === 'tab',
          'enabled:hover:text-brand-dark': variant === 'text',
          'aria-selected:font-bold': variant === 'text',
        },
        classes
      )}
      elementRef={downcastRef(elementRef)}
      aria-selected={selected}
      role="tab"
      variant="custom"
      size="custom"
      unstyled={unstyled}
    >
      {Icon && (
        <Icon
          className={classnames(
            // A small padding value here sizes the icon down slightly in relation
            // to the tab text, which results in nicer proportions.
            'p-[0.125em] w-em h-em'
          )}
        />
      )}
      <span
        data-content={textContent}
        data-testid="sizing-wrapper"
        className={classnames({
          // Set the content of this span's ::before pseudo-element to
          // `textContent` and make it bold.
          'before:content-[attr(data-content)] before:font-bold': textContent,
          // Make the ::before occupy space within the button, but make it
          // invisible. This ensures that the tab button is wide enough to show
          // bolded text even if the visible text is not currently bold. See
          // https://css-tricks.com/bold-on-hover-without-the-layout-shift/
          'before:block before:invisible before:h-0 before:overflow-hidden':
            textContent,
        })}
      >
        {children}
      </span>
    </Button>
  );
};

export default Tab;
