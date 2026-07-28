import type { Metadata } from "next";
import { Karla, Playfair_Display } from "next/font/google";
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
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
        className={`${karla.variable} ${playfair.variable} ${karla.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
