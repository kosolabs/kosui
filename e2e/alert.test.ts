import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Alert Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/alert");
  });

  test("alert should be visible with default props", async ({ page }) => {
    const alertElement = page.getByTestId("preview").getByRole("alert");
    await expect(alertElement).toBeVisible();
    await expect(alertElement).toContainText(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    );
  });
});
