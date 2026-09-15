import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Popover } from "./index";

test("renders a closed popover trigger with disclosure semantics", () => {
  const markup = renderToStaticMarkup(createElement(Popover, { trigger: "Details", children: "More information" }));
  expect(markup).toContain('class="sph-popover__trigger"');
  expect(markup).toContain('aria-haspopup="dialog"');
  expect(markup).toContain('aria-expanded="false"');
  expect(markup).toContain("Details");
  expect(markup).not.toContain("More information");
});
