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

export const node = (value: unknown): any => value;
