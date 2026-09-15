import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Toast, ToastViewport } from "./index";

test("renders a status toast with optional action and close control", () => {
  const markup = renderToStaticMarkup(createElement(Toast, { title: "Saved", description: "Your changes are synced.", variant: "success", action: createElement("button", { type: "button" }, "Undo"), onClose: () => undefined }));
  expect(markup).toContain('class="sph-toast"');
  expect(markup).toContain('data-variant="success"');
  expect(markup).toContain('role="status"');
  expect(markup).toContain("Undo");
  expect(markup).toContain('aria-label="Dismiss notification"');
});

test("provides a live region viewport", () => {
  const markup = renderToStaticMarkup(createElement(ToastViewport, { children: "Updates" }));
  expect(markup).toContain('class="sph-toast-viewport"');
  expect(markup).toContain('aria-live="polite"');
});
