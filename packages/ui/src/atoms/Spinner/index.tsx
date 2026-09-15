import type { HTMLAttributes } from "react";
import { cn } from "cn";
import type { ControlSize } from "../../lib/control";

export type SpinnerProps = HTMLAttributes<HTMLSpanElement> & {
  size?: ControlSize;
  label?: string;
};

export function Spinner({ size = "md", label, className, ...props }: SpinnerProps) {
  return (
    <span
      {...props}
      className={cn("sph-spinner", `sph-spinner--${size}`, className)}
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
