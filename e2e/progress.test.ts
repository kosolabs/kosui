import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("CircularProgress Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/progress-indicators");
  });

  const ring = (page: Page) =>
    page.getByTestId("preview").getByRole("progressbar");
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: option, exact: true })
      .click();

  test("a ring is a progress bar named Loading, with its value", async ({
    page,
  }) => {
    await expect(ring(page)).toHaveAccessibleName("Loading");
    await expect(ring(page)).toHaveAttribute("aria-valuenow", "60");
    await expect(ring(page)).toHaveAttribute("aria-valuemin", "0");
    await expect(ring(page)).toHaveAttribute("aria-valuemax", "100");
  });

  test("a spinner has no value", async ({ page }) => {
    await choose(page, "Progress", "spinner");
    await expect(ring(page)).not.toHaveAttribute("aria-valuenow");
  });

  test("rings fit inside each size's row", async ({ page }) => {
    for (const [size, pixels] of Object.entries({
      xs: 16,
      sm: 24,
      md: 32,
      lg: 40,
      xl: 48,
    })) {
      await choose(page, "Size", size);
      await expect
        .poll(async () => Math.round((await ring(page).boundingBox())!.width))
        .toBe(pixels);
    }
  });

  test("aria-label names the ring", async ({ page }) => {
    await page.getByRole("button", { name: "Upload report.pdf" }).click();
    const upload = page.getByRole("progressbar", {
      name: "report.pdf upload",
    });
    await expect(upload).toHaveAttribute("aria-valuenow", "100");
  });

  test("a hidden spinner leaves its message to the status region", async ({
    page,
  }) => {
    const status = page.getByRole("main").getByRole("status");
    await expect(status).toHaveText("Loading tasks…");
    await expect(status.getByRole("progressbar")).toHaveCount(0);
  });
});
