import type { Metadata } from "next";
import { EB_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteBreadcrumb } from "@/components/SiteBreadcrumb";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Ribeon | Institutional Alternative Data",
  description:
    "Ribeon provides institutional-grade alternative datasets derived from US government records — federal procurement signals and weather commodity data for quantitative investors.",
  keywords: [
    "alternative data",
    "institutional data",
    "government spending",
    "federal procurement",
    "weather commodity signals",
    "quantitative finance",
    "hedge fund data",
  ],
  openGraph: {
    title: "Ribeon | Institutional Alternative Data",
    description:
      "Institutional-grade alternative datasets derived from US government records.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Thin gold accent line */}
        <div style={{ background: "var(--gold)", height: "5px", width: "100%" }} />

        {/* Persistent breadcrumb — always in the same position */}
        <SiteBreadcrumb />

        {children}
      </body>
    </html>
  );
}
