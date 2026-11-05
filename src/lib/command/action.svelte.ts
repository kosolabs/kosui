import type { Shortcut } from "#lib/shortcut/index.js";
import { CircleSlash, type LucideIcon } from "@lucide/svelte";
import { untrack } from "svelte";

type ActionProps = {
  id: string;
  callback: () => void;
  category?: string;
  name?: string;
  description?: string;
  icon?: LucideIcon;
  enabled?: () => boolean;
  selected?: () => boolean;
  shortcut?: Shortcut;
};

export class Action {
  id: string;
  callback: () => void;
  category: string;
  name: string;
  description: string;
  icon: LucideIcon;
  enabled: () => boolean;
  selected?: () => boolean;
  shortcut?: Shortcut;

  constructor({
    id,
    callback,
    category,
    name,
    description,
    icon = CircleSlash,
    enabled = () => true,
    selected,
    shortcut,
  }: ActionProps) {
    this.id = id;
    this.callback = callback;
    this.category = category ?? "";
    this.name = name ?? id;
    this.description = description ?? name ?? id;
    this.icon = icon;
    this.enabled = enabled;
    this.selected = selected;
    this.shortcut = shortcut;
  }
}

export class Registry {
  #actions: Action[] = $state([]);

  get actions(): Action[] {
    return this.#actions;
  }

  get(id: string): Action | undefined {
    for (const action of this.#actions) {
      if (action.id === id) {
        return action;
      }
    }
  }

  getByShortcut(shortcut: Shortcut): Action | undefined {
    return this.#actions.find((action) => action.shortcut?.equals(shortcut));
  }

  call(id: string) {
    const action = this.get(id);
    if (!action) {
      throw new Error(`No action named "${id}" is registered`);
    }
    action.callback();
  }

  register(...actions: Action[]) {
    untrack(() => {
      for (const action of actions) {
        if (this.#actions.some((existing) => existing.id === action.id)) {
          throw new Error(`${action.id} is already registered`);
        }
        if (action.shortcut && this.getByShortcut(action.shortcut)) {
          throw new Error(`${action.shortcut} is already registered`);
        }
      }
      this.#actions.unshift(...actions);
    });
    return () => this.unregister(...actions);
  }

  unregister(...actions: Action[]) {
    untrack(() => {
      for (const action of actions) {
        const index = this.#actions.indexOf(action);
        if (index !== -1) {
          this.#actions.splice(index, 1);
        }
      }
    });
  }
}
