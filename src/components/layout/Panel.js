import { downcastRef } from '../../util/typing';

import Card from './Card';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardActions from './CardActions';

import Scroll from '../data/Scroll';

/**
 * @typedef {import('../../types').CompositeProps} CompositeProps
 * @typedef {import('preact').JSX.HTMLAttributes<HTMLElement>} HTMLAttributes
 * @typedef {import('../../types').IconComponent} IconComponent
 *
 * @typedef PanelProps
 * @prop {import('preact').ComponentChildren} [buttons] - content to render as
 *   actions for the panel
 * @prop {IconComponent} [icon] - Name of optional icon to render in header
 * @prop {() => void} [onClose] - handler for closing the panel; if provided,
 *   will render a close button that invokes this onClick
 * @prop {string} title

 */

/**
 * Render a composed set of Card components in a panel-like interface
 *
 * @param {CompositeProps & PanelProps & Omit<HTMLAttributes, 'icon'|'size'|'width'>} props
 */
const PanelNext = function Panel({
  children,
  elementRef,

  buttons,
  icon: Icon,
  onClose,
  title,

  ...htmlAttributes
}) {
  return (
    <Card
      {...htmlAttributes}
      classes={'flex flex-col min-h-0 h-full'}
      elementRef={downcastRef(elementRef)}
      data-composite-component="Panel"
    >
      <CardHeader onClose={onClose}>
        {Icon && <Icon className="w-em h-em" />}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <Scroll>
        <CardContent>{children}</CardContent>
      </Scroll>
      <CardContent>
        {buttons && <CardActions>{buttons}</CardActions>}
      </CardContent>
    </Card>
  );
};

export default PanelNext;
