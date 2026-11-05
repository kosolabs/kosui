---
"kosui": minor
---

Autocomplete is one component that follows the ARIA combobox pattern: pass the matching `options` and it opens, highlights and fills the field itself.

- The field is a `combobox` with `aria-expanded`, `aria-controls` and `aria-activedescendant`, pointing at a `listbox` of `option`s, so screen readers announce the highlighted suggestion.
- The list opens while typing when there are options, and Down or Up Arrow opens it too. Escape, Tab or leaving the field closes it.
- Choosing an option with Enter or a click fills the field with its label, closes the list and calls `onSelect`. With nothing highlighted, Enter submits the form.
- The list is at least as wide as the field and uses Material 3's menu surface.
- **Breaking:** `<Autocomplete bind:value options={matches} />` replaces `Autocomplete`, `AutocompleteInput`, `AutocompleteContent` and `AutocompleteItem`. Options can be any type, with `getOptionLabel` for their text and an `option` snippet for custom rendering, and every Input prop passes through to the field.
- **Breaking:** `AutocompleteContext`, `getAutocompleteContext` and `setAutocompleteContext` are removed.
