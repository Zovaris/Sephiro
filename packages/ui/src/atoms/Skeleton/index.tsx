import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node } from "@/lib/node.js";

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
  width?: string | number;
  height?: string | number;
};

export function Skeleton({
  width,
  height,
  className,
  style,
  "aria-label": ariaLabel,
  ...props
}: SkeletonProps) {
  return (
    <span
      {...node(props)}
      className={cn("sph-skeleton", className)}
      style={{ ...style, width, height }}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}
