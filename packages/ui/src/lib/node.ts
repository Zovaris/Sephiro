export type RenderableElement = {
  type: any;
  props: any;
  key?: any;
};

export type Renderable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Iterable<Renderable>
  | RenderableElement;

/**
 * Widens a node to whatever the host JSX runtime accepts.
 *
 * This is the single sanctioned boundary between the framework-agnostic
 * public contract and the concrete JSX runtime (React, Preact, …). The
 * library never inspects node internals — it only hands them back — so the
 * return type is intentionally `any`. Accepts `unknown` because data-driven
 * components (e.g. Table cell values) cannot statically prove Renderable.
 * Greppable, one place, no scattered casts.
 */
export const node = (value: unknown): any => value;
