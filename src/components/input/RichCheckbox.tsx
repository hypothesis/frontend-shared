import classnames from 'classnames';
import type { ComponentChildren } from 'preact';
import { useCallback } from 'preact/hooks';

import { CheckboxCheckedFilledIcon, CheckboxIcon } from '../icons';

export type RichCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;

  /**
   * Content provided as children is vertically aligned with the checkbox icon
   */
  children: ComponentChildren;

  /**
   * Allows to provide extra content to be displayed under the children, in a
   * smaller and more subtle font color.
   */
  subtitle?: ComponentChildren;
};

/**
 * An opinionated `[role="checkbox"]` component which displays a checkbox icon
 * next to provided content.
 *
 * If a `subtitle` is provided, it will be shown in a lighter color right under
 * the main content, and aligned on the left with it.
 */
export default function RichCheckbox({
  checked,
  onChange,
  children,
  subtitle,
}: RichCheckboxProps) {
  const toggle = useCallback(() => onChange(!checked), [checked, onChange]);

  return (
    <div
      className={classnames(
        'group focus-visible-ring',
        'grid gap-x-1.5 items-center grid-cols-[auto_1fr]',
        'px-3 py-2 rounded-lg cursor-pointer',
        'hover:bg-grey-3/25 aria-checked:bg-grey-3/50',
      )}
      role="checkbox"
      aria-checked={checked}
      onClick={toggle}
      onKeyDown={e => {
        if (['Enter', ' '].includes(e.key)) {
          e.preventDefault();
          toggle();
        }
      }}
      tabIndex={0}
    >
      {!checked && <CheckboxIcon />}
      {checked && <CheckboxCheckedFilledIcon />}
      <p className="text-grey-7 group-hover:text-grey-8 group-aria-checked:text-grey-8">
        {children}
      </p>
      {subtitle && (
        <>
          <div />
          <p
            data-testid="subtitle"
            className="text-grey-6 group-hover:text-grey-7 group-aria-checked:text-grey-7"
          >
            {subtitle}
          </p>
        </>
      )}
    </div>
  );
}
