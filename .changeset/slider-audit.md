---
"kosui": minor
---

Slider is a styled `<input type="range">`, so the keyboard, pointer, touch, forms and screen readers work natively, and it shows its value in every color.

- Arrow keys, Page Up and Page Down, Home and End work, and the slider takes part in forms with `name`.
- `format` turns the value into text for the value label and for `aria-valuetext`, so screen readers announce "40%" or "Medium".
- The thumb and filled track use the slider's color, including plain and inherit, where before they were invisible.
- Marks and their labels are decoration out of the tab order, where before each label was a hidden button and a Tab stop.
- Sizes sit inside the shared row: the input is 20 to 36 pixels tall, 24 or more from `sm` up. The default size is now `sm`.
- **Breaking:** `label` is now `format`, and `labelAlwaysOn` is now `showValue`.
- **Breaking:** `onChange` and `onChangeEnd` are removed; use the native `oninput` and `onchange`.
- **Breaking:** `inverted`, `restrictToMarks` and the `sliderHandle`, `sliderHandleLabel`, `sliderHandleLabelArrow`, `sliderMark`, `sliderMarkDot` and `sliderMarkLabel` snippets are removed, along with the `SliderHandle`, `SliderHandleLabel`, `SliderHandleLabelArrow`, `SliderMark`, `SliderMarkDot` and `SliderMarkLabel` components and `SliderContext`, `getSliderContext` and `setSliderContext`.
- **Breaking:** `Mark` is now `SliderMark`, and `SLIDER_COLORS`, `SLIDER_SIZES`, `SliderColor`, `SliderColorProp`, `SliderSize` and `SliderSizeProp` are removed; use `COLORS`, `SIZES` and their types.
- **Breaking:** attributes, events and `el` go to the `<input>`; `class` goes to the wrapper that also holds the marks and value label.
