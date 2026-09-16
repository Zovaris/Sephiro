import { cn } from "cn";
import type { HTMLAttributes } from "react";

export type EmptyStateProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  title: unknown;
  description?: unknown;
  icon?: unknown;
  action?: unknown;
  compact?: boolean;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  compact = false,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <section
      {...props}
      className={cn("sph-empty-state", className)}
      data-compact={compact || undefined}
    >
      {icon !== undefined && (
        <div className="sph-empty-state__icon" aria-hidden="true">
          {icon as any}
        </div>
      )}
      <h2 className="sph-empty-state__title">{title as any}</h2>
      {description !== undefined && (
        <p className="sph-empty-state__description">{description as any}</p>
      )}
      {action !== undefined && (
        <div className="sph-empty-state__action">{action as any}</div>
      )}
    </section>
  );
}
