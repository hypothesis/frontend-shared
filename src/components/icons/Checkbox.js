const CheckboxIcon = props => (
  <svg
    width={32}
    height={32}
    viewBox="-4 -4 39 39"
    aria-hidden="true"
    {...props}
  >
    <rect
      className="checkbox_svg__hyp-svg-checkbox--background"
      width={35}
      height={35}
      x={-2}
      y={-2}
      stroke="currentColor"
      fill="none"
      strokeWidth={3}
      rx={5}
      ry={5}
    />
    <path
      className="checkbox_svg__hyp-svg-checkbox--checkmark"
      stroke="transparent"
      strokeWidth={5}
      fill="none"
      d="m4 14 8 9L28 5"
    />
  </svg>
);

export default CheckboxIcon;
