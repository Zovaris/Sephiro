import type { ComponentChildren } from "preact";

type CatalogSectionProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  count?: string;
  className?: string;
  children: ComponentChildren;
};

export function CatalogSection({
  id,
  index,
  title,
  description,
  count,
  className,
  children,
}: CatalogSectionProps) {
  return (
    <section
      className={`catalog-section${className ? ` ${className}` : ""}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <header className="section-heading">
        <div>
          <span className="section-index">{index}</span>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
        {count && <span className="section-count">{count}</span>}
      </header>
      {children}
    </section>
  );
}
