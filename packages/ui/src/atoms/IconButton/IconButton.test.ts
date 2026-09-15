import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { IconButton } from "./index";

test("renders an accessible icon-only button", () => {
  const markup = renderToStaticMarkup(
    createElement(IconButton, { icon: createElement("span", { "aria-hidden": true }, "x"), label: "Close panel", size: "lg" }),
  );

  expect(markup).toContain('class="sph-icon-button"');
  expect(markup).toContain('aria-label="Close panel"');
  expect(markup).toContain('data-size="lg"');
  expect(markup).toContain('type="button"');
});

test("marks a loading icon button busy and disabled", () => {
  const markup = renderToStaticMarkup(
    createElement(IconButton, { icon: "x", label: "Refresh", loading: true }),
  );

  expect(markup).toContain('aria-busy="true"');
  expect(markup).toContain("disabled");
  expect(markup).toContain('class="sph-spinner sph-spinner--sm"');
});
