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
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/foreign", destination: "/foreign-buy-top10", permanent: true },
      { source: "/home/institution", destination: "/institution-buy-top10", permanent: true },
      { source: "/home/ranking", destination: "/total-buy-top30", permanent: true },
      { source: "/foreign", destination: "/foreign-buy-top10", permanent: true },
      { source: "/institution", destination: "/institution-buy-top10", permanent: true },
      { source: "/ranking/total", destination: "/total-buy-top30", permanent: true },
      { source: "/ranking/foreign", destination: "/foreign-buy-top30", permanent: true },
      { source: "/ranking/institution", destination: "/institution-buy-top30", permanent: true },
      { source: "/sell/total", destination: "/total-sell-top30", permanent: true },
      { source: "/sell/foreign", destination: "/foreign-sell-top30", permanent: true },
      { source: "/sell/institution", destination: "/institution-sell-top30", permanent: true },
      { source: "/history/total", destination: "/date", permanent: true },
      { source: "/history/foreign", destination: "/date", permanent: true },
      { source: "/history/institution", destination: "/date", permanent: true },
    ]
  },
  async headers() {
    return [
      { source: "/sw.js", headers: noCacheHeaders },
      { source: "/workbox-:hash.js", headers: noCacheHeaders },
      { source: "/manifest.json", headers: noCacheHeaders },
    ];
  },
};

export default withPWA(nextConfig);
