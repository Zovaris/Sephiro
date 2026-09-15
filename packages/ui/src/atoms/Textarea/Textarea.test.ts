import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Textarea } from "./index";

test("renders an invalid textarea with the shared size token", () => {
  const markup = renderToStaticMarkup(
    createElement(Textarea, {
      invalid: true,
      size: "lg",
      placeholder: "Notes",
    }),
  );

  expect(markup).toContain('class="sph-textarea"');
  expect(markup).toContain('data-size="lg"');
  expect(markup).toContain('aria-invalid="true"');
});
