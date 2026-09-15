import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Table } from "./index";

test("renders accessible tabular data", () => {
  const markup = renderToStaticMarkup(
    createElement(Table, {
      caption: "Recent workspaces",
      columns: [
        { key: "name", label: "Name" },
        { key: "count", label: "Projects", align: "end" },
      ],
      rows: [{ name: "Asterism", count: 4 }],
      striped: true,
    }),
  );
  expect(markup).toContain('class="sph-table-wrap"');
  expect(markup).toContain('data-striped="true"');
  expect(markup).toContain('<th scope="col"');
  expect(markup).toContain("Asterism");
  expect(markup).toContain("4");
});

test("renders a single accessible empty row", () => {
  const markup = renderToStaticMarkup(
    createElement(Table, {
      columns: [{ key: "name", label: "Name" }],
      rows: [],
      emptyMessage: "Nothing here",
    }),
  );
  expect(markup).toContain('class="sph-table__empty"');
  expect(markup).toContain('colSpan="1"');
  expect(markup).toContain("Nothing here");
});
