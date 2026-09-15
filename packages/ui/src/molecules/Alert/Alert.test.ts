import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Alert, Notice } from "./index";

test("renders the semantic role and variant state", () => {
  const markup = renderToStaticMarkup(createElement(Alert, { title: "Sync failed", variant: "danger", dismissible: true }, "Try again."));

  expect(markup).toContain('class="sph-alert"');
  expect(markup).toContain('data-variant="danger"');
  expect(markup).toContain('role="alert"');
  expect(markup).toContain('aria-label="Dismiss notification"');
  expect(markup).toContain("Try again.");
});

test("exports Notice as the same reusable alert", () => {
  const markup = renderToStaticMarkup(createElement(Notice, { variant: "success" }, "Saved"));
  expect(markup).toContain('data-variant="success"');
  expect(markup).toContain("Saved");
});
