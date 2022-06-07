const SpinnerCircleIcon = props => (
  <svg width={38} height={38} xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(1 1)" fill="none" fillRule="evenodd">
      <path
        d="M36 18c0-9.94-8.06-18-18-18"
        stroke="currentColor"
        strokeWidth={2}
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
      <circle fill="#fff" cx={36} cy={18} r={1}>
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

export default SpinnerCircleIcon;
