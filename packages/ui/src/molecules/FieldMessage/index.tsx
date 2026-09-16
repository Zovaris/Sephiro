import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";

export type FieldMessageProps = Omit<
  HTMLAttributes<HTMLParagraphElement>,
  "children"
> & {
  variant?: "hint" | "error" | "success";
  children?: Renderable;
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
      {...node(props)}
      className={cn("sph-field-message", className)}
      data-variant={variant}
      role={variant === "error" ? "alert" : undefined}
    >
      {node(children)}
    </p>
  );
}
