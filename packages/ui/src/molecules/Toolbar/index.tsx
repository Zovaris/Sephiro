import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "cn";

export type ToolbarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: string;
  orientation?: "horizontal" | "vertical";
  start?: ReactNode;
  end?: ReactNode;
  children?: ReactNode;
};

export function Toolbar({ label = "Toolbar", orientation = "horizontal", start, end, children, className, ...props }: ToolbarProps) {
  return (
    <div {...props} className={cn("sph-toolbar", className)} data-orientation={orientation} role="toolbar" aria-label={label} aria-orientation={orientation}>
      {start !== undefined && <div className="sph-toolbar__start">{start}</div>}
      {children !== undefined && <div className="sph-toolbar__content">{children}</div>}
      {end !== undefined && <div className="sph-toolbar__end">{end}</div>}
    </div>
  );
}
