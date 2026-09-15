import { useEffect, type ReactNode } from "react";
import { cn } from "cn";

export type ToastProps = {
  open?: boolean;
  title: ReactNode;
  description?: ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger";
  action?: ReactNode;
  onClose?: () => void;
  duration?: number;
  className?: string;
};

export function Toast({ open = true, title, description, variant = "neutral", action, onClose, duration = 0, className }: ToastProps) {
  useEffect(() => {
    if (!open || duration <= 0 || !onClose) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose, open]);

  if (!open) return null;

  return (
    <div className={cn("sph-toast", className)} data-variant={variant} role={variant === "danger" ? "alert" : "status"}>
      <span className="sph-toast__indicator" aria-hidden="true" />
      <div className="sph-toast__body">
        <p className="sph-toast__title">{title}</p>
        {description !== undefined && <p className="sph-toast__description">{description}</p>}
      </div>
      {action !== undefined && <div className="sph-toast__action">{action}</div>}
      {onClose && <button type="button" className="sph-toast__close" aria-label="Dismiss notification" onClick={onClose}><span aria-hidden="true" /></button>}
    </div>
  );
}

export type ToastViewportProps = {
  children?: ReactNode;
  label?: string;
  className?: string;
};

export function ToastViewport({ children, label = "Notifications", className }: ToastViewportProps) {
  return <div className={cn("sph-toast-viewport", className)} aria-label={label} aria-live="polite">{children}</div>;
}
