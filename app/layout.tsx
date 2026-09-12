import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"]
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.verra.market"),
  title: {
    default: "Verra — Everything, chosen well",
    template: "%s | Verra"
  },
  description:
    "Verra is a curated marketplace for electronics, fashion, home and beauty — fast shipping, verified sellers, honest prices.",
  openGraph: {
    type: "website",
    siteName: "Verra",
    title: "Verra — Everything, chosen well",
    description: "A curated marketplace for electronics, fashion, home and beauty."
  },
  twitter: {
    card: "summary_large_image"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-2 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
