import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { DisclaimerFooter } from "@/components/DisclaimerFooter";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Pulsights — NGX News & Company Financials",
  description:
    "NGX market news, earnings commentary and analysis, plus revenue, profit, cash flow, debt, EPS, dividends, ROE and valuation for Nigerian Exchange listed companies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <DisclaimerFooter />
      </body>
    </html>
  );
}
