import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Slider } from "./index";

test("renders a labelled range with its progress and readout", () => {
  const markup = renderToStaticMarkup(
    createElement(Slider, {
      label: "Radius",
      min: 0,
      max: 16,
      value: 4,
      valueLabel: "4px",
      className: "w-40",
      onValueChange: () => {},
    }),
  );

  const inputId = markup.match(/id="([^"]+)"/)?.[1] ?? "";

  expect(markup).toContain('class="sph-slider w-40"');
  expect(markup).toContain('data-size="md"');
  expect(inputId).not.toBe("");
  expect(markup).toContain(
    `<label class="sph-slider__label" for="${inputId}">`,
  );
  expect(markup).toContain("Radius");
  expect(markup).toContain(`for="${inputId}"`);
  expect(markup).toContain('class="sph-slider__value"');
  expect(markup).toContain('aria-hidden="true"');
  expect(markup).toContain('type="range"');
  expect(markup).toContain('min="0"');
  expect(markup).toContain('max="16"');
  expect(markup).toContain('value="4"');
  expect(markup).toContain('aria-valuetext="4px"');
  expect(markup).toContain("--sph-slider-progress:25%");
});

test("clamps progress and reflects disabled and invalid state", () => {
  const markup = renderToStaticMarkup(
    createElement(Slider, {
      label: "Volume",
      value: 140,
      size: "sm",
      disabled: true,
      invalid: true,
      onValueChange: () => {},
    }),
  );

  expect(markup).toContain("--sph-slider-progress:100%");
  expect(markup).toContain('data-size="sm"');
  expect(markup).toContain('data-disabled="true"');
  expect(markup).toContain('data-invalid="true"');
  expect(markup).toContain('aria-invalid="true"');
  expect(markup).toContain("disabled");
  expect(markup).not.toContain("<output");
});

test("keeps consumer id and aria-label over the generated ones", () => {
  const markup = renderToStaticMarkup(
    createElement(Slider, {
      id: "blur-radius",
      label: "Blur",
      value: 50,
      "aria-label": "Blur radius",
      step: 5,
      onValueChange: () => {},
    }),
  );

  expect(markup).toContain('id="blur-radius"');
  expect(markup).toContain('for="blur-radius"');
  expect(markup).toContain('aria-label="Blur radius"');
  expect(markup).toContain('step="5"');
});
