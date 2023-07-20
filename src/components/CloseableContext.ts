import { createContext } from 'preact';

/**
 * Provide a close handler to descendants. This can allow, e.g., button-like
 * components to correctly close a parent dialog or panel.
 */
export type CloseableInfo = {
  onClose: (() => void) | undefined;
};

const CloseableContext = createContext({} as CloseableInfo);

export default CloseableContext;
