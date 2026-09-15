import { cn } from "cn";
import type { HTMLAttributes } from "react";

export type FieldMessageProps = Omit<
  HTMLAttributes<HTMLParagraphElement>,
  "children"
> & {
  variant?: "hint" | "error" | "success";
  children?: unknown;
};

export function FieldMessage({
  variant = "hint",
  className,
  children,
  ...props
}: FieldMessageProps) {
  if (children === undefined || children === null) return null;

  return (
    <p
      {...props}
      className={cn("sph-field-message", className)}
      data-variant={variant}
      role={variant === "error" ? "alert" : undefined}
    >
      {children as any}
    </p>
  );
}
