import { render } from "preact";
import { useState } from "preact/hooks";
import {
  Badge,
  Button,
  Checkbox,
  Field,
  FieldMessage,
  Input,
  Select,
  Skeleton,
  Spinner,
  Textarea,
  Toggle,
} from "@sephiro/ui";
import "@sephiro/ui/styles.css";
import "./style.css";

type ThemeName = "default" | "asterism" | "soffy";

const themes: { value: ThemeName; label: string; description: string }[] = [
  { value: "default", label: "Default / Night", description: "Quiet contrast for desktop work" },
  { value: "asterism", label: "Asterism", description: "Indigo space for focused surfaces" },
  { value: "soffy", label: "Soffy", description: "Warm clarity for friendly tools" },
];

function App() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [notifications, setNotifications] = useState(true);
  const [remember, setRemember] = useState(false);
  const [saved, setSaved] = useState(false);

  const activeTheme = themes.find((item) => item.value === theme) ?? themes[0];

  return (
    <main className="playground" data-sephiro-theme={theme} id="top">
      <header className="topbar">
        <div className="topbar__inner">
          <a className="wordmark" href="#top" aria-label="Sephiro home">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>Sephiro</span>
          </a>
          <div className="topbar__context">
            <span>UI library</span>
            <Badge variant="neutral">v0.2</Badge>
          </div>
          <a className="topbar__link" href="#catalog">Browse catalog <span aria-hidden="true">↘</span></a>
        </div>
      </header>

      <div className="page-shell">
        <aside className="sidebar" aria-label="Catalog navigation">
          <div className="sidebar__intro">
            <span className="sidebar__title">Component catalog</span>
            <p>Reference specimens for product work.</p>
          </div>

          <nav className="catalog-nav" aria-label="Sections">
            <a href="#foundations"><span>01</span> Foundations</a>
            <a href="#composition"><span>02</span> Composition</a>
            <a href="#states"><span>03</span> States</a>
          </nav>

          <div className="sidebar__footer">
            <div className="live-status"><span aria-hidden="true" /> Live preview</div>
            <p>Change a theme to inspect the same component in a different environment.</p>
          </div>
        </aside>

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
              <div className="theme-switcher">
                <label htmlFor="theme-preview">Preview theme</label>
                <Select
                  ariaLabel="Preview theme"
                  value={theme}
                  options={themes.map(({ value, label }) => ({ value, label }))}
                  onValueChange={(value) => setTheme(value as ThemeName)}
                  size="lg"
                />
                <div className="theme-switcher__detail">
                  <span className={`theme-swatch theme-swatch--${theme}`} aria-hidden="true" />
                  <span>{activeTheme.description}</span>
                </div>
              </div>
            </div>
          </section>

          <div className="catalog-meta" aria-label="Catalog metadata">
            <span><strong>11</strong> components</span>
            <span className="catalog-meta__rule" aria-hidden="true" />
            <span>Interactive examples</span>
            <span className="catalog-meta__rule" aria-hidden="true" />
            <span>Three themes</span>
          </div>

          <section className="catalog-section" id="foundations" aria-labelledby="foundations-title">
            <header className="section-heading">
              <div>
                <span className="section-index">01</span>
                <h2 id="foundations-title">Foundations</h2>
                <p>Small parts with a consistent size and state vocabulary.</p>
              </div>
              <span className="section-count">7 specimens</span>
            </header>

            <div className="specimen specimen--wide">
              <div className="specimen__info">
                <h3>Button</h3>
                <p>Actions that read clearly at a glance.</p>
                <span className="specimen__api">Button / 4 variants</span>
              </div>
              <div className="specimen__demo button-row">
                <Button variant="primary" onClick={() => setSaved(true)}>{saved ? "Saved" : "Save changes"}</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="quiet">Quiet action</Button>
                <Button variant="primary" loading>Syncing</Button>
              </div>
            </div>

            <div className="specimen-grid">
              <div className="specimen">
                <div className="specimen__info">
                  <h3>Input</h3>
                  <p>Short, focused values with room for context.</p>
                  <span className="specimen__api">Field + Input</span>
                </div>
                <div className="specimen__demo">
                  <Field label="Workspace name" htmlFor="workspace-name" description="Visible to people in your team." required>
                    <Input id="workspace-name" defaultValue="Asterism" />
                  </Field>
                </div>
              </div>
              <div className="specimen">
                <div className="specimen__info">
                  <h3>Textarea</h3>
                  <p>Longer form input without extra ceremony.</p>
                  <span className="specimen__api">Textarea</span>
                </div>
                <div className="specimen__demo">
                  <Textarea defaultValue="A calm place to make the next decision." aria-label="Description" />
                </div>
              </div>
            </div>

            <div className="specimen-grid">
              <div className="specimen">
                <div className="specimen__info">
                  <h3>Checkbox</h3>
                  <p>Binary choices with a visible disabled state.</p>
                  <span className="specimen__api">Checkbox</span>
                </div>
                <div className="specimen__demo demo-stack">
                  <Checkbox checked={remember} onChange={(event) => setRemember(event.currentTarget.checked)} label="Remember this workspace" />
                  <Checkbox defaultChecked disabled label="Disabled selection" />
                </div>
              </div>
              <div className="specimen">
                <div className="specimen__info">
                  <h3>Badge</h3>
                  <p>Compact status that stays secondary to the task.</p>
                  <span className="specimen__api">Badge / semantic</span>
                </div>
                <div className="specimen__demo badge-row">
                  <Badge variant="neutral">Draft</Badge>
                  <Badge variant="accent">In review</Badge>
                  <Badge variant="success">Published</Badge>
                  <Badge variant="warning">Needs input</Badge>
                  <Badge variant="danger">Blocked</Badge>
                </div>
              </div>
            </div>

            <div className="specimen specimen--wide specimen--feedback">
              <div className="specimen__info">
                <h3>Feedback</h3>
                <p>Loading content without losing the user's place.</p>
                <span className="specimen__api">Spinner + Skeleton</span>
              </div>
              <div className="specimen__demo feedback-demo">
                <div className="feedback-row"><Spinner label="Loading" /><span>Loading the latest workspace…</span></div>
                <div className="skeleton-stack"><Skeleton width="72%" /><Skeleton width="46%" /><Skeleton width="58%" /></div>
              </div>
            </div>
          </section>

          <section className="catalog-section" id="composition" aria-labelledby="composition-title">
            <header className="section-heading">
              <div>
                <span className="section-index">02</span>
                <h2 id="composition-title">Composition</h2>
                <p>Small patterns that carry context without taking over the screen.</p>
              </div>
              <span className="section-count">2 specimens</span>
            </header>

            <div className="specimen-grid">
              <div className="specimen">
                <div className="specimen__info">
                  <h3>Field validation</h3>
                  <p>Errors explain the problem; success confirms the recovery.</p>
                  <span className="specimen__api">Field + FieldMessage</span>
                </div>
                <div className="specimen__demo demo-stack">
                  <Field label="Project URL" htmlFor="project-url" message="Use a valid HTTPS address." messageType="error">
                    <Input id="project-url" defaultValue="http://" invalid />
                  </Field>
                  <FieldMessage variant="success">Saved locally and ready to sync.</FieldMessage>
                </div>
              </div>
              <div className="specimen">
                <div className="specimen__info">
                  <h3>Preference toggle</h3>
                  <p>A setting can be useful without feeling like a system alert.</p>
                  <span className="specimen__api">Toggle</span>
                </div>
                <div className="specimen__demo toggle-line">
                  <div><strong>Notifications</strong><span>Keep the desktop quiet unless it matters.</span></div>
                  <Toggle checked={notifications} onCheckedChange={setNotifications} label="Enable notifications" />
                </div>
              </div>
            </div>
          </section>

          <section className="catalog-section catalog-section--states" id="states" aria-labelledby="states-title">
            <header className="section-heading">
              <div>
                <span className="section-index">03</span>
                <h2 id="states-title">States worth shipping</h2>
                <p>The quiet details that make a component feel ready for product work.</p>
              </div>
            </header>
            <div className="state-note">
              <span className="state-note__dot" aria-hidden="true" />
              <div><strong>Designed to disappear into the product.</strong><span>Bring your own shell, spacing system, and application context.</span></div>
            </div>
          </section>

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

render(<App />, document.getElementById("app")!);
