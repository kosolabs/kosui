import { expect, test, type Locator, type Page } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

const FULL = Infinity;

const radius = (locator: Locator) =>
  locator.evaluate((el) =>
    parseFloat(getComputedStyle(el).borderTopLeftRadius),
  );

const expectRadius = async (locator: Locator, pixels: number) => {
  if (pixels === FULL) {
    await expect.poll(() => radius(locator)).toBeGreaterThan(1000);
  } else {
    await expect.poll(() => radius(locator)).toBe(pixels);
  }
};

test.describe("Shape", () => {
  const preview = (page: Page) => page.getByTestId("preview");

  test("shapes follow Material 3's corner scale", async ({ page }) => {
    await page.goto("/box");
    const box = preview(page).getByText("A box of content", { exact: true });
    const scale = [
      ["none", 0],
      ["xs", 4],
      ["sm", 8],
      ["md", 12],
      ["lg", 16],
      ["xl", 28],
      ["full", FULL],
    ] as const;
    for (const [shape, pixels] of scale) {
      await page
        .getByRole("listbox", { name: "Shape" })
        .getByRole("option", { name: shape, exact: true })
        .click();
      await expectRadius(box, pixels);
    }
  });

  const defaults: [string, (page: Page) => Locator, number][] = [
    ["/button", (page) => preview(page).getByRole("button"), FULL],
    [
      "/fab",
      (page) => preview(page).getByTestId("container").getByRole("button"),
      16,
    ],
    [
      "/chips",
      (page) =>
        preview(page).getByText("Design", { exact: true }).locator(".."),
      8,
    ],
    ["/alert", (page) => preview(page).getByRole("alert"), 12],
    ["/avatar", (page) => preview(page).locator(":scope > *"), FULL],
    ["/skeleton", (page) => preview(page).locator(":scope > *"), 4],
    ["/input", (page) => preview(page).getByRole("textbox"), 4],
    ["/textarea", (page) => preview(page).getByRole("textbox"), 4],
    ["/switch", (page) => preview(page).getByRole("switch"), FULL],
    ["/slider", (page) => preview(page).getByRole("slider"), FULL],
  ];

  for (const [path, locate, pixels] of defaults) {
    test(`${path} defaults to Material 3's shape`, async ({ page }) => {
      await page.goto(path);
      await expectRadius(locate(page), pixels);
    });
  }
});
