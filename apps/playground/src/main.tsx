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

  return (
    <main className="playground" data-sephiro-theme={theme}>
      <header className="playground__header">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-name">Sephiro</span>
          <Badge variant="neutral">UI / 0.2</Badge>
        </div>
        <a className="header-link" href="#catalog">Catalog index <span className="header-link__arrow" aria-hidden="true" /></a>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <div className="intro__copy">
          <p className="intro__eyebrow">A small system with a long memory</p>
          <h1 id="page-title">Interface primitives for the space between focus and flow.</h1>
          <p className="intro__lede">
            A restrained component layer for desktop apps. React-compatible, Preact-friendly,
            and intentionally light on global assumptions.
          </p>
        </div>
        <div className="theme-panel">
          <span className="theme-panel__label">Preview theme</span>
          <Select
            ariaLabel="Preview theme"
            value={theme}
            options={themes.map(({ value, label }) => ({ value, label }))}
            onValueChange={(value) => setTheme(value as ThemeName)}
            size="lg"
          />
          <p>{themes.find((item) => item.value === theme)?.description}</p>
        </div>
      </section>

      <div className="catalog" id="catalog">
        <section className="catalog-section" aria-labelledby="atoms-title">
          <div className="section-heading">
            <div>
              <span className="section-kicker">01 / foundations</span>
              <h2 id="atoms-title">Atoms</h2>
            </div>
            <p>Focused states, semantic color, and a single size contract.</p>
          </div>

          <div className="shelf shelf--buttons">
            <div className="demo demo--wide">
              <span className="demo__label">Button / actions</span>
              <div className="button-row">
                <Button variant="primary" onClick={() => setSaved(true)}>{saved ? "Saved" : "Save changes"}</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="quiet">Quiet action</Button>
                <Button variant="primary" loading>Syncing</Button>
              </div>
            </div>
          </div>

          <div className="shelf">
            <div className="demo">
              <span className="demo__label">Input / field edge</span>
              <Field label="Workspace name" htmlFor="workspace-name" description="Visible to people in your team." required>
                <Input id="workspace-name" defaultValue="Asterism" />
              </Field>
            </div>
            <div className="demo">
              <span className="demo__label">Textarea / long form</span>
              <Textarea defaultValue="A calm place to make the next decision." aria-label="Description" />
            </div>
          </div>

          <div className="shelf">
            <div className="demo">
              <span className="demo__label">Checkbox / selection</span>
              <Checkbox checked={remember} onChange={(event) => setRemember(event.currentTarget.checked)} label="Remember this workspace" />
              <Checkbox defaultChecked disabled label="Disabled selection" />
            </div>
            <div className="demo">
              <span className="demo__label">Badge / status</span>
              <div className="badge-row">
                <Badge variant="neutral">Draft</Badge>
                <Badge variant="accent">In review</Badge>
                <Badge variant="success">Published</Badge>
                <Badge variant="warning">Needs input</Badge>
                <Badge variant="danger">Blocked</Badge>
              </div>
            </div>
          </div>

          <div className="shelf">
            <div className="demo demo--inline">
              <span className="demo__label">Progressive feedback</span>
              <div className="feedback-row"><Spinner label="Loading" /><span>Loading the latest workspace…</span></div>
              <div className="skeleton-stack"><Skeleton width="72%" /><Skeleton width="46%" /><Skeleton width="58%" /></div>
            </div>
          </div>
        </section>

        <section className="catalog-section" aria-labelledby="molecules-title">
          <div className="section-heading">
            <div>
              <span className="section-kicker">02 / composition</span>
              <h2 id="molecules-title">Molecules</h2>
            </div>
            <p>Small compositions that carry context without taking over the screen.</p>
          </div>

          <div className="shelf">
            <div className="demo">
              <span className="demo__label">Field / validation</span>
              <Field label="Project URL" htmlFor="project-url" message="Use a valid HTTPS address." messageType="error">
                <Input id="project-url" defaultValue="http://" invalid />
              </Field>
              <FieldMessage variant="success">Saved locally and ready to sync.</FieldMessage>
            </div>
            <div className="demo demo--toggle">
              <span className="demo__label">Toggle / preference</span>
              <div className="toggle-line">
                <div><strong>Notifications</strong><span>Keep the desktop quiet unless it matters.</span></div>
                <Toggle checked={notifications} onCheckedChange={setNotifications} label="Enable notifications" />
              </div>
            </div>
          </div>

          <div className="note-strip">
            <span className="note-strip__dot" aria-hidden="true" />
            <div><strong>Designed to disappear into the product.</strong><span>Bring your own shell, spacing system, and application context.</span></div>
          </div>
        </section>
      </div>

      <footer className="playground__footer">
        <span>React + Preact compatible</span>
        <span>Tailwind v4 / no Preflight</span>
        <span>Motion respects your settings</span>
      </footer>
    </main>
  );
}

render(<App />, document.getElementById("app")!);
