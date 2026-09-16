import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

const sizedControls: Array<[string, string]> = [
  ["atoms/Spinner/style.css", ".sph-spinner"],
  ["atoms/Checkbox/style.css", ".sph-checkbox__box"],
  ["atoms/Toggle/style.css", ".sph-toggle__track"],
  ["atoms/Slider/style.css", ".sph-slider__input"],
  ["molecules/RadioGroup/style.css", ".sph-radio-group__control"],
];

function readRule(file: string, selector: string) {
  const css = readFileSync(new URL(file, import.meta.url), "utf8");
  const start = css.indexOf(`${selector} {`);
  expect(start, `${selector} in ${file}`).toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("}", start));
}

test("sized elements own their box model instead of relying on the host", () => {
  for (const [file, selector] of sizedControls) {
    expect(readRule(file, selector), `${selector} in ${file}`).toMatch(
      /box-border|box-sizing:\s*border-box/,
    );
  }
});
