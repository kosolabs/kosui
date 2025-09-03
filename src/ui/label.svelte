<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLLabelAttributes } from "svelte/elements";

  export type LabelProps = {
    children: Snippet;
  } & HTMLLabelAttributes;
  let { children, ...restProps }: LabelProps = $props();
</script>

<label class="label" {...restProps}>{@render children()}</label>

<style>
  .label {
    font-size: var(--text-xs);
    text-transform: uppercase;
  }
</style>
