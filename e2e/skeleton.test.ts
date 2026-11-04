import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Skeleton Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/skeleton");
  });

  const skeleton = (page: Page) =>
    page.getByTestId("preview").locator("div").first();
  const profile = (page: Page) => page.getByRole("region", { name: "Profile" });
  const animation = (page: Page) =>
    skeleton(page).evaluate((el) => getComputedStyle(el).animationName);

  test("a skeleton without a height is one line tall", async ({ page }) => {
    await expect
      .poll(async () => (await skeleton(page).boundingBox())?.height ?? 0)
      .toBeGreaterThanOrEqual(16);
  });

  test("children size a skeleton but aren't shown or read", async ({
    page,
  }) => {
    const main = page.getByRole("main");
    const name = main.locator(".invisible", { hasText: "Ada Lovelace" });
    await expect(name).toBeHidden();
    await expect(
      main.getByRole("button", { name: "Save changes" }),
    ).toHaveCount(0);
    await expect
      .poll(async () => (await name.locator("..").boundingBox())?.width ?? 0)
      .toBeGreaterThan(50);
  });

  test("a skeleton pulses", async ({ page }) => {
    await expect.poll(() => animation(page)).toBe("pulse");
  });

  test("a skeleton holds still with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(() => animation(page)).toBe("none");
  });

  test("a loading region is busy until its content arrives", async ({
    page,
  }) => {
    await expect(profile(page)).toHaveAttribute("aria-busy", "true");
    await expect(profile(page)).toContainText("Ada Lovelace");
    await expect(profile(page)).toHaveAttribute("aria-busy", "false");
  });
});
