import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";

export type SurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children?: Renderable;
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
      {...node(props)}
      className={cn("sph-surface", className)}
      data-tone={tone}
      data-padding={padding}
    >
      {node(children)}
    </div>
  );
}
