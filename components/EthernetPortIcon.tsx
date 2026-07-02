// A small RJ45 / ethernet-port glyph used as the timeline connector node.
export function EthernetPortIcon({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3.5" y="3.5" width="17" height="11" rx="1.8" />
      <path d="M8.5 14.5 V18 a1 1 0 0 0 1 1 h5 a1 1 0 0 0 1-1 V14.5" />
      <path d="M7 7 V11 M10 7 V11 M14 7 V11 M17 7 V11" />
    </svg>
  );
}
