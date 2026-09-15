import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Dialog } from "./index";

test("renders a labelled modal dialog when open", () => {
  const markup = renderToStaticMarkup(createElement(Dialog, { open: true, onClose: () => undefined, title: "Delete project", description: "This cannot be undone.", children: "Confirm" }));
  expect(markup).toContain('role="dialog"');
  expect(markup).toContain('aria-modal="true"');
  expect(markup).toContain("Delete project");
  expect(markup).toContain("This cannot be undone.");
  expect(markup).toContain('aria-label="Close dialog"');
});

test("renders no dialog while closed", () => {
  const markup = renderToStaticMarkup(createElement(Dialog, { open: false, onClose: () => undefined, title: "Hidden" }));
  expect(markup).toBe("");
});
