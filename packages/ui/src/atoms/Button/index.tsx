import type { ButtonHTMLAttributes } from "react";
import { cn } from "cn";
import type { ControlSize } from "../../lib/control";
import { Spinner } from "../Spinner";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: "primary" | "secondary" | "quiet";
  size?: ControlSize;
  loading?: boolean;
  children?: unknown;
};

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  disabled,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn("sph-button", className)}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      aria-busy={loading ? true : props["aria-busy"]}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      <span className="sph-button__label">{children as any}</span>
    </button>
  );
}
