import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AddToHomeScreenBanner from "@/components/AddToHomeScreen/AddToHomeScreenBanner";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SEO_IMAGE_PATH = "/seoImage_resize.png";
const SEO_IMAGE_URL = `${SITE_URL}${SEO_IMAGE_PATH}`;
const GSC_VERIFY_TOKEN = process.env.NEXT_PUBLIC_GSC_VERIFY_TOKEN;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon_chart.ico", sizes: "32x32", type: "image/png" },
      { url: "/favicon_chart.ico", sizes: "192x192", type: "image/png" },
      { url: "/favicon_chart.ico", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_chart.ico", sizes: "180x180", type: "image/png" },
    ],
  },
  title: {
    default: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    template: "%s | 오늘의 쌍끌이",
  },
  description:
    "오늘의 외국인·기관 동시 순매수 쌍끌이 종목을 확인하세요. 한국투자증권 OpenAPI 기반 AI 분석 제공.",
  keywords: [
    "쌍끌이",
    "외국인 기관 동시 순매수",
    "국내주식",
    "코스피",
    "AI 분석",
    "한국투자증권 OpenAPI",
  ],
  category: "finance",
  alternates: {
    canonical: `${SITE_URL}/home`,
  },
  openGraph: {
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "오늘의 외국인·기관 동시 순매수 쌍끌이 종목을 확인하세요. 한국투자증권 OpenAPI 기반 AI 분석 제공.",
    url: `${SITE_URL}/home`,
    siteName: "오늘의 쌍끌이",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: SEO_IMAGE_URL,
        width: 1024,
        height: 576,
        alt: "대한민국 국기를 배경으로 상승하는 코스피 주식 시장 그래프",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "오늘의 외국인·기관 동시 순매수 쌍끌이 종목을 확인하세요. 한국투자증권 OpenAPI 기반 AI 분석 제공.",
    images: [SEO_IMAGE_URL],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "쌍끌이",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: GSC_VERIFY_TOKEN ?? "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        {children}
        <Toaster position="top-center" richColors />
        <AddToHomeScreenBanner />
      </body>
    </html>
  );
}
