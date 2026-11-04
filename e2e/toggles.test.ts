import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Toggle Group Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/toggles");
  });

  const view = (page: Page) => page.getByRole("radiogroup", { name: "View" });
  const option = (page: Page, name: string) =>
    view(page).getByRole("radio", { name, exact: true });
  const choose = (page: Page, setting: string, value: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: value, exact: true })
      .click();
  const look = (radio: Locator) =>
    radio.evaluate((el) => {
      const style = getComputedStyle(el.parentElement!);
      return `${style.backgroundColor} ${style.boxShadow}`;
    });

  test("a toggle group is a named radio group", async ({ page }) => {
    await expect(option(page, "Week")).toBeChecked();
    await expect(option(page, "Day")).not.toBeChecked();
    await expect(
      page
        .getByRole("radiogroup", { name: "Text alignment" })
        .getByRole("radio", { name: "Center" }),
    ).toBeVisible();
  });

  test("arrow keys choose, and the group is one Tab stop", async ({ page }) => {
    await option(page, "Week").focus();
    await page.keyboard.press("ArrowRight");
    await expect(option(page, "Month")).toBeChecked();
    await expect(option(page, "Month")).toBeFocused();
    await expect(page.getByText("Showing the month")).toBeVisible();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(option(page, "Month")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(option(page, "Day")).not.toBeFocused();
    await expect(option(page, "Week")).not.toBeFocused();
  });

  test("clicking chooses and calls onChange once", async ({ page }) => {
    await page.getByRole("radio", { name: "Dark" }).click();
    await expect(page.getByText(/^Theme:/)).toHaveText(
      /Theme: dark \(1 change\)/,
    );
  });

  test("buttons fill the shared row at each size", async ({ page }) => {
    for (const [size, height] of Object.entries({
      xs: 28,
      sm: 36,
      md: 44,
      lg: 52,
      xl: 60,
    })) {
      await choose(page, "Size", size);
      await expect
        .poll(async () =>
          Math.round(
            (await option(page, "Day").locator("..").boundingBox())!.height,
          ),
        )
        .toBe(height);
    }
  });

  test("the chosen button looks different in every color", async ({ page }) => {
    for (const color of [
      "primary",
      "secondary",
      "tertiary",
      "error",
      "plain",
      "inherit",
    ]) {
      await choose(page, "Color", color);
      await expect
        .poll(
          async () =>
            (await look(option(page, "Week"))) ===
            (await look(option(page, "Day"))),
        )
        .toBe(false);
    }
  });

  test("focus draws a 2-pixel outline above the neighboring buttons", async ({
    page,
  }) => {
    await option(page, "Week").focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(option(page, "Week")).toBeFocused();
    await expect
      .poll(() =>
        option(page, "Week").evaluate((el) => {
          const s = getComputedStyle(el);
          return `${s.outlineStyle} ${s.outlineWidth} ${s.zIndex}`;
        }),
      )
      .toBe("solid 2px 10");
  });

  test("with a name, the group submits its value", async ({ page }) => {
    await page.getByRole("radio", { name: "Yearly" }).click();
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page.getByText("Submitted billing=yearly")).toBeVisible();
  });
});
