import {
  Badge,
  Button,
  Checkbox,
  IconButton,
  Input,
  Separator,
  Skeleton,
  Spinner,
  Surface,
  Textarea,
  Toggle,
} from "@sephiro/ui";
import { useState } from "preact/hooks";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";

export function AtomsCatalog() {
  const [saved, setSaved] = useState(false);
  const [remember, setRemember] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <CatalogSection
      id="atoms"
      index="01"
      title="Atoms"
      description="Single-purpose primitives. Every atom ships in sm / md / lg with disabled and loading states."
      count="10 specimens · 11 components"
    >
      <Specimen
        title="Button"
        description="Actions that read clearly at a glance."
        api="Button / primary · secondary · quiet"
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
          <Button variant="secondary" disabled>
            Disabled
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
        </div>
      </Specimen>

      <div className="specimen-grid">
        <Specimen
          title="IconButton"
          description="Icon-only actions with ghost, solid and outline tones."
          api="IconButton / ghost · solid · outline"
        >
          <div className="button-row">
            <IconButton
              label="More actions"
              icon={<span className="icon-mark" aria-hidden="true" />}
            />
            <IconButton
              label="Copy identifier"
              variant="solid"
              icon={<span className="icon-mark" aria-hidden="true" />}
            />
            <IconButton
              label="Open settings"
              variant="outline"
              icon={<span className="icon-mark" aria-hidden="true" />}
            />
            <IconButton
              label="Syncing"
              loading
              icon={<span className="icon-mark" aria-hidden="true" />}
            />
            <IconButton
              label="Unavailable"
              disabled
              icon={<span className="icon-mark" aria-hidden="true" />}
            />
          </div>
        </Specimen>

        <Specimen
          title="Badge"
          description="Compact status that stays secondary to the task."
          api="Badge / neutral · accent · success · warning · danger"
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

      <div className="specimen-grid">
        <Specimen
          title="Input"
          description="Short values with size, disabled and invalid states."
          api="Input / sm · md · lg"
        >
          <div className="demo-stack">
            <Input
              id="atom-input-default"
              defaultValue="Asterism"
              aria-label="Workspace name"
            />
            <Input
              id="atom-input-small"
              size="sm"
              defaultValue="Small"
              aria-label="Small input"
            />
            <Input
              id="atom-input-disabled"
              defaultValue="Disabled"
              disabled
              aria-label="Disabled input"
            />
            <Input
              id="atom-input-invalid"
              defaultValue="http://"
              invalid
              aria-label="Invalid input"
            />
          </div>
        </Specimen>

        <Specimen
          title="Textarea"
          description="Longer input without extra ceremony."
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
          title="Toggle"
          description="Binary setting with sm / md / lg sizes."
          api="Toggle / sm · md · lg"
        >
          <div className="demo-stack">
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
            <div className="button-row">
              <Toggle
                checked
                onCheckedChange={() => {}}
                label="Small on"
                size="sm"
              />
              <Toggle
                checked={false}
                onCheckedChange={() => {}}
                label="Large off"
                size="lg"
              />
              <Toggle
                checked={false}
                onCheckedChange={() => {}}
                label="Off"
                disabled
              />
            </div>
          </div>
        </Specimen>
      </div>

      <div className="specimen-grid">
        <Specimen
          title="Separator"
          description="Quiet division, horizontal or vertical."
          api="Separator / horizontal · vertical"
        >
          <div className="demo-stack">
            <span className="demo-copy">Above the line</span>
            <Separator />
            <span className="demo-copy">Below the line</span>
            <div className="separator-demo-v">
              <span className="demo-copy">Left</span>
              <Separator orientation="vertical" />
              <span className="demo-copy">Right</span>
            </div>
          </div>
        </Specimen>

        <Specimen
          title="Surface"
          description="Restrained elevation vocabulary."
          api="Surface / base · elevated · raised"
        >
          <div className="surface-row">
            <Surface tone="base" padding="sm">
              <span className="demo-copy">Base</span>
            </Surface>
            <Surface tone="elevated" padding="sm">
              <span className="demo-copy">Elevated</span>
            </Surface>
            <Surface tone="raised" padding="sm">
              <span className="demo-copy">Raised</span>
            </Surface>
          </div>
        </Specimen>
      </div>

      <Specimen
        title="Feedback"
        description="Loading content without losing the user's place."
        api="Spinner + Skeleton"
        wide
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
