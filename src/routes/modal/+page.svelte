<script lang="ts">
  import { Button, Modal } from "#lib/index.js";
  import { Example, Playground, PropsTable, Section } from "#ui";
  import RenameExample from "./examples/rename.svelte";
  import renameSource from "./examples/rename.svelte?raw";

  const id = $props.id();
  let open = $state(false);
  let closedBy = $state("");
</script>

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    Modals hold a task in front of the page and block the rest of it until the
    task is done or dismissed. Dialog builds on Modal for common prompts like
    confirmations.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-3">
        <Button variant="filled" onclick={() => (open = true)}>
          Show terms
        </Button>
        <p class="text-sm" aria-live="polite">{closedBy}</p>
        <Modal
          bind:open
          aria-labelledby="{id}-title"
          class="w-[min(calc(100%-1em),28em)]"
          onCancel={() => (closedBy = "Dismissed")}
        >
          <h2 id="{id}-title" class="mb-2 text-xl">Terms of service</h2>
          <p class="mb-4 text-sm">
            Press Escape or click outside to dismiss, or accept below.
          </p>
          <div class="flex justify-end">
            <Button
              variant="filled"
              onclick={() => {
                open = false;
                closedBy = "Accepted";
              }}
            >
              Accept
            </Button>
          </div>
        </Modal>
      </div>
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Form in a modal" source={renameSource}>
      {#snippet description()}
        Name the modal with <code>aria-labelledby</code> pointing at its
        heading. Focus moves into the modal when it opens, starting at an
        element with
        <code>autofocus</code>, and returns to the button that opened it when it
        closes.
      {/snippet}
      <RenameExample />
    </Example>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        Modal renders a native <code>&lt;dialog&gt;</code> opened with
        <code>showModal()</code>, so the rest of the page is inert and focus
        stays inside it.
      </li>
      <li>
        Name it with <code>aria-labelledby</code> or <code>aria-label</code>, or
        screen readers announce just "dialog".
      </li>
      <li>
        Escape, a click on the backdrop, and Android's back gesture close it,
        and focus returns to the element that had it before the modal opened.
      </li>
      <li>
        While a modal is open, keyboard shortcuts registered on the page don't
        fire, so they can't act on the page behind it.
      </li>
      <li>Modals don't animate when reduced motion is requested.</li>
    </ul>
  </Section>

  <Section title="API">
    <PropsTable
      rows={[
        {
          name: "open",
          type: "boolean",
          default: "false",
          description:
            "Bindable. Whether the modal is showing. Escape and backdrop clicks set it to false.",
        },
        {
          name: "onCancel",
          type: "() => void",
          description:
            "Called when someone dismisses the modal with Escape, the backdrop or the back gesture.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xl"`,
          description: "The corner radius.",
        },
        {
          name: "transition",
          type: "(node: Element) => TransitionConfig",
          default: "a quick zoom",
          description:
            "The Svelte transition for opening and closing. Drawer uses it to slide in.",
        },
        {
          name: "el",
          type: "HTMLDialogElement",
          description: "Bindable. The `<dialog>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the dialog box, such as its width. It has Material 3's dialog surface by default.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The modal's content.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Every other attribute, event handler and attachment passes through to the
      <code>&lt;dialog&gt;</code>.
    </p>
  </Section>
</div>
