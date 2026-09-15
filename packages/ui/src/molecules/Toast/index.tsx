import { Toaster as SonnerToaster, toast, type ExternalToast, type ToasterProps as SonnerToasterProps } from "sonner";
import { useEffect, type ReactNode } from "react";
import { cn } from "cn";

export { toast };
export type { ExternalToast } from "sonner";

const toastIcons = {
  success: <span className="sph-toast__status-icon" data-icon-state="success" aria-hidden="true" />,
  info: <span className="sph-toast__status-icon" data-icon-state="info" aria-hidden="true" />,
  warning: <span className="sph-toast__status-icon" data-icon-state="warning" aria-hidden="true" />,
  error: <span className="sph-toast__status-icon" data-icon-state="error" aria-hidden="true" />,
};

export type ToastProps = {
  open?: boolean;
  id?: string | number;
  title: ReactNode;
  description?: ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger";
  action?: ExternalToast["action"];
  duration?: number;
  closeButton?: boolean;
  className?: string;
};

export function Toast({ open = true, id, title, description, variant = "neutral", action, duration, closeButton = true, className }: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const options: ExternalToast = {
      id,
      action,
      closeButton,
      description,
      duration,
      className: cn("sph-toast", className),
      unstyled: true,
    };
    const toastId = variant === "success"
      ? toast.success(title, options)
      : variant === "warning"
        ? toast.warning(title, options)
        : variant === "danger"
          ? toast.error(title, options)
          : toast(title, options);

    return () => {
      toast.dismiss(toastId);
    };
  }, [open]);

  return null;
}

export type ToastViewportProps = Omit<SonnerToasterProps, "className" | "containerAriaLabel" | "icons" | "toastOptions"> & {
  label?: string;
  className?: string;
  toastOptions?: SonnerToasterProps["toastOptions"];
};

export function ToastViewport({ label = "Notifications", className, toastOptions, theme = "system", position = "bottom-right", closeButton = true, ...props }: ToastViewportProps) {
  return (
    <SonnerToaster
      {...props}
      theme={theme}
      position={position}
      closeButton={closeButton}
      icons={toastIcons}
      containerAriaLabel={label}
      className={cn("sph-toast-viewport", className)}
      toastOptions={{
        ...toastOptions,
        closeButton: toastOptions?.closeButton ?? closeButton,
        closeButtonAriaLabel: toastOptions?.closeButtonAriaLabel ?? "Dismiss notification",
        className: cn("sph-toast", toastOptions?.className),
        unstyled: true,
      }}
    />
  );
}
