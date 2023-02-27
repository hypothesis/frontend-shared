import classnames from 'classnames';

// @ts-ignore
import cancelSVG from '../../images/icons/cancel.svg';
import { registerIcon, SvgIcon } from './SvgIcon';
import { IconButton } from './buttons';

// Register the cancel icon for use
const cancelIcon = registerIcon('cancel', cancelSVG);

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
 * @deprecated - Use re-implemented Panel component in the layout group
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
      <header className="Hyp-Panel__header">
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
