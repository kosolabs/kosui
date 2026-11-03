import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Button Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/button");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const save = (page: Page) =>
    preview(page).getByRole("button", { name: "Save" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();

  test("button has the button role and its label as its name", async ({
    page,
  }) => {
    await expect(save(page)).toBeVisible();
  });

  test("buttons activate when enter is pressed", async ({ page }) => {
    await save(page).focus();
    await page.keyboard.press("Enter");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("buttons activate when space is pressed", async ({ page }) => {
    await save(page).focus();
    await page.keyboard.press("Space");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("buttons activate when clicked", async ({ page }) => {
    await save(page).click();
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("disabled buttons are disabled and not focusable", async ({ page }) => {
    await page.getByRole("switch", { name: "Disabled" }).click();
    await expect(save(page)).toBeDisabled();

    await save(page).focus();
    await expect(save(page)).not.toBeFocused();
  });

  test("buttons with href render a link", async ({ page }) => {
    const getStarted = page
      .getByRole("main")
      .getByRole("link", { name: "Get started" });
    await expect(getStarted).toHaveAttribute(
      "href",
      "https://svelte.dev/docs/svelte",
    );
    await expect(
      page.getByRole("main").getByRole("button", { name: "Get started" }),
    ).toHaveCount(0);
  });

  test("icon-only buttons keep an accessible name", async ({ page }) => {
    await choose(page, "Content", "icon");
    await expect(save(page)).toBeVisible();
    await expect(save(page)).not.toContainText("Save");
  });
});

test.describe("Button with tooltip", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tooltips");
  });

  test("icon-only buttons are named by their tooltip", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Copy link" })).toBeVisible();
  });

  test("keyboard focus shows the tooltip and describes the button", async ({
    page,
  }) => {
    const button = page.getByRole("button", { name: "Tooltip Prop" });
    await button.focus();
    await expect(
      page.getByRole("tooltip").filter({ hasText: "I'm a tooltip prop" }),
    ).toBeVisible();
    await expect(button).toHaveAccessibleDescription("I'm a tooltip prop");

    await button.blur();
    await expect(
      page.getByRole("tooltip").filter({ hasText: "I'm a tooltip prop" }),
    ).toBeHidden();
  });
});

test.describe("Button focus ring", () => {
  test("shows for keyboard focus but not after a click", async ({ page }) => {
    await page.goto("/button");
    const button = page.getByTestId("preview").getByRole("button", {
      name: "Save",
    });
    const outline = () =>
      button.evaluate((el) => getComputedStyle(el).outlineStyle);

    await button.click();
    expect(await outline()).toBe("none");

    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();
    expect(await outline()).toBe("solid");
  });
});
