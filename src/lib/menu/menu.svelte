<script module lang="ts">
  import type { ShapeProp } from "#lib/base.js";
  import { baseClasses } from "#lib/base.js";
  import { mergeProps } from "#lib/merge-props.js";
  import {
    Popover,
    type PopoverPlacement,
    type PopoverProps,
  } from "#lib/popover/index.js";
  import { Shortcut } from "#lib/shortcut/index.js";
  import { cn, TypingBuffer } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import { createAttachmentKey, type Attachment } from "svelte/attachments";
  import { setMenuContext } from "./menu-context.js";

  export type MenuTriggerProps = {
    [attachment: symbol]: Attachment<HTMLElement>;
    id: string;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
    "aria-controls"?: string;
    onclick: (event: MouseEvent) => void;
    onkeydown: (event: KeyboardEvent) => void;
  };

  export type MenuProps = {
    trigger: Snippet<[MenuTriggerProps]>;
    placement?: PopoverPlacement;
  } & ShapeProp &
    Omit<PopoverProps, "placement" | "anchorEl" | "onKeydownWhileOpen">;

  type Start = "first" | "last" | "menu";
</script>

<script lang="ts">
  let {
    open = $bindable(false),
    el = $bindable(),
    trigger,
    placement = "bottom-start",
    shape = "xs",
    class: className,
    children,
    ...restProps
  }: MenuProps = $props();

  const id = $props.id();
  const anchor = createAttachmentKey();
  const buffer = new TypingBuffer();
  let anchorEl: HTMLElement | undefined = $state();
  let start: Start = "menu";

  function show(from: Start) {
    start = from;
    open = true;
  }

  function close() {
    open = false;
    anchorEl?.focus();
  }

  setMenuContext({ close });

  $effect(() => {
    if (open && el) queueMicrotask(focusStart);
  });

  function items(): HTMLElement[] {
    return el
      ? [
          ...el.querySelectorAll<HTMLElement>(
            '[role^="menuitem"]:not(:disabled)',
          ),
        ]
      : [];
  }

  function focusStart() {
    const list = items();
    const target =
      start === "first" ? list[0] : start === "last" ? list.at(-1) : el;
    (target ?? el)?.focus();
  }

  function typeahead(char: string, list: HTMLElement[], index: number) {
    const typed = buffer.append(char).toLowerCase();
    const prefix = [...typed].every((c) => c === typed[0]) ? typed[0] : typed;
    const ordered = [...list.slice(index + 1), ...list.slice(0, index + 1)];
    return ordered.find((item) =>
      item.textContent?.trim().toLowerCase().startsWith(prefix),
    );
  }

  function onkeydown(event: KeyboardEvent) {
    if (
      Shortcut.TAB_FORWARD.matches(event) ||
      Shortcut.TAB_BACKWARD.matches(event)
    ) {
      open = false;
      return;
    }
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLElement);
    let target: HTMLElement | undefined;
    if (Shortcut.ARROW_DOWN.matches(event)) {
      target = list[(index + 1) % list.length];
    } else if (Shortcut.ARROW_UP.matches(event)) {
      target = index <= 0 ? list.at(-1) : list[index - 1];
    } else if (Shortcut.HOME.matches(event)) {
      target = list[0];
    } else if (Shortcut.END.matches(event)) {
      target = list.at(-1);
    } else if (Shortcut.isChar(event) && event.key !== " ") {
      target = typeahead(event.key, list, index);
    } else if (
      !Shortcut.ENTER.matches(event) &&
      !Shortcut.SPACE.matches(event)
    ) {
      return;
    }
    target?.focus();
    if (target) event.preventDefault();
    event.stopPropagation();
  }

  function onpointerleave() {
    if (el?.contains(document.activeElement)) el.focus();
  }

  const triggerProps: MenuTriggerProps = $derived({
    [anchor]: (node) => {
      anchorEl = node;
    },
    id: `${id}-trigger`,
    "aria-haspopup": "menu",
    "aria-expanded": open,
    "aria-controls": open ? `${id}-menu` : undefined,
    onclick: (event) => {
      if (open) open = false;
      else show(event.detail === 0 ? "first" : "menu");
    },
    onkeydown: (event) => {
      if (Shortcut.ARROW_DOWN.matches(event)) show("first");
      else if (Shortcut.ARROW_UP.matches(event)) show("last");
      else return;
      event.preventDefault();
    },
  });
</script>

{@render trigger(triggerProps)}

<Popover
  bind:open
  bind:el
  {anchorEl}
  {placement}
  id="{id}-menu"
  role="menu"
  aria-labelledby="{id}-trigger"
  tabindex={-1}
  class={cn(
    baseClasses({ shape }),
    "max-h-[min(60vh,32rem)] min-w-40 overflow-y-auto bg-m3-surface-container p-1 text-m3-on-surface shadow-md shadow-m3-shadow/20 outline-none",
    className,
  )}
  {...mergeProps(restProps, {
    onkeydown,
    onpointerleave,
  })}
>
  {@render children()}
</Popover>
