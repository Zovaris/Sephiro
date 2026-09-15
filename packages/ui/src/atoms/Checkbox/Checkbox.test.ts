import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Checkbox } from "./index";

test("renders a labelled checkbox with checked semantics", () => {
  const markup = renderToStaticMarkup(
    createElement(Checkbox, {
      defaultChecked: true,
      label: "Remember this workspace",
    }),
  );

  expect(markup).toContain('class="sph-checkbox"');
  expect(markup).toContain('type="checkbox"');
  expect(markup).toContain("checked");
  expect(markup).toContain("Remember this workspace");
});
