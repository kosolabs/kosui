<script lang="ts">
  import { Button, Dialog, SHAPES, type Shape } from "#lib/index.js";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import { Trash2 } from "@lucide/svelte";
  import ChooseExample from "./examples/choose.svelte";
  import chooseSource from "./examples/choose.svelte?raw";
  import HelpersExample from "./examples/helpers.svelte";
  import helpersSource from "./examples/helpers.svelte?raw";
  import NestedExample from "./examples/nested.svelte";
  import nestedSource from "./examples/nested.svelte?raw";

  let open = $state(false);
  let icon = $state(false);
  let shape: Shape = $state("xl");
  let result = $state("");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Dialogs ask a question or confirm an action before the page continues. Each
    has a title, a message and a row of actions. Call
    <code>getDialogs()</code> for an alert, a confirmation or a prompt, or
    render a <code>Dialog</code> for anything else.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        <Button variant="tonal" color="error" onclick={() => (open = true)}>
          Discard draft
        </Button>
        <p class="text-sm" aria-live="polite">{result}</p>
        <Dialog
          bind:open
          icon={icon ? Trash2 : undefined}
          {shape}
          title="Discard draft?"
          onSelect={(discard) =>
            (result = discard ? "Discarded" : "Kept the draft")}
        >
          Your unsent message will be deleted.
          {#snippet actions(select)}
            <Button variant="plain" onclick={() => select(false)}>
              Cancel
            </Button>
            <Button variant="filled" onclick={() => select(true)}>
              Discard
            </Button>
          {/snippet}
        </Dialog>
      </div>
    {/snippet}
    {#snippet controls()}
      <SwitchSetting label="Icon" bind:value={icon} />
      <ToggleButtonSetting
        bind:value={shape}
        options={[...SHAPES]}
        label="Shape"
      />
    {/snippet}
    {#snippet code()}
      <Code
        component="Dialog"
        components={["Button"]}
        imports={icon ? [`import { Trash2 } from "@lucide/svelte";`] : []}
        bindables={["open"]}
        defaults={{ open: false, title: "", shape: "xl" }}
        values={{ title: "Discard draft?", shape }}
        expressions={{
          icon: icon ? "Trash2" : undefined,
          onSelect: "(discard) => …",
        }}
        children={`Your unsent message will be deleted.
  {#snippet actions(select)}
    <Button variant="plain" onclick={() => select(false)}>Cancel</Button>
    <Button variant="filled" onclick={() => select(true)}>Discard</Button>
  {/snippet}`}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Alert, confirm and prompt" source={helpersSource}>
      {#snippet description()}
        Put <code>&lt;DialogProvider&gt;</code> around your app once, in the
        root <code>+layout.svelte</code>. Then <code>getDialogs()</code> returns
        <code>alert</code>, <code>confirm</code> and <code>prompt</code>, which
        work like the browser's own and return a promise with the answer.
      {/snippet}
      <HelpersExample />
    </Example>

    <Example title="Choose between options" source={chooseSource}>
      {#snippet description()}
        <code>show</code> takes any list of actions and resolves with the value
        of the one chosen, or <code>undefined</code> if the dialog is dismissed.
      {/snippet}
      <ChooseExample />
    </Example>

    <Example title="Dialog with a form" source={nestedSource}>
      {#snippet description()}
        A <code>Dialog</code> can hold a form, with its submit button among the actions.
        Here, cancelling with unsaved changes asks for confirmation in a second dialog
        on top of the first.
      {/snippet}
      <NestedExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        The <code>title</code> renders as a heading and names the dialog. Give a
        dialog without a title an <code>aria-label</code>. Alerts, confirmations
        and prompts also use their message as the description.
      </li>
      <li>
        Focus moves to the action marked as the default, or the first field or
        action, and returns to the button that opened the dialog when it closes,
        even when dialogs close together.
      </li>
      <li>
        Escape, a click on the backdrop, and Android's back gesture dismiss a
        dialog: <code>onSelect</code> gets <code>undefined</code>,
        <code>confirm</code> resolves <code>false</code>, and
        <code>prompt</code> resolves <code>undefined</code>.
      </li>
      <li>
        A prompt's field is a form: Enter submits it, and its validation, like
        <code>required</code>, applies.
      </li>
      <li>
        Dialog is built on Modal, so the page behind it is inert and nothing
        animates when reduced motion is requested.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <h3 class="text-xl">Dialog</h3>
    <PropsTable
      rows={[
        {
          name: "open",
          type: "boolean",
          default: "false",
          description: "Bindable. Whether the dialog is showing.",
        },
        {
          name: "title",
          type: "string",
          description: "The heading, which also names the dialog.",
        },
        {
          name: "icon",
          type: "LucideIcon",
          description: "An icon above the title, which centers the title.",
        },
        {
          name: "actions",
          type: "Snippet<[select: (value: T | undefined) => void]>",
          description:
            "The buttons along the bottom. Call select to close the dialog with a value.",
        },
        {
          name: "onSelect",
          type: "(value: T | undefined) => void",
          description:
            "Called when the dialog closes through select, or with undefined when it's dismissed.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xl"`,
          description: "The corner radius.",
        },
        {
          name: "el",
          type: "HTMLDialogElement",
          description: "Bindable. The `<dialog>`.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The message or other content.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other Modal prop, attribute and event handler passes through to the
      <code>&lt;dialog&gt;</code>.
    </p>

    <h3 class="mt-6 text-xl">getDialogs()</h3>
    <p class="max-w-prose text-sm">
      Each method takes an <code>icon</code>, a <code>title</code> and a
      <code>message</code> (a string or snippet), plus the options below. A request
      made while a dialog is showing waits for it to close.
    </p>
    <PropsTable
      rows={[
        {
          name: "alert",
          type: "({ acceptText? }) => Promise<void>",
          description: "Shows a message with an OK button.",
        },
        {
          name: "confirm",
          type: "({ cancelText?, acceptText? }) => Promise<boolean>",
          description:
            "Asks to go ahead. Resolves true for OK, false for Cancel or dismissal.",
        },
        {
          name: "prompt",
          type: "({ input?, cancelText?, acceptText? }) => Promise<string | undefined>",
          description:
            "Asks for a value. input takes Input props, like value, type and required. Resolves undefined when cancelled.",
        },
        {
          name: "show",
          type: "<T>({ actions: DialogAction<T>[] }) => Promise<T | undefined>",
          description:
            "Offers any actions, each { text, value, default?, variant?, color?, shape? }. default gives it focus.",
        },
      ]}
    />
  </Section>
</div>
