import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Badge } from "./index";

test("renders a semantic status variant", () => {
  const markup = renderToStaticMarkup(createElement(Badge, { variant: "success" }, "Ready"));

  expect(markup).toContain('class="sph-badge"');
  expect(markup).toContain('data-variant="success"');
  expect(markup).toContain("Ready");
});
