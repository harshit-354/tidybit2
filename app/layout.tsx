import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { Toaster } from "@/components/ui/toaster";
import { JsonLd } from "@/components/seo/JsonLd";
import { websiteJsonLd, organizationJsonLd, siteNavigationJsonLd } from "@/lib/seo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tidybit.com"),
  title: {
    default: "TidyBit - Company-wise LeetCode Interview Questions",
    template: "%s | TidyBit",
  },
  description:
    "Browse 17,000+ company-wise LeetCode DSA interview questions from 660+ companies. " +
    "Filter by company, topic, and difficulty. Practice smarter for your next tech interview.",
  openGraph: {
    type: "website",
    siteName: "TidyBit",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tidybit",
    creator: "@tidybit",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={siteNavigationJsonLd()} />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-scan/dist/auto.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className={`${jakarta.variable} font-sans tracking-normal`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background flex flex-col">
            <div className="sticky top-0 z-50 bg-background">
              <TopBanner />
              <Navbar />
            </div>
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
