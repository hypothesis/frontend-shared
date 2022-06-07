const SpinnerSpokesIcon = props => (
  <svg viewBox="0 0 64 64" width={16} h={16} {...props}>
    <g strokeWidth={6} stroke="currentColor" strokeLinecap="round">
      <path d="M32 16V4">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values="0;1;.8;.65;.45;.3;.15;0"
          repeatCount="indefinite"
        />
      </path>
      <path d="m43.314 20.686 8.485-8.485">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values=".15;0;1;.8;.65;.45;.3;.15"
          repeatCount="indefinite"
        />
      </path>
      <path d="M48 32h12">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values=".3;.15;0;1;.8;.65;.45;.3"
          repeatCount="indefinite"
        />
      </path>
      <path d="m43.314 43.314 8.485 8.485">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values=".45;.3;.15;0;1;.85;.65;.45"
          repeatCount="indefinite"
        />
      </path>
      <path d="M32 48v12">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values=".65;.45;.3;.15;0;1;.8;.65;"
          repeatCount="indefinite"
        />
      </path>
      <path d="m20.686 43.314-8.485 8.485">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values=".8;.65;.45;.3;.15;0;1;.8"
          repeatCount="indefinite"
        />
      </path>
      <path d="M16 32H4">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values="1;.85;.6;.45;.3;.15;0;1;"
          repeatCount="indefinite"
        />
      </path>
      <path d="m20.686 20.686-8.485-8.485">
        <animate
          attributeName="stroke-opacity"
          dur="750ms"
          values="0;1;.8;.65;.45;.3;.15;0"
          repeatCount="indefinite"
        />
      </path>
    </g>
  </svg>
);

export default SpinnerSpokesIcon;
