import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";

export type CardProps = Omit<
  HTMLAttributes<HTMLElement>,
  "children" | "title"
> & {
  title?: Renderable;
  description?: Renderable;
  header?: Renderable;
  footer?: Renderable;
  children?: Renderable;
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
      {...node(props)}
      className={cn("sph-card", className)}
      data-interactive={interactive || undefined}
      data-selected={selected || undefined}
    >
      {hasHeader && (
        <header className="sph-card__header">
          {node(header)}
          {title !== undefined && (
            <h3 className="sph-card__title">{node(title)}</h3>
          )}
          {description !== undefined && (
            <p className="sph-card__description">{node(description)}</p>
          )}
        </header>
      )}
      {children !== undefined && (
        <div className="sph-card__content">{node(children)}</div>
      )}
      {footer !== undefined && (
        <footer className="sph-card__footer">{node(footer)}</footer>
      )}
    </article>
  );
}
