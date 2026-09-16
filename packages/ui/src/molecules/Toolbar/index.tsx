import { cn } from "cn";
import type { HTMLAttributes } from "react";
import type { ControlSize } from "../../lib/control";

export type ToolbarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: string;
  orientation?: "horizontal" | "vertical";
  size?: ControlSize;
  start?: unknown;
  end?: unknown;
  children?: unknown;
};

export function Toolbar({
  label = "Toolbar",
  orientation = "horizontal",
  size = "sm",
  start,
  end,
  children,
  className,
  ...props
}: ToolbarProps) {
  return (
    <div
      {...props}
      className={cn("sph-toolbar", className)}
      data-orientation={orientation}
      data-size={size}
      role="toolbar"
      aria-label={label}
      aria-orientation={orientation}
    >
      {start !== undefined && (
        <div className="sph-toolbar__start">{start as any}</div>
      )}
      {children !== undefined && (
        <div className="sph-toolbar__content">{children as any}</div>
      )}
      {end !== undefined && (
        <div className="sph-toolbar__end">{end as any}</div>
      )}
    </div>
  );
}
