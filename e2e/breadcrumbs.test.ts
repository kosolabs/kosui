import { expect, test } from "@playwright/test";
import { gotoComponent } from "./test-utils";

test.describe.configure({ mode: "parallel" });

test.describe("Breadcrumbs Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await gotoComponent(page, "Breadcrumbs");
  });

  test("breadcrumbs should render", async ({ page }) => {
    await expect(
      page.getByTitle("content").getByRole("link", { name: "Home" }),
    ).toBeVisible();
    await expect(
      page.getByTitle("content").getByRole("link", { name: "Breadcrumbs" }),
    ).toBeVisible();
  });
});
