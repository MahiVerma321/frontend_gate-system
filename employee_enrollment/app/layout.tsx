import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import {
  Inter,
  Sora,
  Plus_Jakarta_Sans,
} from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "SecureVision",
  description: "AI Powered Security Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          ${sora.variable}
          ${jakarta.variable}
          antialiased
        `}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
