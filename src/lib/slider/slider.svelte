<script lang="ts" module>
  import {
    COLORS,
    RADII,
    SIZES,
    type Color,
    type ColorProp,
    type Radius,
    type RadiusProp,
    type Size,
    type SizeProp,
  } from "$lib/base.js";
  import { mergeProps } from "$lib/merge-props.js";
  import {
    setSliderContext,
    SliderContext,
    SliderHandle,
    SliderHandleLabel,
    SliderHandleLabelArrow,
    SliderMark,
    SliderMarkDot,
    SliderMarkLabel,
    type SliderHandleLabelArrowProps,
    type SliderHandleLabelProps,
    type SliderHandleProps,
    type SliderMarkDotProps,
    type SliderMarkLabelProps,
    type SliderMarkProps,
  } from "$lib/slider/index.js";
  import type { ClassName } from "$lib/utils.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { twMerge } from "tailwind-merge";

  export const SLIDER_COLORS = COLORS;
  export type SliderColor = Color;
  export type SliderColorProp = ColorProp;

  export const SLIDER_SIZES = SIZES;
  export type SliderSize = Size;
  export type SliderSizeProp = SizeProp;

  export const SLIDER_RADII = RADII;
  export type SliderRadius = Radius;
  export type SliderRadiusProp = RadiusProp;

  export type Mark = {
    value: number;
    label?: string;
  };

  export type SliderProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    marks?: Mark[];
    disabled?: boolean;
    label?: (value: number) => string;
    labelAlwaysOn?: boolean;
    inverted?: boolean;
    restrictToMarks?: boolean;
    onChange?: (value: number) => void;
    onChangeEnd?: (value: number) => void;
    sliderHandle?: Snippet<[SliderHandleProps]>;
    sliderHandleLabel?: Snippet<[SliderHandleLabelProps]>;
    sliderHandleLabelArrow?: Snippet<[SliderHandleLabelArrowProps]>;
    sliderMark?: Snippet<[SliderMarkProps]>;
    sliderMarkDot?: Snippet<[SliderMarkDotProps]>;
    sliderMarkLabel?: Snippet<[SliderMarkLabelProps]>;
  } & ClassName &
    SliderColorProp &
    SliderSizeProp &
    SliderRadiusProp &
    HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  let {
    value = $bindable(0),
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    disabled = false,
    label = (val: number) => val.toString(),
    labelAlwaysOn = false,
    inverted = false,
    restrictToMarks = false,
    onChange,
    onChangeEnd,
    sliderHandle = defaultSliderHandle,
    sliderHandleLabel = defaultSliderHandleLabel,
    sliderHandleLabelArrow = defaultSliderHandleLabelArrow,
    sliderMark = defaultSliderMark,
    sliderMarkDot = defaultSliderMarkDot,
    sliderMarkLabel = defaultSliderMarkLabel,
    class: className,
    color = "primary",
    size = "md",
    radius = "xl",
    ...restProps
  }: SliderProps = $props();

  const ctx = setSliderContext(
    new SliderContext(
      () => value,
      (newValue) => (value = newValue),
      () => min,
      () => max,
      () => step,
      () => marks,
      () => disabled,
      label,
      () => labelAlwaysOn,
      () => inverted,
      () => restrictToMarks,
      () => color,
      () => size,
      () => radius,
      onChange,
      onChangeEnd,
      sliderHandle,
      sliderHandleLabel,
      sliderHandleLabelArrow,
      sliderMark,
      sliderMarkDot,
      sliderMarkLabel,
    ),
  );
</script>

{#snippet defaultSliderHandle(props: SliderHandleProps)}
  <SliderHandle {...props} />
{/snippet}

{#snippet defaultSliderHandleLabel(props: SliderHandleLabelProps)}
  <SliderHandleLabel {...props} />
{/snippet}

{#snippet defaultSliderHandleLabelArrow(props: SliderHandleLabelArrowProps)}
  <SliderHandleLabelArrow {...props} />
{/snippet}

{#snippet defaultSliderMark(props: SliderMarkProps)}
  <SliderMark {...props} />
{/snippet}

{#snippet defaultSliderMarkDot(props: SliderMarkDotProps)}
  <SliderMarkDot {...props} />
{/snippet}

{#snippet defaultSliderMarkLabel(props: SliderMarkLabelProps)}
  <SliderMarkLabel {...props} />
{/snippet}

<!-- Track -->
<div
  bind:this={ctx.sliderEl}
  class={twMerge(
    "relative w-full cursor-pointer touch-none bg-m3-surface-container-highest select-none",

    ctx.disabled && "cursor-not-allowed opacity-50",

    ctx.radius === "xs" && "rounded-xs",
    ctx.radius === "sm" && "rounded-sm",
    ctx.radius === "md" && "rounded-lg",
    ctx.radius === "lg" && "rounded-2xl",
    ctx.radius === "xl" && "rounded-4xl",

    ctx.size === "xs" && "my-2.5 h-0.5",
    ctx.size === "sm" && "my-3 h-1",
    ctx.size === "md" && "my-3.5 h-2",
    ctx.size === "lg" && "my-4 h-3",
    ctx.size === "xl" && "my-4.5 h-4",

    className,
  )}
  {...mergeProps(restProps, {
    role: "slider",
    tabindex: ctx.disabled ? -1 : 0,
    "aria-valuenow": ctx.value,
    "aria-valuemin": ctx.min,
    "aria-valuemax": ctx.max,
    "aria-disabled": ctx.disabled,
    onpointerdown: ctx.pointerDown,
    onpointermove: ctx.pointerMove,
    onpointerup: ctx.pointerUp,
    onkeydown: ctx.keyDown,
    onfocus: ctx.focus,
    onblur: ctx.blur,
  })}
>
  <!-- Filled track -->
  <div
    class={twMerge(
      "absolute top-1/2 h-full -translate-y-1/2 transition-all",

      ctx.color === "primary" && "bg-m3-primary",
      ctx.color === "secondary" && "bg-m3-secondary",
      ctx.color === "tertiary" && "bg-m3-tertiary",
      ctx.color === "error" && "bg-m3-error",

      ctx.radius === "xs" && "rounded-xs",
      ctx.radius === "sm" && "rounded-sm",
      ctx.radius === "md" && "rounded-lg",
      ctx.radius === "lg" && "rounded-2xl",
      ctx.radius === "xl" && "rounded-4xl",
    )}
    style={ctx.inverted
      ? `right: 0; width: ${100 - ctx.position}%`
      : `left: 0; width: ${ctx.position}%`}
  ></div>

  <!-- Marks -->
  {#each marks as { value, label } (value)}
    {@render ctx.markRenderer({ value, label })}
  {/each}

  <!-- Handle -->
  <div
    class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all"
    style={`left: ${ctx.position}%`}
  >
    {@render ctx.handleRenderer({})}
  </div>
</div>
