import type { ReactNode } from "react";

export function PhoneFrame({
  src,
  alt,
  className = "",
  loading = "lazy",
  children,
}: {
  src?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  children?: ReactNode;
}) {
  return (
    <div className={`relative mx-auto w-[260px] sm:w-[300px] ${className}`}>
      <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.25rem] bg-[#030806] p-[3px] shadow-[0_28px_90px_rgba(0,0,0,0.45)] ring-1 ring-emerald-100/10">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-ink">
          {src && (
            <img
              src={src}
              alt={alt ?? ""}
              className="h-full w-full object-cover"
              loading={loading}
            />
          )}
          {children}
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.16_152/0.20),transparent_70%)] blur-2xl" />
    </div>
  );
}
