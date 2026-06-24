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
      <div className="relative aspect-[9/19.5] rounded-[2.4rem] border border-border bg-black p-2 shadow-elevated">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-background">
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
