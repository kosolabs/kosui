import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Switch Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/switch");
  });

  const wifi = (page: Page) =>
    page.getByTestId("preview").getByRole("switch", { name: "Wi-Fi" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: option, exact: true })
      .click();
  const look = (locator: Locator) =>
    locator.evaluate((el) => {
      const thumb = getComputedStyle(el, "::before");
      return `${getComputedStyle(el).backgroundColor} ${thumb.backgroundColor} ${thumb.translate}`;
    });

  test("a switch is a checkbox with the switch role", async ({ page }) => {
    await expect(wifi(page)).toHaveJSProperty("type", "checkbox");
    await expect(wifi(page)).not.toBeChecked();
  });

  test("clicking, Space and its label toggle a switch", async ({ page }) => {
    await wifi(page).click();
    await expect(wifi(page)).toBeChecked();
    await expect(page.getByText("Wi-Fi on", { exact: true })).toBeVisible();
    await wifi(page).focus();
    await page.keyboard.press("Space");
    await expect(wifi(page)).not.toBeChecked();

    const digest = page.getByRole("switch", { name: "Weekly digest" });
    await expect(digest).toHaveAccessibleDescription(
      "A summary of your projects every Monday.",
    );
    await page.getByText("Weekly digest", { exact: true }).click();
    await expect(digest).toBeChecked();
  });

  test("a disabled switch can't be toggled", async ({ page }) => {
    await page.getByRole("switch", { name: "Disabled" }).click();
    await expect(wifi(page)).toBeDisabled();
    await wifi(page).click({ force: true });
    await expect(wifi(page)).not.toBeChecked();
  });

  test("on and off look different in every color", async ({ page }) => {
    for (const color of [
      "primary",
      "secondary",
      "tertiary",
      "error",
      "plain",
      "inherit",
    ]) {
      await choose(page, "Color", color);
      const off = await look(wifi(page));
      expect(off).not.toContain("rgba(0, 0, 0, 0)");
      await wifi(page).click();
      await expect.poll(() => look(wifi(page))).not.toBe(off);
      expect(await look(wifi(page))).not.toContain("rgba(0, 0, 0, 0)");
      await wifi(page).click();
    }
  });

  test("an off switch's edge and thumb contrast at least 3:1", async ({
    page,
  }) => {
    const contrasts = await wifi(page).evaluate((el) => {
      const canvas = document.createElement("canvas").getContext("2d")!;
      const luminance = (color: string) => {
        canvas.clearRect(0, 0, 1, 1);
        canvas.fillStyle = color;
        canvas.fillRect(0, 0, 1, 1);
        const [r, g, b] = [...canvas.getImageData(0, 0, 1, 1).data].map((v) => {
          const c = v / 255;
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      };
      const ratio = (a: string, b: string) => {
        const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
        return (x + 0.05) / (y + 0.05);
      };
      let surface = el.parentElement!;
      while (getComputedStyle(surface).backgroundColor === "rgba(0, 0, 0, 0)")
        surface = surface.parentElement!;
      const style = getComputedStyle(el);
      const edge = style.boxShadow.match(
        /((?:rgb|color)\([^)]*\))[^,]*inset/,
      )![1];
      return {
        edge: ratio(edge, getComputedStyle(surface).backgroundColor),
        thumb: ratio(
          getComputedStyle(el, "::before").backgroundColor,
          style.backgroundColor,
        ),
      };
    });
    expect(contrasts.edge).toBeGreaterThanOrEqual(3);
    expect(contrasts.thumb).toBeGreaterThanOrEqual(3);
  });

  test("a switch sits inside the shared row, 24 pixels or taller from sm up", async ({
    page,
  }) => {
    for (const [size, [height, width]] of Object.entries({
      xs: [16, 28],
      sm: [24, 40],
      md: [28, 48],
      lg: [32, 52],
      xl: [36, 60],
    })) {
      await choose(page, "Size", size);
      await expect
        .poll(async () => {
          const box = (await wifi(page).boundingBox())!;
          return [Math.round(box.height), Math.round(box.width)];
        })
        .toEqual([height, width]);
    }
  });

  test("a switch submits with its form, and required blocks submitting", async ({
    page,
  }) => {
    const save = page.getByRole("button", { name: "Save" });
    const submitted = page.getByText(/^Submitted:/);
    await save.click();
    await expect(submitted).toHaveCount(0);
    await page
      .getByRole("switch", { name: "I agree to the terms (required)" })
      .click();
    await save.click();
    await expect(submitted).toHaveText("Submitted: terms");
    await page.getByRole("switch", { name: "Make the project public" }).click();
    await save.click();
    await expect(submitted).toHaveText("Submitted: public, terms");
  });
});
