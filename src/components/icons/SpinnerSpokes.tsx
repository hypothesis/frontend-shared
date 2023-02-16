// This file was auto-generated using scripts/generate-icons.js
import type { JSX } from 'preact';

export type SpinnerSpokesIconProps = JSX.SVGAttributes<SVGSVGElement>;

/**
 * Icon generated from spinner--spokes.svg
 */
export default function SpinnerSpokesIcon(props: SpinnerSpokesIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 64 64"
      data-component="SpinnerSpokesIcon"
      {...props}
    >
      <g stroke="currentColor" stroke-linecap="round" stroke-width="6">
        <path d="M32 16V4">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values="0;1;.8;.65;.45;.3;.15;0"
          />
        </path>
        <path d="m43.314 20.686 8.485-8.485">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values=".15;0;1;.8;.65;.45;.3;.15"
          />
        </path>
        <path d="M48 32h12">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values=".3;.15;0;1;.8;.65;.45;.3"
          />
        </path>
        <path d="m43.314 43.314 8.485 8.485">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values=".45;.3;.15;0;1;.85;.65;.45"
          />
        </path>
        <path d="M32 48v12">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values=".65;.45;.3;.15;0;1;.8;.65;"
          />
        </path>
        <path d="m20.686 43.314-8.485 8.485">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values=".8;.65;.45;.3;.15;0;1;.8"
          />
        </path>
        <path d="M16 32H4">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values="1;.85;.6;.45;.3;.15;0;1;"
          />
        </path>
        <path d="m20.686 20.686-8.485-8.485">
          <animate
            attributeName="stroke-opacity"
            dur="750ms"
            repeatCount="indefinite"
            values="0;1;.8;.65;.45;.3;.15;0"
          />
        </path>
      </g>
    </svg>
  );
}
