import classnames from 'classnames';

import { IconButton } from './buttons';
import { SvgIcon } from './SvgIcon';

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
      className={classnames('Panel', { 'Panel--closeable': withCloseButton })}
    >
      <header>
        {icon && (
          <div className="Panel__header-icon">
            <SvgIcon name={icon} title={title} />
          </div>
        )}
        <h2 className="Panel__title">{title}</h2>
        {withCloseButton && (
          <div className="Panel__close">
            <IconButton icon="cancel" title="Close" onClick={onClose} />
          </div>
        )}
      </header>
      <div>{children}</div>
    </div>
  );
}
