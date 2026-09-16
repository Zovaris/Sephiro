import { useState } from "preact/hooks";
import {
  Button,
  Dialog,
  IconButton,
  Menu,
  Popover,
  Tabs,
  Toast,
  ToastViewport,
  Toolbar,
  Tooltip,
} from "@sephiro/ui";
import { CatalogSection } from "./CatalogSection";
import { Specimen } from "./Specimen";

export function OverlaysCatalog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<
    "neutral" | "success" | "warning" | "danger"
  >("success");
  const [tab, setTab] = useState("overview");

  return (
    <CatalogSection
      id="overlays"
      index="03"
      title="Overlays & navigation"
      description="Menus, popovers, dialogs and toasts anchored to the action that opened them."
      count="5 specimens · 7 components"
    >
      <Specimen
        title="Tabs & toolbar"
        description="Navigation and actions that stay close to the work."
        api="Tabs + Toolbar"
        wide
      >
        <Toolbar
          label="Workspace tools"
          start={
            <Tabs
              value={tab}
              onValueChange={setTab}
              items={[
                { value: "overview", label: "Overview" },
                { value: "activity", label: "Activity" },
                { value: "settings", label: "Settings", disabled: true },
              ]}
            />
          }
          end={
            <div className="button-row">
              <IconButton
                label="More actions"
                icon={<span className="icon-mark" aria-hidden="true" />}
              />
              <Menu
                label="Open actions"
                trigger="Actions"
                items={[
                  { value: "rename", label: "Rename" },
                  { value: "archive", label: "Archive" },
                ]}
              />
            </div>
          }
        />
      </Specimen>

      <div className="specimen-grid">
        <Specimen
          title="Menu & popover"
          description="Progressive disclosure without losing context."
          api="Menu + Popover"
        >
          <div className="button-row">
            <Menu
              trigger="View options"
              items={[
                { value: "grid", label: "Grid view" },
                { value: "list", label: "List view" },
                { separator: true },
                { value: "reset", label: "Reset", danger: true },
              ]}
            />
            <Popover trigger="What is this?" ariaLabel="About this preview">
              <p className="demo-copy">
                A lightweight panel anchored to the action that opened it.
              </p>
            </Popover>
          </div>
        </Specimen>

        <Specimen
          title="Tooltip"
          description="One-line guidance for icon-only controls."
          api="Tooltip"
        >
          <div className="button-row">
            <Tooltip content="Copy identifier">
              <IconButton
                label="Copy identifier"
                icon={<span className="icon-mark" aria-hidden="true" />}
              />
            </Tooltip>
            <Tooltip content="Sync is paused while offline">
              <IconButton
                label="Sync status"
                variant="outline"
                icon={<span className="icon-mark" aria-hidden="true" />}
              />
            </Tooltip>
          </div>
        </Specimen>
      </div>

      <Specimen
        title="Dialog"
        description="Protected focus for a decision with consequences."
        api="Dialog"
        wide
      >
        <div className="button-row">
          <Button variant="secondary" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
        </div>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Leave workspace?"
          description="Your local changes are already safe."
          footer={
            <Button onClick={() => setDialogOpen(false)}>Continue</Button>
          }
        >
          <p className="demo-copy">
            You can return here whenever you are ready.
          </p>
        </Dialog>
      </Specimen>

      <Specimen
        title="Toast"
        description="Transient confirmation in every semantic tone."
        api="Toast + ToastViewport"
        wide
      >
        <div className="button-row">
          <Button
            variant="quiet"
            onClick={() => {
              setToastVariant("success");
              setToastOpen(false);
              requestAnimationFrame(() => setToastOpen(true));
            }}
          >
            Saved
          </Button>
          <Button
            variant="quiet"
            onClick={() => {
              setToastVariant("warning");
              setToastOpen(false);
              requestAnimationFrame(() => setToastOpen(true));
            }}
          >
            Warning
          </Button>
          <Button
            variant="quiet"
            onClick={() => {
              setToastVariant("danger");
              setToastOpen(false);
              requestAnimationFrame(() => setToastOpen(true));
            }}
          >
            Error
          </Button>
        </div>
        {toastOpen && (
          <Toast
            open
            title={toastVariant === "success" ? "Saved" : toastVariant}
            description="Your workspace is ready to share."
            variant={toastVariant}
          />
        )}
        <ToastViewport />
      </Specimen>
    </CatalogSection>
  );
}
