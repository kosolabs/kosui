import { createContext } from "svelte";

export type MenuContext = {
  close(): void;
};

export const [getMenuContext, setMenuContext] = createContext<MenuContext>();
