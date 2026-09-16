import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type { InputHTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";
import type { ControlSize } from "../../lib/control";

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: Renderable;
  size?: ControlSize;
  invalid?: boolean;
};

export function Checkbox({
  label,
  size = "md",
  invalid = false,
  className,
  ...props
}: CheckboxProps) {
  const control = (
    <input
      {...node(props)}
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
      <span className="sph-checkbox__box" aria-hidden="true">
        <CheckIcon className="sph-checkbox__check" />
      </span>
      <span className="sph-checkbox__label">{node(label)}</span>
    </label>
  );
}
