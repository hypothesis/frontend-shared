import { createContext } from 'preact';
import type { RefObject } from 'preact';

export type ScrollInfo = {
  scrollRef: RefObject<HTMLElement | undefined>;
};

const ScrollContext = createContext({} as ScrollInfo);

export default ScrollContext;
