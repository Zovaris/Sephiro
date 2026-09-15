import { useState } from "preact/hooks";
import { Field, FieldMessage, Input, Toggle } from "@sephiro/ui";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";
export function CompositionCatalog() {
  const [notifications, setNotifications] = useState(true);
  return (
    <CatalogSection
      id="composition"
      index="03"
      title="Composition"
      description="Small patterns that carry context without taking over the screen."
      count="2 specimens"
    >
      <div className="specimen-grid">
        <Specimen
          title="Field validation"
          description="Errors explain the problem; success confirms the recovery."
          api="Field + FieldMessage"
        >
          <div className="demo-stack">
            <Field
              label="Project URL"
              htmlFor="project-url"
              message="Use a valid HTTPS address."
              messageType="error"
            >
              <Input id="project-url" defaultValue="http://" invalid />
            </Field>
            <FieldMessage variant="success">
              Saved locally and ready to sync.
            </FieldMessage>
          </div>
        </Specimen>
        <Specimen
          title="Preference toggle"
          description="A setting can be useful without feeling like a system alert."
          api="Toggle"
        >
          <div className="toggle-line">
            <div>
              <strong>Notifications</strong>
              <span>Keep the desktop quiet unless it matters.</span>
            </div>
            <Toggle
              checked={notifications}
              onCheckedChange={setNotifications}
              label="Enable notifications"
            />
          </div>
        </Specimen>
      </div>
    </CatalogSection>
  );
}
