import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/providers/Analytics";
import ClickTracker from "@/components/providers/ClickTracker";
import RevealObserver from "@/components/providers/RevealObserver";
import ScrollTracker from "@/components/providers/ScrollTracker";
import SmoothScroll from "@/components/providers/SmoothScroll";
import JsonLd from "@/components/ui/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

// Self-hosted variable fonts (brief 2.3, 8.1): latin subsets of Archivo and Inter
// from Google Fonts, committed so builds don't depend on reaching Google.
const archivo = localFont({
  src: "../fonts/archivo-latin-variable.woff2",
  weight: "500 800",
  variable: "--font-archivo",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
const inter = localFont({
  src: "../fonts/inter-latin-variable.woff2",
  weight: "400 600",
  variable: "--font-inter",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Sleeky Programmers | Websites, Apps & Automation in Lagos",
    template: "%s",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    site: "@sleekydevs",
  },
};

export const viewport: Viewport = {
  themeColor: "#070B10",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html lang="en-NG">
      <body className={`${archivo.variable} ${inter.variable} bg-ink font-sans text-white antialiased`}>
        <JsonLd data={organizationJsonLd(settings)} />
        {children}
        <WhatsAppButton />
        <SmoothScroll />
        <RevealObserver />
        <ClickTracker />
        <ScrollTracker />
        <Analytics />
      </body>
    </html>
  );
}
