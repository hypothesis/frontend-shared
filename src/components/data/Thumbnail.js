import classnames from 'classnames';
import { toChildArray } from 'preact';
import { downcastRef } from '../../util/typing';

import AspectRatio from './AspectRatio';
import { EllipsisIcon } from '../icons';
import Spinner from '../feedback/Spinner';

/**
 * @typedef {import('../../types').CompositeProps} CompositeProps
 * @typedef {Omit<import('preact').JSX.HTMLAttributes<HTMLElement>, 'size'|'loading'|'placeholder'>} HTMLAttributes
 *
 * @typedef ThumbnailProps
 * @prop {boolean} [borderless=false]
 * @prop {boolean} [loading=false]
 * @prop {import('preact').ComponentChildren} [placeholder] - Custom content to
 *   show if there are no children, and not in a loading state
 * @prop {string} [ratio='16/9'] - Aspect ratio, expressed as a string.
 *   This will be used in a CSS `calc()` expression.
 * @prop {'sm'|'md'|'lg'} [size='md'] - Relative size of border, loading spinner
 *   and placeholder content (if using default placeholder content)
 */

/**
 * Render embedded media (e.g. image), handling aspect ratio, loading state and
 * placeholder content.
 *
 * @param {CompositeProps & ThumbnailProps & Omit<HTMLAttributes, 'size'>} props
 */
const ThumbnailNext = function Thumbnail({
  children,
  elementRef,

  borderless = false,
  loading = false,
  placeholder,
  ratio = '16/9',
  size = 'md',

  ...htmlAttributes
}) {
  const emptyContent = placeholder ?? (
    <EllipsisIcon
      className={classnames('text-grey-5', {
        'w-4 h-4': size === 'sm' || size === 'md', // default (md)
        'w-8 h-8': size === 'lg',
      })}
    />
  );
  // If there are no `children`, render a placeholder (unless loading)
  const content = toChildArray(children).length ? (
    children
  ) : (
    <div>{emptyContent}</div>
  );

  return (
    <div
      data-composite-component="Thumbnail"
      {...htmlAttributes}
      ref={downcastRef(elementRef)}
      className={classnames('bg-grey-1 w-full h-full overflow-hidden', {
        'p-3': size === 'md' && !borderless, // default
        'p-2': size === 'sm' && !borderless,
        'p-4': size === 'lg' && !borderless,
        'p-0': borderless,
      })}
    >
      <div className="bg-white h-full w-full flex items-center justify-center overflow-hidden">
        <AspectRatio ratio={ratio}>
          {loading ? (
            <div>
              <Spinner size={size} />
            </div>
          ) : (
            content
          )}
        </AspectRatio>
      </div>
    </div>
  );
};

export default ThumbnailNext;
