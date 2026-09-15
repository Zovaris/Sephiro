import type { HTMLAttributes } from "react";
import { cn } from "cn";
import type { ControlSize } from "../../lib/control";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  variant?: "neutral" | "accent" | "success" | "warning" | "danger";
  size?: ControlSize;
  children?: unknown;
};

export function Badge({ variant = "neutral", size = "sm", className, children, ...props }: BadgeProps) {
  return (
    <span
      {...props}
      className={cn("sph-badge", className)}
      data-variant={variant}
      data-size={size}
    >
      {children as any}
    </span>
  );
}
