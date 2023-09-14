import { createContext } from 'preact';

type EnhancedSelectContextType<T = unknown> = {
  selectValue: (newValue: T) => void;
  selected: T;
};

const EnhancedSelectContext = createContext<EnhancedSelectContextType | null>(
  null,
);

export default EnhancedSelectContext;
