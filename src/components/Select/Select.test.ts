import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Select } from "./index";

test("renders a labelled closed listbox trigger", () => {
  const markup = renderToStaticMarkup(
    createElement(Select, {
      ariaLabel: "Workspace",
      onValueChange: () => undefined,
      options: [{ label: "Asterism", value: "asterism" }],
      size: "lg",
      value: "asterism",
    }),
  );

  expect(markup).toContain('class="sph-select__trigger"');
  expect(markup).toContain('data-size="lg"');
  expect(markup).toContain('aria-label="Workspace"');
  expect(markup).toContain('aria-haspopup="listbox"');
  expect(markup).toContain('aria-expanded="false"');
  expect(markup).toContain("Asterism");
});
