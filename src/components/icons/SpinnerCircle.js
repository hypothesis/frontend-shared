// This file was auto-generated using scripts/generate-icons.js

/**
 * Icon generated from spinner--circle.svg
 *
 * @param {import('preact').JSX.SVGAttributes<SVGSVGElement>} props
 */
export default function SpinnerCircleIcon(props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
        <path
          d="M36 18c0-9.94-8.06-18-18-18"
          stroke="currentColor"
          stroke-width="2"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </path>
        <circle fill="#fff" cx="36" cy="18" r="1">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="0.9s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
}
