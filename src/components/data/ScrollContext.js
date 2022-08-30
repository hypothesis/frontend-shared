import { createContext } from 'preact';

/**
 * @typedef ScrollInfo
 * @prop {import('preact').RefObject<HTMLElement>} scrollRef
 */

const ScrollContext = createContext(/** @type {ScrollInfo} */ ({}));

export default ScrollContext;
