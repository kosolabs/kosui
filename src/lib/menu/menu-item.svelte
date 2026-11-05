<script module lang="ts">
  import { baseClasses, type ColorProp } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import { Check } from "@lucide/svelte";
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { getMenuContext } from "./menu-context.js";

  export type MenuItemProps = {
    onSelect?: () => void;
    checked?: boolean;
    el?: HTMLButtonElement;
    children: Snippet;
  } & ClassName &
    ColorProp &
    Omit<HTMLButtonAttributes, "type" | "value" | "role" | "class">;
</script>

<script lang="ts">
  let {
    onSelect,
    checked,
    children,
    el = $bindable(),
    color = "plain",
    class: className,
    ...restProps
  }: MenuItemProps = $props();

  const menu = getMenuContext();
</script>

<button
  bind:this={el}
  type="button"
  role={checked === undefined ? "menuitem" : "menuitemcheckbox"}
  aria-checked={checked}
  tabindex={-1}
  class={cn(
    baseClasses({ color }),
    "flex h-8 w-full items-center gap-2 rounded-sm px-3 text-left text-sm outline-none focus:bg-current/10 disabled:text-m3-on-surface/38",
    className,
  )}
  {...mergeProps(
    {
      onclick: () => {
        menu.close();
        onSelect?.();
      },
      onpointermove: () => {
        if (el && !el.disabled && document.activeElement !== el) el.focus();
      },
    },
    restProps,
  )}
>
  {#if checked !== undefined}
    <Check size={16} class={cn("shrink-0", !checked && "invisible")} />
  {/if}
  {@render children()}
</button>
