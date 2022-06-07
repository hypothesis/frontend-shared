const HighlightIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    aria-hidden="true"
    {...props}
  >
    <g fillRule="evenodd" fill="none">
      <path d="M0 0h16v16H0z" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15H1h11zm-.5-6v2l-1 1v-2l1-1zm.5-7v6h-2V2h2zm0-1h-2 2zm0 8h-2 2z"
      />
    </g>
  </svg>
);

export default HighlightIcon;
