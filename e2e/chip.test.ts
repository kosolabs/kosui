import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Chip Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/chips");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const recipients = (page: Page) =>
    page.getByRole("group", { name: "Recipients" });
  const remove = (page: Page, label: string) =>
    page.getByRole("button", { name: `Remove ${label}`, exact: true });

  test("chips have no option role", async ({ page }) => {
    await expect(page.getByRole("main").getByRole("option")).toHaveCount(0);
  });

  test("remove buttons are named after their chip", async ({ page }) => {
    await expect(remove(page, "ada@example.com")).toBeVisible();
    await expect(remove(page, "grace@example.com")).toBeVisible();
  });

  test("removing a chip doesn't submit its form", async ({ page }) => {
    await remove(page, "ada@example.com").click();
    await expect(recipients(page)).not.toContainText("ada@example.com");
    await expect(page.getByText(/^Sent to/)).toHaveCount(0);
  });

  test("Backspace or Delete removes the focused chip", async ({ page }) => {
    await remove(page, "ada@example.com").focus();
    await page.keyboard.press("Backspace");
    await expect(recipients(page)).not.toContainText("ada@example.com");
    await remove(page, "grace@example.com").focus();
    await page.keyboard.press("Delete");
    await expect(recipients(page)).not.toContainText("grace@example.com");
  });

  test("the remove button is at least 24 pixels square", async ({ page }) => {
    const box = (await remove(page, "ada@example.com").boundingBox())!;
    expect(box.width).toBeGreaterThanOrEqual(24);
    expect(box.height).toBeGreaterThanOrEqual(24);
  });

  test("chips grow with size, with 24 pixel remove targets from sm up", async ({
    page,
  }) => {
    let lastHeight = 0;
    for (const size of ["xs", "sm", "md", "lg", "xl"]) {
      await page
        .getByRole("radiogroup", { name: "Size" })
        .getByRole("radio", { name: size, exact: true })
        .click();
      const chip = preview(page)
        .getByText("Design", { exact: true })
        .locator("..");
      const height = (await chip.boundingBox())!.height;
      expect(height).toBeGreaterThan(lastHeight);
      lastHeight = height;
      if (size !== "xs") {
        const target = (await remove(page, "Design").boundingBox())!;
        expect(Math.min(target.width, target.height)).toBeGreaterThanOrEqual(
          24,
        );
      }
    }
  });

  test("a chip without actions is text, not a button", async ({ page }) => {
    await page.getByRole("switch", { name: "Deletable" }).click();
    await expect(preview(page).getByText("Design")).toBeVisible();
    await expect(
      preview(page).getByRole("button").filter({ hasNotText: "Restore chips" }),
    ).toHaveCount(0);
  });

  test("a clickable chip is a button that calls onClick", async ({ page }) => {
    await page.getByRole("switch", { name: "Clickable" }).click();
    await preview(page)
      .getByRole("button", { name: "Design", exact: true })
      .click();
    await expect(preview(page)).toContainText("Clicked Design");
  });

  test("Backspace on a clickable chip's label removes it", async ({ page }) => {
    await page.getByRole("switch", { name: "Clickable" }).click();
    await preview(page)
      .getByRole("button", { name: "Urgent", exact: true })
      .focus();
    await page.keyboard.press("Backspace");
    await expect(preview(page)).toContainText("Removed Urgent");
  });
});
