import classnames from 'classnames';

import { downcastRef } from '../../util/typing';

import { CancelIcon } from '../icons';
import { IconButton } from '../input';

import CardTitle from './CardTitle';

/**
 * @typedef {import('../../types').PresentationalProps} CommonProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 *
 * @typedef CardHeaderProps
 * @prop {string} [title]
 * @prop {() => void} [onClose] - Optional callback to close the Card. When
 *   present, a close button will be rendered
 */

/**
 * Render a header area in a Card with optional title and/or close button
 *
 * @param {CommonProps & CardHeaderProps & HTMLAttributes} props
 */
const CardHeaderNext = function CardHeader({
  children,
  classes,
  elementRef,

  onClose,
  title,

  ...htmlAttributes
}) {
  return (
    <div
      {...htmlAttributes}
      className={classnames(
        'flex items-center gap-x-2 mx-3 py-2 border-b',
        classes
      )}
      ref={downcastRef(elementRef)}
      data-component="CardHeader"
    >
      {title && <CardTitle>{title}</CardTitle>}
      {children}
      {onClose && (
        <IconButton
          onClick={onClose}
          title="Close"
          classes={classnames(
            // Pull button right such that its icon right-aligns with the
            // header's bottom border
            '-mr-3'
          )}
        >
          <CancelIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CardHeaderNext;
