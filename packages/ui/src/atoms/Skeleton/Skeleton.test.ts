import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Skeleton } from "./index";

test("renders a dimensioned loading placeholder", () => {
  const markup = renderToStaticMarkup(
    createElement(Skeleton, { width: 180, height: 12, className: "preview-line" }),
  );

  expect(markup).toContain('class="sph-skeleton preview-line"');
  expect(markup).toContain('style="width:180px;height:12px"');
  expect(markup).toContain('aria-hidden="true"');
});
