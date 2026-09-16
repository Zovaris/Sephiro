import { CheckIcon, InfoIcon, WarningIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "cn";
import type { HTMLAttributes } from "react";
import { node, type Renderable } from "@/lib/node.js";

export type AlertProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> & {
  variant?: "info" | "success" | "warning" | "danger";
  title?: Renderable;
  children?: Renderable;
  dismissible?: boolean;
  onDismiss?: () => void;
};

const alertIcons = {
  info: <InfoIcon size={16} />,
  success: <CheckIcon size={16} />,
  warning: <WarningIcon size={16} />,
  danger: <XIcon size={16} />,
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
      {...node(props)}
      className={cn("sph-alert", className)}
      data-variant={variant}
      role={role ?? (variant === "danger" ? "alert" : "status")}
      aria-live={
        role ? undefined : variant === "danger" ? "assertive" : "polite"
      }
    >
      <span className="sph-alert__icon" aria-hidden="true">
        {alertIcons[variant]}
      </span>
      <div className="sph-alert__body">
        {title !== undefined && (
          <p className="sph-alert__title">{node(title)}</p>
        )}
        {children !== undefined && (
          <div className="sph-alert__content">{node(children)}</div>
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
