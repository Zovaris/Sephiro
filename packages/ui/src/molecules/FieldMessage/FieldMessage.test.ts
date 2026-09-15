import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { FieldMessage } from "./index";

test("uses an alert role for error messages", () => {
  const markup = renderToStaticMarkup(
    createElement(FieldMessage, { variant: "error" }, "Required field"),
  );

  expect(markup).toContain('data-variant="error"');
  expect(markup).toContain('role="alert"');
  expect(markup).toContain("Required field");
});
