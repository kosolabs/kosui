<script lang="ts" module>
  import {
    type Color,
    type ColorProp,
    type Shape,
    type ShapeProp,
    type Size,
    type SizeProp,
  } from "#lib/base.js";
  import { cn, type ClassName } from "#lib/utils.js";
  import type { HTMLInputAttributes } from "svelte/elements";

  export type SliderMark = {
    value: number;
    label?: string;
  };

  export type SliderProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number | "any";
    marks?: SliderMark[];
    format?: (value: number) => string;
    showValue?: boolean;
    el?: HTMLInputElement;
  } & ClassName &
    ColorProp &
    SizeProp &
    ShapeProp &
    Omit<
      HTMLInputAttributes,
      "type" | "value" | "min" | "max" | "step" | "size" | "class"
    >;

  const SIZES: Record<Size, string> = {
    xs: "[--height:1.25rem] [--thumb:0.75rem] [--track:0.25rem]",
    sm: "[--height:1.5rem] [--thumb:1rem] [--track:0.375rem]",
    md: "[--height:1.75rem] [--thumb:1.25rem] [--track:0.5rem]",
    lg: "[--height:2rem] [--thumb:1.5rem] [--track:0.625rem]",
    xl: "[--height:2.25rem] [--thumb:1.75rem] [--track:0.75rem]",
  };

  const SHAPES: Record<Shape, string> = {
    none: "[--radius:0]",
    xs: "[--radius:0.25rem]",
    sm: "[--radius:0.5rem]",
    md: "[--radius:0.75rem]",
    lg: "[--radius:1rem]",
    xl: "[--radius:1.75rem]",
    full: "[--radius:9999px]",
  };

  const COLORS: Record<Color, string> = {
    primary: "text-m3-primary",
    secondary: "text-m3-secondary",
    tertiary: "text-m3-tertiary",
    error: "text-m3-error",
    plain: "",
    inherit: "",
  };

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);
</script>

<script lang="ts">
  let {
    value = $bindable(),
    min = 0,
    max = 100,
    step = 1,
    marks = [],
    format = String,
    showValue = false,
    el = $bindable(),
    class: className,
    color = "primary",
    size = "sm",
    shape = "full",
    disabled,
    ...restProps
  }: SliderProps = $props();

  const fractionOf = (at: number) =>
    max > min ? (clamp(at, min, max) - min) / (max - min) : 0;

  let current = $derived(value ?? (min + max) / 2);
  let text = $derived(format(current));
</script>

<div
  class={cn(
    "slider relative w-full",
    SIZES[size],
    SHAPES[shape],
    COLORS[color],
    marks.some((mark) => mark.label) && "pb-5",
    disabled && "opacity-38",
    className,
  )}
  style:--fraction={fractionOf(current)}
>
  <input
    bind:this={el}
    bind:value
    type="range"
    {min}
    {max}
    {step}
    {disabled}
    aria-valuetext={text}
    class="peer block h-(--height) w-full cursor-pointer appearance-none bg-transparent disabled:cursor-not-allowed"
    {...restProps}
  />

  {#if marks.length > 0}
    <div aria-hidden="true" class="pointer-events-none">
      {#each marks as mark (mark.value)}
        {#if mark.value !== current}
          <span
            class="at dot absolute top-[calc(var(--height)/2)] size-1 -translate-1/2 rounded-full"
            class:filled={mark.value <= current}
            style:--at={fractionOf(mark.value)}
          ></span>
        {/if}
        {#if mark.label}
          <span
            class="at absolute top-(--height) -translate-x-1/2 pt-1 text-xs whitespace-nowrap text-m3-on-surface-variant"
            style:--at={fractionOf(mark.value)}
          >
            {mark.label}
          </span>
        {/if}
      {/each}
    </div>
  {/if}

  <span
    aria-hidden="true"
    class={cn(
      "at pointer-events-none absolute bottom-full mb-1 -translate-x-1/2 rounded-md bg-m3-inverse-surface px-2 py-1 text-xs whitespace-nowrap text-m3-inverse-on-surface opacity-0 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100 peer-active:opacity-100",
      showValue && "opacity-100",
      disabled && "hidden",
    )}
    style:--at={fractionOf(current)}
  >
    {text}
  </span>
</div>

<style>
  .slider {
    --fill-at: calc(var(--thumb) / 2 + (100% - var(--thumb)) * var(--fraction));
    --track-fill: linear-gradient(
      to right,
      currentColor var(--fill-at),
      color-mix(in oklab, currentColor 24%, transparent) var(--fill-at)
    );
  }

  .at {
    left: calc(var(--thumb) / 2 + (100% - var(--thumb)) * var(--at));
  }

  .dot {
    background: currentColor;
  }

  .dot.filled {
    background: var(--md-sys-color-surface);
  }

  input::-webkit-slider-runnable-track {
    height: var(--track);
    border-radius: var(--radius);
    background: var(--track-fill);
  }

  input::-moz-range-track {
    height: var(--track);
    border-radius: var(--radius);
    background: var(--track-fill);
  }

  input::-webkit-slider-thumb {
    appearance: none;
    width: var(--thumb);
    height: var(--thumb);
    margin-top: calc((var(--track) - var(--thumb)) / 2);
    border-radius: var(--radius);
    background: currentColor;
    box-shadow: 0 0 0 2px var(--md-sys-color-surface);
  }

  input::-moz-range-thumb {
    width: var(--thumb);
    height: var(--thumb);
    border: none;
    border-radius: var(--radius);
    background: currentColor;
    box-shadow: 0 0 0 2px var(--md-sys-color-surface);
  }

  input:focus-visible {
    outline: none;
  }

  input:focus-visible::-webkit-slider-thumb {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }

  input:focus-visible::-moz-range-thumb {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
</style>
