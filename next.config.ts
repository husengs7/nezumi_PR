import type { NextConfig } from "next";
const config: NextConfig = {
  allowedDevOrigins: ["192.168.10.102"],
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default config;
