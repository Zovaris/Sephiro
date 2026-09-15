import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "./index";

test("exposes invalid and density state to its CSS contract", () => {
  const markup = renderToStaticMarkup(
    createElement(Input, { density: "compact", invalid: true, placeholder: "Name" }),
  );

  expect(markup).toContain('class="sph-input"');
  expect(markup).toContain('data-density="compact"');
  expect(markup).toContain('aria-invalid="true"');
});
