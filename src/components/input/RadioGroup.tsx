import classnames from 'classnames';
import type { ComponentChildren } from 'preact';
import { useContext, useRef } from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import { RadioCheckedIcon, RadioIcon } from '../icons';
import RadioGroupContext from './RadioGroupContext';

type RadioValue = string | number;

export type RadioProps<T extends RadioValue> = {
  value: T;
  /** Content provided as children is vertically aligned with the radio icon */
  children: ComponentChildren;

  /**
   * Allows to provide extra content to be displayed under the children, in a
   * smaller and more subtle font color.
   */
  subtitle?: ComponentChildren;

  disabled?: boolean;
};

function Radio<T extends RadioValue>({
  value,
  children,
  subtitle,
  disabled: radioDisabled,
}: RadioProps<T>) {
  const radioGroupContext = useContext(RadioGroupContext);
  if (!radioGroupContext) {
    throw new Error('RadioGroup.Radio can only be used as RadioGroup child');
  }

  const { selected, disabled = radioDisabled, onChange } = radioGroupContext;
  const isSelected = !disabled && selected === value;

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      aria-disabled={disabled}
      className={classnames(
        'focus-visible-ring rounded-lg px-3 py-2 grow group',
        {
          'bg-grey-3/50': isSelected,
          'hover:bg-grey-3/25': !isSelected && !disabled,
          'opacity-70': disabled,
          'cursor-pointer': !disabled,
        },
      )}
      data-value={value}
      onClick={!disabled ? () => onChange(value) : undefined}
      onKeyDown={
        disabled
          ? undefined
          : e => {
              if (['Enter', ' '].includes(e.key)) {
                e.preventDefault();
                onChange(value);
              }
            }
      }
      tabIndex={-1}
    >
      <div className="flex items-center gap-x-1.5">
        {isSelected ? <RadioCheckedIcon /> : <RadioIcon />}
        {children}
      </div>
      {subtitle && (
        <div
          className={classnames('pl-4 ml-1.5 mt-1 text-sm', {
            'text-grey-7': isSelected,
            'text-grey-6 group-hover:text-grey-7': !isSelected && !disabled,
          })}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

Radio.displayName = 'RadioGroup.Radio';

export type RadioGroupProps<T extends RadioValue> = {
  children: ComponentChildren;
  selected?: T;
  onChange: (newSelected: T) => void;

  /**
   * Determines the direction in which radios are stacked.
   * Defaults to 'horizontal'.
   */
  direction?: 'vertical' | 'horizontal';

  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;

  /**
   * If provided, adds a hidden form control with the given name and the value
   * set to the selected radio's value, for use in form submissions.
   */
  name?: string;
};

function RadioGroupMain<T extends RadioValue>({
  direction = 'horizontal',
  children,
  selected,
  onChange,
  disabled,
  'aria-label': label,
  'aria-labelledby': labelledBy,
  name,
}: RadioGroupProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useArrowKeyNavigation(containerRef, {
    loop: false,
    selector: '[role="radio"]:not([aria-disabled="true"])',
    focusElement: el => {
      onChange(el.dataset.value as T);
      el.focus();
    },
  });

  return (
    <RadioGroupContext.Provider
      value={{ selected, disabled, onChange: onChange as any }}
    >
      <div
        aria-label={label}
        aria-labelledby={labelledBy}
        ref={containerRef}
        role="radiogroup"
        className={classnames('w-full flex gap-1.5', {
          'flex-col': direction === 'vertical',
        })}
      >
        {children}
      </div>
      {name && (
        <input
          type="hidden"
          data-testid="hidden-input"
          name={name}
          value={selected}
          disabled={disabled}
        />
      )}
    </RadioGroupContext.Provider>
  );
}

const RadioGroup = Object.assign(RadioGroupMain, {
  Radio,
  displayName: 'RadioGroup',
});

export default RadioGroup;
