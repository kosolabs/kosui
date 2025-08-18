<script lang="ts">
  import { type MarkdownComponentProps } from "$lib/markdown/index.js";
  import { type Tokens } from "marked";
  import { type HTMLAttributes } from "svelte/elements";

  let {
    ...restProps
  }: MarkdownComponentProps<Tokens.Hr> & HTMLAttributes<HTMLHRElement> =
    $props();
</script>

<hr {...restProps} />
