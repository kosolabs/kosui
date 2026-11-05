import type { ComponentDocs } from "#ui";
import CommentExample from "./examples/comment.svelte";
import FeedbackExample from "./examples/feedback.svelte";
import commentSource from "./examples/comment.svelte?raw";
import feedbackSource from "./examples/feedback.svelte?raw";

export const docs: ComponentDocs = {
  intro:
    "Textareas let people write more than a line, like a comment, a message or a description.",
  examples: [
    {
      title: "Feedback",
      description:
        "Name a textarea with a `<label>`. Native limits like `required` and `maxlength` work as they do on any textarea, and the count is linked with `aria-describedby`.",
      source: feedbackSource,
      component: FeedbackExample,
    },
    {
      title: "Comment box",
      description:
        "With `rows={1}`, a textarea is exactly as tall as an Input or Button of the same size, so it lines up in a row. The `field-sizing-content` class grows it with its text in browsers that support it.",
      source: commentSource,
      component: CommentExample,
    },
  ],
  accessibility: [
    "Textarea renders a native `<textarea>`. Give it a name with a `<label>` or `aria-label`; a placeholder isn't one.",
    'Textarea looks and behaves like Input: focus draws a 2-pixel outline in its color, its resting edge contrasts at least 3:1, and invalid textareas turn the error color, for native validation or `aria-invalid="true"`.',
    "Enter adds a new line. If Enter sends, as in a chat, say so nearby and keep a button that does the same.",
  ],
  api: [
    {
      rows: [
        {
          name: "value",
          type: "string",
          description: "Bindable. The textarea's text.",
        },
        {
          name: "variant",
          type: `"outlined" | "filled" | "plain"`,
          default: `"outlined"`,
          description:
            "An outline, a fill with a bottom line, or no container for textareas that sit in their own surface.",
        },
        {
          name: "color",
          type: `"primary" | "secondary" | "tertiary" | "error" | "plain" | "inherit"`,
          default: `"primary"`,
          description: "The color of the focus outline.",
        },
        {
          name: "size",
          type: `"xs" | "sm" | "md" | "lg" | "xl"`,
          default: `"sm"`,
          description:
            "Text size and padding. One row is the shared row height: 28, 36, 44, 52 or 60 pixels.",
        },
        {
          name: "shape",
          type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "full"`,
          default: `"xs"`,
          description: "Corner rounding.",
        },
        {
          name: "el",
          type: "HTMLTextAreaElement",
          description: "Bindable. The `<textarea>`.",
        },
        {
          name: "class",
          type: "ClassValue",
          description:
            "Classes for the textarea. Your classes override the textarea's.",
        },
      ],
      note: "Every other attribute, event handler and attachment passes through to the `<textarea>`, including `rows`, `required`, `maxlength` and `disabled`.",
    },
  ],
};
