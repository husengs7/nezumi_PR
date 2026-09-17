import type { Metadata } from "next";
import { site } from "@/content/site";
import "./globals.css";
import "./transmission.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.band} — ${site.release}`,
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: site.url,
    siteName: site.homepage.title,
    title: `${site.band} — ${site.release}`,
    description: site.description,
    images: [
      {
        url: "/images/social-preview.jpg",
        width: 1200,
        height: 630,
        alt: `${site.homepage.title}のトップ画面`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.band} — ${site.release}`,
    description: site.description,
    images: [
      {
        url: "/images/social-preview.jpg",
        alt: `${site.homepage.title}のトップ画面`,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
