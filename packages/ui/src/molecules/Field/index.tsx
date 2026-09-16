import { cn } from "cn";
import { useId } from "react";
import { type Renderable, node } from "@/lib/node";
import { FieldMessage, type FieldMessageProps } from "../FieldMessage";

export type FieldProps = {
  label?: Renderable;
  htmlFor?: string;
  description?: Renderable;
  message?: Renderable;
  messageType?: FieldMessageProps["variant"];
  required?: boolean;
  className?: string;
  children?: Renderable;
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
          <span>{node(label)}</span>
          {required && <span className="sph-field__required">Required</span>}
        </label>
      )}
      {description !== undefined && description !== null && (
        <p id={descriptionId} className="sph-field__description">
          {node(description)}
        </p>
      )}
      <div className="sph-field__control">{node(children)}</div>
      {message !== undefined && message !== null && (
        <FieldMessage
          id={messageId}
          variant={messageType}
        >
          {node(message)}
        </FieldMessage>
      )}
    </div>
  );
}
