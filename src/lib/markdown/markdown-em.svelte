<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLAttributes } from "svelte/elements";

  let {
    children,
    ...restProps
  }: MarkdownComponentProps<Tokens.Em> & HTMLAttributes<HTMLElement> = $props();
</script>

<em {...restProps}>
  {@render children()}
</em>
