import { expect, test } from "@playwright/test";

test.describe("Design Language page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/design-language");
  });

  test("shows the README's principles", async ({ page }) => {
    const principles = page.getByRole("region", { name: "Principles" });
    for (const name of ["Svelte First", "Modern Baseline"]) {
      await expect(principles.getByText(name, { exact: true })).toBeVisible();
    }
    await expect(principles).not.toContainText("## ");
  });

  test("is linked from the navigation", async ({ page }) => {
    await page.goto("/button");
    await page.getByRole("link", { name: "Design Language" }).click();
    await expect(page).toHaveURL(/\/design-language$/);
  });
});
