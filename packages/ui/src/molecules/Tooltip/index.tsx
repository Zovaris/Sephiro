import { cn } from "cn";
import { useId, useRef, useState } from "react";
import { type Renderable, node } from "@/lib/node";

export type TooltipProps = {
  content: Renderable;
  children: Renderable;
  side?: "top" | "right" | "bottom" | "left";
  delay?: number;
  disabled?: boolean;
  className?: string;
};

export function Tooltip({
  content,
  children,
  side = "top",
  delay = 400,
  disabled = false,
  className,
}: TooltipProps) {
  const id = useId();
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [visible, setVisible] = useState(false);
  const show = () => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <span
      className={cn("sph-tooltip", className)}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        className="sph-tooltip__trigger"
        aria-describedby={visible ? id : undefined}
      >
        {node(children)}
      </span>
      <span
        id={id}
        className="sph-tooltip__content"
        data-side={side}
        data-visible={visible || undefined}
        role="tooltip"
        hidden={!visible}
      >
        {node(content)}
      </span>
    </span>
  );
}
