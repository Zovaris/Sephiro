import {
  Alert,
  Button,
  EmptyState,
  Field,
  Input,
  Skeleton,
  Spinner,
  Table,
  Toggle,
} from "@sephiro/ui";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";

export function StateCatalog() {
  return (
    <CatalogSection
      id="states"
      index="06"
      title="States worth shipping"
      description="The quiet details that make a component feel ready for product work."
      count="5 specimens"
      className="catalog-section--states"
    >
      <div className="state-grid">
        <div className="state-cell">
          <h4>Disabled</h4>
          <p>Every control reserves a legible disabled tone.</p>
          <div className="button-row">
            <Button variant="primary" disabled>
              Save changes
            </Button>
            <Button variant="secondary" disabled>
              Secondary
            </Button>
            <Toggle
              checked={false}
              onCheckedChange={() => {}}
              label="Disabled toggle"
              disabled
            />
          </div>
        </div>

        <div className="state-cell">
          <h4>Loading</h4>
          <p>Buttons block input while spinners keep their label.</p>
          <div className="button-row">
            <Button variant="primary" loading>
              Syncing
            </Button>
            <span className="feedback-row">
              <Spinner label="Loading" />
              <span className="demo-copy">Loading workspace…</span>
            </span>
          </div>
        </div>

        <div className="state-cell">
          <h4>Invalid</h4>
          <p>Invalid fields pair border, message and semantics.</p>
          <Field
            label="Project URL"
            htmlFor="states-url"
            message="Use a valid HTTPS address."
            messageType="error"
          >
            <Input id="states-url" defaultValue="http://" invalid />
          </Field>
        </div>

        <div className="state-cell">
          <h4>Skeleton</h4>
          <p>Hold layout before content arrives.</p>
          <div className="skeleton-stack">
            <Skeleton width="72%" />
            <Skeleton width="46%" />
            <Skeleton width="58%" />
          </div>
        </div>
      </div>

      <Specimen
        title="Empty"
        description="Tables and pages share the same honest empty copy."
        api="Table + EmptyState"
        wide
      >
        <div className="demo-stack">
          <Table
            caption="Archived workspaces"
            columns={[{ key: "name", label: "Workspace" }]}
            rows={[]}
            emptyMessage="No archived workspaces yet."
          />
          <EmptyState
            compact
            title="Nothing here yet"
            description="Create your first view to return to this filter later."
            action={<Button variant="secondary">Create view</Button>}
          />
        </div>
      </Specimen>

      <Specimen
        title="Alert live region"
        description="Danger asserts, everything else stays polite."
        api="Alert / role + aria-live"
        wide
      >
        <div className="alert-stack">
          <Alert variant="danger" title="Sync failed">
            We will retry in the background.
          </Alert>
          <Alert variant="info" title="Autosave is on">
            Changes are saved as you work.
          </Alert>
        </div>
      </Specimen>

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
