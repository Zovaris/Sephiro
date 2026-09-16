import { cn } from "cn";
import type { InputHTMLAttributes } from "react";
import { node } from "@/lib/node.js";
import type { ControlSize } from "../../lib/control";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  invalid?: boolean;
  size?: ControlSize;
};

export function Input({
  invalid = false,
  size = "md",
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: InputProps) {
  return (
    <input
      {...node(props)}
      className={cn("sph-input", className)}
      data-size={size}
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
    />
  );
}
