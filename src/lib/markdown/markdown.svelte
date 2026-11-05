<script module lang="ts">
  import { cn, type ClassName, type ElementRef } from "#lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import MarkdownTokens from "./markdown-tokens.svelte";
  import { parse } from "./parse.js";
  import type { MarkdownRenderers } from "./types.js";

  export type MarkdownProps = {
    value: string;
    gfm?: boolean;
    breaks?: boolean;
  } & MarkdownRenderers &
    ElementRef &
    ClassName &
    Omit<HTMLAttributes<HTMLDivElement>, "children">;
</script>

<script lang="ts">
  let {
    value,
    gfm = true,
    breaks = false,
    el = $bindable(),
    class: className,
    blockquote,
    br,
    code,
    codespan,
    del,
    em,
    heading,
    hr,
    html,
    image,
    link,
    list,
    listItem,
    paragraph,
    strong,
    table,
    tableCell,
    text,
    ...restProps
  }: MarkdownProps = $props();

  const tokens = $derived(parse(value, { gfm, breaks }));
  const renderers: MarkdownRenderers = $derived({
    blockquote,
    br,
    code,
    codespan,
    del,
    em,
    heading,
    hr,
    html,
    image,
    link,
    list,
    listItem,
    paragraph,
    strong,
    table,
    tableCell,
    text,
  });
</script>

<div
  bind:this={el}
  class={cn("flex flex-col gap-3 wrap-break-word", className)}
  {...restProps}
>
  <MarkdownTokens {tokens} {renderers} />
</div>
