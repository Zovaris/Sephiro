export function SephiroMark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <path
        className="mark__orbit"
        d="M25.5 8.3A11.6 11.6 0 0 0 8.4 7.2a11.7 11.7 0 0 0-2.8 11.7"
      />
      <circle className="mark__core" cx="16" cy="16" r="3.5" />
      <circle className="mark__node" cx="25.7" cy="7.4" r="2.1" />
    </svg>
  );
}
