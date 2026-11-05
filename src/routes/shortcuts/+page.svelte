<script lang="ts">
  import { Link, Shortcut, ShortcutHint } from "#lib/index.js";
  import { resolve } from "$app/paths";
  import {
    Code,
    Example,
    Playground,
    PropsTable,
    Section,
    SwitchSetting,
    ToggleButtonSetting,
  } from "#ui";
  import RecordExample from "./examples/record.svelte";
  import recordSource from "./examples/record.svelte?raw";
  import SendMessageExample from "./examples/send-message.svelte";
  import sendMessageSource from "./examples/send-message.svelte?raw";

  let key = $state("k");
  let mod = $state(true);
  let ctrl = $state(false);
  let alt = $state(false);
  let shift = $state(false);
  let meta = $state(false);
  let pressed: Shortcut | undefined = $state();

  const shortcut = $derived(new Shortcut({ key, mod, ctrl, alt, shift, meta }));
  const options = $derived(
    Object.entries({ mod, ctrl, alt, shift, meta })
      .filter(([, on]) => on)
      .map(([name]) => `${name}: true`),
  );

  let presses = $derived.by(() => {
    void shortcut;
    return 0;
  });

  function onkeydown(event: KeyboardEvent) {
    if (["Alt", "Control", "Meta", "Shift"].includes(event.key)) return;
    pressed = Shortcut.fromEvent(event);
    if (shortcut.matches(event)) {
      event.preventDefault();
      presses++;
    }
  }
</script>

<svelte:window {onkeydown} />

<div class="flex max-w-5xl flex-col gap-12">
  <p class="max-w-prose text-lg">
    A <code>Shortcut</code> is a key combination. It matches keyboard events and
    shows itself the way each platform writes it, and
    <code>ShortcutHint</code> displays it as keys. Use <code>mod</code> for the primary
    modifier: ⌘ on Apple devices and Ctrl everywhere else.
  </p>

  <Playground>
    {#snippet component()}
      <div class="flex flex-col items-center gap-4 text-center">
        <ShortcutHint {shortcut} class="text-base" />
        <p class="text-sm" aria-live="polite">
          {presses === 0
            ? "Press it anywhere on the page"
            : `Matched ${presses} ${presses === 1 ? "time" : "times"}`}
        </p>
        <p class="flex items-center gap-2 text-sm text-m3-on-surface-variant">
          Last pressed:
          {#if pressed}
            <ShortcutHint shortcut={pressed} />
          {:else}
            nothing yet
          {/if}
        </p>
      </div>
    {/snippet}
    {#snippet controls()}
      <ToggleButtonSetting
        bind:value={key}
        options={["k", "Enter", "ArrowUp", "/"]}
        label="Key"
      />
      <SwitchSetting bind:value={mod} label="mod" />
      <SwitchSetting bind:value={ctrl} label="ctrl" />
      <SwitchSetting bind:value={alt} label="alt" />
      <SwitchSetting bind:value={shift} label="shift" />
      <SwitchSetting bind:value={meta} label="meta" />
    {/snippet}
    {#snippet code()}
      <Code
        component="ShortcutHint"
        components={["Shortcut"]}
        defaults={{}}
        values={{}}
        expressions={{
          shortcut: `new Shortcut({ ${[`key: "${key}"`, ...options].join(", ")} })`,
        }}
      />
    {/snippet}
  </Playground>

  <Section title="Examples">
    <Example title="Handling a shortcut" source={sendMessageSource}>
      {#snippet description()}
        <code>matches</code> checks a keyboard event, so a component can handle
        its own shortcuts in <code>onkeydown</code>. Show the shortcut next to
        the control it triggers so people can discover it.
      {/snippet}
      <SendMessageExample />
    </Example>

    <Example title="Recording a shortcut" source={recordSource}>
      {#snippet description()}
        <code>Shortcut.fromEvent</code> turns a key press into a shortcut, for settings
        that let people choose their own. Escape cancels.
      {/snippet}
      <RecordExample />
    </Example>

    <p class="max-w-prose">
      For shortcuts that work anywhere in the app, register them as actions with
      the <Link href={resolve("command")}>Command Palette</Link>.
    </p>
  </Section>

  <Section title="Accessibility">
    <ul class="flex max-w-prose list-disc flex-col gap-2 pl-5">
      <li>
        <code>ShortcutHint</code> renders <code>&lt;kbd&gt;</code> keys that are hidden
        from screen readers, plus visually hidden text like “Command+K” or “Ctrl+K”,
        so the keys are read by name rather than as symbols.
      </li>
      <li>
        Prefer shortcuts with a modifier. Single-key shortcuts like
        <kbd>?</kbd> collide with typing and with screen reader keys, so WCAG asks
        that people can turn them off or that they work only while the relevant control
        has focus. The Command Palette skips them while someone is typing in a field.
      </li>
      <li>
        Use <code>mod</code> rather than <code>meta</code> for app shortcuts. On
        Windows and Linux, <code>meta</code> is the Windows key, which the operating
        system reserves.
      </li>
      <li>
        Letters match whatever their case. When a key types a character outside
        ASCII, like Option+L (¬) on a Mac or Ctrl+K on a Russian layout, the
        physical key is matched instead. For shifted symbols, give the symbol
        and <code>shift</code>, like <code>{`{ key: "?", shift: true }`}</code>.
      </li>
    </ul>
  </Section>

  <Section title="API">
    <h3 class="text-xl">Shortcut</h3>
    <PropsTable
      rows={[
        {
          name: "key",
          type: "string",
          description:
            "The key's KeyboardEvent.key value, like k, ?, Enter or ArrowUp.",
        },
        {
          name: "mod",
          type: "boolean",
          default: "false",
          description: "⌘ on Apple devices and Ctrl everywhere else.",
        },
        {
          name: "ctrl",
          type: "boolean",
          default: "false",
          description: "Control.",
        },
        {
          name: "alt",
          type: "boolean",
          default: "false",
          description: "Alt, or Option on Apple devices.",
        },
        {
          name: "shift",
          type: "boolean",
          default: "false",
          description: "Shift.",
        },
        {
          name: "meta",
          type: "boolean",
          default: "false",
          description: "⌘ on Apple devices and the Windows key elsewhere.",
        },
      ]}
    />

    <h3 class="mt-6 text-xl">Methods</h3>
    <PropsTable
      rows={[
        {
          name: "matches",
          type: "(event: KeyboardEvent) => boolean",
          description: "Whether a key press is this shortcut.",
        },
        {
          name: "equals",
          type: "(other: Shortcut) => boolean",
          description:
            "Whether two shortcuts are the same keys on this platform.",
        },
        {
          name: "keys",
          type: "() => string[]",
          description: `The keys to display, like ["⌘", "K"] or ["Ctrl", "K"].`,
        },
        {
          name: "toString",
          type: "() => string",
          description: "The shortcut as text, like Command+K or Ctrl+K.",
        },
        {
          name: "Shortcut.fromEvent",
          type: "(event: KeyboardEvent) => Shortcut",
          description: "The shortcut a key press makes.",
        },
        {
          name: "Shortcut.isChar",
          type: "(event: KeyboardEvent) => boolean",
          description:
            "Whether a key press types a character, with no Ctrl, Alt or ⌘.",
        },
        {
          name: "Shortcut.ENTER, ESCAPE, …",
          type: "Shortcut",
          description:
            "Common keys: ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, HOME, END, ENTER, ESCAPE, SPACE, TAB_FORWARD and TAB_BACKWARD.",
        },
      ]}
    />

    <h3 class="mt-6 text-xl">ShortcutHint</h3>
    <PropsTable
      rows={[
        {
          name: "shortcut",
          type: "Shortcut",
          description: "The shortcut to show.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The outer <kbd>.",
        },
      ]}
    />
    <p class="max-w-prose text-sm text-m3-on-surface-variant">
      Other attributes are passed to the outer <code>&lt;kbd&gt;</code>. Keys
      inherit the font size, so set <code>class="text-base"</code> to make them larger.
    </p>
  </Section>
</div>
