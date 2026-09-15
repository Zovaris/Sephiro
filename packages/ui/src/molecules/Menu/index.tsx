import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "cn";

export type MenuItem = {
  value?: string;
  label?: ReactNode;
  icon?: ReactNode;
  shortcut?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  separator?: boolean;
};

export type MenuProps = {
  trigger: ReactNode;
  items: MenuItem[];
  onSelect?: (value: string) => void;
  label?: string;
  align?: "start" | "end";
  disabled?: boolean;
  className?: string;
};

export function Menu({ trigger, items, onSelect, label = "Open menu", align = "start", disabled = false, className }: MenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const enabledIndexes = items.flatMap((item, index) => (!item.separator && !item.disabled ? [index] : []));
  const close = () => setOpen(false);

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
    if (event.key === "Escape") { event.preventDefault(); close(); return; }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const index = enabledIndexes[event.key === "ArrowDown" ? 0 : enabledIndexes.length - 1];
      if (index !== undefined) requestAnimationFrame(() => document.getElementById(`${rootRef.current?.id}-${index}`)?.focus());
    }
  };

  return (
    <div id={menuId} ref={rootRef} className={cn("sph-menu", className)}>
      <button type="button" className="sph-menu__trigger" aria-label={label} aria-haspopup="menu" aria-expanded={open} disabled={disabled} onClick={() => setOpen((current) => !current)} onKeyDown={handleKeyDown}>
        {trigger}
      </button>
      {open && (
        <div className="sph-menu__content" data-align={align} role="menu">
          {items.map((item, index) => item.separator ? (
            <div key={`separator-${index}`} className="sph-menu__separator" role="separator" />
          ) : (
            <button
              key={item.value ?? `item-${index}`}
              id={`${rootRef.current?.id}-${index}`}
              type="button"
              role="menuitem"
              className="sph-menu__item"
              data-danger={item.danger || undefined}
              disabled={item.disabled}
              onClick={() => choose(item)}
            >
              <span className="sph-menu__item-label">{item.icon}<span>{item.label}</span></span>
              {item.shortcut !== undefined && <span className="sph-menu__shortcut">{item.shortcut}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
