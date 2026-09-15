import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Tooltip } from "./index";

test("renders an initially hidden tooltip with a semantic role", () => {
  const markup = renderToStaticMarkup(
    createElement(Tooltip, { children: "?", content: "Keyboard shortcuts" }),
  );
  expect(markup).toContain('class="sph-tooltip"');
  expect(markup).toContain('role="tooltip"');
  expect(markup).toContain('hidden=""');
  expect(markup).toContain("Keyboard shortcuts");
});
