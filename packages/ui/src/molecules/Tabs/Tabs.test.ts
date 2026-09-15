import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Tabs } from "./index";

test("renders tabs with one selected tab and its panel", () => {
  const markup = renderToStaticMarkup(
    createElement(Tabs, {
      ariaLabel: "Settings sections",
      items: [{ label: "General", value: "general", content: "General settings" }, { label: "Team", value: "team", content: "Team settings" }],
      value: "team",
    }),
  );

  expect(markup).toContain('role="tablist"');
  expect(markup).toContain('role="tab"');
  expect(markup).toContain('aria-selected="true"');
  expect(markup).toContain('role="tabpanel"');
  expect(markup).toContain("Team settings");
});
