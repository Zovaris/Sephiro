import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  Menu,
  Separator,
  Surface,
  Tabs,
  Toggle,
  Toolbar,
} from "@sthlabs/sephiro-ui";
import { useState } from "preact/hooks";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";

export function CompositionCatalog() {
  const [notifications, setNotifications] = useState(true);
  const [tab, setTab] = useState("overview");

  return (
    <CatalogSection
      id="composition"
      index="05"
      title="Composition"
      description="Small patterns that carry context without taking over the screen."
      count="3 specimens"
    >
      <div className="specimen-grid">
        <Specimen
          title="Field validation"
          description="Errors explain the problem; success confirms the recovery."
          api="Field + Input"
        >
          <Field
            label="Project URL"
            htmlFor="composition-url"
            message="Use a valid HTTPS address."
            messageType="error"
          >
            <Input id="composition-url" defaultValue="http://" invalid />
          </Field>
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

      <Specimen
        title="Workspace header"
        description="Tabs, actions and status composed into one toolbar."
        api="Toolbar + Tabs + Menu + Badge"
        wide
      >
        <Toolbar
          label="Workspace header"
          start={
            <Tabs
              value={tab}
              onValueChange={setTab}
              items={[
                { value: "overview", label: "Overview" },
                { value: "activity", label: "Activity" },
              ]}
            />
          }
          end={
            <div className="button-row">
              <Badge variant="accent">Draft</Badge>
              <Menu
                label="Workspace actions"
                trigger="Actions"
                items={[
                  { value: "rename", label: "Rename" },
                  { value: "archive", label: "Archive" },
                ]}
              />
              <Button variant="primary" size="sm">
                Share
              </Button>
            </div>
          }
        />
      </Specimen>

      <Specimen
        title="Sync card"
        description="Surface, card and separator carrying one clear action."
        api="Surface + Card + Separator + Button"
        wide
      >
        <Surface tone="elevated" padding="sm">
          <Card
            title="Sephiro"
            description="Draft workspace · updated yesterday"
            footer={
              <div className="button-row">
                <Button variant="primary" size="sm">
                  Publish
                </Button>
                <Button variant="quiet" size="sm">
                  Discard draft
                </Button>
              </div>
            }
          >
            <Separator />
            <p className="demo-copy">
              Publishing keeps local history and notifies reviewers.
            </p>
          </Card>
        </Surface>
      </Specimen>
    </CatalogSection>
  );
}
