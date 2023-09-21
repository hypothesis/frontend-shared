import { createContext } from 'preact';

export type SelectContextType<T = unknown> = {
  selectValue: (newValue: T) => void;
  value: T;
};

const SelectContext = createContext<SelectContextType | null>(null);

export default SelectContext;
