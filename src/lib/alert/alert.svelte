<script lang="ts" module>
  import {
    COLORS,
    RADII,
    type Color,
    type ColorProp,
    type Radius,
    type RadiusProp,
  } from "$lib/base.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  export const ALERT_VARIANT = ["filled", "tonal", "plain"] as const;
  export type AlertVariant = (typeof ALERT_VARIANT)[number];
  export type AlertVariantProp = { variant?: AlertVariant };

  export const ALERT_COLORS = COLORS;
  export type AlertColor = Color;
  export type AlertColorProp = ColorProp;

  export type AlertOutlined = boolean;
  export type AlertOutlinedProp = { outlined?: AlertOutlined };

  export type AlertElevated = boolean;
  export type AlertElevatedProp = { elevated?: AlertElevated };

  export const ALERT_RADII = RADII;
  export type AlertRadius = Radius;
  export type AlertRadiusProp = RadiusProp;

  export type AlertProps = {
    children: Snippet<[]>;
  } & AlertVariantProp &
    AlertColorProp &
    AlertRadiusProp &
    AlertOutlinedProp &
    AlertElevatedProp &
    HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  const {
    variant = "tonal",
    color = "primary",
    radius = "sm",
    outlined = false,
    elevated = false,
    children,
    class: className,
    ...props
  }: AlertProps = $props();
</script>

<div
  role="alert"
  class={[
    "base",
    `variant-${variant}`,
    `color-${color}`,
    `radius-${radius}`,
    outlined && "outlined",
    elevated && "elevated",
    className,
  ]}
  {...props}
>
  {@render children()}
</div>

<style>
  @import "../base.css";

  .base {
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius);
  }

  .variant-filled {
    background-color: var(--color-main);
    color: var(--color-on-main);
  }

  .variant-tonal {
    background-color: var(--color-tonal);
    color: var(--color-on-tonal);
  }

  .outlined {
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-main);
  }

  .elevated {
    box-shadow:
      0 1px 3px 0 rgb(from var(--color-shadow, rgb(0 0 0)) r g b / 0.2),
      0 1px 2px -1px rgb(from var(--color-shadow, rgb(0 0 0)) r g b / 0.2);
  }
</style>
