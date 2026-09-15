import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Surface } from "./index";

test("renders a themed surface with semantic tone and padding", () => {
  const markup = renderToStaticMarkup(createElement(Surface, { padding: "lg", tone: "elevated" }, "Preferences"));

  expect(markup).toContain('class="sph-surface"');
  expect(markup).toContain('data-tone="elevated"');
  expect(markup).toContain('data-padding="lg"');
  expect(markup).toContain("Preferences");
});
