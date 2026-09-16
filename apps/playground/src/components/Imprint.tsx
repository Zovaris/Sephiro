import pkg from "@zovaris/sephiro/package.json";

const FACTS: Array<[string, string]> = [
  ["package", pkg.name],
  ["version", pkg.version],
  ["stylesheet", "@zovaris/sephiro/styles.css"],
  ["peer", "react >= 18 (optional)"],
  ["tokens", "28 semantic custom properties"],
  ["themes", "5 presets, unbounded custom"],
  ["licence", "MIT"],
];

export function Imprint() {
  return (
    <section className="band" aria-labelledby="imprint-heading">
      <div className="band__margin">
        <p className="anno">Imprint</p>
      </div>
      <div className="band__body">
        <div className="section-head">
          <div>
            <h2 id="imprint-heading">What the package actually promises</h2>
            <p>
              Four clauses you can check in the source. Everything on this sheet
              is built from them.
            </p>
          </div>
        </div>

        <div className="imprint" style={{ marginTop: "26px" }}>
          <ol className="clauses">
            <li>
              <span>
                <strong>It never resets your host.</strong> No Preflight, no
                base layer. Every sized element declares its own box model, and
                the stylesheet is yours to place in the cascade.
              </span>
            </li>
            <li>
              <span>
                <strong>One source, two runtimes.</strong> Public props are
                typed with framework-agnostic contracts, so the same build and
                the same declaration file serve React and Preact.
              </span>
            </li>
            <li>
              <span>
                <strong>Themes live on an ancestor.</strong> Components consume
                semantic tokens through data-sephiro-theme, so two themes can
                share a page — the bench above prints your ink inside this
                sheet.
              </span>
            </li>
            <li>
              <span>
                <strong>States ship with the component.</strong> Disabled,
                loading, invalid, focus and reduced-motion are part of the
                contract, not a variant you assemble.
              </span>
            </li>
          </ol>

          <div className="imprint__production">
            <h3>Production</h3>
            <dl>
              {FACTS.map(([key, value]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="anno imprint__release-note">
              release verifies tag, check, test and build before publishing
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
