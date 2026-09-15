import type { ButtonHTMLAttributes } from "react";
import { cn } from "cn";
import type { ControlSize } from "../../lib/control";

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  size?: ControlSize;
};

export function Toggle({ checked, onCheckedChange, label, className, disabled, onClick, size = "md", ...props }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={cn("sph-toggle", className)}
      data-state={checked ? "checked" : "unchecked"}
      data-size={size}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onCheckedChange(!checked);
      }}
      {...props}
    >
      <span className="sph-toggle__track">
        <span className="sph-toggle__thumb" />
      </span>
    </button>
  );
}
