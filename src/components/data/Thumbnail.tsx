import classnames from 'classnames';
import { toChildArray } from 'preact';
import type { JSX, ComponentChildren } from 'preact';

import type { CompositeProps } from '../../types';
import { downcastRef } from '../../util/typing';
import Spinner from '../feedback/Spinner';
import { EllipsisIcon } from '../icons';
import AspectRatio from './AspectRatio';

type ComponentProps = {
  borderless?: boolean;
  loading?: boolean;

  /**
   * Custom content to show if there are no children, and not in a loading state
   */
  placeholder?: ComponentChildren;

  /**
   * Aspect ratio, expressed as a string. This will be used in a CSS `calc()`
   * expression.
   */
  ratio?: string;

  /**
   * Relative size of border, loading spinner and placeholder content (if using
   * default placeholder content)
   */
  size?: 'sm' | 'md' | 'lg';
};

export type ThumbnailProps = CompositeProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'size' | 'loading' | 'placeholder'>;

/**
 * Render embedded media (e.g. image), handling aspect ratio, loading state and
 * placeholder content.
 */
const Thumbnail = function Thumbnail({
  children,
  elementRef,

  borderless = false,
  loading = false,
  placeholder,
  ratio = '16/9',
  size = 'md',

  ...htmlAttributes
}: ThumbnailProps) {
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

export default Thumbnail;
