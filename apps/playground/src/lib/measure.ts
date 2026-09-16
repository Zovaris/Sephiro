import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "preact/hooks";

export type Reading = {
  key: string;
  value: string;
};

export type Measurement = {
  readings: Reading[];
  states: string[];
};

const CONTROL_SELECTOR =
  "button, input, select, textarea, a[href], [role=switch], [role=slider], [role=button], [role=tab]";

const STATE_PROBES: Array<[string, string]> = [
  ["off", '.sph-toggle[data-state="unchecked"]'],
  [
    "on",
    '.sph-toggle[data-state="checked"], [aria-checked="true"], input:checked',
  ],
  ["disabled", "[disabled], [data-disabled=true]"],
  ["invalid", '[aria-invalid="true"], [data-invalid=true]'],
  ["busy", '[aria-busy="true"], [data-loading=true]'],
];

const EMPTY: Measurement = { readings: [], states: [] };

function radiusOf(element: Element, computed: CSSStyleDeclaration) {
  const corners = [
    computed.borderTopLeftRadius,
    computed.borderTopRightRadius,
    computed.borderBottomRightRadius,
    computed.borderBottomLeftRadius,
  ];
  const first = corners.find((corner) => Number.parseFloat(corner) > 0);
  if (!first) return "0px";
  return Number.parseFloat(first) >= 999
    ? "full"
    : `${Math.round(Number.parseFloat(first))}px`;
}

function motionOf(computed: CSSStyleDeclaration) {
  const [duration] = computed.transitionDuration.split(",");
  const seconds = Number.parseFloat(duration.trim() || "0");
  if (!seconds) return "none";
  return `${Math.round(seconds * 1000)}ms`;
}

function censusOf(node: HTMLElement) {
  const census: string[] = [
    `${node.querySelectorAll(CONTROL_SELECTOR).length} ctl`,
  ];
  for (const [label, selector] of STATE_PROBES) {
    const count = node.querySelectorAll(selector).length;
    if (count) census.push(`${label} ${count}`);
  }
  return census;
}

function measure(node: HTMLElement, selector: string): Measurement {
  const target = (node.querySelector(selector) ||
    node.querySelector(CONTROL_SELECTOR)) as HTMLElement | null;
  if (!target) return EMPTY;

  const computed = getComputedStyle(target);
  const box = target.getBoundingClientRect();

  return {
    readings: [
      { key: "h", value: `${Math.round(box.height)}px` },
      { key: "r", value: radiusOf(target, computed) },
      { key: "t", value: motionOf(computed) },
    ],
    states: censusOf(node),
  };
}

export function useMeasurement<T extends HTMLElement = HTMLElement>(
  selector: string,
  revision: string,
) {
  const [data, setData] = useState<Measurement>(EMPTY);
  const nodeRef = useRef<T | null>(null);

  const run = useCallback(() => {
    const node = nodeRef.current;
    if (node) setData(measure(node, selector));
  }, [selector]);

  useLayoutEffect(() => {
    run();
  }, [run, revision]);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new ResizeObserver(run);
    observer.observe(node);
    for (const child of node.children) observer.observe(child);

    if (document.fonts) void document.fonts.ready.then(run);

    return () => observer.disconnect();
  }, [run]);

  return [nodeRef, data] as const;
}
