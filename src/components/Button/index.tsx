import type { ButtonHTMLAttributes } from "react";
import { classes } from "../../lib/classes";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
  size?: "sm" | "md";
};

export function Button({
  variant = "secondary",
  size = "sm",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes("sph-button", className)}
      data-variant={variant}
      data-size={size}
      {...props}
    />
  );
}
