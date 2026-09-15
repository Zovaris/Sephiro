import type { ButtonHTMLAttributes } from "react";
import { classes } from "../../lib/classes";

export type ToggleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
};

export function Toggle({
  checked,
  onCheckedChange,
  label,
  className,
  disabled,
  onClick,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={classes("sph-toggle", className)}
      data-state={checked ? "checked" : "unchecked"}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onCheckedChange(!checked);
      }}
      {...props}
    >
      <span className="sph-toggle__thumb" />
    </button>
  );
}
