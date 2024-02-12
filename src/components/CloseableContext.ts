import { createContext } from 'preact';

export type CloseableInfo = {
  /** The close button title. Defaults to "Close" */
  title?: string;

  /**
   * Provide a close handler to descendants. This can allow, e.g., button-like
   * components to correctly close a parent dialog or panel.
   */
  onClose: (() => void) | undefined;
};

const CloseableContext = createContext({} as CloseableInfo);

export default CloseableContext;
