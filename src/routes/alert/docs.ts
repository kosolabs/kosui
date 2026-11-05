import type { ComponentDocs } from "#ui";
import SignInFailedExample from "./examples/sign-in-failed.svelte";
import StatusExample from "./examples/status.svelte";
import signInFailedSource from "./examples/sign-in-failed.svelte?raw";
import statusSource from "./examples/status.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Alerts show a short, important message, like an error or a change people need to know about.",
  examples: [
    {
      title: "Error",
      description:
        "Alerts take any content, so add an icon or an action with `class` for the layout. Screen readers announce an alert as soon as it appears.",
      source: signInFailedSource,
      component: SignInFailedExample,
    },
    {
      title: "Status message",
      description:
        "For news that shouldn't interrupt, like a confirmation, use `role=\"status\"`: screen readers announce it when they finish what they're reading.",
      source: statusSource,
      component: StatusExample,
    },
  ],
  accessibility: [
    'An alert has `role="alert"`, so screen readers interrupt what they\'re reading to announce it when it appears. Use it for errors and other urgent messages.',
    'For messages that can wait, pass `role="status"`, and screen readers announce it politely.',
    "Screen readers announce alerts that appear after the page loads. Render an alert when its message becomes true, rather than hiding and showing it with CSS.",
  ],
  api: [
    {
      rows: [
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
      ],
      note: "Every other attribute, event handler and attachment passes through to the alert's `<div>`.",
    },
  ],
};
