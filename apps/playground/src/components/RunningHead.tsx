import { useEffect, useState } from "preact/hooks";
import type { Ink, InkName } from "../lib/inks";

export type Folio = {
  id: string;
  number: number;
  name: string;
  group: string;
};

type RunningHeadProps = {
  folio: Folio[];
  inks: Ink[];
  ink: InkName;
  printing: boolean;
  onInkChange: (ink: InkName) => void;
};

const REVEAL_AT = 380;

export function RunningHead({
  folio,
  inks,
  ink,
  printing,
  onInkChange,
}: RunningHeadProps) {
  const [current, setCurrent] = useState<string | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const targets = folio
      .map((entry) => document.getElementById(`specimen-${entry.id}`))
      .filter((node): node is HTMLElement => node !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrent(entry.target.id.replace("specimen-", ""));
          }
        }
      },
      { rootMargin: "-15% 0px -72% 0px" },
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => observer.disconnect();
  }, [folio]);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > REVEAL_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const entry = folio.find((item) => item.id === current);

  return (
    <nav
      className="run"
      aria-label="Running head"
      data-shown={shown ? "true" : undefined}
    >
      <a
        className="run__folio"
        href={entry ? `#specimen-${entry.id}` : "#top"}
        title={entry ? `Jump to the ${entry.name} specimen` : "Back to the top"}
      >
        {entry ? `№ ${String(entry.number).padStart(2, "0")}` : "№ 00"}
      </a>
      <span className="run__name">
        {entry ? entry.name : "Sephiro, a system for product work"}
      </span>
      <span className="run__group">
        {entry ? entry.group : `${folio.length} specimens`}
      </span>

      <span className="run__inks">
        <span className="run__ink-name">
          {printing ? "custom ink" : `${ink} ink`}
        </span>
        <span
          className="run__ink-row"
          role="group"
          aria-label="Print the sheet in another ink"
        >
          {inks.map((item) => (
            <button
              type="button"
              key={item.name}
              className="run__ink"
              aria-label={`Print in ${item.name} ink`}
              aria-pressed={!printing && item.name === ink}
              style={{ background: item.stock, "--register": item.register }}
              onClick={() => onInkChange(item.name)}
            />
          ))}
        </span>
      </span>
    </nav>
  );
}
