import { cn } from "cn";
import { useEffect } from "react";
import {
  type ExternalToast,
  Toaster as SonnerToaster,
  type ToasterProps as SonnerToasterProps,
  toast,
} from "sonner";

export type { ExternalToast } from "sonner";
export { toast };

const toastIcons = {
  success: (
    <span
      className="sph-toast__status-icon"
      data-icon-state="success"
      aria-hidden="true"
    />
  ),
  info: (
    <span
      className="sph-toast__status-icon"
      data-icon-state="info"
      aria-hidden="true"
    />
  ),
  warning: (
    <span
      className="sph-toast__status-icon"
      data-icon-state="warning"
      aria-hidden="true"
    />
  ),
  error: (
    <span
      className="sph-toast__status-icon"
      data-icon-state="error"
      aria-hidden="true"
    />
  ),
};

export type ToastProps = {
  open?: boolean;
  id?: string | number;
  title: unknown;
  description?: unknown;
  variant?: "neutral" | "success" | "warning" | "danger";
  action?: ExternalToast["action"];
  duration?: number;
  closeButton?: boolean;
  className?: string;
};

export function Toast({
  open = true,
  id,
  title,
  description,
  variant = "neutral",
  action,
  duration,
  closeButton = true,
  className,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const options: ExternalToast = {
      id,
      action,
      closeButton,
      description: description as any,
      duration,
      className: cn("sph-toast", className),
      unstyled: true,
    };
    const toastId =
      variant === "success"
        ? toast.success(title as any, options)
        : variant === "warning"
          ? toast.warning(title as any, options)
          : variant === "danger"
            ? toast.error(title as any, options)
            : toast(title as any, options);

    return () => {
      toast.dismiss(toastId);
    };
  }, [open]);

  return null;
}

export type ToastViewportProps = Omit<
  SonnerToasterProps,
  "className" | "containerAriaLabel" | "icons" | "toastOptions"
> & {
  label?: string;
  className?: string;
  toastOptions?: SonnerToasterProps["toastOptions"];
};

export function ToastViewport({
  label = "Notifications",
  className,
  toastOptions,
  theme = "system",
  position = "bottom-right",
  closeButton = true,
  ...props
}: ToastViewportProps) {
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
        closeButtonAriaLabel:
          toastOptions?.closeButtonAriaLabel ?? "Dismiss notification",
        className: cn("sph-toast", toastOptions?.className),
        unstyled: true,
      }}
    />
  );
}
