import classnames from 'classnames';
import type { JSX } from 'preact';

import type { PresentationalProps } from '../../types';
import type { IconComponent } from '../../types';
import { downcastRef } from '../../util/typing';
import { CautionIcon, CheckIcon, CancelIcon } from '../icons';

type ComponentProps = {
  icon?: IconComponent;
  status?: 'notice' | 'error' | 'success';

  size?: 'sm' | 'md' | 'lg' | 'custom';
  variant?: 'outlined' | 'raised' | 'custom';
  unstyled?: boolean;
};

type HTMLAttributes = Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'icon'>;

export type CalloutProps = PresentationalProps &
  ComponentProps &
  HTMLAttributes;

/**
 * Render a banner-like alert message with corresponding icon and coloring
 */
const Callout = function Callout({
  children,
  classes,
  elementRef,

  icon: Icon,
  status = 'notice',

  size = 'md',
  variant = 'outlined',
  unstyled = false,

  ...htmlAttributes
}: CalloutProps) {
  const styled = !unstyled;
  const themed = styled && variant !== 'custom';
  const sized = styled && size !== 'custom';

  let StatusIcon = Icon;
  if (!StatusIcon) {
    switch (status) {
      case 'success':
        StatusIcon = CheckIcon;
        break;
      case 'error':
        StatusIcon = CancelIcon;
        break;
      default:
        StatusIcon = CautionIcon;
        break;
    }
  }

  // Only render an icon if no custom styling API props have been set.
  const withIcon = themed && sized;

  return (
    <div
      data-component="Callout"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames(
        styled && 'flex items-center border',
        themed && {
          'rounded border': true,
          'shadow hover:shadow-md cursor-pointer': variant === 'raised',
          'border-yellow-notice': status === 'notice',
          'border-green-success': status === 'success',
          'border-red-error': status === 'error',
        },
        // Set background color, but only if rendering an icon
        themed && {
          'bg-yellow-notice': status === 'notice' && withIcon,
          'bg-green-success': status === 'success' && withIcon,
          'bg-red-error': status === 'error' && withIcon,
          'bg-white': !withIcon,
        },
        classes
      )}
    >
      {withIcon && (
        <div
          className={classnames({
            'p-2': size === 'md',
            'p-1.5': size === 'sm',
            'p-3': size === 'lg',
          })}
        >
          <StatusIcon
            data-testid="callout-icon"
            className={classnames('text-white', {
              'w-[1.25em] h-[1.25em]': size === 'md', // default
              'w-[0.85em] h-[0.85em]': size === 'sm',
              'w-[1.5em] h-[1.5em]': size === 'lg',
            })}
          />
        </div>
      )}
      <div
        className={classnames(
          sized && {
            'p-2': size === 'md', // default
            'py-1.5 px-2': size === 'sm',
            'p-3': size === 'lg',
          },
          styled && 'grow',
          themed && 'bg-white'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Callout;
