import { XIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import { useEffect, useId, useRef } from "react";
import { node, type Renderable } from "@/lib/node.js";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: Renderable;
  description?: Renderable;
  children?: Renderable;
  footer?: Renderable;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  className?: string;
};

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  closeLabel = "Close dialog",
  closeOnOverlayClick = true,
  className,
}: DialogProps) {
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = description ? `${id}-description` : undefined;
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const focusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));
    requestAnimationFrame(() => focusable()[0]?.focus());
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusable();
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div
      className="sph-dialog__backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget)
          onClose();
      }}
    >
      <section
        ref={dialogRef}
        className={cn("sph-dialog", className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <header className="sph-dialog__header">
          <div className="sph-dialog__heading">
            <h2 id={titleId} className="sph-dialog__title">
              {node(title)}
            </h2>
            {description !== undefined && (
              <p id={descriptionId} className="sph-dialog__description">
                {node(description)}
              </p>
            )}
          </div>
          <button
            type="button"
            className="sph-dialog__close"
            aria-label={closeLabel}
            onClick={onClose}
          >
            <XIcon size={14} aria-hidden="true" />
          </button>
        </header>
        {children !== undefined && (
          <div className="sph-dialog__content">{node(children)}</div>
        )}
        {footer !== undefined && (
          <footer className="sph-dialog__footer">{node(footer)}</footer>
        )}
      </section>
    </div>
  );
}
