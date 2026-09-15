import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EmptyState } from "./index";

test("renders a helpful empty state with action", () => {
  const markup = renderToStaticMarkup(createElement(EmptyState, { title: "No projects yet", description: "Create a project to start organizing your work.", action: createElement("button", { type: "button" }, "Create project"), compact: true }));
  expect(markup).toContain('class="sph-empty-state"');
  expect(markup).toContain('data-compact="true"');
  expect(markup).toContain("No projects yet");
  expect(markup).toContain("Create project");
});
