import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Input } from "./index";

test("uses the shared size contract", () => {
  const markup = renderToStaticMarkup(
    createElement(Input, {
      size: "sm",
      invalid: true,
      placeholder: "Name",
    }),
  );

  expect(markup).toContain('class="sph-input"');
  expect(markup).toContain('data-size="sm"');
  expect(markup).not.toContain("data-density");
  expect(markup).toContain('aria-invalid="true"');
});
