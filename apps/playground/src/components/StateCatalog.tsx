import { CatalogSection } from "./CatalogSection";
export function StateCatalog() {
  return (
      <CatalogSection
        id="states"
        index="04"
        title="States worth shipping"
        description="The quiet details that make a component feel ready for product work."
        className="catalog-section--states"
      >
        <div className="state-note">
          <span className="state-note__dot" aria-hidden="true" />
          <div>
            <strong>Designed to disappear into the product.</strong>
            <span>
              Bring your own shell, spacing system, and application context.
            </span>
          </div>
        </div>
      </CatalogSection>
  );
}
