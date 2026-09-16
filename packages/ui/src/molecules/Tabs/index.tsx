import { cn } from "cn";
import { type KeyboardEvent, useId, useState } from "react";
import { type Renderable, node } from "@/lib/node";

export type TabItem = {
  value: string;
  label: Renderable;
  disabled?: boolean;
  content?: Renderable;
};

export type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: Renderable;
  ariaLabel?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
};

function firstEnabled(items: TabItem[]) {
  return items.find((item) => !item.disabled)?.value;
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  children,
  ariaLabel = "Tabs",
  orientation = "horizontal",
  className,
}: TabsProps) {
  const generatedId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? firstEnabled(items) ?? "",
  );
  const activeValue = value ?? uncontrolledValue;
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.value === activeValue),
  );
  const activeItem = items[activeIndex];
  const setValue = (nextValue: string) => {
    setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
  };
  const move = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const direction =
      orientation === "vertical"
        ? event.key === "ArrowDown"
          ? 1
          : -1
        : event.key === "ArrowRight"
          ? 1
          : -1;
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    for (let step = 1; step <= items.length; step += 1) {
      const next = (index + step * direction + items.length) % items.length;
      if (!items[next]?.disabled) {
        setValue(items[next].value);
        document.getElementById(`${generatedId}-${next}`)?.focus();
        return;
      }
    }
  };
  const panelId = `${generatedId}-panel`;

  return (
    <div className={cn("sph-tabs", className)} data-orientation={orientation}>
      <div
        className="sph-tabs__list"
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation={orientation}
      >
        {items.map((item, index) => {
          const selected = item.value === activeValue;
          return (
            <button
              key={item.value}
              id={`${generatedId}-${index}`}
              type="button"
              role="tab"
              className="sph-tabs__tab"
              aria-selected={selected}
              aria-controls={selected ? panelId : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              data-selected={selected || undefined}
              onClick={() => !item.disabled && setValue(item.value)}
              onKeyDown={(event) => move(event, index)}
            >
              {node(item.label)}
            </button>
          );
        })}
      </div>
      {activeItem &&
        (activeItem.content !== undefined || children !== undefined) && (
          <div
            id={panelId}
            className="sph-tabs__panel"
            role="tabpanel"
            aria-labelledby={`${generatedId}-${activeIndex}`}
          >
            {node(activeItem.content ?? children)}
          </div>
        )}
    </div>
  );
}
