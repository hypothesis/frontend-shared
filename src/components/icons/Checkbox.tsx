// This file was auto-generated using scripts/generate-icons.js
import type { JSX } from 'preact';

export type CheckboxIconProps = JSX.SVGAttributes<SVGSVGElement>;

/**
 * Icon generated from checkbox.svg
 */
export default function CheckboxIcon(props: CheckboxIconProps) {
  return (
    <svg
      width="16"
      height="16"
      aria-hidden="true"
      viewBox="-4 -4 39 39"
      data-component="CheckboxIcon"
      {...props}
    >
      <rect
        width="35"
        height="35"
        x="-2"
        y="-2"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        class="hyp-svg-checkbox--background"
        rx="5"
        ry="5"
      />
      <path
        fill="none"
        stroke="transparent"
        stroke-width="5"
        d="m4 14 8 9L28 5"
        class="hyp-svg-checkbox--checkmark"
      />
    </svg>
  );
}
