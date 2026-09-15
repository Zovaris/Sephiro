import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./index";

test("renders the selected visual variant and a safe button type", () => {
  const markup = renderToStaticMarkup(
    createElement(
      Button,
      { className: "h-10", variant: "primary", size: "md" },
      "Save",
    ),
  );

  expect(markup).toContain('class="sph-button h-10"');
  expect(markup).toContain('data-variant="primary"');
  expect(markup).toContain('data-size="md"');
  expect(markup).toContain('type="button"');
  expect(markup).toContain("Save");
});

test("marks a loading button busy and disabled", () => {
  const markup = renderToStaticMarkup(
    createElement(Button, { loading: true }, "Saving"),
  );

  expect(markup).toContain('data-loading="true"');
  expect(markup).toContain('aria-busy="true"');
  expect(markup).toContain("disabled");
  expect(markup).toContain('class="sph-spinner sph-spinner--sm"');
});
