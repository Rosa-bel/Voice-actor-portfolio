import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { AudioProvider } from "@/context/AudioContext";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: "Roza — Voice Actor",
  description:
    "Voice actor portfolio: commercial, narration and dubbing demos.",
};

export const viewport: Viewport = {
  themeColor: "#5B142F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        <MotionConfig reducedMotion="user">
          <AudioProvider>{children}</AudioProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
