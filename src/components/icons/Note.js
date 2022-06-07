const NoteIcon = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14 0a2 2 0 0 1 1.995 1.85L16 2v7a1 1 0 0 1-.31.724l-.09.076-8 6a1 1 0 0 1-.471.192L7 16H2a2 2 0 0 1-1.995-1.85L0 14V2A2 2 0 0 1 1.85.005L2 0h12Zm0 2H2v12h4V9a1 1 0 0 1 .883-.993L7 8h7V2Zm-2 8H8v3l4-3Z"
    />
  </svg>
);

export default NoteIcon;
