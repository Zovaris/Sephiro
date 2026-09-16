/**
 * Minimal keyboard-event shape shared by React and Preact handlers.
 *
 * Component handlers only need the action-relevant surface; both runtimes'
 * event objects satisfy it structurally, so the same compiled handlers
 * type-check under either JSX runtime.
 */
export type KeyboardActionEvent = {
  key: string;
  preventDefault(): void;
};
