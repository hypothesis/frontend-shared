const EditIcon = props => (
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
        d="m11 4 1 1-9 9-2 1 1-2 9-9zm3-3 1 1-1 1-1-1 1-1z"
      />
    </g>
  </svg>
);

export default EditIcon;
