const ImageIcon = props => (
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
        d="M15 1v14H1V1h14zM1 15l3-8 4 6 3-4 4 6m-4-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      />
    </g>
  </svg>
);

export default ImageIcon;
