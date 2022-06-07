const ContrastIcon = props => (
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
        d="M8 1C4.5 1 1 4.5 1 8s3.5 7 7 7 7-3.5 7-7-3.5-7-7-7zM7 2v12M6 2v12M4 3v10M2 5v6"
      />
    </g>
  </svg>
);

export default ContrastIcon;
