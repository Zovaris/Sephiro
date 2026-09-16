import {
  Field,
  FieldMessage,
  Input,
  RadioGroup,
  Select,
  Textarea,
} from "@sephiro/ui";
import { useState } from "preact/hooks";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";

export function FormsCatalog() {
  const [density, setDensity] = useState("comfortable");
  const [plan, setPlan] = useState("team");

  return (
    <CatalogSection
      id="forms"
      index="02"
      title="Forms"
      description="Labelled controls with help text, validation and keyboard support."
      count="5 specimens · 6 components"
    >
      <div className="specimen-grid">
        <Specimen
          title="Field + Input"
          description="Label, help text and required marker in one row."
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
          title="Field + Textarea"
          description="Longer answers with the same label vocabulary."
          api="Field + Textarea"
        >
          <Field
            label="Project brief"
            htmlFor="project-brief"
            description="Two sentences are enough."
          >
            <Textarea
              id="project-brief"
              defaultValue="A calm place to make the next decision."
            />
          </Field>
        </Specimen>
      </div>

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
            <FieldMessage variant="hint">
              We check the address before every deploy.
            </FieldMessage>
          </div>
        </Specimen>

        <Specimen
          title="Select"
          description="Compact choice with keyboard navigation and disabled state."
          api="Select / sm · md · lg"
        >
          <div className="demo-stack">
            <Select
              value={density}
              onValueChange={setDensity}
              ariaLabel="Table density"
              options={[
                { value: "comfortable", label: "Comfortable" },
                { value: "compact", label: "Compact" },
                { value: "quiet", label: "Quiet", disabled: true },
              ]}
            />
            <Select
              value={density}
              onValueChange={setDensity}
              ariaLabel="Density small"
              size="sm"
              options={[
                { value: "comfortable", label: "Comfortable" },
                { value: "compact", label: "Compact" },
              ]}
            />
            <Select
              value=""
              onValueChange={() => {}}
              ariaLabel="Disabled select"
              disabled
              options={[{ value: "x", label: "Unavailable" }]}
            />
          </div>
        </Specimen>
      </div>

      <Specimen
        title="Radio group"
        description="Related choices with supporting text."
        api="RadioGroup"
        wide
      >
        <RadioGroup
          name="plan"
          label="Workspace plan"
          value={plan}
          onValueChange={setPlan}
          options={[
            { value: "team", label: "Team", description: "Shared workspace" },
            { value: "solo", label: "Solo", description: "Just for you" },
          ]}
        />
      </Specimen>
    </CatalogSection>
  );
}
