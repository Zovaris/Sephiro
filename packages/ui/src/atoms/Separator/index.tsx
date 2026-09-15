import type { HTMLAttributes } from "react";
import { cn } from "cn";

export type SeparatorProps = Omit<HTMLAttributes<HTMLHRElement>, "children"> & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

export function Separator({ orientation = "horizontal", decorative = true, className, ...props }: SeparatorProps) {
  return (
    <hr
      {...props}
      className={cn("sph-separator", className)}
      data-orientation={orientation}
      role={decorative ? "presentation" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
}
