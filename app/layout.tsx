import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces } from "next/font/google";
import "./globals.css";
import MobileOrderBar from "@/components/shared/MobileOrderBar";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: {
    default: "Suja's Kitchen",
    template: "%s | Suja's Kitchen",
  },
  description:
    "Kerala meals, snacks, and catering in Dubai and Abu Dhabi. Since 1999.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${hanken.variable} ${fraunces.variable} ${hanken.className} antialiased`}
      >
        {children}
        <MobileOrderBar />
      </body>
    </html>
  );
}
