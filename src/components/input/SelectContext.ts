import { createContext } from 'preact';

export type SelectValueOptions = {
  closeListbox: boolean;
};

type SingleSelectContext<T> = {
  selectValue: (newValue: T, options: SelectValueOptions) => void;
  value: T;
  multiple: false;
};

type MultiSelectContext<T> = {
  selectValue: (newValue: T[], options: SelectValueOptions) => void;
  value: T[];
  multiple: true;
};

export type SelectContextType<T = unknown> =
  | SingleSelectContext<T>
  | MultiSelectContext<T>;

const SelectContext = createContext<SelectContextType | null>(null);

export default SelectContext;
