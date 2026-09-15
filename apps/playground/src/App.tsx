import { useState } from "preact/hooks";
import {
  Badge,
  Button,
  Checkbox,
  Field,
  FieldMessage,
  Input,
  Skeleton,
  Spinner,
  Textarea,
  Toggle,
} from "@sephiro/ui";
import { CatalogSection } from "./components/CatalogSection";
import { CatalogSidebar } from "./components/CatalogSidebar";
import { Specimen } from "./components/Specimen";
import { ThemePreview, type ThemeName } from "./components/ThemePreview";
import { Topbar } from "./components/Topbar";

export function App() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [notifications, setNotifications] = useState(true);
  const [remember, setRemember] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <main className="playground" data-sephiro-theme={theme} id="top">
      <Topbar />

      <div className="page-shell">
        <CatalogSidebar />

        <div className="content" id="catalog">
          <section className="page-heading" aria-labelledby="page-title">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="#top">Sephiro</a><span aria-hidden="true">/</span><span>Playground</span>
            </nav>
            <div className="page-heading__row">
              <div>
                <h1 id="page-title">Components you can put to work.</h1>
                <p className="page-heading__lede">
                  A focused reference for building clear desktop surfaces with React or Preact.
                  Every specimen below is wired for interaction, not just a screenshot.
                </p>
              </div>
              <ThemePreview theme={theme} onThemeChange={setTheme} />
            </div>
          </section>

          <div className="catalog-meta" aria-label="Catalog metadata">
            <span><strong>11</strong> components</span>
            <span className="catalog-meta__rule" aria-hidden="true" />
            <span>Interactive examples</span>
            <span className="catalog-meta__rule" aria-hidden="true" />
            <span>Four themes</span>
          </div>

          <CatalogSection
            id="foundations"
            index="01"
            title="Foundations"
            description="Small parts with a consistent size and state vocabulary."
            count="7 specimens"
          >
            <Specimen title="Button" description="Actions that read clearly at a glance." api="Button / 4 variants" wide>
              <div className="button-row">
                <Button variant="primary" onClick={() => setSaved(true)}>{saved ? "Saved" : "Save changes"}</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="quiet">Quiet action</Button>
                <Button variant="primary" loading>Syncing</Button>
              </div>
            </Specimen>

            <div className="specimen-grid">
              <Specimen title="Input" description="Short, focused values with room for context." api="Field + Input">
                <Field label="Workspace name" htmlFor="workspace-name" description="Visible to people in your team." required>
                  <Input id="workspace-name" defaultValue="Asterism" />
                </Field>
              </Specimen>
              <Specimen title="Textarea" description="Longer form input without extra ceremony." api="Textarea">
                <Textarea defaultValue="A calm place to make the next decision." aria-label="Description" />
              </Specimen>
            </div>

            <div className="specimen-grid">
              <Specimen title="Checkbox" description="Binary choices with a visible disabled state." api="Checkbox">
                <div className="demo-stack">
                  <Checkbox checked={remember} onChange={(event) => setRemember(event.currentTarget.checked)} label="Remember this workspace" />
                  <Checkbox defaultChecked disabled label="Disabled selection" />
                </div>
              </Specimen>
              <Specimen title="Badge" description="Compact status that stays secondary to the task." api="Badge / semantic">
                <div className="badge-row">
                  <Badge variant="neutral">Draft</Badge>
                  <Badge variant="accent">In review</Badge>
                  <Badge variant="success">Published</Badge>
                  <Badge variant="warning">Needs input</Badge>
                  <Badge variant="danger">Blocked</Badge>
                </div>
              </Specimen>
            </div>

            <Specimen title="Feedback" description="Loading content without losing the user's place." api="Spinner + Skeleton" wide className="specimen--feedback">
              <div className="feedback-demo">
                <div className="feedback-row"><Spinner label="Loading" /><span>Loading the latest workspace…</span></div>
                <div className="skeleton-stack"><Skeleton width="72%" /><Skeleton width="46%" /><Skeleton width="58%" /></div>
              </div>
            </Specimen>
          </CatalogSection>

          <CatalogSection
            id="composition"
            index="02"
            title="Composition"
            description="Small patterns that carry context without taking over the screen."
            count="2 specimens"
          >
            <div className="specimen-grid">
              <Specimen title="Field validation" description="Errors explain the problem; success confirms the recovery." api="Field + FieldMessage">
                <div className="demo-stack">
                  <Field label="Project URL" htmlFor="project-url" message="Use a valid HTTPS address." messageType="error">
                    <Input id="project-url" defaultValue="http://" invalid />
                  </Field>
                  <FieldMessage variant="success">Saved locally and ready to sync.</FieldMessage>
                </div>
              </Specimen>
              <Specimen title="Preference toggle" description="A setting can be useful without feeling like a system alert." api="Toggle">
                <div className="toggle-line">
                  <div><strong>Notifications</strong><span>Keep the desktop quiet unless it matters.</span></div>
                  <Toggle checked={notifications} onCheckedChange={setNotifications} label="Enable notifications" />
                </div>
              </Specimen>
            </div>
          </CatalogSection>

          <CatalogSection
            id="states"
            index="03"
            title="States worth shipping"
            description="The quiet details that make a component feel ready for product work."
            className="catalog-section--states"
          >
            <div className="state-note">
              <span className="state-note__dot" aria-hidden="true" />
              <div><strong>Designed to disappear into the product.</strong><span>Bring your own shell, spacing system, and application context.</span></div>
            </div>
          </CatalogSection>

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
