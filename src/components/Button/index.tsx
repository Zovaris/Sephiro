import type { ButtonHTMLAttributes } from "react";
import { cn } from "cn";
import type { ControlSize } from "../../lib/control";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
  size?: ControlSize;
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("sph-button", className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}
