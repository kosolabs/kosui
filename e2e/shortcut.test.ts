import { expect, test, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

function onPlatform(platform: string) {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((platform) => {
      Object.defineProperty(Navigator.prototype, "platform", {
        get: () => platform,
      });
    }, platform);
    await page.goto("/shortcuts");
    await expect(status(page)).toBeVisible();
  });
}

const playground = (page: Page) =>
  page
    .locator("kbd")
    .filter({ has: page.locator("kbd") })
    .first();
const status = (page: Page) => page.getByText(/^(Press it|Matched)/);

async function toggle(page: Page, name: string) {
  await page.getByRole("switch", { name, exact: true }).click();
}

async function press(page: Page, key: string) {
  await page.locator("body").focus();
  await page.keyboard.press(key);
}

test.describe("Shortcuts on Apple devices", () => {
  onPlatform("MacIntel");

  test("mod shows as ⌘ and is read as Command", async ({ page }) => {
    await expect(playground(page).locator("kbd")).toHaveText(["⌘", "K"]);
    await expect(playground(page).locator("kbd").first()).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    await expect(playground(page).locator(".sr-only")).toHaveText("Command+K");
  });

  test("modifiers follow Apple's order", async ({ page }) => {
    await toggle(page, "mod");
    for (const name of ["meta", "shift", "alt", "ctrl"]) {
      await toggle(page, name);
    }
    await expect(playground(page).locator("kbd")).toHaveText([
      "⌃",
      "⌥",
      "⇧",
      "⌘",
      "K",
    ]);
    await expect(playground(page).locator(".sr-only")).toHaveText(
      "Control+Option+Shift+Command+K",
    );
  });

  test("Command+K matches mod+K and Control+K doesn't", async ({ page }) => {
    await press(page, "Control+k");
    await expect(status(page)).toHaveText("Press it anywhere on the page");
    await press(page, "Meta+k");
    await expect(status(page)).toHaveText("Matched 1 time");
  });

  test("Shift with a letter matches whatever the letter's case", async ({
    page,
  }) => {
    await toggle(page, "shift");
    await press(page, "Meta+Shift+K");
    await expect(status(page)).toHaveText("Matched 1 time");
  });

  test("Option shortcuts match the physical key", async ({ page }) => {
    await toggle(page, "mod");
    await toggle(page, "alt");
    await page.evaluate(() =>
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "˚",
          code: "KeyK",
          altKey: true,
        }),
      ),
    );
    await expect(status(page)).toHaveText("Matched 1 time");
  });

  test("named keys show as symbols", async ({ page }) => {
    await page.getByRole("radio", { name: "ArrowUp" }).click();
    await expect(playground(page).locator("kbd")).toHaveText(["⌘", "↑"]);
    await expect(playground(page).locator(".sr-only")).toHaveText(
      "Command+Up Arrow",
    );
  });

  test("menu items name their shortcuts", async ({ page }) => {
    await page.goto("/menus");
    await page.getByRole("button", { name: "Actions", exact: true }).click();
    await expect(
      page.getByRole("menuitem", { name: "Cut Command+X" }),
    ).toBeVisible();
  });
});

test.describe("Shortcuts on Windows and Linux", () => {
  onPlatform("Win32");

  test("mod shows as Ctrl", async ({ page }) => {
    await expect(playground(page).locator("kbd")).toHaveText(["Ctrl", "K"]);
    await expect(playground(page).locator(".sr-only")).toHaveText("Ctrl+K");
  });

  test("Ctrl+K matches mod+K and the Windows key doesn't", async ({ page }) => {
    await press(page, "Meta+k");
    await expect(status(page)).toHaveText("Press it anywhere on the page");
    await press(page, "Control+k");
    await expect(status(page)).toHaveText("Matched 1 time");
  });

  test("non-Latin layouts match the physical key", async ({ page }) => {
    await page.evaluate(() =>
      window.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "л",
          code: "KeyK",
          ctrlKey: true,
        }),
      ),
    );
    await expect(status(page)).toHaveText("Matched 1 time");
  });

  test("the last key press is shown as a shortcut", async ({ page }) => {
    await press(page, "Control+Shift+ArrowUp");
    const last = page.getByText("Last pressed:").locator("kbd").first();
    await expect(last.locator(".sr-only")).toHaveText("Ctrl+Shift+Up Arrow");
  });

  test("a shortcut sends a message", async ({ page }) => {
    const message = page.getByRole("textbox", { name: "Message" });
    await message.fill("Hello");
    await message.press("Control+Enter");
    await expect(page.getByText("Sent: Hello")).toBeVisible();
    await expect(message).toHaveValue("");
  });

  test("a key press records a shortcut and Escape cancels", async ({
    page,
  }) => {
    const field = page.getByText("Search shortcut", { exact: true });
    const current = field.locator("..").locator(".sr-only");
    await page.getByRole("button", { name: "Change" }).click();
    await page.keyboard.press("Control+Shift+P");
    await expect(current).toHaveText("Ctrl+Shift+P");
    await page.getByRole("button", { name: "Change" }).click();
    await page.keyboard.press("Escape");
    await expect(current).toHaveText("Ctrl+Shift+P");
  });
});
