import { useEffect, useState } from "preact/hooks";

const sections = [
  { href: "#atoms", number: "01", label: "Atoms" },
  { href: "#forms", number: "02", label: "Forms" },
  { href: "#overlays", number: "03", label: "Overlays" },
  { href: "#feedback", number: "04", label: "Feedback & data" },
  { href: "#composition", number: "05", label: "Composition" },
  { href: "#states", number: "06", label: "States" },
  { href: "#theme-studio", number: "07", label: "Theme studio" },
];

export function CatalogSidebar() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    for (const { href } of sections) {
      const element = document.getElementById(href.slice(1));
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="sidebar" aria-label="Catalog navigation">
      <div className="sidebar__intro">
        <span className="sidebar__title">Component catalog</span>
        <p>Reference specimens for product work.</p>
      </div>

      <nav className="catalog-nav" aria-label="Sections">
        {sections.map((section) => (
          <a
            href={section.href}
            key={section.href}
            className={
              active === section.href.slice(1) ? "is-active" : undefined
            }
            aria-current={active === section.href.slice(1) ? "true" : undefined}
          >
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
