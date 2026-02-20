import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { QuoteProvider } from "@/lib/quote-store";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ningbo Siyang | Professional Industrial Power Tools",
    template: "%s | Ningbo Siyang",
  },
  description:
    "Ningbo Siyang is a leading manufacturer and exporter of professional-grade industrial power tools. Request a quote for drills, saws, grinders, sanders, impact tools, and combo kits.",
  keywords: [
    "industrial power tools",
    "B2B power tools",
    "Ningbo Siyang",
    "professional tools",
    "power tool manufacturer",
    "China power tools",
    "wholesale tools",
  ],
  openGraph: {
    title: "Ningbo Siyang | Professional Industrial Power Tools",
    description:
      "Leading manufacturer and exporter of professional-grade industrial power tools based in Ningbo, China.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans antialiased" suppressHydrationWarning>
        <QuoteProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </QuoteProvider>
      </body>
    </html>
  );
}
