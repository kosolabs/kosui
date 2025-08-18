<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLAttributes } from "svelte/elements";

  let {
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Def> & HTMLAttributes<HTMLElement> =
    $props();
</script>

<dfn {...restProps}>
  {@render children()}
</dfn>
