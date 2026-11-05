import type { ComponentDocs } from "#ui";
import AvatarStatusExample from "./examples/avatar-status.svelte";
import UnreadCountExample from "./examples/unread-count.svelte";
import avatarStatusSource from "./examples/avatar-status.svelte?raw";
import unreadCountSource from "./examples/unread-count.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Badges show a count or status on the corner of another element, like unread messages on an inbox button.",
  examples: [
    {
      title: "Unread count",
      description:
        "Put the count in the button's name, so screen readers announce it with the button, and hide the badge itself with `aria-hidden`. An empty `content` hides the badge.",
      source: unreadCountSource,
      component: UnreadCountExample,
    },
    {
      title: "Status on an avatar",
      description: "Pass a `content` snippet to show an icon instead of text.",
      source: avatarStatusSource,
      component: AvatarStatusExample,
    },
  ],
  accessibility: [
    'A badge is separate text after its element, so a screen reader reads it apart from the element it labels. Put what the badge says in the element\'s name, like `aria-label="Inbox, 3 unread"`, and give the badge `aria-hidden="true"`.',
    "Don't rely on the badge's color alone to carry meaning; say it in the element's name too.",
  ],
  api: [
    {
      rows: [
        {
          name: "content",
          type: "string | Snippet",
          description:
            "What the badge shows. When empty, the badge isn't rendered.",
        },
        {
          name: "variant",
          type: `"elevated" | "filled" | "tonal" | "outlined" | "plain" | "text"`,
          default: `"filled"`,
          description: "How much attention the badge draws.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"error"`,
          description: "The theme color the badge uses.",
        },
        {
          name: "verticalAlignment",
          type: `"top" | "bottom"`,
          default: `"top"`,
          description: "Which edge of the element the badge sits on.",
        },
        {
          name: "horizontalAlignment",
          type: `"left" | "right"`,
          default: `"right"`,
          description: "Which side of the element the badge sits on.",
        },
        {
          name: "el",
          type: "HTMLElement",
          description: "Bindable. The badge's `<span>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the badge. Your classes override the badge's.",
        },
        {
          name: "children",
          type: "Snippet",
          description: "The element the badge sits on.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the badge's `<span>`.",
    },
  ],
};
