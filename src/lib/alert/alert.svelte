<script lang="ts" module>
  import {
    COLORS,
    RADII,
    type Color,
    type ColorProp,
    type Radius,
    type RadiusProp,
  } from "$lib/base.js";
  import { mergeProps } from "$lib/merge-props.js";
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
    ...props
  }: AlertProps = $props();
</script>

<div
  role="alert"
  {...mergeProps(props, {
    class: [
      "base",
      `radius-${radius}`,
      `variant-${variant}`,
      `color-${color}`,
      outlined && "outlined",
      elevated && "elevated",
    ],
  })}
>
  {@render children()}
</div>

<style>
  .base {
    padding: calc(var(--spacing) * 4);
  }

  .elevated {
    box-shadow:
      0 1px 3px 0 rgb(from var(--md-sys-color-shadow, rgb(0 0 0)) r g b / 0.2),
      0 1px 2px -1px
        rgb(from var(--md-sys-color-shadow, rgb(0 0 0)) r g b / 0.2);
  }

  .variant-filled.color-primary {
    background-color: var(--md-sys-color-primary);
    color: var(--md-sys-color-on-primary);
  }

  .variant-filled.color-secondary {
    background-color: var(--md-sys-color-secondary);
    color: var(--md-sys-color-on-secondary);
  }

  .variant-filled.color-tertiary {
    background-color: var(--md-sys-color-tertiary);
    color: var(--md-sys-color-on-tertiary);
  }

  .variant-filled.color-error {
    background-color: var(--md-sys-color-error);
    color: var(--md-sys-color-on-error);
  }

  .variant-filled.color-plain {
    background-color: var(--md-sys-color-inverse-surface);
    color: var(--md-sys-color-inverse-on-surface);
  }

  .variant-tonal.color-primary {
    background-color: var(--md-sys-color-primary-container);
    color: var(--md-sys-color-on-primary-container);
  }

  .variant-tonal.color-secondary {
    background-color: var(--md-sys-color-secondary-container);
    color: var(--md-sys-color-on-secondary-container);
  }

  .variant-tonal.color-tertiary {
    background-color: var(--md-sys-color-tertiary-container);
    color: var(--md-sys-color-on-tertiary-container);
  }

  .variant-tonal.color-error {
    background-color: var(--md-sys-color-error-container);
    color: var(--md-sys-color-on-error-container);
  }

  .variant-tonal.color-plain {
    background-color: var(--md-sys-color-surface-variant);
    color: var(--md-sys-color-on-surface-variant);
  }

  .outlined {
    border-width: 1px;
    border-style: solid;
  }

  .outlined.color-primary {
    border-color: var(--md-sys-color-primary);
  }

  .outlined.color-secondary {
    border-color: var(--md-sys-color-secondary);
  }

  .outlined.color-tertiary {
    border-color: var(--md-sys-color-tertiary);
  }

  .outlined.color-error {
    border-color: var(--md-sys-color-error);
  }

  .outlined.color-plain {
    border-color: var(--md-sys-color-outline);
  }

  .radius-none {
    border-radius: 0;
  }

  .radius-xs {
    border-radius: var(--radius-xs);
  }

  .radius-sm {
    border-radius: var(--radius-sm);
  }

  .radius-md {
    border-radius: var(--radius-lg);
  }

  .radius-lg {
    border-radius: var(--radius-2xl);
  }

  .radius-xl {
    border-radius: var(--radius-4xl);
  }

  .radius-full {
    border-radius: calc(infinity * 1px);
  }
</style>
