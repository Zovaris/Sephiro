import { cn } from "cn";
import type { ButtonHTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";
import type { ControlSize } from "../../lib/control";
import { Spinner } from "../Spinner";

export type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  icon: Renderable;
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
      {...node(props)}
      type={type}
      className={cn("sph-icon-button", className)}
      data-size={size}
      data-variant={variant}
      data-loading={loading || undefined}
      aria-label={label}
      aria-busy={loading ? true : props["aria-busy"]}
      disabled={disabled || loading}
    >
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : node(icon)}
    </button>
  );
}
