const CollapseIcon = props => (
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
        d="m5 11-4 4 4-4zm-3-1h4v4m9-13-4 4 4-4zm-1 5h-4V2"
      />
    </g>
  </svg>
);

export default CollapseIcon;
