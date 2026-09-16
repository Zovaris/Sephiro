import { useState } from "preact/hooks";
import { AtomsCatalog } from "./components/AtomsCatalog";
import { CatalogSidebar } from "./components/CatalogSidebar";
import { CompositionCatalog } from "./components/CompositionCatalog";
import { FeedbackCatalog } from "./components/FeedbackCatalog";
import { FormsCatalog } from "./components/FormsCatalog";
import { OverlaysCatalog } from "./components/OverlaysCatalog";
import { StateCatalog } from "./components/StateCatalog";
import { ThemePreview, type ThemeName } from "./components/ThemePreview";
import { Topbar } from "./components/Topbar";

export function App() {
  const [theme, setTheme] = useState<ThemeName>("default");
  return (
    <main className="playground" data-sephiro-theme={theme} id="top">
      <Topbar />
      <div className="page-shell">
        <CatalogSidebar />
        <div className="content" id="catalog">
          <section className="page-heading" aria-labelledby="page-title">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="#top">Sephiro</a>
              <span aria-hidden="true">/</span>
              <span>Playground</span>
            </nav>
            <div className="page-heading__row">
              <div>
                <h1 id="page-title">Components you can put to work.</h1>
                <p className="page-heading__lede">
                  A focused reference for building clear desktop surfaces with
                  React or Preact. Every specimen below is wired for
                  interaction, not just a screenshot.
                </p>
              </div>
              <ThemePreview theme={theme} onThemeChange={setTheme} />
            </div>
          </section>
          <div className="catalog-meta" aria-label="Catalog metadata">
            <span>
              <strong>27</strong> components
            </span>
            <span className="catalog-meta__rule" aria-hidden="true" />
            <span>Interactive examples</span>
            <span className="catalog-meta__rule" aria-hidden="true" />
            <span>Four themes</span>
          </div>
          <AtomsCatalog />
          <FormsCatalog />
          <OverlaysCatalog />
          <FeedbackCatalog />
          <CompositionCatalog />
          <StateCatalog />
          <footer className="page-footer">
            <span>React + Preact compatible</span>
            <span>Tailwind v4 / no Preflight</span>
            <span>Motion respects your settings</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
