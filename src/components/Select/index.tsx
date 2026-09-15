import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { classes } from "../../lib/classes";

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectProps = {
  value: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  id?: string;
  className?: string;
  placeholder?: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  disabled?: boolean;
};

function nextEnabled(
  options: SelectOption[],
  start: number,
  direction: 1 | -1,
) {
  if (options.length === 0) return -1;
  for (let step = 1; step <= options.length; step += 1) {
    const index = (start + step * direction + options.length) % options.length;
    if (!options[index]?.disabled) return index;
  }
  return -1;
}

export function Select({
  value,
  options,
  onValueChange,
  id,
  className,
  placeholder = "Select an option",
  ariaLabel,
  ariaLabelledBy,
  disabled = false,
}: SelectProps) {
  const generatedId = useId();
  const triggerId = id ?? `sph-select-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const firstEnabled = options.findIndex((option) => !option.disabled);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : firstEnabled,
  );

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (!open) setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled);
  }, [firstEnabled, open, selectedIndex]);

  function choose(index: number) {
    const option = options[index];
    if (!option || option.disabled) return;
    onValueChange(option.value);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const next = nextEnabled(options, activeIndex, direction);
      setOpen(true);
      if (next >= 0) setActiveIndex(next);
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const edge =
        event.key === "Home"
          ? firstEnabled
          : nextEnabled(options, 0, -1);
      setOpen(true);
      if (edge >= 0) setActiveIndex(edge);
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(activeIndex);
      else setOpen(true);
    }
  }

  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  return (
    <div ref={rootRef} className={classes("sph-select", className)}>
      <button
        id={triggerId}
        type="button"
        className="sph-select__trigger"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${listboxId}-${activeIndex}` : undefined
        }
        disabled={disabled || firstEnabled < 0}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        <span className="sph-select__value">{selected?.label ?? placeholder}</span>
        <span className="sph-select__caret" aria-hidden="true" />
      </button>

      {open && (
        <div id={listboxId} role="listbox" className="sph-select__listbox">
          {options.map((option, index) => (
            <button
              key={option.value}
              id={`${listboxId}-${index}`}
              type="button"
              role="option"
              aria-selected={index === selectedIndex}
              disabled={option.disabled}
              className="sph-select__option"
              data-active={index === activeIndex || undefined}
              onPointerMove={() => !option.disabled && setActiveIndex(index)}
              onClick={() => choose(index)}
            >
              <span>{option.label}</span>
              {index === selectedIndex && (
                <span className="sph-select__check" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
