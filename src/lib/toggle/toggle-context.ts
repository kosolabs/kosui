import type { Color, Shape, Size } from "#lib/base.js";
import { createContext } from "svelte";

export type ToggleContext<T = unknown> = {
  readonly value: T | undefined;
  readonly name: string;
  readonly color: Color;
  readonly size: Size;
  readonly shape: Shape;
  select(value: T): void;
};

export const [getToggleContext, setToggleContext] =
  createContext<ToggleContext>();
