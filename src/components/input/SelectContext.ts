import { createContext } from 'preact';

export type SelectContextType<T = unknown> = {
  selectValue: (newValue: T | T[]) => void;
  value: T | T[];
};

const SelectContext = createContext<SelectContextType | null>(null);

export default SelectContext;
