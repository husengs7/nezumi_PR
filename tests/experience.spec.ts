import { test, expect } from "@playwright/test";

test("増殖して崩壊した後に音源を表示し、再体験できる", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "入信する" }).click();
  await expect(page.locator(".storm-popup").first()).toBeVisible();
  await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
  await expect(
    page.getByRole("heading", { name: "その街であなたは...", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "もう一度、勧誘される" }).click();
  await expect(page.getByRole("button", { name: "入信する" })).toBeVisible();
  expect(errors).toEqual([]);
});

test("モバイルで横スクロールがなく、演出後に音源を表示する", async ({
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
  await expect(page.getByRole("button", { name: /スキップ/ })).toHaveCount(0);
  await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
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
  await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
  await expect(page.locator(".storm-popup")).toHaveCount(0);
});

test("デスクトップの広告ボタンから演出を開始する", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/desktop-intro.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "今すぐ接続 ▶" }).click();
  await expect(page.locator(".storm-popup").first()).toBeVisible();
  await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
  await expect(page.getByText("ねずみ幸福論 · 配信準備中")).toBeVisible();
  await page.screenshot({
    path: "test-results/desktop-release.png",
    fullPage: true,
  });
});

test("再読み込みとアンカー付きURLでも先頭を表示し、ページ内リンクは使える", async ({
  page,
}) => {
  await page.goto("/#diary");
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.getByRole("link", { name: "管理人の記憶", exact: true }).click();
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(0);
  await page.reload();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

for (const width of [375, 1440]) {
  test(`広告から開始後はすべての開始ボタンが無効になる (${width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const ads = page.locator(".ad-action:visible");
    await ads.first().click();
    for (const button of await ads.all()) await expect(button).toBeDisabled();
    await expect(page.locator(".enter-link")).toBeDisabled();
    await expect(page.locator(".storm-popup").first()).toBeVisible();
    await expect(page.locator(".release-page")).toBeVisible({ timeout: 15000 });
    await page.getByRole("button", { name: "もう一度、勧誘される" }).click();
    for (const button of await page.locator(".ad-action:visible").all())
      await expect(button).toBeEnabled();
  });
}
