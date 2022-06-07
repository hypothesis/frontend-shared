const HelpIcon = props => (
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
        d="M8 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM4 4.5C4 2.567 5.79 1 8 1s4 1.567 4 3.5S10.21 8 8 8m0 0v1.5V8z"
      />
    </g>
  </svg>
);

export default HelpIcon;
