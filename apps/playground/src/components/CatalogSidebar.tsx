const sections = [
  { href: "#atoms", number: "01", label: "Atoms" },
  { href: "#forms", number: "02", label: "Forms" },
  { href: "#overlays", number: "03", label: "Overlays" },
  { href: "#feedback", number: "04", label: "Feedback & data" },
  { href: "#composition", number: "05", label: "Composition" },
  { href: "#states", number: "06", label: "States" },
];

export function CatalogSidebar() {
  return (
    <aside className="sidebar" aria-label="Catalog navigation">
      <div className="sidebar__intro">
        <span className="sidebar__title">Component catalog</span>
        <p>Reference specimens for product work.</p>
      </div>

      <nav className="catalog-nav" aria-label="Sections">
        {sections.map((section) => (
          <a href={section.href} key={section.href}>
            <span>{section.number}</span> {section.label}
          </a>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="live-status">
          <span aria-hidden="true" /> Live preview
        </div>
        <p>
          Change a theme to inspect the same component in a different
          environment.
        </p>
      </div>
    </aside>
  );
}
