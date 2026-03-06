import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const noCacheHeaders = [
  { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
];

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // <- false로 설정
  turbopack: {},
  async headers() {
    return [
      { source: "/sw.js", headers: noCacheHeaders },
      { source: "/workbox-:hash.js", headers: noCacheHeaders },
      { source: "/manifest.json", headers: noCacheHeaders },
    ];
  },
};

export default withPWA(nextConfig);
