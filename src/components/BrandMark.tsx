type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function BrandMark({ className = "h-9 w-9", iconClassName = "h-5 w-5" }: BrandMarkProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-[#25D366] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-white ${iconClassName}`}
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    </div>
  );
}
