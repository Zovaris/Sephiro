import { cn } from "cn";
import type { HTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
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
          {icon}
        </div>
      )}
      <h2 className="sph-empty-state__title">{title}</h2>
      {description !== undefined && (
        <p className="sph-empty-state__description">{description}</p>
      )}
      {action !== undefined && (
        <div className="sph-empty-state__action">{action}</div>
      )}
    </section>
  );
}
