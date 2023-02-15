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

  /**
   * Make the header take the full width of the Panel, with a full-width border
   */
  fullWidthHeader?: boolean;

  /**
   * Forwarded to `CardContent`. If `none`, content is not wrapped with
   * `CardContent`. This allows content to span the full width and height of
   * the Panel's content area without any inset/padding.
   */
  paddingSize?: 'sm' | 'md' | 'lg' | 'none';

  /** Optional icon to render in the header */
  icon?: IconComponent;

  /**
   * When present, a close button will be rendered in the header, and will use
   * this function as an onClick handler
   */
  onClose?: () => void;
  /**
   * The content of the Panel should scroll if it exceeds available vertical
   * space. This will cause the `CardHeader` (and its bottom border) to span the
   * full width of the Panel. This prevents scroll shadow hints from looking
   * awkward.
   */
  scrollable?: boolean;
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
  fullWidthHeader = false,
  icon: Icon,
  onClose,
  paddingSize = 'md',
  scrollable = false,
  title,

  ...htmlAttributes
}: PanelProps) {
  // These classes are set on the content container hierarchy in this component
  // to ensure that the overall height is constrained to height rules set on
  // parent elements. This allows for control over scrolling content,
  // specifically.
  const heightConstraintClasses = 'flex flex-col min-h-0 h-full';
  const panelContent =
    paddingSize === 'none' ? (
      children
    ) : (
      <CardContent
        classes={heightConstraintClasses}
        data-testid="panel-content-wrapper"
        size={paddingSize}
      >
        {children}
      </CardContent>
    );
  return (
    <Card
      {...htmlAttributes}
      classes={heightConstraintClasses}
      elementRef={downcastRef(elementRef)}
      data-composite-component="Panel"
    >
      <CardHeader onClose={onClose} fullWidth={scrollable || fullWidthHeader}>
        {Icon && <Icon className="w-em h-em" />}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      {scrollable ? <Scroll>{panelContent}</Scroll> : <>{panelContent}</>}
      <CardContent>
        {buttons && <CardActions>{buttons}</CardActions>}
      </CardContent>
    </Card>
  );
};

export default PanelNext;
