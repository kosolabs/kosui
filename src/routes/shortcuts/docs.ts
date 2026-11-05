import type { ComponentDocs } from "#ui";
import RecordExample from "./examples/record.svelte";
import SendMessageExample from "./examples/send-message.svelte";
import recordSource from "./examples/record.svelte?raw";
import sendMessageSource from "./examples/send-message.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "A `Shortcut` is a key combination. It matches keyboard events and shows itself the way each platform writes it, and `ShortcutHint` displays it as keys. Use `mod` for the primary modifier: \u2318 on Apple devices and Ctrl everywhere else.",
  examples: [
    {
      title: "Handling a shortcut",
      description:
        "`matches` checks a keyboard event, so a component can handle its own shortcuts in `onkeydown`. Show the shortcut next to the control it triggers so people can discover it.",
      source: sendMessageSource,
      component: SendMessageExample,
    },
    {
      title: "Recording a shortcut",
      description:
        "`Shortcut.fromEvent` turns a key press into a shortcut, for settings that let people choose their own. Escape cancels.",
      source: recordSource,
      component: RecordExample,
    },
  ],
  accessibility: [
    "`ShortcutHint` renders `<kbd>` keys that are hidden from screen readers, plus visually hidden text like \u201cCommand+K\u201d or \u201cCtrl+K\u201d, so the keys are read by name rather than as symbols.",
    "Prefer shortcuts with a modifier. Single-key shortcuts like `?` collide with typing and with screen reader keys, so WCAG asks that people can turn them off or that they work only while the relevant control has focus. The Command Palette skips them while someone is typing in a field.",
    "Use `mod` rather than `meta` for app shortcuts. On Windows and Linux, `meta` is the Windows key, which the operating system reserves.",
    'Letters match whatever their case. When a key types a character outside ASCII, like Option+L (\u00ac) on a Mac or Ctrl+K on a Russian layout, the physical key is matched instead. For shifted symbols, give the symbol and `shift`, like `{ key: "?", shift: true }`.',
  ],
  api: [
    {
      name: "Shortcut",
      rows: [
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
      ],
    },
    {
      name: "Methods",
      rows: [
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
      ],
    },
    {
      name: "ShortcutHint",
      rows: [
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
      ],
      note: 'Other attributes are passed to the outer `<kbd>`. Keys inherit the font size, so set `class="text-base"` to make them larger.',
    },
  ],
  examplesNote:
    "For shortcuts that work anywhere in the app, register them as actions with the [Command Palette](/command).",
};
