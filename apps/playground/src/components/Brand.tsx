type SephiroMarkProps = {
  className?: string;
};

export function SephiroMark({ className }: SephiroMarkProps) {
  return (
    <svg className={className ? `sephiro-mark ${className}` : "sephiro-mark"} viewBox="0 0 32 32" aria-hidden="true">
      <path className="sephiro-mark__orbit" d="M25.5 8.3A11.6 11.6 0 0 0 8.4 7.2a11.7 11.7 0 0 0-2.8 11.7" />
      <path className="sephiro-mark__letter" d="M21.8 10.1c-1.4-1.8-3.3-2.7-5.8-2.7-3.1 0-5.4 1.5-5.4 3.7 0 2.2 1.9 3.2 5.6 4.2 3.9 1 5.9 2.1 5.9 4.5 0 2.5-2.3 4.3-5.9 4.3-2.9 0-5.3-1.1-6.9-3.2" />
      <circle className="sephiro-mark__node" cx="25.7" cy="7.4" r="2.1" />
    </svg>
  );
}

export function SephiroLogo() {
  return (
    <span className="sephiro-logo">
      <span className="brand-mark"><SephiroMark /></span>
      <span className="wordmark__name">Sephiro</span>
    </span>
  );
}
