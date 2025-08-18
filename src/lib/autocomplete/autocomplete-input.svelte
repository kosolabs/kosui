<script module lang="ts">
  import { getAutocompleteContext } from "$lib/autocomplete/index.js";
  import { Input, type InputProps } from "$lib/input/index.js";
  import { mergeComponentProps } from "$lib/merge-props.js";

  export type AutocompleteInputProps = InputProps;
</script>

<script lang="ts">
  let {
    el = $bindable(),
    value = $bindable(""),
    ...restProps
  }: AutocompleteInputProps = $props();

  const ctx = getAutocompleteContext();
  ctx.bindInput(
    () => value,
    (newval) => (value = newval),
  );
  ctx.bindAnchorEl(
    () => el,
    (newval) => (el = newval),
  );

  function handleKeyDown(event: KeyboardEvent) {
    ctx.handleKeyDown(event);
  }
</script>

<Input
  bind:el={ctx.anchorEl}
  bind:value={ctx.input}
  autocomplete="off"
  {...mergeComponentProps(Input, { onkeydown: handleKeyDown }, restProps)}
/>
