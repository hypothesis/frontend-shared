// This file was auto-generated using scripts/generate-icons.js

/**
 * Icon generated from spinner--circle.svg
 *
 * @param {import('preact').JSX.SVGAttributes<SVGSVGElement>} props
 */
export default function SpinnerCircleIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 38 38"
      {...props}
    >
      <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
        <path
          stroke="currentColor"
          stroke-width="2"
          d="M36 18c0-9.94-8.06-18-18-18"
        >
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          />
        </path>
        <circle cx="36" cy="18" r="1" fill="#fff">
          <animateTransform
            attributeName="transform"
            dur="0.9s"
            from="0 18 18"
            repeatCount="indefinite"
            to="360 18 18"
            type="rotate"
          />
        </circle>
      </g>
    </svg>
  );
}
