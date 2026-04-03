import type { Metadata } from "next";
import { Sora, Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Ribeon",
  description:
    "Ribeon builds actionable signals from primary sources and maps them to tradeable instruments for institutional investors and researchers.",
  keywords: [
    "alternative data",
    "institutional data",
    "quantitative finance",
    "hedge fund data",
    "actionable signals",
    "alpha generation",
  ],
  openGraph: {
    title: "Ribeon",
    description:
      "Alternative data mapped to tradeable instruments for institutional investors.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${playfair.variable} ${dmSans.variable}`}
    >
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
