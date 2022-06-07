const GlobeAltIcon = props => (
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
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 0c1.105 0 2-3.134 2-7s-.895-7-2-7-2 3.134-2 7 .895 7 2 7zm6.272-9.61C13.127 6.049 10.748 6.501 8 6.501S2.873 6.05 1.728 5.39m12.544 5.221C13.127 9.953 10.748 9.5 8 9.5s-5.127.453-6.272 1.111"
      />
    </g>
  </svg>
);

export default GlobeAltIcon;
