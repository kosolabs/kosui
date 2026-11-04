import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Slider Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/slider");
  });

  const brightness = (page: Page) =>
    page.getByTestId("preview").getByRole("slider", { name: "Brightness" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: option, exact: true })
      .click();

  test("a slider is a named range input with value text", async ({ page }) => {
    await expect(brightness(page)).toHaveJSProperty("type", "range");
    await expect(brightness(page)).toHaveValue("30");
    await expect(brightness(page)).toHaveAttribute("aria-valuetext", "30%");
  });

  test("keys move the slider by a step, a page, or to the ends", async ({
    page,
  }) => {
    const slider = brightness(page);
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await expect(slider).toHaveValue("31");
    await page.keyboard.press("ArrowLeft");
    await page.keyboard.press("ArrowLeft");
    await expect(slider).toHaveValue("29");
    await page.keyboard.press("End");
    await expect(slider).toHaveValue("100");
    await expect(page.getByText("Brightness 100%")).toBeVisible();
    await page.keyboard.press("Home");
    await expect(slider).toHaveValue("0");
    await page.keyboard.press("PageUp");
    await expect
      .poll(async () => Number(await slider.inputValue()))
      .toBeGreaterThan(1);
  });

  test("clicking the track moves the thumb there", async ({ page }) => {
    const slider = brightness(page);
    const { width, height } = (await slider.boundingBox())!;
    await slider.click({ position: { x: width * 0.75, y: height / 2 } });
    await expect
      .poll(async () => Number(await slider.inputValue()))
      .toBeGreaterThanOrEqual(70);
    expect(Number(await slider.inputValue())).toBeLessThanOrEqual(80);
  });

  test("format names each step for screen readers", async ({ page }) => {
    const effort = page.getByRole("slider", { name: "Effort" });
    await expect(effort).toHaveAttribute("aria-valuetext", "Medium");
    await effort.focus();
    await page.keyboard.press("ArrowRight");
    await expect(effort).toHaveAttribute("aria-valuetext", "High");
  });

  test("marks and the value label are decoration, out of the tab order", async ({
    page,
  }) => {
    await page.getByRole("switch", { name: "Marks" }).click();
    const preview = page.getByTestId("preview");
    await expect(preview.getByText("50%", { exact: true })).toBeVisible();
    await expect(preview.getByRole("button")).toHaveCount(0);
    await expect(preview).toMatchAriaSnapshot(`
      - slider "Brightness"
      - paragraph: Brightness 30%
    `);
  });

  test("the value label shows on focus or always with showValue", async ({
    page,
  }) => {
    const label = page.getByTestId("preview").getByText("30%", { exact: true });
    await expect(label).toHaveCSS("opacity", "0");
    await page.getByRole("switch", { name: "Show value" }).click();
    await expect(label).toHaveCSS("opacity", "1");
  });

  test("the thumb uses the slider's color, including plain", async ({
    page,
  }) => {
    const color = () =>
      brightness(page).evaluate((el) => getComputedStyle(el).color);
    const primary = await color();
    await choose(page, "Color", "plain");
    await expect.poll(color).not.toBe(primary);
    expect(await color()).not.toBe("rgba(0, 0, 0, 0)");
  });

  test("a slider sits inside the shared row, 24 pixels or taller from sm up", async ({
    page,
  }) => {
    for (const [size, height] of Object.entries({
      xs: 20,
      sm: 24,
      md: 28,
      lg: 32,
      xl: 36,
    })) {
      await choose(page, "Size", size);
      await expect
        .poll(async () =>
          Math.round((await brightness(page).boundingBox())!.height),
        )
        .toBe(height);
    }
  });

  test("onchange fires when a change is committed", async ({ page }) => {
    const volume = page.getByRole("slider", { name: "Volume" });
    await volume.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByText("Saved volume: 41%")).toBeVisible();
  });

  test("a disabled slider can't be moved", async ({ page }) => {
    await page.getByRole("switch", { name: "Disabled" }).click();
    await expect(brightness(page)).toBeDisabled();
    await page.keyboard.press("Enter");
    await expect(brightness(page)).toHaveValue("30");
  });
});
