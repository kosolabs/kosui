import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Button Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/button");
  });

  test("buttons should have correct roles", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Elevated Primary Rounded Button" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Elevated Primary Rounded Icon" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Elevated Primary Rounded Disabled" }),
    ).toBeVisible();
  });

  test("buttons should activate when enter is pressed", async ({ page }) => {
    await page.getByTestId("result").isHidden();
    await page
      .getByRole("button", { name: "Elevated Primary Rounded Button" })
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.getByTestId("result")).toBeVisible();
  });

  test("buttons should activate when space is pressed", async ({ page }) => {
    await page.getByTestId("result").isHidden();
    await page
      .getByRole("button", { name: "Elevated Primary Rounded Button" })
      .focus();
    await page.keyboard.press("Space");
    await expect(page.getByTestId("result")).toBeVisible();
  });

  test("buttons should activate when clicked", async ({ page }) => {
    await page.getByTestId("result").isHidden();
    await page
      .getByRole("button", { name: "Elevated Primary Rounded Button" })
      .click();
    await expect(page.getByTestId("result")).toBeVisible();
  });

  test("disabled buttons should be disabled", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Elevated Primary Rounded Disabled" }),
    ).toBeDisabled();
  });

  test("disabled buttons should not be focusable", async ({ page }) => {
    await page
      .getByRole("button", { name: "Elevated Primary Rounded Disabled" })
      .focus();
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(focusedElement).not.toBe("BUTTON");
  });

  // TODO: Add a test for focus rings
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
    const button = page.getByRole("button", {
      name: "Outlined Primary Rounded Button",
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
