import {
  SliderContext,
  type Mark,
  type SliderColor,
  type SliderHandleLabelArrowProps,
  type SliderHandleLabelProps,
  type SliderHandleProps,
  type SliderMarkDotProps,
  type SliderMarkLabelProps,
  type SliderMarkProps,
  type SliderRadius,
  type SliderSize,
} from "$lib/slider/index.js";
import type { Snippet } from "svelte";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

// Mock Bindable class to avoid Svelte effect issues
vi.mock("$lib/bindable.svelte.js", () => ({
  Bindable: class MockBindable<T> {
    #value: T;
    #setValue!: (value: T) => void;

    constructor(value: T) {
      this.#value = value;
    }

    bind(getValue: () => T, setValue: (value: T) => void) {
      this.#setValue = setValue;
      this.#value = getValue();
    }

    get value() {
      return this.#value;
    }

    set value(value: T) {
      if (this.#value !== value) {
        this.#value = value;
        this.#setValue?.(value);
      }
    }
  },
}));

// Mock DOM getBoundingClientRect
const mockRect = {
  left: 0,
  width: 100,
  top: 0,
  height: 20,
  right: 100,
  bottom: 20,
  x: 0,
  y: 0,
  toJSON: () => {},
};

// Mock HTMLDivElement
const mockSliderEl = {
  getBoundingClientRect: vi.fn(() => mockRect),
  setPointerCapture: vi.fn(),
  releasePointerCapture: vi.fn(),
} as unknown as HTMLDivElement;

// Mock snippets
const mockSnippet = vi.fn() as unknown as Snippet;

describe("SliderContext", () => {
  let getValue: Mock<() => number>;
  let setValue: Mock<(value: number) => void>;
  let min: Mock<() => number>;
  let max: Mock<() => number>;
  let step: Mock<() => number>;
  let marks: Mock<() => Mark[]>;
  let disabled: Mock<() => boolean>;
  let label: (value: number) => string;
  let labelAlwaysOn: Mock<() => boolean>;
  let inverted: Mock<() => boolean>;
  let restrictToMarks: Mock<() => boolean>;
  let color: Mock<() => SliderColor>;
  let size: Mock<() => SliderSize>;
  let radius: Mock<() => SliderRadius>;
  let onChange: Mock<(value: number) => void>;
  let onChangeEnd: Mock<(value: number) => void>;
  let sliderContext: SliderContext;

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();

    getValue = vi.fn(() => 50);
    setValue = vi.fn();
    min = vi.fn(() => 0);
    max = vi.fn(() => 100);
    step = vi.fn(() => 1);
    marks = vi.fn(() => []);
    disabled = vi.fn(() => false);
    label = vi.fn((value: number) => `${value}`);
    labelAlwaysOn = vi.fn(() => false);
    inverted = vi.fn(() => false);
    restrictToMarks = vi.fn(() => false);
    color = vi.fn(() => "primary" as SliderColor);
    size = vi.fn(() => "md" as SliderSize);
    radius = vi.fn(() => "md" as SliderRadius);
    onChange = vi.fn();
    onChangeEnd = vi.fn();

    sliderContext = new SliderContext(
      getValue,
      setValue,
      min,
      max,
      step,
      marks,
      disabled,
      label,
      labelAlwaysOn,
      inverted,
      restrictToMarks,
      color,
      size,
      radius,
      onChange,
      onChangeEnd,
      mockSnippet as Snippet<[SliderHandleProps]>,
      mockSnippet as Snippet<[SliderHandleLabelProps]>,
      mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
      mockSnippet as Snippet<[SliderMarkProps]>,
      mockSnippet as Snippet<[SliderMarkDotProps]>,
      mockSnippet as Snippet<[SliderMarkLabelProps]>,
    );

    sliderContext.sliderEl = mockSliderEl;
  });

  describe("constructor", () => {
    it("should initialize with correct values", () => {
      expect(sliderContext.value).toBe(50);
      expect(sliderContext.min).toBe(0);
      expect(sliderContext.max).toBe(100);
      expect(sliderContext.step).toBe(1);
      expect(sliderContext.disabled).toBe(false);
      expect(sliderContext.label).toBe("50");
      expect(sliderContext.labelAlwaysOn).toBe(false);
      expect(sliderContext.inverted).toBe(false);
      expect(sliderContext.restrictToMarks).toBe(false);
      expect(sliderContext.color).toBe("primary");
      expect(sliderContext.size).toBe("md");
      expect(sliderContext.radius).toBe("md");
    });

    it("should initialize state properties", () => {
      expect(sliderContext.isHovered).toBe(false);
      expect(sliderContext.isDragging).toBe(false);
      expect(sliderContext.isFocused).toBe(false);
    });
  });

  describe("value getter/setter", () => {
    it("should get current value", () => {
      expect(sliderContext.value).toBe(50);
    });

    it("should set value and call onChange", () => {
      sliderContext.value = 75;
      expect(setValue).toHaveBeenCalledWith(75);
      expect(onChange).toHaveBeenCalledWith(75);
    });

    it("should clamp value to min/max bounds", () => {
      sliderContext.value = 150;
      expect(setValue).toHaveBeenCalledWith(100);
      expect(onChange).toHaveBeenCalledWith(100);

      sliderContext.value = -10;
      expect(setValue).toHaveBeenCalledWith(0);
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe("position", () => {
    it("should calculate position from value", () => {
      // Create a new context with the different value
      const newGetValue = vi.fn(() => 25);
      const newContext = new SliderContext(
        newGetValue,
        setValue,
        min,
        max,
        step,
        marks,
        disabled,
        label,
        labelAlwaysOn,
        inverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );

      expect(newContext.position).toBe(25);
    });

    it("should handle inverted position", () => {
      const newInverted = vi.fn(() => true);
      const newGetValue = vi.fn(() => 25);
      const newContext = new SliderContext(
        newGetValue,
        setValue,
        min,
        max,
        step,
        marks,
        disabled,
        label,
        labelAlwaysOn,
        newInverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );

      expect(newContext.position).toBe(75);
    });
  });

  describe("clamp", () => {
    it("should clamp values within bounds", () => {
      expect(sliderContext.clamp(50, 0, 100)).toBe(50);
      expect(sliderContext.clamp(-10, 0, 100)).toBe(0);
      expect(sliderContext.clamp(150, 0, 100)).toBe(100);
    });
  });

  describe("getPositionFromValue", () => {
    it("should convert value to position percentage", () => {
      expect(sliderContext.getPositionFromValue(0)).toBe(0);
      expect(sliderContext.getPositionFromValue(50)).toBe(50);
      expect(sliderContext.getPositionFromValue(100)).toBe(100);
    });

    it("should handle inverted slider", () => {
      const newInverted = vi.fn(() => true);
      const newContext = new SliderContext(
        getValue,
        setValue,
        min,
        max,
        step,
        marks,
        disabled,
        label,
        labelAlwaysOn,
        newInverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );

      expect(newContext.getPositionFromValue(0)).toBe(100);
      expect(newContext.getPositionFromValue(50)).toBe(50);
      expect(newContext.getPositionFromValue(100)).toBe(0);
    });
  });

  describe("getValueFromPosition", () => {
    it("should convert position to value", () => {
      expect(sliderContext.getValueFromPosition(0)).toBe(0);
      expect(sliderContext.getValueFromPosition(50)).toBe(50);
      expect(sliderContext.getValueFromPosition(100)).toBe(100);
    });

    it("should handle inverted slider", () => {
      const newInverted = vi.fn(() => true);
      const newContext = new SliderContext(
        getValue,
        setValue,
        min,
        max,
        step,
        marks,
        disabled,
        label,
        labelAlwaysOn,
        newInverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );
      newContext.sliderEl = mockSliderEl;

      expect(newContext.getValueFromPosition(0)).toBe(100);
      expect(newContext.getValueFromPosition(50)).toBe(50);
      expect(newContext.getValueFromPosition(100)).toBe(0);
    });

    it("should round to step values", () => {
      const newStep = vi.fn(() => 10);
      const newContext = new SliderContext(
        getValue,
        setValue,
        min,
        max,
        newStep,
        marks,
        disabled,
        label,
        labelAlwaysOn,
        inverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );
      newContext.sliderEl = mockSliderEl;

      expect(newContext.getValueFromPosition(37)).toBe(40);
      expect(newContext.getValueFromPosition(33)).toBe(30);
    });

    it("should restrict to marks when restrictToMarks is true", () => {
      const newRestrictToMarks = vi.fn(() => true);
      const newMarks = vi.fn(() => [
        { value: 25, label: "25%" },
        { value: 50, label: "50%" },
        { value: 75, label: "75%" },
      ]);
      const newContext = new SliderContext(
        getValue,
        setValue,
        min,
        max,
        step,
        newMarks,
        disabled,
        label,
        labelAlwaysOn,
        inverted,
        newRestrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );
      newContext.sliderEl = mockSliderEl;

      expect(newContext.getValueFromPosition(37)).toBe(25);
      expect(newContext.getValueFromPosition(60)).toBe(50);
      expect(newContext.getValueFromPosition(80)).toBe(75);
    });

    it("should clamp result to min/max bounds", () => {
      expect(sliderContext.getValueFromPosition(-10)).toBe(0);
      expect(sliderContext.getValueFromPosition(110)).toBe(100);
    });
  });

  describe("pointer events", () => {
    let mockEvent: PointerEvent;

    beforeEach(() => {
      mockEvent = {
        clientX: 50,
        pointerId: 1,
        preventDefault: vi.fn(),
        stopImmediatePropagation: vi.fn(),
      } as unknown as PointerEvent;
    });

    describe("pointerDown", () => {
      it("should start dragging and set value", () => {
        sliderContext.pointerDown(mockEvent);

        expect(sliderContext.isDragging).toBe(true);
        expect(mockSliderEl.setPointerCapture).toHaveBeenCalledWith(1);
        expect(sliderContext.value).toBe(50); // Check actual value instead of mock call
        expect(onChange).toHaveBeenCalledWith(50);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
      });
      it("should not start dragging when disabled", () => {
        const newDisabled = vi.fn(() => true);
        const newContext = new SliderContext(
          getValue,
          setValue,
          min,
          max,
          step,
          marks,
          newDisabled,
          label,
          labelAlwaysOn,
          inverted,
          restrictToMarks,
          color,
          size,
          radius,
          onChange,
          onChangeEnd,
          mockSnippet as Snippet<[SliderHandleProps]>,
          mockSnippet as Snippet<[SliderHandleLabelProps]>,
          mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
          mockSnippet as Snippet<[SliderMarkProps]>,
          mockSnippet as Snippet<[SliderMarkDotProps]>,
          mockSnippet as Snippet<[SliderMarkLabelProps]>,
        );
        newContext.sliderEl = mockSliderEl;
        vi.clearAllMocks(); // Clear mocks after context creation

        newContext.pointerDown(mockEvent);

        expect(newContext.isDragging).toBe(false);
        expect(mockSliderEl.setPointerCapture).not.toHaveBeenCalled();
      });
    });

    describe("pointerMove", () => {
      it("should update value when dragging", () => {
        sliderContext.isDragging = true;
        sliderContext.pointerMove(mockEvent);

        expect(sliderContext.value).toBe(50); // Check actual value instead of mock call
        expect(onChange).toHaveBeenCalledWith(50);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
      });

      it("should not update value when not dragging", () => {
        sliderContext.isDragging = false;
        sliderContext.pointerMove(mockEvent);

        expect(setValue).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
      });

      it("should not update value when disabled", () => {
        const newDisabled = vi.fn(() => true);
        const newContext = new SliderContext(
          getValue,
          setValue,
          min,
          max,
          step,
          marks,
          newDisabled,
          label,
          labelAlwaysOn,
          inverted,
          restrictToMarks,
          color,
          size,
          radius,
          onChange,
          onChangeEnd,
          mockSnippet as Snippet<[SliderHandleProps]>,
          mockSnippet as Snippet<[SliderHandleLabelProps]>,
          mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
          mockSnippet as Snippet<[SliderMarkProps]>,
          mockSnippet as Snippet<[SliderMarkDotProps]>,
          mockSnippet as Snippet<[SliderMarkLabelProps]>,
        );
        newContext.sliderEl = mockSliderEl;
        newContext.isDragging = true;
        vi.clearAllMocks(); // Clear mocks after setup

        newContext.pointerMove(mockEvent);

        expect(setValue).not.toHaveBeenCalled();
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    describe("pointerUp", () => {
      it("should stop dragging and call onChangeEnd", () => {
        sliderContext.isDragging = true;
        sliderContext.pointerUp(mockEvent);

        expect(sliderContext.isDragging).toBe(false);
        expect(mockSliderEl.releasePointerCapture).toHaveBeenCalledWith(1);
        expect(onChangeEnd).toHaveBeenCalledWith(50);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
      });

      it("should not do anything when not dragging", () => {
        sliderContext.isDragging = false;
        sliderContext.pointerUp(mockEvent);

        expect(mockSliderEl.releasePointerCapture).not.toHaveBeenCalled();
        expect(onChangeEnd).not.toHaveBeenCalled();
      });

      it("should not do anything when disabled", () => {
        const newDisabled = vi.fn(() => true);
        const newContext = new SliderContext(
          getValue,
          setValue,
          min,
          max,
          step,
          marks,
          newDisabled,
          label,
          labelAlwaysOn,
          inverted,
          restrictToMarks,
          color,
          size,
          radius,
          onChange,
          onChangeEnd,
          mockSnippet as Snippet<[SliderHandleProps]>,
          mockSnippet as Snippet<[SliderHandleLabelProps]>,
          mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
          mockSnippet as Snippet<[SliderMarkProps]>,
          mockSnippet as Snippet<[SliderMarkDotProps]>,
          mockSnippet as Snippet<[SliderMarkLabelProps]>,
        );
        newContext.sliderEl = mockSliderEl;
        newContext.isDragging = true;
        vi.clearAllMocks(); // Clear mocks after setup

        newContext.pointerUp(mockEvent);

        expect(newContext.isDragging).toBe(true);
        expect(mockSliderEl.releasePointerCapture).not.toHaveBeenCalled();
        expect(onChangeEnd).not.toHaveBeenCalled();
      });
    });
  });

  describe("keyboard events", () => {
    const createKeyboardEvent = (key: string): KeyboardEvent =>
      ({
        key,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        preventDefault: vi.fn(),
        stopImmediatePropagation: vi.fn(),
      }) as unknown as KeyboardEvent;

    it("should increase value on arrow up", () => {
      const mockEvent = createKeyboardEvent("ArrowUp");
      sliderContext.keyDown(mockEvent);

      expect(sliderContext.value).toBe(51); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(51);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
    });

    it("should increase value on arrow right", () => {
      const mockEvent = createKeyboardEvent("ArrowRight");
      sliderContext.keyDown(mockEvent);

      expect(sliderContext.value).toBe(51); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(51);
    });

    it("should decrease value on arrow down", () => {
      const mockEvent = createKeyboardEvent("ArrowDown");
      sliderContext.keyDown(mockEvent);

      expect(sliderContext.value).toBe(49); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(49);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopImmediatePropagation).toHaveBeenCalled();
    });

    it("should decrease value on arrow left", () => {
      const mockEvent = createKeyboardEvent("ArrowLeft");
      sliderContext.keyDown(mockEvent);

      expect(sliderContext.value).toBe(49); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(49);
    });

    it("should set to minimum on Home key", () => {
      const mockEvent = createKeyboardEvent("Home");
      sliderContext.keyDown(mockEvent);

      expect(sliderContext.value).toBe(0); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(0);
    });

    it("should set to maximum on End key", () => {
      const mockEvent = createKeyboardEvent("End");
      sliderContext.keyDown(mockEvent);

      expect(sliderContext.value).toBe(100); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(100);
    });

    it("should use custom step size", () => {
      const newStep = vi.fn(() => 5);
      const newContext = new SliderContext(
        getValue,
        setValue,
        min,
        max,
        newStep,
        marks,
        disabled,
        label,
        labelAlwaysOn,
        inverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );
      vi.clearAllMocks(); // Clear mocks after setup

      const mockEvent = createKeyboardEvent("ArrowUp");
      newContext.keyDown(mockEvent);

      expect(newContext.value).toBe(55); // Check actual value instead of mock call
      expect(onChangeEnd).toHaveBeenCalledWith(55);
    });

    it("should not handle keys when disabled", () => {
      const newDisabled = vi.fn(() => true);
      const newContext = new SliderContext(
        getValue,
        setValue,
        min,
        max,
        step,
        marks,
        newDisabled,
        label,
        labelAlwaysOn,
        inverted,
        restrictToMarks,
        color,
        size,
        radius,
        onChange,
        onChangeEnd,
        mockSnippet as Snippet<[SliderHandleProps]>,
        mockSnippet as Snippet<[SliderHandleLabelProps]>,
        mockSnippet as Snippet<[SliderHandleLabelArrowProps]>,
        mockSnippet as Snippet<[SliderMarkProps]>,
        mockSnippet as Snippet<[SliderMarkDotProps]>,
        mockSnippet as Snippet<[SliderMarkLabelProps]>,
      );
      vi.clearAllMocks(); // Clear mocks after setup

      const mockEvent = createKeyboardEvent("ArrowUp");
      newContext.keyDown(mockEvent);

      expect(setValue).not.toHaveBeenCalled();
      expect(onChangeEnd).not.toHaveBeenCalled();
    });

    it("should ignore unknown keys", () => {
      vi.clearAllMocks(); // Clear mocks before test

      const mockEvent = createKeyboardEvent("a");
      sliderContext.keyDown(mockEvent);

      // Should still call onChangeEnd but with current value, and not change value
      expect(sliderContext.value).toBe(50); // Value should remain unchanged
      expect(onChangeEnd).toHaveBeenCalledWith(50); // But still calls onChangeEnd
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    });
  });

  describe("focus events", () => {
    it("should set focused state on focus", () => {
      expect(sliderContext.isFocused).toBe(false);
      sliderContext.focus();
      expect(sliderContext.isFocused).toBe(true);
    });

    it("should unset focused state on blur", () => {
      sliderContext.isFocused = true;
      sliderContext.blur();
      expect(sliderContext.isFocused).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("should handle zero step size gracefully", () => {
      step.mockReturnValue(0);
      // Should not cause infinite loop or crash
      expect(() => sliderContext.getValueFromPosition(50)).not.toThrow();
    });

    it("should handle empty marks array", () => {
      restrictToMarks.mockReturnValue(true);
      marks.mockReturnValue([]);
      // Should fall back to step-based rounding
      expect(sliderContext.getValueFromPosition(37)).toBe(37);
    });

    it("should handle single mark", () => {
      restrictToMarks.mockReturnValue(true);
      marks.mockReturnValue([{ value: 42 }]);
      expect(sliderContext.getValueFromPosition(20)).toBe(42);
      expect(sliderContext.getValueFromPosition(80)).toBe(42);
    });

    it("should handle min === max", () => {
      min.mockReturnValue(50);
      max.mockReturnValue(50);
      expect(sliderContext.getPositionFromValue(50)).toBe(NaN); // Division by zero
      expect(sliderContext.getValueFromPosition(50)).toBe(50);
    });

    it("should handle very large step sizes", () => {
      step.mockReturnValue(1000);
      expect(sliderContext.getValueFromPosition(37)).toBe(0);
    });
  });

  describe("boundary conditions", () => {
    it("should respect clamping with custom ranges", () => {
      min.mockReturnValue(20);
      max.mockReturnValue(80);

      sliderContext.value = 10;
      expect(setValue).toHaveBeenCalledWith(20);

      sliderContext.value = 90;
      expect(setValue).toHaveBeenCalledWith(80);
    });

    it("should handle negative ranges", () => {
      min.mockReturnValue(-50);
      max.mockReturnValue(50);
      getValue.mockReturnValue(0);

      expect(sliderContext.getPositionFromValue(-25)).toBe(25);
      expect(sliderContext.getPositionFromValue(25)).toBe(75);
    });
  });
});
