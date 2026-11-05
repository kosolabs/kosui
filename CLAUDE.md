# Kosui

Apply the Design Philosophy in the README when deciding how to build or change a component.

Record the conventions you learn while working on Kosui in this file. Write each as a lasting rule, not as a history of how it came about.

## Platform Workarounds

When you hand-roll something because a browser lacks a platform feature, add it to `WORKAROUNDS` in `src/workarounds.test.ts` with its [web-features](https://github.com/web-platform-dx/web-features) id. The test fails once the feature becomes Baseline, so we know to adopt it.

## Laying Out Examples

Playgrounds and examples share one layout, so nothing moves when someone tries them:

- **Center a demo in a column.** Put the control first and what it changed underneath, as a `<p class="text-sm" aria-live="polite">`. Never put changing text in the same row as a control: when the text changes length, the row re-centers and the control moves.
- **Always render the status line, with text from the start**, like "Not sent yet". A line that's empty or appears later pushes the layout around the first time.
- **Lay out forms like forms.** Left-align fields, labels and the submit button, and give the form a fixed width with `w-full max-w-sm` or `max-w-md`, so changing text can't resize it.
- **Keep the controls in place.** Disable a button that has nothing to do instead of hiding it, and put content that grows, like a list of posted comments, below the controls.

@README.md
@DEVELOPMENT.md
