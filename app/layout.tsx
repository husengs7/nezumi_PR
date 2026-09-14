import type { Metadata } from "next";
import { site } from "@/content/site";
import "./globals.css";
import "./transmission.css";
export const metadata: Metadata = {
  title: `${site.band} — ${site.release}`,
  description: site.description,
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
