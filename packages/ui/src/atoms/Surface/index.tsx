import { cn } from "cn";
import type { HTMLAttributes, ReactNode } from "react";

export type SurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children?: ReactNode;
  tone?: "base" | "elevated" | "raised";
  padding?: "none" | "sm" | "md" | "lg";
};

export function Surface({
  tone = "base",
  padding = "md",
  className,
  children,
  ...props
}: SurfaceProps) {
  return (
    <div
      {...props}
      className={cn("sph-surface", className)}
      data-tone={tone}
      data-padding={padding}
    >
      {children}
    </div>
  );
}
