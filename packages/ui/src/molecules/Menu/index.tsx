import { cn } from "cn";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { type Renderable, node } from "@/lib/node";

export type MenuItem = {
  value?: string;
  label?: Renderable;
  icon?: Renderable;
  shortcut?: Renderable;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
};

export type MenuProps = {
  trigger: Renderable;
  items: MenuItem[];
  onSelect?: (value: string) => void;
  label?: string;
  align?: "start" | "end";
  disabled?: boolean;
  className?: string;
};

export function Menu({
  trigger,
  items,
  onSelect,
  label = "Open menu",
  align = "start",
  disabled = false,
  className,
}: MenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const enabledIndexes = items.flatMap((item, index) =>
    !item.separator && !item.disabled ? [index] : [],
  );
  const close = () => setOpen(false);
  const focusItem = (index: number) =>
    document.getElementById(`${menuId}-${index}`)?.focus();

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const choose = (item: MenuItem) => {
    if (item.disabled || item.separator || item.value === undefined) return;
    onSelect?.(item.value);
    close();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const index =
        enabledIndexes[
          event.key === "ArrowDown" ? 0 : enabledIndexes.length - 1
        ];
      if (index !== undefined) requestAnimationFrame(() => focusItem(index));
    }
  };

  const handleItemKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      rootRef.current
        ?.querySelector<HTMLButtonElement>(".sph-menu__trigger")
        ?.focus();
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(items[index]);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const current = enabledIndexes.indexOf(index);
    const nextPosition =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? enabledIndexes.length - 1
          : (current +
              (event.key === "ArrowDown" ? 1 : -1) +
              enabledIndexes.length) %
            enabledIndexes.length;
    const nextIndex = enabledIndexes[nextPosition];
    if (nextIndex !== undefined) focusItem(nextIndex);
  };

  return (
    <div id={menuId} ref={rootRef} className={cn("sph-menu", className)}>
      <button
        type="button"
        className="sph-menu__trigger"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
      >
        {node(trigger)}
      </button>
      {open && (
        <div className="sph-menu__content" data-align={align} role="menu">
          {items.map((item, index) =>
            item.separator ? (
              <div
                key={`separator-${index}`}
                className="sph-menu__separator"
                role="separator"
              />
            ) : (
              <button
                key={item.value ?? `item-${index}`}
                id={`${menuId}-${index}`}
                type="button"
                role="menuitem"
                className="sph-menu__item"
                data-danger={item.danger || undefined}
                disabled={item.disabled}
                onClick={() => choose(item)}
                onKeyDown={(event) => handleItemKeyDown(event, index)}
              >
                <span className="sph-menu__item-label">
                  {node(item.icon)}
                  <span>{node(item.label)}</span>
                </span>
                {item.shortcut !== undefined && (
                  <span className="sph-menu__shortcut">
                    {node(item.shortcut)}
                  </span>
                )}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
}
