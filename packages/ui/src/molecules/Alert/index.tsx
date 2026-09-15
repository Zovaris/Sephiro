import { cn } from "cn";
import type { HTMLAttributes, ReactNode } from "react";

export type AlertProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> & {
  variant?: "info" | "success" | "warning" | "danger";
  title?: ReactNode;
  children?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
};

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  role,
  ...props
}: AlertProps) {
  if (title === undefined && children === undefined) return null;

  return (
    <div
      {...props}
      className={cn("sph-alert", className)}
      data-variant={variant}
      role={role ?? (variant === "danger" ? "alert" : "status")}
      aria-live={
        role ? undefined : variant === "danger" ? "assertive" : "polite"
      }
    >
      <span className="sph-alert__icon" aria-hidden="true" />
      <div className="sph-alert__body">
        {title !== undefined && <p className="sph-alert__title">{title}</p>}
        {children !== undefined && (
          <div className="sph-alert__content">{children}</div>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          className="sph-alert__dismiss"
          aria-label="Dismiss notification"
          onClick={onDismiss}
        >
          <span aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export const Notice = Alert;
export type NoticeProps = AlertProps;
