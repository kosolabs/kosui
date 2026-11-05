import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("NavItem Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/nav-item");
  });

  test("the current item is marked for assistive technology", async ({
    page,
  }) => {
    const nav = page.getByRole("navigation", { name: "Mail" }).first();
    const inbox = nav.getByRole("link", { name: "Inbox" });
    const sent = nav.getByRole("link", { name: "Sent" });
    await expect(inbox).toHaveAttribute("aria-current", "page");
    await expect(sent).not.toHaveAttribute("aria-current");
    await sent.click();
    await expect(sent).toHaveAttribute("aria-current", "page");
    await expect(nav.locator("[aria-current]")).toHaveCount(1);
  });

  test("sizes follow the shared scale", async ({ page }) => {
    const inbox = page
      .getByRole("navigation", { name: "Mail" })
      .first()
      .getByRole("link", { name: "Inbox" });
    for (const [size, height] of [
      ["xs", 28],
      ["sm", 36],
      ["md", 44],
      ["lg", 52],
      ["xl", 60],
    ] as const) {
      await page
        .getByRole("radio", { name: size, exact: true })
        .first()
        .click();
      await expect
        .poll(async () => (await inbox.boundingBox())!.height)
        .toBe(height);
    }
  });

  test("groups are named by their labels", async ({ page }) => {
    const settings = page.getByRole("navigation", { name: "Settings" });
    await expect(settings.getByRole("group")).toHaveCount(2);
    await expect(
      settings.getByRole("group", { name: "Workspace" }),
    ).toBeVisible();
    await expect(
      settings
        .getByRole("group", { name: "Account" })
        .getByRole("link", { name: "Billing" }),
    ).toBeVisible();
  });

  test("counts read as more than a number", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Inbox 12 unread" }),
    ).toBeVisible();
  });
});
