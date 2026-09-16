import { cn } from "cn";
import type { ButtonHTMLAttributes } from "react";
import type { ControlSize } from "../../lib/control";
import { type Renderable, node } from "@/lib/node";
import { Spinner } from "../Spinner";

export type ButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  variant?: "primary" | "secondary" | "quiet";
  size?: ControlSize;
  loading?: boolean;
  children?: Renderable;
};

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  disabled,
  className,
  type = "button",
  children,
  "aria-busy": ariaBusy,
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
      {...props}
      aria-busy={ariaBusy ?? (loading || undefined)}
    >
      {loading && <Spinner size="sm" />}
      <span className="sph-button__label">{node(children)}</span>
    </button>
  );
}
