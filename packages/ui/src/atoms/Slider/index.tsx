import { cn } from "cn";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { useId } from "react";
import { node, type Renderable } from "@/lib/node.js";
import type { ControlSize } from "../../lib/control";

export type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "size"
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "children"
  | "min"
  | "max"
  | "step"
> & {
  value: number;
  onValueChange: (value: number) => void;
  label: Renderable;
  min?: number;
  max?: number;
  step?: number;
  size?: ControlSize;
  valueLabel?: Renderable;
  invalid?: boolean;
};

export function Slider({
  value,
  onValueChange,
  label,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  valueLabel,
  invalid = false,
  className,
  disabled,
  style,
  id,
  "aria-label": ariaLabel,
  "aria-valuetext": ariaValueText,
  "aria-invalid": ariaInvalid,
  ...props
}: SliderProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const range = max - min || 1;
  const progress = Math.min(100, Math.max(0, ((value - min) / range) * 100));
  const trackStyle = {
    ...style,
    "--sph-slider-progress": `${progress}%`,
  } as CSSProperties;

  return (
    <div
      className={cn("sph-slider", className)}
      data-size={size}
      data-disabled={disabled || undefined}
      data-invalid={invalid || undefined}
    >
      <div className="sph-slider__head">
        <label className="sph-slider__label" htmlFor={inputId}>
          {node(label)}
        </label>
        {valueLabel !== undefined && (
          <output
            className="sph-slider__value"
            htmlFor={inputId}
            aria-hidden="true"
          >
            {node(valueLabel)}
          </output>
        )}
      </div>
      <input
        {...node(props)}
        id={inputId}
        type="range"
        className="sph-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-valuetext={
          ariaValueText ?? (typeof valueLabel === "string" ? valueLabel : undefined)
        }
        aria-invalid={ariaInvalid ?? (invalid || undefined)}
        style={trackStyle}
        onInput={(event) => onValueChange(Number(event.currentTarget.value))}
      />
    </div>
  );
}
