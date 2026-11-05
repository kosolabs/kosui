import { resolve } from "$app/paths";
import {
  AppWindow,
  Bell,
  BookOpen,
  Box,
  ChevronRight,
  CircleUserRound,
  Command,
  PanelLeft,
  Navigation,
  Keyboard,
  Layers,
  Link,
  ListFilter,
  Loader,
  MessageCircleQuestionMark,
  MessageSquare,
  MessageSquareWarning,
  MousePointerClick,
  PanelTop,
  Plus,
  RectangleEllipsis,
  SlidersHorizontal,
  SquareMenu,
  TextCursorInput,
  TextQuote,
  Tag,
  ToggleRight,
  Columns3,
  type LucideIcon,
} from "@lucide/svelte";

export type NavItem = {
  name: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export type NavCategory = {
  name: string;
  items: NavItem[];
};

export const CATEGORIES: NavCategory[] = [
  {
    name: "Actions",
    items: [
      {
        name: "Button",
        href: resolve("/button"),
        description: "Take an action, like saving or deleting.",
        icon: MousePointerClick,
      },
      {
        name: "Fab",
        href: resolve("/fab"),
        description: "The main action on a screen, floating above it.",
        icon: Plus,
      },
      {
        name: "Toggle Group",
        href: resolve("/toggles"),
        description: "Pick one of a few options from connected buttons.",
        icon: Columns3,
      },
      {
        name: "Chip",
        href: resolve("/chips"),
        description: "Tags, filters and recipients that can be removed.",
        icon: Tag,
      },
    ],
  },
  {
    name: "Inputs",
    items: [
      {
        name: "Input",
        href: resolve("/input"),
        description: "A single line of text, like a name or a search.",
        icon: TextCursorInput,
      },
      {
        name: "Textarea",
        href: resolve("/textarea"),
        description: "Longer text, like a comment or a message.",
        icon: RectangleEllipsis,
      },
      {
        name: "Autocomplete",
        href: resolve("/autocomplete"),
        description: "Suggestions that appear while typing.",
        icon: ListFilter,
      },
      {
        name: "Slider",
        href: resolve("/slider"),
        description: "A number from a range, picked by dragging.",
        icon: SlidersHorizontal,
      },
      {
        name: "Switch",
        href: resolve("/switch"),
        description: "A setting that turns on or off right away.",
        icon: ToggleRight,
      },
    ],
  },
  {
    name: "Feedback",
    items: [
      {
        name: "Alert",
        href: resolve("/alert"),
        description: "A short, important message.",
        icon: MessageSquareWarning,
      },
      {
        name: "Badge",
        href: resolve("/badge"),
        description: "A count or status on the corner of an element.",
        icon: Bell,
      },
      {
        name: "Progress",
        href: resolve("/progress-indicators"),
        description: "Show that something is loading, and how far along.",
        icon: Loader,
      },
      {
        name: "Skeleton",
        href: resolve("/skeleton"),
        description: "A placeholder in the shape of loading content.",
        icon: PanelTop,
      },
    ],
  },
  {
    name: "Overlays",
    items: [
      {
        name: "Tooltip",
        href: resolve("/tooltips"),
        description: "A short label on hover or focus.",
        icon: MessageSquare,
      },
      {
        name: "Popover",
        href: resolve("/popover"),
        description: "Content floating next to the element that opened it.",
        icon: Layers,
      },
      {
        name: "Menu",
        href: resolve("/menus"),
        description: "A list of actions or choices from a button.",
        icon: SquareMenu,
      },
      {
        name: "Modal",
        href: resolve("/modal"),
        description: "A task in front of the page that blocks the rest.",
        icon: AppWindow,
      },
      {
        name: "Dialog",
        href: resolve("/dialogs"),
        description: "Alerts, confirmations and prompts.",
        icon: MessageCircleQuestionMark,
      },
      {
        name: "Drawer",
        href: resolve("/drawer"),
        description: "Navigation or a panel that slides in from the edge.",
        icon: PanelLeft,
      },
      {
        name: "Command Palette",
        href: resolve("/command"),
        description: "Search every action and run one from the keyboard.",
        icon: Command,
      },
    ],
  },
  {
    name: "Navigation",
    items: [
      {
        name: "Link",
        href: resolve("/links"),
        description: "Go to another page or place on the page.",
        icon: Link,
      },
      {
        name: "Nav Item",
        href: resolve("/nav-item"),
        description: "Links in a sidebar or drawer, with the current page.",
        icon: Navigation,
      },
      {
        name: "Breadcrumbs",
        href: resolve("/breadcrumbs"),
        description: "Where a page sits in a hierarchy.",
        icon: ChevronRight,
      },
    ],
  },
  {
    name: "Content",
    items: [
      {
        name: "Avatar",
        href: resolve("/avatar"),
        description: "A person's picture, initials or icon.",
        icon: CircleUserRound,
      },
      {
        name: "Box",
        href: resolve("/box"),
        description: "A container that speaks the design language.",
        icon: Box,
      },
      {
        name: "Markdown",
        href: resolve("/markdown"),
        description: "Markdown that people write, rendered safely.",
        icon: TextQuote,
      },
      {
        name: "Shortcut",
        href: resolve("/shortcuts"),
        description: "Keyboard shortcuts that work on every platform.",
        icon: Keyboard,
      },
    ],
  },
];

export const GUIDES: NavItem[] = [
  {
    name: "Design Language",
    href: resolve("/design-language"),
    description: "The principles and shared props behind every component.",
    icon: BookOpen,
  },
];

export function findPage(pathname: string): NavItem | undefined {
  return [...GUIDES, ...CATEGORIES.flatMap((category) => category.items)].find(
    (item) => item.href === pathname,
  );
}
