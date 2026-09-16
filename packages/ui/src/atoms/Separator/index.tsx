import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node } from "@/lib/node.js";

export type SeparatorProps = Omit<HTMLAttributes<HTMLHRElement>, "children"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <hr
      {...node(props)}
      className={cn("sph-separator", className)}
      data-orientation={orientation}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
}
