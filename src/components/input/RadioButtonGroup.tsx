import classnames from 'classnames';
import { useId, useRef } from 'preact/hooks';

import { useArrowKeyNavigation } from '../../hooks/use-arrow-key-navigation';
import RadioButton from './RadioButton';

export type RadioButtonInput<T extends string | number> = {
  value: T;
  label: string;
  subtitle?: string;
};

export type RadioButtonGroup<T extends string | number> = {
  inputs: RadioButtonInput<T>[];
  selected?: T;
  onChange: (newSelected: T) => void;
  direction?: 'vertical' | 'horizontal';
};

function RadioInput<T extends string | number>({
  name,
  input: { value, label, subtitle },
  isSelected,
  onChange,
}: {
  name: string;
  input: RadioButtonInput<T>;
  isSelected: boolean;
  onChange: (newSelected: T) => void;
}) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      className={classnames(
        'cursor-pointer focus-visible-ring',
        'rounded-lg px-3 py-2 grow',
        {
          'bg-grey-2': isSelected,
          'hover:bg-grey-1': !isSelected,
        },
      )}
      onClick={() => onChange(value)}
      onKeyDown={e => {
        if (['Enter', ' '].includes(e.key)) {
          e.preventDefault();
          onChange(value);
        }
      }}
      tabIndex={-1}
    >
      <RadioButton
        name={name}
        value={value}
        onChange={() => onChange(value)}
        checked={isSelected}
      >
        <span className="font-medium">{label}</span>
      </RadioButton>
      {subtitle && (
        <div className="pl-4 ml-1.5 mt-1 text-grey-6 text-sm">{subtitle}</div>
      )}
    </div>
  );
}

export default function RadioButtonGroup<T extends string | number>({
  direction = 'horizontal',
  inputs,
  selected,
  onChange,
}: RadioButtonGroup<T>) {
  const name = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useArrowKeyNavigation(containerRef, {
    horizontal: direction === 'horizontal',
    vertical: direction === 'vertical',
    loop: false,
    selector: '[role="radio"]',
  });

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      className={classnames('w-full flex gap-1.5', {
        'flex-col': direction === 'vertical',
      })}
    >
      {inputs.map((input, index) => (
        <RadioInput
          key={`${input.value}${index}`}
          input={input}
          isSelected={input.value === selected}
          onChange={onChange}
          name={name}
        />
      ))}
    </div>
  );
}
