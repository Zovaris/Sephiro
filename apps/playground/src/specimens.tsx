import {
  ArrowsClockwiseIcon,
  CopyIcon,
  DotsThreeIcon,
  GearIcon,
  ProhibitIcon,
  SlidersIcon,
} from "@phosphor-icons/react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  EmptyState,
  Field,
  FieldMessage,
  IconButton,
  Input,
  Menu,
  Notice,
  Popover,
  RadioGroup,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Surface,
  Table,
  Tabs,
  Textarea,
  Toast,
  ToastViewport,
  Toggle,
  Toolbar,
  Tooltip,
  toast,
} from "@sthlabs/sephiro-ui";
import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

export type Specimen = {
  id: string;
  name: string;
  api: string;
  note: string;
  selector?: string;
  demo: () => ComponentChildren;
};

export type Group = {
  name: string;
  note: string;
  specimens: Specimen[];
};

function ButtonDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="row">
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
    </div>
  );
}

function IconButtonDemo() {
  return (
    <div className="row">
      <IconButton label="More actions" icon={<DotsThreeIcon size={16} />} />
      <IconButton
        label="Copy identifier"
        variant="solid"
        icon={<CopyIcon size={16} />}
      />
      <IconButton
        label="Open settings"
        variant="outline"
        icon={<GearIcon size={16} />}
      />
      <IconButton
        label="Syncing"
        loading
        icon={<ArrowsClockwiseIcon size={16} />}
      />
      <IconButton
        label="Unavailable"
        disabled
        icon={<ProhibitIcon size={16} />}
      />
    </div>
  );
}

function ToggleDemo() {
  const [notifications, setNotifications] = useState(true);
  const [density, setDensity] = useState(false);

  return (
    <div className="stack">
      <Toggle
        checked={notifications}
        onCheckedChange={setNotifications}
        label="Enable notifications"
      />
      <div className="row">
        <Toggle
          checked={density}
          onCheckedChange={setDensity}
          label="Compact density"
          size="sm"
        />
        <Toggle
          checked
          onCheckedChange={() => {}}
          label="Sync on save"
          size="lg"
        />
        <Toggle
          checked={false}
          onCheckedChange={() => {}}
          label="Off and unavailable"
          disabled
        />
      </div>
    </div>
  );
}

function CheckboxDemo() {
  const [remember, setRemember] = useState(true);

  return (
    <div className="stack stack--tight">
      <Checkbox
        checked={remember}
        onChange={(event) => setRemember(event.currentTarget.checked)}
        label="Remember this workspace"
      />
      <Checkbox defaultChecked disabled label="Disabled selection" />
    </div>
  );
}

function SliderDemo() {
  const [radius, setRadius] = useState(6);
  const [zoom, setZoom] = useState(72);

  return (
    <div className="grid-2">
      <Slider
        label="Corner radius"
        min={0}
        max={16}
        value={radius}
        valueLabel={`${radius}px`}
        onValueChange={setRadius}
      />
      <Slider
        label="Zoom"
        size="sm"
        value={zoom}
        valueLabel={`${zoom}%`}
        onValueChange={setZoom}
      />
      <Slider
        label="Spacing"
        size="lg"
        min={0}
        max={48}
        step={4}
        value={24}
        valueLabel="24px"
        onValueChange={() => {}}
      />
      <Slider
        label="Threshold"
        value={86}
        valueLabel="86%"
        invalid
        onValueChange={() => {}}
      />
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="row">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="accent">In review</Badge>
      <Badge variant="success">Published</Badge>
      <Badge variant="warning">Needs input</Badge>
      <Badge variant="danger">Blocked</Badge>
    </div>
  );
}

function SeparatorDemo() {
  return (
    <div className="stack">
      <span className="note">Above the line</span>
      <Separator />
      <span className="note">Below the line</span>
      <div className="row" style={{ height: "64px" }}>
        <span className="note">Left</span>
        <Separator orientation="vertical" />
        <span className="note">Right</span>
      </div>
    </div>
  );
}

function SurfaceDemo() {
  return (
    <div className="grid-3">
      <Surface tone="base" padding="sm">
        <span className="note">Base</span>
      </Surface>
      <Surface tone="elevated" padding="sm">
        <span className="note">Elevated</span>
      </Surface>
      <Surface tone="raised" padding="sm">
        <span className="note">Raised</span>
      </Surface>
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="row">
      <Spinner size="sm" label="Loading" />
      <Spinner label="Loading" />
      <Spinner size="lg" label="Loading" />
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className="stack" style={{ width: "min(320px, 100%)" }}>
      <Skeleton width="72%" />
      <Skeleton width="46%" />
      <Skeleton width="58%" />
    </div>
  );
}

function InputDemo() {
  return (
    <div className="stack">
      <Input
        id="sheet-input-md"
        defaultValue="Asterism"
        aria-label="Workspace name"
      />
      <Input
        id="sheet-input-sm"
        size="sm"
        defaultValue="Small"
        aria-label="Small input"
      />
      <Input
        id="sheet-input-disabled"
        defaultValue="Disabled"
        disabled
        aria-label="Disabled input"
      />
      <Input
        id="sheet-input-invalid"
        defaultValue="http://"
        invalid
        aria-label="Invalid input"
      />
    </div>
  );
}

function TextareaDemo() {
  return (
    <Textarea
      defaultValue="A calm place to make the next decision."
      aria-label="Project brief"
    />
  );
}

function SelectDemo() {
  const [density, setDensity] = useState("comfortable");

  return (
    <div className="stack">
      <Select
        aria-label="Table density"
        value={density}
        onValueChange={setDensity}
        options={[
          { value: "comfortable", label: "Comfortable" },
          { value: "compact", label: "Compact" },
          { value: "spacious", label: "Spacious" },
        ]}
      />
      <Select
        aria-label="Density small"
        size="sm"
        value={density}
        onValueChange={setDensity}
        options={[
          { value: "comfortable", label: "Comfortable" },
          { value: "compact", label: "Compact" },
        ]}
      />
      <Select
        aria-label="Disabled select"
        size="lg"
        placeholder="Select an option"
        value=""
        onValueChange={() => {}}
        disabled
        options={[{ value: "one", label: "One" }]}
      />
    </div>
  );
}

function FieldDemo() {
  const [value, setValue] = useState("http://");

  return (
    <div style={{ maxWidth: "360px" }}>
      <Field
        label="Project URL"
        htmlFor="sheet-field-url"
        description="We check the address before every deploy."
        required
      >
        <Input
          id="sheet-field-url"
          value={value}
          invalid
          onInput={(event) => setValue(event.currentTarget.value)}
        />
      </Field>
      <FieldMessage variant="error">Use a valid HTTPS address.</FieldMessage>
    </div>
  );
}

function FieldMessageDemo() {
  return (
    <div className="stack stack--tight">
      <FieldMessage variant="error">Use a valid HTTPS address.</FieldMessage>
      <FieldMessage variant="success">
        Saved locally and ready to sync.
      </FieldMessage>
      <FieldMessage>Ships with the field it describes.</FieldMessage>
    </div>
  );
}

function RadioGroupDemo() {
  const [plan, setPlan] = useState("team");

  return (
    <RadioGroup
      name="workspace-plan"
      label="Workspace plan"
      description="Change it later without losing history."
      value={plan}
      onValueChange={setPlan}
      options={[
        {
          value: "team",
          label: "Team",
          description: "Shared workspace",
        },
        { value: "solo", label: "Solo", description: "Just for you" },
      ]}
    />
  );
}

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Leave workspace?"
        description="Your local changes are already safe."
        footer={<Button variant="secondary">Continue</Button>}
      >
        You can return here whenever you are ready.
      </Dialog>
    </>
  );
}

function MenuDemo() {
  return (
    <Menu
      trigger={<Button variant="secondary">View options</Button>}
      label="View options"
      onSelect={() => {}}
      items={[
        { value: "rename", label: "Rename", shortcut: "R" },
        { value: "duplicate", label: "Duplicate" },
        { separator: true },
        { value: "archive", label: "Archive", danger: true },
        { value: "locked", label: "Locked", disabled: true },
      ]}
    />
  );
}

function PopoverDemo() {
  return (
    <Popover trigger={<Button variant="secondary">What is this?</Button>}>
      A lightweight panel anchored to the action that opened it.
    </Popover>
  );
}

function TooltipDemo() {
  return (
    <Tooltip content="Copy identifier">
      <IconButton label="Copy identifier" icon={<CopyIcon size={16} />} />
    </Tooltip>
  );
}

function ToastDemo() {
  return (
    <>
      <div className="row">
        <Button
          variant="secondary"
          onClick={() =>
            toast.success("Saved", { description: "The workspace is in sync." })
          }
        >
          Saved
        </Button>
        <Button
          variant="secondary"
          onClick={() => toast.warning("Storage is almost full")}
        >
          Warning
        </Button>
        <Button variant="secondary" onClick={() => toast.error("Sync failed")}>
          Error
        </Button>
      </div>
      <ToastViewport />
    </>
  );
}

function AlertDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className="stack">
      <Alert variant="info" title="Autosave is on">
        Changes are saved as you work.
      </Alert>
      <Alert variant="success" title="Synced">
        The workspace is ready to share.
      </Alert>
      <Alert variant="warning" title="Storage is almost full">
        Archive an old workspace to keep syncing.
      </Alert>
      {open && (
        <Alert
          variant="danger"
          title="Sync failed"
          dismissible
          onDismiss={() => setOpen(false)}
        >
          We will retry in the background.
        </Alert>
      )}
    </div>
  );
}

function NoticeDemo() {
  return (
    <Notice variant="info" title="New shortcut" dismissible>
      Press Cmd K to jump between workspaces.
    </Notice>
  );
}

function CardDemo() {
  return (
    <Card
      title="Asterism"
      description="Personal workspace"
      footer="Synced just now"
    >
      A place for the next decision.
    </Card>
  );
}

const tableRows = [
  { workspace: "Asterism", status: "Synced", updated: "2m ago" },
  { workspace: "Sephiro", status: "Draft", updated: "Yesterday" },
];

function TableDemo() {
  return (
    <Table
      caption="Recent workspaces"
      rowKey="workspace"
      columns={[
        { key: "workspace", label: "Workspace" },
        { key: "status", label: "Status" },
        { key: "updated", label: "Updated", align: "end" },
      ]}
      rows={tableRows}
    />
  );
}

function EmptyStateDemo() {
  return (
    <EmptyState
      title="No saved views"
      description="Create one to return to this filter later."
      action={<Button variant="primary">Create view</Button>}
    />
  );
}

function ToolbarDemo() {
  const [tab, setTab] = useState("overview");

  return (
    <Toolbar
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
        <>
          <Badge variant="neutral">Draft</Badge>
          <IconButton label="More actions" icon={<DotsThreeIcon size={16} />} />
          <Button variant="primary">Share</Button>
        </>
      }
    />
  );
}

function TabsDemo() {
  const [tab, setTab] = useState("overview");

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      items={[
        { value: "overview", label: "Overview" },
        { value: "activity", label: "Activity" },
        { value: "settings", label: "Settings", disabled: true },
      ]}
    />
  );
}

function SliderIconDemo() {
  return <IconButton label="Adjust" icon={<SlidersIcon size={16} />} />;
}

export const groups: Group[] = [
  {
    name: "Controls",
    note: "Primitives that take an action or hold a value. Every one ships in sm, md and lg with disabled, loading and invalid states.",
    specimens: [
      {
        id: "button",
        name: "Button",
        api: "Button / primary · secondary · quiet",
        note: "The label states the action; loading blocks input without losing it.",
        selector: ".sph-button",
        demo: ButtonDemo,
      },
      {
        id: "icon-button",
        name: "IconButton",
        api: "IconButton / ghost · solid · outline",
        note: "Icon-only actions keep their label as the accessible name.",
        selector: ".sph-icon-button",
        demo: IconButtonDemo,
      },
      {
        id: "toggle",
        name: "Toggle",
        api: "Toggle / checked · unchecked · disabled",
        note: "A setting that applies immediately, so it never needs a save button.",
        selector: ".sph-toggle__track",
        demo: ToggleDemo,
      },
      {
        id: "checkbox",
        name: "Checkbox",
        api: "Checkbox / label · disabled · invalid",
        note: "The mark is drawn from the icon set, so it carries the same weight as every other glyph.",
        selector: ".sph-checkbox__box",
        demo: CheckboxDemo,
      },
      {
        id: "slider",
        name: "Slider",
        api: "Slider / sm · md · lg · invalid",
        note: "Numeric ranges print their own readout instead of hiding the value in a tooltip.",
        selector: ".sph-slider__input",
        demo: SliderDemo,
      },
      {
        id: "badge",
        name: "Badge",
        api: "Badge / neutral · accent · success · warning · danger",
        note: "Status that stays quieter than the content it annotates.",
        selector: ".sph-badge",
        demo: BadgeDemo,
      },
      {
        id: "separator",
        name: "Separator",
        api: "Separator / horizontal · vertical",
        note: "Division with no container and no shadow.",
        selector: ".sph-separator",
        demo: SeparatorDemo,
      },
      {
        id: "surface",
        name: "Surface",
        api: "Surface / base · elevated · raised",
        note: "Three elevations, declared once, borders instead of shadow stacks.",
        selector: ".sph-surface",
        demo: SurfaceDemo,
      },
      {
        id: "spinner",
        name: "Spinner",
        api: "Spinner / sm · md · lg",
        note: "Carries a label for the reader who cannot see it turn.",
        selector: ".sph-spinner",
        demo: SpinnerDemo,
      },
      {
        id: "skeleton",
        name: "Skeleton",
        api: "Skeleton / width",
        note: "Holds the layout before content arrives, then leaves.",
        selector: ".sph-skeleton",
        demo: SkeletonDemo,
      },
    ],
  },
  {
    name: "Forms",
    note: "Labelled controls that wire their own help text, requirement and error message together.",
    specimens: [
      {
        id: "input",
        name: "Input",
        api: "Input / sm · md · lg · disabled · invalid",
        note: "Invalid sets the border and the semantics together.",
        selector: ".sph-input",
        demo: InputDemo,
      },
      {
        id: "textarea",
        name: "Textarea",
        api: "Textarea / min-height",
        note: "Longer input with no extra chrome.",
        selector: ".sph-textarea",
        demo: TextareaDemo,
      },
      {
        id: "select",
        name: "Select",
        api: "Select / sm · md · lg · disabled",
        note: "Keyboard navigation and a disabled state that keeps its placeholder.",
        selector: ".sph-select",
        demo: SelectDemo,
      },
      {
        id: "field",
        name: "Field",
        api: "Field / label · description · required",
        note: "One component connects the label, the help text and the control.",
        selector: ".sph-field",
        demo: FieldDemo,
      },
      {
        id: "field-message",
        name: "FieldMessage",
        api: "FieldMessage / error · success · hint",
        note: "Errors name the problem; success confirms the recovery.",
        selector: ".sph-field-message",
        demo: FieldMessageDemo,
      },
      {
        id: "radio-group",
        name: "RadioGroup",
        api: "RadioGroup / options · orientation",
        note: "Related choices with room for a sentence each.",
        selector: ".sph-radio-group",
        demo: RadioGroupDemo,
      },
    ],
  },
  {
    name: "Overlays",
    note: "Surfaces that appear near the action that opened them, and the toast that lives outside the layout.",
    specimens: [
      {
        id: "dialog",
        name: "Dialog",
        api: "Dialog / title · description · footer",
        note: "Interrupts only when the decision needs protection: focus stays inside until it closes.",
        selector: ".sph-dialog__close",
        demo: DialogDemo,
      },
      {
        id: "menu",
        name: "Menu",
        api: "Menu / items",
        note: "Progressive disclosure anchored to its trigger, keyboard first.",
        selector: ".sph-menu__trigger",
        demo: MenuDemo,
      },
      {
        id: "popover",
        name: "Popover",
        api: "Popover / trigger · children",
        note: "Room for content where a tooltip would be too small.",
        selector: ".sph-popover__trigger",
        demo: PopoverDemo,
      },
      {
        id: "tooltip",
        name: "Tooltip",
        api: "Tooltip / label",
        note: "One line for an icon-only control. Pointer and focus only.",
        selector: ".sph-tooltip__trigger",
        demo: TooltipDemo,
      },
      {
        id: "toast",
        name: "Toast",
        api: "toast() + ToastViewport",
        note: "Confirms what already happened without taking the screen.",
        selector: ".sph-toast-viewport",
        demo: ToastDemo,
      },
    ],
  },
  {
    name: "Data and feedback",
    note: "Status, structure and empty states for surfaces that carry real records.",
    specimens: [
      {
        id: "alert",
        name: "Alert",
        api: "Alert / info · success · warning · danger",
        note: "Inline status that stays in the layout until it is resolved or dismissed.",
        selector: ".sph-alert",
        demo: AlertDemo,
      },
      {
        id: "notice",
        name: "Notice",
        api: "Notice / alias of Alert",
        note: "The same component under the name product copy tends to use.",
        selector: ".sph-alert",
        demo: NoticeDemo,
      },
      {
        id: "card",
        name: "Card",
        api: "Card / title · description · footer",
        note: "A record with one clear action, not a container for containers.",
        selector: ".sph-card",
        demo: CardDemo,
      },
      {
        id: "table",
        name: "Table",
        api: "Table / columns · rows · rowKey · emptyMessage",
        note: "Rows can be keyed by a stable field, so reordering never moves cell state.",
        selector: ".sph-table-wrap",
        demo: TableDemo,
      },
      {
        id: "empty-state",
        name: "EmptyState",
        api: "EmptyState / title · description · action",
        note: "Honest copy and one next step instead of an illustrated shrug.",
        selector: ".sph-empty-state",
        demo: EmptyStateDemo,
      },
    ],
  },
  {
    name: "Composition",
    note: "The parts already carry the system, so putting them together is the whole job.",
    specimens: [
      {
        id: "toolbar",
        name: "Toolbar",
        api: "Toolbar + Tabs + Badge + Button",
        note: "Navigation, status and the primary action on one line.",
        selector: ".sph-toolbar",
        demo: ToolbarDemo,
      },
      {
        id: "tabs",
        name: "Tabs",
        api: "Tabs / items · value · onValueChange",
        note: "A disabled tab stays visible and announced, not removed.",
        selector: ".sph-tabs__tab",
        demo: TabsDemo,
      },
      {
        id: "sliders",
        name: "Settings row",
        api: "IconButton + Slider + Toggle",
        note: "A composed row built from primitives that already agree on spacing.",
        selector: ".sph-slider",
        demo: SliderIconDemo,
      },
    ],
  },
];
