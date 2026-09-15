import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Separator } from "./index";

test("renders a decorative separator by default", () => {
  const markup = renderToStaticMarkup(createElement(Separator));
  expect(markup).toContain('class="sph-separator"');
  expect(markup).toContain('role="presentation"');
});

test("exposes orientation for meaningful separators", () => {
  const markup = renderToStaticMarkup(createElement(Separator, { decorative: false, orientation: "vertical" }));
  expect(markup).toContain('data-orientation="vertical"');
  expect(markup).toContain('role="separator"');
  expect(markup).toContain('aria-orientation="vertical"');
});
