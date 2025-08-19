import { Bindable } from "$lib/bindable.svelte.js";
import { Shortcut } from "$lib/shortcut/shortcut.js";
import type {
  SliderColor,
  SliderHandleLabelArrowProps,
  SliderHandleLabelProps,
  SliderHandleProps,
  SliderMarkDotProps,
  SliderMarkLabelProps,
  SliderMarkProps,
  SliderRadius,
  SliderSize,
} from "$lib/slider/index.js";
import { getContext, setContext, type Snippet } from "svelte";

export type Mark = {
  value: number;
  label?: string;
};

export class SliderContext {
  #value: Bindable<number>;
  #min: () => number;
  #max: () => number;
  #step: () => number;
  #marks: () => Mark[];
  #disabled: () => boolean;
  #label: (value: number) => string;
  #labelAlwaysOn: () => boolean;
  #inverted: () => boolean;
  #restrictToMarks: () => boolean;
  #color: () => SliderColor;
  #size: () => SliderSize;
  #radius: () => SliderRadius;
  onChange: ((value: number) => void) | undefined;
  onChangeEnd: ((value: number) => void) | undefined;
  handleRenderer: Snippet<[SliderHandleProps]>;
  handleLabelRenderer: Snippet<[SliderHandleLabelProps]>;
  handleLabelArrowRenderer: Snippet<[SliderHandleLabelArrowProps]>;
  markRenderer: Snippet<[SliderMarkProps]>;
  markDotRenderer: Snippet<[SliderMarkDotProps]>;
  markLabelRenderer: Snippet<[SliderMarkLabelProps]>;
  sliderEl!: HTMLDivElement;
  isHovered: boolean = $state(false);
  isDragging: boolean = $state(false);
  isFocused: boolean = $state(false);

  constructor(
    getValue: () => number,
    setValue: (val: number) => void,
    min: () => number,
    max: () => number,
    step: () => number,
    marks: () => Mark[],
    disabled: () => boolean,
    label: (value: number) => string,
    labelAlwaysOn: () => boolean,
    inverted: () => boolean,
    restrictToMarks: () => boolean,
    color: () => SliderColor,
    size: () => SliderSize,
    radius: () => SliderRadius,
    onChange: ((value: number) => void) | undefined,
    onChangeEnd: ((value: number) => void) | undefined,
    handleRenderer: Snippet<[SliderHandleProps]>,
    handleLabelRenderer: Snippet<[SliderHandleLabelProps]>,
    handleLabelArrowRenderer: Snippet<[SliderHandleLabelArrowProps]>,
    markRenderer: Snippet<[SliderMarkProps]>,
    markDotRenderer: Snippet<[SliderMarkDotProps]>,
    markLabelRenderer: Snippet<[SliderMarkLabelProps]>,
  ) {
    this.#value = new Bindable(getValue());
    this.#value.bind(getValue, setValue);
    this.#min = min;
    this.#max = max;
    this.#step = step;
    this.#marks = marks;
    this.#disabled = disabled;
    this.#label = label;
    this.#labelAlwaysOn = labelAlwaysOn;
    this.#inverted = inverted;
    this.#restrictToMarks = restrictToMarks;
    this.#color = color;
    this.#size = size;
    this.#radius = radius;
    this.onChange = onChange;
    this.onChangeEnd = onChangeEnd;
    this.handleRenderer = handleRenderer;
    this.handleLabelRenderer = handleLabelRenderer;
    this.handleLabelArrowRenderer = handleLabelArrowRenderer;
    this.markRenderer = markRenderer;
    this.markDotRenderer = markDotRenderer;
    this.markLabelRenderer = markLabelRenderer;
  }

  get value(): number {
    return this.#value.value;
  }

  set value(value: number) {
    this.#value.value = this.clamp(value, this.min, this.max);
    this.onChange?.(this.value);
  }

  get min(): number {
    return this.#min();
  }

  get max(): number {
    return this.#max();
  }

  get step(): number {
    return this.#step();
  }

  get marks(): Mark[] {
    return this.#marks();
  }

  get disabled(): boolean {
    return this.#disabled();
  }

  get label(): string {
    return this.#label(this.value);
  }

  get labelAlwaysOn(): boolean {
    return this.#labelAlwaysOn();
  }

  get inverted(): boolean {
    return this.#inverted();
  }

  get restrictToMarks(): boolean {
    return this.#restrictToMarks();
  }

  get color(): SliderColor {
    return this.#color();
  }

  get size(): SliderSize {
    return this.#size();
  }

  get radius(): SliderRadius {
    return this.#radius();
  }

  get position(): number {
    return this.getPositionFromValue(this.value);
  }

  clamp = (val: number, minVal: number, maxVal: number): number => {
    return Math.min(Math.max(val, minVal), maxVal);
  };

  getValueFromPosition = (position: number): number => {
    const rect = this.sliderEl.getBoundingClientRect();
    const percentage = this.clamp((position - rect.left) / rect.width, 0, 1);
    const range = this.max - this.min;
    let newValue =
      this.min + (this.inverted ? 1 - percentage : percentage) * range;

    if (this.restrictToMarks && this.marks.length > 0) {
      // Find closest mark
      const closest = this.marks.reduce((prev, curr) =>
        Math.abs(curr.value - newValue) < Math.abs(prev.value - newValue)
          ? curr
          : prev,
      );
      newValue = closest.value;
    } else {
      // Round to step
      newValue = Math.round(newValue / this.step) * this.step;
    }

    return this.clamp(newValue, this.min, this.max);
  };

  getPositionFromValue = (val: number): number => {
    const percentage = (val - this.min) / (this.max - this.min);
    return this.inverted ? (1 - percentage) * 100 : percentage * 100;
  };

  pointerDown = (event: PointerEvent) => {
    if (this.disabled) return;

    this.isDragging = true;
    this.sliderEl.setPointerCapture(event.pointerId);

    this.value = this.getValueFromPosition(event.clientX);

    event.preventDefault();
    event.stopImmediatePropagation();
  };

  pointerMove = (event: PointerEvent) => {
    if (this.disabled || !this.isDragging) return;

    this.value = this.getValueFromPosition(event.clientX);

    event.preventDefault();
    event.stopImmediatePropagation();
  };

  pointerUp = (event: PointerEvent) => {
    if (this.disabled || !this.isDragging) return;

    this.isDragging = false;
    this.sliderEl.releasePointerCapture(event.pointerId);
    this.onChangeEnd?.(this.value);

    event.preventDefault();
    event.stopImmediatePropagation();
  };

  keyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    if (
      Shortcut.ARROW_UP.matches(event) ||
      Shortcut.ARROW_RIGHT.matches(event)
    ) {
      this.value = this.value + this.step;
      event.preventDefault();
      event.stopImmediatePropagation();
    } else if (
      Shortcut.ARROW_DOWN.matches(event) ||
      Shortcut.ARROW_LEFT.matches(event)
    ) {
      this.value = this.value - this.step;
      event.preventDefault();
      event.stopImmediatePropagation();
    } else if (Shortcut.HOME.matches(event)) {
      this.value = this.min;
    } else if (Shortcut.END.matches(event)) {
      this.value = this.max;
    }

    this.onChangeEnd?.(this.value);
  };

  focus = () => {
    this.isFocused = true;
  };

  blur = () => {
    this.isFocused = false;
  };
}

export function setSliderContext(state: SliderContext): SliderContext {
  return setContext<SliderContext>(SliderContext, state);
}

export function getSliderContext(): SliderContext {
  const ctx = getContext<SliderContext>(SliderContext);
  if (!ctx) throw new Error("SliderContext is undefined");
  return ctx;
}
