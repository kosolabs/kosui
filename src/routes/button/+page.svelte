<script lang="ts">
  import {
    Button,
    COLORS,
    Link,
    SHAPES,
    SIZES,
    VARIANTS,
    type ButtonProps,
    type Color,
    type Shape,
    type Size,
    type Variant,
  } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    DisabledSetting,
    Example,
    GuidanceTable,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
    type GuidanceRow,
  } from "#ui";
  import { Save } from "@lucide/svelte";
  import DestructiveExample from "./examples/destructive.svelte";
  import destructiveSource from "./examples/destructive.svelte?raw";
  import DialogActionsExample from "./examples/dialog-actions.svelte";
  import dialogActionsSource from "./examples/dialog-actions.svelte?raw";
  import ElementExample from "./examples/element.svelte";
  import elementSource from "./examples/element.svelte?raw";
  import FormSubmitExample from "./examples/form-submit.svelte";
  import formSubmitSource from "./examples/form-submit.svelte?raw";
  import IconButtonsExample from "./examples/icon-buttons.svelte";
  import iconButtonsSource from "./examples/icon-buttons.svelte?raw";
  import LoadingExample from "./examples/loading.svelte";
  import loadingSource from "./examples/loading.svelte?raw";
  import NavigateExample from "./examples/navigate.svelte";
  import navigateSource from "./examples/navigate.svelte?raw";
  import PrimaryButton from "./examples/primary-button.svelte";
  import primaryButtonSource from "./examples/primary-button.svelte?raw";

  const CONTENTS = ["label", "icon", "both"];

  const VARIANT_GUIDANCE: GuidanceRow<Variant>[] = [
    {
      name: "filled",
      use: "The main action in a view, like Save or Submit. Use one per view.",
    },
    {
      name: "tonal",
      use: "Secondary actions that still need weight, often next to a filled button.",
    },
    {
      name: "elevated",
      use: "Like tonal, with a shadow that separates it from busy or patterned backgrounds.",
    },
    {
      name: "outlined",
      use: "The default. Medium emphasis for actions that matter but aren't the main one.",
    },
    {
      name: "plain",
      use: "Low emphasis with no container until hover. Good for Cancel, toolbars and icon buttons.",
    },
    {
      name: "text",
      use: "The lightest touch: text that fades slightly on hover, for actions inside dense layouts.",
    },
  ];

  const COLOR_GUIDANCE: GuidanceRow<Color>[] = [
    { name: "primary", use: "The default, for most actions." },
    {
      name: "secondary",
      use: "Less prominent actions, in your theme's secondary color.",
    },
    {
      name: "tertiary",
      use: "Contrasting accents, in your theme's tertiary color.",
    },
    { name: "error", use: "Destructive actions, like Delete." },
    {
      name: "plain",
      use: "Uses the surrounding text color.",
    },
    {
      name: "inherit",
      use: "Uses the surrounding text color.",
    },
  ];

  let variant: Variant = $state("outlined");
  let color: Color = $state("primary");
  let shape: Shape = $state("full");
  let size: Size = $state("sm");
  let content = $state("label");
  let tooltip = $state(false);
  let disabled = $state(false);
  let presses = $state(0);

  let hasIcon = $derived(content !== "label");
  let hasLabel = $derived(content !== "icon");
  let tooltipText = $derived(tooltip ? "Save changes" : "");
  let ariaLabel = $derived(!hasLabel && !tooltip ? "Save" : "");

  let buttonProps: ButtonProps = $derived({
    variant,
    color,
    shape,
    size,
    disabled,
    icon: hasIcon ? Save : undefined,
    tooltip: tooltipText || undefined,
    "aria-label": ariaLabel || undefined,
    onclick: () => presses++,
  });
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Buttons let people take an action, like saving a form, opening a dialog or
    deleting an item. Give a button an <code>href</code> when navigation should
    look like a button; for links in text, use a
    <Link href={resolve("links")}>Link</Link>.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        {#if hasLabel}
          <Button {...buttonProps}>Save</Button>
        {:else}
          <Button {...buttonProps} />
        {/if}
        <p class="text-sm" aria-live="polite">
          Pressed {presses}
          {presses === 1 ? "time" : "times"}
        </p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={variant}
        options={[...VARIANTS]}
        label="Variant"
      />
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
      <ToggleButtonSetting
        bind:value={size}
        options={[...SIZES]}
        label="Size"
      />
      <ToggleButtonSetting
        bind:value={content}
        options={CONTENTS}
        label="Content"
      />
      <SwitchSetting label="Tooltip" bind:value={tooltip} />
      <DisabledSetting bind:disabled />
    {/snippet}
    {#snippet code()}
      <Code
        component="Button"
        defaults={{
          variant: "outlined",
          color: "primary",
          shape: "full",
          size: "sm",
          tooltip: "",
          "aria-label": "",
          disabled: false,
        }}
        values={{
          variant,
          color,
          shape,
          size,
          tooltip: tooltipText,
          "aria-label": ariaLabel,
          disabled,
        }}
        expressions={{ icon: hasIcon ? "Save" : undefined }}
        imports={hasIcon ? [`import { Save } from "@lucide/svelte";`] : []}
        children={hasLabel ? "Save" : undefined}
      />
    {/snippet}
  </Playground>

  <Section title="Choosing a variant">
    <p class="max-w-prose">
      Variants set how much attention a button draws. Give each view one clearly
      most important action, and step down in emphasis from there.
    </p>
    <GuidanceTable heading="Variant" rows={VARIANT_GUIDANCE}>
      {#snippet example(variant)}
        <Button {variant}>Save</Button>
      {/snippet}
    </GuidanceTable>
  </Section>

  <Section title="Choosing a color">
    <p class="max-w-prose">
      Colors come from your theme. Most buttons stay primary; reach for the
      others to separate kinds of actions, not for decoration.
    </p>
    <GuidanceTable heading="Color" rows={COLOR_GUIDANCE}>
      {#snippet example(color)}
        <Button variant="filled" {color}>Save</Button>
      {/snippet}
    </GuidanceTable>
  </Section>

  <Section title="Examples">
    <Example title="Dialog actions" source={dialogActionsSource}>
      {#snippet description()}
        Pair one filled button for the action with a plain button to back out.
      {/snippet}
      <DialogActionsExample />
    </Example>

    <Example title="Destructive action" source={destructiveSource}>
      {#snippet description()}
        Use the error color, and say exactly what will be deleted.
      {/snippet}
      <DestructiveExample />
    </Example>

    <Example title="Icon buttons" source={iconButtonsSource}>
      {#snippet description()}
        Icon-only buttons need a name. A string <code>tooltip</code> provides one,
        and shows it on hover and keyboard focus.
      {/snippet}
      <IconButtonsExample />
    </Example>

    <Example title="Submitting a form" source={formSubmitSource}>
      {#snippet description()}
        Buttons default to <code>type="button"</code>, unlike HTML. Set
        <code>type="submit"</code> on the button that submits a form.
      {/snippet}
      <FormSubmitExample />
    </Example>

    <Example title="Showing progress" source={loadingSource}>
      {#snippet description()}
        Compose a <code>CircularProgress</code> inside the label. Keeping the button
        enabled and ignoring repeat presses keeps keyboard focus in place, which disabling
        it would lose.
      {/snippet}
      <LoadingExample />
    </Example>

    <Example title="Navigating" source={navigateSource}>
      {#snippet description()}
        With an <code>href</code>, Button renders a link. Use it for navigation
        that should stand out, like a call to action. It keeps link semantics:
        Enter follows it, and it appears in a screen reader's list of links.
      {/snippet}
      <NavigateExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Button renders a native <code>&lt;button&gt;</code>, so Enter and Space
        activate it and it works inside forms. With an <code>href</code>, it
        renders a native <code>&lt;a&gt;</code> instead.
      </li>
      <li>
        A focus ring appears for keyboard focus only, not after a mouse click.
      </li>
      <li>
        <code>disabled</code> removes the button from the tab order.
      </li>
      <li>
        Give every icon-only button a name, with a string <code>tooltip</code>
        or an <code>aria-label</code>.
      </li>
      <li>
        A <code>tooltip</code> appears on hover and keyboard focus, and screen readers
        announce it as the button's description.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"outlined"`,
          description: "How much attention the button draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the button uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding.",
        },
        {
          name: "href",
          type: "string",
          description:
            "Renders an `<a>` that navigates there, instead of a `<button>`.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          description: "An icon shown before the label.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The row height: 28, 36, 44, 52 or 60 pixels, with text and icon to match. Buttons, inputs and other controls of the same size line up. Icon-only buttons are square.",
        },
        {
          name: "tooltip",
          type: "string | Snippet",
          description:
            "Shown on hover and keyboard focus. A string tooltip also names an icon-only button.",
        },
        {
          name: "type",
          type: `"button" | "submit" | "reset"`,
          default: `"button"`,
          description:
            "Unlike HTML, defaults to `button`. Set `submit` to submit a form. Not used with `href`.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description:
            "Bindable. The rendered `<button>`, or `<a>` with `href`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Strings, arrays or objects, like Svelte's `class` attribute. Your classes override the button's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The label.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute of the rendered element (<code>&lt;button&gt;</code
      >, or <code>&lt;a&gt;</code> with <code>href</code>), every event handler
      and every attachment passes through to it.
    </p>
  </Section>

  <Section title="Advanced">
    <Example title="Reaching the element" source={elementSource}>
      {#snippet description()}
        Attachments passed to Button reach its <code>&lt;button&gt;</code>. Use
        <code>{"{@attach}"}</code> to run code with the element, or
        <code>bind:el</code> to keep a reference to it.
      {/snippet}
      <ElementExample />
    </Example>

    <Example title="Wrapping Button" source={primaryButtonSource}>
      {#snippet description()}
        To make your own button, spread the remaining props onto Button. Labels,
        handlers, classes and attachments all pass through, and your defaults
        can still be overridden.
      {/snippet}
      <PrimaryButton>Save</PrimaryButton>
    </Example>
  </Section>
</div>
