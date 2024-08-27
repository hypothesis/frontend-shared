import { createContext } from 'preact';

export type RadioGroupContextType<T = unknown> = {
  selected: T | undefined;
  disabled?: boolean;
  onChange: (newSelected: T) => void;
};

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export default RadioGroupContext;
