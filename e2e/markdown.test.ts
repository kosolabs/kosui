import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("the Markdown page renders without warnings", async ({ page }) => {
  const warnings: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "warning" || msg.type() === "error") {
      warnings.push(msg.text());
    }
  });
  await page.goto("/markdown");
  await expect(
    page.getByRole("img", { name: "An example avatar" }),
  ).toBeVisible();
  expect(warnings).toEqual([]);
});

test.describe("Markdown Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/markdown");
  });

  const source = (page: Page) =>
    page.getByRole("textbox", { name: "Markdown", exact: true });
  const output = (page: Page) =>
    source(page).locator("xpath=..").locator("> div").last();

  async function render(page: Page, markdown: string) {
    await source(page).fill(markdown);
  }

  test("renders semantic elements", async ({ page }) => {
    await render(
      page,
      "# Title\n\n## Section\n\n> Quote with *em* and **strong**\n\n1. one\n2. two\n\n- a\n  - nested\n\n---\n\n`code` and [link](https://example.com)",
    );
    await expect(output(page)).toMatchAriaSnapshot(`
      - heading "Title" [level=1]
      - heading "Section" [level=2]
      - blockquote:
        - paragraph:
          - text: Quote with
          - emphasis: em
          - text: and
          - strong: strong
      - list:
        - listitem: one
        - listitem: two
      - list:
        - listitem:
          - text: a
          - list:
            - listitem: nested
      - separator
      - paragraph:
        - code: code
        - text: and
        - link "link":
          - /url: https://example.com
    `);
  });

  test("GitHub Flavored Markdown is on by default", async ({ page }) => {
    await expect(output(page).getByRole("deletion")).toHaveText(
      "strikethrough",
    );
    await expect(
      output(page).getByRole("checkbox", { checked: true }),
    ).toBeDisabled();
    await expect(output(page).getByRole("checkbox")).toHaveCount(2);
    const table = output(page).getByRole("table");
    await expect(table.getByRole("columnheader")).toHaveText([
      "Task",
      "Owner",
      "Points",
    ]);
    await expect(table.getByRole("cell", { name: "Ana" })).toHaveCSS(
      "text-align",
      "center",
    );
    await expect(table.getByRole("cell", { name: "13" })).toHaveCSS(
      "text-align",
      "right",
    );
    await page.getByRole("switch", { name: "gfm" }).click();
    await expect(output(page).getByRole("table")).toHaveCount(0);
    await expect(output(page).getByRole("deletion")).toHaveCount(0);
  });

  test("breaks turns single line breaks into <br>", async ({ page }) => {
    await render(page, "one\ntwo");
    await expect(output(page).locator("br")).toHaveCount(0);
    await page.getByRole("switch", { name: "breaks" }).click();
    await expect(output(page).locator("br")).toHaveCount(1);
  });

  test("HTML, code and unsafe URLs can't run scripts", async ({ page }) => {
    const dialogs: string[] = [];
    page.on("dialog", async (dialog) => {
      dialogs.push(dialog.message());
      await dialog.dismiss();
    });
    await render(
      page,
      [
        `<img src=x onerror="alert('html')">`,
        "```html\n<img src=x onerror=\"alert('code')\">\n```",
        "[js](javascript:alert('link')) [tab](java\tscript:alert('tab'))",
        "![pic](javascript:alert('image'))",
        "[mail](mailto:hi@example.com)",
      ].join("\n\n"),
    );
    await expect(output(page).locator("img")).toHaveCount(0);
    await expect(output(page)).toContainText(
      `<img src=x onerror="alert('html')">`,
    );
    await expect(output(page).locator("pre")).toContainText(
      `<img src=x onerror="alert('code')">`,
    );
    await expect(output(page).getByRole("link")).toHaveText(["mail"]);
    expect(dialogs).toEqual([]);
  });

  test("code spans and reference definitions render as written", async ({
    page,
  }) => {
    await render(
      page,
      "Use `` a`b `` here.\n\n[ref][docs]\n\n[docs]: https://example.com",
    );
    await expect(output(page).getByRole("code")).toHaveText("a`b");
    await expect(
      output(page).getByRole("link", { name: "ref" }),
    ).toHaveAttribute("href", "https://example.com");
    await expect(output(page)).not.toContainText("[docs]");
  });

  test("editing updates elements in place", async ({ page }) => {
    const heading = output(page).getByRole("heading", {
      name: "Weekly update",
    });
    await heading.evaluate(
      (el) => ((window as { first?: Element }).first = el),
    );
    await source(page).press("ControlOrMeta+End");
    await source(page).pressSequentially("\n\nMore");
    await expect(output(page).getByText("More", { exact: true })).toBeVisible();
    expect(
      await heading.evaluate(
        (el) => (window as { first?: Element }).first === el,
      ),
    ).toBe(true);
  });

  test("user content shows HTML as text and keeps safe links", async ({
    page,
  }) => {
    const comment = page.locator("p", { hasText: "Thanks! I tried" });
    await expect(comment).toContainText(`<img src=x onerror="alert('hi')">`);
    await expect(comment.getByRole("link")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "safe link" })).toHaveAttribute(
      "href",
      "https://svelte.dev",
    );
  });

  test("snippets change how elements render", async ({ page }) => {
    const section = page.locator("section", {
      has: page.getByRole("heading", { name: "Project description" }),
    });
    await expect(
      section.getByRole("heading", { name: "Release notes" }),
    ).toHaveJSProperty("tagName", "H3");
    await expect(
      section.getByRole("heading", { name: "Fixes" }),
    ).toHaveJSProperty("tagName", "H4");
    await expect(
      section.getByRole("link", { name: "announcement" }),
    ).toHaveAttribute("target", "_blank");
  });
});
