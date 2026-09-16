import { cn } from "cn";
import type { InputHTMLAttributes } from "react";
import type { ControlSize } from "../../lib/control";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  invalid?: boolean;
  size?: ControlSize;
  /** @deprecated Use `size`; comfortable maps to md and compact maps to sm. */
  density?: "comfortable" | "compact";
};

export function Input({
  invalid = false,
  size,
  density,
  className,
  ...props
}: InputProps) {
  const resolvedSize = size ?? (density === "compact" ? "sm" : "md");

  return (
    <input
      {...props}
      className={cn("sph-input", className)}
      data-size={resolvedSize}
      data-density={density}
      aria-invalid={invalid ? true : props["aria-invalid"]}
    />
  );
}
