import { useState } from "preact/hooks";
import {
  Badge,
  Button,
  Checkbox,
  Field,
  Input,
  Skeleton,
  Spinner,
  Textarea,
} from "@sephiro/ui";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";
export function FoundationCatalog() {
  const [remember, setRemember] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <CatalogSection
      id="foundations"
      index="01"
      title="Foundations"
      description="Small parts with a consistent size and state vocabulary."
      count="7 specimens"
    >
      <Specimen
        title="Button"
        description="Actions that read clearly at a glance."
        api="Button / 4 variants"
        wide
      >
        <div className="button-row">
          <Button variant="primary" onClick={() => setSaved(true)}>
            {saved ? "Saved" : "Save changes"}
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="quiet">Quiet action</Button>
          <Button variant="primary" loading>
            Syncing
          </Button>
        </div>
      </Specimen>
      <div className="specimen-grid">
        <Specimen
          title="Input"
          description="Short, focused values with room for context."
          api="Field + Input"
        >
          <Field
            label="Workspace name"
            htmlFor="workspace-name"
            description="Visible to people in your team."
            required
          >
            <Input id="workspace-name" defaultValue="Asterism" />
          </Field>
        </Specimen>
        <Specimen
          title="Textarea"
          description="Longer form input without extra ceremony."
          api="Textarea"
        >
          <Textarea
            defaultValue="A calm place to make the next decision."
            aria-label="Description"
          />
        </Specimen>
      </div>
      <div className="specimen-grid">
        <Specimen
          title="Checkbox"
          description="Binary choices with a visible disabled state."
          api="Checkbox"
        >
          <div className="demo-stack">
            <Checkbox
              checked={remember}
              onChange={(event) => setRemember(event.currentTarget.checked)}
              label="Remember this workspace"
            />
            <Checkbox defaultChecked disabled label="Disabled selection" />
          </div>
        </Specimen>
        <Specimen
          title="Badge"
          description="Compact status that stays secondary to the task."
          api="Badge / semantic"
        >
          <div className="badge-row">
            <Badge variant="neutral">Draft</Badge>
            <Badge variant="accent">In review</Badge>
            <Badge variant="success">Published</Badge>
            <Badge variant="warning">Needs input</Badge>
            <Badge variant="danger">Blocked</Badge>
          </div>
        </Specimen>
      </div>
      <Specimen
        title="Feedback"
        description="Loading content without losing the user's place."
        api="Spinner + Skeleton"
        wide
        className="specimen--feedback"
      >
        <div className="feedback-demo">
          <div className="feedback-row">
            <Spinner label="Loading" />
            <span>Loading the latest workspace…</span>
          </div>
          <div className="skeleton-stack">
            <Skeleton width="72%" />
            <Skeleton width="46%" />
            <Skeleton width="58%" />
          </div>
        </div>
      </Specimen>
    </CatalogSection>
  );
}
