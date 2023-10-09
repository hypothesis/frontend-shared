import { createContext } from 'preact';

export type SelectFilterableContextType<T = unknown> = {
  shouldRender: (value: T) => boolean;
};

const SelectFilterableContext =
  createContext<SelectFilterableContextType | null>(null);

export default SelectFilterableContext;
