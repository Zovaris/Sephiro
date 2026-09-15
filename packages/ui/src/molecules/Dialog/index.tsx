import { useEffect, useId, type ReactNode } from "react";
import { cn } from "cn";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
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

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="sph-dialog__backdrop" role="presentation" onMouseDown={(event) => { if (closeOnOverlayClick && event.target === event.currentTarget) onClose(); }}>
      <section className={cn("sph-dialog", className)} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <header className="sph-dialog__header">
          <div className="sph-dialog__heading">
            <h2 id={titleId} className="sph-dialog__title">{title}</h2>
            {description !== undefined && <p id={descriptionId} className="sph-dialog__description">{description}</p>}
          </div>
          <button type="button" className="sph-dialog__close" aria-label={closeLabel} onClick={onClose}><span aria-hidden="true" /></button>
        </header>
        {children !== undefined && <div className="sph-dialog__content">{children}</div>}
        {footer !== undefined && <footer className="sph-dialog__footer">{footer}</footer>}
      </section>
    </div>
  );
}
