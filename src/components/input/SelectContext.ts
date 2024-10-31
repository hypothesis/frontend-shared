import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export type ListboxOverflow = 'truncate' | 'wrap';

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

export type SelectContextType<T = unknown> = (
  | SingleSelectContext<T>
  | MultiSelectContext<T>
) & {
  listboxOverflow: ListboxOverflow;
  listboxOpen: boolean;
};

const SelectContext = createContext<SelectContextType | null>(null);

export default SelectContext;

/**
 * Returns the context of the closest `Select` or `MultiSelect`, if any.
 */
export function useSelectContext(): SelectContextType | null {
  return useContext(SelectContext);
}
