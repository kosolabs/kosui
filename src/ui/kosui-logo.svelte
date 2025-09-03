<script lang="ts">
  import { mergeProps } from "$lib/merge-props.js";
  import type { HTMLImgAttributes } from "svelte/elements";

  export type Props = HTMLImgAttributes;
  let { ...props }: Props = $props();
</script>

<img src="kosui.svg" alt="Kosui" {...mergeProps(props, { class: "size" })} />

<style>
  .size {
    width: 2.25em;
    height: 2.25em;
  }
</style>
