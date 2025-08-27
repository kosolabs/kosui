<script module lang="ts">
  import type { ClassName } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type DividerProps = {} & ClassName & HTMLAttributes<HTMLHRElement>;
</script>

<script lang="ts">
  let { class: className, ...restProps }: DividerProps = $props();
</script>

<hr class={twMerge("-mx-1 my-1", className)} {...restProps} />
