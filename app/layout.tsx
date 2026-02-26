import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: SITE_URL ? new URL(SITE_URL) : undefined,
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
    canonical: "/home",
  },
  openGraph: {
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "오늘의 외국인·기관 동시 순매수 쌍끌이 종목을 확인하세요. 한국투자증권 OpenAPI 기반 AI 분석 제공.",
    url: SITE_URL ? `${SITE_URL}/home` : "/home",
    siteName: "오늘의 쌍끌이",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘의 쌍끌이 | 외국인·기관 동시 순매수 Top10",
    description:
      "오늘의 외국인·기관 동시 순매수 쌍끌이 종목을 확인하세요. 한국투자증권 OpenAPI 기반 AI 분석 제공.",
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
      </body>
    </html>
  );
}
