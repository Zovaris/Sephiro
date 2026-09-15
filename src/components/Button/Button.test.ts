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
  expect(markup).not.toContain("h-8");
});
