import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Toast, ToastViewport } from "./index";

test("uses Sonner's Toaster for the viewport", () => {
  const markup = renderToStaticMarkup(
    createElement(ToastViewport, { label: "Notifications" }),
  );
  expect(markup).toContain("<section");
  expect(markup).toContain('aria-label="Notifications');
  expect(markup).toContain('aria-live="polite"');
});

test("bridges a declarative toast to Sonner without SSR side effects", () => {
  const markup = renderToStaticMarkup(
    createElement(Toast, {
      title: "Saved",
      description: "Your changes are synced.",
      variant: "success",
    }),
  );
  expect(markup).toBe("");
});
