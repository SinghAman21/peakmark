import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import { Header } from "@/components/Header";
import Providers from "@/components/providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Peakmark - Customizable Badges for Developers",
//   description: "Create, customize, and share badges for developers to showcase skills and achievements. Easily remix badges for your projects and enhance your portfolio.",
// };

export const metadata: Metadata = {
  metadataBase: new URL("https://peakmark.vercel.app/"),
  title: {
    template: "%s | Aman Singh",
    default: "Aman Singh",
  },
    description: "Create, customize, and share badges for developers to showcase skills and achievements. Easily remix badges for your projects and enhance your portfolio.",
  keywords: [
    "developers",
    "customization",
    "next.js",
    "react",
    "typescript",
    "node.js",
    "typescript",
    "India",
    "badges",
    "customizable",
    "showcase",
    "skills",
    "achievements",
    "remix",
    "enhance",
  ],
  openGraph: {
    title: "Peakmark — Customizable Badges for Developers",
    description: "Create, customize, and share badges for developers to showcase skills and achievements. Easily remix badges for your projects and enhance your portfolio.",
    url: "https://peakmark.vercel.app/",
    siteName: "Peakmark",
    images: [
      {
        url: "./public/og.webp",
        width: 1200,
        height: 630,
        alt: "Peakmark — Customizable Badges for Developers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon_io/android-chrome-192x192.png",
        href: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        rel: "icon",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon_io/favicon.svg",
        type: "image/svg+xml",
        rel: "icon",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon_io/android-chrome-192x192-dark.png",
        href: "/favicon_io/android-chrome-192x192-dark.png",
        sizes: "192x192",
        type: "image/png",
        rel: "icon",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon_io/favicon.svg",
        type: "image/svg+xml",
        rel: "icon",
      },
    ],
    shortcut: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon_io/favicon.ico",
        href: "/favicon_io/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon_io/favicon.ico",
        href: "/favicon_io/favicon.ico",
      },
    ],
    apple: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/favicon_io/apple-touch-icon.png",
        href: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/favicon_io/apple-touch-icon.png",
        href: "/favicon_io/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  twitter: {
    title: "Peakmark — Customizable Badges for Developers",
    card: "summary_large_image",
    creator: "@SinghAman21_",
    site: "@SinghAman21_",
    siteId: "@SinghAman21_",
    description: "Create, customize, and share badges for developers to showcase skills and achievements. Easily remix badges for your projects and enhance your portfolio.",
    images: ["./public/og.webp"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh">
            <Header />
            {children}
          </div>
        </Providers>
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
