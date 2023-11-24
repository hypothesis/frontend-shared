import classnames from 'classnames';
import type { ComponentChildren } from 'preact';

import { CheckIcon } from '../icons/';
import Button from './Button';
import type { ButtonProps } from './Button';

export type OptionButtonProps = {
  /** Optional content to render at the right side of the button */
  details?: ComponentChildren;
  /** alias for `pressed`: this option button is selected **/
  selected?: boolean;
} & Omit<ButtonProps, 'size' | 'unstyled' | 'classes' | 'variant'>;

/**
 * Render a button representing one of a set of options, with optional
 * right-aligned `details` content
 */
export default function OptionButton({
  children,
  details,
  selected = false,

  pressed,
  ...buttonProps
}: OptionButtonProps) {
  const isPressed = selected || pressed;
  return (
    <Button
      classes={classnames(
        'group', // Facilitate styling children based on this element's state
        'w-full gap-x-2 px-2 py-1',
        'rounded border border-stone-300 bg-stone-50',
        'enabled:hover:border-slate-5 enabled:hover:bg-slate-0',
        'disabled:border-stone-200',
        'aria-pressed:border-slate-5 aria-pressed:bg-slate-0 aria-pressed:shadow-inner',
        'aria-expanded:border-slate-5 aria-expanded:bg-slate-0 aria-expanded:shadow-inner',
      )}
      size="custom"
      variant="custom"
      pressed={isPressed}
      {...buttonProps}
    >
      <div className="grow flex items-center gap-x-1 text-start">
        {isPressed && (
          <div className="rounded-full bg-slate-600 p-0.5">
            <CheckIcon className="w-[0.6em] h-[0.6em] text-white" />
          </div>
        )}
        <div
          className="text-slate-600 font-semibold group-disabled:text-stone-400"
          data-testid="option-button-label"
        >
          {children}
        </div>
      </div>
      <div className="text-end">
        {details && (
          <span
            className={classnames(
              'uppercase text-[0.8em] text-stone-500',
              'group-enabled:group-hover:text-stone-600',
              'group-disabled:text-stone-400',
              'group-aria-pressed:text-slate-600 group-aria-expanded:text-slate-600',
            )}
            data-testid="option-button-details"
          >
            {details}
          </span>
        )}
      </div>
    </Button>
  );
}
