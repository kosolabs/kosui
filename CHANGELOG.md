# kosui

## 0.5.1

### Patch Changes

- e46460b: Fix `Modal`, `Drawer` and `Dialog` not closing on a backdrop click or tap in Safari, which doesn't support `closedby="any"`. A press that starts or ends inside the modal no longer closes it.

## 0.5.0

### Minor Changes

- 403b3ae: Add `Drawer`, `NavItem` and `NavGroup`.

  - `Drawer` is a Modal that slides in from the start or end edge, for navigation on small screens or a panel like filters.
  - `NavItem` is a link in a navigation list. `current` marks it with a filled indicator and `aria-current="page"`. It takes `icon`, `size` and `shape`.
  - `NavGroup` labels a group of nav items.
  - `Modal` takes a `transition` for opening and closing.

## 0.4.0

### Minor Changes

- d0c5602: Alert is a Box with `role="alert"`, so it takes the shared `variant`, `color` and `shape`.

  - **Breaking:** Alert takes all six shared variants, and no longer takes `outlined`, `elevated` or `radius`. Use `variant="outlined"` or `variant="elevated"`, and `shape` for corners. For the old outlined-and-elevated look, use `variant="elevated"` with `class="border"`.
  - **Breaking:** `ALERT_COLORS`, `ALERT_RADII`, `ALERT_VARIANT` and the `AlertColor`, `AlertColorProp`, `AlertElevated`, `AlertElevatedProp`, `AlertOutlined`, `AlertOutlinedProp`, `AlertRadius`, `AlertRadiusProp`, `AlertVariant` and `AlertVariantProp` types are gone. Use the shared types, like `Variant` and `Color`.
  - Alert takes a bindable `el`.
  - Alert's docs show `role="status"` for messages that shouldn't interrupt screen readers.

- 4e24840: Autocomplete is one component that follows the ARIA combobox pattern: pass the matching `options` and it opens, highlights and fills the field itself.

  - The field is a `combobox` with `aria-expanded`, `aria-controls` and `aria-activedescendant`, pointing at a `listbox` of `option`s, so screen readers announce the highlighted suggestion.
  - The list opens while typing when there are options, and Down or Up Arrow opens it too. Escape, Tab or leaving the field closes it.
  - Choosing an option with Enter or a click fills the field with its label, closes the list and calls `onSelect`. With nothing highlighted, Enter submits the form.
  - The list is at least as wide as the field and uses Material 3's menu surface.
  - **Breaking:** `<Autocomplete bind:value options={matches} />` replaces `Autocomplete`, `AutocompleteInput`, `AutocompleteContent` and `AutocompleteItem`. Options can be any type, with `getOptionLabel` for their text and an `option` snippet for custom rendering, and every Input prop passes through to the field.
  - **Breaking:** `AutocompleteContext`, `getAutocompleteContext` and `setAutocompleteContext` are removed.

- 2884bf7: - **Breaking:** `Avatar`'s `alt` now names the avatar itself (`role="img"` with `aria-label`), so the name holds whether it shows the picture or the fallback. Without `alt`, the avatar is decorative and its picture gets `alt=""`.
  - **Breaking:** `Avatar` no longer accepts Box's `centered` and `backdrop` props.
  - After a picture fails to load, a new `src` is tried instead of staying on the fallback.
  - Pictures are cropped to fill the avatar instead of being letterboxed.
  - Fallback text scales with the avatar's size.
- 4d5fb30: - **Breaking:** `Badge` defaults to `color="error"`, as Material 3 badges do. Pass `color="primary"` to keep the old look.
  - **Breaking:** `Badge` no longer accepts Box's `shape`, `backdrop` and `centered` props, which it ignored or always set.
  - `Badge` passes every other attribute, event handler and attachment to the badge's element, and `bind:el` binds it. `BadgeProps` is now exported.
  - `Badge` renders `<span>`s instead of `<div>`s, so it's valid inside a button, and its wrapper fits its element, so the badge stays on the element in any container.
  - The badge comes after its element, so screen readers read the element first, and it grows into a pill for longer content like `999+`.
  - `content` also accepts a snippet, for icons.
- 0a5b243: Box is a `<div>` with the shared `variant`, `color` and `shape`, and nothing else of its own.

  - **Breaking:** Box no longer takes `centered` or `backdrop`. Use `class="flex items-center justify-center"` for `centered` and `class="bg-m3-surface-container"` for `backdrop`. `backdrop` was also silently ignored with the elevated, filled and tonal variants.
  - **Breaking:** Skeleton no longer takes `backdrop`. It keeps its surface background unless you give it a `variant`, and `class` can still change it.
  - Box has a docs page.

- 161e001: Breadcrumbs follow the ARIA breadcrumb pattern and behave like their `<nav>`.

  - **Breaking:** Breadcrumbs render `<nav aria-label="Breadcrumb">` with an ordered list of levels, instead of a `<div>`. Separators are hidden from screen readers, and the last crumb is marked `aria-current="page"` and shown in the surrounding text color.
  - **Breaking:** Attributes, event handlers and attachments go to the `<nav>` instead of to every link, and `el` binds the `<nav>`. Of the old link props, only `color` remains, and it colors the links.
  - Two levels with the same title no longer crash.
  - Long trails wrap between levels.
  - `BreadcrumbsProps` and `Crumb` are exported.

- 71cc665: - **Breaking:** `Link` is for text links only, so its `variant` and `shape` props are gone. To migrate, use `<Button href>` for navigation that should look like a button.
  - `Button` accepts `href` and renders an `<a>` with all of Button's variants. The new `ButtonActionProps` and `ButtonLinkProps` types describe each form, and `ButtonProps` is either.
  - **Breaking (types):** components no longer accept `underline`, `hover` or `focus` props. They had no effect and ended up as attributes on the element. `Link` keeps `underline`. `baseClasses` takes the new `BaseClassOptions` type, while `Variants` is now `variant`, `color` and `shape`.
  - `DialogButton` and `MenuTrigger`'s button accept only button props, since they never navigate.
- b77dbb8: Button and Fab take `size` from the shared `xs`–`xl` scale, where each size is a row height: 28, 36, 44, 52 or 60 pixels, with text, padding and icon to match.

  - **Breaking:** Button's and Fab's `size` no longer sets the icon's pixel size. Replace `size={20}` with the size whose row fits, like `size="md"`, or set the height with `class`.
  - **Breaking:** Icon-only buttons are square and as tall as labeled buttons of the same size, so at the default `sm` they grow from 32 to 36 pixels.
  - Fab defaults to `size="lg"`, 52 pixels, the same as before.

- b145f04: - **Breaking:** `Chip` is larger by default (`size="sm"`: `text-sm`, with `px-3 py-1` padding on its label), the size Koso and Cipherly already set by hand. Its padding moved from the container to the label, so remove `px-*`, `py-*` and `text-*` overrides from your chips. For the old compact look, pass `size="xs"`.
  - **Breaking:** `Chip` no longer has `role="option"`, and a chip without `onClick` renders its label as text instead of a button.
  - `Chip`'s buttons have `type="button"`, so clicking a chip or its remove button no longer submits a surrounding form.
  - The remove button is named after its chip ("Remove ada@example.com"), is at least 24 pixels square from the `sm` size up, and Backspace or Delete on a focused chip calls `onDelete`.
  - New `size` prop (`xs` to `xl`, default `sm`), like Input's and Switch's.
  - `ChipProps` omits Box's `centered` and `backdrop`.
- 09e9a87: The command palette is one accessible `CommandPalette`, registering actions in an effect no longer hangs, and single-key shortcuts don't fire while typing.

  - `Registry.register` and `unregister` no longer track the actions they change, so `$effect(() => registry.register(...))` works instead of re-running forever.
  - `CommandPalette` is a dialog named by `label`, whose search field is a `combobox` controlling a `listbox` of actions with `aria-activedescendant`. Selected actions set `aria-checked`, and "No matching commands" is announced.
  - The first match is highlighted; Down and Up Arrow wrap, and Enter or a click closes the palette and then runs the action.
  - Shortcuts without Ctrl, Alt or ⌘ don't run while focus is in a text field.
  - **Breaking:** `Commander` is now `CommandPalette`, and its `command` prop is now `registry`. It also takes `label` and `placeholder`.
  - **Breaking:** `Command`, `CommandInput`, `CommandSearch`, `CommandContent`, `CommandItem`, `CommandDivider`, `CommandHeader`, `CommandContext`, `getCommandContext` and `setCommandContext` are removed, along with `Header` and `ItemContext`.

- a835edc: Divider and Header bind `el`, and Divider stays inside its container.

  - Divider and Header take a bindable `el`, like every other component. This includes their aliases MenuDivider, MenuHeader, CommandDivider and CommandHeader.
  - Divider no longer has a negative horizontal margin, so it never overflows its container. In menus, separators sit 4 pixels in from each edge.

- fed2122: Dialogs are named by their title, take the theme's surface in dark mode, and the dialog helpers use the web's alert, confirm and prompt vocabulary.

  - Dialog's `title` renders as a heading and names the dialog with `aria-labelledby`. The helpers' message describes it with `aria-describedby`.
  - Modal, and so Dialog, uses Material 3's dialog surface (`surface-container-high`, `on-surface`) with 24px padding and takes a `shape` prop, defaulting to `xl`. Dialogs no longer stay white in dark mode.
  - Closing nested modals together returns focus to the element that opened the first one.
  - A prompt's field is a form, so Enter submits it and validation like `required` applies.
  - Requests made while a dialog is showing wait for it to close instead of leaving the earlier promise unresolved.
  - **Breaking:** `Dialoguer` is now `DialogProvider`, and `getDialoguerContext()` is now `getDialogs()`, returning a `Dialogs`.
  - **Breaking:** `notice()` is now `alert()`, and `input()` is now `prompt()`, whose `props` option is now `input`.
  - **Breaking:** `confirm()` resolves `false` when dismissed, `show<T>()` returns `Promise<T | undefined>`, and `confirm()` and `prompt()` label their accept button "OK" by default.
  - **Breaking:** `DialoguerButtonProps` is now `DialogAction`.
  - **Breaking:** `DialogButton` is removed. Dialog's `actions` snippet receives a `select(value)` function to call from any Button.
  - **Breaking:** Dialog no longer adds `role="dialog"` or `aria-modal`, which the native modal `<dialog>` already provides.

- 1e8f4a9: - **Breaking:** `Fab` floats over the content by default, so at the end of a scroll it covers the last item. Pass `clear` to keep the old behavior, where it makes room and sits below the last item.
  - **Breaking:** `Fab` takes Button's default shape, `rounded`. Pass `shape="circle"` to keep the old circle.
  - `Fab` renders only its button, with no spacer `<div>`.
  - `Fab` now stays in the bottom-right corner in more layouts: when its container scrolls sideways, and in containers that aren't flex columns, even when their content is short.
  - To place `Fab` elsewhere, override its position with classes, for example `class="fixed inset-auto right-4 bottom-4"`.
  - `FabProps` is `ButtonProps` plus `clear`.
- 1daf675: Input shows focus and errors in every variant and color, its edge is easy to see, and it fills the shared row height.

  - Focus draws a 2-pixel outline in the input's color, including the plain and inherit colors, which showed no focus before.
  - Invalid inputs turn the error color, for native validation (after someone edits the field or tries to submit) and for `aria-invalid="true"`.
  - The outlined variant's outline and the filled variant's new bottom line contrast at least 3:1 with the fill. Placeholders use `on-surface-variant`.
  - **Breaking:** sizes are the shared row heights, 28, 36, 44, 52 and 60 pixels, so the default `sm` grows from 32 to 36.
  - **Breaking:** the `inherit` variant is now `plain`.
  - **Breaking:** `INPUT_COLORS`, `INPUT_SIZES`, `InputColor`, `InputColorProp`, `InputSize`, `InputSizeProp` and `InputVariantProp` are removed; use `COLORS`, `SIZES` and their types.
  - **Breaking:** `el` is an `HTMLInputElement`, and so is `AutocompleteContext`'s `anchorEl`.

- f660f4f: - **Breaking:** `Link` always renders an `<a>`, and `href` is required. To migrate, replace a `Link` without `href` with `<Button variant="text">`, since actions belong to Button.
  - **Breaking:** text links are underlined by default (`underline="always"`), so links in text don't rely on color alone. Button-like variants default to no underline. To keep the old look in navigation, pass `underline="hover"`. `Breadcrumbs` does this already.
  - `Button` and button-like `Link`s are now inline-level (`inline-flex`), like native buttons, so they can sit inside a line of text.
- e068f46: `shape` is now Material 3's corner scale, shared by every component that has corners, and each component defaults to its Material 3 shape.

  - **Breaking:** `shape` takes `none`, `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (28px) or `full`. Replace `square` with `none` and `circle` with `full`. `rounded` was 6px; the nearest steps are `xs` and `sm`.
  - **Breaking:** `radius` is replaced by `shape` on Input, Textarea, Switch, SwitchThumb and Slider. `RADII`, `Radius`, `RadiusProp`, `INPUT_RADII`, `TEXTAREA_RADII`, `SWITCH_RADII`, `SLIDER_RADII` and their `*Radius`/`*RadiusProp` types are removed.
  - **Breaking:** Defaults follow Material 3. Button, ToggleButton, Avatar, Switch and Slider are `full`; Fab is `lg`; Alert is `md`; Chip is `sm`; Input, Textarea, Skeleton, Menu, Command and Autocomplete are `xs`. Pass `shape` to keep the old look.

- 08b0abd: Markdown is safe for content people write, styled by default, and one component.

  - Raw HTML and code blocks render as text, so they can't run scripts.
  - Link and image URLs with schemes other than http, https, mailto and tel are dropped, including in tokens passed to snippets.
  - GitHub Flavored Markdown is on by default, and task list items render disabled checkboxes.
  - Every element is styled with theme tokens. Links use `Link`, and tables honor column alignment and scroll when wide.
  - Code spans with double backticks, reference definitions and custom `tableCell` children render correctly.
  - Editing `value` updates elements in place instead of rebuilding the whole document.
  - **Breaking:** `options` is replaced by `gfm` (default `true`) and `breaks` props.
  - **Breaking:** Markdown renders inside a `<div>` that takes `class`, `el` and other attributes.
  - **Breaking:** The per-token components (`MarkdownHeading`, `MarkdownList`, …), `MarkdownToken`, `MarkdownTokens`, `MarkdownContext` and its helpers are removed. Override an element with its snippet instead. `MarkdownComponentProps` is now `MarkdownSnippetProps`.
  - **Breaking:** The `def`, `escape` and `space` snippets are removed.

- c5bb330: Menus follow the ARIA menu button pattern, take a trigger snippet like Tooltip, and expose checked items and labelled groups.

  - Enter, Space or Down Arrow on the trigger opens the menu on its first item, and Up Arrow on its last. A click focuses the menu, so the arrow keys work.
  - The menu is named by its trigger. Items are reached with the arrow keys, Home, End and typeahead, which cycles through items that start with a repeated letter and skips disabled items.
  - Tab closes the menu and moves on, and moving the pointer out of the menu keeps focus in it.
  - `MenuItem` takes `checked`, which renders `menuitemcheckbox` with `aria-checked` and a check mark, and `color`, which defaults to `plain` (on-surface). `MenuActions` uses it for selected actions.
  - The new `MenuGroup` labels a set of items, as a `group` named by its `label`. `MenuActions` groups each category this way.
  - Menus use Material 3's menu surface (`surface-container`) with a shadow, and `Menu` takes `placement` (default `bottom-start`) and `shape` (default `xs`).
  - **Breaking:** `Menu` takes a `trigger` snippet that receives props to spread on any button. `MenuTrigger` and `MenuTriggerButton` are removed.
  - **Breaking:** `MenuContent` is removed. `Menu` renders the menu, with `placement`, `shape`, `class` and other attributes passed to it, and its `el` is now the menu element instead of the anchor.
  - **Breaking:** `MenuHeader` is removed in favor of `MenuGroup`.
  - **Breaking:** `MenuItem`'s `onSelect` no longer receives the element, runs after the menu closes, and `MenuItem` no longer takes `variant` or `shape`.
  - **Breaking:** `MenuContext`, `getMenuContext` and `setMenuContext` are no longer exported.

- a42d062: Modal returns focus to its opener, closes through the dialog's native close requests, and respects reduced motion.

  - Closing a modal returns focus to the element that had it before it opened, where before focus fell to the page body.
  - Escape, backdrop clicks and Android's back gesture close a modal through `<dialog closedby="any">` and its `cancel` event, replacing hand-written key and click handlers.
  - Modals don't animate when reduced motion is requested; the backdrop fades in and out with CSS otherwise.
  - Modal has a docs page.

- 20d3b2e: Popovers are positioned with CSS anchor positioning instead of Floating UI, so kosui no longer depends on `@floating-ui/dom`.

  - The browser places a popover next to its anchor, flips it to the other side when there's no room, and keeps it on screen, with no JavaScript measuring on scroll or resize.
  - A popover reopened while it's closing now shows, where before it stayed hidden while `open` was true.
  - **Breaking:** popovers and tooltips no longer have arrows: `arrow` and `arrowClass` are removed from Popover and Tooltip.
  - **Breaking:** `placement` is typed `PopoverPlacement` (a side, optionally with `-start` or `-end`) instead of Floating UI's `Placement`.

- 27089d0: Popover lets clicks bubble, respects reduced motion, shows its arrow without extra classes, and has a docs page.

  - Clicks inside a popover reach the rest of the page, where before they were stopped, so document listeners never saw them.
  - Popovers, and with them Menu, Tooltip and Autocomplete, don't animate when reduced motion is requested.
  - With `arrow`, the popover is `overflow-visible` itself, so the arrow isn't clipped.
  - **Breaking:** `strategy` is removed; popovers render in the top layer, where they're always fixed.
  - **Breaking:** `el` is an `HTMLDivElement`.

- 7caf6ee: CircularProgress is an accessible progress bar that takes the shared `color` and `size`.

  - **Breaking:** The ring has `role="progressbar"`, named "Loading" unless you pass `aria-label`. A determinate ring reports its value as a percentage. Hide a ring that sits beside text saying the same thing, like a spinner inside a button, with `aria-hidden="true"`.
  - **Breaking:** `size` takes the shared scale, fitting inside each row: `xs` 16, `sm` 24 (the default), `md` 32, `lg` 40 and `xl` 48 pixels. For other sizes, use a class, like `class="size-25"` for `size="100"`.
  - **Breaking:** `color` takes a theme color, defaulting to `primary`. `class="text-m3-primary"` is no longer needed. Inside a filled button, use `color="inherit"`. `trackColor` and `textColor` are gone; the track and text follow the ring's color.
  - Attributes, event handlers and attachments pass through to the `<svg>`. `el` binds it, and `class` takes any class value.

- fa7cd23: - **Breaking:** `Portal` and `Proxy` are removed. Nothing used them, and overlays render in the browser's top layer instead: use the Popover API (as Popover does) or `<dialog>` (as Modal does).
- 234361f: - **Breaking:** the `ref` prop is removed from every component. To run code with the element, pass an attachment, which every component forwards to its element. For example, `ref={(el) => el.focus()}` becomes `{@attach (el) => el.focus()}`. To keep a reference instead, use `bind:el`.
  - **Breaking:** `Modal` and `Dialog` rename their bindable `ref` to `el`, like every other component, so `bind:ref` becomes `bind:el`.
  - **Breaking (types):** `TooltipTriggerProps` no longer has `ref`. Spread the trigger props onto your element with `{...props}`. The tooltip's anchor comes along as an attachment, so `use:ref` is no longer needed.
- dfd3ac3: Shortcuts work across platforms and keyboard layouts, and `ShortcutHint` is readable by screen readers.

  - Add `mod` to `Shortcut`: ⌘ on Apple devices and Ctrl everywhere else.
  - Letters match whatever their case, so `{ key: "k", shift: true }` matches Shift+K.
  - When a key types a character outside ASCII, like Option+L on a Mac or Ctrl+K on a Russian layout, the physical key is matched.
  - Shortcuts show ⌃⌥⇧⌘ in Apple's order on Apple devices and Ctrl, Alt and Shift by name elsewhere.
  - Add `Shortcut.equals` and `Shortcut.keys()`.
  - **Breaking:** `ShortcutBadge` is now `ShortcutHint`. It renders `<kbd>` keys with visually hidden text like "Command+K", passes other attributes to the outer `<kbd>`, and no longer takes `badgeClass`.
  - **Breaking:** `toString()` returns readable text like "Command+K" or "Ctrl+K" instead of glyphs, and `Shortcut` is no longer iterable; use `keys()`.
  - **Breaking:** The `Dead` key no longer displays as ☠️.
  - `MenuActions` shows shortcuts with `ShortcutHint`.

- 43103ae: Skeleton hides its children, respects reduced motion, and is one line tall by default.

  - **Breaking:** Children no longer show. They set the skeleton's size, invisibly, and screen readers don't read them.
  - The pulse stops when people ask for reduced motion.
  - A skeleton without a height class is one line of text tall instead of 0 pixels.
  - Skeleton's docs show how to mark a loading region with `aria-busy`.

- 007c390: Slider is a styled `<input type="range">`, so the keyboard, pointer, touch, forms and screen readers work natively, and it shows its value in every color.

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

- 8d9156e: Switch is a styled `<input type="checkbox" role="switch">`, shows its state in every color, and is easy to see when off.

  - Switch takes part in forms: it submits its `name` and `value` when on, and `required` works. Labels, Space and `bind:checked` are native.
  - On and off look different in every color. Plain and inherit fill the track with the surrounding text color, where before the thumb was invisible.
  - Off, the switch has an outline-colored edge and thumb that contrast at least 3:1, as in Material 3.
  - Sizes sit inside the shared row: 16×28, 24×40, 28×48, 32×52 and 36×60 pixels, so `sm` and up are at least 24 pixels tall.
  - Switch has a bindable `el`, and `checked` can be bound to `undefined`, as on a native checkbox.
  - **Breaking:** Switch renders an `<input>`, not a `<button>`, so its attributes and events are an input's.
  - **Breaking:** `SwitchThumb` and the `thumb` snippet are removed.
  - **Breaking:** `SWITCH_COLORS`, `SWITCH_SIZES`, `SwitchColor`, `SwitchColorProp`, `SwitchSize` and `SwitchSizeProp` are removed; use `COLORS`, `SIZES` and their types.

- e7ab667: Textarea shares Input's field style, so it shows focus and errors in every variant and color, and one row lines up with the shared row height.

  - Focus draws a 2-pixel outline in the textarea's color, the resting edge contrasts at least 3:1, and invalid textareas turn the error color, exactly as Input does.
  - Each size pads one row to the shared row height (28, 36, 44, 52 or 60 pixels), so `rows={1}` lines up with an Input or Button of the same size.
  - Textarea has a bindable `el`.
  - **Breaking:** the `inherit` variant is now `plain`, and the variant's type is `InputVariant`.
  - **Breaking:** `TEXTAREA_COLORS`, `TEXTAREA_SIZES`, `TEXTAREA_VARIANTS`, `TextareaColor`, `TextareaColorProp`, `TextareaSize`, `TextareaSizeProp`, `TextareaVariant` and `TextareaVariantProp` are removed; use `COLORS`, `SIZES`, `INPUT_VARIANTS` and their types.

- e5cede0: Add `kosui/theme.css`. Import it after Tailwind to get the Material 3 color utilities, a default light and dark palette, and scanning of Kosui's components, instead of copying a Tailwind config and the color variables into each app.

  ```css
  @import "tailwindcss";
  @import "kosui/theme.css";
  ```

- a4a8bbd: Toggle Group is a radio group of native radio buttons, shows the chosen option in every color, and fills the shared row.

  - Arrow keys move between buttons and choose them, Tab enters the group once, and with a `name` the group submits its value with a form.
  - The chosen button is visible in every color: plain and inherit tint it and thicken its edge in the text color, where before it looked unselected.
  - Focus draws a 2-pixel outline in the group's color, above the neighboring buttons.
  - Buttons fill the shared row: 28, 36, 44, 52 or 60 pixels.
  - **Breaking:** the group is `role="radiogroup"` and each button a radio `<input>` inside a `<label>`, not `role="listbox"` and `role="option"` buttons. Button attributes, events and `el` now go to the radio; `class` goes to the label.
  - **Breaking:** `color` and `shape` move from ToggleButton to ToggleGroup, which also takes `size` and `name`.
  - **Breaking:** `ToggleContext`, `getToggleContext` and `setToggleContext` are no longer exported.

- 71d1be1: Tooltips can be hovered, work with a mouse on touchscreen computers, and click tooltips behave like disclosures.

  - Moving the pointer from the trigger onto the tooltip keeps it open, as WCAG's Content on Hover or Focus requires.
  - Hover is decided per pointer, so a mouse or pen shows tooltips on touch-capable laptops, where before it never did.
  - With `click`, the trigger toggles the tooltip and has `aria-expanded` and `aria-controls`, the content comes right after the trigger in the tab order, and it has no tooltip role, so it can hold a link.
  - **Breaking:** `TooltipTriggerProps` has `onpointerenter` and `onpointerleave` instead of `onmouseenter` and `onmouseleave`, plus `aria-expanded` and `aria-controls` in click mode.
  - **Breaking:** the tooltip renders after its trigger instead of before it.

### Patch Changes

- c187220: ToggleButton centers its content, so a toggle group laid out as an equal-width grid (`class="inline-grid auto-cols-fr grid-flow-col"`) keeps each label centered.

## 0.3.0

### Minor Changes

- 4bf1f70: - `Button` and `Link` show a focus ring for keyboard focus only: a 3px outline with a 2px offset in the secondary color, following Material 3. Focus styles no longer stay on after a mouse click.
  - Menu items highlight under the pointer and on keyboard focus.
  - `Tooltip` opens immediately on keyboard focus, closes on blur, and is linked to its trigger with `aria-describedby`.
  - An icon-only `Button` with a string `tooltip` uses it as its accessible name.
  - `class` props accept Svelte's object and array class values on every component.
  - Attachments (`{@attach}`) passed to components now reach the element.
  - Adds `cn()`, which resolves class values the way Svelte's `class` attribute does and merges conflicting Tailwind classes.
  - `tailwind-merge` and `clsx` are now declared dependencies. `tailwind-merge` was already required at runtime but wasn't declared.

## 0.2.0

### Minor Changes

- a208cb2: `Markdown` and `Slider` now pick up renderer snippet props that change after mount.

  Breaking: `MarkdownContext` and `SliderContext` constructors take getter functions for renderers instead of snippet values. `new MarkdownContext(renderers, tableCell)` becomes `new MarkdownContext(() => renderers, () => tableCell)`, and each `SliderContext` renderer argument becomes `() => snippet`. Reading renderers from the context is unchanged, but the `SliderContext` renderer properties are now read-only.

## 0.1.2

### Patch Changes

- 1fcf366: - `Link` classes now update when `class`, `variant`, `color`, `shape`, or `underline` change after mount.
  - `Tooltip` now responds to changes to `click` after mount.
  - `Slider` now uses the latest `label`, `onChange`, and `onChangeEnd` props.
  - `Popover` no longer logs to the console when rendered without children.
  - `icon` props on `Button`, `Dialog`, dialoguer, and command actions are typed as `LucideIcon`, which fixes type errors with current `@lucide/svelte`. The minimum `@lucide/svelte` version is now 1.1.0.

## 0.1.1

### Patch Changes

- a041ee2: update all dependencies

## 0.1.0

### Minor Changes

- f6ad965: Bump deps

## 0.0.34

### Patch Changes

- a311a63: Update dependencies

## 0.0.33

### Patch Changes

- 8d64373: Update all depenencies

## 0.0.32

### Patch Changes

- bda4828: Update deps

## 0.0.31

### Patch Changes

- c7a9d4a: "Wrap all CSS in a components @layer"

## 0.0.30

### Patch Changes

- 51d4cd1: Add role="alert" to the Alert component

## 0.0.29

### Patch Changes

- 6c33831: Migrate Alert off of Tailwind

## 0.0.28

### Patch Changes

- 874f154: Auto-merge releases
- d69e9d9: Add support for click slider marks
- dca575f: Add slider component

## 0.0.27

### Patch Changes

- bcb7a3d: Convert to a Svelte library (bundler -> NodeNext)
- ace9cf6: Extract thumb into SwitchThumb component to allow customization

## 0.0.26

### Patch Changes

- 5adc14a: Iterate on the Switch component and simplify tests

## 0.0.25

### Patch Changes

- de2531d: Add a Switch component

## 0.0.24

### Patch Changes

- 8c01a1b: Set repository url in package.json

## 0.0.23

### Patch Changes

- ad2b9d0: Add back oidc token

## 0.0.22

### Patch Changes

- 0153fe9: Use OIDC auth with npmjs

## 0.0.21

### Patch Changes

- f6c747d: Make Input and Textarea follow new Mantine patterns

## 0.0.20

### Patch Changes

- 4ef35b5: Bump dependencies

## 0.0.19

### Patch Changes

- 2e90abb: Make the ToggleButton component default to "button" type

## 0.0.18

### Patch Changes

- 5919991: Make buttons not submit automatically

## 0.0.17

### Patch Changes

- 5fc221b: Add automerge

## 0.0.16

### Patch Changes

- aabb58b: Setup release workflows

## 0.0.15

### Patch Changes

- 11e0356: Make a change to see thing work
