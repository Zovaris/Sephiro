import { cn } from "cn";
import type { TextareaHTMLAttributes } from "react";
import type { ControlSize } from "../../lib/control";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
  size?: ControlSize;
};

export function Textarea({
  invalid = false,
  size = "md",
  className,
  "aria-invalid": ariaInvalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      className={cn("sph-textarea", className)}
      data-size={size}
      aria-invalid={ariaInvalid ?? (invalid || undefined)}
    />
  );
}
