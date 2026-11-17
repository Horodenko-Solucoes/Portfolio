import { site } from "@/config/site";

export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="9" fill="#f2c14e" />
      <path d="M10 8.5v15M22 8.5v15M10 16h12" stroke="#050505" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  const [first, ...rest] = site.brand.split(" ");
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[1.05rem] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap">
        {first}
        <span className="font-normal text-soft"> {rest.join(" ")}</span>
      </span>
    </span>
  );
}
