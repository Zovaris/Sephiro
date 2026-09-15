import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Spinner } from "./index";

test("is hidden from assistive technology without a label", () => {
  const markup = renderToStaticMarkup(createElement(Spinner, { size: "lg" }));

  expect(markup).toContain('class="sph-spinner sph-spinner--lg"');
  expect(markup).toContain('aria-hidden="true"');
});
