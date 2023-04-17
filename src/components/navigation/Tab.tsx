import classnames from 'classnames';
import type { JSX } from 'preact';

import type { IconComponent, PresentationalProps } from '../../types';
import { downcastRef } from '../../util/typing';
import ButtonBase from '../input/ButtonBase';

type ComponentProps = {
  icon?: IconComponent;
  /**
   * Text string representing the content of the tab when selected. The tab
   * button will be sized to accommodate this string in bold text. This can
   * prevent tab jiggle.
   */
  textContent?: string;
  selected?: boolean;
  variant?: 'basic';
};

type HTMLAttributes = Omit<
  JSX.HTMLAttributes<HTMLButtonElement>,
  | 'size'
  | 'icon'
  | 'title'
  | 'selected'
  // Omitting these aria attributes, as they are set as `never` in ButtonBase
  | 'aria-expanded'
  | 'aria-pressed'
  | 'aria-label'
>;

export type TabProps = PresentationalProps & ComponentProps & HTMLAttributes;

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
  variant = 'basic',

  ...htmlAttributes
}: TabProps) {
  return (
    <ButtonBase
      data-component="Tab"
      {...htmlAttributes}
      classes={classnames(
        'gap-x-1.5 enabled:hover:text-brand-dark',
        {
          'font-bold': selected && variant === 'basic',
        },
        classes
      )}
      elementRef={downcastRef(elementRef)}
      aria-selected={selected}
      role="tab"
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
    </ButtonBase>
  );
};

export default Tab;
