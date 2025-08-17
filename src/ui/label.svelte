<script lang="ts">
  import { type Snippet } from "svelte";
  import { type HTMLLabelAttributes } from "svelte/elements";

  export type LabelProps = {
    children: Snippet;
  } & HTMLLabelAttributes;
  let { children, ...restProps }: LabelProps = $props();
</script>

<label class="text-xs uppercase" {...restProps}>{@render children()}</label>
