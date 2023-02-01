import type { ComponentChildren, JSX } from 'preact';

import type { IconComponent, CompositeProps } from '../../types';
import { downcastRef } from '../../util/typing';

import Scroll from '../data/Scroll';
import Card from './Card';
import CardContent from './CardContent';
import CardHeader from './CardHeader';
import CardTitle from './CardTitle';
import CardActions from './CardActions';

type ComponentProps = {
  /** Buttons are rendered at the bottom right of the Panel. */
  buttons?: ComponentChildren;
  /** Optional icon to render in the header */
  icon?: IconComponent;

  /**
   * When present, a close button will be rendered in the header, and will use
   * this function as an onClick handler
   */
  onClose?: () => void;
  title: string;
};

export type PanelProps = CompositeProps &
  ComponentProps &
  Omit<JSX.HTMLAttributes<HTMLElement>, 'icon' | 'size' | 'width'>;

/**
 * Render a composed set of Card components in a panel-like interface.
 *
 * If the total height of the Panel exceeds any height constraints set on the
 * Panel's immediate parent element, content (`children`) will scroll. The
 * header and any buttons will not scroll.
 */
const PanelNext = function Panel({
  children,
  elementRef,

  buttons,
  icon: Icon,
  onClose,
  title,

  ...htmlAttributes
}: PanelProps) {
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
