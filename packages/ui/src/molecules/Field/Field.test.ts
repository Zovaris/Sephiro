import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Field } from "./index";

test("renders label, description, control and required state", () => {
  const markup = renderToStaticMarkup(
    createElement(
      Field,
      { description: "Shown in the sidebar", htmlFor: "workspace", label: "Workspace", required: true },
      createElement("input", { id: "workspace" }),
    ),
  );

  expect(markup).toContain('class="sph-field"');
  expect(markup).toContain('for="workspace"');
  expect(markup).toContain("Shown in the sidebar");
  expect(markup).toContain("Required");
});
