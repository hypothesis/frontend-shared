const HideFilledIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="m1.613.21.094.083 14 14a1 1 0 0 1-1.32 1.497l-.094-.083-14-14A1 1 0 0 1 1.613.21Zm-.038 4.194 3.43 3.43L5 8a3 3 0 0 0 3 3l.166-.006 2.631 2.632C9.923 13.87 8.98 14 8 14c-4.36 0-8-2.6-8-6 0-1.367.588-2.604 1.575-3.596ZM8 2c4.36 0 8 2.6 8 6 0 1.367-.588 2.604-1.575 3.596l-3.43-3.43L11 8a3 3 0 0 0-3-3l-.167.005-2.631-2.631A10.492 10.492 0 0 1 8 2Z"
    />
  </svg>
);

export default HideFilledIcon;
