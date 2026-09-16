import { CheckIcon, CopyIcon } from "@phosphor-icons/react";
import { Button, IconButton, Input, Slider, Toggle } from "@zovaris/sephiro";
import pkg from "@zovaris/sephiro/package.json";
import { useState } from "preact/hooks";
import { useMeasurement } from "../lib/measure";
import { SephiroMark } from "./Brand";

const COMMAND = "bun add @zovaris/sephiro";

export function SiteHead({ revision }: { revision: string }) {
  const [copied, setCopied] = useState(false);
  const [notify, setNotify] = useState(true);
  const [name, setName] = useState("Asterism");
  const [radius, setRadius] = useState(6);
  const [stripRef, measured] = useMeasurement<HTMLDivElement>(
    ".sph-button",
    revision,
  );

  const copy = () => {
    void navigator.clipboard?.writeText(COMMAND);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <header className="head">
      <div className="masthead">
        <SephiroMark />
        <span className="masthead__name">Sephiro</span>
        <span>v{pkg.version}</span>
        <span className="masthead__links">
          <a href="https://www.npmjs.com/package/@zovaris/sephiro">npm</a>
          <a href="https://github.com/zovaris/sephiro">source</a>
        </span>
      </div>

      <h1 className="display">
        The details are the <em>system</em>.
      </h1>

      <p className="lede">
        A compact UI kit for the parts people notice late: spacing, states,
        focus, motion and the edges between components. One token contract, four
        ready-made inks, React and Preact.
      </p>

      <div className="install">
        <span className="install__line">
          <span className="install__prompt" aria-hidden="true">
            $
          </span>
          <code>{COMMAND}</code>
        </span>
        <span className="install__copy">
          <IconButton
            label={copied ? "Copied" : "Copy install command"}
            variant="outline"
            onClick={copy}
            icon={copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          />
        </span>
      </div>

      <div className="strip" ref={stripRef}>
        <div className="cell">
          <p className="cell__label">
            <span>Button</span>
            <span>primary</span>
          </p>
          <Button variant="primary">Save changes</Button>
        </div>
        <div className="cell">
          <p className="cell__label">
            <span>Input</span>
            <span>md</span>
          </p>
          <Input
            id="sheet-strip-input"
            aria-label="Workspace name"
            value={name}
            onInput={(event) => setName(event.currentTarget.value)}
          />
        </div>
        <div className="cell">
          <p className="cell__label">
            <span>Toggle</span>
            <span>{notify ? "on" : "off"}</span>
          </p>
          <Toggle
            checked={notify}
            onCheckedChange={setNotify}
            label="Enable notifications"
          />
        </div>
        <div className="cell">
          <p className="cell__label">
            <span>Slider</span>
            <span>{radius}px</span>
          </p>
          <Slider
            label="Corner radius"
            min={0}
            max={16}
            value={radius}
            valueLabel={`${radius}px`}
            onValueChange={setRadius}
          />
        </div>
      </div>

      <p className="anno reprint">
        measured live from the button above
        {measured.readings.map((reading) => (
          <span key={reading.key}>
            {" · "}
            {reading.key} {reading.value}
          </span>
        ))}
      </p>
      <p className="anno">
        the margin reads h height · r corner radius · t motion · then a count of
        controls and live states
      </p>
    </header>
  );
}
