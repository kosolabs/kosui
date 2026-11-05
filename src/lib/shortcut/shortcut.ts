export type ShortcutOptions = {
  key: string;
  mod?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
};

type Modifiers = { ctrl: boolean; alt: boolean; shift: boolean; meta: boolean };

const APPLE_MODIFIERS = [
  ["ctrl", "⌃", "Control"],
  ["alt", "⌥", "Option"],
  ["shift", "⇧", "Shift"],
  ["meta", "⌘", "Command"],
] as const;

const OTHER_MODIFIERS = [
  ["meta", "Win", "Win"],
  ["ctrl", "Ctrl", "Ctrl"],
  ["alt", "Alt", "Alt"],
  ["shift", "Shift", "Shift"],
] as const;

const ARROWS: Record<string, string> = {
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
  ArrowUp: "↑",
};

const APPLE_KEYS: Record<string, string> = {
  ...ARROWS,
  Backspace: "⌫",
  Delete: "⌦",
  End: "↘",
  Enter: "↩",
  Escape: "⎋",
  Home: "↖",
  PageDown: "⇟",
  PageUp: "⇞",
  Tab: "⇥",
  " ": "Space",
};

const OTHER_KEYS: Record<string, string> = {
  ...ARROWS,
  Delete: "Del",
  Escape: "Esc",
  PageDown: "PgDn",
  PageUp: "PgUp",
  " ": "Space",
};

const KEY_NAMES: Record<string, string> = {
  ArrowDown: "Down Arrow",
  ArrowLeft: "Left Arrow",
  ArrowRight: "Right Arrow",
  ArrowUp: "Up Arrow",
  " ": "Space",
};

export function isApple(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.platform)
  );
}

function normalize(key: string): string {
  return key.length === 1 ? key.toLowerCase() : key;
}

function isAscii(char: string): boolean {
  return char.length === 1 && char <= "~";
}

function keyOf(event: KeyboardEvent): string {
  if (!isAscii(event.key) && (event.key.length === 1 || event.key === "Dead")) {
    const physical = /^(?:Key|Digit)(.)$/.exec(event.code)?.[1];
    if (physical) return physical.toLowerCase();
  }
  return normalize(event.key);
}

function keyLabel(key: string, labels: Record<string, string>): string {
  return labels[key] ?? (key.length === 1 ? key.toUpperCase() : key);
}

export class Shortcut {
  readonly key: string;
  readonly mod: boolean;
  readonly ctrl: boolean;
  readonly alt: boolean;
  readonly shift: boolean;
  readonly meta: boolean;

  constructor({ key, mod, ctrl, alt, shift, meta }: ShortcutOptions) {
    this.key = normalize(key);
    this.mod = mod ?? false;
    this.ctrl = ctrl ?? false;
    this.alt = alt ?? false;
    this.shift = shift ?? false;
    this.meta = meta ?? false;
  }

  #modifiers(apple: boolean): Modifiers {
    return {
      ctrl: this.ctrl || (this.mod && !apple),
      alt: this.alt,
      shift: this.shift,
      meta: this.meta || (this.mod && apple),
    };
  }

  #id(): string {
    const { ctrl, alt, shift, meta } = this.#modifiers(isApple());
    return [ctrl && "Control", alt && "Alt", shift && "Shift", meta && "Meta"]
      .filter(Boolean)
      .concat(this.key)
      .join("+");
  }

  equals(other: Shortcut): boolean {
    return this.#id() === other.#id();
  }

  matches(event: KeyboardEvent): boolean {
    return this.equals(Shortcut.fromEvent(event));
  }

  keys(): string[] {
    const apple = isApple();
    const modifiers = this.#modifiers(apple);
    return [
      ...(apple ? APPLE_MODIFIERS : OTHER_MODIFIERS)
        .filter(([name]) => modifiers[name])
        .map(([, symbol]) => symbol),
      keyLabel(this.key, apple ? APPLE_KEYS : OTHER_KEYS),
    ];
  }

  toString(): string {
    const apple = isApple();
    const modifiers = this.#modifiers(apple);
    return [
      ...(apple ? APPLE_MODIFIERS : OTHER_MODIFIERS)
        .filter(([name]) => modifiers[name])
        .map(([, , name]) => name),
      keyLabel(this.key, KEY_NAMES),
    ].join("+");
  }

  static isChar(event: KeyboardEvent): boolean {
    return (
      event.key.length === 1 &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey
    );
  }

  static fromEvent(event: KeyboardEvent): Shortcut {
    return new Shortcut({
      key: keyOf(event),
      ctrl: event.ctrlKey,
      alt: event.altKey,
      shift: event.shiftKey,
      meta: event.metaKey,
    });
  }

  static ARROW_UP = new Shortcut({ key: "ArrowUp" });
  static ARROW_DOWN = new Shortcut({ key: "ArrowDown" });
  static ARROW_LEFT = new Shortcut({ key: "ArrowLeft" });
  static ARROW_RIGHT = new Shortcut({ key: "ArrowRight" });
  static END = new Shortcut({ key: "End" });
  static ENTER = new Shortcut({ key: "Enter" });
  static ESCAPE = new Shortcut({ key: "Escape" });
  static HOME = new Shortcut({ key: "Home" });
  static SPACE = new Shortcut({ key: " " });
  static TAB_BACKWARD = new Shortcut({ key: "Tab", shift: true });
  static TAB_FORWARD = new Shortcut({ key: "Tab" });
}
