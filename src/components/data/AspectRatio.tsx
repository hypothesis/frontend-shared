import classnames from 'classnames';
import { cloneElement, toChildArray } from 'preact';
import type { ComponentChildren, VNode } from 'preact';

export type AspectRatioProps = {
  children: ComponentChildren;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /**
   * CSS aspect ratio, expressed as a string. Default '16/9'. Used in a CSS
   * `calc()` expression.
   */
  ratio?: string;
};

/**
 * Render a wrapper element that constrains its first direct child to the
 * specified `ratio`.
 *
 * This component relies upon the old-fashioned "bottom-padding hack" to
 * constrain content until such a time as the browser support for `aspect-ratio`
 * is sufficient.
 *
 * In this model, proportional bottom padding is applied to a
 * relatively-positioned, full-width container, while the content element itself
 * is absolute-positioned with respect to the container.
 *
 * See https://www.smashingmagazine.com/2013/09/responsive-images-performance-problem-case-study/#the-padding-bottom-hack
 */
const AspectRatio = function AspectRatio({
  children,
  objectFit = 'cover',
  ratio = '16/9',
}: AspectRatioProps) {
  // Find the first vNode. This is the element that will be constrained to the
  // aspect ratio. Typically, this is either:
  // - a "replaceable element", e.g. image or video (media), or
  // - a block element, e.g. a div that contains placeholder content. In this
  //   case, content within this node will be centered horizontally and
  //   vertically.
  const childNodes = toChildArray(children);
  const firstChildNode = childNodes.find(child => typeof child === 'object') as
    | VNode<any>
    | undefined;

  const otherChildren = firstChildNode
    ? childNodes.filter(child => child !== firstChildNode)
    : children;

  const mediaClasses = classnames(
    // Position the element box relative to its container
    'absolute w-full h-full top-0 left-0',
    // Center any children horizontally and vertically
    'flex items-center justify-center',
    {
      'object-cover': objectFit === 'cover', // default
      'object-contain': objectFit === 'contain',
      'object-fill': objectFit === 'fill',
      'object-scale-down': objectFit === 'scale-down',
      'object-none': objectFit === 'none',
    },
  );

  return (
    <div
      className="w-full h-0 relative overflow-hidden"
      data-component="AspectRatio"
      style={{ paddingBottom: `calc(100% / (${ratio}))` }}
    >
      {firstChildNode &&
        cloneElement(firstChildNode, {
          class: classnames(
            mediaClasses,
            // Retain existing classes
            firstChildNode.props.className,
          ),
        })}
      {otherChildren}
    </div>
  );
};

export default AspectRatio;
