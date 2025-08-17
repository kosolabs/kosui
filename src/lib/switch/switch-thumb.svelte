<script lang="ts" module>
  import type {
    SwitchColorProp,
    SwitchRadiusProp,
    SwitchSizeProp,
  } from "$lib/switch";
  import type { ClassName } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export type SwitchThumbProps = {} & ClassName &
    SwitchColorProp &
    SwitchSizeProp &
    SwitchRadiusProp &
    HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  let {
    class: className,
    color = "primary",
    size = "sm",
    radius = "xl",
    ...restProps
  }: SwitchThumbProps = $props();
</script>

<div
  class={twMerge(
    "absolute top-0.5 left-0.5 shadow-sm transition-all",

    color === "primary" && "bg-m3-on-primary",
    color === "secondary" && "bg-m3-on-secondary",
    color === "tertiary" && "bg-m3-on-tertiary",
    color === "error" && "bg-m3-on-error",

    size === "xs" && "size-3 group-aria-checked:translate-x-4",
    size === "sm" && "size-4 group-aria-checked:translate-x-5",
    size === "md" && "size-5 group-aria-checked:translate-x-6",
    size === "lg" && "size-6 group-aria-checked:translate-x-7",
    size === "xl" && "size-7 group-aria-checked:translate-x-8",

    radius === "xs" && "rounded-xs",
    radius === "sm" && "rounded-sm",
    radius === "md" && "rounded-lg",
    radius === "lg" && "rounded-2xl",
    radius === "xl" && "rounded-4xl",

    className,
  )}
  {...restProps}
></div>
