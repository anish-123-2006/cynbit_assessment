import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#07090e",
};

export const metadata: Metadata = {
  title: "Cynbit Project Discovery Assistant | AI Automation & Software Solutions",
  description:
    "Turn your business challenge into a clearer technical direction. Guided project discovery for autonomous AI agents, enterprise software, and cloud modernization by Cynbit Technologies.",
  keywords: [
    "AI automation Jaipur",
    "Autonomous AI agents",
    "Software solutions Rajasthan",
    "Cloud infrastructure",
    "Cynbit Technologies",
    "Project Discovery Assistant",
  ],
  authors: [{ name: "Cynbit Technologies", url: "https://cynbit.in" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#07090e] text-gray-100 flex flex-col font-sans selection:bg-brand-cyan/20 selection:text-white">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
