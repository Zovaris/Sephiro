import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Toolbar } from "./index";

test("renders a labelled toolbar with grouped content", () => {
  const markup = renderToStaticMarkup(
    createElement(Toolbar, {
      label: "Project actions",
      start: "Project",
      end: "Save",
      children: "Filters",
    }),
  );
  expect(markup).toContain('role="toolbar"');
  expect(markup).toContain('aria-label="Project actions"');
  expect(markup).toContain('data-orientation="horizontal"');
  expect(markup).toContain("Project");
  expect(markup).toContain("Filters");
  expect(markup).toContain("Save");
});
