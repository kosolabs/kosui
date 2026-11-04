import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Textarea Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/textarea");
  });

  const playground = (page: Page) =>
    page.getByTestId("preview").getByRole("textbox", { name: "Description" });
  const feedback = (page: Page) =>
    page.getByRole("textbox", { name: "Feedback" });
  const comment = (page: Page) =>
    page.getByRole("textbox", { name: "Comment" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: option, exact: true })
      .click();
  const outline = (textarea: Locator) =>
    textarea.evaluate((el) => {
      const style = getComputedStyle(el);
      return `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`;
    });
  const height = async (locator: Locator) =>
    Math.round((await locator.boundingBox())!.height);

  test("a label names the textarea and the count describes it", async ({
    page,
  }) => {
    await expect(feedback(page)).toHaveAccessibleDescription(
      "0 of 280 characters",
    );
    await feedback(page).fill("Love it");
    await expect(feedback(page)).toHaveAccessibleDescription(
      "7 of 280 characters",
    );
  });

  test("attributes pass through to the textarea", async ({ page }) => {
    await expect(feedback(page)).toHaveAttribute("rows", "4");
    await expect(feedback(page)).toHaveAttribute("maxlength", "280");
    await expect(feedback(page)).toHaveJSProperty("required", true);
  });

  test("one row fills the shared row at each size", async ({ page }) => {
    await playground(page).evaluate(
      (el) => ((el as HTMLTextAreaElement).rows = 1),
    );
    for (const [size, pixels] of Object.entries({
      xs: 28,
      sm: 36,
      md: 44,
      lg: 52,
      xl: 60,
    })) {
      await choose(page, "Size", size);
      await expect.poll(() => height(playground(page))).toBe(pixels);
    }
  });

  test("a one-row comment box lines up with its button and grows with its text", async ({
    page,
  }) => {
    const post = page.getByRole("button", { name: "Post" });
    await expect
      .poll(async () => [await height(comment(page)), await height(post)])
      .toEqual([36, 36]);
    await comment(page).fill("one\ntwo\nthree");
    await expect.poll(() => height(comment(page))).toBeGreaterThan(36);
    await post.click();
    await expect(
      page.getByRole("listitem").filter({ hasText: "three" }),
    ).toBeVisible();
    await expect(comment(page)).toHaveValue("");
  });

  test("focus draws a 2-pixel outline in every variant and color", async ({
    page,
  }) => {
    for (const variant of ["outlined", "filled", "plain"]) {
      await choose(page, "Variant", variant);
      for (const color of ["primary", "plain", "inherit"]) {
        await choose(page, "Color", color);
        await page.mouse.click(1, 1);
        const resting = await outline(playground(page));
        await playground(page).focus();
        await expect
          .poll(() => outline(playground(page)))
          .toMatch(/^solid 2px /);
        expect(await outline(playground(page))).not.toBe(resting);
      }
    }
  });

  test("invalid textareas turn the error color", async ({ page }) => {
    await choose(page, "Color", "error");
    await playground(page).focus();
    const error = (await outline(playground(page))).split(" 2px ")[1];
    await choose(page, "Color", "primary");
    await page.getByRole("switch", { name: "Invalid" }).click();
    await expect.poll(() => outline(playground(page))).toContain(error);

    expect(await outline(feedback(page))).not.toContain(error);
    await page.getByRole("button", { name: "Send" }).click();
    await expect.poll(() => outline(feedback(page))).toContain(error);
    await feedback(page).fill("Great");
    await expect.poll(() => outline(feedback(page))).not.toContain(error);
  });

  test("a disabled textarea can't be edited", async ({ page }) => {
    await page.getByRole("switch", { name: "Disabled" }).click();
    await expect(playground(page)).toBeDisabled();
  });
});
