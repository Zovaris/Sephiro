import { cn } from "cn";
import type { HTMLAttributes } from "react";
import type { ControlSize } from "../../lib/control";
import { type Renderable, node } from "@/lib/node";

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  variant?: "neutral" | "accent" | "success" | "warning" | "danger";
  size?: ControlSize;
  children?: Renderable;
};

export function Badge({
  variant = "neutral",
  size = "sm",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={cn("sph-badge", className)}
      data-variant={variant}
      data-size={size}
    >
      {node(children)}
    </span>
  );
}
