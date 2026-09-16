import type { Ink, InkName } from "../lib/inks";

type InkRailProps = {
  inks: Ink[];
  ink: InkName;
  printing: boolean;
  onInkChange: (ink: InkName) => void;
};

export function InkRail({ inks, ink, printing, onInkChange }: InkRailProps) {
  return (
    <section className="band" aria-labelledby="ink-heading">
      <div className="band__margin">
        <p className="anno">Ink run</p>
        <p className="anno anno__num">{printing ? "custom" : ink}</p>
      </div>
      <div className="band__body">
        <div className="section-head">
          <div>
            <h2 id="ink-heading">The same sheet, printed in five inks</h2>
            <p>
              Choose an ink and the whole sheet reprints. Components, rules,
              focus rings and the numbers in the margin are the same objects
              reading different tokens — nothing here is a screenshot.
            </p>
          </div>
          <p className="anno">data-sephiro-theme</p>
        </div>
        <div className="ink reprint" style={{ marginTop: "24px" }}>
          {inks.map((entry) => (
            <button
              type="button"
              key={entry.name}
              className="ink__chip"
              aria-pressed={!printing && entry.name === ink}
              onClick={() => onInkChange(entry.name)}
            >
              <span className="ink__bands" aria-hidden="true">
                <span
                  className="ink__band"
                  style={{ background: entry.stock }}
                />
                <span
                  className="ink__band"
                  style={{ background: entry.surface }}
                />
                <span
                  className="ink__band"
                  style={{ background: entry.register }}
                />
              </span>
              <span className="ink__meta">
                <span className="ink__key">{entry.name}</span>
                <span className="ink__note">{entry.note}</span>
                <span className="ink__printed">Printed</span>
              </span>
            </button>
          ))}
        </div>
        <p className="anno" style={{ marginTop: "18px" }}>
          swatches are read from the token contract at mount, never written by
          hand
        </p>
      </div>
    </section>
  );
}
