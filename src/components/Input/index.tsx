import type { InputHTMLAttributes } from "react";
import { cn } from "cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  density?: "comfortable" | "compact";
};

export function Input({
  invalid = false,
  density = "comfortable",
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={cn("sph-input", className)}
      data-density={density}
      aria-invalid={invalid || props["aria-invalid"]}
    />
  );
}
