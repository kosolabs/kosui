import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Button Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/button");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const save = (page: Page) =>
    preview(page).getByRole("button", { name: "Save" });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("radiogroup", { name: setting })
      .getByRole("radio", { name: option, exact: true })
      .click();

  test("button has the button role and its label as its name", async ({
    page,
  }) => {
    await expect(save(page)).toBeVisible();
  });

  test("buttons activate when enter is pressed", async ({ page }) => {
    await save(page).focus();
    await page.keyboard.press("Enter");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("buttons activate when space is pressed", async ({ page }) => {
    await save(page).focus();
    await page.keyboard.press("Space");
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("buttons activate when clicked", async ({ page }) => {
    await save(page).click();
    await expect(preview(page)).toContainText("Pressed 1 time");
  });

  test("disabled buttons are disabled and not focusable", async ({ page }) => {
    await page.getByRole("switch", { name: "Disabled" }).click();
    await expect(save(page)).toBeDisabled();

    await save(page).focus();
    await expect(save(page)).not.toBeFocused();
  });

  test("buttons with href render a link", async ({ page }) => {
    const getStarted = page
      .getByRole("main")
      .getByRole("link", { name: "Get started" });
    await expect(getStarted).toHaveAttribute(
      "href",
      "https://svelte.dev/docs/svelte",
    );
    await expect(
      page.getByRole("main").getByRole("button", { name: "Get started" }),
    ).toHaveCount(0);
  });

  test("icon-only buttons keep an accessible name", async ({ page }) => {
    await choose(page, "Content", "icon");
    await expect(save(page)).toBeVisible();
    await expect(save(page)).not.toContainText("Save");
  });

  const HEIGHTS = { xs: 28, sm: 36, md: 44, lg: 52, xl: 60 };

  for (const content of ["label", "icon", "both"]) {
    test(`buttons with ${content} content are the same height at each size`, async ({
      page,
    }) => {
      await choose(page, "Content", content);
      for (const [size, height] of Object.entries(HEIGHTS)) {
        await choose(page, "Size", size);
        await expect
          .poll(async () =>
            Math.round((await save(page).boundingBox())!.height),
          )
          .toBe(height);
      }
    });
  }

  test("icon-only buttons are square at each size", async ({ page }) => {
    await choose(page, "Content", "icon");
    for (const [size, height] of Object.entries(HEIGHTS)) {
      await choose(page, "Size", size);
      await expect
        .poll(async () => {
          const box = (await save(page).boundingBox())!;
          return [Math.round(box.width), Math.round(box.height)];
        })
        .toEqual([height, height]);
    }
  });

  test("the icon grows with the button", async ({ page }) => {
    await choose(page, "Content", "both");
    const icon = save(page).locator("svg");
    let last = 0;
    for (const size of Object.keys(HEIGHTS)) {
      await choose(page, "Size", size);
      const width = (await icon.boundingBox())!.width;
      expect(width).toBeGreaterThan(last);
      last = width;
    }
  });
});

test.describe("Button with tooltip", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tooltips");
  });

  test("icon-only buttons are named by their tooltip", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Copy link" })).toBeVisible();
  });

  test("keyboard focus shows the tooltip and describes the button", async ({
    page,
  }) => {
    const button = page.getByRole("button", { name: "Duplicate" });
    await button.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("tooltip")
        .filter({ hasText: "Saves a copy you can edit" }),
    ).toBeVisible();
    await expect(button).toHaveAccessibleDescription(
      "Saves a copy you can edit",
    );

    await button.blur();
    await expect(
      page
        .getByRole("tooltip")
        .filter({ hasText: "Saves a copy you can edit" }),
    ).toBeHidden();
  });
});

test.describe("Button focus ring", () => {
  test("shows for keyboard focus but not after a click", async ({ page }) => {
    await page.goto("/button");
    const button = page.getByTestId("preview").getByRole("button", {
      name: "Save",
    });
    const outline = () =>
      button.evaluate((el) => getComputedStyle(el).outlineStyle);

    await button.click();
    expect(await outline()).toBe("none");

    await button.focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(button).toBeFocused();
    expect(await outline()).toBe("solid");
  });
});
