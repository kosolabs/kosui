import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Avatar Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/avatar");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const avatar = (page: Page) =>
    preview(page).getByRole("img", { name: "Ada Lovelace" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: option, exact: true })
      .click();

  for (const content of ["image", "initials", "icon", "broken image"]) {
    test(`an avatar showing ${content} is an image named by alt`, async ({
      page,
    }) => {
      await choose(page, "Content", content);
      await expect(avatar(page)).toBeVisible();
    });
  }

  test("a picture fills the avatar, cropped to its shape", async ({ page }) => {
    const img = avatar(page).locator("img");
    await expect(img).toHaveJSProperty("complete", true);
    const [frame, picture] = await Promise.all([
      avatar(page).boundingBox(),
      img.boundingBox(),
    ]);
    expect(picture).toEqual(frame);
    await expect(img).toHaveCSS("object-fit", "cover");
  });

  test("a broken picture falls back to the initials", async ({ page }) => {
    await choose(page, "Content", "broken image");
    await expect(avatar(page)).toHaveText("AL");
    await expect(avatar(page).locator("img")).toHaveCount(0);
  });

  test("a new picture loads after a broken one", async ({ page }) => {
    await choose(page, "Content", "broken image");
    await expect(avatar(page)).toHaveText("AL");
    await choose(page, "Content", "image");
    await expect(avatar(page).locator("img")).toBeVisible();
  });

  test("initials scale with the avatar's size", async ({ page }) => {
    await choose(page, "Content", "initials");
    const fontSize = async () =>
      avatar(page)
        .locator("span")
        .evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    const sizes: Record<string, number> = {};
    for (const size of ["small", "medium", "large"]) {
      await choose(page, "Size", size);
      const width = (await avatar(page).boundingBox())!.width;
      sizes[size] = (await fontSize()) / width;
      const [scroll, client] = await avatar(page).evaluate((el) => [
        el.scrollHeight,
        el.clientHeight,
      ]);
      expect(scroll).toBeLessThanOrEqual(client);
    }
    expect(sizes.small).toBeCloseTo(0.5, 1);
    expect(sizes.large).toBeCloseTo(0.5, 1);
  });

  test("an avatar without alt is decorative", async ({ page }) => {
    const example = page
      .getByRole("main")
      .getByText("Ada Lovelace", { exact: true });
    const container = example.locator("../..");
    await expect(container.getByRole("img")).toHaveCount(0);
    await expect(container.locator("img")).toHaveAttribute("alt", "");
  });
});
