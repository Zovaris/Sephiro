import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RadioGroup } from "./index";

test("renders a labelled group with the selected radio", () => {
  const markup = renderToStaticMarkup(
    createElement(RadioGroup, {
      label: "Workspace appearance",
      name: "appearance",
      onValueChange: () => undefined,
      options: [
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
      ],
      value: "light",
    }),
  );

  expect(markup).toContain('class="sph-radio-group"');
  expect(markup).toContain("Workspace appearance");
  expect(markup).toContain('value="light"');
  expect(markup).toContain('checked=""');
});
