const ExpandIcon = props => (
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
        d="m2 14 4-4-4 4zm3 1H1v-4m13-9-4 4 4-4zm-3-1h4v4"
      />
    </g>
  </svg>
);

export default ExpandIcon;
