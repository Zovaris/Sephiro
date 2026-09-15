const sections = [
  { href: "#foundations", number: "01", label: "Foundations" },
  { href: "#composition", number: "02", label: "Composition" },
  { href: "#states", number: "03", label: "States" },
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
        <div className="live-status"><span aria-hidden="true" /> Live preview</div>
        <p>Change a theme to inspect the same component in a different environment.</p>
      </div>
    </aside>
  );
}
