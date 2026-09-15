import { cn } from "cn";
import { type ReactNode, useId } from "react";
import type { ControlSize } from "../../lib/control";

export type RadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

export type RadioGroupProps = {
  value: string;
  options: RadioOption[];
  onValueChange: (value: string) => void;
  name: string;
  label?: ReactNode;
  description?: ReactNode;
  size?: ControlSize;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
};

export function RadioGroup({
  value,
  options,
  onValueChange,
  name,
  label,
  description,
  size = "md",
  orientation = "vertical",
  disabled = false,
  className,
}: RadioGroupProps) {
  const groupId = useId();
  const descriptionId = description ? `${groupId}-description` : undefined;

  return (
    <fieldset
      className={cn("sph-radio-group", className)}
      data-size={size}
      data-orientation={orientation}
      disabled={disabled}
      aria-describedby={descriptionId}
    >
      {label !== undefined && (
        <legend className="sph-radio-group__legend">{label}</legend>
      )}
      {description !== undefined && (
        <p id={descriptionId} className="sph-radio-group__description">
          {description}
        </p>
      )}
      <div className="sph-radio-group__options">
        {options.map((option, index) => {
          const optionId = `${groupId}-${index}`;
          const optionDescriptionId = option.description
            ? `${optionId}-description`
            : undefined;

          return (
            <label
              key={option.value}
              className="sph-radio-group__option"
              data-disabled={option.disabled || undefined}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                disabled={disabled || option.disabled}
                aria-describedby={optionDescriptionId}
                onChange={() => onValueChange(option.value)}
              />
              <span className="sph-radio-group__control" aria-hidden="true" />
              <span className="sph-radio-group__content">
                <span className="sph-radio-group__label">{option.label}</span>
                {option.description !== undefined && (
                  <span
                    id={optionDescriptionId}
                    className="sph-radio-group__option-description"
                  >
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
