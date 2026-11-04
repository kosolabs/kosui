import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Box Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/box");
  });

  const box = (page: Page) =>
    page.getByTestId("preview").getByText("A box of content", { exact: true });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();
  const style = (page: Page, property: string) =>
    box(page).evaluate(
      (el, property) => getComputedStyle(el).getPropertyValue(property),
      property,
    );

  test("attributes pass through to the box", async ({ page }) => {
    await expect(
      page.getByRole("region", { name: "Weekly report" }),
    ).toBeVisible();
  });

  test("filled boxes have a background and plain ones don't", async ({
    page,
  }) => {
    await choose(page, "Variant", "filled");
    await expect
      .poll(() => style(page, "background-color"))
      .not.toBe("rgba(0, 0, 0, 0)");
    await choose(page, "Variant", "plain");
    await expect
      .poll(() => style(page, "background-color"))
      .toBe("rgba(0, 0, 0, 0)");
  });

  test("shape sets the corners", async ({ page }) => {
    await choose(page, "Shape", "square");
    await expect.poll(() => style(page, "border-radius")).toBe("0px");
    await choose(page, "Shape", "circle");
    await expect
      .poll(async () => parseFloat(await style(page, "border-radius")))
      .toBeGreaterThan(100);
  });
});
