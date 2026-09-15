import { useId } from "react";
import { cn } from "cn";
import { FieldMessage, type FieldMessageProps } from "../FieldMessage";

export type FieldProps = {
  label?: unknown;
  htmlFor?: string;
  description?: unknown;
  message?: unknown;
  messageType?: FieldMessageProps["variant"];
  required?: boolean;
  className?: string;
  children?: unknown;
};

export function Field({
  label,
  htmlFor,
  description,
  message,
  messageType = "hint",
  required = false,
  className,
  children,
}: FieldProps) {
  const generatedId = useId();
  const descriptionId = description ? `${generatedId}-description` : undefined;
  const messageId = message ? `${generatedId}-message` : undefined;

  return (
    <div className={cn("sph-field", className)}>
      {label !== undefined && (
        <label className="sph-field__label" htmlFor={htmlFor}>
          <span>{label as any}</span>
          {required && <span className="sph-field__required">Required</span>}
        </label>
      )}
      {description !== undefined && description !== null && (
        <p id={descriptionId} className="sph-field__description">{description as any}</p>
      )}
      <div className="sph-field__control">{children as any}</div>
      {message !== undefined && message !== null && (
        <FieldMessage id={messageId} variant={messageType} children={message as any} />
      )}
    </div>
  );
}
