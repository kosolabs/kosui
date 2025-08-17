<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLAttributes } from "svelte/elements";

  let {
    token,
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Heading> &
    HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<svelte:element this={`h${token.depth}`} {...restProps}>
  {@render children()}
</svelte:element>
