import type { InputHTMLAttributes } from "react";
import { cn } from "cn";
import type { ControlSize } from "../../lib/control";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: unknown;
  size?: ControlSize;
  invalid?: boolean;
};

export function Checkbox({ label, size = "md", invalid = false, className, ...props }: CheckboxProps) {
  const control = (
    <input
      {...props}
      type="checkbox"
      className="sph-checkbox__input"
      data-size={size}
      aria-invalid={invalid ? true : props["aria-invalid"]}
    />
  );

  if (label === undefined) return control;

  return (
    <label className={cn("sph-checkbox", className)} data-size={size}>
      {control}
      <span className="sph-checkbox__box" aria-hidden="true" />
      <span className="sph-checkbox__label">{label as any}</span>
    </label>
  );
}
