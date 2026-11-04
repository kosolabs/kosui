import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Badge Component Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/badge");
  });

  const preview = (page: Page) => page.getByTestId("preview");
  const anchor = (page: Page) =>
    preview(page).getByRole("button", { name: /^Notifications/ });
  const badge = (page: Page) => preview(page).getByText("3", { exact: true });
  const choose = (page: Page, setting: string, option: string) =>
    page
      .getByRole("listbox", { name: setting })
      .getByRole("option", { name: option, exact: true })
      .click();
  const center = async (locator: Locator) => {
    const box = (await locator.boundingBox())!;
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  };
  const expectNear = (
    actual: { x: number; y: number },
    expected: { x: number; y: number },
  ) => {
    expect(Math.abs(actual.x - expected.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(actual.y - expected.y)).toBeLessThanOrEqual(1);
  };

  test("the badge is centered on its element's top-right corner", async ({
    page,
  }) => {
    const box = (await anchor(page).boundingBox())!;
    expectNear(await center(badge(page)), {
      x: box.x + box.width,
      y: box.y,
    });
  });

  test("the badge moves to the bottom-left corner", async ({ page }) => {
    await choose(page, "Vertical alignment", "bottom");
    await choose(page, "Horizontal alignment", "left");
    const box = (await anchor(page).boundingBox())!;
    expectNear(await center(badge(page)), {
      x: box.x,
      y: box.y + box.height,
    });
  });

  test("longer content widens the badge instead of overflowing", async ({
    page,
  }) => {
    await choose(page, "Content", "999+");
    const wide = preview(page).getByText("999+", { exact: true });
    const [scroll, client] = await wide.evaluate((el) => [
      el.scrollWidth,
      el.clientWidth,
    ]);
    expect(scroll).toBeLessThanOrEqual(client);
  });

  test("the count is part of the button's name, and the badge is hidden from screen readers", async ({
    page,
  }) => {
    await expect(anchor(page)).toHaveAccessibleName("Notifications, 3 new");
    await expect(badge(page)).toHaveAttribute("aria-hidden", "true");
  });

  test("the badge comes after its element and renders no divs", async ({
    page,
  }) => {
    const wrapper = badge(page).locator("..");
    await expect(wrapper.locator("> *").last()).toHaveText("3");
    await expect(wrapper.locator("div")).toHaveCount(0);
    expect(await wrapper.evaluate((el) => el.tagName)).toBe("SPAN");
  });

  test("the badge stays on its element in a block container", async ({
    page,
  }) => {
    const wrapper = badge(page).locator("..");
    await wrapper.evaluate((el) => {
      const block = document.createElement("div");
      block.style.width = "600px";
      el.replaceWith(block);
      block.append(el);
    });
    const box = (await anchor(page).boundingBox())!;
    expectNear(await center(badge(page)), {
      x: box.x + box.width,
      y: box.y,
    });
  });

  test("an empty count hides the badge in the unread example", async ({
    page,
  }) => {
    const inbox = page.getByRole("button", { name: "Inbox, 3 unread" });
    await inbox.click();
    await expect(page.getByRole("button", { name: "Inbox" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Inbox" }).locator(".."),
    ).not.toContainText("3");
  });
});
