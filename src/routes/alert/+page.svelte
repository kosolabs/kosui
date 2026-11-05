<script lang="ts">
  import {
    Alert,
    COLORS,
    SHAPES,
    VARIANTS,
    type Color,
    type Shape,
    type Variant,
  } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    ToggleButtonSetting,
  } from "#ui";
  import SignInFailedExample from "./examples/sign-in-failed.svelte";
  import signInFailedSource from "./examples/sign-in-failed.svelte?raw";
  import StatusExample from "./examples/status.svelte";
  import statusSource from "./examples/status.svelte?raw";

  let variant: Variant = $state("tonal");
  let color: Color = $state("primary");
  let shape: Shape = $state("md");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Alerts show a short, important message, like an error or a change people
    need to know about.
  </p>

  <Playground>
    {#snippet component()}
      <Alert {variant} {color} {shape}>
        Your trial ends in 3 days. Add a payment method to keep your projects.
      </Alert>
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
    {/snippet}
    {#snippet code()}
      <Code
        component="Alert"
        defaults={{ variant: "tonal", color: "primary", shape: "md" }}
        values={{ variant, color, shape }}
        children="Your trial ends in 3 days. Add a payment method to keep your projects."
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Error" source={signInFailedSource}>
      {#snippet description()}
        Alerts take any content, so add an icon or an action with
        <code>class</code> for the layout. Screen readers announce an alert as soon
        as it appears.
      {/snippet}
      <SignInFailedExample />
    </Example>

    <Example title="Status message" source={statusSource}>
      {#snippet description()}
        For news that shouldn't interrupt, like a confirmation, use
        <code>role="status"</code>: screen readers announce it when they finish
        what they're reading.
      {/snippet}
      <StatusExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        An alert has <code>role="alert"</code>, so screen readers interrupt what
        they're reading to announce it when it appears. Use it for errors and
        other urgent messages.
      </li>
      <li>
        For messages that can wait, pass <code>role="status"</code>, and screen
        readers announce it politely.
      </li>
      <li>
        Screen readers announce alerts that appear after the page loads. Render
        an alert when its message becomes true, rather than hiding and showing
        it with CSS.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"tonal"`,
          description: "How much attention the alert draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The theme color the alert uses.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"md"`,
          description: "Corner rounding.",
        },
        {
          name: "role",
          type: "string",
          default: `"alert"`,
          description:
            'How screen readers announce it. Use "status" for messages that shouldn\'t interrupt.',
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The alert's `<div>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the alert. Your classes override the alert's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The message.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      alert's <code>&lt;div&gt;</code>.
    </p>
  </Section>
</div>
