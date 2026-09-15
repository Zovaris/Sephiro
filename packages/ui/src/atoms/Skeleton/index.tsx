import type { HTMLAttributes } from "react";
import { cn } from "cn";

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
  width?: string | number;
  height?: string | number;
};

export function Skeleton({ width, height, className, style, ...props }: SkeletonProps) {
  return (
    <span
      {...props}
      className={cn("sph-skeleton", className)}
      style={{ ...style, width, height }}
      aria-hidden={props["aria-label"] ? undefined : true}
    />
  );
}
