import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FlexPro Exports & Imports | Trusted Global Trade Partner",
    template: "%s | FlexPro Exports & Imports",
  },
  description:
    "FlexPro Exports & Imports — trusted B2B export and import solutions since 2010. We serve 45+ countries with premium sourcing, logistics coordination, customs documentation, and supplier verification.",
  keywords: [
    "export import company",
    "B2B trade",
    "international trade",
    "global sourcing",
    "logistics coordination",
    "customs documentation",
    "supplier verification",
    "FlexPro Exports",
    "India exports",
    "trade partner",
  ],
  authors: [{ name: "FlexPro Exports & Imports" }],
  creator: "FlexPro Exports & Imports",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flexproexports.com",
    title: "FlexPro Exports & Imports | Trusted Global Trade Partner",
    description:
      "Trusted B2B export and import solutions. Sourcing, logistics, customs and supplier verification across 45+ countries.",
    siteName: "FlexPro Exports & Imports",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlexPro Exports & Imports",
    description: "Trusted global export & import solutions for B2B businesses worldwide.",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
