const ProfileIcon = props => (
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
        d="M1 15c0-2.761 3.134-5 7-5s7 2.239 7 5M8 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
      />
    </g>
  </svg>
);

export default ProfileIcon;
