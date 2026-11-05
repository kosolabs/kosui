import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Docs Layout Tests", () => {
  test("the landing page links to every component", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Kosui");
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1 })).toHaveText("Kosui");
    await main.getByRole("link", { name: /^Command Palette/ }).click();
    await expect(page).toHaveURL(/\/command$/);
    await expect(page).toHaveTitle("Command Palette · Kosui");
    await expect(
      page.getByRole("main").getByRole("heading", { level: 1 }),
    ).toHaveText("Command Palette");
  });

  test("the navigation groups components and marks the current page", async ({
    page,
  }) => {
    await page.goto("/button");
    const nav = page.getByRole("navigation", { name: "Docs" });
    await expect(nav.getByRole("heading", { level: 2 })).toHaveText([
      "Actions",
      "Inputs",
      "Feedback",
      "Overlays",
      "Navigation",
      "Content",
    ]);
    await expect(nav.getByRole("link", { name: "Button" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(nav.locator("[aria-current]")).toHaveCount(1);
  });

  test("the theme follows the system and remembers a choice", async ({
    browser,
  }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/button");
    const html = page.locator("html");
    const toggle = page.getByRole("button", { name: "Dark theme" });
    await expect(html).toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await toggle.click();
    await expect(html).not.toHaveClass(/dark/);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
    await page.reload();
    await expect(html).not.toHaveClass(/dark/);
    await expect(
      page.getByRole("button", { name: "Dark theme" }),
    ).toHaveAttribute("aria-pressed", "false");
    await context.close();
  });

  test("the navigation collapses into a menu on small screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto("/button");
    const nav = page.getByRole("navigation", { name: "Docs" });
    const toggle = page.getByRole("button", { name: "Navigation" });
    await expect(nav).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(nav).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(nav).toBeHidden();
    await toggle.click();
    await nav.getByRole("link", { name: "Slider" }).click();
    await expect(page).toHaveURL(/\/slider$/);
    await expect(nav).toBeHidden();
  });

  test("a skip link moves past the navigation", async ({
    page,
    browserName,
  }) => {
    await page.goto("/button");
    await expect(page.getByRole("main")).toBeVisible();
    await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await expect(skip).toHaveAttribute("href", "#main");
  });
});
