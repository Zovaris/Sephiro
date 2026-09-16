import { cn } from "cn";
import type { HTMLAttributes } from "react";

export type CardProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  title?: unknown;
  description?: unknown;
  header?: unknown;
  footer?: unknown;
  children?: unknown;
  interactive?: boolean;
  selected?: boolean;
};

export function Card({
  title,
  description,
  header,
  footer,
  children,
  interactive = false,
  selected = false,
  className,
  ...props
}: CardProps) {
  const hasHeader =
    header !== undefined || title !== undefined || description !== undefined;

  return (
    <article
      {...props}
      className={cn("sph-card", className)}
      data-interactive={interactive || undefined}
      data-selected={selected || undefined}
    >
      {hasHeader && (
        <header className="sph-card__header">
          {header as any}
          {title !== undefined && (
            <h3 className="sph-card__title">{title as any}</h3>
          )}
          {description !== undefined && (
            <p className="sph-card__description">{description as any}</p>
          )}
        </header>
      )}
      {children !== undefined && (
        <div className="sph-card__content">{children as any}</div>
      )}
      {footer !== undefined && (
        <footer className="sph-card__footer">{footer as any}</footer>
      )}
    </article>
  );
}
