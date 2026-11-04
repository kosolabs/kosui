<script lang="ts">
  import {
    COLORS,
    Fab,
    Link,
    SHAPES,
    SIZES,
    VARIANTS,
    type Color,
    type FabProps,
    type Shape,
    type Size,
    type Variant,
  } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    DisabledSetting,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Plus } from "@lucide/svelte";
  import PlacementExample from "./examples/placement.svelte";
  import placementSource from "./examples/placement.svelte?raw";

  const CONTENTS = ["icon", "both"];
  const CONTAINERS = ["empty", "tall", "wide", "block"];

  let variant: Variant = $state("elevated");
  let color: Color = $state("primary");
  let shape: Shape = $state("rounded");
  let size: Size = $state("lg");
  let content = $state("icon");
  let container = $state("tall");
  let clear = $state(false);
  let tooltip = $state(true);
  let disabled = $state(false);
  let presses = $state(0);

  let hasLabel = $derived(content === "both");
  let lines = $derived(
    container === "empty"
      ? []
      : Array.from({ length: 20 }, (_, i) =>
          container === "wide"
            ? `Line ${i + 1} is long enough to overflow its container sideways, so it scrolls both ways`
            : `Line ${i + 1}`,
        ),
  );
  let tooltipText = $derived(tooltip ? "New task" : "");
  let ariaLabel = $derived(!hasLabel && !tooltip ? "New task" : "");

  let fabProps: FabProps = $derived({
    variant,
    color,
    shape,
    size,
    clear,
    disabled,
    icon: Plus,
    tooltip: tooltipText || undefined,
    "aria-label": ariaLabel || undefined,
    onclick: () => presses++,
  });
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    A floating action button (Fab) holds the main action on a screen, like
    creating a task. It's a <Link href={resolve("button")}>Button</Link> with more
    presence: elevated by default, two sizes larger, and it floats in the bottom corner
    of its container. Give it a label to make an extended Fab.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex w-full min-w-0 flex-col items-center gap-3">
        <div
          data-testid="container"
          class={[
            "h-72 w-full overflow-auto rounded-lg bg-m3-surface-container-highest p-2",
            container !== "block" && "flex flex-col",
          ]}
        >
          {#each lines as line (line)}
            <div class="text-nowrap">{line}</div>
          {/each}
          {#if hasLabel}
            <Fab {...fabProps}>New task</Fab>
          {:else}
            <Fab {...fabProps} />
          {/if}
        </div>
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
      <ToggleButtonSetting
        bind:value={container}
        options={CONTAINERS}
        label="Container"
      />
      <SwitchSetting label="Clear" bind:value={clear} />
      <SwitchSetting label="Tooltip" bind:value={tooltip} />
      <DisabledSetting bind:disabled />
    {/snippet}
    {#snippet code()}
      <Code
        component="Fab"
        defaults={{
          variant: "elevated",
          color: "primary",
          shape: "rounded",
          size: "lg",
          clear: false,
          tooltip: "",
          "aria-label": "",
          disabled: false,
        }}
        values={{
          variant,
          color,
          shape,
          size,
          clear,
          tooltip: tooltipText,
          "aria-label": ariaLabel,
          disabled,
        }}
        expressions={{ icon: "Plus" }}
        imports={[`import { Plus } from "@lucide/svelte";`]}
        children={hasLabel ? "New task" : undefined}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Placing a Fab" source={placementSource}>
      {#snippet description()}
        Make Fab the last child of a scrolling container. It floats in the
        bottom corner while the content scrolls. Set <code>clear</code> so that
        at the end it sits below the last item instead of covering it, as in
        this list. To pin it to the window, pass
        <code>class="fixed inset-auto right-4 bottom-4"</code>.
      {/snippet}
      <PlacementExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Fab renders a native <code>&lt;button&gt;</code>, so Enter and Space
        activate it. With an <code>href</code>, it renders a native
        <code>&lt;a&gt;</code> instead.
      </li>
      <li>
        Give an icon-only Fab a name, with a string <code>tooltip</code> or an
        <code>aria-label</code>.
      </li>
      <li>
        Fab comes after the content it follows, so it's also last in the tab
        order and reading order of its container.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"elevated"`,
          description: "How much attention the Fab draws.",
        },
        {
          name: "clear",
          type: "boolean",
          default: "false",
          description:
            "Make room below the content, so at the end of a scroll the Fab sits below the last item instead of covering it.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"lg"`,
          description:
            "The row height, on Button's scale: 28, 36, 44, 52 or 60 pixels. The default, 52, is two sizes above Button's.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Fab takes every other Button prop, including <code>color</code>,
      <code>shape</code>, <code>href</code>, <code>icon</code> and
      <code>tooltip</code>, with the same defaults. Every attribute, event
      handler and attachment passes through to the rendered element.
    </p>
  </Section>
</div>
