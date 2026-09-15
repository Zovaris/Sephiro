import { cn } from "cn";
import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
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
          {header}
          {title !== undefined && <h3 className="sph-card__title">{title}</h3>}
          {description !== undefined && (
            <p className="sph-card__description">{description}</p>
          )}
        </header>
      )}
      {children !== undefined && (
        <div className="sph-card__content">{children}</div>
      )}
      {footer !== undefined && (
        <footer className="sph-card__footer">{footer}</footer>
      )}
    </article>
  );
}
