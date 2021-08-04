import classnames from 'classnames';

import { IconButton } from './buttons';
import { registerIcon, SvgIcon } from './SvgIcon';

// Register the cancel icon for use
const cancelIcon = registerIcon(
  'cancel',
  /** @ts-ignore - TS doesn't understand require here */
  require('../../images/icons/cancel.svg')
);

/**
 * @typedef PanelProps
 * @prop {import("preact").ComponentChildren} children
 * @prop {string} [icon] - Name of optional icon to render in header
 * @prop {() => void} [onClose] - handler for closing the panel; if provided,
 *   will render a close button that invokes this onClick
 * @prop {string} title
 */

/**
 * Render a "panel"-like interface with a title and optional icon and/or
 * close button.
 *
 * @param {PanelProps} props
 */
export function Panel({ children, icon, onClose, title }) {
  const withCloseButton = !!onClose;
  return (
    <div
      className={classnames('Hyp-Panel', {
        'Hyp-Panel--closeable': withCloseButton,
      })}
    >
      <header>
        {icon && (
          <div className="Hyp-Panel__header-icon">
            <SvgIcon name={icon} title={title} />
          </div>
        )}
        <h2 className="Hyp-Panel__title">{title}</h2>
        {withCloseButton && (
          <div className="Hyp-Panel__close">
            <IconButton icon={cancelIcon} title="Close" onClick={onClose} />
          </div>
        )}
      </header>
      <div className="Hyp-Panel__content">{children}</div>
    </div>
  );
}
