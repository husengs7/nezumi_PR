import { test, expect } from "@playwright/test";

test("増殖して崩壊した後に音源を表示し、再体験できる", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "入信する" }).click();
  await expect(page.locator(".storm-popup").first()).toBeVisible();
  await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByRole("heading", { name: "救済ノイズ", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "もう一度、勧誘される" }).click();
  await expect(page.getByRole("button", { name: "入信する" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("モバイルで横スクロールがなく、演出中もスキップできる", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "test-results/mobile-intro.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "入信する" }).click();
  await page.locator(".emergency-skip").click();
  await expect(page.locator(".release-page")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("動きを減らす設定では演出を省略する", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "入信する" }).click();
  await expect(page.locator(".release-page")).toBeVisible();
  await expect(page.locator(".storm-popup")).toHaveCount(0);
});

test("デスクトップ表示とスキップ", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/desktop-intro.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "音源へスキップ" }).click();
  await expect(page.getByText("ねずみ幸福論 · 配信準備中")).toBeVisible();
  await page.screenshot({
    path: "test-results/desktop-release.png",
    fullPage: true,
  });
});
