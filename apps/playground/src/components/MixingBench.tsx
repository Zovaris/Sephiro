import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import {
  Alert,
  Badge,
  Button,
  IconButton,
  Input,
  Slider,
  Toggle,
} from "@sthlabs/sephiro-ui";
import { useState } from "preact/hooks";
import {
  contrast,
  INK_FIELDS,
  type InkTokens,
  inkVars,
  isLight,
  presetBlock,
} from "../lib/custom-ink";

type MixingBenchProps = {
  tokens: InkTokens;
  printing: boolean;
  sheetInk: string;
  onChange: (patch: Partial<InkTokens>) => void;
  onPrint: () => void;
};

const CHECKS = [
  { label: "Ink on stock", foreground: "ink", background: "stock", min: 4.5 },
  {
    label: "Second ink on stock",
    foreground: "muted",
    background: "stock",
    min: 4.5,
  },
  {
    label: "Register on stock",
    foreground: "accent",
    background: "stock",
    min: 3,
  },
] as const;

export function MixingBench({
  tokens,
  printing,
  sheetInk,
  onChange,
  onPrint,
}: MixingBenchProps) {
  const [copied, setCopied] = useState(false);
  const scheme = isLight(tokens.stock) ? "light" : "dark";
  const block = presetBlock(tokens, scheme);

  const copy = () => {
    void navigator.clipboard?.writeText(block);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="band" aria-labelledby="mix-heading">
      <div className="band__margin">
        <p className="anno">Mix</p>
        <p className="anno anno__num">{tokens.name}</p>
      </div>
      <div className="band__body">
        <div className="section-head">
          <div>
            <h2 id="mix-heading">Mix your own ink</h2>
            <p>
              Six tokens and a radius are what a preset is. The panel on the
              right is printed in your ink while the sheet stays in{" "}
              <span className="anno">{printing ? sheetInk : sheetInk}</span> —
              two themes, one page, which is the whole point of theming on an
              ancestor.
            </p>
          </div>
        </div>

        <div className="bench" style={{ marginTop: "26px" }}>
          <div className="bench__controls">
            {INK_FIELDS.map((field) => (
              <label className="bench__field" key={field.key}>
                <span className="bench__label">{field.label}</span>
                <span className="bench__chip">
                  <span
                    className="bench__swatch"
                    style={{ background: tokens[field.key] }}
                  >
                    <input
                      type="color"
                      value={tokens[field.key]}
                      aria-label={`${field.label} colour`}
                      onInput={(event) =>
                        onChange({ [field.key]: event.currentTarget.value })
                      }
                    />
                  </span>
                  <input
                    className="bench__hex"
                    value={tokens[field.key]}
                    aria-label={`${field.label} value`}
                    onInput={(event) =>
                      onChange({ [field.key]: event.currentTarget.value })
                    }
                  />
                </span>
              </label>
            ))}
            <label className="bench__field">
              <span className="bench__label">Radius</span>
              <Slider
                label="Corner radius"
                min={0}
                max={16}
                value={tokens.radius}
                valueLabel={`${tokens.radius}px`}
                onValueChange={(radius) => onChange({ radius })}
              />
            </label>
            <label className="bench__field">
              <span className="bench__label">Theme name</span>
              <input
                className="bench__hex"
                value={tokens.name}
                aria-label="Theme name"
                onInput={(event) =>
                  onChange({ name: event.currentTarget.value })
                }
              />
            </label>
          </div>

          <div
            className="bench__preview"
            data-sephiro-theme="custom"
            style={inkVars(tokens, scheme)}
          >
            <p className="cell__label">
              <span>Your ink</span>
              <span>{scheme}</span>
            </p>
            <strong style={{ fontSize: "19px", letterSpacing: "-0.014em" }}>
              Workspace
            </strong>
            <span className="note">
              Components inherit every token from the closest themed ancestor.
            </span>
            <Input
              id="bench-input"
              aria-label="Workspace name"
              defaultValue="Asterism"
            />
            <div className="row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Badge variant="accent">Accent</Badge>
              <Toggle
                checked
                onCheckedChange={() => {}}
                label="Pinned to the top"
              />
            </div>
            <Alert variant="warning" title="Storage is almost full">
              Archive an old workspace to keep syncing.
            </Alert>
            <div className="bench__readout">
              {CHECKS.map((check) => {
                const ratio = contrast(
                  tokens[check.foreground],
                  tokens[check.background],
                );
                return (
                  <span className="bench__check" key={check.label}>
                    <span className="anno">{check.label}</span>
                    <span
                      className="bench__verdict"
                      data-pass={ratio !== null && ratio >= check.min}
                    >
                      {ratio === null
                        ? "unreadable"
                        : `${ratio}:1 · ${ratio >= check.min ? "pass" : `needs ${check.min}`}`}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="code" style={{ marginTop: "26px" }}>
          <div className="code__bar">
            <span>{tokens.name}.css</span>
            <span className="row">
              <span className="anno">copy into your own stylesheet</span>
              <IconButton
                label={copied ? "Copied" : "Copy preset"}
                variant="outline"
                onClick={copy}
                icon={copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              />
            </span>
          </div>
          <pre className="code__body">{block}</pre>
        </div>

        <div className="row" style={{ marginTop: "18px" }}>
          <Button variant="secondary" onClick={onPrint}>
            {printing ? `Back to ${sheetInk}` : "Print the sheet in this ink"}
          </Button>
          <span className="anno">
            the sheet keeps its own attribute while this panel carries yours
          </span>
        </div>
      </div>
    </section>
  );
}
