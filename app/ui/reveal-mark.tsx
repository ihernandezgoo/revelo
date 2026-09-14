export function RevealMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v4.5M19.8 7.5l-3.9 2.25M19.8 16.5l-3.9-2.25M12 21v-4.5M4.2 16.5l3.9-2.25M4.2 7.5l3.9 2.25" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
