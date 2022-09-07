import classnames from 'classnames';
import { toChildArray } from 'preact';

import { Spinner } from './Spinner';

/**
 * @typedef {import('preact').ComponentChildren} Children
 *
 * @typedef ThumbnailProps
 * @prop {Children|null} [children] - Thumbnail content (typically an img)
 * @prop {string} [classes] - Additional CSS classes to apply
 * @prop {boolean} [isLoading=false] - Is the thumbnail loading?
 * @prop {Children} [placeholder='...'] - Optional placeholder to replace default
 * @prop {'small'|'medium'|'large'} [size='medium'] - Relative size of spinner
 *   to surrounding content. Typically the `large` size is appropriate, but for
 *   small thumbnails, `medium` might feel more appropriate.
 */

/**
 * Render a container with thumbnail content.
 *
 * Thumbnail content (e.g. img) may or may not be present. This component
 * provides support for three states:
 *
 *  - Content not yet loaded or is not available: Show a placeholder
 *  - Content is loading: Show a loading spinner
 *  - Content is present: Show the content, unless `isLoading` is `true`
 *
 * Thumbnail dimensions will remain constant even when content is not present,
 * avoiding layout shifts. Applied styling will constrain content to dimensions
 * of parent container. Apply explicit width and height rules to the parent
 * container of this component to dictate sizing.
 *
 * Examples:
 *
 * <Thumbnail><img src="http://placekitten.com/200/300" alt="kitty" /></Thumbnail>
 * <Thumbnail /> // -> Empty, shows placeholder
 * <Thumbnail isLoading /> // -> Empty, shows loading spinner
 *
 * TODO: There is an implied sub-pattern/-component here to do with rendering
 * embedded media within constraints, preventing layout shift, and handling
 * loading states. See https://github.com/hypothesis/frontend-shared/issues/134
 *
 * @param {ThumbnailProps} props
 */
export function Thumbnail({
  children,
  classes = '',
  isLoading = false,
  placeholder = '...',
  size = 'medium',
}) {
  // If there are no `children`, render a placeholder (unless loading)
  const content = toChildArray(children).length ? children : placeholder;

  return (
    <div className={classnames('Hyp-Thumbnail', classes)}>
      <div className="Hyp-Thumbnail__content">
        {isLoading && <Spinner size={size} />}
        {!isLoading && content}
      </div>
    </div>
  );
}
