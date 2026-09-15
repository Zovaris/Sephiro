import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Menu } from "./index";

test("renders an accessible closed menu trigger", () => {
  const markup = renderToStaticMarkup(createElement(Menu, { items: [{ label: "Rename", value: "rename" }], trigger: "Actions" }));
  expect(markup).toContain('class="sph-menu__trigger"');
  expect(markup).toContain('aria-haspopup="menu"');
  expect(markup).toContain('aria-expanded="false"');
  expect(markup).toContain("Actions");
});
