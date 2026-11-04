<script lang="ts" module>
  import { mergeProps } from "#lib/merge-props.js";
  import { Popover, type PopoverProps } from "#lib/popover/index.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import { createAttachmentKey, type Attachment } from "svelte/attachments";

  export type TooltipTriggerProps = {
    [attachment: symbol]: Attachment<HTMLElement>;
    "aria-describedby"?: string;
    "aria-expanded"?: boolean;
    "aria-controls"?: string;
    onclick?: () => void;
    onpointerenter?: (event: PointerEvent) => void;
    onpointerleave?: (event: PointerEvent) => void;
    onfocus?: (event: FocusEvent) => void;
    onblur?: () => void;
    ontouchstart?: () => void;
    ontouchend?: () => void;
  };

  export type TooltipProps = {
    delay?: number;
    open?: boolean;
    click?: boolean;
    rich?: boolean;
    trigger?: Snippet<[TooltipTriggerProps]>;
  } & ClassName &
    PopoverProps;

  const GRACE = 100;
</script>

<script lang="ts">
  const generatedId = $props.id();

  let {
    id: providedId,
    delay = 500,
    open = $bindable(false),
    click = false,
    rich = false,
    trigger,
    anchorEl,
    class: className,
    ...restProps
  }: TooltipProps = $props();

  let id = $derived(providedId ?? generatedId);

  const anchor = createAttachmentKey();
  const attachAnchor: Attachment<HTMLElement> = (node) => {
    anchorEl = node;
  };

  let timeout: number;

  export function show(after?: number) {
    cancel();
    timeout = window.setTimeout(
      () => (open = true),
      after === undefined ? delay : after,
    );
  }

  export function cancel() {
    window.clearTimeout(timeout);
  }

  export function hide() {
    cancel();
    open = false;
  }

  function hideSoon() {
    cancel();
    timeout = window.setTimeout(() => (open = false), GRACE);
  }

  const notTouch =
    (handler: () => void) =>
    ({ pointerType }: PointerEvent) => {
      if (pointerType !== "touch") handler();
    };

  const triggerProps: TooltipTriggerProps = $derived(
    click
      ? {
          [anchor]: attachAnchor,
          "aria-expanded": open,
          "aria-controls": open ? id : undefined,
          onclick: () => (open = !open),
        }
      : {
          [anchor]: attachAnchor,
          "aria-describedby": open ? id : undefined,
          onpointerenter: notTouch(() => show()),
          onpointerleave: notTouch(hideSoon),
          onfocus: (event) => {
            if (
              event.target instanceof HTMLElement &&
              event.target.matches(":focus-visible")
            ) {
              cancel();
              open = true;
            }
          },
          onblur: () => hide(),
          ontouchstart: () => show(delay),
          ontouchend: () => cancel(),
        },
  );

  const popupProps: Omit<PopoverProps, "children"> = $derived(
    click
      ? {}
      : {
          role: "tooltip",
          onpointerenter: notTouch(cancel),
          onpointerleave: notTouch(hideSoon),
        },
  );
</script>

{@render trigger?.(triggerProps)}

<Popover
  bind:open
  {id}
  {anchorEl}
  class={cn(
    rich
      ? "rounded-md border bg-m3-surface-container p-2 text-sm shadow shadow-m3-shadow/20"
      : "rounded-sm bg-m3-inverse-surface px-2 py-1 text-xs text-m3-inverse-on-surface",
    className,
  )}
  {...mergeProps(popupProps, restProps)}
/>
