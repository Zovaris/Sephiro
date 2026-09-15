import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Toggle } from "./index";

test("renders the switch semantic and checked state", () => {
  const markup = renderToStaticMarkup(
    createElement(Toggle, {
      checked: true,
      label: "Enable notifications",
      onCheckedChange: () => undefined,
    }),
  );

  expect(markup).toContain('role="switch"');
  expect(markup).toContain('aria-checked="true"');
  expect(markup).toContain('data-state="checked"');
});
