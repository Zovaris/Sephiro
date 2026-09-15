import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "cn";

export type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  ariaLabel?: string;
  placement?: "start" | "end";
  disabled?: boolean;
  className?: string;
};

export function Popover({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  ariaLabel = "Popover",
  placement = "start",
  disabled = false,
  className,
}: PopoverProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = (next: boolean) => {
    setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <div ref={rootRef} className={cn("sph-popover", className)} data-open={isOpen || undefined}>
      <button type="button" className="sph-popover__trigger" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={isOpen ? id : undefined} disabled={disabled} onClick={() => setOpen(!isOpen)} onKeyDown={handleTriggerKeyDown}>
        {trigger}
      </button>
      {isOpen && <div id={id} className="sph-popover__content" data-placement={placement} role="dialog" aria-label={ariaLabel}>{children}</div>}
    </div>
  );
}
