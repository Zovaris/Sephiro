import { cn } from "cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { ControlSize } from "../../lib/control";
import { Spinner } from "../Spinner";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  icon: ReactNode;
  label: string;
  size?: ControlSize;
  variant?: "ghost" | "solid" | "outline";
  loading?: boolean;
};

export function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  loading = false,
  disabled,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn("sph-icon-button", className)}
      data-size={size}
      data-variant={variant}
      data-loading={loading || undefined}
      aria-label={label}
      aria-busy={loading ? true : props["aria-busy"]}
      disabled={disabled || loading}
    >
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : icon}
    </button>
  );
}
