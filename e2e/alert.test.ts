import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Alert Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/alert");
  });

  const alert = (page: Page) => page.getByTestId("preview").getByRole("alert");
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();
  const background = (page: Page) =>
    alert(page).evaluate((el) => getComputedStyle(el).backgroundColor);

  test("an alert has the alert role", async ({ page }) => {
    await expect(alert(page)).toContainText("Your trial ends in 3 days.");
  });

  test("an alert takes the shared variants", async ({ page }) => {
    await choose(page, "Variant", "filled");
    const filled = await background(page);
    await choose(page, "Variant", "tonal");
    await expect.poll(() => background(page)).not.toBe(filled);
    await choose(page, "Variant", "plain");
    await expect.poll(() => background(page)).toBe("rgba(0, 0, 0, 0)");
  });

  test("an alert takes the shared shapes", async ({ page }) => {
    await choose(page, "Shape", "square");
    await expect
      .poll(() =>
        alert(page).evaluate((el) => getComputedStyle(el).borderRadius),
      )
      .toBe("0px");
  });

  test("an error alert appears and can be dismissed", async ({ page }) => {
    const main = page.getByRole("main");
    await main.getByRole("button", { name: "Sign in" }).click();
    const error = main.getByRole("alert").filter({ hasText: "Sign-in failed" });
    await expect(error).toBeVisible();
    await error.getByRole("button", { name: "Dismiss" }).click();
    await expect(error).toHaveCount(0);
  });

  test("role=status makes a polite status message", async ({ page }) => {
    const main = page.getByRole("main");
    await main.getByRole("button", { name: "Save draft" }).click();
    await expect(main.getByRole("status")).toHaveText("Draft saved.");
  });
});
