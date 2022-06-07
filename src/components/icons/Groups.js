const GroupsIcon = props => (
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
        d="M1 15a3 3 0 0 1 6 0m2-4a3 3 0 0 1 6 0M4 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm8-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
      />
    </g>
  </svg>
);

export default GroupsIcon;
