import type { Variants } from "#lib/base.js";
import type { InputProps } from "#lib/input/index.js";
import type { LucideIcon } from "@lucide/svelte";
import { createContext, type Snippet } from "svelte";

export type DialogAction<T> = {
  text: string;
  value: T;
  default?: boolean;
} & Variants;

type DialogContent = {
  icon?: LucideIcon;
  title?: string;
  message: Snippet | string;
};

export type AlertOptions = DialogContent & { acceptText?: string };

export type ConfirmOptions = DialogContent & {
  cancelText?: string;
  acceptText?: string;
};

export type PromptOptions = DialogContent & {
  input?: InputProps;
  cancelText?: string;
  acceptText?: string;
};

export type ShowOptions<T> = DialogContent & { actions: DialogAction<T>[] };

export type DialogRequest = DialogContent & {
  actions: (DialogAction<unknown> & { submit?: boolean })[];
  input?: Omit<InputProps, "value">;
  value?: string;
  resolve: (value: unknown) => void;
};

export class Dialogs {
  current: DialogRequest | undefined = $state.raw();
  open = $state(false);
  #active: DialogRequest | undefined;
  #queue: DialogRequest[] = [];

  show<T>(options: ShowOptions<T>): Promise<T | undefined> {
    return this.#request(options) as Promise<T | undefined>;
  }

  async alert({ acceptText, ...content }: AlertOptions): Promise<void> {
    await this.#request({
      ...content,
      actions: [
        {
          text: acceptText ?? "OK",
          value: undefined,
          variant: "filled",
          default: true,
        },
      ],
    });
  }

  async confirm({
    cancelText,
    acceptText,
    ...content
  }: ConfirmOptions): Promise<boolean> {
    const accepted = await this.#request({
      ...content,
      actions: [
        { text: cancelText ?? "Cancel", value: false, variant: "plain" },
        {
          text: acceptText ?? "OK",
          value: true,
          variant: "filled",
          default: true,
        },
      ],
    });
    return accepted === true;
  }

  async prompt({
    input: { value, ...input } = {},
    cancelText,
    acceptText,
    ...content
  }: PromptOptions): Promise<string | undefined> {
    const text = await this.#request({
      ...content,
      input,
      value: value == null ? "" : String(value),
      actions: [
        { text: cancelText ?? "Cancel", value: undefined, variant: "plain" },
        {
          text: acceptText ?? "OK",
          value: undefined,
          variant: "filled",
          submit: true,
        },
      ],
    });
    return typeof text === "string" ? text : undefined;
  }

  settle(value: unknown) {
    this.#active?.resolve(value);
    this.#next();
  }

  #request(request: Omit<DialogRequest, "resolve">): Promise<unknown> {
    return new Promise((resolve) => {
      this.#queue.push({ ...request, resolve });
      if (!this.#active) this.#next();
    });
  }

  #next() {
    this.#active = this.#queue.shift();
    if (this.#active) this.current = this.#active;
    this.open = this.#active !== undefined;
  }
}

export const [getDialogs, setDialogs] = createContext<Dialogs>();
