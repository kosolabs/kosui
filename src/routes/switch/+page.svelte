<script lang="ts">
  import {
    COLORS,
    SHAPES,
    SIZES,
    Switch,
    type Color,
    type Shape,
    type Size,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import FormExample from "./examples/form.svelte";
  import formSource from "./examples/form.svelte?raw";
  import SettingsExample from "./examples/settings.svelte";
  import settingsSource from "./examples/settings.svelte?raw";

  let color: Color = $state("primary");
  let size: Size = $state("sm");
  let shape: Shape = $state("full");
  let disabled = $state(false);
  let checked = $state(false);
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Switches turn a single setting on or off, and the change takes effect right
    away.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        <Switch
          bind:checked
          {color}
          {size}
          {shape}
          {disabled}
          aria-label="Wi-Fi"
        />
        <p class="text-sm" aria-live="polite">Wi-Fi {checked ? "on" : "off"}</p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={color}
        options={[...COLORS]}
        label="Color"
      />
      <ToggleButtonSetting
        bind:value={size}
        options={[...SIZES]}
        label="Size"
      />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
      <SwitchSetting label="Disabled" bind:value={disabled} />
    {/snippet}
    {#snippet code()}
      <Code
        component="Switch"
        bindables={["checked"]}
        defaults={{
          color: "primary",
          size: "sm",
          shape: "full",
          disabled: false,
          "aria-label": "",
        }}
        values={{ color, size, shape, disabled, "aria-label": "Wi-Fi" }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Settings" source={settingsSource}>
      {#snippet description()}
        Name each switch with a <code>&lt;label&gt;</code>, which also toggles
        it when clicked, and connect any explanation with
        <code>aria-describedby</code>.
      {/snippet}
      <SettingsExample />
    </Example>

    <Example title="In a form" source={formSource}>
      {#snippet description()}
        Switch is a checkbox underneath, so it submits its
        <code>name</code> and <code>value</code> with a form when it's on, and
        <code>required</code> works too.
      {/snippet}
      <FormExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Switch renders <code>&lt;input type="checkbox" role="switch"&gt;</code>,
        so screen readers announce it as a switch that's on or off, and Space
        toggles it.
      </li>
      <li>
        Give it a name with a <code>&lt;label&gt;</code> or
        <code>aria-label</code>.
      </li>
      <li>
        Off, the edge and thumb contrast at least 3:1 with the page; on, the
        track fills with the switch's color. The thumb's position shows the
        state too, so it doesn't rely on color alone.
      </li>
      <li>
        From <code>sm</code> up, a switch is at least 24 pixels tall, the smallest
        comfortable target.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "checked",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the switch is on.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description:
            "The color of the track when on. Plain and inherit use the surrounding text color.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "The track, 16×28, 24×40, 28×48, 32×52 or 36×60 pixels, sits inside the shared row of the same size.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"full"`,
          description: "Corner rounding, for the track and its thumb.",
        },
        {
          name: "el",
          type: "HTMLInputElement",
          description: "Bindable. The `<input>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the switch. Your classes override the switch's.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;input&gt;</code>, including <code>name</code>,
      <code>value</code>, <code>required</code>, <code>disabled</code> and
      <code>onchange</code>.
    </p>
  </Section>
</div>
