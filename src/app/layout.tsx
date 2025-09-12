import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Sleeky Programmers Ltd.",
    template: "%s | Sleeky Programmers Ltd.",
  },
  description: "Experience excellence with Sleeky Programmers Ltd.",
  keywords: ['sleeky', 'sleek', 'programmers', 'sleeky programmers', 'sleek programmers', 'sleek code', 'sleek coders', 'sleeky coders', 'sleeky code', 'software builders', 'software developers', 'software engineers', 'web developers', 'mobile app developers', 'custom software', 'software solutions', 'tech innovators', 'digital transformation', 'it consultants', 'it services', 'software consultancy'],
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        {children}
        <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`} />
      </body>
    </html>
  );
}
