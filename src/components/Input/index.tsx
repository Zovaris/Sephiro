import type { InputHTMLAttributes } from "react";
import { classes } from "../../lib/classes";

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
      className={classes("sph-input", className)}
      data-density={density}
      aria-invalid={invalid || props["aria-invalid"]}
    />
  );
}
