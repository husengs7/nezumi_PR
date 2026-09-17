import { chromium } from "@playwright/test";
import { fileURLToPath } from "node:url";

// 起動済みのサイトを撮影する。例: npm run og:capture -- http://localhost:3001
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(process.argv[2] || "http://localhost:3001", {
    waitUntil: "load",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images, (image) => image.decode().catch(() => {})),
    );
    window.scrollTo(0, 0);
  });
  // 開発中でもNext.jsの開発ツールをプレビューに写さない。
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  await page.screenshot({
    path: fileURLToPath(
      new URL("../public/images/social-preview.jpg", import.meta.url),
    ),
    type: "jpeg",
    quality: 90,
    animations: "disabled",
  });
} finally {
  await browser.close();
}
