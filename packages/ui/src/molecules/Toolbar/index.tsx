import { cn } from "cn";
import type { HTMLAttributes } from "react";
import type { ControlSize } from "../../lib/control";
import { type Renderable, node } from "@/lib/node";

export type ToolbarProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  label?: string;
  orientation?: "horizontal" | "vertical";
  size?: ControlSize;
  start?: Renderable;
  end?: Renderable;
  children?: Renderable;
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
        <div className="sph-toolbar__start">{node(start)}</div>
      )}
      {children !== undefined && (
        <div className="sph-toolbar__content">{node(children)}</div>
      )}
      {end !== undefined && (
        <div className="sph-toolbar__end">{node(end)}</div>
      )}
    </div>
  );
}
