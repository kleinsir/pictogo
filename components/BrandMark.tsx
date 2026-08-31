export function BrandMark({ className = "h-8 w-8" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none">
    <rect x="3.5" y="3.5" width="25" height="25" rx="7" fill="#2563EB" />
    <path d="M10 22V10h6.2a4.3 4.3 0 0 1 0 8.6H13.5V22H10Zm3.5-6.5h2.5a.8.8 0 0 0 0-1.6h-2.5v1.6Z" fill="white" />
    <path d="M21.5 20.5h3v3h-3z" fill="#BFDBFE" />
  </svg>;
}
