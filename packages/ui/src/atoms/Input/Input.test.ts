import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "./index";

test("uses the shared size contract and preserves compact density", () => {
  const markup = renderToStaticMarkup(
    createElement(Input, { density: "compact", invalid: true, placeholder: "Name" }),
  );

  expect(markup).toContain('class="sph-input"');
  expect(markup).toContain('data-size="sm"');
  expect(markup).toContain('data-density="compact"');
  expect(markup).toContain('aria-invalid="true"');
});
