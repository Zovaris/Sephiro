export const INK_NAMES = [
  "dark",
  "light",
  "asterism",
  "fizza",
  "soffy",
] as const;

export type InkName = (typeof INK_NAMES)[number];

export type Ink = {
  name: InkName;
  note: string;
  stock: string;
  surface: string;
  rule: string;
  register: string;
};

const NOTES: Record<InkName, string> = {
  dark: "Charcoal stock, forest register.",
  light: "Soft cream stock, forest register.",
  asterism: "Asterism charcoal, signature red.",
  fizza: "Fizza black, electric violet.",
  soffy: "Soffy neutral, adaptive forest green.",
};

const TOKENS = {
  stock: "--sph-bg",
  surface: "--sph-surface",
  rule: "--sph-border",
  register: "--sph-accent",
} as const;

export function inkFromLocation(): InkName {
  const requested = new URLSearchParams(window.location.search).get("ink");
  return INK_NAMES.includes(requested as InkName)
    ? (requested as InkName)
    : "dark";
}

export function readInks(): Ink[] {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  document.body.append(probe);

  const inks = INK_NAMES.map((name) => {
    probe.dataset.sephiroTheme = name;
    const computed = getComputedStyle(probe);
    const read = (token: string) => computed.getPropertyValue(token).trim();
    return {
      name,
      note: NOTES[name],
      stock: read(TOKENS.stock),
      surface: read(TOKENS.surface),
      rule: read(TOKENS.rule),
      register: read(TOKENS.register),
    } satisfies Ink;
  });

  probe.remove();
  return inks;
}
