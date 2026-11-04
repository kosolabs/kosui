import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Input Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/input");
  });

  const playground = (page: Page) =>
    page.getByTestId("preview").getByRole("textbox", { name: "Email" });
  const email = (page: Page) =>
    page.getByRole("main").getByRole("textbox", { name: "Email" }).nth(1);
  const username = (page: Page) =>
    page.getByRole("textbox", { name: "Username" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();
  const outline = (input: Locator) =>
    input.evaluate((el) => {
      const style = getComputedStyle(el);
      return `${style.outlineStyle} ${style.outlineWidth} ${style.outlineColor}`;
    });
  const errorColor = (page: Page) =>
    page
      .getByText("ada is taken. Try another.", { exact: true })
      .evaluate((el) => getComputedStyle(el).color);

  test("a label names the input and a hint describes it", async ({ page }) => {
    await expect(email(page)).toHaveAccessibleDescription(
      "We'll send the newsletter here.",
    );
    await expect(
      page.getByRole("searchbox", { name: "Search tasks" }),
    ).toBeVisible();
  });

  test("attributes pass through to the input", async ({ page }) => {
    await expect(email(page)).toHaveAttribute("type", "email");
    await expect(email(page)).toHaveAttribute("autocomplete", "email");
    await expect(email(page)).toHaveJSProperty("required", true);
  });

  test("value binds both ways", async ({ page }) => {
    const search = page.getByRole("searchbox", { name: "Search tasks" });
    await search.fill("badge");
    await expect(search.locator("~ ul > li")).toHaveText([
      "Fix the flaky badge test",
    ]);
  });

  test("an input fills the shared row at each size", async ({ page }) => {
    for (const [size, height] of Object.entries({
      xs: 28,
      sm: 36,
      md: 44,
      lg: 52,
      xl: 60,
    })) {
      await choose(page, "Size", size);
      await expect
        .poll(async () =>
          Math.round((await playground(page).boundingBox())!.height),
        )
        .toBe(height);
    }
  });

  test("focus draws a 2-pixel outline in every variant and color", async ({
    page,
  }) => {
    for (const variant of ["outlined", "filled", "plain"]) {
      await choose(page, "Variant", variant);
      for (const color of ["primary", "plain", "inherit"]) {
        await choose(page, "Color", color);
        await page.mouse.click(1, 1);
        const resting = await outline(playground(page));
        await playground(page).focus();
        await expect
          .poll(() => outline(playground(page)))
          .toMatch(/^solid 2px /);
        expect(await outline(playground(page))).not.toBe(resting);
      }
    }
  });

  test("the resting edge contrasts at least 3:1 with the fill", async ({
    page,
  }) => {
    const contrast = (input: Locator, edge: "outline" | "border-bottom") =>
      input.evaluate((el, edge) => {
        const canvas = document.createElement("canvas").getContext("2d")!;
        const luminance = (color: string) => {
          canvas.clearRect(0, 0, 1, 1);
          canvas.fillStyle = color;
          canvas.fillRect(0, 0, 1, 1);
          const [r, g, b] = [...canvas.getImageData(0, 0, 1, 1).data].map(
            (v) => {
              const c = v / 255;
              return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
            },
          );
          return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };
        const style = getComputedStyle(el);
        const [a, b] = [
          luminance(style.getPropertyValue(`${edge}-color`)),
          luminance(style.backgroundColor),
        ].sort((x, y) => y - x);
        return (a + 0.05) / (b + 0.05);
      }, edge);
    await expect
      .poll(() => contrast(playground(page), "outline"))
      .toBeGreaterThanOrEqual(3);
    await choose(page, "Variant", "filled");
    await expect
      .poll(() => contrast(playground(page), "border-bottom"))
      .toBeGreaterThanOrEqual(3);
  });

  test("native validation shows the error color after a submit", async ({
    page,
  }) => {
    const before = await outline(email(page));
    await page.getByRole("button", { name: "Subscribe" }).click();
    const error = await errorColor(page);
    await expect.poll(() => outline(email(page))).toContain(error);
    expect(before).not.toContain(error);
    await email(page).fill("ada@example.com");
    await expect.poll(() => outline(email(page))).not.toContain(error);
  });

  test("aria-invalid shows the error color and the message describes it", async ({
    page,
  }) => {
    await expect(username(page)).toHaveAttribute("aria-invalid", "true");
    await expect(username(page)).toHaveAccessibleDescription(
      "ada is taken. Try another.",
    );
    await expect
      .poll(() => outline(username(page)))
      .toContain(await errorColor(page));
    await username(page).fill("ada99");
    await expect(username(page)).toHaveAttribute("aria-invalid", "false");
  });

  test("a disabled input can't be edited", async ({ page }) => {
    await page.getByRole("switch", { name: "Disabled" }).click();
    await expect(playground(page)).toBeDisabled();
  });
});
