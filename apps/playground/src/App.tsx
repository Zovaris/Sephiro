import { useEffect, useMemo, useState } from "preact/hooks";
import { Imprint } from "./components/Imprint";
import { InkRail } from "./components/InkRail";
import { MixingBench } from "./components/MixingBench";
import { type Folio, RunningHead } from "./components/RunningHead";
import { SiteHead } from "./components/SiteHead";
import { Specimen } from "./components/Specimen";
import {
  type InkTokens,
  inkVars,
  isLight,
  STARTING_INK,
} from "./lib/custom-ink";
import { type Ink, type InkName, inkFromLocation, readInks } from "./lib/inks";
import { groups } from "./specimens";

function RegistrationMarks() {
  const corners = [
    { left: "10px", top: "10px" },
    { left: "calc(100% - 10px)", top: "10px" },
    { left: "10px", top: "calc(100% - 10px)" },
    { left: "calc(100% - 10px)", top: "calc(100% - 10px)" },
  ];

  return (
    <>
      {corners.map((corner) => (
        <svg
          aria-hidden="true"
          className="reg"
          key={`${corner.left}-${corner.top}`}
          style={{
            ...corner,
            transform: "translate(-50%, -50%)",
          }}
          viewBox="0 0 13 13"
        >
          <line x1="6.5" y1="0" x2="6.5" y2="13" />
          <line x1="0" y1="6.5" x2="13" y2="6.5" />
        </svg>
      ))}
    </>
  );
}

export function App() {
  const [inks] = useState<Ink[]>(() => readInks());
  const [ink, setInk] = useState<InkName>(() => inkFromLocation());
  const [custom, setCustom] = useState<InkTokens>(STARTING_INK);
  const [printing, setPrinting] = useState(false);
  const [reprinting, setReprinting] = useState(false);

  const scheme = isLight(custom.stock) ? "light" : "dark";  const folio = useMemo<Folio[]>(() => {
    return groups
      .flatMap((group) =>
        group.specimens.map((specimen) => ({
          id: specimen.id,
          name: specimen.name,
          group: group.name,
        })),
      )
      .map((entry, index) => ({ ...entry, number: index + 1 }));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (printing) {
      root.removeAttribute("data-sephiro-theme");
      const vars = inkVars(custom, scheme);
      for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, String(value));
      }
      return;
    }

    for (const key of Object.keys(inkVars(STARTING_INK, "dark"))) {
      root.style.removeProperty(key);
    }
    root.dataset.sephiroTheme = ink;
  }, [ink, printing, custom, scheme]);

  useEffect(() => {
    if (printing) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("ink") === ink) return;
    url.searchParams.set("ink", ink);
    window.history.replaceState(null, "", url);
  }, [ink, printing]);

  const reprint = () => {
    setReprinting(true);
    window.setTimeout(() => setReprinting(false), 480);
  };

  const changeInk = (next: InkName) => {
    setPrinting(false);
    setInk(next);
    reprint();
  };

  const revision = printing ? `${ink}-${JSON.stringify(custom)}` : ink;
  let position = 0;

  return (
    <main
      className="sheet"
      id="top"
      data-reprinting={reprinting ? "true" : undefined}
    >
      <RegistrationMarks />

      <div className="reprint">
        <RunningHead
          folio={folio}
          inks={inks}
          ink={ink}
          printing={printing}
          onInkChange={changeInk}
        />

        <SiteHead revision={revision} />

        <InkRail
          inks={inks}
          ink={ink}
          printing={printing}
          onInkChange={changeInk}
        />

        {groups.map((group) => (
          <section className="band" key={group.name}>
            <div className="band__margin">
              <p className="anno">{group.name}</p>
              <p className="anno anno__num">
                {group.specimens.length} specimens
              </p>
            </div>
            <div className="band__body">
              <div className="section-head">
                <div>
                  <h2>{group.name}</h2>
                  <p>{group.note}</p>
                </div>
              </div>
              {group.specimens.map((specimen) => {
                position += 1;
                return (
                  <Specimen
                    key={specimen.id}
                    number={position}
                    data={specimen}
                    revision={revision}
                  />
                );
              })}
            </div>
          </section>
        ))}

        <MixingBench
          tokens={custom}
          printing={printing}
          sheetInk={ink}
          onChange={(patch) => {
            setCustom((current) => ({ ...current, ...patch }));
            reprint();
          }}
          onPrint={() => {
            setPrinting((current) => !current);
            reprint();
          }}
        />

        <Imprint />
      </div>

      <footer className="foot">
        <span className="anno">
          Set in Geist, the library's own face, at specimen scale. Measurements
          in Geist Mono.
        </span>
        <span className="anno">
          Every number on this sheet is read from the browser at load.
        </span>
      </footer>
    </main>
  );
}
