import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Card } from "./index";

test("renders a structured card with header, content and footer", () => {
  const markup = renderToStaticMarkup(
    createElement(Card, {
      description: "Keep your workspace focused",
      footer: createElement("button", { type: "button" }, "Manage"),
      title: "Workspace",
      children: "Asterism",
      interactive: true,
    }),
  );

  expect(markup).toContain('class="sph-card"');
  expect(markup).toContain('data-interactive="true"');
  expect(markup).toContain("Workspace");
  expect(markup).toContain("Asterism");
  expect(markup).toContain("Manage");
});
