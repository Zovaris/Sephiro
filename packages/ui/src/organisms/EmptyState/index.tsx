import { TrayIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";

export type EmptyStateProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  title: Renderable;
  description?: Renderable;
  icon?: Renderable;
  action?: Renderable;
  compact?: boolean;
};

const emptyStateDefaultIcon = <TrayIcon size={20} />;

export function EmptyState({
  title,
  description,
  icon = emptyStateDefaultIcon,
  action,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <section
      {...node(props)}
      className={cn("sph-empty-state", className)}
      data-compact={compact || undefined}
    >
      <div className="sph-empty-state__icon" aria-hidden="true">
        {node(icon)}
      </div>
      <h2 className="sph-empty-state__title">{node(title)}</h2>
      {description !== undefined && (
        <p className="sph-empty-state__description">{node(description)}</p>
      )}
      {action !== undefined && (
        <div className="sph-empty-state__action">{node(action)}</div>
      )}
    </section>
  );
}
